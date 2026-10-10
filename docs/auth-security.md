# Authentication and Security Notes

## Delivery partner login (current shown implementation)

1. Client sends phone number to `SendLoginOTP`.
2. Backend finds a user by phone.
3. Backend requires role `delivery_partner` and `isActive == true`.
4. Backend generates a cryptographically random six-digit OTP.
5. OTP is stored in process memory with an expiry and printed to the server console for development.
6. Client submits phone + OTP to `VerifyLoginOTP`.
7. Backend deletes the stored OTP on verification attempt, validates expiry/value, and issues:
   - access JWT: 15 minutes
   - refresh JWT: 30 days
8. JWT claims shown: `userId`, `role`, `exp`, `iat`.
9. Protected gRPC calls send `authorization: Bearer <access_token>`.

## Authorization middleware

The shown interceptor:
- Bypasses auth for `SendLoginOTP` and `VerifyLoginOTP`.
- Requires an authorization metadata header for other RPCs.
- Accepts only HS256.
- Requires `role == "delivery_partner"`.
- Parses `userId` into MongoDB ObjectID and stores it in context.
- Handlers obtain the rider ID from context.

## Development-only behavior

- Console OTP logging is for local development only.
- Do not put OTP values in source control, docs, logs intended for production, or RAG corpora.
- Do not include real phone numbers or user records in examples.
- A local LAN IP is not a production backend URL.

## Security limitations to review before production

The code shared so far does not show:
- SMS provider integration.
- Rate limiting for OTP requests.
- Maximum OTP verification attempts.
- Refresh-token endpoint, rotation, revocation, or server-side session storage.
- Explicit JWT issuer/audience validation.
- A secure-storage implementation in Flutter (verify current package and behavior).
- TLS configuration for gRPC.
- Centralized audit logging.

The in-memory OTP map does not survive process restarts and does not coordinate multiple server instances.

The delivery OTP is stored as SHA-256 hash in the shown code. A six-digit OTP has a small search space; use rate limits and consider a keyed hash/HMAC approach before production.

## Agent safety rules

- Never expose `.env` values.
- Never log access or refresh tokens.
- Do not weaken authorization to make a UI call work.
- Do not accept client-supplied rider IDs when the identity is already in authenticated context.
- Preserve order ownership checks in repository filters and service validation.
- Treat all user-provided IDs and request fields as untrusted.
