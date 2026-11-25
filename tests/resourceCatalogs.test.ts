import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  Option,
  Record,
  Schema,
  String as Str,
} from "effect";
import { OpenApiResourceSchemas } from "../tools/codegen/openApiResourceSchemas.js";
import { OperationCatalogs } from "../tools/codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../tools/codegen/resourceCatalogs.js";
import {
  OpenApiResourceHints,
  type OpenApiResourceSelection,
} from "../tools/codegen/resourceSchemas.js";
import {
  createThing,
  ownerResponseSchema,
  ownerSchema,
  readThing,
  removeThing,
  resourceCatalogDocument,
  resourceCatalogSource,
  resourceCatalogTestLayer,
  resourceLifecycleDocument,
  thingSchema,
  thingSelection,
  updateThing,
} from "./support/resourceCatalogFixture.js";

layer(resourceCatalogTestLayer)("ResourceCatalogs", (it) => {
  it.effect(
    "Updates and removal use the saved identity alias and retain reviewed replacement properties",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const resourceSchemas = yield* OpenApiResourceSchemas;

        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceLifecycleDocument,
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              outputAliases: { id: "SavedId" },
              createOnlyProperties: ["/properties/name"],
            },
          },
        );
        const thing = prepared.resources["Example::Core::Thing"];
        expect(thing.operations).toEqual({
          create: "CreateThing",
          read: {
            operationId: "ReadThing",
            parameters: { thing_id: "SavedId" },
          },
          update: {
            operationId: "UpdateThing",
            parameters: { thing_id: "SavedId" },
          },
          remove: {
            operationId: "RemoveThing",
            parameters: { thing_id: "SavedId" },
          },
        });
        expect(thing.createOnlyProperties).toEqual(["/properties/name"]);
        expect(prepared.unresolved).toEqual([]);
        const selectedOperations = yield* Option.fromUndefinedOr(
          thing.operations,
        ).pipe(Effect.fromOption);
        const graph = yield* resourceSchemas.buildGraph(source);
        const selection: OpenApiResourceSelection = {
          ...thingSelection,
          outputs: { SavedId: "id" },
          primaryIdentifier: ["/properties/SavedId"],
          operations: selectedOperations,
        };
        const selected = yield* resourceCatalogs.buildOpenApiCatalog(
          source,
          thing.typeName,
          selection,
          graph,
        );
        expect(selected.operations).toEqual(thing.operations);
        const rejected = yield* resourceCatalogs
          .buildOpenApiCatalog(
            source,
            thing.typeName,
            {
              ...selection,
              operations: {
                ...selectedOperations,
                update: {
                  operationId: "UpdateThing",
                  parameters: { thing_id: "WrongOutput" },
                },
              },
            },
            graph,
          )
          .pipe(Effect.flip);
        expect(rejected._tag).toBe("ResourceSourceInvalid");
      }),
  );

  it.effect(
    "A reviewed operation hint selects one update when several methods share the resource path",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceLifecycleDocument,
            paths: {
              ...resourceLifecycleDocument.paths,
              "/things/{thing_id}": {
                get: readThing,
                patch: updateThing,
                post: { ...updateThing, operationId: "OtherUpdateThing" },
                delete: removeThing,
              },
            },
          },
        );
        const ambiguous = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { createOnlyProperties: [] },
          },
        );
        const thing = ambiguous.resources["Example::Core::Thing"];
        expect(thing.operations?.update).toBeUndefined();
        expect(thing.operations?.remove?.operationId).toBe("RemoveThing");
        expect(thing.bindingIssues[0].reason).toContain(
          "Multiple update operations",
        );
        const selected = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { updateOperation: "UpdateThing", createOnlyProperties: [] },
          },
        );
        expect(
          selected.resources["Example::Core::Thing"].operations?.update
            ?.operationId,
        ).toBe("UpdateThing");
        expect(selected.unresolved).toEqual([]);
      }),
  );

  it.effect(
    "Explicit mutation hints bind different endpoints while automatic discovery keeps the read endpoint",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceLifecycleDocument,
            paths: {
              "/things": { post: createThing },
              "/things/{thing_id}": { get: readThing },
              "/things/{thing_id}/update": { patch: updateThing },
              "/things/{thing_id}/remove": { delete: removeThing },
            },
          },
        );
        const automatic = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { createOnlyProperties: [] },
          },
        );
        expect(automatic.resources["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );

        const selected = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              updateOperation: "UpdateThing",
              removeOperation: "RemoveThing",
              outputAliases: { id: "SavedId" },
              createOnlyProperties: [],
            },
          },
        );
        expect(selected.resources["Example::Core::Thing"].operations).toEqual({
          create: "CreateThing",
          read: {
            operationId: "ReadThing",
            parameters: { thing_id: "SavedId" },
          },
          update: {
            operationId: "UpdateThing",
            parameters: { thing_id: "SavedId" },
          },
          remove: {
            operationId: "RemoveThing",
            parameters: { thing_id: "SavedId" },
          },
        });
        expect(selected.unresolved).toEqual([]);
      }),
  );

  it.effect(
    "Explicit mutation hints cannot authorize incompatible identity or removal bodies",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceLifecycleDocument,
            paths: {
              ...resourceLifecycleDocument.paths,
              "/things/{thing_id}": {
                get: readThing,
                patch: {
                  ...updateThing,
                  parameters: [
                    {
                      name: "thing_id",
                      in: "path",
                      required: true,
                      schema: { type: "integer" },
                    },
                  ],
                },
                delete: {
                  ...removeThing,
                  requestBody: createThing.requestBody,
                },
              },
            },
          },
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              updateOperation: "UpdateThing",
              removeOperation: "RemoveThing",
              createOnlyProperties: [],
            },
          },
        );
        const thing = prepared.resources["Example::Core::Thing"];
        expect(thing.operations).toEqual(thingSelection.operations);
        expect(
          Arr.map(thing.bindingIssues, (issue) => issue.operationId),
        ).toEqual(["UpdateThing", "RemoveThing"]);
        expect(
          Arr.every(thing.bindingIssues, (issue) =>
            Str.includes("Saved output bindings do not satisfy")(issue.reason),
          ),
        ).toBe(true);
      }),
  );

  it.effect(
    "An update must return the selected resource schema before its operation enters the catalog",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceLifecycleDocument,
            paths: {
              ...resourceLifecycleDocument.paths,
              "/things/{thing_id}": {
                get: readThing,
                patch: {
                  ...updateThing,
                  responses: {
                    "200": {
                      content: {
                        "application/json": {
                          schema: { $ref: "#/components/schemas/owner" },
                        },
                      },
                    },
                  },
                },
                delete: removeThing,
              },
            },
          },
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { createOnlyProperties: [] },
          },
        );
        const thing = prepared.resources["Example::Core::Thing"];
        expect(thing.operations).toEqual({
          ...thingSelection.operations,
          remove: {
            operationId: "RemoveThing",
            parameters: { thing_id: "ThingId" },
          },
        });
        expect(thing.bindingIssues[0].operationId).toBe("UpdateThing");
        expect(thing.bindingIssues[0].reason).toContain(
          "#/components/schemas/thing",
        );
      }),
  );

  it.effect(
    "Missing lifecycle operations and unspecified replacement rules remain explicit",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceCatalogDocument,
        );
        const hints = yield* Schema.decodeUnknownEffect(OpenApiResourceHints)({
          thing: {},
        });
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          hints,
        );
        const thing = prepared.resources["Example::Core::Thing"];
        expect(thing.operations).toEqual(thingSelection.operations);
        expect(thing.createOnlyProperties).toBeUndefined();
        expect(thing.bindingIssues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              reason: expect.stringContaining("No update operation"),
            }),
            expect.objectContaining({
              reason: expect.stringContaining("No remove operation"),
            }),
            expect.objectContaining({
              reason: expect.stringContaining("Replacement properties require"),
            }),
          ]),
        );
      }),
  );

  it.effect(
    "Invalid operation hints and absent replacement properties do not become usable metadata",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceLifecycleDocument,
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              updateOperation: "AbsentOperation",
              createOnlyProperties: ["/properties/absent"],
            },
          },
        );
        const thing = prepared.resources["Example::Core::Thing"];
        expect(thing.operations?.update).toBeUndefined();
        expect(thing.operations?.remove?.operationId).toBe("RemoveThing");
        expect(thing.createOnlyProperties).toBeUndefined();
        expect(
          Arr.map(thing.bindingIssues, (issue) => issue.operationId),
        ).toEqual(["AbsentOperation", "CreateThing"]);
        expect(thing.bindingIssues[1].reason).toContain("/properties/absent");
      }),
  );

  it.effect(
    "Creation models remain cataloged when a required read parameter has no saved value or a read is absent",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              "/parents/{parent_id}/things": {
                post: {
                  ...createThing,
                  parameters: [
                    {
                      name: "parent_id",
                      in: "path",
                      required: true,
                      schema: { type: "string" },
                    },
                  ],
                },
              },
              "/parents/{parent_id}/things/{thing_id}": {
                get: {
                  ...readThing,
                  parameters: [
                    {
                      name: "parent_id",
                      in: "path",
                      required: true,
                      schema: { type: "string" },
                    },
                    {
                      name: "thing_id",
                      in: "path",
                      required: true,
                      schema: { type: "string" },
                    },
                    {
                      name: "region",
                      in: "query",
                      required: true,
                      schema: { type: "string" },
                    },
                  ],
                },
              },
              "/owners": {
                post: {
                  operationId: "CreateOwner",
                  responses: {
                    "201": {
                      content: {
                        "application/json": {
                          schema: { $ref: "#/components/schemas/owner" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              relationships: {
                "/parent_id": ["#/components/schemas/owner"],
              },
            },
          },
        );
        const thing = prepared.resources["Example::Core::Thing"];
        const owner = prepared.resources["Example::Core::Owner"];
        expect(Record.keys(prepared.resources)).toEqual([
          "Example::Core::Thing",
          "Example::Core::Owner",
        ]);
        expect(thing.creations).toEqual([
          {
            operationId: "CreateThing",
            inputSchemaPath:
              "#/paths/~1parents~1%7Bparent_id%7D~1things/post/requestBody/content/application~1json/schema",
            responseSchemaPath: "#/components/schemas/thing",
          },
        ]);
        expect(owner.creations).toEqual([
          {
            operationId: "CreateOwner",
            inputSchemaPath: null,
            responseSchemaPath: "#/components/schemas/owner",
          },
        ]);
        expect(thing.operations).toBeUndefined();
        expect(owner.operations).toBeUndefined();
        expect(
          Arr.map(prepared.unresolved, (issue) => issue.operationId),
        ).toEqual(["CreateThing", "CreateOwner"]);
        expect(thing.bindingIssues).toHaveLength(1);
        expect(owner.bindingIssues).toHaveLength(1);
      }),
  );

  it.effect(
    "Referenced identity schemas support both saved reads and relationship targets",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                StringIdentity: { type: "string", maxLength: 12 },
                thing: {
                  "x-resourceId": "thing",
                  type: "object",
                  required: ["id"],
                  properties: {
                    id: { $ref: "#/components/schemas/StringIdentity" },
                    owner: ownerResponseSchema,
                  },
                },
                owner: {
                  type: "object",
                  required: ["id"],
                  properties: {
                    id: { $ref: "#/components/schemas/StringIdentity" },
                  },
                },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(catalog["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );
        expect(
          catalog["Example::Core::Thing"].relationships[0].targets[0].resource,
        ).toBe("owner");
        expect(catalog["Example::Core::Thing"].outputs.ThingId.schema).toEqual({
          $ref: "#/components/schemas/StringIdentity",
        });
      }),
  );
  it.effect(
    "Multiple identity definitions retain the resource with an unresolved binding",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                thing: {
                  "x-resourceId": "thing",
                  allOf: [ownerSchema, ownerSchema],
                },
              },
            },
          },
        );
        const prepared = yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(
          prepared.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          prepared.resources["Example::Core::Thing"].bindingIssues[0].reason,
        ).toContain("multiple identity field definitions");
      }),
  );

  it.effect(
    "Conflicting generated schema names fail before a resource can replace another catalog entry",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const response = {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/other" },
            },
          },
        };
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/others": {
                post: {
                  ...createThing,
                  operationId: "CreateOther",
                  responses: { "201": response },
                },
              },
              "/others/{thing_id}": {
                get: {
                  ...readThing,
                  operationId: "ReadOther",
                  responses: { "200": response },
                },
              },
            },
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                other: { ...ownerSchema, "x-resourceId": "other" },
              },
            },
          },
        );
        const failure = yield* resourceCatalogs
          .buildDiscoveredCatalog(source, {
            other: { propsSchema: "ExampleThingPropsSchema" },
          })
          .pipe(Effect.flip);
        expect(failure._tag).toBe("ResourceSourceInvalid");
        expect(failure.message).toContain("distinct type names");
      }),
  );
  it.effect(
    "Read parameter schemas resolve references below schema alternatives",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/things/{thing_id}": {
                get: {
                  ...readThing,
                  parameters: [
                    {
                      name: "thing_id",
                      in: "path",
                      required: true,
                      schema: {
                        $ref: "#/components/schemas/ParameterSchemas/allOf/0",
                      },
                    },
                  ],
                },
              },
            },
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                ParameterSchemas: { allOf: [{ type: "string" }] },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(catalog["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );
      }),
  );

  it.effect(
    "A path binding cannot satisfy a required header with the same parameter name",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceSchemas = yield* OpenApiResourceSchemas;
        const resourceCatalogs = yield* ResourceCatalogs;

        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/things/{thing_id}": {
                get: {
                  ...readThing,
                  parameters: [
                    {
                      name: "thing_id",
                      in: "path",
                      required: true,
                      schema: { type: "string" },
                    },
                    {
                      name: "thing_id",
                      in: "header",
                      required: true,
                      schema: { type: "string" },
                    },
                  ],
                },
              },
            },
          },
        );
        const graph = yield* resourceSchemas.buildGraph(source);
        const failure = yield* resourceCatalogs
          .buildOpenApiCatalog(
            source,
            "Example::Core::Thing",
            thingSelection,
            graph,
          )
          .pipe(Effect.flip);
        expect(failure._tag).toBe("ResourceSourceInvalid");
        expect(failure.message).toContain("ReadThing");
      }),
  );
  it.effect(
    "Composed response schemas preserve inherited identity and its source location",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                ThingFields: {
                  type: "object",
                  properties: thingSchema.properties,
                },
                thing: {
                  "x-resourceId": "thing",
                  allOf: [
                    { $ref: "#/components/schemas/ThingFields" },
                    { required: ["id"] },
                  ],
                },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(Record.keys(catalog)).toEqual(["Example::Core::Thing"]);
        expect(catalog["Example::Core::Thing"].outputs.ThingId.schemaPath).toBe(
          "#/components/schemas/ThingFields/properties/id",
        );
        expect(catalog["Example::Core::Thing"].outputs.ThingId.required).toBe(
          true,
        );
      }),
  );

  it.effect(
    "Named response aliases resolve to one resource instead of creating additional resource types",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const response = {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ThingAlias" },
            },
          },
        };
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              "/things": {
                post: { ...createThing, responses: { "201": response } },
              },
              "/things/{thing_id}": {
                get: { ...readThing, responses: { "200": response } },
              },
            },
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                ThingAlias: { $ref: "#/components/schemas/thing" },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(Record.keys(catalog)).toEqual(["Example::Core::Thing"]);
        expect(catalog["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );
      }),
  );

  it.effect(
    "An alternative without identity prevents identity from being treated as required",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                thing: {
                  "x-resourceId": "thing",
                  anyOf: [
                    thingSchema,
                    {
                      type: "object",
                      properties: { label: { type: "string" } },
                    },
                  ],
                },
              },
            },
          },
        );
        const preparation =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(Record.keys(preparation.resources)).toEqual([
          "Example::Core::Thing",
        ]);
        expect(
          preparation.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          preparation.resources["Example::Core::Thing"].primaryIdentifier,
        ).toEqual([]);
        expect(preparation.unresolved[0].operationId).toBe("CreateThing");
      }),
  );
  it.effect(
    "Relationship discovery preserves alternative targets and reports targets without identity",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                owner: {
                  ...ownerSchema,
                  "x-expansionResources": {
                    oneOf: [
                      { $ref: "#/components/schemas/deleted_owner" },
                      { $ref: "#/components/schemas/anonymous_owner" },
                    ],
                  },
                },
                deleted_owner: ownerSchema,
                anonymous_owner: {
                  type: "object",
                  properties: { label: { type: "string" } },
                },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        const relationship = catalog["Example::Core::Thing"].relationships[0];

        expect(
          Arr.map(relationship.targets, (target) => target.resource),
        ).toEqual(["owner", "deleted_owner"]);
        expect(relationship.unresolved).toEqual([
          "#/components/schemas/anonymous_owner",
        ]);
      }),
  );

  it.effect(
    "Nested response alternatives resolve to the same resource binding",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/things/{thing_id}": {
                get: {
                  ...readThing,
                  responses: {
                    "200": {
                      content: {
                        "application/json": {
                          schema: {
                            anyOf: [
                              {
                                oneOf: [{ $ref: "#/components/schemas/thing" }],
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        );
        const { resources: catalog } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(catalog["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );
      }),
  );

  it.effect(
    "Optional provider identity retains the creation model with an unresolved read binding",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                thing: { ...thingSchema, required: [] },
              },
            },
          },
        );
        const preparation =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(Record.keys(preparation.resources)).toEqual([
          "Example::Core::Thing",
        ]);
        expect(preparation.resources["Example::Core::Thing"].schemaPath).toBe(
          "#/components/schemas/thing",
        );
        expect(
          preparation.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(preparation.unresolved).toEqual([
          {
            operationId: "CreateThing",
            reason:
              "Creation is cataloged; a compatible saved-identity read binding is unresolved",
          },
        ]);
      }),
  );

  it.effect(
    "A hint resolves competing operation pairs and an unmatched hint fails preparation",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/other-things": {
                post: { ...createThing, operationId: "CreateOtherThing" },
              },
              "/other-things/{thing_id}": {
                get: { ...readThing, operationId: "ReadOtherThing" },
              },
            },
          },
        );
        const ambiguous =
          yield* resourceCatalogs.buildDiscoveredCatalog(source);
        expect(
          ambiguous.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          Arr.map(
            ambiguous.resources["Example::Core::Thing"].creations,
            (creation) => creation.operationId,
          ),
        ).toEqual(["CreateThing", "CreateOtherThing"]);
        expect(
          ambiguous.resources["Example::Core::Thing"].bindingIssues,
        ).toHaveLength(2);
        const { resources: resolved } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source, {
            thing: { createOperation: "CreateThing" },
          });
        expect(resolved["Example::Core::Thing"].operations).toEqual(
          thingSelection.operations,
        );
        const unmatched = yield* resourceCatalogs
          .buildDiscoveredCatalog(source, {
            thing: { createOperation: "AbsentOperation" },
          })
          .pipe(Effect.flip);
        expect(unmatched._tag).toBe("ResourceSourceInvalid");
        expect(unmatched.message).toContain("no discovered candidate");

        const responseMismatch = yield* resourceCatalogs
          .buildDiscoveredCatalog(source, {
            thing: {
              createOperation: "CreateThing",
              responseSchema: "#/components/schemas/owner",
            },
          })
          .pipe(Effect.flip);
        expect(responseMismatch._tag).toBe("ResourceSourceInvalid");
        expect(responseMismatch.message).toContain("no discovered candidate");
      }),
  );

  it.effect(
    "Identity aliases remain consistent with read bindings and cannot retain previous identity",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceCatalogDocument,
        );
        const { resources: renamed } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source, {
            thing: { outputAliases: { id: "SavedId" } },
          });
        expect(renamed["Example::Core::Thing"].primaryIdentifier).toEqual([
          "/properties/SavedId",
        ]);
        expect(
          renamed["Example::Core::Thing"].operations?.read.parameters,
        ).toEqual({ thing_id: "SavedId" });
        const retained = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { retainOnRead: ["id"] },
          },
        );
        expect(
          retained.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          retained.resources["Example::Core::Thing"].bindingIssues[0].reason,
        ).toContain("cannot retain");
      }),
  );

  it.effect(
    "Invalid output policies remain explicit without removing their resource from the catalog",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;
        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceCatalogDocument,
        );
        const optional = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: { secretOutputs: ["secret"] },
          },
        );
        expect(
          optional.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          optional.resources["Example::Core::Thing"].bindingIssues[0].reason,
        ).toContain("absence policy");
        const { resources: retained } =
          yield* resourceCatalogs.buildDiscoveredCatalog(source, {
            thing: {
              secretOutputs: ["secret"],
              retainOnRead: ["secret"],
              outputAliases: { secret: "SigningSecret" },
            },
          });
        expect(
          retained["Example::Core::Thing"].outputs.SigningSecret.retainOnRead,
        ).toBe(true);
        expect(retained["Example::Core::Thing"].stateSecretOutputKeys).toEqual([
          "SigningSecret",
        ]);
        const conflicting = yield* resourceCatalogs.buildDiscoveredCatalog(
          source,
          {
            thing: {
              retainOnRead: ["secret"],
              outputAliases: { secret: "ThingId" },
            },
          },
        );
        expect(
          conflicting.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          conflicting.resources["Example::Core::Thing"].bindingIssues[0].reason,
        ).toContain("distinct name");
        const unused = yield* resourceCatalogs.buildDiscoveredCatalog(source, {
          thing: { outputAliases: { missing: "Unused" } },
        });
        expect(
          unused.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          unused.resources["Example::Core::Thing"].bindingIssues[0].reason,
        ).toContain("missing");
      }),
  );

  it.effect(
    "Read bindings reject missing parameters and incompatible identity types",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceSchemas = yield* OpenApiResourceSchemas;
        const resourceCatalogs = yield* ResourceCatalogs;

        const source = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          resourceCatalogDocument,
        );
        const graph = yield* resourceSchemas.buildGraph(source);
        const missing = yield* resourceCatalogs
          .buildOpenApiCatalog(
            source,
            "Example::Core::Thing",
            {
              ...thingSelection,
              operations: {
                create: "CreateThing",
                read: { operationId: "ReadThing", parameters: {} },
              },
            },
            graph,
          )
          .pipe(Effect.flip);
        expect(missing._tag).toBe("ResourceSourceInvalid");
        expect(missing.message).toContain("ReadThing");
        const incompatibleSource = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            paths: {
              ...resourceCatalogDocument.paths,
              "/things/{thing_id}": {
                get: {
                  ...readThing,
                  parameters: [
                    {
                      name: "thing_id",
                      in: "path",
                      required: true,
                      schema: { type: "integer" },
                    },
                  ],
                },
              },
            },
          },
        );
        const incompatible =
          yield* resourceCatalogs.buildDiscoveredCatalog(incompatibleSource);
        expect(
          incompatible.resources["Example::Core::Thing"].operations,
        ).toBeUndefined();
        expect(
          incompatible.resources["Example::Core::Thing"].bindingIssues[0]
            .reason,
        ).toContain("thing_id");
      }),
  );

  it.effect(
    "Catalog generation rejects a reference to a missing provider schema",
    () =>
      Effect.gen(function* () {
        const operations = yield* OperationCatalogs;
        const resourceCatalogs = yield* ResourceCatalogs;

        const brokenSource = yield* operations.buildOperationCatalog(
          resourceCatalogSource,
          {
            ...resourceCatalogDocument,
            components: {
              schemas: {
                ...resourceCatalogDocument.components.schemas,
                Broken: { $ref: "#/components/schemas/Absent" },
              },
            },
          },
        );
        const broken = yield* resourceCatalogs
          .buildDiscoveredCatalog(brokenSource)
          .pipe(Effect.flip);
        expect(broken._tag).toBe("ResourceSourceInvalid");
        expect(broken.message).toContain("#/components/schemas/Absent");
      }),
  );
});
