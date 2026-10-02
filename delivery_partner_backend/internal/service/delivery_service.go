package service

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"

	"delivery_partner_backend/internal/model"
	"delivery_partner_backend/internal/repository"
)

type DeliveryService struct {
	orderRepository  *repository.OrderRepository
	userRepository   *repository.UserRepository
	driverRepository *repository.DriverRepository

	deliveryOTPStore *DeliveryOTPStore
}

func NewDeliveryService(
	orderRepository *repository.OrderRepository,
	userRepository *repository.UserRepository,
	driverRepository *repository.DriverRepository,
) *DeliveryService {

	return &DeliveryService{
		orderRepository:  orderRepository,
		userRepository:   userRepository,
		driverRepository: driverRepository,

		deliveryOTPStore: NewDeliveryOTPStore(),
	}
}

func (s *DeliveryService) GetAvailableOrders(
	ctx context.Context,
) ([]*model.Order, error) {

	return s.orderRepository.GetAvailableOrders(ctx)
}

func (s *DeliveryService) AcceptOrder(
	ctx context.Context,
	userID bson.ObjectID,
	orderID string,
) error {

	id, err := bson.ObjectIDFromHex(orderID)

	if err != nil {
		return errors.New("invalid order id")
	}

	user, err := s.userRepository.FindByID(
		ctx,
		userID,
	)

	if err != nil {
		return err
	}

	if user.Role != model.UserRoleDeliveryPartner {
		return ErrUserNotDeliveryPartner
	}

	driver, err := s.driverRepository.FindByUserID(
		ctx,
		userID,
	)

	if err != nil {
		return err
	}

	if driver.Status != model.DriverStatusActive {
		return errors.New("driver account is not active")
	}

	if !driver.IsVerified {
		return errors.New("driver is not verified")
	}

	if driver.Availability != model.DriverAvailabilityOnline {
		return errors.New("driver must be online")
	}

	return s.orderRepository.AcceptOrder(
		ctx,
		id,
		userID,
	)
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
	userID bson.ObjectID,
	orderID string,
) error {

	id, err := bson.ObjectIDFromHex(orderID)

	if err != nil {
		return errors.New("invalid order id")
	}

	return s.orderRepository.PickupOrder(
		ctx,
		id,
		userID,
	)
}

func (s *DeliveryService) RequestDeliveryOTP(
	ctx context.Context,
	userID bson.ObjectID,
	orderID string,
) error {

	id, err := bson.ObjectIDFromHex(orderID)
	if err != nil {
		return errors.New("invalid order id")
	}

	// Make sure this order belongs to this driver
	// and is currently picked up.
	order, err := s.orderRepository.GetOrderForDriver(
		ctx,
		id,
		userID,
	)
	if err != nil {
		return errors.New("order not found for this driver")
	}

	if order.OrderStatus != model.OrderStatusPickedUp {
		return errors.New(
			"delivery OTP can only be requested after pickup",
		)
	}

	otp, err := generateDeliveryOTP()
	if err != nil {
		return errors.New("failed to generate delivery OTP")
	}

	otpHash := hashDeliveryOTP(otp)

	expiresAt := time.Now().Add(5 * time.Minute)

	err = s.orderRepository.SetDeliveryOTP(
		ctx,
		id,
		userID,
		otpHash,
		expiresAt,
	)
	if err != nil {
		return err
	}

	// Development only.
	// Later this should be sent to the customer.
	fmt.Printf(
		"\n========== DELIVERY OTP ==========\n",
	)
	fmt.Printf("Order: %s\n", id.Hex())
	fmt.Printf("OTP: %s\n", otp)
	fmt.Printf(
		"Expires: %s\n",
		expiresAt.Format(time.RFC3339),
	)
	fmt.Printf(
		"==================================\n\n",
	)

	return nil
}

func (s *DeliveryService) VerifyDeliveryOTP(
	ctx context.Context,
	userID bson.ObjectID,
	orderID string,
	otp string,
) error {

	id, err := bson.ObjectIDFromHex(orderID)
	if err != nil {
		return errors.New("invalid order id")
	}

	if len(otp) != 4 {
		return errors.New("OTP must contain 4 digits")
	}

	for _, ch := range otp {
		if ch < '0' || ch > '9' {
			return errors.New("OTP must contain 4 digits")
		}
	}

	otpHash := hashDeliveryOTP(otp)

	err = s.orderRepository.VerifyDeliveryOTP(
		ctx,
		id,
		userID,
		otpHash,
	)

	if err != nil {
		return errors.New("invalid or expired delivery OTP")
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

func (s *DeliveryService) GetUpcomingOrder(
	ctx context.Context,
	userID bson.ObjectID,
) (*model.Order, error) {

	user, err := s.userRepository.FindByID(
		ctx,
		userID,
	)

	if err != nil {
		return nil, err
	}

	if user.Role != model.UserRoleDeliveryPartner {
		return nil, ErrUserNotDeliveryPartner
	}

	if !user.IsActive {
		return nil, errors.New(
			"delivery partner account is inactive",
		)
	}

	driver, err := s.driverRepository.FindByUserID(
		ctx,
		userID,
	)

	if err != nil {
		return nil, err
	}

	if driver.Status != model.DriverStatusActive {
		return nil, errors.New(
			"driver account is not active",
		)
	}

	if !driver.IsVerified {
		return nil, errors.New(
			"driver is not verified",
		)
	}

	if driver.Availability != model.DriverAvailabilityOnline {
		return nil, errors.New(
			"driver must be online",
		)
	}

	return s.orderRepository.FindUpcomingOrder(ctx)
}

func generateDeliveryOTP() (string, error) {
	var bytes [2]byte

	_, err := rand.Read(bytes[:])
	if err != nil {
		return "", err
	}

	number := int(bytes[0])<<8 | int(bytes[1])
	number = number % 10000

	return fmt.Sprintf("%04d", number), nil
}

func hashDeliveryOTP(otp string) string {
	hash := sha256.Sum256([]byte(otp))
	return hex.EncodeToString(hash[:])
}
