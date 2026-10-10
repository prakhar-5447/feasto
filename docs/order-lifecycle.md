# Order Lifecycle

## Current delivery-backend state transitions

The code reviewed so far uses these persisted `orderStatus` strings:

```text
ready
  ↓ AcceptOrder (atomic claim)
driver_assigned
  ↓ PickupOrder (assigned rider only)
picked_up
  ↓ VerifyDeliveryOTP (correct, unexpired OTP)
delivered
```

Available-order query:
- `orderStatus` equals `ready`
- `driver` equals `nil`
- sorted by `createdAt` ascending

Accept-order operation:
- Filter matches `_id`, `orderStatus == "ready"`, and `driver == nil`.
- The same `FindOneAndUpdate` assigns the rider and changes status to `driver_assigned`.
- This atomic filter prevents two riders from both successfully claiming the same currently unassigned order.

Pickup operation:
- Requires matching order ID, matching assigned rider, and `orderStatus == "driver_assigned"`.
- Sets `orderStatus = "picked_up"` and records `pickedUpAt`.

Delivery OTP:
- Requested only for the assigned rider and a `picked_up` order.
- Six-digit OTP is generated.
- OTP hash and expiry are stored.
- Shown implementation expires it after five minutes.
- Successful verification marks the order `delivered`, sets `deliveredAt` and `deliveryOtpVerifiedAt`, and removes OTP hash/expiry.

History:
- Current query includes orders assigned to the rider with `orderStatus == "delivered"`.
- Sorted by `deliveredAt` descending.
- Pagination defaults to page 1 and limit 20; maximum limit is 50 in the service.

## Reject behavior

The shown `RejectOrder` service does not change the order status or save the reason. It checks whether the order is already assigned and whether it remains in the available-orders query. Rejection effectively means the rider does not take the offer; the order remains available to other riders.

## UI states versus persisted states

The Flutter UI may represent more detailed steps:
- going to restaurant
- arrived at restaurant
- picked up
- going to customer
- arrived at customer
- PIN/OTP verification
- delivered

The backend currently persists only the four statuses above. Do not assume each UI substep is a persisted server state. Add server-side statuses/RPCs only if product rules require those transitions to be shared and auditable.

## Wider end-to-end flow (target, not fully verified)

```text
Customer creates order
   ↓
Restaurant accepts/prepares order
   ↓
Restaurant marks order ready
   ↓
Delivery backend exposes order to riders
   ↓
Rider accepts
   ↓
Rider picks up
   ↓
Customer delivery OTP verified
   ↓
Delivered
```

The exact customer/restaurant states and payment states have not been fully reviewed here. Check those apps' source code before changing shared status names.

## Payment

The product target includes online payment and COD. The shown Go `Order` model has `PaymentStatus` and billing fields, but the reviewed delivery RPCs do not implement payment capture, refund, COD collection, or settlement logic. Do not infer payment behavior from `GrandTotal` alone.
