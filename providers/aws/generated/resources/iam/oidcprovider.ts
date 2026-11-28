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

export interface AWSOIDCProviderProps {
  readonly ClientIdList?: ReadonlyArray<string>;
  readonly Url?: string;
  readonly ThumbprintList?: ReadonlyArray<string>;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSOIDCProviderResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "oidcprovider",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["Url"]],
    },
    primaryIdentifier: ["/properties/Arn"],
  });

export const AWSOIDCProviderPropsSchema = annotateResourceSchema(
  Schema.Struct({
    ClientIdList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        ).check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        ),
      ),
    ),
    Url: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(255).annotate({
          expected: "a string with at most 255 code points",
        }),
      ),
    ),
    ThumbprintList: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMinCodePoints(40).annotate({
            expected: "a string with at least 40 code points",
          }),
        )
          .check(
            Schema.isMaxCodePoints(40).annotate({
              expected: "a string with at most 40 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp("[0-9A-Fa-f]{40}", "u"),
            ).annotate({
              expected: "a string matching the RegExp [0-9A-Fa-f]{40}",
            }),
          ),
      ).check(
        Schema.isMaxLength(5).annotate({
          expected: "a value with a length of at most 5",
        }),
      ),
    ),
    Tags: Schema.optionalKey(Schema.Array(Tag)),
  }),
  AWSOIDCProviderResourceSchema,
);

export interface AWSOIDCProviderOutputs {
  readonly Arn?: string;
}

export const AWSOIDCProviderOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(
    Schema.String.annotate({
      description: "Amazon Resource Name (ARN) of the OIDC provider",
    })
      .check(
        Schema.isMinCodePoints(20).annotate({
          expected: "a string with at least 20 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      ),
  ),
});

export interface AWSOIDCProviderRequest {
  readonly ClientIdList?: ReadonlyArray<string>;
  readonly Url?: string;
  readonly ThumbprintList?: ReadonlyArray<string>;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSOIDCProviderRequestSchema = Schema.Struct({
  ClientIdList: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(255).annotate({
          expected: "a string with at most 255 code points",
        }),
      ),
    ),
  ),
  Url: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  ThumbprintList: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMinCodePoints(40).annotate({
          expected: "a string with at least 40 code points",
        }),
      )
        .check(
          Schema.isMaxCodePoints(40).annotate({
            expected: "a string with at most 40 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("[0-9A-Fa-f]{40}", "u"),
          ).annotate({
            expected: "a string matching the RegExp [0-9A-Fa-f]{40}",
          }),
        ),
    ).check(
      Schema.isMaxLength(5).annotate({
        expected: "a value with a length of at most 5",
      }),
    ),
  ),
  Tags: Schema.optionalKey(Schema.Array(Tag)),
});

/**
 * The AWSOIDCProviderRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSOIDCProviderRelationshipIssues = [];

export const AWSOIDCProviderResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("oidcprovider"),
});

/**
 * The AWSOIDCProviderResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSOIDCProviderResource<
  Props = AWSOIDCProviderProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "oidcprovider";
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
        resource: "oidcprovider",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSOIDCProviderOutputs>["Arn"] {
    const value: Required<AWSOIDCProviderOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSOIDCProviderOutputsSchema.fields.Arn),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSOIDCProviderDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSOIDCProviderResource<Props> {
  const resource: AWSOIDCProviderResource<Props> =
    new AWSOIDCProviderResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSOIDCProvider resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSOIDCProvider = Effect.fn("AWSOIDCProvider")(function* (input: {
  logicalId: string;
  props: AWSOIDCProviderProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSOIDCProviderPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSOIDCProviderResourceTypeSchema, {
    propsSchema: AWSOIDCProviderPropsSchema,
    requestSchema: AWSOIDCProviderRequestSchema,
    outputsSchema: AWSOIDCProviderOutputsSchema,
    props,
  });

  const resource: AWSOIDCProviderResource = createAWSOIDCProviderDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
