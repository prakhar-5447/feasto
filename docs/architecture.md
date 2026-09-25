# Feasto Architecture

## 1. Overview

Feasto is a multi-platform food delivery ecosystem consisting of:

- Customer Web Application
- Restaurant Partner Web Application
- Delivery Partner Mobile Application
- Backend APIs
- PostgreSQL
- MongoDB

The current priority is a reliable end-to-end ordering system before introducing Redis, WebSockets, message brokers, event-driven architecture, Elasticsearch, ELK, Prometheus, Grafana, or distributed tracing.

## 2. High-Level Architecture

```text
                         FEASTO
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
   Customer Web     Restaurant Web    Delivery Flutter
     Angular           Next.js             Flutter
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                    Backend APIs
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
         PostgreSQL                  MongoDB
      Users / Orders /          Restaurants / Menu /
      Payments / Delivery       Food Catalog
```

## 3. Applications

### Customer Web
Responsibilities:
- Authentication
- Location selection
- Restaurant discovery
- Restaurant details
- Menu browsing
- Cart
- Checkout
- Payment selection
- Order placement
- Order history
- Order tracking
- Profile management
- Reviews and ratings

### Restaurant Partner Web
Responsibilities:
- Restaurant authentication
- Restaurant profile
- Menu management
- Food item management
- Incoming orders
- Accepting/rejecting orders
- Preparing/ready states
- Order history

### Delivery Partner Mobile
Responsibilities:
- OTP authentication
- Delivery partner profile
- Available orders
- Accepting assignments
- Pickup
- Delivery
- Earnings
- Order history

## 4. Backend

Initial backend modules:

```text
Authentication
Users
Restaurants
Menu
Cart
Orders
Payments
Delivery
Reviews
Admin / Development Operations
```

The backend owns business rules, state transitions, authorization, payment state, delivery assignment, database consistency, and error handling.

## 5. Database

PostgreSQL is the source of truth for transactional data:

```text
users
addresses
restaurant_users
delivery_partners
orders
order_items
payments
order_status_history
coupons
reviews
```

MongoDB is primarily for restaurant/catalog information:

```text
restaurants
menus
categories
food_items
addons
collections
```

## 6. Initial Communication Model

REST APIs are used initially.

```text
Customer   ──HTTP──> Backend ──> Database
Restaurant ──HTTP──> Backend ──> Database
Delivery   ──HTTP──> Backend ──> Database
```

No message broker is required initially.

## 7. Real-Time Updates

WebSockets are intentionally deferred. Clients can initially refresh resources using REST APIs such as:

```text
GET /orders/:id
GET /restaurant/orders
GET /delivery/orders/available
```

## 8. Redis

Redis is intentionally deferred. Later it may support:
- OTP rate limiting
- Sessions
- Availability
- Caching
- Temporary state
- Distributed coordination

## 9. Event-Driven Architecture

Initially use synchronous operations. Later, events such as:

```text
OrderCreated
OrderAccepted
OrderReady
DeliveryAssigned
OrderPickedUp
OrderDelivered
PaymentCompleted
PaymentFailed
OrderCancelled
```

can be introduced when asynchronous processing or service decoupling becomes necessary.

## 10. Authentication and Authorization

Roles:

```text
CUSTOMER
RESTAURANT
DELIVERY_PARTNER
ADMIN
```

Every protected endpoint validates:
1. Authentication
2. Identity
3. Role
4. Resource ownership
5. Allowed operation

## 11. Core Principle

The frontend displays state. The backend owns state.

A frontend request must never be allowed to arbitrarily set an order status.

## 12. Development Priority

```text
1. Core REST APIs
2. Database models
3. Authentication
4. Authorization
5. Cart
6. Checkout
7. Orders
8. Restaurant workflow
9. Delivery workflow
10. COD
11. Online payment
12. Cancellation
13. Refunds
14. End-to-end testing
15. WebSockets
16. Redis
17. Event-driven architecture
18. Observability
19. Scaling
```
