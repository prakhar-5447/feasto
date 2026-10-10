# Feasto Agent Knowledge Base

This folder is the curated Markdown knowledge base for AI coding agents working in the Feasto repository. It is designed for retrieval-augmented generation (RAG), repository onboarding, code changes, debugging, and architecture-aware assistance.

## What this knowledge base covers

- Product overview and end-to-end order flow
- Repository architecture and app boundaries
- Angular customer web app
- Next.js restaurant partner app
- Flutter delivery partner app
- Go/gRPC delivery backend
- Protobuf API contract
- MongoDB data models and current order lifecycle
- Authentication and security notes
- Agent operating rules and RAG ingestion guidance

## Source-of-truth order

When sources conflict, prefer them in this order:

1. Current source code and tests in the checked-out repository
2. Current `.proto` definitions and generated-code configuration
3. Current environment/configuration templates and build scripts
4. These Markdown documents
5. Conversation notes or assumptions

These files summarize the project as previously described. They are not a substitute for inspecting the current repository. Update them whenever the implementation changes.

## Status labels

- **Confirmed**: explicitly shown in project code or supplied project details.
- **Current implementation**: behavior visible in code shared so far; still verify against the latest checkout.
- **Planned / target**: desired behavior that may not yet exist.
- **Needs verification**: not enough source code has been reviewed to state this as fact.

## Suggested RAG chunk metadata

For each chunk, preserve:
- `project: feasto`
- `document`: relative Markdown path
- `section`: nearest heading
- `stack`: `angular`, `nextjs`, `flutter`, `go`, `grpc`, `mongodb`, or `cross-platform`
- `status`: `confirmed`, `current`, `planned`, or `needs-verification`
- `source_kind`: `project-doc`

Avoid indexing secrets, `.env` files, tokens, credentials, customer data, or production records.

## Recommended workflow for agents

1. Read `AGENTS.md`.
2. Read `project-overview.md` and `architecture.md`.
3. Read the relevant app-specific document.
4. Read `api-contract.md` and `order-lifecycle.md` for cross-app changes.
5. Inspect source code before making assumptions.
6. Make the smallest change that fits the existing architecture.
7. Run relevant formatters, analyzers, tests, and build checks.
8. Update documentation if behavior, contracts, setup, or architecture changed.
