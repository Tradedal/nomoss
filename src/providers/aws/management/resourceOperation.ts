import { Effect, Schema, SchemaGetter } from "effect";
import type {
  AwsJsonRpcPayload,
  AwsOperation,
} from "../client/awsClientModel.js";

type Operation<Input, Output, Encoded = unknown> = AwsOperation & {
  readonly input: Schema.Codec<Input, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<Output, Encoded>;
};

/**
 * The resourceRequest function lets callers pass resource properties to a
 * generated AWS operation. Encoding translates the properties into AWS
 * fields and validates them against the original request schema.
 *
 * @see ../../../../../command-options-fund/refs/effect-website/apps/web/src/content/docs/v4/schema/transformations.mdx#understanding-input-and-output
 */
export const resourceRequest = <Input, NativeInput, Output, Encoded>(
  operation: Operation<NativeInput, Output, Encoded>,
  codec: Schema.Codec<Input, NoInfer<NativeInput>>,
) => ({
  ...operation,
  input: operation.input.pipe(
    Schema.decodeTo(codec, {
      decode: SchemaGetter.forbidden(
        () => "Use the native schema to decode an AWS request",
      ),
      encode: SchemaGetter.passthrough(),
    }),
  ),
});

/**
 * The resourceResponse function validates the full AWS reply before
 * projecting resource outputs. The projection can require an identity that
 * the AWS response model marks optional. The operation fails if AWS omits
 * that identity.
 *
 * @see ../../../../../command-options-fund/refs/effect-website/apps/web/src/content/docs/v4/schema/transformations.mdx#understanding-input-and-output
 */
export const resourceResponse = <Input, NativeOutput, Encoded, Output, Fields>(
  operation: Operation<Input, NativeOutput, Encoded>,
  codec: Schema.Codec<Output, Fields>,
) => ({
  ...operation,
  output: operation.output.pipe(
    Schema.decodeTo(Schema.toType(codec), {
      decode: SchemaGetter.transformEffect((value: NativeOutput) =>
        Schema.decodeUnknownEffect(codec)(value).pipe(
          Effect.mapError((failure) => failure.issue),
        ),
      ),
      encode: SchemaGetter.forbiddenEncoding,
    }),
  ),
});
