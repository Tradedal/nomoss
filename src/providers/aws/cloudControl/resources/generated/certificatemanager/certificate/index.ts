// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../../../core/resource/resourceOutputBinding.js";

interface DomainValidationOption {
  readonly DomainName: string;
  readonly ValidationDomain?: string;
  readonly HostedZoneId?: string;
}

const DomainValidationOption = Schema.Struct({
  DomainName: Schema.String,
  ValidationDomain: Schema.optionalKey(Schema.String),
  HostedZoneId: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "DomainValidationOption" });

interface Tag {
  readonly Value: string;
  readonly Key: string;
}

const Tag = Schema.Struct({
  Value: Schema.String,
  Key: Schema.String,
}).annotate({ identifier: "Tag" });

export interface CertificateProps {
  readonly CertificateAuthorityArn?: string;
  readonly CertificateExport?: string;
  readonly DomainValidationOptions?: ReadonlyArray<DomainValidationOption>;
  readonly CertificateTransparencyLoggingPreference?: string;
  readonly DomainName: string;
  readonly ValidationMethod?: string;
  readonly SubjectAlternativeNames?: ReadonlyArray<string>;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly KeyAlgorithm?: string;
}

export const CertificateResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "certificatemanager",
  resource: "certificate",
  operation: "create",
  stateSecretOutputKeys: [],
  cloudControl: {
    typeName: "AWS::CertificateManager::Certificate",
    primaryIdentifier: ["/properties/Id"],
    readOnlyProperties: ["/properties/Id"],
    createOnlyProperties: [
      "/properties/SubjectAlternativeNames",
      "/properties/DomainValidationOptions",
      "/properties/ValidationMethod",
      "/properties/KeyAlgorithm",
      "/properties/DomainName",
      "/properties/CertificateAuthorityArn",
    ],
    writeOnlyProperties: [],
  },
});
export const CertificatePropsSchema = annotateResourceSchema(
  Schema.Struct({
    CertificateAuthorityArn: Schema.optionalKey(Schema.String),
    CertificateExport: Schema.optionalKey(Schema.String),
    DomainValidationOptions: Schema.optionalKey(
      Schema.Array(DomainValidationOption).check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
    ),
    CertificateTransparencyLoggingPreference: Schema.optionalKey(Schema.String),
    DomainName: Schema.String,
    ValidationMethod: Schema.optionalKey(Schema.String),
    SubjectAlternativeNames: Schema.optionalKey(
      Schema.Array(Schema.String).check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
    ),
    Tags: Schema.optionalKey(Schema.Array(Tag)),
    KeyAlgorithm: Schema.optionalKey(Schema.String),
  }),
  CertificateResourceSchema,
);

export interface CertificateOutputs {
  readonly Id?: string;
}

export const CertificateOutputsSchema = Schema.Struct({
  Id: Schema.optionalKey(Schema.String),
});

export interface CertificateResource {
  readonly key: ResourceKey;
  readonly props: CertificateProps;
  readonly outputs: {
    readonly [Key in keyof CertificateOutputs]-?: Required<CertificateOutputs>[Key];
  };
}

export const registerCertificate = Effect.fn("Certificate.register")(
  function* (input: {
    readonly key: ResourceKey;
    readonly props: CertificateProps;
  }) {
    const graph = yield* ResourceGraphBuilder;
    const graphResource = yield* graph.resource(input.key);

    const resourceProps: CertificateProps = yield* Schema.decodeEffect(
      CertificatePropsSchema,
    )(input.props);

    const resourceOutputs: CertificateOutputs = yield* Schema.decodeEffect(
      CertificateOutputsSchema,
    )({});

    yield* graphResource.register({
      propsSchema: CertificatePropsSchema,
      outputsSchema: CertificateOutputsSchema,
      props: resourceProps,
      outputs: resourceOutputs,
    });

    const resource: CertificateResource = {
      key: input.key,
      props: resourceProps,
      outputs: {
        get Id(): Required<CertificateOutputs>["Id"] {
          const value: Required<CertificateOutputs>["Id"] =
            ResourceOutputBinding.value(
              graphResource.outputs,
              input.key,
              "Id",
              Schema.requiredKey(CertificateOutputsSchema.fields.Id),
            );
          return value;
        },
      },
    };

    return resource;
  },
);
export const CertificateOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "aws-certificatemanager-certificate.json",
      format: "CloudFormation",
    },
    typeName: "AWS::CertificateManager::Certificate",
    primaryIdentifier: ["/properties/Id"],
    createOnlyProperties: [
      "/properties/SubjectAlternativeNames",
      "/properties/DomainValidationOptions",
      "/properties/ValidationMethod",
      "/properties/KeyAlgorithm",
      "/properties/DomainName",
      "/properties/CertificateAuthorityArn",
    ],
    writeOnlyProperties: [],
    outputs: {
      Id: {
        schema: {
          type: "string",
        },
        schemaPath: "/properties/Id",
        valuePath: "/Id",
        required: false,
      },
    },
  },
];
