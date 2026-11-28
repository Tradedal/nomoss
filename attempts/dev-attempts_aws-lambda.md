# Lambda resource coverage

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

The HTTP echo example declares a function and its invocation permission through native AWS APIs. Running that example depends on the IAM workload migration because the Lambda role factory still imports the deleted role declaration. Complete the native lifecycle and Registry property support for all 13 Lambda resource types in the coverage list.

## Direction

Use HTTP echo to verify Function and Permission with a declared role, key, and log group. Add other resources in dependency order and update the coverage list after verification.

## Completed work

- [x] The HTTP echo example previously deployed a planned ZIP with an invocation permission and an IAM execution role. Nomoss waited for Lambda to become ready and verified the deployed code hash. The native function and permission registrations and the deployable example have since been removed.

## Tasks

- [ ] Complete Lambda Function and Permission coverage against the Registry contract. Exercise ZIP, S3, and image code inputs and the applicable configuration and permission changes. Verify apply, reconcile, replacement, and teardown with the execution role and key declared in the same stack. Use the shared AWS recovery task to verify interrupted creation. [AWS resource creation recovery](dev-attempts_aws-smithy-resource-generation.md#aws-resource-creation-recovery)

- [ ] Publish Lambda ZIPs larger than 50 MiB through a managed asset lifecycle that retains the object while a function uses it and removes it during teardown. [Lambda ZIP request](https://docs.aws.amazon.com/lambda/latest/api/API_FunctionCode.html) · [Resource lifecycle](../docs/application/resource-operations.md)

- [ ] Add native Version, Alias, LayerVersion, and LayerVersionPermission support. Verify that an alias can move between published versions, that functions can consume a declared layer version, and that a stack can revoke a layer permission while preserving unrelated statements. [Lambda coverage](../docs/application/aws-resource-coverage.md#lambda)

- [ ] Add native EventSourceMapping, EventInvokeConfig, and Url support. Verify delivery from a declared event source, asynchronous invocation configuration, and invocation through the configured URL and permissions. Expand related services only as needed to verify these workflows. [Lambda coverage](../docs/application/aws-resource-coverage.md#lambda)

- [ ] Add native CodeSigningConfig support with the AWS Signer resources required by the signing workflow. Verify a function can deploy trusted code and AWS rejects untrusted code under the declared enforcement policy. [Lambda coverage](../docs/application/aws-resource-coverage.md#lambda) · [Signer coverage](../docs/application/aws-resource-coverage.md#signer)

- [ ] Complete CapacityProvider, MicrovmImage, and NetworkConnector support. For each type, confirm the Registry and operation contracts, declare its required dependencies, and verify every applicable lifecycle action. Review all 13 Lambda types against the coverage criteria before closing the milestone. [Lambda coverage](../docs/application/aws-resource-coverage.md#lambda)

## References

The [IAM tracker](dev-attempts_aws-iam-workload.md) owns workload roles and grants. The [KMS and CloudWatch Logs tracker](dev-attempts_aws-kms-cloudwatch-logs.md) owns encryption and logging resources. The [Lambda coverage list](../docs/application/aws-resource-coverage.md#lambda) records provider support.
