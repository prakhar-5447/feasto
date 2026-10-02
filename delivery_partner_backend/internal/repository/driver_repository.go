package repository

import (
	"context"
	"errors"
	"time"

	"delivery_partner_backend/internal/model"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

var ErrDriverNotFound = errors.New("driver not found")

type DriverRepository struct {
	collection *mongo.Collection
}

func NewDriverRepository(db *mongo.Database) *DriverRepository {
	return &DriverRepository{
		collection: db.Collection("driver"),
	}
}

func (r *DriverRepository) Create(
	ctx context.Context,
	driver *model.Driver,
) error {

	now := time.Now()

	driver.ID = bson.NewObjectID()
	driver.CreatedAt = now
	driver.UpdatedAt = now

	_, err := r.collection.InsertOne(
		ctx,
		driver,
	)

	return err
}

func (r *DriverRepository) FindByUserID(
	ctx context.Context,
	userID bson.ObjectID,	
) (*model.Driver, error) {

	var driver model.Driver

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"userId": userID,
		},
	).Decode(&driver)

	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, ErrDriverNotFound
	}

	if err != nil {
		return nil, err
	}

	return &driver, nil
}

func (r *DriverRepository) Update(
	ctx context.Context,
	driver *model.Driver,
) error {

	driver.UpdatedAt = time.Now()

	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"_id": driver.ID,
		},
		bson.M{
			"$set": bson.M{
				"vehicleType":   driver.VehicleType,
				"vehicleNumber": driver.VehicleNumber,
				"licenseNumber": driver.LicenseNumber,
				"updatedAt":     driver.UpdatedAt,
			},
		},
	)

	return err
}

func (r *DriverRepository) UpdateAvailability(
	ctx context.Context,
	userID bson.ObjectID,
	availability model.DriverAvailability,
) error {
	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{
			"userId": userID,
		},
		bson.M{
			"$set": bson.M{
				"availability": availability,
				"updatedAt":    time.Now(),
			},
		},
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return ErrDriverNotFound
	}

	return nil
}