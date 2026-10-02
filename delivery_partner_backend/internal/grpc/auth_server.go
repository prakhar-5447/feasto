package grpc

import (
	"log"
	"net"

	"delivery_partner_backend/gen"
	"delivery_partner_backend/internal/handler"
	"delivery_partner_backend/internal/middleware"

	"google.golang.org/grpc"
)

type Server struct {
	grpcServer *grpc.Server
}

func NewServer(
	authHandler *handler.AuthHandler,
	deliveryHandler *handler.DeliveryHandler,
	jwtSecret string,
) *Server {

	log.Println("Creating gRPC server...")

	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(
			middleware.AuthInterceptor(jwtSecret),
		),
	)

	// Register Auth service
	gen.RegisterAuthServiceServer(
		grpcServer,
		authHandler,
	)

	log.Println("AuthService registered")

	// Register Delivery service
	gen.RegisterDeliveryServiceServer(
		grpcServer,
		deliveryHandler,
	)

	log.Println("DeliveryService registered")

	return &Server{
		grpcServer: grpcServer,
	}
}

func (s *Server) Start(port string) error {

	address := "0.0.0.0:" + port

	listener, err := net.Listen("tcp", address)
	if err != nil {
		return err
	}

	log.Println("========================================")
	log.Println("gRPC SERVER STARTED")
	log.Println("Listening:", address)
	log.Println("========================================")

	return s.grpcServer.Serve(listener)
}
