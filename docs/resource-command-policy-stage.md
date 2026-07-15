# Resource Command Policy

## Purpose

Nomoss lifecycle planning runs through schema-backed command values. Core services traverse graph data, select ordering, and collect command results. Provider policy services interpret the resource-specific meaning of each command.

This places AWS bucket, queue, queue policy, and bucket notification behavior in AWS policy services while the core graph and reconciliation code stays generic.

## Core Contract

Graph nodes are schema-backed resource records. Each node contains the stable key, provider identity, resource kind, schema metadata, encoded props, encoded outputs, and persisted state metadata required for later decoding.

Lifecycle intent is represented by `Data.TaggedEnum` values:

```ts
type ResourceCommand =
  | { readonly _tag: "Read"; readonly node: ResourceNode }
  | { readonly _tag: "Diff"; readonly node: ResourceNode; readonly observation: ResourceObservation }
  | { readonly _tag: "Create"; readonly node: ResourceNode }
  | { readonly _tag: "Update"; readonly node: ResourceNode; readonly observation: ResourceObservation }
  | { readonly _tag: "Delete"; readonly node: ResourceNode }
  | { readonly _tag: "Destroy"; readonly node: ResourceNode };
```

Command results are tagged data as well. `ResourceObservation` describes provider state after a read. `PlanDecision` describes the action selected by reconciliation. Execution results carry schema-encoded outputs and persistence metadata.

## Resource References

Resource constructors return handles with explicit schema-derived refs:

```ts
const bucket = yield* Aws.Bucket({ Bucket: "uploads" });
const queue = yield* Aws.Queue({
  QueueName: "events",
  SourceArn: bucket.outputs.BucketArn,
});
```

A ref records the source resource key, output path, and output schema metadata. When a ref appears inside another resource's props, the graph service records a dependency edge. Props and refs are decoded and encoded through the schemas attached to the resource model.

## Provider Policy Services

The reconciler emits `ResourceCommand` values and calls the provider policy service. AWS policy dispatch maps `ResourceKind` to the concrete AWS resource policy service responsible for that kind.

Concrete resource policy services decode node payloads with their schemas and call Distilled AWS operations. Bucket policy handles bucket read, diff, create, update, and delete. Queue policy handles queue lifecycle behavior. Queue policy and bucket notification policy handle the composition resources once refs are resolved.

Core reconciliation code works with command values, graph order, observations, and decisions. It does not encode AWS resource semantics.

## Reconciliation Flow

The lifecycle starts by building the desired graph from the stack program and hydrating persisted environment state. Reconciliation traverses the desired graph in dependency order, sends `Read` commands through the provider policy service, converts read results into `ResourceObservation` values, sends `Diff` commands, and converts decisions into an action graph.

Execution batches are derived from the action graph. Independent nodes in one batch run with `Effect.all(..., { concurrency: "unbounded" })`; dependent batches run after their prerequisites. Successful command results are schema-encoded and persisted through the state store.

## State And Persistence

The state model stores resource status, encoded desired props, encoded observed state, encoded outputs, last error, and timestamps. File storage remains behind `ResourceStateStore`; the file format is validated through `Schema.decodeUnknownEffect` on hydration and `Schema.encodeEffect` on write.

Reads persist observed state after successful refresh. Creates and repairs persist created outputs after successful provider execution. Failed actions persist enough tagged failure metadata for the next run to explain the interrupted resource and retry from current provider state.

## CLI Integration

`plan`, `diff`, and `create` use the same lifecycle path. They build the desired graph, hydrate state, read AWS where remote calls are required, reconcile decisions, render concise output, and execute selected action batches for apply-oriented commands.

AWS SSO provider layers are supplied at the command edge for commands that contact AWS. Local graph inspection commands can run without remote provider layers.

## Implementation Shape

Lifecycle services are `Context.Service` values. The main read, diff, plan, and execute paths stay as visible `Effect.gen` flows with schema decoding at data ingress and provider-policy calls at resource-specific behavior points.

Use `Graph.topo` for dependency order, `Match` for ADT handling, `Option` for absent graph nodes or skipped decisions, and `Data.TaggedError` for missing policy, unsupported command, invalid command result, and provider failures.
