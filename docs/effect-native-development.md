# Effect-Native Development

Nomoss uses idiomatic Effect composition for infrastructure programs, provider services, lifecycle operations, and tests.

## Package Surface

`src/index.ts` is the public package API. Stable functions, data contracts, and typed errors are exported there. Examples, research notes, and migration adapters remain outside the package API until deliberately promoted.

Root package code depends on Nomoss source, Effect libraries, and the provider libraries required by exported modules. Design notes stay outside the public package API until the implementation establishes their contracts.

AWS is the first provider target. Additional provider abstractions come after AWS resource composition, state, testing, and provider service contracts are stable.

## Effect Model

Infrastructure behavior is modeled as explicit `Effect` values. Requirements flow through the Effect environment type and are supplied by `Layer` composition.

The public API follows the installed Effect version and repository tests. A higher-level resource orchestration API requires a written design contract and a production implementation before it becomes a package export.

## Services And Layers

Provider integrations are services. A provider service handles the external SDK client, request decoding, provider error capture, and typed error translation.

AWS modules depend on provider services through `Context.Service` requirements. Live service layers are the place for provider clients, process configuration, credentials, and external state.

Applications and examples assemble dependencies once at the edge. Inner resource functions expose requirements through Effect instead of accepting broad option bags that recreate an implicit environment.

## Application Composition

Nomoss core defines the stack catalog contract, and provider packages expose
resource declaration services. A consuming application composes those resource
services into named stack declarations and supplies its catalog as a Layer.

Application stack names, deployment regions, and resource programs remain in
the consuming project or example. Core lifecycle services read the catalog, and
provider packages do not import an application stack. The bundled
`upload-events` example demonstrates this separation under `examples/`.

## Error Model

Recoverable failures use tagged errors from `Data.TaggedError`. Provider failures include the resource id, lifecycle action, reason, and original cause when available.

Unknown provider failures are translated in the adapter. Public error contracts use tagged data rather than raw thrown errors, string sentinels, or unknown object shapes.

## Control Flow

Sequenced resource behavior uses one explicit `Effect.gen` flow. The generator stays flat enough to show data flow, validation, provider calls, and result construction in one place. Nested `Effect.gen` is prohibited; flatten it into the enclosing generator or one direct Effect pipeline.

Expression-level branching uses `Match.value`, `Option.match`, or `Either.match`. `Effect.when` is only for conditions that are themselves effectful. Independent value aggregation uses `Effect.all`. Sequential work stays in the generator flow instead of being encoded as `Effect.all(..., { concurrency: 1 })`.

`Effect.tap` is observational only. Required business steps use explicit sequencing with `Effect.andThen` or the enclosing generator.

## Side Effects

Time, randomness, logging, file access, and provider calls run through Effect services. Process-level side effects stay at executable edges.

Effect programs log through `Effect.log*`. CLI rendering uses explicit renderer services or `Console` effects where the workflow contract requires terminal output.

## Testing

Tests use Vitest with `@effect/vitest`. Assertions live inside the main Effect returned from `it.effect(...)`.

Public behavior is tested through real functions and reusable layers. Provider adapters supply reusable test layers beside the adapter. Async behavior uses Effect test services and deterministic signals rather than sleeps or wall-clock checks.

## Tooling

After a clean dependency install, run `yarn tsgo:patch` once. It patches the installed TypeScript 7 compiler with Effect diagnostics. Run `yarn typecheck:tsgo`, `yarn lint`, and the targeted Vitest file for Nomoss code changes. Do not run the patch command before every typecheck; it creates another compiler backup each time.
