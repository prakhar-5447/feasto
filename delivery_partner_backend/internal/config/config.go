package config

import "os"

type Config struct {
	MongoURI         string
	Database         string
	Port             string
	JWTSecret        string
	OTPExpiryMinutes int
}

func Load() Config {

	return Config{
		MongoURI:         os.Getenv("MONGO_URI"),
		Database:         os.Getenv("MONGO_DATABASE"),
		Port:             os.Getenv("PORT"),
		JWTSecret:        os.Getenv("JWT_SECRET"),
		OTPExpiryMinutes: 5,
	}
}
