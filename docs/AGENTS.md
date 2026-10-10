# Instructions for AI Coding Agents

## Mission

Help build Feasto, a multi-platform food-delivery project with a customer web app, restaurant partner web app, delivery partner mobile app, and Go delivery backend.

## Mandatory behavior

1. **Inspect before editing.** Read the relevant files and trace existing data flow before proposing or making changes.
2. **Do not invent repository facts.** If a path, package, API, schema, dependency, test command, or behavior is unknown, inspect the repository or mark it as unverified.
3. **Respect existing architecture.** Do not introduce microservices, Redis, event streaming, WebSockets, ELK, or other infrastructure merely because it may be useful. The immediate project priority is a working end-to-end order flow with the simplest reliable design.
4. **Keep cross-app contracts aligned.** When changing order/auth fields, inspect the Go models, protobuf definitions, handlers, services, and Flutter consumers together.
5. **Treat generated files as generated.** Change the `.proto` source and regenerate code rather than hand-editing generated protobuf files.
6. **Protect secrets.** Never read out, commit, paste into docs, or index `.env` values, JWT secrets, database credentials, access tokens, or personal/customer data. Use `.env.example` with placeholders.
7. **Avoid destructive Git operations.** Do not reset, force-push, delete user changes, or overwrite files without explicit authorization.
8. **Preserve naming.** Feasto is the repository/project name. Do not rename the Angular app internally unless explicitly requested.
9. **Keep scope focused.** Make small, reviewable changes and explain any contract or migration implications.
10. **Document uncertainty.** Distinguish implemented behavior from planned behavior and inferred design.

## Architecture guardrails

- The customer app is Angular.
- The restaurant partner app is Next.js.
- The delivery partner app is Flutter/Dart.
- The delivery partner backend is Go with gRPC/protobuf and MongoDB in the current implementation described by the project notes.
- The current backend is a layered modular monolith, not a microservices deployment.
- The current priority is a functional order journey: customer order → restaurant acceptance/preparation → delivery assignment → pickup → delivery confirmation, including online payment and cash on delivery (COD) where supported by the wider system.
- Do not claim the cross-app flow is complete until it has been tested end to end.

## Change workflow

Before editing:
- Identify the actual repository root and working tree state.
- Read the relevant code, tests, generated-code instructions, and local conventions.
- Search for all usages of changed fields, statuses, routes, RPCs, and models.
- Confirm whether a requested feature already exists.

After editing:
- Run the narrowest relevant test/analyzer/build command.
- Report commands actually run and their results; never claim tests passed if not run.
- Mention any required proto regeneration, app restart, database index, environment variable, or manual setup.
- Update the relevant docs in this knowledge base when the source of truth changes.

## Security and privacy

- Do not place credentials or secret values in Markdown.
- Never use real customer names, phone numbers, addresses, OTPs, or order records in examples.
- OTPs printed to a development console are development-only and must not be described as production delivery.
- Treat authentication and order ownership checks as server-side responsibilities.
- Do not trust client-supplied rider IDs when the authenticated identity is available in JWT-derived request context.

## If information is missing

Say what is known, what is unknown, and which file would resolve the uncertainty. Do not silently fill gaps with generic best practices.
