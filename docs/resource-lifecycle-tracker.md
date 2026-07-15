# Resource Lifecycle Contract

## Purpose

Nomoss turns a desired Effect resource graph into a lifecycle loop: hydrate environment state, refresh provider state, reconcile desired and observed resources, execute the selected actions, and persist the resulting state.

The current prototype already builds a graph and creates resources. The production path must make refresh, reconciliation, execution, and persistence part of one service graph.

## Schema-Backed Data

Every public resource and lifecycle record is derived from or validated by Effect `Schema`. Graph nodes, resource refs, dependency edges, outputs, plan decisions, execution results, and persisted state records carry the schema information required to decode their payloads.

Distilled AWS schemas are the source for AWS operation payloads. Nomoss adds resource metadata and lifecycle result schemas around those payloads instead of recreating AWS request shapes locally.

Schemas are grouped by domain: core graph model, lifecycle model, state model, provider model, and AWS resource model. One-off schemas beside local helpers are a cleanup target because they erase the durable contract.

## State Model

`ResourceState` is the persisted record for one resource. It stores the resource key, schema version, desired props, observed provider state, outputs, lifecycle status, timestamps, and the last tagged failure when a command fails.

`EnvironmentState` is the persisted state for one environment. It stores the environment name, resource records keyed by stable resource identity, schema version, and last completed run metadata.

Desired props and observed provider state stay separate. Reconciliation compares decoded desired state, decoded persisted state, and freshly observed provider state without treating persisted desired props as proof of live AWS state.

## State Store

`ResourceStateStore` is the only persistence service used by lifecycle code. The initial implementation is file-backed JSON under a local state directory. Later S3 or DynamoDB storage can replace the file implementation without changing lifecycle services.

The store exposes environment-level load and save operations plus resource-level update operations. All file ingress and egress passes through schema decode and encode.

### State Secret Stores

`NOMOSS_STATE_SECRET_STORE=macos-keychain` opts the Nomoss CLI into the macOS login Keychain state-secret service. Without that setting, the service leaves local state unchanged. The Stripe webhook endpoint marks `WebhookSigningSecret` as a state secret because Stripe returns it only when the endpoint is created, while later endpoint updates still need the stored value.

The state file records a reference rather than the secret value:

```json
{
  "_tag": "NomossStateSecretRef",
  "store": "macos-keychain",
  "key": "<stack>/<logicalId>/<outputKey>"
}
```

The macOS state-secret service stores that value with Keychain service `com.nomoss.state` and account `<stack>/<logicalId>/<outputKey>`. It hydrates the raw string only in memory before Stripe policy code receives the resource node, and replaces annotated raw outputs with the reference on every state write. A first-time backfill is deliberate: add the value to the login Keychain, then replace the matching state output with its reference. Do not put the raw secret in shell history, repository files, CI variables, or command output.

macOS Keychain is a local-development state-secret service. CI and shared deployment paths must select the approved state-secret service for their secret store; they must not depend on an interactive login Keychain.

## AWS Reads

AWS resource services provide typed read operations. Bucket reads cover existence, region, tags, and the modeled configuration fields. Queue reads cover queue URL, ARN, modeled attributes, and tags. Bucket notification reads cover the notification configuration for a bucket and identify the managed queue notification entry.

AWS read logic stays in AWS resource services. Generic refresh and reconciliation services traverse the graph, ask the provider policy service for the resource service matching the node metadata, and collect schema-backed observations.

## Refresh

Refresh checks AWS for resources in the desired graph and resources already present in persisted state. The output is a refreshed state containing present, missing, unreadable, and unmanaged-drift observations.

Refresh is provider orchestration. It preserves dependency order, records observations, and leaves resource-specific comparison to policy services.

## Reconciliation

Reconciliation replaces empty-state planning with decisions derived from desired graph data, persisted state, and refreshed provider state.

The planner selects create when a desired resource is absent, update or repair when modeled props or provider state differ, delete when a persisted resource is removed from the desired graph, recreate when persisted state claims a created resource but AWS reports it missing, and destroy when the command requests teardown.

Dependency batching remains graph-derived. Reconciliation selects actions; batching and execution order come from the resource graph.

## Execution

The executor runs action batches in graph order. Independent actions inside one batch run concurrently. After each successful action, the executor writes the updated `ResourceState`. When an action fails, the executor persists tagged failure metadata and stops dependent batches.

Provider actions are Effect services. Retrying a failed lifecycle run starts from decoded persisted state and fresh provider observations, not from a private in-memory command log.

## CLI Flow

`nomoss plan --env <name> --profile <sso-profile>` hydrates state, refreshes AWS, reconciles desired and observed state, and prints the decision report.

`nomoss diff --env <name> --profile <sso-profile>` uses the same lifecycle path and renders selected action details with prop or observation differences when policies provide them.

`nomoss create --apply --env <name> --profile <sso-profile>` renders the plan before execution, applies action batches, and persists state after successful commands.

## S3 To SQS Composition

The first composition target is an S3 bucket publishing object-created events to an SQS queue. Stack composition stays explicit in resource code: bucket, queue, queue policy, and bucket notification.

Resources provide concrete output refs so downstream resources consume schema-backed outputs rather than reconstructing provider values in stack code. Queue resources provide `QueueArn` beside `QueueUrl`; queue policy and bucket notification consume that ref.

Queue policy services read the current queue policy through `GetQueueAttributes`, compare desired and observed policy state, apply changes with `SetQueueAttributes`, and clear the managed policy during destroy.

Bucket notification services read the current notification configuration, identify the managed queue notification entry, compare desired and observed notification state, apply changes with `PutBucketNotificationConfiguration`, and remove the managed entry during destroy.

The graph orders bucket and queue before queue policy, queue policy before bucket notification, and reverses dependent order for destroy. The integration check creates the stack, uploads an object, receives the matching SQS message, and destroys the stack with policy and notification cleanup.
