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

interface Tag {
  readonly Value: string;
  readonly Key: string;
}

const Tag = Schema.Struct({
  Value: Schema.String.annotate({
    description:
      "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  Key: Schema.String.annotate({
    description:
      "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _, ., /, =, +, and -.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(128).annotate({
        expected: "a string with at most 128 code points",
      }),
    ),
}).annotate({
  description: "A key-value pair to associate with a resource.",
  identifier: "Tag",
});

export interface AWSVirtualMFADeviceProps {
  readonly VirtualMfaDeviceName?: string;
  readonly Path?: string;
  readonly Users: ReadonlyArray<string>;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSVirtualMFADeviceResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "virtualmfadevice",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["VirtualMfaDeviceName"], ["Path"]],
    },
    primaryIdentifier: ["/properties/SerialNumber"],
  });

export const AWSVirtualMFADevicePropsSchema = annotateResourceSchema(
  Schema.Struct({
    VirtualMfaDeviceName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(226).annotate({
            expected: "a string with at most 226 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("[\\w+=,.@-]+", "u")).annotate(
            { expected: "a string matching the RegExp [\\w+=,.@-]+" },
          ),
        ),
    ),
    Path: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "(\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F)",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp (\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F)",
          }),
        ),
    ),
    Users: Schema.Array(Schema.String),
    Tags: Schema.optionalKey(Schema.Array(Tag)),
  }),
  AWSVirtualMFADeviceResourceSchema,
);

export interface AWSVirtualMFADeviceOutputs {
  readonly SerialNumber?: string;
}

export const AWSVirtualMFADeviceOutputsSchema = Schema.Struct({
  SerialNumber: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinCodePoints(9).annotate({
        expected: "a string with at least 9 code points",
      }),
    )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[\\w+=/:,.@-]+", "u")).annotate(
          { expected: "a string matching the RegExp [\\w+=/:,.@-]+" },
        ),
      ),
  ),
});

export interface AWSVirtualMFADeviceRequest {
  readonly VirtualMfaDeviceName?: string;
  readonly Path?: string;
  readonly Users: ReadonlyArray<string>;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSVirtualMFADeviceRequestSchema = Schema.Struct({
  VirtualMfaDeviceName: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(226).annotate({
          expected: "a string with at most 226 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[\\w+=,.@-]+", "u")).annotate({
          expected: "a string matching the RegExp [\\w+=,.@-]+",
        }),
      ),
  ),
  Path: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "(\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F)",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp (\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F)",
        }),
      ),
  ),
  Users: Schema.Array(Schema.String),
  Tags: Schema.optionalKey(Schema.Array(Tag)),
});

/**
 * The AWSVirtualMFADeviceRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSVirtualMFADeviceRelationshipIssues = [];

export const AWSVirtualMFADeviceResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("virtualmfadevice"),
});

/**
 * The AWSVirtualMFADeviceResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSVirtualMFADeviceResource<
  Props = AWSVirtualMFADeviceProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "virtualmfadevice";
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
        resource: "virtualmfadevice",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SerialNumber(): Required<AWSVirtualMFADeviceOutputs>["SerialNumber"] {
    const value: Required<AWSVirtualMFADeviceOutputs>["SerialNumber"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SerialNumber",
        Schema.requiredKey(
          AWSVirtualMFADeviceOutputsSchema.fields.SerialNumber,
        ),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSVirtualMFADeviceDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSVirtualMFADeviceResource<Props> {
  const resource: AWSVirtualMFADeviceResource<Props> =
    new AWSVirtualMFADeviceResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSVirtualMFADevice resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSVirtualMFADevice = Effect.fn("AWSVirtualMFADevice")(
  function* (input: { logicalId: string; props: AWSVirtualMFADeviceProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSVirtualMFADevicePropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(AWSVirtualMFADeviceResourceTypeSchema, {
      propsSchema: AWSVirtualMFADevicePropsSchema,
      requestSchema: AWSVirtualMFADeviceRequestSchema,
      outputsSchema: AWSVirtualMFADeviceOutputsSchema,
      props,
    });

    const resource: AWSVirtualMFADeviceResource =
      createAWSVirtualMFADeviceDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
