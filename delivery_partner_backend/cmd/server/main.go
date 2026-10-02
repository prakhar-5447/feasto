package main

import (
	"log"

	"delivery_partner_backend/internal/config"
	"delivery_partner_backend/internal/database"
	grpcserver "delivery_partner_backend/internal/grpc"
	"delivery_partner_backend/internal/handler"
	"delivery_partner_backend/internal/repository"
	"delivery_partner_backend/internal/service"

	"github.com/joho/godotenv"
)

func main() {

	log.Println("========================================")
	log.Println("Starting Feasto Delivery Partner Backend")
	log.Println("========================================")

	_ = godotenv.Load()

	cfg := config.Load()

	if cfg.MongoURI == "" {
		log.Fatal("MONGO_URI is missing")
	}

	if cfg.Database == "" {
		log.Fatal("MONGO_DATABASE is missing")
	}

	if cfg.JWTSecret == "" {
		log.Fatal("JWT_SECRET is missing")
	}

	if cfg.Port == "" {
		cfg.Port = "50051"
	}

	// MongoDB
	mongoDB, err := database.ConnectMongo(cfg)
	if err != nil {
		log.Fatal("MongoDB connection failed:", err)
	}

	defer mongoDB.Client.Disconnect(nil)

	log.Println("MongoDB connected")

	// Repositories
	userRepository := repository.NewUserRepository(
		mongoDB.Database,
	)

	driverRepository := repository.NewDriverRepository(
		mongoDB.Database,
	)

	orderRepository := repository.NewOrderRepository(
		mongoDB.Database,
	)

	// Services
	authService := service.NewAuthService(
		userRepository,
		cfg.JWTSecret,
	)

	deliveryService := service.NewDeliveryService(
		orderRepository,
		userRepository,
		driverRepository,
	)

	driverService := service.NewDriverService(
		driverRepository,
		userRepository,
	)

	// Handlers
	authHandler := handler.NewAuthHandler(
		authService,
		driverService,
	)

	deliveryHandler := handler.NewDeliveryHandler(
		deliveryService,
		driverService,
	)

	// gRPC Server
	grpcServer := grpcserver.NewServer(
		authHandler,
		deliveryHandler,
		cfg.JWTSecret,
	)

	// Start
	if err := grpcServer.Start(cfg.Port); err != nil {
		log.Fatal("gRPC server error:", err)
	}
}
