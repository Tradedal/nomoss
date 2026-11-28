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

export interface AWSServerCertificateProps {
  readonly CertificateBody?: string;
  readonly CertificateChain?: string;
  readonly ServerCertificateName?: string;
  readonly Path?: string;
  readonly PrivateKey?: string;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSServerCertificateResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "servercertificate",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [
        ["ServerCertificateName"],
        ["PrivateKey"],
        ["CertificateBody"],
        ["CertificateChain"],
      ],
    },
    primaryIdentifier: ["/properties/ServerCertificateName"],
  });

export const AWSServerCertificatePropsSchema = annotateResourceSchema(
  Schema.Struct({
    CertificateBody: Schema.optionalKey(
      Schema.String.check(
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
    CertificateChain: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
        .check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
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
    ServerCertificateName: Schema.optionalKey(
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
    PrivateKey: Schema.optionalKey(
      Schema.String.check(
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
    Tags: Schema.optionalKey(Schema.Array(Tag)),
  }),
  AWSServerCertificateResourceSchema,
);

export interface AWSServerCertificateOutputs {
  readonly Arn?: string;
  readonly ServerCertificateName?: string;
}

export const AWSServerCertificateOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(
    Schema.String.annotate({
      description: "Amazon Resource Name (ARN) of the server certificate",
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
  ServerCertificateName: Schema.optionalKey(
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
        Schema.isPattern(new globalThis.RegExp("[\\w+=,.@-]+", "u")).annotate({
          expected: "a string matching the RegExp [\\w+=,.@-]+",
        }),
      ),
  ),
});

export interface AWSServerCertificateRequest {
  readonly CertificateBody?: string;
  readonly CertificateChain?: string;
  readonly ServerCertificateName?: string;
  readonly Path?: string;
  readonly PrivateKey?: string;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSServerCertificateRequestSchema = Schema.Struct({
  CertificateBody: Schema.optionalKey(
    Schema.String.check(
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
  CertificateChain: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
      .check(
        Schema.isMaxCodePoints(2097152).annotate({
          expected: "a string with at most 2097152 code points",
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
  ServerCertificateName: Schema.optionalKey(
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
  PrivateKey: Schema.optionalKey(
    Schema.String.check(
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
  Tags: Schema.optionalKey(Schema.Array(Tag)),
});

/**
 * The AWSServerCertificateRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSServerCertificateRelationshipIssues = [];

export const AWSServerCertificateResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("servercertificate"),
});

/**
 * The AWSServerCertificateResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSServerCertificateResource<
  Props = AWSServerCertificateProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "servercertificate";
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
        resource: "servercertificate",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSServerCertificateOutputs>["Arn"] {
    const value: Required<AWSServerCertificateOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSServerCertificateOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ServerCertificateName(): Required<AWSServerCertificateOutputs>["ServerCertificateName"] {
    const value: Required<AWSServerCertificateOutputs>["ServerCertificateName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ServerCertificateName",
        Schema.requiredKey(
          AWSServerCertificateOutputsSchema.fields.ServerCertificateName,
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
export function createAWSServerCertificateDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSServerCertificateResource<Props> {
  const resource: AWSServerCertificateResource<Props> =
    new AWSServerCertificateResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSServerCertificate resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSServerCertificate = Effect.fn("AWSServerCertificate")(
  function* (input: { logicalId: string; props: AWSServerCertificateProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSServerCertificatePropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(AWSServerCertificateResourceTypeSchema, {
      propsSchema: AWSServerCertificatePropsSchema,
      requestSchema: AWSServerCertificateRequestSchema,
      outputsSchema: AWSServerCertificateOutputsSchema,
      props,
    });

    const resource: AWSServerCertificateResource =
      createAWSServerCertificateDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
