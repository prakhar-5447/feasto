package repository

import (
	"context"
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

func (r *OrderRepository) AcceptOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	driverName string,
	driverPhone string,
) (*model.Order, error) {

	filter := bson.M{
		"_id":         orderID,
		"orderStatus": "ready",
		"driver":      nil,
	}

	update := bson.M{
		"$set": bson.M{
			"driver": driverID,
			"driverSnapshot": bson.M{
				"name":  driverName,
				"phone": driverPhone,
			},
			"orderStatus": "driver_assigned",
			"updatedAt":   time.Now(),
		},
	}

	var result model.Order

	err := r.collection.
		FindOneAndUpdate(
			ctx,
			filter,
			update,
			options.FindOneAndUpdate().
				SetReturnDocument(options.After),
		).
		Decode(&result)

	if err != nil {
		return nil, err
	}

	return &result, nil
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

func (r *OrderRepository) PickupOrder(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
) (*model.Order, error) {

	now := time.Now()

	filter := bson.M{
		"_id":         orderID,
		"driver":      driverID,
		"orderStatus": "driver_assigned",
	}

	update := bson.M{
		"$set": bson.M{
			"orderStatus": "picked_up",
			"pickedUpAt":  now,
			"updatedAt":   now,
		},
	}

	var order model.Order

	err := r.collection.
		FindOneAndUpdate(
			ctx,
			filter,
			update,
			options.FindOneAndUpdate().
				SetReturnDocument(options.After),
		).
		Decode(&order)

	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (r *OrderRepository) SetDeliveryOTP(
	ctx context.Context,
	orderID bson.ObjectID,
	driverID bson.ObjectID,
	hash string,
	expiresAt time.Time,
) error {

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id":         orderID,
			"driver":      driverID,
			"orderStatus": "picked_up",
		},
		bson.M{
			"$set": bson.M{
				"deliveryOtpHash":      hash,
				"deliveryOtpExpiresAt": expiresAt,
				"updatedAt":            time.Now(),
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
