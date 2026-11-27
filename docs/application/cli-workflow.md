# CLI workflow

Run the application's command script to manage its stack. The application selects the provider configuration and stack name. Commands use that name to find state from earlier runs.

In the queue example, place `queue` before the operation. The example calls SQS through the generated AWS client and saves state under `native-queue`. Terminal output below is abbreviated.

## Diff, create, and update

Before deployment, `diff` compares the application's declared resources with its saved state and lists what Nomoss plans to create, update, or delete. To check what currently exists at the provider, use `reconcile` to refresh that state.

Run `create` to deploy a stack that has no applied resources in saved state. Nomoss saves each resource under the stack name. If some resources were applied before an earlier run stopped, run `update` to continue.

```console
$ yarn nomoss queue diff
Stack "native-queue"
  Create Queue

$ yarn nomoss queue create
Stack "native-queue"
Resources
[+] aws:sqs:queue/Queue
  ✓ aws:sqs:queue/Queue  created  1s
Stack "native-queue" deployed in 1.2s.
Resources: 1 created, 0 updated, 0 replaced, 0 deleted, 0 unchanged.
```

Run `update` when the stack already has applied resources. Nomoss brings those resources into line with the new declaration. It creates new resources and deletes those the application removed. Add `--detailed` to see the redacted YAML property diff before execution. If the stack has no applied resources, the command exits before any provider call and directs the operator to `create`.

```console
$ yarn nomoss queue diff --detailed
Stack "native-queue"
  aws:sqs:queue/Queue  update
    properties:
        QueueName: nomoss-native-sqs-example
    -   VisibilityTimeout: 30
    +   VisibilityTimeout: 60

$ yarn nomoss queue update --detailed
Stack "native-queue"
  aws:sqs:queue/Queue  update
    properties:
        QueueName: nomoss-native-sqs-example
    -   VisibilityTimeout: 30
    +   VisibilityTimeout: 60
  ✓ aws:sqs:queue/Queue  updated  1s
Stack "native-queue" deployed in 1.1s.
Resources: 0 created, 1 updated, 0 replaced, 0 deleted, 0 unchanged.

$ yarn nomoss queue diff
Stack "native-queue"
  aws:sqs:queue/Queue  unchanged
```

Both commands display the plan before execution. An update lists deletions first. The plan captures its resources and dependencies. A subsequent change to saved state invalidates the plan before any provider mutation. Even a change to an operation's status requires a new plan.

Use `Asset.fromPath` for a file or directory and `Asset.fromBuild` for a source entry point and its build settings. Diff, create, and update prepare each asset and record its SHA-256 digest in the plan. Detailed output shows the source and digest. Apply uses the exact bytes from that plan. To deploy a later edit, prepare a new plan. Dependency inspection, state inspection, reconcile, and delete require no source build or package. [Asset API](../../src/core/asset.ts)

When a change requires replacement, the plan identifies the resource to replace and shows the order of its creation and removal operations. A resumed plan lists the operations that still need to run. Dependency values are resolved again during execution, and an unchanged request preserves the current resource.

Each action waits for its prerequisites to succeed and for their output values to pass validation. Nomoss runs all independent creations and updates in a dependency batch in parallel by default. Set `NOMOSS_MAX_CONCURRENT_ACTIONS` to a positive integer to cap concurrent actions, or set it to `1` to run them sequentially. Nomoss saves completed actions so later runs can use their results. Completed progress rows show provider identifiers where available.

A planned dependency update counts as unchanged if its resolved inputs match saved state and Nomoss skips the provider call. A plan with no actions reports all retained resources as unchanged.

After a successful create, update, or delete, the CLI reports elapsed time and actual resource totals. Each replacement counts once. A teardown retry counts only the removals it completed. The timer starts when the displayed plan begins execution and stops after Nomoss saves the results, evaluates application outputs, and writes the final progress events. Plan preparation, source builds, and the summary itself fall outside that interval.

## Reconcile and delete

Run `reconcile` to refresh applied resources that still have a declaration. The command distinguishes objects the provider found from those it confirmed absent. It retains state for removed declarations so the next plan can delete their objects. New resources become eligible after apply. An empty stack directs the operator to `create`.

Run `delete` to remove the stack's managed resources. The command plans from saved state, so it can run when the declaration is incomplete. It removes dependent resources before their prerequisites. Changes to saved state invalidate this plan under the same rules as a create or update plan. Existing scripts can also call the command as `destroy`.

```console
$ yarn nomoss queue delete
Stack "native-queue"
Resources
[-] aws:sqs:queue/Queue
  ✓ aws:sqs:queue/Queue  destroyed  1s
Stack "native-queue" deleted in 1.1s.
Resources: 0 created, 0 updated, 0 replaced, 1 deleted, 0 unchanged.
```

## Application configuration

Export the stack name, resource Effect, provider Layer, and state Layer from the application. In the CLI, create a command with Effect's `Command.make` and add the stack operations with `withStackCommands`. Compose the provider and state Layers with `stackCommandRuntimeLayer` and install that graph with `Command.provide`. The stack uses that graph and state store from declaration through execution. If a declaration fails or is interrupted, Nomoss clears its partial registrations before another declaration can use the resource graph. [Queue application](../../examples/queue/application.ts) · [Example command tree](../../examples/commands.ts) · [Resource graph contract](resource-graph.md)

The resource Effect returns a function that reads provider values after apply saves them. An embedded caller receives those values in `result.outputs`. [Resource outputs](resource-outputs.md)

For native AWS resources, supply the configuration Layer and an HTTP client Layer to `AwsProviderLive` with `Layer.provide`. The queue example provides `AwsRegion` to `awsClientConfigLayer` so its region takes precedence over the environment and shared profile for the request and its signature. The state machine example uses `awsClientConfigLayer` directly and gets its region from the environment or shared profile. [Queue example](../../examples/queue/application.ts) · [State machine example](../../examples/state-machine/application.ts)

Help and version commands work even if provider configuration is invalid. An operator can inspect usage before deployment.

## Live progress and failure reporting

During create, update, and delete, Nomoss shows the current resource action and its elapsed time. When the native AWS client waits to retry a request, the row shows the operation and retry delay. An interactive terminal updates resource rows in place and checks off each completed action. Redirected output appends plain progress records as events arrive.

```console
$ yarn nomoss queue update
Stack "native-queue"
  Update Queue
  aws:sqs:queue/Queue  update running  12s  Retrying SetQueueAttributes in 200ms
```

Failure diagnostics identify the stack operation and affected resource and preserve the provider's typed error. An interrupt stops local provider work.

## Inspect a stack

`diff` shows the type, logical ID, and planned status of each resource it compared. A stack with no resources has its own message. Add `--detailed` to see saved and desired property changes as YAML. Nomoss redacts protected values and labels references whose values become available after apply.

`state list` lists saved resources and their lifecycle status. `state read <logical-id>` shows the provider identifier, properties, and outputs for that resource, with protected values redacted. A lookup for an unknown logical ID exits with an error and points to `state list`. Both commands read the configured store directly.

`dependencies` shows the prerequisites captured by the declaration. In the billing example, both prices wait for the membership product, and the billing portal waits for the prices it offers. [Resource graph](resource-graph.md)
