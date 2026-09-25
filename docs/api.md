# Feasto API Specification

## 1. Conventions

Base URL:

```text
/api/v1
```

Authentication:

```http
Authorization: Bearer <token>
```

Content type:

```http
Content-Type: application/json
```

## 2. Standard Responses

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order not found"
  }
}
```

## 3. Authentication

### Customer OTP
```http
POST /auth/phone-auth
```

### Complete Profile
```http
POST /auth/complete-profile
```

### Restaurant Login
```http
POST /restaurant/auth/login
```

### Delivery OTP
```http
POST /delivery/auth/phone-auth
```

## 4. Restaurant APIs

```http
GET /restaurants
GET /restaurants/:restaurantId
GET /restaurants/:restaurantId/menu
```

Supported filters can include city, cuisine, rating, price, dietary filters, delivery time, distance, offers, open status, and sort.

## 5. Cart APIs

```http
GET /cart
POST /cart/items
PATCH /cart/items/:itemId
DELETE /cart/items/:itemId
DELETE /cart
```

Example:

```json
{
  "restaurantId": "RST001",
  "foodItemId": "FOOD001",
  "quantity": 2,
  "addons": []
}
```

## 6. Checkout

```http
POST /checkout/preview
```

Example:

```json
{
  "addressId": "ADDR001",
  "couponCode": "WELCOME50"
}
```

The preview does not create an order.

## 7. Orders

Create order:

```http
POST /orders
```

COD example:

```json
{
  "addressId": "ADDR001",
  "paymentMethod": "COD",
  "couponCode": null
}
```

Customer:

```http
GET /orders
GET /orders/:orderId
POST /orders/:orderId/cancel
GET /orders/:orderId/status
```

## 8. Payments

```http
POST /orders/:orderId/payment
POST /payments/verify
```

The backend must independently verify online payment.

## 9. Restaurant Order APIs

```http
GET /restaurant/orders?status=RESTAURANT_PENDING
POST /restaurant/orders/:orderId/accept
POST /restaurant/orders/:orderId/reject
POST /restaurant/orders/:orderId/prepare
POST /restaurant/orders/:orderId/ready
```

## 10. Delivery APIs

```http
GET /delivery/orders/available
POST /delivery/orders/:orderId/accept
POST /delivery/orders/:orderId/reject
POST /delivery/orders/:orderId/pickup
POST /delivery/orders/:orderId/out-for-delivery
POST /delivery/orders/:orderId/deliver
```

COD delivery may include:

```json
{
  "paymentCollected": true
}
```

## 11. Delivery Assignment

Initially assignment can be manual or simple:

```http
POST /admin/orders/:orderId/assign-delivery
```

Example:

```json
{
  "deliveryPartnerId": "DEL001"
}
```

## 12. Profiles

Customer:

```http
GET /users/me
PATCH /users/me
```

Delivery partner:

```http
GET /delivery/profile
PATCH /delivery/profile
```

Fields can include:

```text
name
email
phone
vehicleNumber
licenseNumber
```

## 13. HTTP Status Codes

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

## 14. Security Rules

The backend must verify:

```text
Authentication
    ↓
Authorization
    ↓
Resource ownership
    ↓
Current state
    ↓
Allowed transition
    ↓
Database operation
```

Never trust user ID, restaurant ID, delivery partner ID, order status, payment status, or prices supplied by the frontend.

Prices must be calculated server-side.
