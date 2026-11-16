# AWS resource lifecycle management

Nomoss must expose typed Effect services through which applications declare AWS resources, inspect proposed changes, and manage those resources. Generation must derive valid properties and operations from the definitions published by AWS, and the internal client must execute requests under those generated contracts.

## Declare AWS resources

AwsResourceDefinitionCompiler must generate property and output schemas from CloudFormation Registry definitions and relationship metadata. Applications must declare resources through provider.Resource(props), with schema registration inside the provider function. Each declaration must return a typed resource entity that an application can pass directly into a compatible relationship property. The generated contract must distinguish inputs the application can set from outputs AWS supplies later.

The generator must preserve required properties and nested definitions. The Registry also distinguishes values that identify a resource, outputs that cannot be set, properties that cannot change after creation, and values AWS may omit from a read. Resource-schema annotations must retain these distinctions so the planner can choose valid actions and the state service can save the values later operations need.

Relationship metadata must define which resource types a property accepts and how Nomoss obtains the values required by the AWS request. The reference schema must accept the related entity and validate its type against the registered source resource. Applications must not choose an ID, ARN, or scalar output reference to establish the relationship. Nomoss must record the dependency, wait for the source to apply, and validate the resolved request before the dependent mutation. The core provides this behavior through the [resource graph contract](resource-graph.md), but AWS generation still lacks the entity inputs needed to use it.

Resource policy contracts must separately define permission placement, grants, and configuration that involves several resources because relationship metadata does not define those behaviors. Entity relationships must use the same core contract across providers. That contract must support nested properties and mappings that need several values. Ordinary output APIs remain available when an application needs an AWS value.

## Generate AWS operations

Cloud Control requests and responses must conform to the [official AWS Smithy definitions](https://github.com/aws/api-models-aws). Generation must convert those models to OpenAPI 3.1 through Smithy's [official OpenAPI converter](https://smithy.io/2.0/guides/model-translations/converting-to-openapi.html) and a registered Smithy2OpenApiExtension protocol implementation. AwsCloudControlClientGenerator must consume those documents. Effect must normalize component schemas to JSON Schema Draft 2020-12 and compile them through SchemaRepresentation.

A generated operation must preserve both its payload schemas and the AWS execution rules defined by the same model. OpenAPI extensions must retain the required signing and region metadata, idempotency tokens, pagination rules, and modeled retry decisions so TypeScript generation can pass those facts to the client.

Cloud Control uses AWS JSON RPC 1.0. Its operations share POST / and application/x-amz-json-1.0, and X-Amz-Target selects the operation. OpenAPI identifies an operation by method and path, so each Cloud Control operation needs a separate document. The AWS JSON extension must describe actual request bindings and responses. Smithy's converter must construct the documents and component schemas.

Generated OpenAPI documents must remain under version control at src/providers/aws/client/openapi/cloudControl so contributors can inspect them and compile TypeScript directly from them. Regeneration must replace the service's previous documents reproducibly. Converter dependencies must have pinned versions, and the generator must verify their checksums. The upstream source and documentation must be available under refs/smithy and refs/aws-api-models before contributors change the generator.

All generated TypeScript must be constructed and transformed through ts-morph and TypeScript AST operations. This requirement covers schemas, callable methods, documentation, and exports. Source-code literal dumps, interpolated source templates, and ad hoc text replacement are prohibited.

When an application needs another AWS capability, generation must support the models and protocols required by that capability. Authentication and service invocations follow the same rule. Support must include any serialization, streaming, checksum, authentication, and request behavior required by the selected models.

## Execute AWS requests

Generated operations and resource services must be able to compose public methods that resolve credentials, sign and execute requests, and retry failed requests. Callers must be able to use and test each capability independently. Each method must keep its validation, decisions, dependency calls, and final result together and return a named value with its domain type, as required by the [Effect development contract](../development/effect-native-development.md).

Every operation must validate and encode inputs through its generated schema and decode successful responses through the generated output schema. The client must supply any missing modeled idempotency token and use the resolved service address and generated operation headers before it serializes a request. Callers that compose HTTP contracts independently must use these same public capabilities to prepare and execute requests.

AwsRequestSigner must sign the final serialized request and its generated headers. It must accept the prepared HTTP request together with Nomoss credentials, region, and signing name and return the signed request. Its SigV4 implementation must use @smithy/signature-v4 and SHA-256 from @smithy/core/checksum, with @smithy/types and tslib as supporting dependencies. These imports must stay inside the signing implementation so application contracts and generated modules do not expose AWS implementation types.

A retry must reuse the prepared payload and idempotency token. Credentials may refresh before the next signature. AwsRetryPolicy must apply backoff and provider retry hints within the configured attempt limit. Provider failures must retain the information needed to decide whether to retry and to explain a failed lifecycle operation. HTTP requests and waits must stop when the caller's fiber stops.

Applications must be able to provide configuration and HTTP transport through one shared Layer graph. Production and tests must use the same assembly for generated invocation, request tracking, and resource lifecycle behavior. Tests may replace configuration and transport. The AWS package entry point must expose the contracts, services, and Layers applications need to compose this runtime.

Resource commands must reach the policy registered for the provider identified by saved resource metadata. Those registrations must remain available throughout execution so reads and planned changes use the application's configured AWS services.

AWS-generated service libraries, @aws-sdk/core, and @aws-sdk/credential-provider-node are prohibited in dependencies and generated imports. Address resolution, configuration, and authentication must use generated contracts and internal Effect services. Existing prohibited imports still require replacement, which must preserve supported authentication flows and credential refresh.

## Wait for Cloud Control results

A Cloud Control request contains a resource document together with the operation parameters. The resource document must follow its Registry-derived schema; the outer request and response must follow the Smithy-derived operation schemas.

An accepted Cloud Control mutation may still be in progress. Nomoss must track its request token until AWS reports a terminal result. After successful creation or update, Nomoss must read the resource model through the provider identifier and validate it against the generated output schema. Only that validated result may be saved or used by dependent resources.

Reads and changes require the resource identity defined by the operation. Missing required metadata, tokens, identifiers, or resource models must produce tagged failures. Discovery must follow generated pagination rules. Local interruption must stop HTTP work and waits; cancellation of an accepted remote request requires an explicit AWS cancellation operation.

## Resource policy and recovery

Before a Nomoss policy changes an AWS resource, it must establish the provider identity that the request will use. The policy must also define adoption, action selection, replacement, and recovery for that resource. Plans must respect graph dependencies, and saved state must retain the information required for later reconciliation. Values that AWS cannot reconstruct must remain available under the resource's retention contract.

Support for a resource type requires usable operations in the selected execution context. If Cloud Control cannot provide required behavior, the resource policy must use additional generated AWS operations through the internal client. Retry limits, timeouts, output transformations, and recovery rules need a requirement in the operation or resource contract that uses them. The [CLI contract](cli-workflow.md) defines how commands present plans and progress.
