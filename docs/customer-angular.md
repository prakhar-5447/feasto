# Customer Web App — Angular

## Confirmed project context

- Framework: Angular, using standalone components.
- Customer frontend is under `customer-web/` in the described repository layout.
- Angular SSR is used; project startup/server integration has been described as importing the shared Node/Express server app and database config from `src/server.ts`.
- State management uses NgRx Store and Effects.
- The project has `core`, `features`, `layout`, `shared`, and `store` areas.
- Interceptors described: `requestInterceptor`, `authInterceptor`, `errorInterceptor`.
- Router behavior includes SSR hydration event replay, scroll restoration, and anchor scrolling.

## State and feature notes

Known store setup includes:
- `auth` state via `authReducer`
- `location` state via `locationReducer`
- effects including `AuthEffects` and `LocationEffects`
- location/cart/user store areas described in the app.

Location/search behavior:
- `selectSelectedLocation` returns `SelectedLocation | null`.
- City routes use `/india/:city`.
- Restaurant routes use `/india/:city/r/:restaurant`.
- A valid-city guard calls `LocationService.search(city)` and compares the returned slug.
- The navbar search uses a 300 ms debounce.
- A previously observed issue was that the city value was empty from the store, causing navigation to only `/india`; verify whether this has been fixed before changing location navigation.

## Restaurant discovery/filtering

Known API path:
- `GET /api/v1/foods/filter`

Known dashboard components include ads carousel, categories, restaurant list, filter bar, and filter modal.

Known category slugs:
- `pizza`
- `burger`
- `biryani`
- `chinese`
- `dessert`
- `south-indian`
- `north-indian`
- `drinks`

Known filter concepts:
- food, cuisine, restaurant, collection
- veg / non-veg / vegan / halal
- rating
- price low / medium / high
- maximum delivery time and distance
- offers, open now
- sorting by relevance, rating, delivery time, distance, and price

Example previously used route:
`/india/dhanbad?cuisine=Italian&collection=Best%20of%20Dhanbad&maxDeliveryTime=20&maxDistance=2&sort=relevance`

Treat this as an example, not a hardcoded production route.

## Authentication notes

Known endpoints:
- `/api/v1/auth/phone-auth`
- `/api/v1/auth/complete-profile`

Phone validation was described as Indian `+91` plus a 10-digit number. Email validation was described as Gmail-specific. Verify the current validators before changing them.

## Styling conventions

- Sass is used.
- Reusable `app-button` variants described: `primary`, `secondary`, `outline`, `ghost`, `text`, `danger`, `icon`.
- Existing app naming should not be renamed merely because the monorepo/repository is named Feasto.

## Agent instructions

- Inspect the exact component/service/store files before changing Angular behavior.
- Follow standalone component and existing NgRx patterns.
- Keep SSR-safe code in mind; avoid unguarded browser-only APIs on the server.
- Check route guards, URL query parameters, store selectors, and interceptors when debugging navigation or API behavior.
- Do not assume the Angular app calls the Go delivery backend. Trace the actual customer order API and shared database integration first.
