Run `yarn exec tsx tools/compileAwsCloudControlClient.ts` from the repository root with Java 17 or newer. By default, the command uses the Cloud Control Smithy model for 2021-09-30 and writes `providers/aws/generated/clients/cloudcontrol/index.ts`. Optional positional arguments select another model or output path.

Smithy's [OpenAPI conversion guide](https://smithy.io/2.0/guides/model-translations/converting-to-openapi.html) governs document construction. Its local copy is [refs/converting-to-openapi.rst.txt](../../refs/converting-to-openapi.rst.txt). The complete Smithy checkout includes [converter source](../../refs/smithy/smithy-openapi/src/main/java/software/amazon/smithy/openapi/fromsmithy), [AWS JSON 1.0 documentation](../../refs/smithy/docs/source-2.0/aws/protocols/aws-json-1_0-protocol.rst), and the [shared protocol requirements](../../refs/smithy/docs/source-2.0/aws/protocols/aws-json.rst.template). Keep those sources available before you change the transformation.

`smithy-dependencies.json` pins each converter artifact's version and SHA-256. The generator verifies the downloaded artifacts before compiling the Java extension. The classpath includes the checked-in Java SPI registration so Smithy can load that extension. The generator removes the temporary build files when it finishes.

`Convert.java` projects the service to one operation at a time and calls Smithy's official `OpenApiConverter`. `AwsJsonOpenApiExtension` registers AWS JSON 1.0 through `Smithy2OpenApiExtension`. Its protocol implementation declares the request body, target header, and responses. Smithy converts the component schemas and constructs each OpenAPI 3.1 document. The AWS metadata mappers retain service execution rules and modeled error retry traits as OpenAPI extensions.

The generator uses temporary OpenAPI documents to compile the client. Each operation retains the `POST /` request selected by `X-Amz-Target`. When modeled errors share an HTTP status, the response decoder uses AWS's error identifier to select the modeled error.

Declare source corrections in `corrections.json` under the operation document filename. The generator checks that each original value matches the expected value before it compiles the client.

`AwsOpenApi` resolves operation bindings and component definitions in the corrected documents. `SchemaCompilation` normalizes and compiles those definitions through native Effect APIs, as it does for Stripe. `AwsOpenApiTypeScript` consumes that `SchemaRepresentation.CodeDocument` and constructs schemas, typed metadata, HTTP contracts, and callable methods through ts-morph and TypeScript AST operations. Operations with identical error sets share declarations. Related client methods stay together so consumers can review the service API in one module. The generator formats and lints that module through the repository's Biome configuration before it publishes it.

`AwsClient.bindOperation` connects a generated service operation to the shared AWS execution services. It encodes caller input through the generated schema and supplies any absent modeled idempotency token before serialization. The request executes through Effect's HTTP client, and the generated output schema validates the response. The shared AWS graph supplies signing, credential refresh, regional resolution, modeled error validation, retries, and interruption behavior.

Import `makeCloudControlClient` from `@tradedal/aws-client-cloudcontrol` to call the API directly.

The [generation architecture](../../docs/application/generation-architecture.md) explains how provider definitions become validated operation contracts and resource declarations, and how lifecycle services use those contracts to execute requests and save provider results.
