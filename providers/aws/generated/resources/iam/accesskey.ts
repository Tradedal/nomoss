// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../src/core/resource/resourceOutputBinding.js";

export interface AWSAccessKeyProps {
  readonly Serial?: number;
  readonly Status?: string;
  readonly UserName: string;
}

export const AWSAccessKeyResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "accesskey",
  operation: "create",
  stateSecretOutputKeys: ["SecretAccessKey"],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["UserName"], ["Serial"]],
  },
  primaryIdentifier: ["/properties/Id"],
});

export const AWSAccessKeyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Serial: Schema.optionalKey(Schema.Int),
    Status: Schema.optionalKey(Schema.String),
    UserName: Schema.String,
  }),
  AWSAccessKeyResourceSchema,
);

export interface AWSAccessKeyOutputs {
  readonly SecretAccessKey?: string;
  readonly Id?: string;
}

export const AWSAccessKeyOutputsSchema = Schema.Struct({
  SecretAccessKey: Schema.optionalKey(Schema.String),
  Id: Schema.optionalKey(Schema.String),
});

export interface AWSAccessKeyRequest {
  readonly Serial?: number;
  readonly Status?: string;
  readonly UserName: string;
}

export const AWSAccessKeyRequestSchema = Schema.Struct({
  Serial: Schema.optionalKey(Schema.Int),
  Status: Schema.optionalKey(Schema.String),
  UserName: Schema.String,
});

/**
 * The AWSAccessKeyRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSAccessKeyRelationshipIssues = [];

export const AWSAccessKeyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("accesskey"),
});

/**
 * The AWSAccessKeyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSAccessKeyResource<
  Props = AWSAccessKeyProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "accesskey";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "aws",
        service: "iam",
        resource: "accesskey",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SecretAccessKey(): Required<AWSAccessKeyOutputs>["SecretAccessKey"] {
    const value: Required<AWSAccessKeyOutputs>["SecretAccessKey"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SecretAccessKey",
        Schema.requiredKey(AWSAccessKeyOutputsSchema.fields.SecretAccessKey),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Id(): Required<AWSAccessKeyOutputs>["Id"] {
    const value: Required<AWSAccessKeyOutputs>["Id"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Id",
        Schema.requiredKey(AWSAccessKeyOutputsSchema.fields.Id),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSAccessKeyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSAccessKeyResource<Props> {
  const resource: AWSAccessKeyResource<Props> = new AWSAccessKeyResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSAccessKey resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSAccessKey = Effect.fn("AWSAccessKey")(function* (input: {
  logicalId: string;
  props: AWSAccessKeyProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSAccessKeyPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSAccessKeyResourceTypeSchema, {
    propsSchema: AWSAccessKeyPropsSchema,
    requestSchema: AWSAccessKeyRequestSchema,
    outputsSchema: AWSAccessKeyOutputsSchema,
    props,
  });

  const resource: AWSAccessKeyResource = createAWSAccessKeyDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
