package repository

import (
	"context"
	"errors"
	"time"

	"delivery_partner_backend/internal/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type OrderRepository struct {
	collection *mongo.Collection
}

func NewOrderRepository(db *mongo.Database) *OrderRepository {
	return &OrderRepository{
		collection: db.Collection("orders"),
	}
}

func (r *OrderRepository) GetAvailableOrders(
	ctx context.Context,
) ([]*model.Order, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"orderStatus": "ready",
			"driver":      nil,
		},
		options.Find().SetSort(
			bson.D{
				{Key: "createdAt", Value: 1},
			},
		),
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var orders []*model.Order

	if err := cursor.All(ctx, &orders); err != nil {
		return nil, err
	}

	return orders, nil
}

func (r *OrderRepository) RejectOrder(
	ctx context.Context,
	orderID bson.ObjectID,
) error {

	// Rejection does not modify the order.
	// The order remains "ready" and can be accepted
	// by another delivery partner.

	var order model.Order

	err := r.collection.
		FindOne(
			ctx,
			bson.M{
				"_id":         orderID,
				"orderStatus": "ready",
				"driver":      nil,
			},
		).
		Decode(&order)

	return err
}

func (r *OrderRepository) SetDeliveryOTP(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	otpHash string,
	expiresAt time.Time,
) error {

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":         orderID,
			"driver":      driverID,
			"orderStatus": model.OrderStatusPickedUp,
		},
		bson.M{
			"$set": bson.M{
				"deliveryOtpHash":      otpHash,
				"deliveryOtpExpiresAt": expiresAt,
				"updatedAt":            time.Now(),
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return ErrOrderNotFound
	}

	return nil
}

func (r *OrderRepository) GetOrderForDriver(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) (*model.Order, error) {

	var order model.Order

	err := r.collection.
		FindOne(
			ctx,
			bson.M{
				"_id":    orderID,
				"driver": driverID,
			},
		).
		Decode(&order)

	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (r *OrderRepository) DeliverOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) error {

	now := time.Now()

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":         orderID,
			"driver":      driverID,
			"orderStatus": "picked_up",
		},
		bson.M{
			"$set": bson.M{
				"orderStatus":           "delivered",
				"deliveredAt":           now,
				"deliveryOtpVerifiedAt": now,
				"updatedAt":             now,
			},
			"$unset": bson.M{
				"deliveryOtpHash":      "",
				"deliveryOtpExpiresAt": "",
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

func (r *OrderRepository) GetCurrentOrder(
	ctx context.Context,
	driverID bson.ObjectID,
) (*model.Order, error) {

	var order model.Order

	err := r.collection.
		FindOne(
			ctx,
			bson.M{
				"driver": driverID,
				"orderStatus": bson.M{
					"$in": []string{
						"driver_assigned",
						"picked_up",
					},
				},
			},
			options.FindOne().SetSort(
				bson.D{
					{Key: "createdAt", Value: -1},
				},
			),
		).
		Decode(&order)

	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (r *OrderRepository) GetHistory(
	ctx context.Context,
	driverID bson.ObjectID,
	skip int64,
	limit int64,
) ([]*model.Order, error) {

	cursor, err := r.collection.Find(
		ctx,
		bson.M{
			"driver":      driverID,
			"orderStatus": "delivered",
		},
		options.Find().
			SetSkip(skip).
			SetLimit(limit).
			SetSort(
				bson.D{
					{Key: "deliveredAt", Value: -1},
				},
			),
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var orders []*model.Order

	if err := cursor.All(ctx, &orders); err != nil {
		return nil, err
	}

	return orders, nil
}

var ErrOrderNotFound = errors.New("order not found")

var ErrOrderAlreadyAccepted = errors.New(
	"order is no longer available",
)

func (r *OrderRepository) FindUpcomingOrder(
	ctx context.Context,
) (*model.Order, error) {

	var order model.Order

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"orderStatus": model.OrderStatusReady,
		},
	).Decode(&order)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, ErrOrderNotFound
		}

		return nil, err
	}

	return &order, nil
}

func (r *OrderRepository) AcceptOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) error {

	now := time.Now()

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":         orderID,
			"orderStatus": model.OrderStatusReady,
			"driver":      nil,
		},
		bson.M{
			"$set": bson.M{
				"driver":      driverID,
				"orderStatus": model.OrderStatusDriverAssigned,
				"updatedAt":   now,
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return ErrOrderAlreadyAccepted
	}

	return nil
}

func (r *OrderRepository) PickupOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) error {

	now := time.Now()

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":         orderID,
			"driver":      driverID,
			"orderStatus": model.OrderStatusDriverAssigned,
		},
		bson.M{
			"$set": bson.M{
				"orderStatus": model.OrderStatusPickedUp,
				"pickedUpAt":  now,
				"updatedAt":   now,
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return ErrOrderNotFound
	}

	return nil
}

func (r *OrderRepository) VerifyDeliveryOTP(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	otpHash string,
) error {

	now := time.Now()

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":             orderID,
			"driver":          driverID,
			"orderStatus":     model.OrderStatusPickedUp,
			"deliveryOtpHash": otpHash,
			"deliveryOtpExpiresAt": bson.M{
				"$gt": now,
			},
		},
		bson.M{
			"$set": bson.M{
				"orderStatus":           model.OrderStatusDelivered,
				"deliveryOtpVerifiedAt": now,
				"deliveredAt":           now,
				"updatedAt":             now,
			},
			"$unset": bson.M{
				"deliveryOtpHash":      "",
				"deliveryOtpExpiresAt": "",
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return ErrOrderNotFound
	}

	return nil
}
