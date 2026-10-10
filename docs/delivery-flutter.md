# Delivery Partner App — Flutter

## Confirmed project context

- Flutter/Dart Android application.
- Package name described as `delivery_partner_app`.
- Display title: `Feasto Delivery Partner`.
- Project folder: `delivery_partner_app/`.
- GetX is the selected app-level state management and dependency-injection approach.
- Material 3 theming, Poppins typography, and shared Feasto design tokens are used/planned.
- English and Hindi localization are configured using ARB files and Flutter localization generation.

## UI requirements

The rider app is intended to support:
- Mobile number + OTP login; no separate signup page.
- Home/dashboard with incoming order offers and today's earnings.
- Accept/decline an order.
- Navigate to the restaurant, mark pickup, navigate to customer, and confirm delivery using an OTP.
- Orders/history.
- Earnings.
- Profile fields such as name, email, phone, vehicle number, and driving licence number.
- Main navigation: Home, Orders, Earnings, Profile.
- Secondary pages such as performance, incentives, demand map, help, delivery preferences, notification settings, notifications, language, and app settings.

Some of these screens may be UI-only or mock-backed. Confirm actual API integration before describing them as operational.

## Suggested architecture already discussed

```text
lib/
├── core/
│   ├── localization/
│   ├── network/
│   │   ├── api_client.dart
│   │   └── api_endpoints.dart
│   ├── storage/
│   │   └── token_storage.dart
│   ├── utils/
│   └── theme/
├── features/
│   ├── auth/
│   ├── home/
│   ├── active_delivery/
│   ├── orders/
│   ├── earnings/
│   ├── profile/
│   └── ...
├── app/
│   ├── app.dart
│   ├── app_bindings.dart
│   ├── app_shell.dart
│   └── widgets/
└── main.dart
```

Treat this as the described/recommended layout, not a guaranteed exact current file tree.

## State management conventions

- Use GetX for shared/app-wide state and dependency injection.
- `setState` is acceptable for small local widget state.
- Controllers orchestrate feature state and call services.
- Services handle network/data access.
- Models represent data.
- Pages/widgets render UI.
- Avoid putting network requests and business rules directly into presentation widgets.

## gRPC/protobuf integration

The app generates Dart gRPC code from:
- `proto/auth.proto`
- `proto/delivery.proto`

The Flutter-side proto copies have been described under `delivery_partner_app/proto/`. The generated output directory has been discussed as `lib/gen/` or `lib/generated/`; inspect the current `protoc` command and directory before editing imports.

Dependencies:
- `grpc`
- `protobuf`
- Dart `protoc_plugin` installed globally for `protoc-gen-dart`

Example generation command when the source files are under `proto/` and output folder exists:

```powershell
protoc `
  --proto_path=proto `
  --dart_out="grpc:lib/gen" `
  proto/auth.proto `
  proto/delivery.proto
```

`protoc` does not create the output directory. Create it first, or use the project's chosen existing generated directory. Keep generated code out of manual edits.

## gRPC networking

A previously used local development configuration was:
- Host: `172.22.74.167`
- Port: `50051`

This IP is machine/network-specific and must not be treated as a stable repository default. On a physical phone, use the development computer's reachable LAN address. Do not put `http://` in the gRPC host field. Configure local/dev/prod endpoints appropriately.

## Auth flow (intended)

```text
LoginPage
  → AuthController
  → AuthService
  → gRPC client
  → Go backend
  → Auth response/token
  → secure token storage
  → authenticated app shell
```

Verify token restoration, refresh-token behavior, secure storage, and logout implementation in the current code before assuming they are complete.

## Active delivery flow

Backend states currently known:
`ready` → `driver_assigned` → `picked_up` → `delivered`

UI may have more granular presentation steps, such as going to the restaurant, arriving, going to the customer, and entering a PIN. Do not create backend status transitions for every UI screen unless the product requires the server to persist them.
