import { Schema } from "effect";
import type { ResourceSchemaAnnotation } from "../../../core/resource/model.js";
import type {
  AwsJsonRpcOperation,
  AwsJsonRpcPayload,
  AwsServiceDefinition,
} from "../client/awsClientModel.js";

/**
 * The AwsAttributeResourceMapping schema validates imported resource metadata,
 * Registry definitions, and generated operation metadata before
 * publication. Explicit reset values describe how AWS clears a removed property.
 * A removal without that rule fails before mutation. Applications supply
 * resource properties through generated schemas.
 */
export const AwsAttributeResourceMapping = Schema.Struct({
  typeName: Schema.NonEmptyString,
  operations: Schema.Struct({
    create: Schema.NonEmptyString,
    read: Schema.NonEmptyString,
    update: Schema.NonEmptyString,
    remove: Schema.NonEmptyString,
    readTags: Schema.NonEmptyString,
    tag: Schema.NonEmptyString,
    untag: Schema.NonEmptyString,
  }),
  identity: Schema.Struct({
    property: Schema.NonEmptyString,
    parameter: Schema.NonEmptyString,
  }),
  name: Schema.Struct({
    property: Schema.NonEmptyString,
    parameter: Schema.NonEmptyString,
    fifoProperty: Schema.optionalKey(Schema.NonEmptyString),
  }),
  tags: Schema.Struct({
    property: Schema.NonEmptyString,
    createParameter: Schema.NonEmptyString,
    updateParameter: Schema.NonEmptyString,
    removeParameter: Schema.NonEmptyString,
    response: Schema.NonEmptyString,
  }),
  attributes: Schema.Record(
    Schema.String,
    Schema.Struct({
      attribute: Schema.NonEmptyString,
      reset: Schema.optionalKey(Schema.Json),
    }),
  ),
  outputAttributes: Schema.Record(Schema.String, Schema.NonEmptyString),
  missingErrors: Schema.NonEmptyArray(Schema.NonEmptyString),
  readAttributeNames: Schema.NonEmptyArray(Schema.String),
});

/**
 * The AwsResourceOperation interface retains the generated operation's codecs.
 * The shared policy supplies JSON objects, and the native input codec checks
 * the selected operation before the internal AWS client executes it. Unit
 * responses remain valid results for mutation calls.
 */
export interface AwsResourceOperation extends AwsJsonRpcOperation {
  readonly input: Schema.Codec<object, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<unknown, unknown>;
}

/**
 * The AwsResourceAttributeValues type represents the string values exchanged by
 * attribute-map APIs. The generated attribute and tag codecs validate these
 * values before resource mapping or propagation checks use them.
 */
export type AwsResourceAttributeValues = Readonly<Record<string, string>>;

/**
 * The AwsResourceProperties record gives lifecycle commands the validated
 * declaration together with its native attributes and managed tags. Commands
 * can validate a complete change before making its first AWS request.
 */
export interface AwsResourceProperties {
  readonly properties: AwsJsonRpcPayload;
  readonly attributes: AwsResourceAttributeValues;
  readonly tags: AwsResourceAttributeValues;
}

/**
 * The AwsResourceState record retains the provider values used to confirm a
 * mutation beside the reconstructed resource that core can save. Its complete
 * tag map lets propagation checks confirm removal of owned keys while preserving
 * tags outside the declaration.
 */
export interface AwsResourceState {
  readonly resource: AwsJsonRpcPayload;
  readonly attributes: AwsResourceAttributeValues;
  readonly tags: AwsResourceAttributeValues;
}

/**
 * The AwsAttributeResourceConfiguration interface connects generated resource
 * validation to callable operation contracts. Attribute encodings and
 * create-only properties come from the selected Registry definition, so the
 * executor can translate values without a second resource schema.
 */
export interface AwsAttributeResourceConfiguration {
  readonly schema: ResourceSchemaAnnotation;
  readonly propsSchema: Schema.Schema<object>;
  readonly attributeSchema: Schema.Codec<AwsResourceAttributeValues, unknown>;
  readonly tagMapSchema: Schema.Codec<AwsResourceAttributeValues, unknown>;
  readonly tagsSchema: Schema.Codec<
    ReadonlyArray<{ readonly Key: string; readonly Value: string }>,
    unknown
  >;
  readonly service: AwsServiceDefinition;
  readonly mapping: typeof AwsAttributeResourceMapping.Type;
  readonly encodings: Readonly<Record<string, "string" | "json">>;
  readonly createOnlyProperties: ReadonlyArray<string>;
  readonly operations: Readonly<
    Record<
      keyof typeof AwsAttributeResourceMapping.Type.operations,
      AwsResourceOperation
    >
  >;
}
