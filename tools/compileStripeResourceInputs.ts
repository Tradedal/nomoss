import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Config,
  Duration,
  Effect,
  FileSystem,
  Layer,
  Match,
  Option,
  Order,
  Path,
  Record,
  Schema,
  String as Str,
  Tuple,
} from "effect";
import { Project } from "ts-morph";
import { stripeResourceCatalog } from "../src/providers/stripe/client/generated/resourceCatalog.js";
import { OperationCatalogs } from "./codegen/operationCatalogs.js";
import { ResourceSourceInvalid } from "./codegen/resourceErrors.js";
import { OpenApiResourceCatalog } from "./codegen/resourceSchemas.js";
import { stripeGenerationServicesLayer } from "./stripe/generator/generatorLayer.js";
import { StripeModuleEmitter } from "./stripe/generator/stripeModuleEmitter.js";
import { StripeResourceInputs } from "./stripe/generator/stripeResourceInputs.js";
import { StripeSourceLoader } from "./stripe/generator/stripeSourceLoader.js";
import { StripeOpenApiSource } from "./stripe/model.js";
import {
  type TypeScriptModuleSource,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

interface ResourceInputArtifact {
  readonly outputPath: string;
  readonly bytes: number;
}

Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const loader = yield* StripeSourceLoader;
  const catalogs = yield* OperationCatalogs;
  const inputs = yield* StripeResourceInputs;
  const emitter = yield* StripeModuleEmitter;
  const resourceType = yield* Config.String("NOMOSS_RESOURCE_TYPE");
  const outputDirectory = path.join(
    ".nomoss/stripe-entity-feedback",
    Match.value(resourceType).pipe(
      Match.when("*", () => "all"),
      Match.orElse((resourceType) =>
        path.join(...Str.split(resourceType, "::")),
      ),
    ),
  );

  yield* Effect.logInfo("Preparing isolated Stripe resource input feedback", {
    resourceType,
    outputDirectory,
  });

  const source = yield* fs
    .readFileString("tools/stripe/openapi-source.json")
    .pipe(
      Effect.flatMap(
        Schema.decodeEffect(Schema.fromJsonString(StripeOpenApiSource)),
      ),
    );
  const [sourceDuration, document] = yield* loader
    .loadOpenApiDocument("refs/stripe-openapi", source)
    .pipe(Effect.timed);
  yield* Effect.logInfo("Stripe source loaded", {
    elapsedMs: Duration.toMillis(sourceDuration),
  });

  const resources = yield* Schema.decodeUnknownEffect(OpenApiResourceCatalog)(
    Record.filter(
      stripeResourceCatalog,
      (resource) => resource.source.format === "OpenApi",
    ),
  );
  const creationOperations = yield* Effect.succeed(
    Arr.dedupe(
      Arr.flatMap(Record.values(resources), (resource) =>
        Option.fromUndefinedOr(resource.operations).pipe(
          Option.filter(
            () => resourceType === "*" || resource.typeName === resourceType,
          ),
          Option.map((operations) => operations.create),
          Option.toArray,
        ),
      ),
    ),
  ).pipe(
    Effect.filterOrFail(
      Arr.isArrayNonEmpty,
      () =>
        new ResourceSourceInvalid({
          typeName: resourceType,
          message: "The selected resource has no executable creation binding",
        }),
    ),
  );
  const catalog = yield* catalogs.buildOperationCatalog(
    {
      provider: "Stripe",
      service: "Stripe",
      name: source.specification,
      format: "OpenApi",
    },
    document,
    creationOperations,
  );

  const project = new Project({ useInMemoryFileSystem: true });
  const [generationDuration, modules] = yield* inputs
    .emitResourceInputModules(
      project,
      catalog,
      resources,
      "entities",
      Match.value(resourceType).pipe(
        Match.when("*", () => []),
        Match.orElse((resourceType) => [resourceType]),
      ),
    )
    .pipe(Effect.timed);
  yield* Effect.logInfo("Stripe resource inputs compiled", {
    elapsedMs: Duration.toMillis(generationDuration),
    modules: modules.length,
  });
  const owners = Record.fromEntries(
    Arr.flatMap(modules, (module) =>
      Arr.map(module.getVariableDeclarations(), (declaration) =>
        Tuple.make(
          declaration.getName(),
          path.relative("/", module.getFilePath()),
        ),
      ),
    ),
  );

  yield* emitter.resolveImports(modules, owners);

  const candidates: ReadonlyArray<TypeScriptModuleSource> = Arr.map(
    modules,
    (module) => ({
      outputPath: path.join(
        outputDirectory,
        path.relative("/", module.getFilePath()),
      ),
      source: module.getFullText(),
    }),
  );

  yield* Effect.forEach(candidates, (module) =>
    fs
      .makeDirectory(path.dirname(module.outputPath), { recursive: true })
      .pipe(
        Effect.andThen(fs.writeFileString(module.outputPath, module.source)),
      ),
  );

  return candidates;
}).pipe(
  Effect.timed,
  Effect.flatMap(([duration, candidates]) => {
    const artifacts: ReadonlyArray<ResourceInputArtifact> = Arr.map(
      candidates,
      (candidate) => ({
        outputPath: candidate.outputPath,
        bytes: new TextEncoder().encode(candidate.source).byteLength,
      }),
    );

    const largest = Arr.sort(
      artifacts,
      Order.mapInput(
        Order.flip(Order.Number),
        (artifact: ResourceInputArtifact) => artifact.bytes,
      ),
    );

    return Effect.logInfo("Stripe resource input feedback ready", {
      modules: artifacts.length,
      bytes: Arr.reduce(
        artifacts,
        0,
        (bytes, artifact) => bytes + artifact.bytes,
      ),
      largest: Arr.take(largest, 3),
      elapsedMs: Duration.toMillis(duration),
    });
  }),
  Effect.provide(
    stripeGenerationServicesLayer.pipe(
      Layer.provideMerge(typeScriptModulePublisherLayer),
      Layer.provideMerge([NodeServices.layer, NodeCrypto.layerDigest]),
    ),
  ),
  NodeRuntime.runMain,
);
