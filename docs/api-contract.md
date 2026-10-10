# API Contract — gRPC/Protobuf

## Source files

The source contracts described by the user are:
- `proto/auth.proto`
- `proto/delivery.proto`

Generated Go code lives under `gen/`. Dart generated code is produced in the Flutter app from copies of the `.proto` files. Confirm exact paths in the current checkout.

Change `.proto` first, regenerate both Go and Dart code, then update handlers/services/clients/tests as required. Never hand-edit generated `.pb.go`, `_grpc.pb.go`, `.pb.dart`, or `.pbgrpc.dart` files.

## AuthService

Package: `auth`

Go package option shown:
`option go_package = "delivery_partner_backend/gen";`

RPCs:

| RPC | Request | Response | Auth |
|---|---|---|---|
| `SendLoginOTP` | `phone` | `success`, `message` | Public |
| `VerifyLoginOTP` | `phone`, `otp` | `success`, `message`, `access_token`, `refresh_token` | Public |

Proto message shapes:

```proto
message SendLoginOTPRequest {
  string phone = 1;
}

message SendLoginOTPResponse {
  bool success = 1;
  string message = 2;
}

message VerifyLoginOTPRequest {
  string phone = 1;
  string otp = 2;
}

message VerifyLoginOTPResponse {
  bool success = 1;
  string message = 2;
  string access_token = 3;
  string refresh_token = 4;
}
```

## DeliveryService

Package: `delivery`

| RPC | Request fields | Response fields |
|---|---|---|
| `GetAvailableOrders` | none | `success`, `message`, repeated `orders` |
| `AcceptOrder` | `order_id` | `success`, `message`, `order` |
| `RejectOrder` | `order_id`, `reason` | `success`, `message` |
| `PickupOrder` | `order_id` | `success`, `message`, `order` |
| `RequestDeliveryOTP` | `order_id` | `success`, `message` |
| `VerifyDeliveryOTP` | `order_id`, `otp` | `success`, `message` |
| `GetCurrentOrder` | none | `success`, `message`, `order` |
| `GetDeliveryHistory` | `page`, `limit` | `success`, `message`, repeated `orders` |

`DeliveryOrder` fields:
- `id`
- `order_id`
- `restaurant` (`name`, `address`)
- `customer` (`name`, `phone`)
- `delivery_address` (`full_address`, `lat`, `lng`)
- `grand_total`
- `order_status`
- `created_at`

## Authentication contract

The Flutter client should send gRPC metadata:

```text
authorization: Bearer <access_token>
```

for protected RPCs. Login OTP RPCs are exempted by the shown Go interceptor. The backend gets the rider identity from the verified JWT context; requests do not need a client-supplied rider ID.

## Error contract as currently implemented

The handlers often represent business errors as:
- `success = false`
- `message = "<reason>"`
- gRPC error = nil

Invalid request IDs are also commonly returned this way. Authentication middleware failures are instead returned as gRPC status errors such as `Unauthenticated` or `PermissionDenied`.

Clients should currently check both the gRPC call error and the response's `success` field.

## Contract gaps / verification

- There is no refresh-token RPC in the shown AuthService.
- The proto does not expose rider availability status.
- The proto does not expose earnings or profile RPCs.
- Restaurant has no latitude/longitude fields in the shown contract.
- The proto does not expose explicit "arrived at restaurant" or "arrived at customer" RPCs.
- No online-payment/COD settlement RPC is shown here.
- Verify whether fields should be added before implementing dependent Flutter screens.
