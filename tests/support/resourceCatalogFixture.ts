import { NodeServices } from "@effect/platform-node";
import { Layer, type Schema } from "effect";
import { resourceGraphBuilderLayer } from "../../src/core/resource/resourceGraphBuilder.js";
import { resourceOutputResolverLayer } from "../../src/core/resource/resourceOutputResolver.js";
import type {
  OpenApiSpecification,
  OperationSource,
} from "../../tools/codegen/catalogSchemas.js";
import { operationCatalogsLayer } from "../../tools/codegen/operationCatalogs.js";
import { resourceCatalogServicesLayer } from "../../tools/codegen/resourceCatalogLayers.js";
import type {
  OpenApiResourceHints,
  OpenApiResourceSelection,
} from "../../tools/codegen/resourceSchemas.js";
import { schemaCompilationLayer } from "../../tools/codegen/schemaCompilation.js";
import { stripeModuleEmissionLayer } from "../../tools/stripe/generator/generatorLayer.js";
import { stripeOperationBindingsLayer } from "../../tools/stripe/generator/stripeOperationBindings.js";
import { stripeSchemaCompilerLayer } from "../../tools/stripe/generator/stripeSchemaCompiler.js";
import type { StripeOpenApiSource } from "../../tools/stripe/model.js";

export const resourceCatalogTestLayer = resourceCatalogServicesLayer.pipe(
  Layer.provideMerge(operationCatalogsLayer),
);

export const resourceSchemaTestLayer = Layer.mergeAll(
  stripeOperationBindingsLayer,
  stripeModuleEmissionLayer,
  stripeSchemaCompilerLayer,
).pipe(
  Layer.provideMerge(resourceCatalogTestLayer),
  Layer.provide(schemaCompilationLayer),
  Layer.provideMerge(NodeServices.layer),
);

export const resourceInputResolutionTestLayer = Layer.mergeAll(
  resourceSchemaTestLayer,
  resourceGraphBuilderLayer,
  resourceOutputResolverLayer,
);

export const resourceCatalogSource: OperationSource = {
  provider: "Example",
  service: "Core",
  name: "resource-catalog.json",
  format: "OpenApi",
};

export const resourceClientSource: typeof StripeOpenApiSource.Type = {
  repository: "https://example.invalid/openapi",
  revision: "fixture",
  sha256: "fixture",
  specification: resourceCatalogSource.name,
  clientNames: {},
  modelModules: {},
  defaultModelModule: "common",
  resourceNamespace: "Core",
  resourceHints: {},
  corrections: {},
};

export const ownerSchema: Schema.JsonObject = {
  type: "object",
  required: ["id"],
  properties: { id: { type: "string", maxLength: 12 } },
};

export const ownerResponseSchema: Schema.JsonObject = {
  anyOf: [{ type: "string" }, { $ref: "#/components/schemas/owner" }],
  "x-expansionResources": {
    oneOf: [{ $ref: "#/components/schemas/owner" }],
  },
};

export const thingInputSchema: Schema.JsonObject = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", minLength: 1 },
    owner: { type: "string", maxLength: 12 },
    mode: { type: "string", enum: ["fixed"] },
    unmatched: { type: "string" },
    settings: {
      type: "object",
      required: ["owner"],
      properties: { owner: { type: "string", maxLength: 12 } },
    },
    members: {
      type: "array",
      items: {
        type: "object",
        required: ["owner"],
        properties: { owner: { type: "string", maxLength: 12 } },
      },
    },
  },
  additionalProperties: false,
};

export const thingSchema: Schema.JsonObject = {
  "x-resourceId": "thing",
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string", maxLength: 12 },
    secret: { type: "string" },
    owner: ownerResponseSchema,
    mode: ownerResponseSchema,
    settings: { type: "object", properties: { owner: ownerResponseSchema } },
    members: {
      type: "array",
      items: { type: "object", properties: { owner: ownerResponseSchema } },
    },
  },
};

export const thingResponse: Schema.JsonObject = {
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/thing" } },
  },
};

export const operationFailureResponse: Schema.JsonObject = {
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            properties: { message: { type: "string" } },
          },
        },
      },
    },
  },
};

export const createThing: Schema.JsonObject = {
  operationId: "CreateThing",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ThingInput" },
      },
    },
  },
  responses: { "201": thingResponse, default: operationFailureResponse },
};

export const readThing: Schema.JsonObject = {
  operationId: "ReadThing",
  parameters: [
    {
      name: "thing_id",
      in: "path",
      required: true,
      schema: { type: "string" },
    },
  ],
  responses: { "200": thingResponse, default: operationFailureResponse },
};

export const resourceCatalogDocument: OpenApiSpecification = {
  openapi: "3.0.0",
  info: { version: "1" },
  servers: [],
  paths: {
    "/things": { post: createThing },
    "/things/{thing_id}": { get: readThing },
  },
  components: {
    schemas: {
      ThingInput: thingInputSchema,
      thing: thingSchema,
      owner: ownerSchema,
    },
  },
};

export const resourceGeneratorDocument: OpenApiSpecification = {
  ...resourceCatalogDocument,
  servers: [{ url: "https://example.invalid" }],
};

const ownerResponse: Schema.JsonObject = {
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/owner" } },
  },
};

export const resourceRelationshipGeneratorDocument: OpenApiSpecification = {
  ...resourceGeneratorDocument,
  paths: {
    ...resourceGeneratorDocument.paths,
    "/owners": {
      post: {
        ...createThing,
        operationId: "CreateOwner",
        responses: { "201": ownerResponse, default: operationFailureResponse },
      },
    },
    "/owners/{thing_id}": {
      get: {
        ...readThing,
        operationId: "ReadOwner",
        responses: { "200": ownerResponse, default: operationFailureResponse },
      },
    },
  },
};

export const updateThing: Schema.JsonObject = {
  ...createThing,
  operationId: "UpdateThing",
  parameters: readThing.parameters,
  responses: { "200": thingResponse },
};

export const removeThing: Schema.JsonObject = {
  operationId: "RemoveThing",
  parameters: readThing.parameters,
  responses: { "204": { description: "The resource was removed." } },
};

export const resourceLifecycleDocument: OpenApiSpecification = {
  ...resourceCatalogDocument,
  paths: {
    ...resourceCatalogDocument.paths,
    "/things/{thing_id}": {
      get: readThing,
      patch: updateThing,
      delete: removeThing,
    },
  },
};

export const resourceUpdateGeneratorDocument: OpenApiSpecification = {
  ...resourceGeneratorDocument,
  paths: {
    ...resourceGeneratorDocument.paths,
    "/things/{thing_id}/update": {
      post: {
        ...updateThing,
        responses: { "200": thingResponse, default: operationFailureResponse },
      },
    },
  },
};

export const resourceManagedGeneratorDocument: OpenApiSpecification = {
  ...resourceGeneratorDocument,
  paths: {
    ...resourceGeneratorDocument.paths,
    "/things/{thing_id}": {
      get: readThing,
      delete: {
        ...removeThing,
        responses: { "200": thingResponse, default: operationFailureResponse },
      },
    },
  },
};

export const recursiveResourceGeneratorDocument: OpenApiSpecification = {
  ...resourceGeneratorDocument,
  components: {
    schemas: {
      ...resourceGeneratorDocument.components.schemas,
      owner: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string", maxLength: 12 },
          parent: { $ref: "#/components/schemas/thing" },
          children: {
            type: "array",
            items: { $ref: "#/components/schemas/owner" },
          },
        },
      },
    },
  },
};

const parentParameters = [
  {
    name: "parent_id",
    in: "path",
    required: true,
    schema: { type: "string", maxLength: 12 },
  },
];
const nestedParameters = [
  ...parentParameters,
  { name: "thing_id", in: "path", required: true, schema: { type: "string" } },
];
const nestedResponse = {
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/thing_result" },
    },
  },
};
const dependentResponse = {
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/dependent" } },
  },
};
const removalResponse = {
  "200": {
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["deleted"],
          properties: { deleted: { type: "boolean" } },
        },
      },
    },
  },
  default: operationFailureResponse,
};

export const resourceNestedGeneratorDocument: OpenApiSpecification = {
  ...resourceRelationshipGeneratorDocument,
  paths: {
    "/owners": resourceRelationshipGeneratorDocument.paths["/owners"],
    "/owners/{thing_id}": {
      ...resourceRelationshipGeneratorDocument.paths["/owners/{thing_id}"],
      delete: {
        operationId: "RemoveOwner",
        parameters: readThing.parameters,
        responses: removalResponse,
      },
    },
    "/owners/{parent_id}/things": {
      post: {
        ...createThing,
        parameters: parentParameters,
        responses: { "201": nestedResponse, default: operationFailureResponse },
      },
    },
    "/owners/{parent_id}/things/{thing_id}": {
      get: {
        ...readThing,
        parameters: nestedParameters,
        responses: { "200": nestedResponse, default: operationFailureResponse },
      },
      delete: {
        operationId: "RemoveThing",
        parameters: nestedParameters,
        responses: removalResponse,
      },
    },
    "/dependents": {
      post: {
        operationId: "CreateDependent",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["destination"],
                additionalProperties: false,
                properties: { destination: { type: "string", maxLength: 12 } },
              },
            },
          },
        },
        responses: {
          "201": dependentResponse,
          default: operationFailureResponse,
        },
      },
    },
    "/dependents/{dependent_id}": {
      get: {
        operationId: "ReadDependent",
        parameters: [
          {
            name: "dependent_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": dependentResponse,
          default: operationFailureResponse,
        },
      },
      delete: {
        operationId: "RemoveDependent",
        parameters: [
          {
            name: "dependent_id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: removalResponse,
      },
    },
  },
  components: {
    schemas: {
      ...resourceRelationshipGeneratorDocument.components.schemas,
      thing: {
        type: "object",
        required: ["id", "object"],
        properties: {
          id: { type: "string", maxLength: 12 },
          object: { type: "string", enum: ["thing"] },
        },
      },
      other_thing: {
        type: "object",
        required: ["id", "object"],
        properties: {
          id: { type: "string" },
          object: { type: "string", enum: ["other"] },
        },
      },
      thing_result: {
        "x-resourceId": "thing_result",
        anyOf: [
          { $ref: "#/components/schemas/thing" },
          { $ref: "#/components/schemas/other_thing" },
        ],
      },
      dependent: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
          source: { type: "string" },
        },
      },
    },
  },
};

export const resourceNestedHints: OpenApiResourceHints = {
  owner: { createOnlyProperties: [] },
  thing: {
    responseSchema: "#/components/schemas/thing",
    createOperation: "CreateThing",
    readOperation: "ReadThing",
    relationships: { "/parent_id": ["#/components/schemas/owner"] },
    createOnlyProperties: [],
  },
  dependent: {
    relationships: { "/destination": ["#/components/schemas/thing"] },
    createOnlyProperties: [],
  },
};

export const thingSelection: OpenApiResourceSelection = {
  resource: "thing",
  propsSchema: "ExampleThingPropsSchema",
  schema: "#/components/schemas/thing",
  outputs: { ThingId: "id" },
  primaryIdentifier: ["/properties/ThingId"],
  operations: {
    create: "CreateThing",
    read: { operationId: "ReadThing", parameters: { thing_id: "ThingId" } },
  },
};
