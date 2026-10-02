package service

import (
	"context"
	"errors"
	"strings"

	"delivery_partner_backend/internal/model"
	"delivery_partner_backend/internal/repository"

	"go.mongodb.org/mongo-driver/v2/bson"
)

var (
	ErrInvalidDriverProfile   = errors.New("invalid driver profile")
	ErrDriverAlreadyExists    = errors.New("driver profile already exists")
	ErrUserNotDeliveryPartner = errors.New("user is not a delivery partner")
)

type DriverService struct {
	driverRepository *repository.DriverRepository
	userRepository   *repository.UserRepository
}

func NewDriverService(
	driverRepository *repository.DriverRepository,
	userRepository *repository.UserRepository,
) *DriverService {

	return &DriverService{
		driverRepository: driverRepository,
		userRepository:   userRepository,
	}
}

func (s *DriverService) CompleteProfile(
	ctx context.Context,
	userID bson.ObjectID,
	name string,
	email string,
	vehicleType string,
	vehicleNumber string,
	licenseNumber string,
) error {

	name = strings.TrimSpace(name)
	email = strings.TrimSpace(email)
	vehicleType = strings.TrimSpace(vehicleType)
	vehicleNumber = strings.TrimSpace(vehicleNumber)
	licenseNumber = strings.TrimSpace(licenseNumber)

	if name == "" ||
		vehicleType == "" ||
		vehicleNumber == "" ||
		licenseNumber == "" {

		return ErrInvalidDriverProfile
	}

	user, err := s.userRepository.FindByID(
		ctx,
		userID,
	)

	if err != nil {
		return err
	}

	if user.Role != "delivery_partner" {
		return ErrUserNotDeliveryPartner
	}

	existingDriver, err := s.driverRepository.FindByUserID(
		ctx,
		userID,
	)

	if err == nil && existingDriver != nil {
		return ErrDriverAlreadyExists
	}

	if err != nil &&
		!errors.Is(err, repository.ErrDriverNotFound) {

		return err
	}

	err = s.userRepository.UpdateProfile(
		ctx,
		userID,
		name,
		email,
	)

	if err != nil {
		return err
	}

	driver := &model.Driver{
		UserID:        userID,
		VehicleType:   vehicleType,
		VehicleNumber: vehicleNumber,
		LicenseNumber: licenseNumber,

		Status:       model.DriverStatusPending,
		Availability: model.DriverAvailabilityOffline,

		IsVerified: false,
	}

	return s.driverRepository.Create(
		ctx,
		driver,
	)
}

type DriverProfile struct {
	UserID        string
	Name          string
	Email         string
	Phone         string
	VehicleNumber string
	VehicleType   string
	Availability  string
}

func (s *DriverService) GetProfile(
	ctx context.Context,
	userID bson.ObjectID,
) (*DriverProfile, error) {

	user, err := s.userRepository.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if user.Role != model.UserRoleDeliveryPartner {
		return nil, ErrUserNotDeliveryPartner
	}

	driver, err := s.driverRepository.FindByUserID(
		ctx,
		userID,
	)
	if err != nil {
		return nil, err
	}

	return &DriverProfile{
		UserID:        user.ID.Hex(),
		Name:          user.Name,
		Email:         user.Email,
		Phone:         user.Phone,
		VehicleNumber: driver.VehicleNumber,
		VehicleType:   driver.VehicleType,
		Availability:  string(driver.Availability),
	}, nil
}

var ErrInvalidAvailability = errors.New(
	"invalid driver availability",
)

var ErrDriverNotAvailable = errors.New(
	"driver is not available",
)

func (s *DriverService) UpdateAvailability(
	ctx context.Context,
	userID bson.ObjectID,
	availability string,
) error {

	var status model.DriverAvailability

	switch availability {
	case "offline":
		status = model.DriverAvailabilityOffline

	case "online":
		status = model.DriverAvailabilityOnline

	case "onBreak":
		status = model.DriverAvailabilityOnBreak

	default:
		return ErrInvalidAvailability
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

	if !user.IsActive {
		return errors.New(
			"delivery partner account is inactive",
		)
	}

	driver, err := s.driverRepository.FindByUserID(
		ctx,
		userID,
	)

	if err != nil {
		return err
	}

	if driver.Status != model.DriverStatusActive {
		return errors.New(
			"driver account is not active",
		)
	}

	if !driver.IsVerified {
		return errors.New(
			"driver is not verified",
		)
	}

	return s.driverRepository.UpdateAvailability(
		ctx,
		userID,
		status,
	)
}

func (s *DriverService) GetAvailability(
	ctx context.Context,
	userID bson.ObjectID,
) (model.DriverAvailability, error) {

	user, err := s.userRepository.FindByID(ctx, userID)
	if err != nil {
		return "", err
	}

	if user.Role != model.UserRoleDeliveryPartner {
		return "", ErrUserNotDeliveryPartner
	}

	if !user.IsActive {
		return "", errors.New("delivery partner account is inactive")
	}

	driver, err := s.driverRepository.FindByUserID(ctx, userID)
	if err != nil {
		return "", err
	}

	return driver.Availability, nil
}