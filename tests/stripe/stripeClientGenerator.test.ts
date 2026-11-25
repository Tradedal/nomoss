import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, Option, Record, Schema } from "effect";
import { ResourceEntity } from "../../src/core/resource/model.js";
import type { OpenApiSpecification } from "../../tools/codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../tools/codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../../tools/codegen/resourceCatalogs.js";
import type {
  JsonSchemaResourceSource,
  OpenApiResourceHints,
} from "../../tools/codegen/resourceSchemas.js";
import { StripeModuleEmitter } from "../../tools/stripe/generator/stripeModuleEmitter.js";
import { StripeOperationBindings } from "../../tools/stripe/generator/stripeOperationBindings.js";
import { StripeResourceInputs } from "../../tools/stripe/generator/stripeResourceInputs.js";
import { StripeSchemaCompiler } from "../../tools/stripe/generator/stripeSchemaCompiler.js";
import { StripeOpenApiDocument } from "../../tools/stripe/model.js";
import {
  createThing,
  ownerSchema,
  readThing,
  recursiveResourceGeneratorDocument,
  resourceCatalogDocument,
  resourceCatalogSource,
  resourceClientSource,
  resourceGeneratorDocument,
  resourceManagedGeneratorDocument,
  resourceNestedGeneratorDocument,
  resourceNestedHints,
  resourceSchemaTestLayer,
  resourceUpdateGeneratorDocument,
  thingResponse,
} from "../support/resourceCatalogFixture.js";

const resourceClientScenarios: Readonly<
  Record<
    string,
    {
      readonly specification: OpenApiSpecification;
      readonly hints: OpenApiResourceHints;
      readonly localSource?: typeof JsonSchemaResourceSource.Type;
    }
  >
> = {
  ordinary: { specification: resourceGeneratorDocument, hints: {} },
  document: {
    specification: resourceGeneratorDocument,
    hints: {},
    localSource: {
      source: {
        provider: "Example",
        service: "Core",
        name: "application-resources.json",
        format: "JsonSchema",
      },
      resources: {
        "Example::Core::CatalogExport": {
          resource: "catalog-export",
          propsSchema: "ExampleCatalogExportPropsSchema",
          outputs: { OutputPath: "outputPath" },
          primaryIdentifier: ["/properties/OutputPath"],
          file: { pathProperty: "outputPath", pathOutput: "OutputPath" },
          replacement: {
            order: "destroyBeforeCreate",
            properties: [["outputPath"]],
          },
          input: {
            properties: {
              outputPath: { type: "string", minLength: 1 },
              thingId: { type: "string" },
              label: { type: "string" },
            },
            required: ["outputPath", "thingId", "label"],
          },
          document: {
            schema: "ExampleCatalogExportDocumentSchema",
            properties: ["thingId", "label"],
          },
          references: [
            {
              propertyPath: ["thingId"],
              resourceType: "Example::Core::Thing",
              output: "ThingId",
            },
          ],
        },
      },
    },
  },
  configured: {
    specification: {
      ...resourceGeneratorDocument,
      components: {
        schemas: {
          ...resourceGeneratorDocument.components.schemas,
          RotationKey: { type: "string" },
        },
      },
    },
    hints: {
      thing: {
        declaration: {
          property: "configuration",
          properties: {
            rotationKey: { $ref: "#/components/schemas/RotationKey" },
          },
        },
      },
    },
  },
  recursive: {
    specification: recursiveResourceGeneratorDocument,
    hints: {},
  },
  update: {
    specification: resourceUpdateGeneratorDocument,
    hints: { thing: { updateOperation: "UpdateThing" } },
  },
  managed: { specification: resourceManagedGeneratorDocument, hints: {} },
  nested: {
    specification: resourceNestedGeneratorDocument,
    hints: {
      ...resourceNestedHints,
      other_thing: {
        ...resourceNestedHints.thing,
        responseSchema: "#/components/schemas/other_thing",
      },
    },
  },
};

layer(resourceSchemaTestLayer)(
  "Stripe resource operation bindings and input compilation",
  (it) => {
    it.effect(
      "Generated clients provide native contracts, saved-identity reads, and annotated updates",
      () =>
        Effect.forEach(
          Record.toEntries(resourceClientScenarios),
          ([scenario, { specification, hints, localSource }]) =>
            Effect.gen(function* () {
              const catalogs = yield* OperationCatalogs;
              const resourceCatalogs = yield* ResourceCatalogs;
              const bindings = yield* StripeOperationBindings;
              const compiler = yield* StripeSchemaCompiler;
              const emitter = yield* StripeModuleEmitter;
              const catalog = yield* catalogs.buildOperationCatalog(
                resourceCatalogSource,
                specification,
              );
              const discovered = yield* resourceCatalogs.buildDiscoveredCatalog(
                catalog,
                hints,
              );
              const prepared = yield* bindings.prepareResourceClients(
                catalog,
                discovered,
              );
              const invocations = yield* bindings.bindClientOperations(
                catalog,
                resourceClientSource,
                prepared.resources,
              );
              const document = yield* Schema.decodeUnknownEffect(
                StripeOpenApiDocument,
              )(catalog.document);
              const executable = Arr.filter(
                Record.values(prepared.resources),
                (resource) => resource.operations !== undefined,
              );

              const localResources = yield* Option.fromUndefinedOr(
                localSource,
              ).pipe(
                Option.match({
                  onNone: () => Effect.succeed([]),
                  onSome: (source) =>
                    resourceCatalogs.prepareJsonSchemaResources(source),
                }),
              );
              const resources = Arr.appendAll(
                executable,
                Arr.map(localResources, (resource) => resource.catalog),
              );

              const code = yield* compiler.compileSchemas(
                document,
                invocations,
                resources,
              );
              const modules = yield* emitter.emitModules(
                resourceClientSource,
                catalog,
                invocations,
                code,
                catalog.metadata,
                resources,
                localResources,
                prepared.resources,
                prepared.unresolved,
              );

              expect(
                Record.fromEntries(
                  Arr.map(modules, (module) => [
                    module.getFilePath(),
                    module.getFullText(),
                  ]),
                ),
              ).toMatchSnapshot(scenario);
            }),
          { discard: true },
        ),
    );
    it.effect(
      "A resource requiring unsupported transport remains unresolved with its provider operation identified",
      () =>
        Effect.gen(function* () {
          const operations = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const bindings = yield* StripeOperationBindings;
          const catalog = yield* operations.buildOperationCatalog(
            resourceCatalogSource,
            {
              ...resourceCatalogDocument,
              paths: {
                ...resourceCatalogDocument.paths,
                "/things": {
                  post: {
                    ...createThing,
                    requestBody: {
                      required: true,
                      content: {
                        "multipart/form-data": {
                          schema: { $ref: "#/components/schemas/ThingInput" },
                        },
                      },
                    },
                  },
                },
              },
            },
          );
          const discovered =
            yield* resourceCatalogs.buildDiscoveredCatalog(catalog);
          const prepared = yield* bindings.prepareResourceClients(
            catalog,
            discovered,
          );
          expect(Record.keys(prepared.resources)).toEqual([
            "Example::Core::Thing",
          ]);
          expect(prepared.resources["Example::Core::Thing"].schemaPath).toBe(
            "#/components/schemas/thing",
          );
          expect(
            prepared.resources["Example::Core::Thing"].operations,
          ).toBeUndefined();
          expect(
            prepared.resources["Example::Core::Thing"].bindingIssues,
          ).toEqual(prepared.unresolved);
          expect(prepared.unresolved).toEqual(
            expect.arrayContaining([
              {
                operationId: "CreateThing",
                reason:
                  "StripeClient does not support the declared request encoding: multipart/form-data",
              },
            ]),
          );
        }),
    );
    it.effect(
      "A resource with a shared request body and response supports creation and saved-identity reads",
      () =>
        Effect.gen(function* () {
          const operations = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const inputs = yield* StripeResourceInputs;
          const source = yield* operations.buildOperationCatalog(
            resourceCatalogSource,
            {
              ...resourceCatalogDocument,
              paths: {
                ...resourceCatalogDocument.paths,
                "/things": {
                  post: {
                    ...createThing,
                    requestBody: {
                      $ref: "#/components/requestBodies/ThingBody",
                    },
                    responses: {
                      "201": { $ref: "#/components/responses/ThingResponse" },
                    },
                  },
                },
                "/things/{thing_id}": {
                  get: {
                    ...readThing,
                    responses: {
                      "200": { $ref: "#/components/responses/ThingResponse" },
                    },
                  },
                },
              },
              components: {
                ...resourceCatalogDocument.components,
                requestBodies: { ThingBody: createThing.requestBody },
                responses: { ThingResponse: thingResponse },
              },
            },
          );
          const { resources: catalog } =
            yield* resourceCatalogs.buildDiscoveredCatalog(source);
          const [schema] = yield* inputs.prepareResourceInputSchemas(
            source,
            catalog,
          );
          expect(catalog["Example::Core::Thing"].operations?.read).toEqual({
            operationId: "ReadThing",
            parameters: { thing_id: "ThingId" },
          });
          expect(yield* Schema.decodeEffect(schema)({ name: "Thing" })).toEqual(
            { name: "Thing" },
          );
        }),
    );

    it.effect(
      "Input compilation reads changed provider constraints through catalog references",
      () =>
        Effect.gen(function* () {
          const operations = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const inputs = yield* StripeResourceInputs;
          const source = yield* operations.buildOperationCatalog(
            resourceCatalogSource,
            {
              ...resourceCatalogDocument,
              components: {
                schemas: {
                  ...resourceCatalogDocument.components.schemas,
                  ThingInput: {
                    type: "object",
                    required: ["name"],
                    properties: { name: { type: "string", minLength: 5 } },
                  },
                },
              },
            },
          );
          const { resources: catalog } =
            yield* resourceCatalogs.buildDiscoveredCatalog(source);
          const [schema] = yield* inputs.prepareResourceInputSchemas(
            source,
            catalog,
          );
          expect(
            Option.isNone(Schema.decodeOption(schema)({ name: "four" })),
          ).toBe(true);
          expect(
            yield* Schema.decodeEffect(schema)({ name: "longer" }),
          ).toEqual({ name: "longer" });
        }),
    );

    it.effect(
      "Targets without required identity do not enable input references",
      () =>
        Effect.gen(function* () {
          const operations = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const inputs = yield* StripeResourceInputs;
          const source = yield* operations.buildOperationCatalog(
            resourceCatalogSource,
            {
              ...resourceCatalogDocument,
              components: {
                schemas: {
                  ...resourceCatalogDocument.components.schemas,
                  owner: { ...ownerSchema, required: [] },
                },
              },
            },
          );
          const { resources: catalog } =
            yield* resourceCatalogs.buildDiscoveredCatalog(source);
          const [schema] = yield* inputs.prepareResourceInputSchemas(
            source,
            catalog,
          );
          const owner = new ResourceEntity({
            key: { logicalId: "Owner" },
            resourceType: {
              provider: "stripe",
              service: "core",
              resource: "owner",
            },
          });
          expect(
            Option.isNone(
              Schema.decodeOption(schema)({ name: "Thing", owner }),
            ),
          ).toBe(true);
          expect(
            yield* Schema.decodeEffect(schema)({
              name: "Thing",
              owner: "owner_id",
            }),
          ).toEqual({ name: "Thing", owner: "owner_id" });
        }),
    );

    it.effect(
      "Input compilation rejects another provider source and stale schema locations",
      () =>
        Effect.gen(function* () {
          const operations = yield* OperationCatalogs;
          const resourceCatalogs = yield* ResourceCatalogs;
          const inputs = yield* StripeResourceInputs;
          const source = yield* operations.buildOperationCatalog(
            resourceCatalogSource,
            resourceCatalogDocument,
          );
          const { resources: catalog } =
            yield* resourceCatalogs.buildDiscoveredCatalog(source);
          const wrongSource = yield* inputs
            .prepareResourceInputSchemas(
              {
                ...source,
                source: { ...source.source, name: "another-source.json" },
              },
              catalog,
            )
            .pipe(Effect.flip);
          expect(wrongSource._tag).toBe("ResourceSourceInvalid");
          expect(wrongSource.message).toContain("provider source");
          const stale = yield* inputs
            .prepareResourceInputSchemas(
              source,
              Record.map(catalog, (resource) => ({
                ...resource,
                inputSchemaPath: "#/components/schemas/Absent",
              })),
            )
            .pipe(Effect.flip);
          expect(stale._tag).toBe("ResourceSourceInvalid");
          expect(stale.message).toContain("#/components/schemas/Absent");
        }),
    );
  },
);
