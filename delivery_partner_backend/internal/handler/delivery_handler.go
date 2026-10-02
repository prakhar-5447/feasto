package handler

import (
	"context"
	"errors"
	"fmt"

	"delivery_partner_backend/gen"
	"delivery_partner_backend/internal/middleware"
	"delivery_partner_backend/internal/model"
	"delivery_partner_backend/internal/repository"
	"delivery_partner_backend/internal/service"

	"go.mongodb.org/mongo-driver/v2/bson"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type DeliveryHandler struct {
	gen.UnimplementedDeliveryServiceServer

	deliveryService *service.DeliveryService
	driverService   *service.DriverService
}

func NewDeliveryHandler(
	deliveryService *service.DeliveryService,
	driverService *service.DriverService,
) *DeliveryHandler {

	return &DeliveryHandler{
		deliveryService: deliveryService,
		driverService:   driverService,
	}
}

func getUserID(ctx context.Context) (bson.ObjectID, error) {
	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return bson.NilObjectID,
			fmt.Errorf("user not authenticated")
	}

	return userID, nil
}

func orderToProto(
	order *model.Order,
	customer *model.User,
) *gen.DeliveryOrder {

	result := &gen.DeliveryOrder{
		Id:          order.ID.Hex(),
		OrderId:     order.OrderID,
		GrandTotal:  order.Billing.GrandTotal,
		OrderStatus: string(order.OrderStatus),
		CreatedAt:   order.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),

		Restaurant: &gen.Restaurant{
			Name:    order.RestaurantSnapshot.Name,
			Address: order.RestaurantSnapshot.Address,
		},

		DeliveryAddress: &gen.DeliveryAddress{
			FullAddress: order.DeliveryAddress.FullAddress,
			Lat:         order.DeliveryAddress.Lat,
			Lng:         order.DeliveryAddress.Lng,
		},
	}

	if customer != nil {
		result.Customer = &gen.Customer{
			Name:  customer.Name,
			Phone: customer.Phone,
		}
	}

	return result
}

func (h *DeliveryHandler) GetAvailableOrders(
	ctx context.Context,
	req *gen.GetAvailableOrdersRequest,
) (*gen.GetAvailableOrdersResponse, error) {

	orders, err :=
		h.deliveryService.GetAvailableOrders(ctx)

	if err != nil {
		return &gen.GetAvailableOrdersResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	result := make(
		[]*gen.DeliveryOrder,
		0,
		len(orders),
	)

	for _, order := range orders {

		result = append(
			result,
			orderToProto(order, nil),
		)
	}

	return &gen.GetAvailableOrdersResponse{
		Success: true,
		Message: "Available orders",
		Orders:  result,
	}, nil
}

func (h *DeliveryHandler) AcceptOrder(
	ctx context.Context,
	req *gen.AcceptOrderRequest,
) (*gen.AcceptOrderResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.deliveryService.AcceptOrder(
		ctx,
		userID,
		req.GetOrderId(),
	)

	if err != nil {

		if errors.Is(
			err,
			repository.ErrOrderAlreadyAccepted,
		) {
			return &gen.AcceptOrderResponse{
				Success: false,
				Message: "Order is no longer available",
			}, nil
		}

		if errors.Is(
			err,
			repository.ErrOrderNotFound,
		) {
			return &gen.AcceptOrderResponse{
				Success: false,
				Message: "Order not found",
			}, nil
		}

		return nil, status.Error(
			codes.FailedPrecondition,
			err.Error(),
		)
	}

	return &gen.AcceptOrderResponse{
		Success: true,
		Message: "Order accepted successfully",
	}, nil
}

func (h *DeliveryHandler) RejectOrder(
	ctx context.Context,
	req *gen.RejectOrderRequest,
) (*gen.RejectOrderResponse, error) {

	driverID, err := getUserID(ctx)

	if err != nil {
		return nil, err
	}

	orderID, err := bson.ObjectIDFromHex(
		req.GetOrderId(),
	)

	if err != nil {
		return &gen.RejectOrderResponse{
			Success: false,
			Message: "invalid order id",
		}, nil
	}

	err = h.deliveryService.RejectOrder(
		ctx,
		orderID,
		driverID,
		req.GetReason(),
	)

	if err != nil {
		return &gen.RejectOrderResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.RejectOrderResponse{
		Success: true,
		Message: "Order rejected",
	}, nil
}

func (h *DeliveryHandler) PickupOrder(
	ctx context.Context,
	req *gen.PickupOrderRequest,
) (*gen.PickupOrderResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.deliveryService.PickupOrder(
		ctx,
		userID,
		req.GetOrderId(),
	)

	if err != nil {
		return nil, status.Error(
			codes.FailedPrecondition,
			err.Error(),
		)
	}

	return &gen.PickupOrderResponse{
		Success: true,
		Message: "Order picked up successfully",
	}, nil
}

func (h *DeliveryHandler) RequestDeliveryOTP(
	ctx context.Context,
	req *gen.RequestDeliveryOTPRequest,
) (*gen.RequestDeliveryOTPResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.deliveryService.RequestDeliveryOTP(
		ctx,
		userID,
		req.GetOrderId(),
	)

	if err != nil {
		return nil, status.Error(
			codes.FailedPrecondition,
			err.Error(),
		)
	}

	return &gen.RequestDeliveryOTPResponse{
		Success: true,
		Message: "Delivery OTP generated",
	}, nil
}

func (h *DeliveryHandler) VerifyDeliveryOTP(
	ctx context.Context,
	req *gen.VerifyDeliveryOTPRequest,
) (*gen.VerifyDeliveryOTPResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.deliveryService.VerifyDeliveryOTP(
		ctx,
		userID,
		req.GetOrderId(),
		req.GetOtp(),
	)

	if err != nil {
		return &gen.VerifyDeliveryOTPResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.VerifyDeliveryOTPResponse{
		Success: true,
		Message: "Delivery verified successfully",
	}, nil
}

func (h *DeliveryHandler) GetCurrentOrder(
	ctx context.Context,
	req *gen.GetCurrentOrderRequest,
) (*gen.GetCurrentOrderResponse, error) {

	driverID, err := getUserID(ctx)

	if err != nil {
		return nil, err
	}

	order, err :=
		h.deliveryService.GetCurrentOrder(
			ctx,
			driverID,
		)

	if err != nil {
		return &gen.GetCurrentOrderResponse{
			Success: false,
			Message: "No active delivery",
		}, nil
	}

	return &gen.GetCurrentOrderResponse{
		Success: true,
		Message: "Current order",
		Order:   orderToProto(order, nil),
	}, nil
}

func (h *DeliveryHandler) GetDeliveryHistory(
	ctx context.Context,
	req *gen.GetDeliveryHistoryRequest,
) (*gen.GetDeliveryHistoryResponse, error) {

	driverID, err := getUserID(ctx)

	if err != nil {
		return nil, err
	}

	orders, err :=
		h.deliveryService.GetHistory(
			ctx,
			driverID,
			int(req.GetPage()),
			int(req.GetLimit()),
		)

	if err != nil {
		return &gen.GetDeliveryHistoryResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	result := make(
		[]*gen.DeliveryOrder,
		0,
		len(orders),
	)

	for _, order := range orders {
		result = append(
			result,
			orderToProto(order, nil),
		)
	}

	return &gen.GetDeliveryHistoryResponse{
		Success: true,
		Message: "Delivery history",
		Orders:  result,
	}, nil
}

func (h *DeliveryHandler) UpdateAvailability(
	ctx context.Context,
	req *gen.UpdateAvailabilityRequest,
) (*gen.UpdateAvailabilityResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	err := h.driverService.UpdateAvailability(
		ctx,
		userID,
		req.GetStatus(),
	)

	if err != nil {
		switch {
		case errors.Is(
			err,
			service.ErrInvalidAvailability,
		):
			return nil, status.Error(
				codes.InvalidArgument,
				"invalid availability status",
			)

		case errors.Is(
			err,
			repository.ErrUserNotFound,
		):
			return nil, status.Error(
				codes.NotFound,
				"user not found",
			)

		case errors.Is(
			err,
			repository.ErrDriverNotFound,
		):
			return nil, status.Error(
				codes.NotFound,
				"driver profile not found",
			)

		case errors.Is(
			err,
			service.ErrUserNotDeliveryPartner,
		):
			return nil, status.Error(
				codes.PermissionDenied,
				"delivery partner access required",
			)

		default:
			return nil, status.Error(
				codes.FailedPrecondition,
				err.Error(),
			)
		}
	}

	return &gen.UpdateAvailabilityResponse{
		Success: true,
		Message: "Availability updated successfully",
		Status:  req.GetStatus(),
	}, nil
}

func (h *DeliveryHandler) GetRiderStatus(
	ctx context.Context,
	req *gen.GetRiderStatusRequest,
) (*gen.GetRiderStatusResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	availability, err :=
		h.driverService.GetAvailability(
			ctx,
			userID,
		)

	if err != nil {
		switch {
		case errors.Is(err, repository.ErrUserNotFound):
			return nil, status.Error(
				codes.NotFound,
				"user not found",
			)

		case errors.Is(err, repository.ErrDriverNotFound):
			return nil, status.Error(
				codes.NotFound,
				"driver profile not found",
			)

		case errors.Is(err, service.ErrUserNotDeliveryPartner):
			return nil, status.Error(
				codes.PermissionDenied,
				"delivery partner access required",
			)

		default:
			return nil, status.Error(
				codes.FailedPrecondition,
				err.Error(),
			)
		}
	}

	return &gen.GetRiderStatusResponse{
		Success: true,
		Message: "Rider status fetched successfully",
		Status:  string(availability),
	}, nil
}

func (h *DeliveryHandler) GetUpcomingOrder(
	ctx context.Context,
	req *gen.GetUpcomingOrderRequest,
) (*gen.GetUpcomingOrderResponse, error) {

	userID, ok := middleware.UserIDFromContext(ctx)

	if !ok {
		return nil, status.Error(
			codes.Unauthenticated,
			"authentication required",
		)
	}

	order, err := h.deliveryService.GetUpcomingOrder(
		ctx,
		userID,
	)

	if err != nil {

		if errors.Is(
			err,
			repository.ErrOrderNotFound,
		) {
			return &gen.GetUpcomingOrderResponse{
				Success:  true,
				Message:  "No upcoming order",
				HasOrder: false,
			}, nil
		}

		if errors.Is(
			err,
			service.ErrUserNotDeliveryPartner,
		) {
			return nil, status.Error(
				codes.PermissionDenied,
				"delivery partner access required",
			)
		}

		return nil, status.Error(
			codes.FailedPrecondition,
			err.Error(),
		)
	}

	return &gen.GetUpcomingOrderResponse{
		Success:        true,
		Message:        "Upcoming order found",
		HasOrder:       true,
		OrderId:        order.ID.Hex(),
		Restaurant:     order.RestaurantSnapshot.Name,
		RestaurantArea: order.RestaurantSnapshot.Address,
		CustomerName:   "",
		DeliveryArea:   order.DeliveryAddress.FullAddress,
		Earnings:       "",
		Items:          int32(len(order.Items)),
	}, nil
}
