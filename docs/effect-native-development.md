# Effect-Native Development

Nomoss models infrastructure as Effects. Layers connect those Effects to
provider services.

## Package Surface

`src/index.ts` defines the public package API. A module enters that API only
after its production use and tests establish the contract. Example code remains
outside the package.

Design notes do not establish a package export. The implementation must first
provide the behavior described by the export.

The AWS implementation establishes how Nomoss integrates a provider. Nomoss
generalizes only behavior already proved by that implementation and its tests.

## Effect Model

Infrastructure behavior is represented by explicit `Effect` values. The Effect
environment exposes each required service. Layers provide those services.

The public API follows the installed Effect version. Repository tests establish
how Nomoss uses that API. An API that composes resources needs an accepted
design and production use before it becomes a package export.

## Services And Layers

Each provider integration is an Effect service. Its adapter translates SDK
failures into the tagged errors returned by Nomoss.

AWS modules request provider services through `Context.Service`. A live Layer
connects each service to AWS.

Applications provide Layers when the runtime starts. Resource functions expose
their requirements through Effect instead of recreating an environment in an
options object.

## Application Composition

An application builds its infrastructure by yielding Nomoss resources in an
Effect. It runs that Effect inside a named stack. The name scopes saved state.
The stack also selects the AWS region used to inspect or change those resources.

Provider modules do not import application stacks. `src/cliRuntimeLayer.ts`
supplies the `upload-events` stack when the bundled CLI starts.

## Error Model

Recoverable failures use `Data.TaggedError`. A provider failure identifies the
resource and the operation that failed. It retains the original SDK error when
one is available.

The provider adapter translates unknown failures. Public code returns tagged
errors instead of exposing raw thrown values.

## Control Flow

Sequenced resource behavior uses one `Effect.gen`. Keep the generator flat so
the required work remains visible. Replace a nested generator with the enclosing
generator or one direct Effect pipeline.

`Match.value` selects among tagged values. `Option.match` and `Either.match`
handle their respective containers. `Effect.when` is reserved for an effectful
condition. `Effect.all` runs independent work; sequential work stays in the
generator.

`Effect.tap` is observational only. Required work stays in the generator or
uses `Effect.andThen`.

## Side Effects

Code that touches the process or an external system runs through Effect
services. Process startup remains at the executable edge.

Effect programs log through `Effect.log*`. CLI commands use their renderer when
they produce terminal output.

## Testing

Tests use `@effect/vitest`. Assertions stay inside the Effect returned from
`it.effect(...)`.

Tests exercise public functions through Layers. A provider adapter supplies its
test Layer beside the live adapter. Asynchronous tests coordinate through Effect
instead of sleeping.

## Tooling

After a clean dependency install, run `yarn tsgo:patch` once to enable Effect
diagnostics in TypeScript 7. Use the targeted Vitest file while developing. Run
`yarn check` before completing a code change. Repeating `yarn tsgo:patch`
creates another compiler backup and is not part of normal validation.
