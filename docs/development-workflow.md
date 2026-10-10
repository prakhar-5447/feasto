# Development Workflow and Conventions

## Before changing code

1. Run `git status` and preserve unrelated local changes.
2. Confirm the repository root and actual directory names.
3. Search for the relevant symbol, API, route, status, model, or generated file.
4. Read neighboring code to follow established patterns.
5. For cross-app work, inspect both producer and consumer.
6. Identify whether the change requires proto regeneration, config updates, data migration, or localization updates.

## Protobuf workflow

The source `.proto` files are the API contract. Typical Go generation in the backend root (verify paths against current layout):

```powershell
protoc `
  --proto_path=proto `
  --go_out=gen `
  --go_opt=paths=source_relative `
  --go-grpc_out=gen `
  --go-grpc_opt=paths=source_relative `
  proto/auth.proto `
  proto/delivery.proto
```

Flutter generation from `delivery_partner_app` when the proto files are copied into its `proto/` folder and output is `lib/gen/`:

```powershell
New-Item -ItemType Directory -Force lib\gen

protoc `
  --proto_path=proto `
  --dart_out="grpc:lib/gen" `
  proto/auth.proto `
  proto/delivery.proto
```

These are examples based on the described folder structure. Inspect actual `protoc` paths, plugin availability, generated package imports, and `go_package` before running. `protoc` does not create the output directory.

## Environment files

- Keep actual `.env` files untracked.
- Commit `.env.example` with placeholders when useful.
- A `.gitignore` can exist at the repository root and/or app subdirectories.
- Verify an ignore rule with:

```powershell
git check-ignore -v --no-index delivery_partner_backend/.env
```

- Never use `git add -f` for secrets.
- Before committing, inspect `git status` and staged diff.

## Flutter

- Use GetX patterns already adopted in the app.
- Keep network calls in services, feature orchestration in controllers, and rendering in widgets/pages.
- Regenerate Dart protobuf code after proto changes; do not hand-edit generated files.
- For physical-device testing, use a reachable LAN address and check firewall/listener reachability.

## Go

- Keep handler/service/repository responsibilities separate.
- Keep database operations behind repository methods.
- Preserve atomic conditional updates for order assignment and state transitions.
- Run `gofmt` on changed Go files.
- Run relevant `go test ./...` and build commands where feasible; report if not run.

## Angular and Next.js

- Follow each app's existing folder structure and lint/format conventions.
- Preserve SSR safety in Angular.
- Keep secrets and database-only code server-side in Next.js.
- Do not assume API routes or authentication are production-ready without inspecting implementation.

## Commit hygiene

- Write a commit message describing the change actually made.
- Never include `.env` files, credentials, tokens, or production data.
- Avoid committing generated artifacts unless the repository already tracks them or the project explicitly requires it.
