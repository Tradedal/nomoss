import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Record,
  Schema,
} from "effect";
import { FetchHttpClient } from "effect/http";
import { ts } from "ts-morph";
import {
  awsClientCoreDirectory,
  awsCredentialClientPackages,
} from "./awsClientPackages.js";
import { awsServiceResourceGenerationLayer } from "./awsServiceResources/generationLayer.js";
import { AwsServiceOperationGeneration } from "./awsServiceResources/operationGeneration.js";
import { SpecificationFile } from "./codegen/sourceSchemas.js";
import {
  SpecificationSources,
  specificationSourcesLayer,
} from "./codegen/specificationSources.js";
import { jsonExpression } from "./codegen/typeScriptJson.js";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

/**
 * The manifest schema requires an operation selection from a pinned model
 * for each credential client package.
 */
const manifest = Schema.fromJsonString(
  Schema.Array(
    SpecificationFile.pipe(
      Schema.fieldsAssign({
        serviceId: Schema.NonEmptyString,
        serviceName: Schema.NonEmptyString,
        operations: Schema.NonEmptyArray(Schema.NonEmptyString),
      }),
    ),
  ),
);

const partitionSource = {
  specification:
    "refs/smithy/smithy-aws-endpoints/src/main/resources/software/amazon/smithy/rulesengine/aws/language/functions/partition/partitions.json",
  revision: "718298e761f6fdad3ff5fa168427681fb695e816",
  sha256: "5467daf11a42cd697ca43dd5e8b7ca509265460c55cfffa8f408d3196ecf0057",
};

/**
 * The PartitionCatalog schema retains the region membership and rule
 * outputs used by aws.partition. Smithy treats region entries as markers;
 * their descriptions have no effect on address selection.
 *
 * @see ../refs/smithy/smithy-aws-endpoints/src/main/java/software/amazon/smithy/rulesengine/aws/language/functions/partition/RegionOverride.java (fromNode)
 * @see ../refs/smithy/smithy-aws-endpoints/src/main/java/software/amazon/smithy/rulesengine/aws/language/functions/partition/PartitionOutputs.java (fromNode)
 */
const PartitionCatalog = Schema.Struct({
  partitions: Schema.NonEmptyArray(
    Schema.Struct({
      id: Schema.NonEmptyString,
      regionRegex: Schema.NonEmptyString,
      regions: Schema.Record(Schema.String, Schema.JsonObject),
      outputs: Schema.Struct({
        name: Schema.NonEmptyString,
        dnsSuffix: Schema.NonEmptyString,
        dualStackDnsSuffix: Schema.NonEmptyString,
        supportsFIPS: Schema.Boolean,
        supportsDualStack: Schema.Boolean,
        implicitGlobalRegion: Schema.NonEmptyString,
      }),
    }),
  ),
});

/**
 * The emitPartitions function publishes the values needed to resolve an
 * AWS address. Known regions must match their recorded partition before
 * the client tries a region pattern.
 */
const emitPartitions = ({ partitions }: typeof PartitionCatalog.Type) => {
  const data = Arr.map(partitions, ({ id, regionRegex, regions, outputs }) => ({
    id,
    regionRegex,
    regions: Record.keys(regions),
    outputs,
  }));

  const factory = ts.factory;
  const declaration = factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          "awsPartitions",
          undefined,
          undefined,
          jsonExpression(data),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
  ts.addSyntheticLeadingComment(
    declaration,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*
 * The awsPartitions table lets the service address resolver select the
 * DNS suffix and regional features for each partition.
 *
 * Generated from the Smithy partition catalogue at ${partitionSource.revision}.
 `,
    true,
  );

  const module = ts.createSourceFile(
    "partitions.ts",
    "",
    ts.ScriptTarget.Latest,
  );

  return ts
    .createPrinter()
    .printNode(ts.EmitHint.Unspecified, declaration, module);
};

const generationLayer = Layer.mergeAll(
  awsServiceResourceGenerationLayer,
  specificationSourcesLayer,
  typeScriptModulePublisherLayer,
).pipe(
  Layer.provide([NodeCrypto.layerDigest, FetchHttpClient.layer]),
  Layer.provideMerge(NodeServices.layer),
);

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const sources = yield* SpecificationSources;
  const generator = yield* AwsServiceOperationGeneration;
  const publisher = yield* TypeScriptModulePublisher;

  const partitionDocument = yield* sources.readJson(".", partitionSource);
  const partitions =
    yield* Schema.decodeUnknownEffect(PartitionCatalog)(partitionDocument);

  yield* publisher.publishModule(
    `${awsClientCoreDirectory}/generated/partitions.ts`,
    emitPartitions(partitions),
  );

  const clients = yield* fs
    .readFileString("tools/awsServiceResources/sources/credentials.json")
    .pipe(Effect.flatMap(Schema.decodeEffect(manifest)));

  yield* Effect.forEach(
    clients,
    (client) =>
      Effect.fromOption(
        Arr.findFirst(
          awsCredentialClientPackages,
          ({ serviceId }) => serviceId === client.serviceId,
        ),
      ).pipe(
        Effect.flatMap(({ directory }) =>
          sources.readJson(".", client).pipe(
            Effect.flatMap((smithy) =>
              generator.renderClient(
                { smithy, source: { smithy: client } },
                client.serviceName,
              ),
            ),
            Effect.flatMap((source) =>
              publisher.publishModule(`${directory}/index.ts`, source),
            ),
            Effect.tap((published) =>
              Effect.logInfo("Generated AWS credential operation contracts", {
                published,
              }),
            ),
          ),
        ),
      ),
    { discard: true },
  );
}).pipe(Effect.provide(generationLayer), NodeRuntime.runMain);
