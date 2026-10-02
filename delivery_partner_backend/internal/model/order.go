package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type RestaurantSnapshot struct {
	Name    string `bson:"name"`
	Address string `bson:"address"`
}

type OrderItem struct {
	Food     *bson.ObjectID `bson:"food,omitempty"`
	Name     string         `bson:"name"`
	Image    string         `bson:"image"`
	Price    float64        `bson:"price"`
	Quantity int            `bson:"quantity"`
	Total    float64        `bson:"total"`
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

type OrderStatus string

const (
	OrderStatusPendingPayment    OrderStatus = "pending_payment"
	OrderStatusPlaced            OrderStatus = "placed"
	OrderStatusAccepted          OrderStatus = "accepted"
	OrderStatusPreparing         OrderStatus = "preparing"
	OrderStatusReady             OrderStatus = "ready"
	OrderStatusDriverAssigned    OrderStatus = "driver_assigned"
	OrderStatusPickedUp          OrderStatus = "picked_up"
	OrderStatusDelivered         OrderStatus = "delivered"
	OrderStatusCancelled         OrderStatus = "cancelled"
	OrderStatusCancelledReturning OrderStatus = "cancelled_returning"
	OrderStatusReturnReceived    OrderStatus = "return_received"
	OrderStatusRefundProcessing  OrderStatus = "refund_processing"
	OrderStatusRefunded          OrderStatus = "refunded"
)

type Order struct {
	ID bson.ObjectID `bson:"_id,omitempty"`

	OrderID string `bson:"orderId"`

	Customer   bson.ObjectID `bson:"customer"`
	Restaurant bson.ObjectID `bson:"restaurant"`

	RestaurantSnapshot RestaurantSnapshot `bson:"restaurantSnapshot"`

	Items []OrderItem `bson:"items"`

	Billing Billing `bson:"billing"`

	DeliveryAddress DeliveryAddress `bson:"deliveryAddress"`

	OrderStatus   OrderStatus `bson:"orderStatus"`
	PaymentStatus string      `bson:"paymentStatus"`

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