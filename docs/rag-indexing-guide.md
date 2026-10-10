# RAG Indexing Guide for Feasto

## Goal

Use this Markdown collection as an initial retrieval corpus for AI coding agents. The repository source remains authoritative; RAG results are context, not permission to skip code inspection.

## Recommended document metadata

Attach metadata to each document/chunk:

```json
{
  "project": "feasto",
  "document": "delivery-go-backend.md",
  "section": "DeliveryService behavior",
  "stack": ["go", "grpc", "mongodb"],
  "status": "current",
  "source_kind": "project-doc",
  "version": "initial"
}
```

Suggested `status` values:
- `confirmed`
- `current`
- `planned`
- `needs-verification`

## Chunking

- Split on Markdown headings first.
- Keep code blocks with the section that explains them.
- Prefer chunks of roughly 300–700 tokens, with 50–100 tokens of overlap if your indexer supports overlap.
- Avoid splitting a table row from its header.
- Keep important identifiers together: RPC name + request/response fields, status + transition guard, model field + BSON name.
- Store source path and heading with every chunk so answers can be traced back.

These are practical starting settings, not universal requirements. Tune against retrieval evaluations.

## What must never be indexed

- `.env` contents
- API keys, JWT secrets, database credentials
- access/refresh tokens
- real OTP values
- customer/rider personal data
- production order documents or database dumps
- private certificates or signing keys

Prefer an allowlist of Markdown and source files rather than recursively indexing the entire repository without filters.

## Retrieval strategy

For questions involving:
- **A single app**: retrieve `project-overview.md`, the app-specific document, and relevant repository files.
- **Cross-app order flow**: retrieve `architecture.md`, `order-lifecycle.md`, `api-contract.md`, plus actual order models/handlers/services from all involved apps.
- **Auth**: retrieve `auth-security.md`, `api-contract.md`, and current middleware/auth service/client code.
- **Protobuf changes**: retrieve `api-contract.md`, `.proto` files, generated-code commands, and all client/server call sites.
- **Debugging**: prioritize exact error messages and current source code over generalized documentation.
- **Database/schema changes**: retrieve `database-models.md`, all model definitions, repositories, indexes, and producers/consumers of the affected fields.

## Source freshness

These docs were written from project details and source snippets shared during development. Rebuild/update the index after:
- changes to `.proto`
- changes to order/user models or status transitions
- auth/token behavior changes
- moving or renaming apps/directories
- adding/removing APIs
- changes to setup/build/test commands

A retrieval system should record the document version or update timestamp. If the source checkout differs from these docs, the current checkout wins.

## Evaluation questions

Use a small test set after indexing:
1. Which RPCs are public and which require JWT?
2. What exact status filter makes an order available to riders?
3. What atomic condition prevents two riders from claiming one order?
4. What is the current delivery OTP expiry behavior?
5. Which order states are persisted versus UI-only?
6. Which app is Angular, Next.js, Flutter, and Go?
7. What information is not yet confirmed about payment settlement?
8. Which protobuf files must be regenerated after an API contract change?

Check that answers cite the correct source path/heading and distinguish current implementation from plans.
