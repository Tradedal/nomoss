# AWS provider

[generated/clients](generated/clients/) contains one npm package per AWS service. [generated/resources](generated/resources/) contains the TypeScript that applications use to declare AWS resources in a Nomoss stack.

[client-core](client-core/) contains the handwritten code that signs, sends, and decodes requests for the generated clients. [credentials](credentials/) contains the handwritten provider that resolves AWS profiles and obtains sessions through the generated STS, SSO, and SSO OIDC clients. Client core receives credentials through the `AwsCredentialProvider` service.

To call IAM directly with your environment or AWS CLI profile, import `makeIAMClient` from `@tradedal/aws-client-iam` and provide `awsClientLayerLive` from `@tradedal/aws-credentials`. The packages ship TypeScript for runners such as `tsx`. Nomoss calls the same IAM client when it applies supported IAM resources.

To call AWS as an IAM role, pass the role ARN and session name in the request to `awsAssumeRoleCredentialsLayer(stsRegion, request)` from `@tradedal/aws-credentials`. Provide HTTP transport and the source principal. For environment keys or a CLI sign-in, provide `awsDefaultCredentialsLayer`. For application-managed keys, decode the source with `AwsCredentials` and map a validation failure to `AwsClientConfigurationError`. Give that acquisition function to `awsCredentialProviderLayer`. These exports are available from `@tradedal/aws-client-core/config`.

Pass the role provider to `awsClientConfigLayerFromProvider` from `@tradedal/aws-client-core/config`, and provide that configuration and HTTP transport to `awsClientLayer`. The STS region selects where AWS issues the session. The application configures the region where it calls AWS with that session.

When a stack needs its AWS account, partition, or region, yield `AwsEnvironment` from `nomoss/providers/aws` and call `resolve()`. The service uses STS for the account and partition and the client configuration for the region. It returns branded values that callers can pass to `formatArn`. Pass an empty region for a global IAM ARN. Use the `AwsArn` schema to validate an ARN received as text and `AwsArnFromString` to read its components. Both schemas are available from `@tradedal/aws-client-core/model`.

## Change IAM support

To add an IAM API operation, select it in the [IAM Smithy manifest](../../tools/awsServiceResources/sources/iam.json) and regenerate the [IAM client](generated/clients/iam/index.ts) using the [generation guide](../../tools/awsServiceResources/README.md#select-the-aws-operations).

To change what a stack accepts for an IAM group, start with the [CloudFormation Registry inputs](../../tools/awsServiceResources/sources/resources.json) and the [generated group declaration](generated/resources/iam/group.ts). To change what the stack sends to IAM, edit the [group lifecycle mapping](management/mappings/iam/group.ts). A [group membership mapping](management/mappings/iam/userToGroupAddition.ts) selects the native list, add, and remove operations. The shared lifecycle removes the declared memberships while leaving the group intact.

Keep provider requirements that cannot be expressed by a mapping in [IAM management operations](management/operations/iam/). For example, an [IAM managed policy](management/operations/iam/managedPolicy.ts) must publish a new default version before its document changes. It uses the same [association operations](management/resourceAssociations.ts) as group membership to add and remove selected attachments. Run `yarn generate:aws-management` after you add or rename a definition. The [IAM integration cases](../../tests/aws/native/iam/resourceLifecycleCases.ts) verify these behaviors against AWS.
