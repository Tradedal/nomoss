# IAM for Lambda workloads

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Nomoss generates all 16 IAM resource declarations in the pinned Registry. The IAM remediation covers native management for that set. This tracker follows the roles, policies, and grants used by Lambda. The coverage table records which resource types have working registrations.

## Direction

The generated SDK owns pagination. Shared resource management owns the version inventory, protection rules, retention selection, and cleanup. Each resource registration supplies the generated operations, the versions to protect, the retention limit when one applies, and the sequence that publishes and activates a version. Use the existing resource runtime and shared timing policy.

Use the role declared in the HTTP echo example to verify access through AWS. Keep ownership with the resource that declared the assignment. Changes to one grant must preserve unrelated access.

## Completed work

- [x] The generated IAM client can list the principals attached to a managed policy and attach or detach that policy for users and groups. It already supports the corresponding role operations. These operations give the pending managed policy lifecycle the AWS calls it needs to read and change assignments. [IAM manifest](../tools/awsServiceResources/sources/iam.json) · [Generated IAM client](../generated/aws/clients/iam.ts)

- [x] The retired runtime managed the lifecycle of standalone managed policies. At the five-version limit it retired an oldest inactive version and published the revised document at the same ARN. The live suite verified the active document and confirmed that a rejected update preserved the previous version and allowed teardown. · [Managed policy workflow](../tests/aws/native/iam/managedpolicy.integration.test.ts)

## Tasks

### Shared version management

- [ ] Use shared version management for EC2 launch templates and Step Functions state machines when registering their native operations. EC2 publishes a version and sets the default in a separate call. Protect the default and versions pinned by managed consumers. Step Functions updates alias routing separately from publication. Protect all versions referenced by its aliases. [EC2 launch template](../refs/aws-cdk/packages/aws-cdk-lib/aws-ec2/lib/launch-template.ts) · [Step Functions operation model](../refs/aws-api-models/models/sfn/service/2016-11-23/sfn-2016-11-23.json)

### IAM workload policies and grants

- [ ] Manage the `Policies` declared on a role by `LambdaExecutionRole`. Verify that applying the parent installs its logging policy and that revoking one embedded policy preserves the role and its other policies. Use the generated IAM declaration when rebuilding the Lambda workflow. · [Role registration](../providers/aws/management/mappings/iam/role.ts)

- [ ] Add the `Roles`, `Users`, and `Groups` assignments from the managed policy Registry definition. Track the assignments that the policy owns, and verify that updates and removal preserve unrelated attachments. [IAM Smithy model](../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json) · [Managed policy Registry definition](../refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-managedpolicy.json)

- [ ] Support `ManagedPolicyArns` on the role. Verify a change in the role's effective permissions after a policy update at the same ARN. Confirm that teardown removes the stack-owned assignment before deleting the policy. [IAM coverage](../docs/application/aws-resource-coverage.md#iam)

- [ ] Preserve grants when replacing an IAM role. The planner currently destroys the previous role before updating its dependents. IAM requires inline policies to be removed before it deletes the role. Order the grant migration and dependent workload updates before the previous role's removal, then verify the replacement against AWS. [Replacement planning](../src/core/stack/planner.ts) · [IAM Smithy model](../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json)

- [ ] Complete the direct `targetRole.grantPassRole(grantee)` and `targetRole.grantAssumeRole(grantee)` methods. The caller must be able to pass or assume the selected role only as granted. Removing the grants through the CLI must deny Lambda role passing and STS role assumption in the original caller session while preserving unrelated assignments. Teardown must remove the temporary functions and roles. [IAM Smithy model](../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json)

## References

The [IAM coverage list](../docs/application/aws-resource-coverage.md#iam) records resource support. The [Lambda tracker](dev-attempts_aws-lambda.md) uses these roles and grants in deployment verification.
