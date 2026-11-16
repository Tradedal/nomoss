# Resource lifecycle contract

Nomoss lifecycle operations must let an application inspect proposed changes, execute the selected plan, and resume after an unfinished run. Planning and recovery must account for what the application wants, what Nomoss previously saved, and what the provider reports now. All lifecycle operations must use the same application Effect service graph.

## Saved state across runs

Saved resource records must let the next operation identify the resource and interpret its data. Desired properties, observed provider state, and outputs have different meanings and must remain distinguishable. The record must also explain the last lifecycle status and any tagged failure. Schema versions are required so later readers can deliberately interpret an older record.

Saved declarations must retain entity relationships as serializable references to their source resources and types, together with the mappings needed for provider requests. They must not copy the source entity's properties or object graph into a dependent record. After a reload or source replacement, Nomoss must resolve the relationship against the source's current validated applied state. A previously resolved ID cannot replace the saved relationship because it may identify an earlier resource instance. Core persistence now retains these relationships, while compatibility across freshly constructed runtimes remains under review in the [unified tracker](../../attempts/dev-attempts_unified-resource-generation.md).

Resources must remain grouped under the selected environment. EnvironmentState must preserve information about completed runs, and lifecycle operations must receive validated environment and resource records. File storage uses JSON in the local state directory. Another storage implementation must provide the same guarantees to its consumers.

When Nomoss reconciles a resource, it must read the provider's current state and compare it with both the saved request and the application's current declaration. It must retain those three values separately so the next action accounts for remote changes as well as changes requested by the application.

The core resource, lifecycle, and state schemas define the shared records. For AWS, generation must preserve the property constraints and lifecycle metadata defined by CloudFormation Registry. Smithy defines the requests and responses for resource operations. Generation and execution must follow the [AWS resource specification](aws-resource-lifecycle-management.md).

## Secrets across runs

Some outputs must remain available even when a provider will not return them again. A Stripe webhook signing secret is returned at creation and still needs to be available during later updates. Resource schemas must identify outputs that require secret storage so the configured secret service can preserve them for those operations.

NOMOSS_STATE_SECRET_STORE=macos-keychain selects the macOS login Keychain. Saved state must then contain a NomossStateSecretRef in place of each annotated raw value. The reference must name the macos-keychain store and the secret's stack, logical resource id, and output key. A state read must restore the secret in memory before a provider operation uses it. The default configuration preserves values in local state.

The Keychain entry must use service com.nomoss.state and the account identity recorded by the reference. To move a saved secret into Keychain, create its entry deliberately and write the corresponding state reference. Secret values must stay out of repository files, command output, shell history, and CI variables.

The login Keychain is for local development. CI and shared deployments require the state-secret service and secret store selected for that environment.

## Observations and planned actions

Nomoss must refresh desired resources and saved resources that still need reconciliation. When a provider service reads a resource, it must report whether the resource is present, missing, unreadable, or affected by unmanaged drift. It must read resources in dependency order and retain the information resource policies need in the observations it returns.

Reads require the identifier defined by the provider contract. Cloud Control needs the saved resource type and provider identifier; import needs the external identifier supplied for adoption. Resource-specific reads must remain in the provider service and use generated operation contracts.

The planner must propose that Nomoss create an absent desired resource or recreate one that has disappeared remotely. When desired and observed properties differ, it must choose an update or repair according to the resource's lifecycle metadata. If the application removes a saved resource from the desired graph, the planner must propose that Nomoss delete it. An explicit teardown must produce destroy decisions. The resource graph determines when each action can run and when its outputs become available. Commands and outcomes must follow the [command policy contract](resource-command-policy-stage.md).

## Execute a plan and recover unfinished work

Nomoss must save each completed action so a later run can account for it. A failed action must retain its failure information and stop dependent work. Before a resumed run chooses another mutation, it must validate the saved state and obtain fresh provider observations.

A logical resource may own several provider instances while a composed operation is unfinished. Each instance must retain its own ordinary lifecycle status and protected outputs. Completed removals must remain recorded until the operation finishes so recovery can skip them. Teardown must plan ordinary removal actions for the instances that remain owned. Records without an instance generation identify generation zero, preserving the identities and secret references already saved by earlier runs.

To recover an unfinished operation, Nomoss may need provider identifiers, generated names, replacement information, or values the provider cannot reproduce. Each provider must define which values Nomoss needs, how it uses them, and how long it must retain them.

CLI and embedded applications must receive consistent plans and results. Apply and destroy must execute the displayed or selected plan against its captured graph and saved-state snapshot. If lifecycle records have changed, execution must fail with ResourcePlanInvalidated before any provider mutation. Application configuration selects the environment and provider context; the [CLI contract](cli-workflow.md) defines the operator's workflow and progress output.

## S3-to-SQS event delivery

The application must explicitly declare the bucket, queue, queue policy, and bucket notification needed to deliver S3 events to SQS. The queue's typed ARN and URL outputs must be available to other resources. Delivery authorization uses the bucket identity, and the notification destination uses the queue ARN.

Nomoss must authorize S3 to deliver events before it configures the bucket notification. During teardown, it must remove the notification before it removes that authorization. Changes must preserve policy entries managed outside this composition. Destroy must remove the notification and authorization entries created by the stack.

Resource-specific reads and changes must use generated AWS operations. Validation must demonstrate that an object upload produces the expected SQS event and that stack destruction removes the managed resources and configuration.
