package database

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateDriverIndexes(
	ctx context.Context,
	db *mongo.Database,
) error {

	collection := db.Collection("drivers")

	_, err := collection.Indexes().CreateOne(
		ctx,
		mongo.IndexModel{
			Keys: bson.D{
				{Key: "userId", Value: 1},
			},
			Options: nil,
		},
	)

	return err
}
