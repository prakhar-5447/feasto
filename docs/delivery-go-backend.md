# Delivery Backend — Go, gRPC, MongoDB

## Current implementation context

The backend is written in Go and exposes gRPC services generated from protobuf contracts. MongoDB is used through the MongoDB Go Driver v2.

Module name previously shown:
`delivery_partner_backend`

Dependencies previously shown include:
- `github.com/golang-jwt/jwt/v5`
- `github.com/joho/godotenv`
- `go.mongodb.org/mongo-driver/v2`
- `google.golang.org/grpc`
- `google.golang.org/protobuf`

Check the current `go.mod` before changing versions or module paths.

## Structure

```text
delivery_partner_backend/
├── cmd/server/
├── gen/
├── internal/
│   ├── config/
│   ├── database/
│   ├── handler/
│   ├── middleware/
│   ├── model/
│   ├── repository/
│   └── service/
└── proto/
```

## Startup

The server startup described so far:
- Loads `.env` with `godotenv.Load()` (load errors ignored in the shown code).
- Reads config.
- Requires `MONGO_URI`, `MONGO_DATABASE`, and `JWT_SECRET`.
- Defaults `PORT` to `50051`.
- Connects to MongoDB.
- Constructs repositories, services, and handlers.
- Registers `AuthService` and `DeliveryService`.
- Starts a gRPC listener on `":" + cfg.Port`.

The `":" + port` listener binds on all interfaces. Local firewall and device-network reachability may still affect access.

## Configuration

Known config fields:
- `MongoURI`
- `Database`
- `Port`
- `JWTSecret`
- `OTPExpiryMinutes`

The shown auth and delivery services hardcode OTP expiry to five minutes despite `OTPExpiryMinutes` being present in config. Treat this as a known inconsistency to review, not as a fixed behavior guarantee.

Never put real values in documentation. `.env.example` should contain only placeholders.

## Layers

- Handler: maps gRPC request/response and extracts rider identity from context.
- Service: business rules and orchestration.
- Repository: MongoDB operations.
- Model: MongoDB documents.
- Middleware: JWT verification for gRPC requests.
- Config/database: startup configuration and connection.

## Current RPCs

### AuthService
- `SendLoginOTP`
- `VerifyLoginOTP`

### DeliveryService
- `GetAvailableOrders`
- `AcceptOrder`
- `RejectOrder`
- `PickupOrder`
- `RequestDeliveryOTP`
- `VerifyDeliveryOTP`
- `GetCurrentOrder`
- `GetDeliveryHistory`

See `api-contract.md` for message fields.

## Authentication middleware behavior

The interceptor described so far:
- Allows `SendLoginOTP` and `VerifyLoginOTP` through without a JWT.
- Requires an `authorization` metadata value beginning with `Bearer ` for other RPCs.
- Parses JWT using HS256.
- Requires role `delivery_partner`.
- Reads `userId`, parses it as a MongoDB ObjectID, and places it into context.
- Handler code obtains the rider identity from this context instead of trusting a rider ID from the client.

Review the actual interceptor before changing public method allowlisting, JWT claims, or token validation.

## AuthService behavior

The shown service:
- Looks up the user by phone.
- Requires role `delivery_partner` and active account.
- Generates a cryptographically random six-digit OTP.
- Stores OTP in an in-memory map protected by a mutex.
- Prints OTP to the console for development.
- Deletes OTP on verification attempt.
- Creates a 15-minute access token and 30-day refresh token.

Important limitations in the shown implementation:
- In-memory OTP state is lost on restart and isn't shared across multiple server instances.
- The refresh token is created, but a refresh RPC/rotation/revocation flow has not been shown.
- OTP delivery is console-only in development, not production SMS.
- OTP attempts/rate limiting are not shown.
- Verify whether invalid OTP attempts consuming the OTP is the intended policy.

## DeliveryService behavior

The shown service/repository supports:
- Listing orders where `orderStatus == "ready"` and `driver == nil`.
- Atomic order acceptance via `FindOneAndUpdate` requiring the order to remain `ready` and unassigned.
- Rejecting an order without changing the order document.
- Pickup transition from `driver_assigned` to `picked_up` for the assigned rider.
- Requesting a delivery OTP after pickup.
- Storing a SHA-256 hash and expiry for the delivery OTP.
- Verifying the OTP and marking the order delivered.
- Retrieving the current assigned/picked-up order.
- Retrieving delivered-order history with pagination.

## Known correctness/security items to review before production

These are observations from the code shared so far; confirm against the current checkout:
- `RejectOrder` receives a reason but does not persist/use it. Its service logic checks assignment and then scans available orders.
- Delivery OTP is generated with a six-digit cryptographically secure generator, but the hash is plain SHA-256. Since six-digit OTPs have a small search space, consider keyed hashing/HMAC and attempt throttling before production.
- `VerifyDeliveryOTP` reads and validates the order, then separately updates it to delivered. Consider an atomic conditional update that includes the OTP hash/expiry/status to reduce race windows.
- No delivery OTP attempt counter/rate limit was shown.
- `GetCurrentOrder` handler converts any service error into “No active delivery”; distinguish no-document from database errors.
- Several handlers return `Success: false` with nil gRPC error for business failures. This is an application-level convention; keep clients consistent or deliberately migrate to gRPC status codes.
- `orderToProto` currently maps restaurant name/address and delivery address coordinates, but the shown restaurant snapshot has no coordinates.
- Current delivery handlers call `orderToProto(order, nil)` in several paths, so customer details are not included in those responses.
- Access token expiry is 15 minutes, but the Flutter refresh-token path has not been confirmed.
- MongoDB indexes, schema validation, graceful shutdown, context deadlines, and integration tests have not yet been reviewed.

Do not attempt to fix all of these in one unrelated change. Prioritize based on the user's current task.
