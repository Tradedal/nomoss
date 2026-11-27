# Replace AWS SDK runtime dependencies

## Tracker maintenance

Keep each task open until its acceptance check passes. Record delivered behavior under Completed work. Keep source references with the task they support.

## Scope statement

Nomoss must obtain and renew AWS credentials, choose a service address, sign requests, and execute generated AWS operations without an AWS SDK or JavaScript Smithy runtime dependency. A TypeScript application must be able to supply source credentials and a target role, then use that role through a generated client. Preserve the generated client and stack workflows, including the existing development profile and workload credential sources. Keep Smithy models and the converter as inputs to generation.

## Direction

Publish STS, SSO, and SSO OIDC as service client packages under `providers/aws/generated/clients/`, using the same workspace rules as IAM and SQS. Keep the handwritten credential provider in its own package. It depends on those clients to acquire sessions. The generated clients depend on `@tradedal/aws-client-core`, which executes requests and receives credentials through Effect. Core has no dependency on the credential package. The application combines the packages through Layers.

Use the same request execution code for credential exchanges and other AWS operations. A signed STS request uses the source credentials for the role assumption. An operation that Smithy marks as unsigned skips signing; its token or other input supplies the authorization AWS requires. Authentication executes in TypeScript. Keep the generator responsible for carrying the model's requirements into the operation contract.

## Completed work

- [x] The AWS provider has separate packages for generated service clients and shared request execution. IAM and SQS install independently of the Nomoss stack engine. See the [AWS package layout](../providers/aws/README.md).
- [x] Projen configures STS, SSO, and SSO OIDC as generated service packages and `@tradedal/aws-credentials` as the handwritten credential package. The Nomoss runtime uses its public Layers. Yarn resolves the workspaces, and the client core package has no dependency on the credential package. See the [AWS package layout](../providers/aws/README.md).
- [x] Applications can supply source credentials and a target role to the [programmatic STS Layer](../providers/aws/credentials/awsAssumeRole.ts). The [request recovery test](../tests/aws/awsClient.test.ts) recovers an accepted result after STS renewal by resending the original payload and idempotency token.
- [x] The production Identity Center provider signed requests successfully in the live AWS suite. IAM User, Group, Role, and AccessKey passed creation, read, and teardown. The generated SQS client passed creation, update, and deletion. The other 12 IAM cases lack entries in the [native management registry](../providers/aws/management/resourceManagementRegistry.ts).
- [x] A clean application installed the packed IAM and SQS clients with client core, the credential package, and its generated service clients. The application constructed both clients with the public credential Layer. The installed dependency graph contained no AWS SDK, AWS Crypto, or JavaScript Smithy packages.

## Tasks

- [ ] Route shared role profiles through the programmatic STS Layer. Verify a generated operation against AWS under the assumed role and confirm that concurrent requests can share the renewed session. Use the [STS model](../refs/aws-api-models/models/sts/service/2011-06-15/sts-2011-06-15.json) and the [existing SDK contract](../refs/aws-sdk-js-v3/packages/credential-providers/README.md#fromtemporarycredentials).
- [ ] Complete credential discovery. Preserve configured profile precedence, static environment keys, shared credentials files, IAM Identity Center and login profiles, process credentials, web identity, and container and EC2 workload credentials. Resolve and refresh each source through the production credential provider. Coordinate Identity Center refresh for callers sharing a session, and keep secrets out of diagnostic output. Use the [SDK default chain](../refs/aws-sdk-js-v3/packages-internal/credential-provider-node/src/defaultProvider.ts) and the [profile resolver](../refs/aws-sdk-js-v3/packages-internal/credential-provider-ini/src/resolveProfileData.ts) as the compatibility reference.
- [ ] Complete request settings and signing compatibility. Preserve explicit region precedence, shared file overrides, region discovery, retry limits, FIPS, dual-stack, and custom service URLs. Verify that global IAM and regional services use the correct host and signing region. Cover restricted partitions, signed and unsigned operations, and supported path and query forms. Confirm that local commands can prepare a stack without AWS credentials. Use the [Smithy rules specification](../refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst) and the [signing fixtures](../refs/smithy-typescript/packages/signature-v4/src/suite.fixture.ts).
- [ ] Complete the AWS Query replacement. Generate wire metadata from Smithy and use it for form requests and XML replies, including nested and flattened collections, timestamps, pagination, and modeled errors with request IDs. Keep the existing JSON execution path. An XML parser can handle XML syntax; Nomoss implements the AWS Query wire rules and validates the result against the generated schema. Verify IAM behavior against the [AWS Query specification](../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst).
- [ ] Repeat the package install and live AWS checks after completing the remaining credential sources and protocol work. Follow the [integration testing procedure](../docs/development/testing.md#test-aws-workflows).
