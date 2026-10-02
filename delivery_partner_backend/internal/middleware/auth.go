package middleware

import (
	"context"
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type contextKey string

const userIDKey contextKey = "userID"

func SetUserID(
	ctx context.Context,
	userID bson.ObjectID,
) context.Context {
	return context.WithValue(
		ctx,
		userIDKey,
		userID,
	)
}

func UserIDFromContext(
	ctx context.Context,
) (bson.ObjectID, bool) {

	userID, ok := ctx.Value(userIDKey).(bson.ObjectID)

	return userID, ok
}

func AuthInterceptor(
	jwtSecret string,
) grpc.UnaryServerInterceptor {

	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {

		if strings.Contains(info.FullMethod, "SendLoginOTP") ||
			strings.Contains(info.FullMethod, "VerifyLoginOTP") ||
			strings.Contains(info.FullMethod, "RefreshToken") {
			return handler(ctx, req)
		}

		md, ok := metadata.FromIncomingContext(ctx)

		if !ok {
			return nil, status.Error(
				codes.Unauthenticated,
				"authentication required",
			)
		}

		values := md.Get("authorization")

		if len(values) == 0 {
			return nil, status.Error(
				codes.Unauthenticated,
				"authorization token missing",
			)
		}

		authHeader := values[0]

		if !strings.HasPrefix(authHeader, "Bearer ") {
			return nil, status.Error(
				codes.Unauthenticated,
				"invalid authorization header",
			)
		}

		tokenString := strings.TrimPrefix(
			authHeader,
			"Bearer ",
		)

		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {

				if token.Method != jwt.SigningMethodHS256 {
					return nil, fmt.Errorf(
						"unexpected signing method",
					)
				}

				return []byte(jwtSecret), nil
			},
		)

		if err != nil || !token.Valid {
			return nil, status.Error(
				codes.Unauthenticated,
				"invalid token",
			)
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			return nil, status.Error(
				codes.Unauthenticated,
				"invalid claims",
			)
		}

		role, ok := claims["role"].(string)

		if !ok || role != "delivery_partner" {
			return nil, status.Error(
				codes.PermissionDenied,
				"delivery partner access required",
			)
		}

		userIDString, ok := claims["userId"].(string)

		if !ok {
			return nil, status.Error(
				codes.Unauthenticated,
				"user id missing",
			)
		}

		userID, err := bson.ObjectIDFromHex(userIDString)

		if err != nil {
			return nil, status.Error(
				codes.Unauthenticated,
				"invalid user id",
			)
		}

		// Put user ID into context.
		ctx = SetUserID(ctx, userID)

		return handler(ctx, req)
	}
}
