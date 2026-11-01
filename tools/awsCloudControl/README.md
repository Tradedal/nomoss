Run `yarn generate:aws-resources` from the repository root with Java 17 or newer installed. The default source is `refs/aws-api-models/models/cloudcontrol/service/2021-09-30/cloudcontrol-2021-09-30.json` from [AWS's published models](https://github.com/aws/api-models-aws). Optional positional arguments select another model file and generated TypeScript output path.

`smithy-dependencies.json` pins Amazon's converter and its dependencies by version and SHA-256. The command downloads them from Maven Central into `.cache/nomoss/smithy` and verifies their checksums on every run.

`Convert.java` converts all operation inputs, outputs, and modeled errors into JSON Schema Draft 2020-12 with shared definitions. It retains RPC headers, signing name, endpoint rules, pagination, idempotency tokens, waiter definitions, and error metadata from Smithy.

`AwsCloudControlClientGenerator` compiles those definitions through Effect `SchemaRepresentation` and emits `src/providers/aws/client/generated/cloudControl.ts`, including typed schemas, operation metadata, and `HttpApi` declarations. HTTP operations share `POST /`; execution must apply each operation's generated headers after payload encoding and before signing. Named AWS error decoding and authenticated execution remain in the runtime integration task.
