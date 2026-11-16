# CLI workflow

An operator runs the application's command script to create a stack, update it as the application changes, or delete it when it is no longer needed. The application selects the stack and provider configuration, and commands use the stack name to find the state saved by earlier runs.

The queue application runs through `yarn nomoss`. The UX examples are approximate and will be updated after the CLI is implemented and tested.

## Diff, create, and update

Before deployment, diff compares the application's declared resources with the stack's saved state and lists the resources to create, update, or delete. The operator can review this output without changing provider resources.

For a new stack, the operator runs create. Nomoss creates the application's declared resources and saves their state under the stack name.

```console
$ yarn nomoss diff
Stack "queue"
  Create Queue

$ yarn nomoss create
Stack "queue"
  Create Queue
  Queue created  id=<queue-id>
```

After changing the application, the operator runs update to change the existing stack. Nomoss compares the declaration with saved state, creates newly declared resources, updates resources whose configuration changed, and deletes resources removed from the declaration. Help for create and update explains which stack operation each command performs.

```console
$ yarn nomoss diff
Stack "queue"
  Update Queue

$ yarn nomoss update
Stack "queue"
  Update Queue
  Queue updated  id=<queue-id>

$ yarn nomoss diff
Stack "queue"
  No changes
```

Before creating or updating the stack, the command displays the plan it will execute. An update plan lists deletions before creations and updates. Execution uses the resources and dependencies captured in that plan. If saved state changes after planning, the command stops before changing any provider resource, and the operator needs a new plan. Changes to a saved operation's status also invalidate the plan, even when resource values stay the same.

When a change requires replacement, the plan identifies the resource to replace and shows the order of its creation and removal operations. A resumed plan lists the operations that still need to run. Dependency values are resolved again during execution, and an unchanged request preserves the current resource.

Each action waits for its prerequisites to succeed and for their output values to pass validation. Nomoss saves completed actions so later runs can use their results. After execution, the operator receives a summary of deleted, created, and updated resources, with provider identifiers where available. When the plan contains no actions, the command reports that the stack needs no changes.

## Reconcile and delete

An operator runs reconcile to refresh saved state from the providers before preparing another plan. Its output identifies which managed resources the providers found and which are missing, so the next plan can account for what exists remotely.

When the stack is no longer needed, the operator runs delete to remove it. The command displays and executes a plan to delete the stack's managed resources. It removes dependent resources first so they no longer use a resource when its deletion begins. Changes to saved state invalidate this plan under the same rules as a create or update plan.

```console
$ yarn nomoss delete
Stack "queue"
  Delete Queue
  Queue deleted  id=<queue-id>
```

## Application configuration

The application's command script runs the Nomoss commands with the configured services. Each command uses the application's stack declaration and provider configuration to prepare its plan, execute it, and resolve output data. If a declaration fails or is interrupted, Nomoss clears its partially registered resources so they cannot affect a later command. A declaration prepared for later execution keeps its own resources and dependencies, as defined by the [resource graph contract](resource-graph.md).

With the planned declaration API in the [output guide](resource-outputs.md), an application defines its desired resources and output data through an Effect. The engine registers the resources and prepares them for the selected command. CLI and embedded callers share the configured service graph, and embedded callers receive their declared output type through result.outputs.

For a provider configured by region, an explicit application setting takes precedence over environment and shared-profile settings. Without an explicit setting, the provider uses those settings to select the region for requests and signing.

An operator can request help or the installed Nomoss version even when provider configuration is invalid, allowing them to inspect command usage without first configuring a deployment.

## Planned progress and failure reporting

While a provider operation is pending, the operator sees the active resource, the latest provider message, and elapsed time. In an interactive terminal, each resource has a row that updates in place. Redirecting output produces plain records with the same information as execution proceeds. Completed and failed results remain readable after execution ends.

```console
$ yarn nomoss update
Stack "queue"
  Update Queue
  Queue updating  12s  <latest provider message>
```

When a command fails, its diagnostics identify the affected stack, resource, and operation and retain the provider's typed failure information so the operator can identify what stopped execution. Interrupting a command stops its local provider work.
