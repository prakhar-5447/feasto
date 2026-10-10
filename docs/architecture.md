# Feasto Architecture

## System view

```text
Angular Customer Web ─────┐
                          │
Next.js Restaurant Web ───┼── shared business/data contracts (integration to verify)
                          │
Flutter Delivery App ─ gRPC ─ Go Delivery Backend ─ MongoDB
```

The customer and restaurant apps have their own app architectures. The delivery app communicates with the Go backend through gRPC in the implementation described so far. Do not assume the customer or restaurant apps call the Go backend directly; inspect their API clients and server integration.

## Delivery backend architecture

Current described layout:

```text
delivery_partner_backend/
├── cmd/
│   └── server/
├── gen/                 # generated Go protobuf/gRPC code
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

Responsibilities:

- `cmd/server`: application startup, dependency wiring, gRPC server registration/listening.
- `internal/config`: environment-based configuration.
- `internal/database`: MongoDB connection.
- `internal/handler`: gRPC request/response adaptation and validation at the transport boundary.
- `internal/middleware`: gRPC authentication interceptor.
- `internal/model`: Go domain/persistence models.
- `internal/repository`: MongoDB reads/writes.
- `internal/service`: business rules and orchestration.
- `proto`: source API contracts.
- `gen`: generated Go protobuf and gRPC code.

## Dependency direction

```text
gRPC request
   ↓
Handler
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

The handler extracts the authenticated rider identity from context where required. The service enforces business rules. The repository performs MongoDB operations.

## Architecture style

The current backend is a **layered modular monolith**: one server process with separated responsibilities. It is not currently described as a microservices system.

Do not split into domain packages or microservices as a cleanup-only task. The existing global layer folders are acceptable for the current project size. Consider domain-oriented packaging only when there is a concrete maintenance benefit.

## Cross-application integration

The apps are separate clients/surfaces. When implementing a complete order journey, inspect and align:
- order creation and restaurant acceptance in customer/restaurant code,
- order schema and status values in the shared database,
- delivery backend order queries and transitions,
- generated protobuf contracts,
- Flutter client calls and UI states.

The delivery backend currently queries MongoDB `orders` and `users` collections. Whether all three apps share the same MongoDB database and collection conventions must be verified from each app's source and configuration.

## Networking

For a physical Android device, the Flutter app must reach the development PC over the LAN. The gRPC host is a hostname/IP without `http://`; the port is configured separately. The backend listener has been shown using `net.Listen("tcp", ":"+cfg.Port)`, which binds to all interfaces.

Do not commit machine-specific LAN IP addresses into shared production configuration. Prefer environment/flavor configuration for local development and a secure production endpoint for deployment.

## Operational simplicity

Current target: get a reliable core order flow running with straightforward synchronous gRPC and MongoDB operations. Add caching, message brokers, WebSockets, observability stacks, or service extraction only when required.
