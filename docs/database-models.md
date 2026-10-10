# Database Models — Current Go/MongoDB Context

## Collections

The shown repositories use:
- `users`
- `orders`

Confirm whether customer and restaurant apps share the same database/collections and whether their model field names match these Go structs.

## User model

Fields shown:

| Go field | BSON field | Meaning |
|---|---|---|
| `ID` | `_id` | MongoDB ObjectID |
| `Name` | `name` | User name |
| `Role` | `role` | Role string |
| `Phone` | `phone` | Phone number |
| `Email` | `email` | Optional email |
| `Avatar` | `avatar` | Optional pointer to avatar |
| `IsActive` | `isActive` | Account active flag |
| `LastLogin` | `lastLogin` | Optional last login |
| `CreatedAt` | `createdAt` | Creation time |
| `UpdatedAt` | `updatedAt` | Update time |

Delivery auth expects:
- `role == "delivery_partner"`
- `isActive == true`

`IsActive` represents account state in the shown code, not online/offline rider availability.

## Order model

Fields shown:

| Field | BSON field | Notes |
|---|---|---|
| `ID` | `_id` | MongoDB ObjectID |
| `OrderID` | `orderId` | Business-facing order ID |
| `Customer` | `customer` | Customer ObjectID |
| `Restaurant` | `restaurant` | Restaurant ObjectID |
| `RestaurantSnapshot` | `restaurantSnapshot` | Snapshot of restaurant name/address |
| `Billing` | `billing` | Item total, discount, delivery fee, platform fee, GST, grand total |
| `DeliveryAddress` | `deliveryAddress` | Full address, latitude, longitude |
| `OrderStatus` | `orderStatus` | String status |
| `PaymentStatus` | `paymentStatus` | String payment status |
| `Driver` | `driver` | Optional rider ObjectID |
| `DriverSnapshot` | `driverSnapshot` | Optional rider name/phone snapshot |
| `PickedUpAt` | `pickedUpAt` | Optional pickup timestamp |
| `DeliveredAt` | `deliveredAt` | Optional delivery timestamp |
| `DeliveryOTPHash` | `deliveryOtpHash` | OTP hash |
| `DeliveryOTPExpiresAt` | `deliveryOtpExpiresAt` | OTP expiry |
| `DeliveryOTPVerifiedAt` | `deliveryOtpVerifiedAt` | OTP verification timestamp |
| `CreatedAt` | `createdAt` | Creation time |
| `UpdatedAt` | `updatedAt` | Update time |

Nested types:
- `RestaurantSnapshot`: `name`, `address`
- `DeliveryAddress`: `fullAddress`, `lat`, `lng`
- `Billing`: `itemTotal`, `discount`, `deliveryFee`, `platformFee`, `gst`, `grandTotal`
- `DriverSnapshot`: `name`, `phone`

## Known cross-app compatibility questions

Before modifying the order schema, verify:
- Are the `customer` and `restaurant` fields ObjectIDs or strings in the apps that create orders?
- Do all apps use `orderStatus` and `paymentStatus` with the same spelling/casing?
- Does restaurant data include coordinates elsewhere?
- Are all monetary values stored as floats? If so, consider precision implications before changing financial logic.
- Is a unique index defined for `phone` and/or `orderId`?
- Are database indexes defined for available orders and rider history?
- Is `driver: nil` equivalent to the persisted field being absent/null in all documents currently in the database?

Do not run migrations or rewrite existing production data without explicit approval.
