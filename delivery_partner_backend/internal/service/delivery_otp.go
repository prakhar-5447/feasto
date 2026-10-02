package service

import (
	"sync"
	"time"
)

type DeliveryOTP struct {
	OTP       string
	ExpiresAt time.Time
}

type DeliveryOTPStore struct {
	mu   sync.Mutex
	data map[string]DeliveryOTP
}

func NewDeliveryOTPStore() *DeliveryOTPStore {
	return &DeliveryOTPStore{
		data: make(map[string]DeliveryOTP),
	}
}

func (s *DeliveryOTPStore) Set(
	orderID string,
	otp string,
	expiresAt time.Time,
) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.data[orderID] = DeliveryOTP{
		OTP:       otp,
		ExpiresAt: expiresAt,
	}
}

func (s *DeliveryOTPStore) Get(
	orderID string,
) (DeliveryOTP, bool) {

	s.mu.Lock()
	defer s.mu.Unlock()

	value, exists := s.data[orderID]

	if !exists {
		return DeliveryOTP{}, false
	}

	return value, true
}

func (s *DeliveryOTPStore) Delete(
	orderID string,
) {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.data, orderID)
}
