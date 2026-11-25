// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputProperties_7 } from "./StripeResourceEntityInputProperties_7.js";

export type StripeResourceEntityInputProperties_6 = {
  readonly cancellation_reason?: StripeResourceEntityInputProperties_7;
  readonly enabled: boolean;
  readonly mode?: "at_period_end" | "immediately";
  readonly proration_behavior?: "always_invoice" | "create_prorations" | "none";
} & {
  readonly [x: string]:
    | ResourceInputJson
    | StripeResourceEntityInputProperties_7;
};

export const StripeResourceEntityInputProperties_6 = Schema.StructWithRest(
  Schema.Struct({
    cancellation_reason: Schema.optionalKey(
      StripeResourceEntityInputProperties_7,
    ),
    enabled: Schema.Boolean,
    mode: Schema.optionalKey(Schema.Literals(["at_period_end", "immediately"])),
    proration_behavior: Schema.optionalKey(
      Schema.Literals(["always_invoice", "create_prorations", "none"]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Union([
        ResourceInputJsonSchema,
        StripeResourceEntityInputProperties_7,
      ]),
    ),
  ],
).annotate({ title: "subscription_cancel_creation_param" });
