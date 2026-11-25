import { Effect, Option, Record, Schema } from "effect";
import { ResourceReplacementSchema } from "../../src/core/resource/model.js";
import { ResourceRequestConfiguration } from "../../src/core/resource/resourceRequest.js";
import { JsonFileConfiguration } from "../../src/providers/file/model.js";
import { OperationSource } from "./catalogSchemas.js";
import { OperationJsonSchema } from "./operationSchemas.js";
import {
  type OpenApiResourceBinding,
  OpenApiResourceDiscoveryIssue,
} from "./resourceDiscoverySchemas.js";

/**
 * Omitted Registry classifications decode to an empty collection under the
 * Registry contract. Prepared definitions keep that meaning during generation.
 */
export const ResourcePropertyPaths = Schema.Array(Schema.NonEmptyString).pipe(
  Schema.withDecodingDefaultKey(Effect.succeed([])),
);

/**
 * A resource definition describes application properties and provider identity
 * in the CloudFormation Registry vocabulary. Source adapters preserve these
 * facts so output generation can serve AWS and other provider resources.
 */
export const ResourceDefinition = Schema.Struct({
  typeName: Schema.String.check(Schema.isPattern(/^[^:]+::[^:]+::[^:]+$/)),
  properties: Schema.Record(Schema.String, OperationJsonSchema),
  definitions: Schema.JsonObject.pipe(
    Schema.withDecodingDefaultKey(Effect.succeed({})),
  ),
  required: ResourcePropertyPaths,
  primaryIdentifier: ResourcePropertyPaths,
  readOnlyProperties: ResourcePropertyPaths,
  createOnlyProperties: ResourcePropertyPaths,
  writeOnlyProperties: ResourcePropertyPaths,
});

export type ResourceDefinition = typeof ResourceDefinition.Type;

/**
 * Resource sources retain the document that supplies output validation.
 * Registry documents enter resource generation directly; API sources retain
 * their existing operation-catalog identity.
 */
export const ResourceSource = Schema.Struct({
  ...OperationSource.fields,
  format: Schema.Literals([
    "CloudFormation",
    "OpenApi",
    "Smithy",
    "Effect",
    "JsonSchema",
  ]),
});

export type ResourceSource = typeof ResourceSource.Type;

/**
 * Saved output parameters identify the provider object for a read or mutation.
 * Parameters select named resource outputs so a response id can be reused under
 * the parameter name required by that provider operation.
 */
export const ResourceReadBinding = Schema.Struct({
  operationId: Schema.NonEmptyString,
  parameters: Schema.Record(Schema.NonEmptyString, Schema.NonEmptyString),
});

/**
 * Removal may deactivate a provider object through a mutation. Its fixed values
 * must satisfy that operation's request schema alongside the saved identity.
 */
export const ResourceRemovalBinding = Schema.Struct({
  ...ResourceReadBinding.fields,
  values: Schema.optionalKey(Schema.JsonObject),
});

/**
 * An absent update or removal contract leaves that operation unresolved.
 * Creation and reads remain available independently of mutation support.
 */
export const ResourceOperations = Schema.Struct({
  create: Schema.NonEmptyString,
  read: ResourceReadBinding,
  update: Schema.optionalKey(ResourceReadBinding),
  remove: Schema.optionalKey(ResourceRemovalBinding),
});

export type ResourceOperations = typeof ResourceOperations.Type;

/**
 * The ResourceDeclaration schema keeps local lifecycle properties alongside a
 * provider request. The selected property contains the provider's unchanged
 * input contract, while the other properties use their declared JSON schemas.
 */
export const ResourceDeclaration = Schema.Struct({
  property: Schema.NonEmptyString,
  properties: Schema.Record(Schema.NonEmptyString, OperationJsonSchema),
  required: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
});

/**
 * The ResourceInputReference schema lets a local declaration depend on a value
 * produced by another resource. Generation verifies the target resource and
 * output, then gives the selected field a codec that saves the dependency.
 * Execution uses that mapping to obtain the applied value before publishing
 * the dependent file.
 */
export const ResourceInputReference = Schema.Struct({
  propertyPath: Schema.Array(Schema.NonEmptyString),
  resourceType: ResourceDefinition.fields.typeName,
  output: Schema.NonEmptyString,
});

/**
 * The ResourceOutputCatalog schema ties application output names to the source
 * fields used for validation and the request bindings needed for later reads.
 * Reviewed replacement rules remain in emitted metadata so planning uses the
 * lifecycle decisions selected during generation.
 */
export const ResourceOutputCatalog = Schema.Struct({
  source: ResourceSource,
  typeName: ResourceDefinition.fields.typeName,
  resource: Schema.optionalKey(Schema.NonEmptyString),
  propsSchema: Schema.optionalKey(Schema.NonEmptyString),
  stateSecretOutputKeys: Schema.optionalKey(
    Schema.Array(Schema.NonEmptyString),
  ),
  primaryIdentifier: ResourceDefinition.fields.primaryIdentifier,
  createOnlyProperties: Schema.optionalKey(
    ResourceDefinition.fields.createOnlyProperties,
  ),
  writeOnlyProperties: Schema.optionalKey(
    ResourceDefinition.fields.writeOnlyProperties,
  ),
  operations: Schema.optionalKey(ResourceOperations),
  deletedResponseMeansMissing: Schema.optionalKey(Schema.Boolean),
  declaration: Schema.optionalKey(ResourceDeclaration),
  request: Schema.optionalKey(ResourceRequestConfiguration),
  replacement: Schema.optionalKey(ResourceReplacementSchema),
  responseSchema: Schema.optionalKey(Schema.NonEmptyString),
  documentSchema: Schema.optionalKey(Schema.NonEmptyString),
  references: Schema.optionalKey(Schema.Array(ResourceInputReference)),
  file: Schema.optionalKey(JsonFileConfiguration),
  outputs: Schema.Record(
    Schema.NonEmptyString,
    Schema.Struct({
      schema: Schema.optionalKey(OperationJsonSchema),
      schemaPath: Schema.NonEmptyString,
      valuePath: Schema.NonEmptyString,
      required: Schema.Boolean,
      retainOnRead: Schema.optionalKey(Schema.Boolean),
      inputParameter: Schema.optionalKey(Schema.NonEmptyString),
    }),
  ),
});

export type ResourceOutputCatalog = typeof ResourceOutputCatalog.Type;

/**
 * The EffectResourcePreparation interface keeps a local resource's catalog
 * with the native output schema produced from the same selection. Compilation
 * uses both values to preserve the selected field names and validation.
 */
export interface EffectResourcePreparation {
  readonly catalog: ResourceOutputCatalog;
  readonly outputSchema: Schema.Top;
}

/**
 * Generation accepts references at these input paths. Targets identify the
 * provider resource and output property. Request and response locations retain
 * the evidence for each relationship; unresolved alternatives remain visible.
 */
export const ResourceRelationship = Schema.Struct({
  propertyPath: Schema.Array(Schema.NonEmptyString),
  inputSchemaPath: Schema.NonEmptyString,
  responseSchemaPath: Schema.NonEmptyString,
  targets: Schema.Array(
    Schema.Struct({
      resource: Schema.NonEmptyString,
      propertyPath: Schema.NonEmptyString,
      schemaPath: Schema.NonEmptyString,
    }),
  ),
  unresolved: Schema.Array(Schema.NonEmptyString),
});
export type ResourceRelationship = typeof ResourceRelationship.Type;

/**
 * Creation inputs remain references into the corrected provider document.
 * Compilation resolves them there, so metadata does not duplicate request
 * schemas or the shared definitions they reference.
 */
export const OpenApiResourceCreation = Schema.Struct({
  operationId: Schema.NonEmptyString,
  inputSchemaPath: Schema.NullOr(Schema.NonEmptyString),
  responseSchemaPath: Schema.NonEmptyString,
});
export type OpenApiResourceCreation = typeof OpenApiResourceCreation.Type;

/**
 * The OpenApiResourceCreationResolution interface retains a creation candidate
 * with its read binding or the source issue that prevented that binding.
 * Catalog construction combines these results before selecting an operation.
 */
export interface OpenApiResourceCreationResolution {
  readonly creation: OpenApiResourceCreation;
  readonly binding: Option.Option<OpenApiResourceBinding>;
  readonly issues: ReadonlyArray<OpenApiResourceDiscoveryIssue>;
}

/**
 * The OpenApiResourceOutputField interface keeps the provider validation and
 * source location selected for an application output. Input parameters retain
 * their request name so saved parent identities can be projected after reads.
 */
export interface OpenApiResourceOutputField {
  readonly name: string;
  readonly field: string;
  readonly schema: typeof OperationJsonSchema.Type;
  readonly schemaPath: string;
  readonly required: boolean;
  readonly inputParameter?: string;
}

export const OpenApiResourceDefinition = Schema.Struct({
  ...ResourceOutputCatalog.fields,
  providerResource: Schema.NonEmptyString,
  schemaPath: Schema.NonEmptyString,
  creations: Schema.Array(OpenApiResourceCreation),
  bindingIssues: Schema.Array(OpenApiResourceDiscoveryIssue),
  inputSchemaPath: Schema.NullOr(Schema.NonEmptyString),
  relationships: Schema.Array(ResourceRelationship),
});
export type OpenApiResourceDefinition = typeof OpenApiResourceDefinition.Type;

/**
 * Creation models remain available when read or identity resolution is
 * unfinished. Only entries with resolved operations can generate executable
 * resource bindings.
 */
export const OpenApiResourceCatalog = Schema.Record(
  ResourceDefinition.fields.typeName,
  OpenApiResourceDefinition,
);
export type OpenApiResourceCatalog = typeof OpenApiResourceCatalog.Type;

export const OpenApiResourcePreparation = Schema.Struct({
  resources: OpenApiResourceCatalog,
  unresolved: Schema.Array(OpenApiResourceDiscoveryIssue),
});
export type OpenApiResourcePreparation = typeof OpenApiResourcePreparation.Type;

/**
 * API entries include creation and relationship metadata. Registry and native
 * Effect entries retain their own source contracts in the same keyed catalog.
 */
export const ResourceCatalog = Schema.Record(
  ResourceDefinition.fields.typeName,
  Schema.Struct({
    ...ResourceOutputCatalog.fields,
    providerResource: Schema.optionalKey(
      OpenApiResourceDefinition.fields.providerResource,
    ),
    schemaPath: Schema.optionalKey(OpenApiResourceDefinition.fields.schemaPath),
    creations: Schema.optionalKey(OpenApiResourceDefinition.fields.creations),
    bindingIssues: Schema.optionalKey(
      OpenApiResourceDefinition.fields.bindingIssues,
    ),
    inputSchemaPath: Schema.optionalKey(
      OpenApiResourceDefinition.fields.inputSchemaPath,
    ),
    relationships: Schema.optionalKey(
      OpenApiResourceDefinition.fields.relationships,
    ),
  }),
);
export type ResourceCatalog = typeof ResourceCatalog.Type;

/**
 * The OpenApiResourceHint schema requires exceptional operation and response
 * choices to refer to the provider document. Relationship pointers must
 * identify declaration inputs and target schemas with usable identities.
 * Output aliases preserve the saved names used to address resources across
 * runs. Selecting replacement also requires an executable removal operation
 * and a reviewed creation and removal order.
 */
export const OpenApiResourceHint = Schema.Struct({
  name: Schema.optionalKey(Schema.NonEmptyString),
  outputAliases: Schema.optionalKey(
    Schema.Record(Schema.NonEmptyString, Schema.NonEmptyString),
  ),
  propsSchema: Schema.optionalKey(Schema.NonEmptyString),
  retainOnRead: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
  secretOutputs: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
  createOperation: Schema.optionalKey(Schema.NonEmptyString),
  readOperation: Schema.optionalKey(Schema.NonEmptyString),
  responseSchema: Schema.optionalKey(
    Schema.String.check(Schema.isPattern(/^#\/components\/schemas\/[^/]+$/)),
  ),
  relationships: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(Schema.isPattern(/^\//)),
      Schema.NonEmptyArray(
        Schema.String.check(
          Schema.isPattern(/^#\/components\/schemas\/[^/]+$/),
        ),
      ),
    ),
  ),
  updateOperation: Schema.optionalKey(Schema.NonEmptyString),
  removeOperation: Schema.optionalKey(Schema.NonEmptyString),
  removeValues: Schema.optionalKey(Schema.JsonObject),
  deletedResponseMeansMissing: Schema.optionalKey(Schema.Boolean),
  declaration: Schema.optionalKey(ResourceDeclaration),
  request: Schema.optionalKey(ResourceRequestConfiguration),
  replacement: Schema.optionalKey(ResourceReplacementSchema),
  createOnlyProperties: Schema.optionalKey(
    Schema.toType(ResourceDefinition.fields.createOnlyProperties),
  ),
});
export type OpenApiResourceHint = typeof OpenApiResourceHint.Type;

export const OpenApiResourceHints = Schema.Record(
  Schema.NonEmptyString,
  OpenApiResourceHint,
);
export type OpenApiResourceHints = typeof OpenApiResourceHints.Type;

/**
 * A resource selection names the source fields that become application outputs
 * and retain saved identity. Naming and absence policies stay reproducible for
 * resources prepared from provider documents or native Effect contracts.
 */
export const ResourceOutputSelection = Schema.Struct({
  resource: Schema.NonEmptyString,
  propsSchema: Schema.NonEmptyString,
  schema: Schema.NonEmptyString,
  outputs: Schema.Record(Schema.NonEmptyString, Schema.NonEmptyString),
  primaryIdentifier: Schema.NonEmptyArray(Schema.NonEmptyString),
  retainOnRead: Schema.optionalKey(Schema.Array(Schema.NonEmptyString)),
  stateSecretOutputKeys: Schema.optionalKey(
    Schema.Array(Schema.NonEmptyString),
  ),
});

export type ResourceOutputSelection = typeof ResourceOutputSelection.Type;

/**
 * API selections bind source output fields to actual creation and read
 * operations. References stay within the corrected provider document.
 */
export const OpenApiResourceSelection = Schema.Struct({
  ...ResourceOutputSelection.fields,
  inputOutputs: Schema.optionalKey(
    Schema.Record(Schema.NonEmptyString, Schema.NonEmptyString),
  ),
  schema: Schema.String.check(
    Schema.isPattern(/^#\/components\/schemas\/[^/]+$/),
  ),
  operations: ResourceOperations,
});

export type OpenApiResourceSelection = typeof OpenApiResourceSelection.Type;

/**
 * Local resource sources select existing Effect schema exports. Their native
 * field contracts remain available for compilation while the catalog records
 * the module and field used by each generated output.
 */
export const EffectResourceSource = Schema.Struct({
  source: Schema.Struct({
    ...ResourceSource.fields,
    format: Schema.Literal("Effect"),
  }),
  resources: Schema.Record(
    ResourceDefinition.fields.typeName,
    ResourceOutputSelection,
  ),
});

/**
 * The JsonSchemaResourceSource schema defines the application data that a
 * generated local file resource accepts and publishes. Document fields select
 * properties from the input contract so declarations and file observations
 * validate those values consistently. Each resource must save its declared
 * destination as its sole output, which lets later reads and teardown locate
 * the published file. Catalog preparation checks that output is required.
 */
export const JsonSchemaResourceSource = Schema.Struct({
  source: Schema.Struct({
    ...ResourceSource.fields,
    format: Schema.Literal("JsonSchema"),
  }),
  resources: Schema.Record(
    ResourceDefinition.fields.typeName,
    Schema.Struct({
      resource: ResourceOutputSelection.fields.resource,
      propsSchema: ResourceOutputSelection.fields.propsSchema,
      outputs: ResourceOutputSelection.fields.outputs,
      primaryIdentifier: ResourceOutputSelection.fields.primaryIdentifier,
      file: JsonFileConfiguration,
      replacement: Schema.optionalKey(ResourceReplacementSchema),
      input: Schema.Struct({
        properties: ResourceDefinition.fields.properties,
        required: ResourceDefinition.fields.required,
      }),
      document: Schema.Struct({
        schema: Schema.NonEmptyString,
        properties: Schema.NonEmptyArray(Schema.NonEmptyString),
      }),
      references: Schema.Array(ResourceInputReference),
    }).check(
      Schema.makeFilter(
        (selection) =>
          Record.size(selection.outputs) === 1 &&
          Option.contains(
            Record.get(selection.outputs, selection.file.pathOutput),
            selection.file.pathProperty,
          ),
        {
          expected:
            "a saved file output selected from its declared path property",
        },
      ),
    ),
  ),
});

/**
 * The JsonSchemaResourcePreparation interface supplies the input compiler with
 * both validators for a local file resource. Its input schema accepts the
 * destination and document data; its document schema selects the fields to
 * publish. The catalog supplies the names and dependency mappings needed to
 * emit matching declaration, execution, and observation contracts.
 */
export interface JsonSchemaResourcePreparation {
  readonly catalog: ResourceOutputCatalog;
  readonly inputSchema: Schema.Top;
  readonly documentSchema: Schema.Top;
}
