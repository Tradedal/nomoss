# AWS resource lifecycle management

The AWS resource contract gives applications typed Effect services to declare resources, review a plan, and apply it. AWS definitions govern the properties an application can declare and the requests the internal client can execute.

## Declare AWS resources

AWS resource generators use CloudFormation Registry definitions and relationship metadata to produce input and output schemas. A resource declaration registers its schema and returns a typed entity that the application can pass to compatible resource properties. Its inputs describe what the application controls. Its outputs describe what AWS supplies.

Generated schemas preserve required properties and nested definitions. Registry annotations identify each resource and distinguish read-only, write-only, and create-only properties. The planner uses those classifications to select an action, and the state service retains values that future reads may omit.

In the relationship contract, the application passes a resource entity. Its schema restricts the source type and identifies which applied values the AWS request needs. Core checks the registered source, waits for it to apply, and validates the resolved request before mutation. AWS declarations still need entity inputs wherever generation lacks this metadata. [resource graph contract](resource-graph.md)

A relationship identifies a dependency and the values a request needs. The resource policy decides which provider actions the dependency requires. The same core contract covers relationships across providers, nested properties, and requests that need several outputs. Applications can also read an AWS output directly.

## Generate AWS operations

The official AWS Smithy models define requests and responses for native service APIs and Cloud Control. Nomoss uses Smithy's OpenAPI converter and protocol extensions to produce OpenAPI 3.1 documents. Effect normalizes the component schemas to JSON Schema Draft 2020-12 and compiles them through SchemaRepresentation. [Official AWS Smithy definitions](https://github.com/aws/api-models-aws) · [Official OpenAPI converter](https://smithy.io/2.0/guides/model-translations/converting-to-openapi.html)

The generated client needs the model's execution traits as well as its payload schemas. OpenAPI extensions carry those traits into TypeScript so a request reaches the correct region with the correct signature and follows AWS rules for idempotency, pagination, and retries.

Cloud Control uses AWS JSON RPC 1.0. All operations share POST / and application/x-amz-json-1.0. X-Amz-Target identifies the operation. Since OpenAPI identifies operations by method and path, Smithy's converter creates a document with component schemas for each operation. The AWS JSON extension describes its request and response.

The generator checks the Smithy converter dependencies against their pinned checksums. It removes the intermediate OpenAPI documents when compilation finishes. The resulting clients and their package manifests live under [providers/aws/generated/clients](../../providers/aws/generated/clients/).

The generator constructs and transforms the complete TypeScript module through ts-morph and TypeScript AST operations. That rule also covers documentation and exports.

The client must honor the Smithy protocol for each new AWS capability. Authentication calls and service requests can require a particular wire format, stream, or checksum.

## Execute AWS requests

Generated operations use the shared AWS client. A resource service can call those operations through the same Effect runtime that supplies credentials and HTTP transport. Applications that supply credentials independently can use the [AWS package guide](../../providers/aws/README.md).

The client validates input against the generated schema before sending a request. It applies the service's address rules to the selected region and fills in an idempotency token when the operation declares one and the caller omits it. The generated output schema validates the response before the caller receives it.

Clients use SigV4 for operations that require it. Each retry signs with the credentials available for that attempt and sends the same payload and idempotency token. The retry policy honors AWS retry hints within the configured attempt limit. Interruption stops local requests and retry waits.

For an IAM Identity Center profile, run `aws sso login --profile <profile>` and set `AWS_PROFILE` to that profile. Nomoss obtains credentials for the configured account and role. If the cached access token expires, Nomoss can renew it when the profile uses a named session and the cache has a valid refresh token. Sign in again if the provider cannot renew the token. [IAM Identity Center provider](../../providers/aws/credentials/awsIdentityCenter.ts)

The AWS runtime uses generated Nomoss clients and Effect services for request execution. AWS SDK and JavaScript Smithy packages are outside the runtime dependency graph. The [runtime dependency tracker](../../attempts/dev-attempts_aws-runtime-dependencies.md#tasks) records the remaining coverage for credential sources, service addresses, and AWS Query.

## Resource policy and recovery

Before a change, the resource policy establishes the provider identity and defines when Nomoss can adopt or replace the object. The plan respects dependencies. Saved state retains what reconciliation and recovery require, subject to the resource's retention rules for values AWS cannot reproduce.

A resource policy selects the native AWS operations for its lifecycle. The operation contract defines how Nomoss interprets requests and responses. The lifecycle defines how long to wait for confirmation and which failures permit a retry or require recovery. The CLI presents the resulting plan and progress. [CLI contract](cli-workflow.md)

Saved Cloud Control records remain readable for inspection. Stack commands reject those records because their identifiers were issued for a different API and cannot be used to change or remove native AWS resources.
