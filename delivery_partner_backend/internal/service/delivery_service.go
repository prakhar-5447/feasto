package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"

	"delivery_partner_backend/internal/model"
	"delivery_partner_backend/internal/repository"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type DeliveryService struct {
	orderRepository *repository.OrderRepository
	userRepository  *repository.UserRepository
}

func NewDeliveryService(
	orderRepository *repository.OrderRepository,
	userRepository *repository.UserRepository,
) *DeliveryService {

	return &DeliveryService{
		orderRepository: orderRepository,
		userRepository:  userRepository,
	}
}

func (s *DeliveryService) GetAvailableOrders(
	ctx context.Context,
) ([]*model.Order, error) {

	return s.orderRepository.GetAvailableOrders(ctx)
}

func (s *DeliveryService) AcceptOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) (*model.Order, error) {

	driver, err := s.userRepository.FindByID(
		ctx,
		driverID,
	)

	if err != nil {
		return nil, fmt.Errorf("driver not found")
	}

	if driver.Role != "delivery_partner" {
		return nil, fmt.Errorf("not a delivery partner")
	}

	if !driver.IsActive {
		return nil, fmt.Errorf("driver account inactive")
	}

	order, err := s.orderRepository.AcceptOrder(
		ctx,
		orderID,
		driverID,
		driver.Name,
		driver.Phone,
	)

	if err != nil {

		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf(
				"order is no longer available",
			)
		}

		return nil, err
	}

	return order, nil
}

func (s *DeliveryService) RejectOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	reason string,
) error {

	// For now rejection is simply recorded in the
	// delivery backend logic.
	//
	// The Order remains READY because another driver
	// must be able to accept it.

	_, err := s.orderRepository.GetOrderForDriver(
		ctx,
		orderID,
		driverID,
	)

	// If the driver has already accepted it,
	// rejecting is not allowed.
	if err == nil {
		return fmt.Errorf(
			"cannot reject an already assigned order",
		)
	}

	// Make sure the order is still available.
	orders, err := s.orderRepository.GetAvailableOrders(ctx)

	if err != nil {
		return err
	}

	for _, order := range orders {
		if order.ID == orderID {
			return nil
		}
	}

	return fmt.Errorf("order is not available")
}

func (s *DeliveryService) PickupOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) (*model.Order, error) {

	order, err := s.orderRepository.PickupOrder(
		ctx,
		orderID,
		driverID,
	)

	if err != nil {
		return nil, fmt.Errorf(
			"order cannot be picked up: %w",
			err,
		)
	}

	return order, nil
}

func hashOTP(otp string) string {

	hash := sha256.Sum256(
		[]byte(otp),
	)

	return hex.EncodeToString(
		hash[:],
	)
}

func (s *DeliveryService) RequestDeliveryOTP(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) error {

	order, err := s.orderRepository.GetOrderForDriver(
		ctx,
		orderID,
		driverID,
	)

	if err != nil {
		return fmt.Errorf("order not found")
	}

	if order.OrderStatus != "picked_up" {
		return fmt.Errorf(
			"order has not been picked up",
		)
	}

	otp, err := generateOTP()

	if err != nil {
		return err
	}

	expiresAt := time.Now().Add(5 * time.Minute)

	err = s.orderRepository.SetDeliveryOTP(
		ctx,
		orderID,
		driverID,
		hashOTP(otp),
		expiresAt,
	)

	if err != nil {
		return err
	}

	customer, err := s.userRepository.FindByID(
		ctx,
		order.Customer,
	)

	if err != nil {
		return fmt.Errorf(
			"customer not found",
		)
	}

	// DEVELOPMENT ONLY.
	//
	// Production:
	// send this OTP through SMS/WhatsApp/notification.
	fmt.Printf(
		"\nDELIVERY OTP\nCustomer: %s\nPhone: %s\nOrder: %s\nOTP: %s\n\n",
		customer.Name,
		customer.Phone,
		order.OrderID,
		otp,
	)

	return nil
}

func (s *DeliveryService) VerifyDeliveryOTP(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	otp string,
) error {

	order, err := s.orderRepository.GetOrderForDriver(
		ctx,
		orderID,
		driverID,
	)

	if err != nil {
		return fmt.Errorf("order not found")
	}

	if order.OrderStatus != "picked_up" {
		return fmt.Errorf(
			"order is not ready for delivery completion",
		)
	}

	if order.DeliveryOTPHash == "" {
		return fmt.Errorf(
			"delivery OTP has not been requested",
		)
	}

	if order.DeliveryOTPExpiresAt == nil {
		return fmt.Errorf(
			"delivery OTP expiry missing",
		)
	}

	if time.Now().After(
		*order.DeliveryOTPExpiresAt,
	) {
		return fmt.Errorf("delivery OTP expired")
	}

	if hashOTP(otp) != order.DeliveryOTPHash {
		return fmt.Errorf("invalid delivery OTP")
	}

	err = s.orderRepository.DeliverOrder(
		ctx,
		orderID,
		driverID,
	)

	if err != nil {
		return fmt.Errorf(
			"failed to complete delivery",
		)
	}

	return nil
}

func (s *DeliveryService) GetCurrentOrder(
	ctx context.Context,
	driverID bson.ObjectID,
) (*model.Order, error) {

	return s.orderRepository.GetCurrentOrder(
		ctx,
		driverID,
	)
}

func (s *DeliveryService) GetHistory(
	ctx context.Context,
	driverID bson.ObjectID,
	page int,
	limit int,
) ([]*model.Order, error) {

	if page < 1 {
		page = 1
	}

	if limit <= 0 || limit > 50 {
		limit = 20
	}

	skip := int64(
		(page - 1) * limit,
	)

	return s.orderRepository.GetHistory(
		ctx,
		driverID,
		skip,
		int64(limit),
	)
}
