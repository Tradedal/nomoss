import {
  Context,
  Effect,
  FileSystem,
  Path,
  Schema,
  String as Str,
} from "effect";
import { AwsCloudControlClientGenerator } from "../awsCloudControl/AwsCloudControlClientGenerator.js";
import type { AwsServiceResourcePreparation } from "./model.js";

/**
 * Callers of the AwsServiceOperationGeneration service must supply verified
 * Smithy input from source preparation. Temporary conversion files belong to the
 * rendering scope; callers receive source for the shared module publisher.
 */
export class AwsServiceOperationGeneration extends Context.Service<AwsServiceOperationGeneration>()(
  "nomoss/tools/awsServiceResources/operationGeneration/AwsServiceOperationGeneration",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const converter = yield* AwsCloudControlClientGenerator;

      /**
       * The renderClient service method returns callable operation contracts
       * from the verified Smithy source. Its temporary OpenAPI documents are
       * released when conversion and emission finish. Conversion reads the
       * verified document retained by preparation, so later checkout changes
       * cannot replace the model during generation. Publication remains a
       * separate operation so callers can review and validate the module.
       */
      const renderClient = Effect.fn(
        "AwsServiceOperationGeneration.renderClient",
      )(function* (prepared: AwsServiceResourcePreparation) {
        const directory = yield* fs.makeTempDirectoryScoped({
          prefix: "nomoss-aws-service-",
        });

        const classpath = yield* converter.prepareSmithyConverter(
          "tools/awsCloudControl",
        );

        // Conversion must consume the document verified during preparation.
        // Serialize that retained value so later changes to the source checkout
        // cannot change the model passed to Smithy.
        const modelPath = path.join(directory, "model.json");
        const model = yield* Schema.encodeEffect(
          Schema.fromJsonString(Schema.JsonObject),
        )(prepared.smithy);

        yield* fs.writeFileString(modelPath, model);

        // Smithy supplies the service's protocol documents. The shared AWS
        // emitter compiles their schemas and invocation metadata into callable
        // contracts for Nomoss's internal client before publication can begin.
        const documents = yield* converter.convertSmithyModel({
          modelPath,
          serviceId: prepared.source.smithy.serviceId,
          documentsDirectory: path.join(directory, "openapi"),
          classpath,
        });

        const serviceName = Str.split(prepared.definition.typeName, "::")[1];

        const source: string = yield* converter.emitClientModule(
          documents,
          serviceName,
        );

        return source;
      }, Effect.scoped);

      return { renderClient };
    }),
  },
) {}
