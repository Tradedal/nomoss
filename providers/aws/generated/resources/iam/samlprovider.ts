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

interface SAMLPrivateKey {
  readonly KeyId: string;
  readonly Timestamp: string;
}

const SAMLPrivateKey = Schema.Struct({
  KeyId: Schema.String.annotate({
    description: "The unique identifier for the SAML private key.",
  })
    .check(
      Schema.isMinCodePoints(22).annotate({
        expected: "a string with at least 22 code points",
      }),
    )
    .check(
      Schema.isMaxCodePoints(64).annotate({
        expected: "a string with at most 64 code points",
      }),
    )
    .check(
      Schema.isPattern(new globalThis.RegExp("[A-Z0-9]+", "u")).annotate({
        expected: "a string matching the RegExp [A-Z0-9]+",
      }),
    ),
  Timestamp: Schema.String.annotate({
    description:
      'The date and time, in <a href=\\"http://www.iso.org/iso/iso8601\\">ISO 8601 date-time </a> format, when the private key was uploaded.',
    format: "date-time",
  }),
}).annotate({
  description: "The private key metadata for the SAML provider",
  identifier: "SAMLPrivateKey",
});

export interface AWSSAMLProviderProps {
  readonly Name?: string;
  readonly SamlMetadataDocument?: string;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly AssertionEncryptionMode?: "Allowed" | "Required";
  readonly AddPrivateKey?: string;
  readonly RemovePrivateKey?: string;
  readonly PrivateKeyList?: ReadonlyArray<SAMLPrivateKey>;
}

export const AWSSAMLProviderResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "samlprovider",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["Name"], ["AddPrivateKey"], ["RemovePrivateKey"]],
    },
    primaryIdentifier: ["/properties/Arn"],
  });

export const AWSSAMLProviderPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Name: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("[\\w._-]+", "u")).annotate({
            expected: "a string matching the RegExp [\\w._-]+",
          }),
        ),
    ),
    SamlMetadataDocument: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinCodePoints(1000).annotate({
          expected: "a string with at least 1000 code points",
        }),
      ).check(
        Schema.isMaxCodePoints(10000000).annotate({
          expected: "a string with at most 10000000 code points",
        }),
      ),
    ),
    Tags: Schema.optionalKey(Schema.Array(Tag)),
    AssertionEncryptionMode: Schema.optionalKey(
      Schema.Literals(["Allowed", "Required"]).annotate({
        description: "The encryption setting for the SAML provider",
      }),
    ),
    AddPrivateKey: Schema.optionalKey(
      Schema.String.annotate({
        description: "The private key from your external identity provider",
      })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(16384).annotate({
            expected: "a string with at most 16384 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp [\\u0009\\u000A\\u000D\\u0020-\\u00FF]+",
          }),
        ),
    ),
    RemovePrivateKey: Schema.optionalKey(
      Schema.String.annotate({
        description: "The Key ID of the private key to remove",
      })
        .check(
          Schema.isMinCodePoints(22).annotate({
            expected: "a string with at least 22 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(64).annotate({
            expected: "a string with at most 64 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("[A-Z0-9]+", "u")).annotate({
            expected: "a string matching the RegExp [A-Z0-9]+",
          }),
        ),
    ),
    PrivateKeyList: Schema.optionalKey(
      Schema.Array(SAMLPrivateKey).check(
        Schema.isMaxLength(2).annotate({
          expected: "a value with a length of at most 2",
        }),
      ),
    ),
  }),
  AWSSAMLProviderResourceSchema,
);

export interface AWSSAMLProviderOutputs {
  readonly Arn?: string;
  readonly SamlProviderUUID?: string;
}

export const AWSSAMLProviderOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(
    Schema.String.annotate({
      description: "Amazon Resource Name (ARN) of the SAML provider",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1600).annotate({
          expected: "a string with at most 1600 code points",
        }),
      ),
  ),
  SamlProviderUUID: Schema.optionalKey(
    Schema.String.annotate({
      description: "The unique identifier assigned to the SAML provider",
    })
      .check(
        Schema.isMinCodePoints(22).annotate({
          expected: "a string with at least 22 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[A-Z0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [A-Z0-9]+",
        }),
      ),
  ),
});

export interface AWSSAMLProviderRequest {
  readonly Name?: string;
  readonly SamlMetadataDocument?: string;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly AssertionEncryptionMode?: "Allowed" | "Required";
  readonly AddPrivateKey?: string;
  readonly RemovePrivateKey?: string;
  readonly PrivateKeyList?: ReadonlyArray<SAMLPrivateKey>;
}

export const AWSSAMLProviderRequestSchema = Schema.Struct({
  Name: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[\\w._-]+", "u")).annotate({
          expected: "a string matching the RegExp [\\w._-]+",
        }),
      ),
  ),
  SamlMetadataDocument: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinCodePoints(1000).annotate({
        expected: "a string with at least 1000 code points",
      }),
    ).check(
      Schema.isMaxCodePoints(10000000).annotate({
        expected: "a string with at most 10000000 code points",
      }),
    ),
  ),
  Tags: Schema.optionalKey(Schema.Array(Tag)),
  AssertionEncryptionMode: Schema.optionalKey(
    Schema.Literals(["Allowed", "Required"]).annotate({
      description: "The encryption setting for the SAML provider",
    }),
  ),
  AddPrivateKey: Schema.optionalKey(
    Schema.String.annotate({
      description: "The private key from your external identity provider",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(16384).annotate({
          expected: "a string with at most 16384 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("[\\u0009\\u000A\\u000D\\u0020-\\u00FF]+", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp [\\u0009\\u000A\\u000D\\u0020-\\u00FF]+",
        }),
      ),
  ),
  RemovePrivateKey: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Key ID of the private key to remove",
    })
      .check(
        Schema.isMinCodePoints(22).annotate({
          expected: "a string with at least 22 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(64).annotate({
          expected: "a string with at most 64 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("[A-Z0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [A-Z0-9]+",
        }),
      ),
  ),
  PrivateKeyList: Schema.optionalKey(
    Schema.Array(SAMLPrivateKey).check(
      Schema.isMaxLength(2).annotate({
        expected: "a value with a length of at most 2",
      }),
    ),
  ),
});

/**
 * The AWSSAMLProviderRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSSAMLProviderRelationshipIssues = [];

export const AWSSAMLProviderResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("samlprovider"),
});

/**
 * The AWSSAMLProviderResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSSAMLProviderResource<
  Props = AWSSAMLProviderProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "samlprovider";
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
        resource: "samlprovider",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSSAMLProviderOutputs>["Arn"] {
    const value: Required<AWSSAMLProviderOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSSAMLProviderOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SamlProviderUUID(): Required<AWSSAMLProviderOutputs>["SamlProviderUUID"] {
    const value: Required<AWSSAMLProviderOutputs>["SamlProviderUUID"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SamlProviderUUID",
        Schema.requiredKey(
          AWSSAMLProviderOutputsSchema.fields.SamlProviderUUID,
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
export function createAWSSAMLProviderDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSSAMLProviderResource<Props> {
  const resource: AWSSAMLProviderResource<Props> =
    new AWSSAMLProviderResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSSAMLProvider resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSSAMLProvider = Effect.fn("AWSSAMLProvider")(function* (input: {
  logicalId: string;
  props: AWSSAMLProviderProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSSAMLProviderPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSSAMLProviderResourceTypeSchema, {
    propsSchema: AWSSAMLProviderPropsSchema,
    requestSchema: AWSSAMLProviderRequestSchema,
    outputsSchema: AWSSAMLProviderOutputsSchema,
    props,
  });

  const resource: AWSSAMLProviderResource = createAWSSAMLProviderDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
