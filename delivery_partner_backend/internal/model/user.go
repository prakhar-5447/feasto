package model

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type User struct {
	ID        bson.ObjectID `bson:"_id,omitempty"`
	Name      string        `bson:"name,omitempty"`
	Role      string        `bson:"role"`
	Phone     string        `bson:"phone"`
	Email     string        `bson:"email,omitempty"`
	Avatar    *string       `bson:"avatar,omitempty"`
	IsActive  bool          `bson:"isActive"`
	LastLogin *time.Time    `bson:"lastLogin,omitempty"`
	CreatedAt time.Time     `bson:"createdAt"`
	UpdatedAt time.Time     `bson:"updatedAt"`
}