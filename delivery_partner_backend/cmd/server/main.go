package main

import (
	"log"
	"net"

	"delivery_partner_backend/gen"
	"delivery_partner_backend/internal/config"
	"delivery_partner_backend/internal/database"
	"delivery_partner_backend/internal/handler"
	"delivery_partner_backend/internal/middleware"
	"delivery_partner_backend/internal/repository"
	"delivery_partner_backend/internal/service"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

func main() {

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
	mongoDB, err :=
		database.ConnectMongo(cfg)

	if err != nil {
		log.Fatal(
			"MongoDB connection failed:",
			err,
		)
	}

	defer mongoDB.Client.Disconnect(nil)

	log.Println("MongoDB connected")

	// Repositories
	userRepository :=
		repository.NewUserRepository(
			mongoDB.Database,
		)

	orderRepository :=
		repository.NewOrderRepository(
			mongoDB.Database,
		)

	// Services
	authService :=
		service.NewAuthService(
			userRepository,
			cfg.JWTSecret,
		)

	deliveryService :=
		service.NewDeliveryService(
			orderRepository,
			userRepository,
		)

	// Handlers
	authHandler :=
		handler.NewAuthHandler(
			authService,
		)

	deliveryHandler :=
		handler.NewDeliveryHandler(
			deliveryService,
		)

	// gRPC
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(
			middleware.AuthInterceptor(
				cfg.JWTSecret,
			),
		),
	)

	gen.RegisterAuthServiceServer(
		grpcServer,
		authHandler,
	)

	gen.RegisterDeliveryServiceServer(
		grpcServer,
		deliveryHandler,
	)

	// Listener
	listener, err :=
		net.Listen(
			"tcp",
			":"+cfg.Port,
		)

	if err != nil {
		log.Fatal(err)
	}

	log.Println(
		"Delivery Partner gRPC server running on :" +
			cfg.Port,
	)

	if err :=
		grpcServer.Serve(listener); err != nil {

		log.Fatal(err)
	}
}
