package handler

import (
	"context"
	"fmt"

	"delivery_partner_backend/gen"
	"delivery_partner_backend/internal/middleware"
	"delivery_partner_backend/internal/model"
	"delivery_partner_backend/internal/service"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type DeliveryHandler struct {
	gen.UnimplementedDeliveryServiceServer

	deliveryService *service.DeliveryService
}

func NewDeliveryHandler(
	deliveryService *service.DeliveryService,
) *DeliveryHandler {

	return &DeliveryHandler{
		deliveryService: deliveryService,
	}
}

func getDriverID(ctx context.Context) (bson.ObjectID, error) {

	value := ctx.Value(
		middleware.UserIDKey,
	)

	if value == nil {
		return bson.NilObjectID,
			fmt.Errorf("driver not authenticated")
	}

	driverID, ok := value.(bson.ObjectID)

	if !ok {
		return bson.NilObjectID,
			fmt.Errorf("invalid driver identity")
	}

	return driverID, nil
}

func orderToProto(
	order *model.Order,
	customer *model.User,
) *gen.DeliveryOrder {

	result := &gen.DeliveryOrder{
		Id:          order.ID.Hex(),
		OrderId:     order.OrderID,
		GrandTotal:  order.Billing.GrandTotal,
		OrderStatus: order.OrderStatus,
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

	driverID, err := getDriverID(ctx)

	if err != nil {
		return nil, err
	}

	orderID, err := bson.ObjectIDFromHex(
		req.GetOrderId(),
	)

	if err != nil {
		return &gen.AcceptOrderResponse{
			Success: false,
			Message: "invalid order id",
		}, nil
	}

	order, err :=
		h.deliveryService.AcceptOrder(
			ctx,
			orderID,
			driverID,
		)

	if err != nil {
		return &gen.AcceptOrderResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.AcceptOrderResponse{
		Success: true,
		Message: "Order accepted",
		Order:   orderToProto(order, nil),
	}, nil
}

func (h *DeliveryHandler) RejectOrder(
	ctx context.Context,
	req *gen.RejectOrderRequest,
) (*gen.RejectOrderResponse, error) {

	driverID, err := getDriverID(ctx)

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

	driverID, err := getDriverID(ctx)

	if err != nil {
		return nil, err
	}

	orderID, err := bson.ObjectIDFromHex(
		req.GetOrderId(),
	)

	if err != nil {
		return &gen.PickupOrderResponse{
			Success: false,
			Message: "invalid order id",
		}, nil
	}

	order, err :=
		h.deliveryService.PickupOrder(
			ctx,
			orderID,
			driverID,
		)

	if err != nil {
		return &gen.PickupOrderResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.PickupOrderResponse{
		Success: true,
		Message: "Order picked up",
		Order:   orderToProto(order, nil),
	}, nil
}

func (h *DeliveryHandler) RequestDeliveryOTP(
	ctx context.Context,
	req *gen.RequestDeliveryOTPRequest,
) (*gen.RequestDeliveryOTPResponse, error) {

	driverID, err := getDriverID(ctx)

	if err != nil {
		return nil, err
	}

	orderID, err := bson.ObjectIDFromHex(
		req.GetOrderId(),
	)

	if err != nil {
		return &gen.RequestDeliveryOTPResponse{
			Success: false,
			Message: "invalid order id",
		}, nil
	}

	err = h.deliveryService.RequestDeliveryOTP(
		ctx,
		orderID,
		driverID,
	)

	if err != nil {
		return &gen.RequestDeliveryOTPResponse{
			Success: false,
			Message: err.Error(),
		}, nil
	}

	return &gen.RequestDeliveryOTPResponse{
		Success: true,
		Message: "Delivery OTP sent to customer",
	}, nil
}

func (h *DeliveryHandler) VerifyDeliveryOTP(
	ctx context.Context,
	req *gen.VerifyDeliveryOTPRequest,
) (*gen.VerifyDeliveryOTPResponse, error) {

	driverID, err := getDriverID(ctx)

	if err != nil {
		return nil, err
	}

	orderID, err := bson.ObjectIDFromHex(
		req.GetOrderId(),
	)

	if err != nil {
		return &gen.VerifyDeliveryOTPResponse{
			Success: false,
			Message: "invalid order id",
		}, nil
	}

	err = h.deliveryService.VerifyDeliveryOTP(
		ctx,
		orderID,
		driverID,
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
		Message: "Delivery completed successfully",
	}, nil
}

func (h *DeliveryHandler) GetCurrentOrder(
	ctx context.Context,
	req *gen.GetCurrentOrderRequest,
) (*gen.GetCurrentOrderResponse, error) {

	driverID, err := getDriverID(ctx)

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

	driverID, err := getDriverID(ctx)

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
