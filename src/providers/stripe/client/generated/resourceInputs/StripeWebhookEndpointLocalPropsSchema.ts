// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";

export type StripeWebhookEndpointLocalProps = { readonly rotationKey?: string };

export const StripeWebhookEndpointLocalPropsSchema = Schema.Struct({
  rotationKey: Schema.optionalKey(Schema.String),
});
