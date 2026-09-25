# Feasto Database Design

## 1. Strategy

Feasto initially uses:

```text
PostgreSQL → Transactional data
MongoDB    → Restaurant/catalog data
```

## 2. PostgreSQL

### users

```text
id
name
email
phone
role
is_active
created_at
updated_at
```

Roles:

```text
CUSTOMER
RESTAURANT
DELIVERY_PARTNER
ADMIN
```

### addresses

```text
id
user_id
label
address_line
city
state
postal_code
latitude
longitude
is_default
created_at
updated_at
```

### restaurant_users

```text
id
restaurant_id
user_id
role
created_at
updated_at
```

### delivery_partners

```text
id
user_id
phone
email
vehicle_number
license_number
status
is_available
created_at
updated_at
```

Possible availability:

```text
OFFLINE
AVAILABLE
BUSY
```

### orders

```text
id
order_number
customer_id
restaurant_id
delivery_partner_id
delivery_address_id
subtotal
discount
delivery_fee
tax
total
order_status
payment_status
payment_method
coupon_code
placed_at
accepted_at
prepared_at
picked_up_at
delivered_at
cancelled_at
created_at
updated_at
```

`delivery_partner_id` is nullable until assignment.

### order_items

```text
id
order_id
food_item_id
food_name
quantity
unit_price
subtotal
created_at
```

Store the food name and price snapshot at order time so historical orders remain correct after menu changes.

### payments

```text
id
order_id
method
status
amount
currency
provider
transaction_id
provider_order_id
paid_at
failed_at
created_at
updated_at
```

Methods:

```text
COD
ONLINE
```

Statuses:

```text
PENDING
PROCESSING
PAID
FAILED
REFUNDED
PARTIALLY_REFUNDED
```

### order_status_history

```text
id
order_id
from_status
to_status
actor_id
actor_role
reason
created_at
```

### reviews

```text
id
order_id
customer_id
restaurant_id
rating
comment
created_at
updated_at
```

### coupons

```text
id
code
type
value
minimum_order_value
maximum_discount
starts_at
expires_at
usage_limit
per_user_limit
is_active
created_at
updated_at
```

Types:

```text
PERCENTAGE
FIXED
```

## 3. MongoDB

Collections:

```text
restaurants
menus
food_items
categories
addons
collections
```

Example food item:

```json
{
  "_id": "...",
  "restaurantId": "...",
  "name": "Paneer Butter Masala",
  "description": "...",
  "price": 220,
  "isVeg": true,
  "isAvailable": true,
  "categoryId": "..."
}
```

## 4. Data Ownership

PostgreSQL owns:

```text
Users
Orders
Payments
Delivery assignments
Order lifecycle
Transactions
```

MongoDB owns:

```text
Restaurant catalog
Menu
Food metadata
Flexible food configuration
```

Clients never connect directly to databases.

## 5. Transactional Requirements

Order creation should validate:

```text
Cart
Restaurant
Food availability
Prices
Discount
Taxes
Delivery fee
```

Then create:

```text
Order
Order Items
Payment
Order Status History
```

Use a PostgreSQL transaction for operations that must succeed or fail together.

## 6. Server-Side Pricing

Never trust a client-provided total.

Calculate:

```text
subtotal
- discount
+ delivery fee
+ tax
= total
```

using authoritative server-side data.

## 7. Data Consistency

Ensure:

```text
Order.total
=
OrderItems subtotal
+
delivery fee
+
tax
-
discount
```

Payment amount should match the order total unless partial payments are explicitly supported.

## 8. Historical Data

Important transactional data should not be hard-deleted casually.

Use `is_active` or `deleted_at` where appropriate.

Historical orders must remain readable even if a food item or restaurant changes.

## 9. Core Principle

The database schema should support correctness of the current business lifecycle before optimizing for large-scale distributed workloads.
