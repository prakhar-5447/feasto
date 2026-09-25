# Feasto Order Lifecycle

## 1. Purpose

The backend is the authoritative source for order state.

Frontend applications request transitions; they do not directly control state.

## 2. Core Order States

```text
RESTAURANT_PENDING
RESTAURANT_ACCEPTED
PREPARING
READY_FOR_PICKUP
DELIVERY_ASSIGNED
DELIVERY_ACCEPTED
PICKED_UP
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
REJECTED
```

Payment states are independent:

```text
PENDING
PROCESSING
PAID
FAILED
REFUNDED
```

## 3. Happy Path

```text
Customer
   │
   │ Place order
   ▼
RESTAURANT_PENDING
   │
   │ Restaurant accepts
   ▼
RESTAURANT_ACCEPTED
   │
   │ Start preparation
   ▼
PREPARING
   │
   │ Food ready
   ▼
READY_FOR_PICKUP
   │
   │ Delivery assigned
   ▼
DELIVERY_ASSIGNED
   │
   │ Delivery partner accepts
   ▼
DELIVERY_ACCEPTED
   │
   │ Pickup
   ▼
PICKED_UP
   │
   │ Start delivery
   ▼
OUT_FOR_DELIVERY
   │
   │ Delivered
   ▼
DELIVERED
```

## 4. COD Flow

```text
Place order
    ↓
Restaurant pending
    ↓
Restaurant accepts
    ↓
Preparing
    ↓
Ready
    ↓
Delivery
    ↓
Picked up
    ↓
Out for delivery
    ↓
Customer receives order
    ↓
COD collected
    ↓
Delivered
```

Payment starts as `PENDING` and becomes `PAID` when COD is collected and the backend confirms it.

## 5. Online Payment Flow

```text
Checkout
   ↓
Create payment
   ↓
Payment provider
   ├── Success → Verify → PAID
   └── Failure → FAILED
```

The backend must independently verify payment.

## 6. Restaurant Acceptance

```text
RESTAURANT_PENDING
        ↓
RESTAURANT_ACCEPTED
```

Only an authorized restaurant user belonging to the order's restaurant can perform this transition.

## 7. Restaurant Rejection

```text
RESTAURANT_PENDING
        ↓
REJECTED
```

A rejection should have a reason.

If an online payment was already completed, refund processing is required.

## 8. Food Preparation

```text
RESTAURANT_ACCEPTED
        ↓
PREPARING
        ↓
READY_FOR_PICKUP
```

## 9. Delivery Assignment

Initially assignment may be manual or based on simple availability.

```text
READY_FOR_PICKUP
        ↓
Delivery assignment
        ↓
DELIVERY_ASSIGNED
```

## 10. Delivery Acceptance

```text
DELIVERY_ASSIGNED
        ↓
DELIVERY_ACCEPTED
```

The backend verifies the authenticated partner is the assigned partner.

## 11. Delivery Rejection

```text
DELIVERY_ASSIGNED
        ↓
Partner rejects
        ↓
Find another partner
```

The order should remain eligible for reassignment.

## 12. Pickup

```text
DELIVERY_ACCEPTED
        ↓
PICKED_UP
```

## 13. Out for Delivery

```text
PICKED_UP
     ↓
OUT_FOR_DELIVERY
```

## 14. Completion

```text
OUT_FOR_DELIVERY
        ↓
DELIVERED
```

For COD, payment can transition:

```text
PENDING → PAID
```

## 15. Customer Cancellation

Cancellation depends on the current state.

A simple initial rule is to allow cancellation while the order is still `RESTAURANT_PENDING`.

The backend determines whether cancellation is allowed.

## 16. Payment Failure

```text
Checkout
   ↓
Payment initiated
   ↓
FAILED
```

The order must not be treated as successfully paid.

## 17. Refund

Example:

```text
Payment successful
       ↓
Restaurant rejects
       ↓
Order rejected
       ↓
Refund initiated
       ↓
Refund completed
```

## 18. State Transition Table

| Current State | Action | Next State | Actor |
|---|---|---|---|
| RESTAURANT_PENDING | Accept | RESTAURANT_ACCEPTED | Restaurant |
| RESTAURANT_PENDING | Reject | REJECTED | Restaurant |
| RESTAURANT_PENDING | Cancel | CANCELLED | Customer |
| RESTAURANT_ACCEPTED | Prepare | PREPARING | Restaurant |
| PREPARING | Ready | READY_FOR_PICKUP | Restaurant |
| READY_FOR_PICKUP | Assign | DELIVERY_ASSIGNED | System/Admin |
| DELIVERY_ASSIGNED | Accept | DELIVERY_ACCEPTED | Delivery |
| DELIVERY_ASSIGNED | Reject | Reassignment | Delivery |
| DELIVERY_ACCEPTED | Pickup | PICKED_UP | Delivery |
| PICKED_UP | Start delivery | OUT_FOR_DELIVERY | Delivery |
| OUT_FOR_DELIVERY | Deliver | DELIVERED | Delivery |

## 19. Invalid Transitions

Examples:

```text
DELIVERED → PREPARING
DELIVERED → CANCELLED
REJECTED → PREPARING
CANCELLED → DELIVERY_ACCEPTED
PICKED_UP → RESTAURANT_ACCEPTED
```

Reject invalid transitions with:

```text
409 Conflict
```

## 20. Order Timeline

Every major transition should create a history record:

```text
Order #FST123

10:00  Order placed
10:02  Restaurant accepted
10:05  Preparing
10:25  Ready for pickup
10:28  Delivery assigned
10:31  Delivery accepted
10:40  Picked up
10:41  Out for delivery
10:55  Delivered
```

This supports customer tracking, operations, debugging, support, and analytics.

## 21. Terminal States

Successful:

```text
DELIVERED
```

Unsuccessful:

```text
CANCELLED
REJECTED
```

These should not normally transition to another order state.

## 22. Future Extensions

Possible later states include:

```text
PAYMENT_PENDING
PAYMENT_FAILED
REFUND_PENDING
REFUNDED
DELIVERY_CANCELLED
DELIVERY_FAILED
CUSTOMER_UNAVAILABLE
RESTAURANT_DELAYED
```

Add them only when the corresponding business rules are implemented.
