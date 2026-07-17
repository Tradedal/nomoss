# Linting Nomoss

## Linting Discipline

Reason about code structure from the repository guide, existing patterns, and this guide before editing. Do not use lint as a trial-and-error loop.

Linting enforces declarative control flow and prevents imperative or wrapper-heavy Effect code. Treat each error or warning as direction to restructure for readability and explicit flow.

Do not work around a diagnostic, argue with a rule, or reshape code only to satisfy a pattern. Improve the structure instead.

Do not churn a large block because it produces repeated warnings. Split it into composable, properly named domain operations where that makes the flow clearer.

## Scope

Testing policy and validation commands are documented in [testing.md](testing.md).

## Rewrite Method

When lint points to a problem, rewrite the operation into one explicit Effect pipeline. Do not extract helpers merely to satisfy lint requirements.

Build context once, select one decision model, and keep the decision visible in the main flow. Avoid decisions hidden in callback arguments, object literals, or nested helper wrappers.

Fix one method at a time and keep adjacent behavior unchanged.

## Non-Compliant Patterns

Do not add helper wrappers whose only purpose is to return `Effect` values.

Do not hide sequencing through nested `pipe` ladders, `flatMap` towers, or nested generators.

Do not implement control flow with `switch` / `case`. Use `Match.value`, `Option.match`, or `Either.match` so the decision remains explicit in one Effect pipeline.

Do not add post-decode guards or fallback defaults.

Do not encode sequential side effects through `Effect.all(..., { concurrency: 1 })`.

Do not introduce workaround combinators that hide intent.

## Documentation-Only Edits

Documentation-only changes do not need Biome, TypeScript, or Vitest validation.

## Required Lint Workflow

Use a narrow lint loop during feature work and remediation.

For work scoped to specific files, lint the touched files first:

```sh
yarn exec biome lint src/providers/aws/awsStackLifecycle.ts
```

Use a repository summary only for repository-wide cleanup or final release validation:

```sh
yarn lint
```

During remediation, file-level lint remains the active loop. Run a summary after touched files are clean or when checking the remaining repository-wide backlog.

## Compile Checks

Run the project compiler during and after lint remediation. Compile is a completion gate for edited TypeScript files.

```sh
yarn typecheck:tsgo
```

Nomoss uses the released Go-based TypeScript compiler with the Effect language-service patch. Do not substitute a file-level `tsc` invocation; it bypasses the project configuration.

## Declaration Surface Checks

When TypeScript reports declaration diagnostics such as `TS4023` or `TS4020`, treat them as exported type-surface problems.

Do not patch these diagnostics with wrappers, fallback helpers, or broad rewrites. Keep Effect and Layer assembly local, then export stable services, layers, or facades instead of deep inferred values.

If an exported constructor is required, bind its contract at the domain shape rather than exporting a deep inferred Effect channel.

## Validation

After file-level lint cleanup, run the compiler and the smallest affected test:

```sh
yarn typecheck:tsgo
yarn vitest run --pool forks tests/awsStackWorkflowRenderer.test.ts
```

`yarn check` runs lint, type checking, and the non-integration test suite. Use it when the touched scope is already clean.
