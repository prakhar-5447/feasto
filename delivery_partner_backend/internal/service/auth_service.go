package service

import (
	"context"
	"crypto/rand"
	"fmt"
	"math/big"
	"sync"
	"time"

	"delivery_partner_backend/internal/repository"

	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type OTPData struct {
	OTP       string
	ExpiresAt time.Time
}

type AuthService struct {
	userRepository *repository.UserRepository
	jwtSecret      string

	otpStore map[string]OTPData
	mu       sync.RWMutex
}

func NewAuthService(
	userRepository *repository.UserRepository,
	jwtSecret string,
) *AuthService {

	return &AuthService{
		userRepository: userRepository,
		jwtSecret:      jwtSecret,
		otpStore:       make(map[string]OTPData),
	}
}

func generateOTP() (string, error) {

	max := big.NewInt(1000000)

	n, err := rand.Int(rand.Reader, max)

	if err != nil {
		return "", err
	}

	return fmt.Sprintf("%06d", n.Int64()), nil
}

func (s *AuthService) SendLoginOTP(
	ctx context.Context,
	phone string,
) error {

	user, err := s.userRepository.FindByPhone(
		ctx,
		phone,
	)

	if err != nil {
		return fmt.Errorf("user not found")
	}

	if user.Role != "delivery_partner" {
		return fmt.Errorf("user is not a delivery partner")
	}

	if !user.IsActive {
		return fmt.Errorf("delivery partner account is inactive")
	}

	otp, err := generateOTP()

	if err != nil {
		return err
	}

	expiresAt := time.Now().Add(5 * time.Minute)

	s.mu.Lock()

	s.otpStore[phone] = OTPData{
		OTP:       otp,
		ExpiresAt: expiresAt,
	}

	s.mu.Unlock()

	// Development only.
	// Replace with SMS provider later.
	fmt.Printf(
		"\nLOGIN OTP for %s = %s\n\n",
		phone,
		otp,
	)

	return nil
}

func (s *AuthService) VerifyLoginOTP(
	ctx context.Context,
	phone string,
	otp string,
) (string, string, error) {

	user, err := s.userRepository.FindByPhone(
		ctx,
		phone,
	)

	if err != nil {
		return "", "", fmt.Errorf("user not found")
	}

	if user.Role != "delivery_partner" {
		return "", "", fmt.Errorf("not a delivery partner")
	}

	if !user.IsActive {
		return "", "", fmt.Errorf("account is inactive")
	}

	s.mu.Lock()

	data, exists := s.otpStore[phone]

	if exists {
		delete(s.otpStore, phone)
	}

	s.mu.Unlock()

	if !exists {
		return "", "", fmt.Errorf("OTP not found")
	}

	if time.Now().After(data.ExpiresAt) {
		return "", "", fmt.Errorf("OTP expired")
	}

	if data.OTP != otp {
		return "", "", fmt.Errorf("invalid OTP")
	}

	accessToken, err := s.generateToken(
		user.ID,
		user.Role,
		15*time.Minute,
	)

	if err != nil {
		return "", "", err
	}

	refreshToken, err := s.generateToken(
		user.ID,
		user.Role,
		30*24*time.Hour,
	)

	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (s *AuthService) generateToken(
	userID bson.ObjectID,
	role string,
	duration time.Duration,
) (string, error) {

	claims := jwt.MapClaims{
		"userId": userID.Hex(),
		"role":   role,
		"exp":    time.Now().Add(duration).Unix(),
		"iat":    time.Now().Unix(),
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString(
		[]byte(s.jwtSecret),
	)
}
