# AWS resource lifecycle management

The AWS resource contract gives applications typed Effect services to declare resources, review a plan, and apply it. AWS definitions govern the properties an application can declare and the requests the internal client can execute.

## Declare AWS resources

The AwsResourceDefinitionCompiler generates input and output schemas from CloudFormation Registry definitions and relationship metadata. A provider.Resource(props) declaration registers its schema and returns a typed entity for use in compatible resource properties. Its inputs describe what the application controls. Its outputs describe what AWS supplies.

Generated schemas preserve required properties and nested definitions. Registry annotations identify each resource and distinguish read-only, write-only, and create-only properties. The planner uses those classifications to select an action, and the state service retains values that future reads may omit.

In the relationship contract, the application passes a resource entity. Its schema restricts the source type and identifies which applied values the AWS request needs. Core checks the registered source, waits for it to apply, and validates the resolved request before mutation. AWS declarations still need entity inputs wherever generation lacks this metadata. [resource graph contract](resource-graph.md)

A relationship identifies a dependency. The resource policy defines which principal receives a grant, where the permission belongs, and how to configure the affected resources. The same core contract covers relationships across providers, nested properties, and requests that need several outputs. Applications can also read an AWS output directly.

## Generate AWS operations

The official AWS Smithy models define Cloud Control requests and responses. Smithy's OpenAPI converter and a registered Smithy2OpenApiExtension convert them to OpenAPI 3.1 for AwsCloudControlClientGenerator. Effect normalizes component schemas to JSON Schema Draft 2020-12 and compiles them through SchemaRepresentation. [official AWS Smithy definitions](https://github.com/aws/api-models-aws) · [official OpenAPI converter](https://smithy.io/2.0/guides/model-translations/converting-to-openapi.html)

The generated client needs the model's execution traits as well as its payload schemas. OpenAPI extensions carry those traits into TypeScript so a request reaches the correct region with the correct signature and follows AWS rules for idempotency, pagination, and retries.

Cloud Control uses AWS JSON RPC 1.0. All operations share POST / and application/x-amz-json-1.0. X-Amz-Target identifies the operation. Since OpenAPI identifies operations by method and path, Smithy's converter creates a document with component schemas for each operation. The AWS JSON extension describes its request and response.

Contributors can compile TypeScript from the versioned OpenAPI documents in src/providers/aws/client/openapi/cloudControl. Regeneration replaces the previous service documents reproducibly. The generator checks the pinned converter dependencies against their checksums. Generator changes require the upstream sources and guides in refs/smithy and refs/aws-api-models.

The generator constructs and transforms the complete TypeScript module through ts-morph and TypeScript AST operations. That rule also covers documentation and exports.

Support for an additional AWS capability requires the protocol behavior in its Smithy models. This applies to authentication calls as well as service requests, including any model-specific wire format, stream, or checksum.

## Execute AWS requests

Resource services and generated operations compose public client methods for credential resolution, request signatures, HTTP execution, and retries. Callers can use and test each capability independently. Each method owns its validation and execution and returns a named domain result. [Effect development contract](../development/effect-native-development.md)

The generated input schema validates and encodes a request. Before serialization the client resolves the service address, sets generated headers, and supplies any absent modeled idempotency token. The generated output schema decodes a successful response. Callers that compose HTTP contracts directly use the same public methods.

AwsRequestSigner takes the serialized HTTP request with its generated headers, Nomoss credentials, region, and signing name. It returns a SigV4-signed request. Only the signer imports @smithy/signature-v4 and SHA-256 from @smithy/core/checksum, with @smithy/types and tslib as dependencies. Its public contract exposes Nomoss types.

Retries reuse the prepared payload and idempotency token. Credentials can refresh before the next signature. AwsRetryPolicy applies backoff and AWS retry hints up to the configured attempt limit. A provider failure retains enough detail to decide whether to retry and to explain the failure to the caller. Fiber interruption stops local requests and waits.

Applications supply configuration and HTTP transport through one Layer graph. Tests can replace those dependencies and exercise the same generated calls, request tracker, and resource lifecycle as production. The AWS package exports the contracts, services, and Layers for that composition.

Saved provider metadata selects the registered resource policy. The registration stays in scope throughout execution so every read and planned change uses the application's AWS configuration.

The target runtime resolves service addresses and credentials through generated contracts and internal Effect services. The dependency restriction covers generated AWS service libraries, @aws-sdk/core, and @aws-sdk/credential-provider-node in dependencies and generated imports. Existing imports still need replacements that preserve supported authentication flows and credential refresh.

## Wait for Cloud Control results

A Cloud Control request embeds a Registry-validated resource document. The Smithy operation schemas govern the enclosing request and response.

AWS can accept a change before it completes. Nomoss follows the request token to a terminal result. After a successful create or update it reads the resource by provider identifier. Only a model that passes the generated output schema becomes saved state or input to another resource.

A read or change requires the identity and metadata its operation defines. Absent request tokens or required result data produce tagged failures. Discovery follows the generated pagination contract. Interruption stops local HTTP work and waits. An accepted remote request requires a separate AWS cancellation operation.

## Resource policy and recovery

Before a change, the resource policy establishes the provider identity and defines when Nomoss can adopt or replace the object. The plan respects dependencies. Saved state retains what reconciliation and recovery require, subject to the resource's retention rules for values AWS cannot reproduce.

A resource policy can use additional generated AWS operations through the internal client when Cloud Control lacks required behavior. The resource or operation contract defines its time limits, retry policy, output conversion, and recovery rules. The CLI presents the resulting plan and progress. [CLI contract](cli-workflow.md)
