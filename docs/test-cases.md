# Feasto Test Cases

## 1. Purpose

This document defines the minimum tests required before considering the Feasto ordering workflow functional.

## 2. Authentication

### AUTH-001 — Customer OTP Login
Valid mobile number and OTP should authenticate the customer.

### AUTH-002 — Invalid OTP
Invalid OTP should fail authentication.

### AUTH-003 — Restaurant Login
Valid partner credentials should authenticate the restaurant user.

### AUTH-004 — Delivery OTP
Valid delivery OTP should authenticate the delivery partner.

### AUTH-005 — Unauthorized API
Protected API without authentication should return:

```text
401 Unauthorized
```

## 3. Restaurant

### REST-001
Customer can retrieve restaurants.

### REST-002
Customer can retrieve restaurant details.

### REST-003
Customer can retrieve menu.

### REST-004
Unavailable food cannot be purchased.

## 4. Cart

### CART-001
Add food item and verify quantity and server-side price.

### CART-002
Increase quantity and verify subtotal.

### CART-003
Remove item and verify total.

### CART-004
Checkout with empty cart must fail.

### CART-005
Adding another restaurant's food must follow the chosen cart policy: replace cart or reject until cart is cleared.

## 5. Checkout

### CHECKOUT-001
Valid checkout returns correct subtotal, discount, delivery fee, tax, and total.

### CHECKOUT-002
Invalid coupon is rejected.

### CHECKOUT-003
Expired coupon is rejected.

### CHECKOUT-004
Invalid address is rejected.

## 6. COD Order

### ORDER-001
Create COD order.

Expected:

```text
orderStatus = RESTAURANT_PENDING
paymentStatus = PENDING
paymentMethod = COD
```

### ORDER-002
Restaurant accepts:

```text
RESTAURANT_PENDING → RESTAURANT_ACCEPTED
```

### ORDER-003
Restaurant starts preparing:

```text
RESTAURANT_ACCEPTED → PREPARING
```

### ORDER-004
Restaurant marks ready:

```text
PREPARING → READY_FOR_PICKUP
```

### ORDER-005
Delivery assignment:

```text
READY_FOR_PICKUP → DELIVERY_ASSIGNED
```

### ORDER-006
Delivery accepts:

```text
DELIVERY_ASSIGNED → DELIVERY_ACCEPTED
```

### ORDER-007
Pickup:

```text
DELIVERY_ACCEPTED → PICKED_UP
```

### ORDER-008
Out for delivery:

```text
PICKED_UP → OUT_FOR_DELIVERY
```

### ORDER-009
COD delivery:

```text
OUT_FOR_DELIVERY → DELIVERED
paymentStatus: PENDING → PAID
```

## 7. Online Payment

### PAYMENT-001
Payment order is created.

### PAYMENT-002
Successful payment becomes `PAID`.

### PAYMENT-003
Failed payment becomes `FAILED` and is not treated as paid.

### PAYMENT-004
Invalid payment signature is rejected.

### PAYMENT-005
Duplicate callback must not create duplicate payment or transaction records.

## 8. Restaurant Rejection

Restaurant rejects an order.

Expected:

```text
Order = REJECTED
```

If online payment was completed, refund processing is initiated.

## 9. Customer Cancellation

### CANCEL-001
Customer cancels an eligible order.

Expected:

```text
CANCELLED
```

### CANCEL-002
Customer attempts cancellation after it is no longer allowed.

Expected:

```text
409 Conflict
```

## 10. Delivery

### DELIVERY-001
Delivery partner can view eligible available deliveries.

### DELIVERY-002
Delivery partner accepts an assignment.

### DELIVERY-003
Delivery partner rejects an assignment and order remains eligible for reassignment.

### DELIVERY-004
Only assigned partner can mark pickup.

### DELIVERY-005
Only assigned partner can mark delivery.

## 11. Authorization

### AUTHZ-001
Customer attempts restaurant operation → `403 Forbidden`.

### AUTHZ-002
Restaurant A modifies Restaurant B order → `403 Forbidden`.

### AUTHZ-003
Delivery Partner A modifies Partner B delivery → `403 Forbidden`.

### AUTHZ-004
Customer accesses another customer's order → `403 Forbidden` or `404 Not Found` depending on security strategy.

## 12. Invalid State

### STATE-001
`DELIVERED → PREPARING` must fail.

### STATE-002
`REJECTED → ACCEPTED` must fail.

### STATE-003
`CANCELLED → DELIVERY_ACCEPTED` must fail.

Invalid transitions should return:

```text
409 Conflict
```

## 13. Price Integrity

### PRICE-001
Client sends an incorrect total.

Expected:
- Backend ignores client total.
- Backend calculates authoritative total.

### PRICE-002
Food price changes after cart creation.

Expected:
- Order creation uses the server-side pricing policy.
- Order item stores a price snapshot.

## 14. Availability

### INVENTORY-001
Food becomes unavailable before checkout/order creation.

Expected:
- Order creation is rejected.

## 15. Concurrent Operations

### CONCURRENT-001
Two delivery partners attempt to accept the same delivery simultaneously.

Expected:
- Only one succeeds.
- Other request receives conflict.

### CONCURRENT-002
Two restaurant users attempt to accept the same order simultaneously.

Expected:
- Only one valid transition succeeds.

Database-level consistency must protect these operations.

## 16. Order History

Every major transition should create an order history record:

```text
RESTAURANT_PENDING
→ RESTAURANT_ACCEPTED
→ PREPARING
→ READY_FOR_PICKUP
→ DELIVERY_ASSIGNED
→ DELIVERY_ACCEPTED
→ PICKED_UP
→ OUT_FOR_DELIVERY
→ DELIVERED
```

## 17. Customer UI Integration

Verify display of:

```text
Order placed
Restaurant accepted
Preparing
Ready
Delivery assigned
Picked up
Out for delivery
Delivered
```

## 18. Restaurant UI Integration

Verify:

```text
Incoming order
Accept
Reject
Preparing
Ready
Order history
```

## 19. Delivery UI Integration

Verify:

```text
Available order
Incoming order
Accept
Pickup
Navigation
Out for delivery
Delivered
Earnings
Order history
```

## 20. End-to-End COD Test

Run without manually modifying the database:

```text
Customer Login
      ↓
Select Restaurant
      ↓
Select Food
      ↓
Add to Cart
      ↓
Checkout
      ↓
Select COD
      ↓
Place Order
      ↓
Restaurant Login
      ↓
Accept
      ↓
Preparing
      ↓
Ready
      ↓
Delivery Partner Login
      ↓
Accept Delivery
      ↓
Pickup
      ↓
Out for Delivery
      ↓
Deliver
      ↓
COD Collected
      ↓
Customer sees Delivered
```

Expected:

```text
orderStatus = DELIVERED
paymentStatus = PAID
deliveryPartnerId != null
order history complete
```

## 21. End-to-End Online Payment

```text
Customer
   ↓
Checkout
   ↓
Online Payment
   ↓
Payment Success
   ↓
Restaurant Accept
   ↓
Preparing
   ↓
Ready
   ↓
Delivery
   ↓
Pickup
   ↓
Out for Delivery
   ↓
Delivered
```

Expected:

```text
orderStatus = DELIVERED
paymentStatus = PAID
```

## 22. End-to-End Restaurant Rejection

```text
Customer
   ↓
Order
   ↓
Restaurant Rejects
   ↓
Order REJECTED
   ↓
Refund if applicable
```

Expected:
- No delivery assignment
- Correct payment state
- Correct order history
- Customer sees rejection

## 23. End-to-End Payment Failure

```text
Customer
   ↓
Checkout
   ↓
Payment
   ↓
FAILED
```

Expected:
- No falsely paid order
- No restaurant processing
- Customer can retry if supported

## 24. End-to-End Delivery Reassignment

```text
Restaurant
   ↓
READY_FOR_PICKUP
   ↓
Delivery Partner A
   ↓
Reject
   ↓
Delivery Partner B
   ↓
Accept
   ↓
Pickup
   ↓
Delivery
```

Expected:
- Partner A is not assigned
- Partner B becomes assigned
- Only Partner B can perform pickup/delivery

## 25. Final Acceptance Criteria

```text
✓ Customer authentication works
✓ Restaurant authentication works
✓ Delivery authentication works

✓ Restaurant discovery works
✓ Menu works
✓ Cart works
✓ Checkout works

✓ COD works
✓ Online payment works
✓ Payment failure works
✓ Payment verification works

✓ Restaurant can accept
✓ Restaurant can reject
✓ Restaurant can prepare
✓ Restaurant can mark ready

✓ Delivery assignment works
✓ Delivery partner can accept
✓ Delivery partner can reject
✓ Delivery partner can pickup
✓ Delivery partner can deliver

✓ Customer cancellation works
✓ Restaurant rejection works
✓ Delivery reassignment works
✓ Refund flow works

✓ Authorization works
✓ Invalid state transitions are rejected
✓ Prices are calculated server-side
✓ Order history is maintained
✓ Payment state is correct
✓ No manual database modification is required

✓ Complete COD E2E flow passes
✓ Complete online payment E2E flow passes
```

Only after these acceptance criteria are stable should Feasto move into advanced infrastructure.
