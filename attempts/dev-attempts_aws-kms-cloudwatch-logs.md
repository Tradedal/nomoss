# KMS and CloudWatch Logs for Lambda

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Nomoss has a Cloud Control declaration for KMS keys. Lambda workloads need native key and alias support and a log group whose retention and encryption the stack can control. KMS replica keys remain separate from this milestone.

## Direction

Implement the native key lifecycle first so the log group can reference the key. Verify the resources together through the Lambda workflow once the log group is available.

## Completed work

- [x] Nomoss exposes a generated Cloud Control declaration for KMS keys. [KMS declaration](../src/providers/aws/cloudControl/resources/generated/kms/key/index.ts)

## Tasks

- [ ] Add native KMS key and alias lifecycles. Let applications pass the declared key to Lambda and CloudWatch Logs. Verify access by the intended principal, denial after revocation, and a teardown that respects KMS key deletion semantics. [KMS coverage](../docs/application/aws-resource-coverage.md#kms)

- [ ] Add the native CloudWatch log group lifecycle. Let a stack declare the function's log destination, retention, and KMS key. Invoke the deployed function to verify delivery, then check that the stack can change retention and remove its managed log group. [Logs coverage](../docs/application/aws-resource-coverage.md#logs)

## References

The [Lambda tracker](dev-attempts_aws-lambda.md) uses the key and log group in its deployment checks. The [AWS lifecycle contract](../docs/application/aws-resource-lifecycle-management.md) defines how declarations resolve provider values.
