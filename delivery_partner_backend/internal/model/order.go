package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type RestaurantSnapshot struct {
	Name    string `bson:"name"`
	Address string `bson:"address"`
}

type DeliveryAddress struct {
	FullAddress string  `bson:"fullAddress"`
	Lat         float64 `bson:"lat"`
	Lng         float64 `bson:"lng"`
}

type Billing struct {
	ItemTotal   float64 `bson:"itemTotal"`
	Discount    float64 `bson:"discount"`
	DeliveryFee float64 `bson:"deliveryFee"`
	PlatformFee float64 `bson:"platformFee"`
	GST         float64 `bson:"gst"`
	GrandTotal  float64 `bson:"grandTotal"`
}

type DriverSnapshot struct {
	Name  string `bson:"name"`
	Phone string `bson:"phone"`
}

type Order struct {
	ID bson.ObjectID `bson:"_id,omitempty"`

	OrderID string `bson:"orderId"`

	Customer   bson.ObjectID `bson:"customer"`
	Restaurant bson.ObjectID `bson:"restaurant"`

	RestaurantSnapshot RestaurantSnapshot `bson:"restaurantSnapshot"`

	Billing Billing `bson:"billing"`

	DeliveryAddress DeliveryAddress `bson:"deliveryAddress"`

	OrderStatus   string `bson:"orderStatus"`
	PaymentStatus string `bson:"paymentStatus"`

	Driver         *bson.ObjectID  `bson:"driver,omitempty"`
	DriverSnapshot *DriverSnapshot `bson:"driverSnapshot,omitempty"`

	PickedUpAt  *time.Time `bson:"pickedUpAt,omitempty"`
	DeliveredAt *time.Time `bson:"deliveredAt,omitempty"`

	DeliveryOTPHash       string     `bson:"deliveryOtpHash,omitempty"`
	DeliveryOTPExpiresAt  *time.Time `bson:"deliveryOtpExpiresAt,omitempty"`
	DeliveryOTPVerifiedAt *time.Time `bson:"deliveryOtpVerifiedAt,omitempty"`

	CreatedAt time.Time `bson:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt"`
}
