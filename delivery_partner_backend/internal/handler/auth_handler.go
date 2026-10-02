package handler

import (
	"context"
	"errors"

	pb "delivery_partner_backend/gen"
	"delivery_partner_backend/internal/middleware"
	"delivery_partner_backend/internal/repository"
	"delivery_partner_backend/internal/service"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AuthHandler struct {
	pb.UnimplementedAuthServiceServer

	authService   *service.AuthService
	driverService *service.DriverService
}

func NewAuthHandler(
	authService *service.AuthService,
	driverService *service.DriverService,
) *AuthHandler {
	return &AuthHandler{
		authService:   authService,
		driverService: driverService,
	}
}

// SendLoginOTP handles phone number login.
func (h *AuthHandler) SendLoginOTP(
	ctx context.Context,
	req *pb.SendLoginOTPRequest,
) (*pb.SendLoginOTPResponse, error) {

	err := h.authService.SendLoginOTP(
		ctx,
		req.GetPhone(),
	)

	if err != nil {
		switch {
		case errors.Is(err, repository.ErrUserNotFound):
			return nil, status.Error(
				codes.NotFound,
				"user not found",
			)

		default:
			return nil, status.Error(
				codes.PermissionDenied,
				err.Error(),
			)
		}
	}

	return &pb.SendLoginOTPResponse{
		Success: true,
		Message: "OTP sent successfully",
	}, nil
}

// VerifyLoginOTP verifies OTP and returns JWT tokens.
func (h *AuthHandler) VerifyLoginOTP(
	ctx context.Context,
	req *pb.VerifyLoginOTPRequest,
) (*pb.VerifyLoginOTPResponse, error) {

	accessToken, refreshToken, err :=
		h.authService.VerifyLoginOTP(
			ctx,
			req.GetPhone(),
			req.GetOtp(),
		)

	if err != nil {
		return nil, status.Error(
			codes.Unauthenticated,
			err.Error(),
		)
	}

	return &pb.VerifyLoginOTPResponse{
		Success:      true,
		Message:      "Login successful",
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

// CompleteProfile is kept for later.
// Currently the Flutter app does not call this.
func (h *AuthHandler) CompleteProfile(
	ctx context.Context,
	req *pb.CompleteProfileRequest,
) (*pb.CompleteProfileResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.driverService.CompleteProfile(
		ctx,
		userID,
		req.GetName(),
		req.GetEmail(),
		req.GetVehicleType(),
		req.GetVehicleNumber(),
		req.GetLicenseNumber(),
	)

	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidDriverProfile):
			return nil, status.Error(
				codes.InvalidArgument,
				"invalid driver profile",
			)

		case errors.Is(err, service.ErrDriverAlreadyExists):
			return nil, status.Error(
				codes.AlreadyExists,
				"driver profile already exists",
			)

		case errors.Is(err, repository.ErrUserNotFound):
			return nil, status.Error(
				codes.NotFound,
				"user not found",
			)

		case errors.Is(err, service.ErrUserNotDeliveryPartner):
			return nil, status.Error(
				codes.PermissionDenied,
				"user is not a delivery partner",
			)

		default:
			return nil, status.Error(
				codes.Internal,
				"failed to create driver profile",
			)
		}
	}

	return &pb.CompleteProfileResponse{
		Success: true,
		Message: "Profile created successfully",
	}, nil
}

func (h *AuthHandler) GetProfile(
	ctx context.Context,
	req *pb.GetProfileRequest,
) (*pb.GetProfileResponse, error) {
	userID, ok := middleware.UserIDFromContext(ctx)
	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	profile, err := h.driverService.GetProfile(ctx, userID)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return nil, status.Error(codes.NotFound, "user not found")
		}

		if errors.Is(err, repository.ErrDriverNotFound) {
			return nil, status.Error(codes.NotFound, "driver profile not found")
		}

		if errors.Is(err, service.ErrUserNotDeliveryPartner) {
			return nil, status.Error(codes.PermissionDenied, "not a delivery partner")
		}

		return nil, status.Error(codes.Internal, "failed to load profile")
	}

	return &pb.GetProfileResponse{
		Success:       true,
		Message:       "Profile loaded",
		UserId:        profile.UserID,
		Name:          profile.Name,
		Email:         profile.Email,
		Phone:         profile.Phone,
		VehicleNumber: profile.VehicleNumber,
		VehicleType:   profile.VehicleType,
	}, nil
}

func (h *AuthHandler) RefreshToken(
	ctx context.Context,
	req *pb.RefreshTokenRequest,
) (*pb.RefreshTokenResponse, error) {

	if req.GetRefreshToken() == "" {
		return nil, status.Error(
			codes.InvalidArgument,
			"refresh token is required",
		)
	}

	accessToken, refreshToken, err :=
		h.authService.RefreshAccessToken(
			ctx,
			req.GetRefreshToken(),
		)

	if err != nil {
		return nil, status.Error(
			codes.Unauthenticated,
			err.Error(),
		)
	}

	return &pb.RefreshTokenResponse{
		Success:      true,
		Message:      "Token refreshed successfully",
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
