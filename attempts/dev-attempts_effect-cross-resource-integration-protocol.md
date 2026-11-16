# Resource integration protocol

## Problem

Cross-resource integrations lack shared contracts that let provider capabilities accept references to declared and imported resources and return managed configuration actions. Applications therefore cannot yet compose permissions and dependent configuration through those reusable contracts.

## Rules / constraints

This scope is planned; implementation requires a separate instruction. Follow the [development contracts](../docs/development/effect-native-development.md), [review rules](../docs/development/review-remediation-spec.md), and [AWS specification](../docs/application/aws-resource-lifecycle-management.md).

Resource modules declare and register resources. Provider services implement capabilities such as permission placement, and integration services compose those capabilities through the same Layer graph. Capability implementations must remain independent of their consumers, and lint rules must enforce those import relationships. References must use canonical schemas and stable graph keys. Operations that construct references must not mutate provider resources.

Preserve Registry schemas and relationship metadata under refs/aws-cdk-service-spec. Generate AWS operations through Smithy and retain Cloud Control execution. Direct service execution requires reviewed lifecycle mappings. Integration results must expose managed prerequisites and configuration actions, with failures in the Effect error channel. Keep private project details and borrowed application code outside repository documentation.

## Completed

- [x] ResourceGraphStore represents property dependencies and ordering prerequisites in one graph, and ResourceOutputResolver applies upstream output values before provider execution.
- [x] Registry generation preserves resource identifiers, property classifications, and relationship annotations used by generated declarations.
- [x] Generated Cloud Control contracts execute through the internal Effect client and shared provider services.

## Remaining

- [ ] Core integration contracts lack schema-derived references that capability consumers can accept for both declared and imported resources. Define the validated data those consumers need. Operations that construct references must leave provider state unchanged.
- [ ] Provider capability services and resource-specific Facades lack implementations that callers can select through Layers. Supply reusable permission and encryption operations through those services and Facades. Base declarations must not acquire relationship methods.
- [ ] Integration services cannot yet return managed prerequisites and configuration actions. Define those results so ResourceGraphBuilder and ResourceStackLifecycle can order, save, and retry the work in the application graph.
- [ ] AWS grant generation lacks reviewed facts about policy placement, encryption, IAM actions, ARN scope, KMS actions, and conditions. Define catalogs from which generation can describe the intended grant for the service that places the policy. Generation must reject unsupported combinations before publication, and specialized grant inputs must have an explicit declaration contract.
- [ ] S3-to-SQS integration must represent permission, encryption, and notification changes as managed work through the shared capabilities. ResourceStackLifecycle must establish authorization before it configures notifications and reverse that order during teardown.
- [ ] Shared fixtures do not yet establish whether capability implementations and consumers can operate independently. Exercise distinct implementations through distinct integration services so their public contracts demonstrate compatible references, support for additional implementations and consumers, and typed failures.
