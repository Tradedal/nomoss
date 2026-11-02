# CLI workflow

An application's command script lets an operator inspect proposed infrastructure changes, apply the desired configuration, and remove the managed stack. The application chooses the stack and its provider configuration. The stack name identifies the saved state used by later commands.

## Inspecting and applying changes

Diff shows what would need to change to reach the application's desired configuration. The operator can review which resources would be created, updated, or deleted before running a command that changes them.

Create and update both apply the desired configuration. Either command may create missing resources, update existing ones, or delete resources removed from the application. Their help text must explain that behavior so an operator can choose either command without expecting different rules for existing resources.

Before making changes, create and update show the plan they will execute. Planned deletions appear before creations and updates. Execution must use that same plan, including its resource dependencies. If saved state changes after planning, the command must stop before changing any provider resource and require a new plan. A change to an operation's status counts even when the resource values are unchanged.

Resources that depend on another resource must wait until the required operation succeeds and its output values have been validated. Completed actions are saved for later runs. The final summary must include deleted resources as well as created and updated resources, with provider identifiers when available. When the plan has no actions, the command reports that the stack needs no changes.

## Checking remote state and removing a stack

Reconcile refreshes saved state from the providers. Its output identifies resources that were found and resources that are missing, so a later plan can account for what exists remotely.

Destroy shows the resources to remove and executes that displayed plan. Resources must be removed in reverse dependency order so a resource is no longer in use when its deletion begins. Saved-state changes must invalidate a destroy plan under the same rules as an apply plan.

## Application configuration

Every command must use a consistent stack declaration and provider configuration for planning, execution, and output. A failed or interrupted declaration must leave no partially registered resources that could affect a later command. Applications that prepare declarations for later execution must retain the consistency required by the [resource graph contract](resource-graph-mvp.md).

For AWS, an explicit region in the application configuration takes precedence over environment and shared-profile settings. Otherwise, those settings determine the region used for requests and signing. Application entry points reuse the Nomoss commands and provide the platform services needed to run them.

An operator must be able to request help or the installed Nomoss version even when provider configuration is invalid. Informational commands must remain usable without a working deployment configuration.

## Progress and failures

Current output shows action starts and final results. Live progress is still required: while a provider operation is pending, the operator needs to see which resource is active, the latest provider message, and elapsed time. An interactive terminal must update each resource's row in place. Redirected output must append plain records carrying the same information. Completed and failed results must remain readable after execution ends.

Structured failure diagnostics also remain required. A failure must identify the stack, resource, and operation and retain the provider's typed failure information so the operator can understand what stopped the command. Interruption must stop local provider work. Any progress display must stop when the command finishes or is interrupted.
