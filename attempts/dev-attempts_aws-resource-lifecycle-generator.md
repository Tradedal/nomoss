# AWS client and resource lifecycle generation

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

This tracker records the declaration generator and the generated Cloud Control client. Current stack management uses native AWS operations. The [AWS resource coverage reference](../docs/application/aws-resource-coverage.md) lists the resource types a stack can deploy.

## Direction

Preserve canonical resource output names. Generate the resource declarations and client bindings through TypeScript AST operations, and compile schemas through Effect. Keep the Smithy models in `refs/` and preserve their execution traits in the generated clients. See the [AWS contract](../docs/application/aws-resource-lifecycle-management.md).

## Completed work

- [x] Resource declarations export schema-derived types and applied outputs, including empty output schemas and quoted properties. The upload event example reads queue URLs and ARNs from those outputs.

- [x] Smithy's official converter and the AWS JSON 1.0 extension publish eight Cloud Control OpenAPI 3.1 operation documents. The generator verifies pinned downloads with Effect, preserves modeled errors and retry metadata, and emits validated AST-based TypeScript with shared error sets and separate HTTP and operation contracts.

- [x] Generated AWS clients use shared request execution. Retries can use refreshed credentials while preserving the original payload and idempotency token.

## Tasks

- [ ] Complete credential, address, and request compatibility in the [AWS runtime dependency tracker](dev-attempts_aws-runtime-dependencies.md#tasks). This tracker covers the declaration and client generators.
- [ ] Define the native resource adoption contract. An application needs a way to supply the identity accepted by the resource's native read operation. Ordinary reconciliation continues to use saved identity.
