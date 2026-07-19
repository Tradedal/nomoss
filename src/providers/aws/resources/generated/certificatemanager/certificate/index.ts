import { Context, Effect, Layer, Schema } from "effect";

import {
  annotateResourceSchema,
  CloudFormationPropertyReferencesAnnotationId,
  ResourceOutputRefSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../../core/model.js";

import type { ResourceCommand } from "../../../../../../core/lifecycle.js";

import type { ResourceCommandPolicy } from "../../../../../../core/resourceCommandPolicy.js";

import type { ResourceKey } from "../../../../../../core/model.js";

import { ResourceGraphBuilder } from "../../../../../../core/resourceGraphBuilder.js";

import { providerCommandPolicyTag } from "../../../../../../providers/resourceCommandPolicyLayer.js";

const DomainValidationOption = Schema.Struct({
  DomainName: Schema.String,
  ValidationDomain: Schema.optionalKey(Schema.String),
  HostedZoneId: Schema.optionalKey(Schema.String),
});

const Tag = Schema.Struct({ Value: Schema.String, Key: Schema.String });

const CertificatePropsSource = Schema.Struct({
  CertificateAuthorityArn: Schema.optionalKey(Schema.String),
  CertificateExport: Schema.optionalKey(Schema.String),
  DomainValidationOptions: Schema.optionalKey(
    Schema.Array(DomainValidationOption).check(Schema.isUnique()),
  ),
  CertificateTransparencyLoggingPreference: Schema.optionalKey(Schema.String),
  DomainName: Schema.optionalKey(Schema.String),
  ValidationMethod: Schema.optionalKey(Schema.String),
  SubjectAlternativeNames: Schema.optionalKey(
    Schema.Array(Schema.String).check(Schema.isUnique()),
  ),
  Tags: Schema.optionalKey(Schema.Array(Tag).check(Schema.isUnique())),
  KeyAlgorithm: Schema.optionalKey(Schema.String),
});

const CertificateOutputsSource = Schema.Struct({
  Id: Schema.optionalKey(Schema.String),
});

export const CertificateResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "certificatemanager",
  resource: "certificate",
  operation: "create",
  stateSecretOutputKeys: [],
});

export const CertificatePropsSchema = annotateResourceSchema(
  CertificatePropsSource,
  CertificateResourceSchema,
);

export const CertificateOutputsSchema = CertificateOutputsSource;

export type CertificateProps = Schema.Schema.Type<
  typeof CertificatePropsSchema
>;

export type CertificateOutputs = Schema.Schema.Type<
  typeof CertificateOutputsSchema
>;

export type CertificateLifecycle = {
  readonly resolvePendingOutputs: (input: {
    readonly key: ResourceKey;
    readonly props: CertificateProps;
  }) => ReturnType<(typeof CertificateOutputsSchema)["makeEffect"]>;
  readonly execute: (
    command: ResourceCommand,
  ) => ReturnType<(typeof ResourceCommandPolicy)["Service"]["execute"]>;
};

export const CertificateLifecycleService = Context.Service<
  CertificateLifecycle,
  CertificateLifecycle
>("nomoss/providers/aws/generated/certificatemanager/certificate/lifecycle");

export const registerCertificate = Effect.fn("Certificate.register")(
  function* (input: {
    readonly key: ResourceKey;
    readonly props: CertificateProps;
  }) {
    const graph = yield* ResourceGraphBuilder;
    const lifecycle = yield* CertificateLifecycleService;
    const graphResource = yield* graph.resource(input.key);
    const resourceProps = yield* CertificatePropsSchema.makeEffect(input.props);
    const resourceOutputs = yield* lifecycle.resolvePendingOutputs({
      key: input.key,
      props: resourceProps,
    });
    yield* graphResource.register({
      propsSchema: CertificatePropsSchema,
      outputsSchema: CertificateOutputsSchema,
      props: resourceProps,
      outputs: resourceOutputs,
    });
    return { key: input.key, props: resourceProps, outputs: resourceOutputs };
  },
);

export const CertificateResourceCommandPolicyLayer = Layer.unwrap(
  Effect.map(CertificateLifecycleService, (lifecycle) =>
    Layer.succeed(providerCommandPolicyTag(CertificateResourceSchema), {
      execute: lifecycle.execute,
    }),
  ),
);
