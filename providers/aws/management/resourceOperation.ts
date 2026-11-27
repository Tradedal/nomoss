import type {
  AwsJsonRpcPayload,
  AwsOperation,
} from "@tradedal/aws-client-core/model";
import {
  Effect,
  RegExp as Regex,
  Schema,
  SchemaGetter,
  SchemaTransformation,
  String as Str,
} from "effect";

type Operation<Input, Output, Encoded = unknown> = AwsOperation & {
  readonly input: Schema.Codec<Input, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<Output, Encoded>;
};

/**
 * The awsJsonDocument schema gives lifecycle reads a policy object whether
 * IAM returns plain JSON text or URI-encoded text. A stack can then compare
 * the document's contents with the declaration. The GetRolePolicy model
 * describes these response formats.
 *
 * @see ../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (GetRolePolicy)
 */
export const awsJsonDocument = Schema.Union([
  Schema.fromJsonString(Schema.JsonObject),
  Schema.StringFromUriComponent.pipe(
    Schema.decodeTo(Schema.fromJsonString(Schema.JsonObject)),
  ),
]);

/**
 * The awsJsonDocumentInput codec accepts a JSON object or a string from an
 * IAM policy declaration. IAM receives text in either case. If the request
 * codec reads valid JSON object text back, the lifecycle has an object it
 * can compare with the current policy.
 *
 * @see ../../../refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-role.json (AssumeRolePolicyDocument)
 * @see ../../../refs/effect/packages/effect/src/Schema.ts (Union and fromJsonString)
 */
export const awsJsonDocumentInput = Schema.Union([
  Schema.fromJsonString(Schema.JsonObject),
  Schema.String,
]);

/**
 * The awsJsonDocumentValue schema accepts an object or JSON object text from
 * a policy declaration. A lifecycle compares the document as an object so a
 * difference in whitespace does not trigger an IAM write.
 */
export const awsJsonDocumentValue = Schema.Union([
  Schema.JsonObject,
  Schema.fromJsonString(Schema.JsonObject),
]);

/**
 * The relationshipValueCodec function lets a declaration refer to a related
 * resource by its bare ID. For an API Gateway target, both "abc" and
 * "integrations/abc" produce the AWS value "integrations/abc". The codec
 * returns "abc" from that value so the lifecycle can compare the target
 * with the integration's ID.
 *
 * @see ../../../refs/effect/packages/effect/src/Schema.ts (decodeTo)
 */
export const relationshipValueCodec = (prefix: string) => {
  // The leadingPrefix pattern matches the literal prefix at the start of
  // the value. For "integrations/", the codec turns "integrations/abc" into
  // "abc" and leaves "xintegrations/abc" intact.
  // See ../../../refs/effect/packages/effect/src/RegExp.ts (escape).
  const leadingPrefix = new RegExp(`^${Regex.escape(prefix)}`);
  const bareId = Str.replace(leadingPrefix, "");

  return Schema.String.pipe(
    Schema.decodeTo(
      Schema.String,
      SchemaTransformation.transform({
        decode: bareId,
        encode: (value) => prefix + bareId(value),
      }),
    ),
  );
};

/**
 * The resourceRequest function lets a caller supply names from a stack
 * declaration to a generated AWS operation. The mapping translates those
 * names, and the generated request schema still checks the native request
 * before the client sends it.
 *
 * @see ../../../refs/effect/packages/effect/src/Schema.ts (decodeTo)
 */
export const resourceRequest = <Input, NativeInput, Output, Encoded>(
  operation: Operation<NativeInput, Output, Encoded>,
  codec: Schema.Codec<Input, NoInfer<NativeInput>>,
) => {
  const input = operation.input.pipe(Schema.decodeTo(codec));

  return { ...operation, input };
};

/**
 * The resourceResponse function lets a command require a provider value that
 * the generated response schema permits AWS to omit. The generated schema
 * checks the reply first. If the selected fields lack a required value such
 * as the resource ID, the command fails before the stack can save the result.
 *
 * @see ../../../refs/effect/packages/effect/src/Schema.ts (decodeTo)
 */
export const resourceResponse = <Input, NativeOutput, Encoded, Output, Fields>(
  operation: Operation<Input, NativeOutput, Encoded>,
  codec: Schema.Codec<Output, Fields>,
  select: (
    response: NativeOutput,
  ) => NativeOutput | Schema.JsonObject | undefined = (response) => response,
) => {
  const decode = SchemaGetter.transformEffect((response: NativeOutput) => {
    const selected = select(response);

    return Schema.decodeUnknownEffect(codec)(selected).pipe(
      Effect.mapError((failure) => failure.issue),
    );
  });

  const output = operation.output.pipe(
    Schema.decodeTo(Schema.toType(codec), {
      decode,
      encode: SchemaGetter.forbiddenEncoding,
    }),
  );

  return { ...operation, output };
};
