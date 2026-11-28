# Resource lifecycle contract

The lifecycle contract gives applications a plan they can inspect, apply, and resume after interruption. One Effect service graph compares the declaration with saved state and the provider's current observation.

## Saved state across runs

A versioned resource record identifies the managed object and distinguishes desired properties from observed state and applied outputs. A later run uses its schema version to interpret those values and its lifecycle status or tagged failure to decide how to proceed.

A saved relationship identifies the source resource and type and retains the mapping for the dependent request. The source's properties stay in its own record. After reload or replacement, Nomoss resolves the reference against current validated source state because an earlier ID may identify the previous instance. Core persists these references. Compatibility across fresh runtimes remains under review. [unified tracker](../../attempts/dev-attempts_unified-resource-generation.md)

EnvironmentState groups resources and completed runs by environment. Lifecycle operations receive validated environment and resource records. The local store uses JSON files. Other stores share the same persistence contract.

Reconciliation compares the current declaration and the last applied request with a fresh provider observation. Each value stays distinct so the next action can account for both drift and application changes.

Core schemas define the common records. CloudFormation Registry defines AWS property constraints and lifecycle metadata. Smithy defines the operation contract used to generate and execute AWS requests. [AWS resource specification](aws-resource-lifecycle-management.md)

## Secrets across runs

A provider may return a secret only once. Stripe returns a webhook signing secret at creation, but later updates still need it. Resource schemas annotate protected outputs so the configured secret service retains them across runs.

NOMOSS_STATE_SECRET_STORE=macos-keychain selects the macOS login Keychain. For each annotated value, saved state contains a NomossStateSecretRef that names the macos-keychain store and identifies the secret by stack, logical resource id, and output key. A state read restores the value in memory before its next use. The default configuration stores values in local state.

A Keychain entry uses service com.nomoss.state and the account identity in its reference. To migrate an existing value, create its entry and write that reference to state. Keep the secret out of repository files, command output, shell history, and CI variables.

The login Keychain is for local development. CI and shared deployments require the state-secret service and secret store selected for that environment.

## Observations and planned actions

Reconciliation refreshes desired resources and any saved resources that still need a read. Provider services read in dependency order and report whether the object exists, is unreadable, or shows unmanaged drift. Their observations retain the evidence the resource policy needs for its decision.

A read requires the identity defined by the provider. Import uses the external identifier supplied for adoption. Provider services execute resource-specific reads through generated contracts.

The planner proposes creation for an absent desired resource, even if that object previously existed. For a property difference, lifecycle metadata determines whether to update or repair it. Removal from the declaration produces a delete decision for the saved object. Explicit teardown produces destroy decisions. Dependencies determine when an action can run and supply outputs. [command policy contract](resource-command-policy-stage.md)

## Execute a plan and recover unfinished work

Nomoss saves each completed action. A failed action retains its cause and stops dependent work. A resumed run validates saved state and obtains fresh observations before it selects the next mutation.

During replacement, a logical resource can own several provider instances. Each keeps its lifecycle status and protected outputs. Recovery skips completed removals, which stay on record until the operation finishes. Teardown removes each instance the stack still owns. Older records without an instance generation identify generation zero, so their saved identities and secret references remain valid.

Each provider defines which values recovery needs and how long to retain them. For example, AWS may omit a generated name or an identifier for an unfinished replacement on subsequent reads.

CLI and embedded applications execute the selected plan against its captured graph and state snapshot. A change to a lifecycle record produces ResourcePlanInvalidated before any provider mutation. Application configuration selects the environment and provider context. [CLI contract](cli-workflow.md)
