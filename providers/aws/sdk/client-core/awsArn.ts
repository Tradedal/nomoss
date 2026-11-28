import { Schema, SchemaTransformation } from "effect";

/**
 * The arnLabel pattern accepts a partition or service label such as
 * "aws-us-gov" or "sts". A colon in "aws:sts" would end one ARN field and
 * start another, so the pattern rejects it.
 */
const arnLabel = /^[a-z0-9][a-z0-9-]*$/;

/**
 * The accountIdPattern regular expression requires twelve AWS account digits. It
 * accepts "123456789012" and rejects "12345", which cannot name an account.
 */
const accountIdPattern = /^\d{12}$/;

const label = Schema.String.check(Schema.isPattern(arnLabel));

/** The AwsAccountId schema distinguishes the AWS account number from a role or session ID. */
export const AwsAccountId = Schema.String.check(
  Schema.isPattern(accountIdPattern),
).pipe(Schema.brand("AwsAccountId"));
export type AwsAccountId = typeof AwsAccountId.Type;

/** The AwsPartition schema identifies the AWS partition in an ARN, such as aws-cn. */
export const AwsPartition = label.pipe(Schema.brand("AwsPartition"));
export type AwsPartition = typeof AwsPartition.Type;

/** The AwsRegionName schema requires a concrete region for an AWS client configuration. */
export const AwsRegionName = label.pipe(Schema.brand("AwsRegionName"));
export type AwsRegionName = typeof AwsRegionName.Type;

/** The AwsArnComponents schema keeps an ARN's resource suffix intact across a parse and format. */
export const AwsArnComponents = Schema.Struct({
  partition: AwsPartition,
  service: label.pipe(Schema.brand("AwsServiceName")),
  region: Schema.Union([Schema.Literal(""), AwsRegionName]),
  account: Schema.Union([Schema.Literal(""), AwsAccountId]),
  resource: Schema.NonEmptyString.pipe(Schema.brand("AwsResourceName")),
});
export type AwsArnComponents = typeof AwsArnComponents.Type;

const fields = AwsArnComponents.fields;

const arnParts = [
  "arn:",
  fields.partition,
  ":",
  fields.service,
  ":",
  fields.region,
  ":",
  fields.account,
  ":",
  fields.resource,
] as const;

/** The AwsArn schema brands a complete AWS identifier for callers that pass it as text. */
export const AwsArn = Schema.TemplateLiteral(arnParts).pipe(
  Schema.brand("AwsArn"),
);
export type AwsArn = typeof AwsArn.Type;

/**
 * The AwsArnFromString codec reads and formats a concrete AWS identifier. IAM and
 * STS can use an empty region, and an S3 bucket ARN has an empty account.
 * The resource keeps its own separators, so a Lambda version suffix
 * remains part of the resource instead of a separate ARN field.
 *
 * @see ../../../../refs/aws-cdk/packages/aws-cdk-lib/core/lib/arn.ts (Arn.format and split)
 * @see ../../../../refs/effect/packages/effect/src/Schema.ts (TemplateLiteralParser and decodeTo)
 */
export const AwsArnFromString = Schema.TemplateLiteralParser(arnParts).pipe(
  Schema.decodeTo(
    Schema.toType(AwsArnComponents),
    SchemaTransformation.transform({
      decode: ([, partition, , service, , region, , account, , resource]) => ({
        partition,
        service,
        region,
        account,
        resource,
      }),
      encode: ({ partition, service, region, account, resource }) => [
        "arn:",
        partition,
        ":",
        service,
        ":",
        region,
        ":",
        account,
        ":",
        resource,
      ],
    }),
  ),
);
