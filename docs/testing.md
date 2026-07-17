# Nomoss Testing

## Scope

This document defines deterministic, composable testing for Nomoss. [linting.md](linting.md) covers the lint workflow. Effect Vitest APIs are documented by the installed `@effect/vitest` package.

## Test File Names

Keep tests for a service in a file named after that service:

```text
awsStackLifecycle.test.ts
```

Do not encode a scenario, implementation detail, or timing mechanism in the file name. Those belong in the test label.

## Test Labels

Test labels describe the observable outcome, not the implementation. A reader should know what contract the test proves without reading the body.

Use one of these shapes:

```text
It {capability or state} {observable outcome}
It {capability or state} {observable outcome} when|if|after|for {condition}
```

Examples:

- `It creates a bucket when the desired graph contains a missing bucket`
- `It saves the applied resource state after all provider operations succeed`
- `It reports no changes when the live stack matches the desired graph`

Weak labels describe internal work rather than the result:

- `It calls refresh before apply`
- `It uses the queue fixture`
- `It renders no changes`

Name the capability family in `describe`. Use a mechanical group name only when it represents a real technical contract.

## Testing Principles

Tests call real code paths and assert observable outcomes. Fixtures and test layers supply standard data through standard services; tests should not rebuild provider or model wiring locally.

Reusable fixture states belong beside the relevant adapter or service. Extend a shared fixture when a scenario is useful across contracts. Keep a genuinely one-off input local to one test.

Test code stays thin. It invokes the production operation, provides its assigned graph once at the test edge, and asserts the resulting state, output, or tagged error.

## Service Test Layers

Provider and service modules expose reusable test layers beside their live layers using a `TestLayer` suffix. Each test group composes one service graph and provides it once.

Use `Layer.provide` when dependencies are internal to the service under test. Use `Layer.provideMerge` only when the provided service is intentionally part of the test boundary. Do not build the same stateful dependency in parallel layer graphs.

## Behavior Coverage

Behavior tests begin at the production entry point responsible for a contract and end where that contract becomes observable. Assert persisted state, provider commands, rendered output, or tagged errors—not helper calls or incidental sequencing.

Helper tests are separate. They name the helper contract and assert the helper result; they do not stand in for a behavior test that should exercise the owning command path.

The label and assertion must state the same contract. A persistence label requires a persisted read. An output label requires the rendered output. An ordering label requires an observing boundary that records the claimed order.

Tests should survive refactors that change private helpers, local preparation, or internal sequencing without changing the observable contract.

## Effect Tests

Effect Vitest tests put assertions in the main `Effect` returned from `it.effect(...)`, using a flat `Effect.gen(...)` or `Effect.sync(...)` flow.

For expected failures, flip the program and match the tagged error directly. Asynchronous tests use deterministic Effect signals and runtime-controlled clocks, not sleeps, raw timers, or ambient wall-clock time.

Use one terminating Effect chain for a test. Manual fiber control is reserved for tests whose contract is interruption or shared-fiber responsibility.

## Validation

Documentation-only edits do not need Biome, TypeScript, or Vitest validation.

For code changes, run file-level linting, the project compiler, and the smallest affected test:

```sh
yarn exec biome lint tests/awsStackWorkflowRenderer.test.ts
yarn typecheck:tsgo
yarn vitest run --pool forks tests/awsStackWorkflowRenderer.test.ts
```

For a behavior regression, first run the test against a realistic break in the production path and confirm that it fails. Restore the implementation and confirm the same test passes.
