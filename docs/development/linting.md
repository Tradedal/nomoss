# Lint and check Nomoss code

Read the affected operation and its consumers before a lint correction. Preserve the caller's required behavior and keep its validation, decisions, dependency calls, and result visible in the operation. Apply the [Effect development contract](effect-native-development.md), use the evidence required by the [testing contract](testing.md), and complete the review under the [review contract](review-remediation-spec.md).

## Fix the assigned operation

Keep validation, decisions, dependency calls, and the final result together. Extract a public service method when other operations need the same domain capability. Keep each parse operation and temporary decision where it is used.

Do not introduce a helper solely to silence a lint diagnostic. Do not collect unrelated inputs into an artificial object, nest sequential operations so deeply that their flow is obscured, or add combinators to evade the diagnostic. Run work concurrently only when those operations are independent.

Use Match for tagged decisions, Option for absence, and Result for explicit outcomes. Validate data through the schema its domain contract assigns. Add a guard or fallback default only when a supported requirement calls for it. Fix the assigned operation; nearby diagnostics do not extend its scope.

## Prepare and check the code

Before validation, run format so Biome formats source, tests, examples, tools, and Projen source, organizes their imports, and applies lint fixes. Before standalone compilation, use format:staged to prepare the configured staged files. The check command formats its configured repository code, then runs lint, project compilation, and the default behavior suite. Projen's test task must run that check during builds.

Define tooling versions and scripts in Projen and keep the generated dependency records, package manifest, and lockfile consistent with those definitions. After dependencies are installed, postinstall must run tsgo:patch so the workspace TypeScript SDK includes Effect's language service for the editor.

Compiler and editor diagnostics must use the [Effect TypeScript 7 integration](https://github.com/Effect-TS/tsgo#readme). VS Code must select node_modules/typescript/lib and prompt for the workspace TypeScript version. Configuration must use supported diagnostic names, show suggestions, and make warnings and errors fail compilation.

The project uses Effect's CLI, Graph, HTTP, and persistence APIs, which Effect classifies as unstable. The unstableApiUsage diagnostic is disabled so those required APIs do not produce diagnostics. Composition, schema, runtime, and TypeScript diagnostics remain enforced.

Effect tsgo recognizes annotated integer and finite checks, so `schemaNumber` applies to handwritten and generated schemas. Projen suppresses `preferTypedSchemaDecoder` only in generated Stripe resource bindings. Those bindings still validate declaration properties against their provider request schemas before execution. [Effect tsgo fix](https://github.com/Effect-TS/tsgo/pull/986)

## Validate the assigned change

Use yarn exec biome lint with the touched file paths during implementation. Run the project typecheck and the smallest relevant Vitest file once the affected operation is clean. Run yarn lint for a repository summary, or the full check command, only during an authorized repository review or release check.

The yarn typecheck:tsgo command runs effect-tsgo tsc --build . with the project configuration. It must check Effect service requirements and public types together with TypeScript errors. Run the project check to establish whether the application's service graph is valid; a check of one file lacks the dependencies and configuration needed to answer that question.

The integration configuration runs tests that need operating-system services. Report existing failures outside the batch and do not treat them as authorization for more implementation.

## Correct the types that public APIs expose

When TypeScript reports TS4023 or TS4020, an export exposes an unnamed implementation type. Expose a smaller, stable service or domain value with a public type that its consumer can name. Use explicit domain types for completed data values.

When Effect or Layer reports a missing dependency, supply that dependency in the graph that produces the operation. Do not hide the mismatch through manual channel aliases, casts, or wrappers.

For documentation-only changes, check the evidence for each claim and review the prose under the [specification guidance](spec-writing.md) and [prose review](unslop.md).
