package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type DriverStatus string

const (
	DriverStatusPending   DriverStatus = "pending"
	DriverStatusActive    DriverStatus = "active"
	DriverStatusSuspended DriverStatus = "suspended"
)

type DriverAvailability string

const (
	DriverAvailabilityOffline DriverAvailability = "offline"
	DriverAvailabilityOnline  DriverAvailability = "online"
	DriverAvailabilityOnBreak DriverAvailability = "on_break"
)

type Driver struct {
	ID     bson.ObjectID `bson:"_id,omitempty"`
	UserID bson.ObjectID `bson:"userId"`

	VehicleType   string `bson:"vehicleType"`
	VehicleNumber string `bson:"vehicleNumber"`
	LicenseNumber string `bson:"licenseNumber"`

	// Driver account status
	Status DriverStatus `bson:"status"`

	// Rider's current availability
	Availability DriverAvailability `bson:"availability"`

	IsVerified bool `bson:"isVerified"`

	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}