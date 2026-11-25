# Resource integration protocol

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Cross-resource integrations lack shared contracts that let provider capabilities accept references to declared and imported resources and return managed configuration actions. Applications therefore cannot yet compose permissions and dependent configuration through those reusable contracts.

## Direction

This scope is planned; implementation requires a separate instruction. Follow the [development contracts](../docs/development/effect-native-development.md), [review rules](../docs/development/review-remediation-spec.md), and [AWS specification](../docs/application/aws-resource-lifecycle-management.md).

Resource modules declare and register resources. Provider services implement capabilities such as permission placement, and integration services compose those capabilities through the same Layer graph. Capability implementations must remain independent of their consumers, and lint rules must enforce those import relationships. References must use canonical schemas and stable graph keys. Operations that construct references must not mutate provider resources.

Preserve the Registry schemas and relationship metadata selected by the [resource source manifest](../tools/awsServiceResources/sources/resources.json). Generate AWS operations through Smithy and retain Cloud Control execution. Direct service execution requires reviewed lifecycle mappings. Integration results must expose managed prerequisites and configuration actions, with failures in the Effect error channel. Keep private project details and borrowed application code outside repository documentation.

## Completed work

- [x] ResourceGraphStore records property dependencies and ordering prerequisites together. ResourceOutputResolver supplies upstream values before provider execution.

- [x] Registry generation preserves identifiers, property classifications, and relationship annotations. The shared Effect AWS client executes generated Cloud Control contracts.

## Tasks

- [ ] Core integration contracts lack schema-derived references that capability consumers can accept for both declared and imported resources. Define the validated data those consumers need. Operations that construct references must leave provider state unchanged.
- [ ] Provider capability services and resource-specific Facades lack implementations that callers can select through Layers. Supply reusable permission and encryption operations through those services and Facades. Base declarations must not acquire relationship methods.
- [ ] Integration services cannot yet return managed prerequisites and configuration actions. Define those results so ResourceGraphBuilder and ResourceStackLifecycle can order, save, and retry the work in the application graph.
- [ ] AWS grant generation lacks reviewed facts about policy placement, encryption, IAM actions, ARN scope, KMS actions, and conditions. Define catalogs from which generation can describe the intended grant for the service that places the policy. Generation must reject unsupported combinations before publication, and specialized grant inputs must have an explicit declaration contract.
- [ ] S3-to-SQS integration must represent permission, encryption, and notification changes as managed work through the shared capabilities. ResourceStackLifecycle must establish authorization before it configures notifications and reverse that order during teardown.
- [ ] Shared fixtures do not yet establish whether capability implementations and consumers can operate independently. Exercise distinct implementations through distinct integration services so their public contracts demonstrate compatible references, support for additional implementations and consumers, and typed failures.
