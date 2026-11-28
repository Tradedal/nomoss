import type {
  AwsJsonRpcOperation,
  AwsJsonRpcPayload,
  AwsServiceDefinition,
} from "@tradedal/aws-client-core/model";
import { Schema } from "effect";
import type { ResourceSchemaAnnotation } from "../../../src/core/resource/model.js";

/**
 * The AwsAttributeResourceMapping schema checks configuration for AWS APIs
 * that accept named attributes. An attribute may declare a reset value so a
 * command can distinguish a request to clear the attribute from a request
 * that leaves it unchanged.
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
 * The AwsResourceOperation interface preserves the generated request codec
 * when a definition selects an AWS operation. The client still checks the
 * native request, and a mutation may return no value.
 */
export interface AwsResourceOperation extends AwsJsonRpcOperation {
  readonly input: Schema.Codec<object, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<unknown, unknown>;
}

/**
 * The AwsResourceAttributeValues type describes the string values that an
 * attribute map sends to or receives from AWS. A property with a JSON value
 * must use its encoded text in that map.
 */
export type AwsResourceAttributeValues = Readonly<Record<string, string>>;

/**
 * The AwsResourceProperties record distinguishes declared properties from
 * the attributes and tags a provider call accepts. The same declaration can
 * supply the resource's attribute request and a separate tag request.
 */
export interface AwsResourceProperties {
  readonly properties: AwsJsonRpcPayload;
  readonly attributes: AwsResourceAttributeValues;
  readonly tags: AwsResourceAttributeValues;
}

/**
 * The AwsResourceState record preserves native attributes and the complete
 * tag map beside the resource values the stack saves. A confirmation can
 * use the tag map to check that a formerly declared key is absent even
 * when other keys remain.
 */
export interface AwsResourceState {
  readonly resource: AwsJsonRpcPayload;
  readonly attributes: AwsResourceAttributeValues;
  readonly tags: AwsResourceAttributeValues;
}

/**
 * The AwsAttributeResourceConfiguration interface ties the selected AWS
 * operations to the resource's generated schemas. The Registry definition
 * specifies which properties require replacement and which values the
 * attribute API expects as JSON text.
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
