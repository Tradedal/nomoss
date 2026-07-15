# Nomoss Testing

## Scope

This document defines Nomoss testing practice. Repository-wide implementation guardrails remain in `AGENTS.md`; Effect testing APIs are documented in `refs/effect/packages/vitest/README.md`.

## Test Shape

Tests describe behavior from the consumer's perspective. Labels start with `it` and name the outcome plus the condition that causes it, for example `it creates a queue when the desired graph contains a missing queue`.

Tests call real code paths and assert observable outcomes. Fixture layers supply standard data through standard service methods. Adapter test hooks supply typed external responses and typed errors.

## Service Graphs

Each test group builds one service graph and provides it once at the test edge. Local stateful services, provider adapters, config, tracing, and file-system test layers compose into that graph.

When a service has a reusable test layer, the layer lives beside the live service with a `TestLayer` suffix. Fixture-backed domains expose composed fixture layers so tests can consume a stable graph without recreating model or provider wiring.

## Adapter And Fixture Control

Provider adapter tests control external AWS or Distilled responses through the adapter API. Resource policy, reconciliation, apply, and workflow tests use those adapter test hooks while running the internal service code normally.

Fixtures model reusable domain states. Tests extend fixture APIs when the same state is useful across contracts. One-off behavior stays local only when it is truly local to one test and does not duplicate production graph assembly.

## Assertions

Assertions target public behavior, tagged errors, persisted state, canonical snapshots, rendered output, or provider command results. Implementation details such as call order, local helper structure, and framework plumbing are avoided unless the contract is explicitly about sequencing.

Asynchronous tests use deterministic Effect signals and runtime-controlled clocks. Terminating Effect programs carry the assertions. Expected failures are asserted by flipping the program and matching the tagged error.

Effect Vitest tests place assertions directly in the main `Effect` returned from `it.effect(...)`, using `Effect.gen(...)` or `Effect.sync(...)`.

## Resource Graph Coverage

Graph tests cover graph construction, dependency ordering, schema-bound node payloads, refs, and persisted state hydration.

Lifecycle tests cover missing remote resources, matched desired and observed state, modeled drift, recreate after missing remote state, resource removal from the desired graph, successful state persistence, and dependency failure stopping downstream execution.

Workflow tests prove the composed path: desired graph creation, state hydration, provider refresh, reconciliation, execution, and persisted cleanup.

## Validation

Documentation-only edits do not require Biome, TypeScript, or Vitest validation.

Code changes use the narrowest command that covers the touched package. For Nomoss Effect-heavy changes, run `yarn --cwd nomoss typecheck:tsgo`, `yarn --cwd nomoss lint`, and the targeted Vitest file.
