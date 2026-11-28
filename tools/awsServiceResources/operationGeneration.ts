import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  Option,
  Path,
  Record,
  Schema,
} from "effect";
import { AwsCloudControlClientGenerator } from "../awsCloudControl/AwsCloudControlClientGenerator.js";
import type { AwsServiceResourceManifest } from "./model.js";

interface AwsServiceOperationSource {
  readonly smithy: Schema.JsonObject;
  readonly source: {
    readonly smithy: Pick<
      AwsServiceResourceManifest["smithy"],
      "serviceId" | "operations"
    >;
  };
}

/**
 * The OperationAuthentication schema lets the client emitter distinguish an
 * operation that disables signing from one that inherits service authentication.
 *
 * @see ../../refs/smithy/docs/source-2.0/spec/authentication-traits.rst (auth trait)
 */
const OperationAuthentication = Schema.Struct({
  type: Schema.Literal("operation"),
  traits: Schema.optionalKey(
    Schema.Struct({
      "smithy.api#auth": Schema.optionalKey(Schema.Array(Schema.String)),
    }),
  ),
});

/**
 * The AwsServiceOperationGeneration service uses a verified Smithy document
 * to produce operation contracts for lifecycle mapping and client generation.
 * Both callers can complete their work before publishing a client module.
 */
export class AwsServiceOperationGeneration extends Context.Service<AwsServiceOperationGeneration>()(
  "nomoss/tools/awsServiceResources/operationGeneration/AwsServiceOperationGeneration",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const converter = yield* AwsCloudControlClientGenerator;

      /**
       * The operationDocuments service method returns the selected operation
       * contracts. The converter reads the document the caller verified, so a
       * later edit in the source checkout cannot change the result.
       */
      const operationDocuments = Effect.fn(
        "AwsServiceOperationGeneration.operationDocuments",
      )(function* (prepared: AwsServiceOperationSource) {
        const directory = yield* fs.makeTempDirectoryScoped({
          prefix: "nomoss-aws-service-",
        });

        const classpath = yield* converter
          .prepareSmithyConverter("tools/awsCloudControl")
          .pipe(Effect.withSpan("codegen.smithy.prepare"));

        const modelPath = path.join(directory, "model.json");

        const model = yield* Schema.encodeEffect(
          Schema.fromJsonString(Schema.JsonObject),
        )(prepared.smithy);

        yield* fs.writeFileString(modelPath, model);

        const documents = yield* converter
          .convertSmithyModel({
            modelPath,
            serviceId: prepared.source.smithy.serviceId,
            documentsDirectory: path.join(directory, "openapi"),
            classpath,
            operations: prepared.source.smithy.operations,
          })
          .pipe(Effect.withSpan("codegen.smithy.convert"));

        return documents;
      }, Effect.scoped);

      /**
       * The renderClient service method returns the TypeScript client for
       * the selected operations. An operation with an empty Smithy auth list
       * can execute without a signing identity, including during sign-in.
       *
       * @see ../../refs/smithy/docs/source-2.0/spec/authentication-traits.rst (auth trait)
       */
      const renderClient = Effect.fn(
        "AwsServiceOperationGeneration.renderClient",
      )(function* (prepared: AwsServiceOperationSource, serviceName: string) {
        const documents = yield* operationDocuments(prepared);

        const shapes = yield* Schema.decodeUnknownEffect(Schema.JsonObject)(
          prepared.smithy.shapes,
        );
        const namespace = prepared.source.smithy.serviceId.split("#")[0];
        const unsignedOperations = Arr.filter(
          prepared.source.smithy.operations ?? [],
          (operation) =>
            Record.get(shapes, `${namespace}#${operation}`).pipe(
              Option.flatMap(
                Schema.decodeUnknownOption(OperationAuthentication),
              ),
              Option.exists(
                (shape) => shape.traits?.["smithy.api#auth"]?.length === 0,
              ),
            ),
        );

        const source: string = yield* converter
          .emitClientModule(documents, serviceName, unsignedOperations)
          .pipe(Effect.withSpan("codegen.typescript.emitClient"));

        return source;
      });

      return { operationDocuments, renderClient };
    }),
  },
) {}
