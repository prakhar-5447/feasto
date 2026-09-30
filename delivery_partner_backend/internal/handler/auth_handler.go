package handler

import (
	"context"

	"delivery_partner_backend/gen"
	"delivery_partner_backend/internal/service"
)

type AuthHandler struct {
	gen.UnimplementedAuthServiceServer

	authService *service.AuthService
}

func NewAuthHandler(
	authService *service.AuthService,
) *AuthHandler {

	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) SendLoginOTP(
	ctx context.Context,
	req *gen.SendLoginOTPRequest,
) (*gen.SendLoginOTPResponse, error) {

	err := h.authService.SendLoginOTP(
		ctx,
		req.GetPhone(),
	)

	if err != nil {
		return &gen.SendLoginOTPResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.SendLoginOTPResponse{
		Success: true,
		Message: "OTP sent successfully",
	}, nil
}

func (h *AuthHandler) VerifyLoginOTP(
	ctx context.Context,
	req *gen.VerifyLoginOTPRequest,
) (*gen.VerifyLoginOTPResponse, error) {

	accessToken, refreshToken, err :=
		h.authService.VerifyLoginOTP(
			ctx,
			req.GetPhone(),
			req.GetOtp(),
		)

	if err != nil {
		return &gen.VerifyLoginOTPResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.VerifyLoginOTPResponse{
		Success:      true,
		Message:      "Login successful",
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}
