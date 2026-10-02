package repository

import (
	"context"
	"errors"
	"time"

	"delivery_partner_backend/internal/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

var ErrUserNotFound = errors.New("user not found")

type UserRepository struct {
	collection *mongo.Collection
}

func NewUserRepository(db *mongo.Database) *UserRepository {
	return &UserRepository{
		collection: db.Collection("users"),
	}
}

func (r *UserRepository) FindByID(
	ctx context.Context,
	userID bson.ObjectID,
) (*model.User, error) {

	var user model.User

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"_id": userID,
		},
	).Decode(&user)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrUserNotFound
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) FindByPhone(
	ctx context.Context,
	phone string,
) (*model.User, error) {

	var user model.User

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"phone": phone,
		},
	).Decode(&user)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrUserNotFound
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *UserRepository) UpdateProfile(
	ctx context.Context,
	userID bson.ObjectID,
	name string,
	email string,
) error {

	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id": userID,
		},
		bson.M{
			"$set": bson.M{
				"name":      name,
				"email":     email,
				"updatedAt": time.Now(),
			},
		},
	)

	return err
}