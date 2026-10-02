package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type UserRole string

const (
	UserRoleCustomer          UserRole = "customer"
	UserRoleRestaurantPartner UserRole = "restaurant_partner"
	UserRoleDeliveryPartner   UserRole = "delivery_partner"
)

type User struct {
	ID        bson.ObjectID `bson:"_id,omitempty"`
	Name      string        `bson:"name,omitempty"`
	Role      UserRole      `bson:"role"`
	Phone     string        `bson:"phone"`
	Email     string        `bson:"email,omitempty"`
	Avatar    *string       `bson:"avatar,omitempty"`
	IsActive  bool          `bson:"isActive"`
	LastLogin *time.Time    `bson:"lastLogin,omitempty"`
	CreatedAt time.Time     `bson:"createdAt"`
	UpdatedAt time.Time     `bson:"updatedAt"`
}
