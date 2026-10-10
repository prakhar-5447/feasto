# Restaurant Partner Portal — Next.js

## Confirmed project context

- Framework: Next.js with TypeScript.
- App folder has been described as `restaurant-web/src`.
- TypeScript and ESLint are enabled.
- Import alias: `@/*`.
- Sass/design tokens are shared/forwarded within the app.
- Poppins font files are under `src/assets/fonts/poppins/*`.
- The restaurant portal uses a monolithic approach with server/API logic inside the Next.js application.

## Known auth implementation context

A login API route at `/api/auth/login` was described as returning a dummy uppercase backend response during development. Treat this as a development/mock behavior, not production authentication.

Previously described login state included:
- `partnerId`
- `password`
- `showPassword`
- `error`
- `loading`

Verify the current implementation before reusing these names or assuming auth is still mocked.

## Architecture guidance

- Keep UI, server/API route, business logic, and persistence responsibilities clear within the existing Next.js structure.
- Do not introduce a separate service or microservice without a requirement.
- Reuse the existing design tokens and typography.
- Follow the established `@/*` alias and TypeScript conventions.
- Validate server-only secrets and database access on the server; do not expose them through client bundles.

## Order integration

The restaurant partner portal is part of the end-to-end flow, but the exact current order RPC/REST endpoints, order acceptance statuses, and database write path have not all been reviewed in this knowledge base.

Before changing restaurant order handling:
1. Inspect the order list/detail components.
2. Inspect the API route/server service used for accepting or preparing orders.
3. Inspect the persisted order status strings.
4. Confirm how the customer app sees the updated state.
5. Confirm which fields the delivery backend expects before making an order available to riders.

Do not assume the restaurant portal calls the delivery gRPC service directly.
