# Feasto Project Overview

## Purpose

Feasto is a multi-platform food-delivery ecosystem. Its primary user-facing surfaces are:

1. **Customer Web App** — Angular
2. **Restaurant Partner Portal** — Next.js
3. **Delivery Partner App** — Flutter
4. **Delivery Partner Backend** — Go, gRPC, protobuf, MongoDB (current implementation described so far)

The project is developed in one repository/monorepo.

## Repository layout

The following paths have been described during project work. Verify them against the current checkout because the delivery backend folder has appeared under more than one name in earlier notes.

```text
feasto/
├── customer-web/                 # Angular customer app
├── restaurant-web/               # Next.js restaurant partner app
├── delivery_partner_app/         # Flutter delivery partner app
├── delivery_partner_backend/     # Go/gRPC delivery backend (recently used path)
├── docs/
└── .gitignore
```

An earlier path was `delivery-backend/`. Use the folder that actually exists in the current checkout; do not rename it as part of an unrelated task.

## Product roles

- **Customer**: discovers restaurants/food, manages a cart, places an order, and receives delivery.
- **Restaurant partner**: manages restaurant-side order handling and preparation.
- **Delivery partner/rider**: receives available orders, accepts one, picks it up, and completes delivery.
- **Backend**: enforces identity, order ownership, and valid state transitions.

## Main business flow (target)

```text
Customer places order
        ↓
Restaurant receives and accepts/prepares order
        ↓
Order becomes ready for delivery
        ↓
Eligible delivery partner sees available order
        ↓
Delivery partner accepts order
        ↓
Delivery partner picks up order
        ↓
Customer provides delivery OTP
        ↓
Delivery partner verifies OTP
        ↓
Order is marked delivered
```

Payment should support the payment modes required by the customer ordering system, including online payment and COD. The exact payment ownership, gateway, settlement logic, and cross-app integration need verification in the current source.

## Immediate engineering priority

Make the simplest reliable end-to-end order flow work first. Do not prematurely add Redis, ELK, WebSockets, event-driven architecture, or separate microservices. These may be considered later when actual requirements justify them.

## Current known delivery backend capabilities

From code reviewed so far:
- Phone-based login OTP send/verify
- JWT access and refresh token creation
- gRPC delivery RPCs for available orders, accepting/rejecting, pickup, requesting/verifying delivery OTP, current order, and history
- MongoDB-backed user and order repositories
- JWT gRPC interceptor protecting non-login RPCs

This list is not proof that all cross-application integrations are complete.

## Terms

- **Customer**: person placing the food order.
- **Restaurant**: food provider / restaurant partner.
- **Delivery partner / rider / driver**: person delivering the order. Existing Go code uses `driver` in MongoDB fields and `delivery_partner` as the JWT role.
- **Order ID**: human-facing/business identifier (`orderId`) in addition to MongoDB `_id`.
- **Delivery OTP**: OTP used by the rider to confirm delivery with the customer.
