# Implementation Status and Open Questions

This document intentionally separates observed behavior from unverified integration details.

## Observed in code shared so far

- [x] Go gRPC server registration for AuthService and DeliveryService.
- [x] MongoDB connection and repositories for users/orders.
- [x] Phone OTP send/verify path for delivery partner login.
- [x] JWT auth interceptor for protected RPCs.
- [x] Available-order query.
- [x] Atomic order acceptance.
- [x] Reject request (currently does not persist reason or alter order).
- [x] Pickup transition.
- [x] Delivery OTP request and verification.
- [x] Current active-order query.
- [x] Delivered-order history with pagination.
- [x] Protobuf source contracts for auth and delivery were shared.

## Product target

- [ ] Prove customer order creation → restaurant handling → rider assignment → pickup → delivery end-to-end.
- [ ] Verify online payment and COD behavior across customer, restaurant, and backend.
- [ ] Verify Flutter login, token storage/restoration, protected gRPC metadata, and logout.
- [ ] Verify Flutter screens are connected to real APIs rather than mock data.
- [ ] Implement or confirm rider availability/online status.
- [ ] Implement or confirm earnings APIs and settlement/payment history.
- [ ] Implement or confirm profile APIs for rider details.
- [ ] Confirm notification/polling approach for incoming delivery offers.
- [ ] Confirm restaurant coordinates are available to Flutter map/navigation.
- [ ] Confirm production SMS/OTP delivery.

## Questions to resolve from repository source

1. What exact directory name is current: `delivery-backend` or `delivery_partner_backend`?
2. Do customer and restaurant apps share the same MongoDB database and `orders` schema?
3. Which app/service creates the `ready` status consumed by the delivery backend?
4. Are online payments captured before order acceptance, and how is COD represented?
5. Does the Flutter app store tokens securely and attach access tokens to all protected gRPC calls?
6. Is a refresh-token RPC planned or intentionally omitted?
7. What is the intended behavior for rider rejection and rejection reasons?
8. Is a rider allowed more than one active order at a time? The current `GetCurrentOrder` query returns one matching order, but no global invariant has been shown.
9. What should happen if delivery OTP is expired, repeatedly entered incorrectly, or requested more than once?
10. Are MongoDB indexes and integration tests present?
11. Are gRPC calls protected with TLS outside local development?
12. Which APIs currently power restaurant order acceptance and customer order tracking?

Update this file as questions are resolved. Do not treat unchecked items as implemented.
