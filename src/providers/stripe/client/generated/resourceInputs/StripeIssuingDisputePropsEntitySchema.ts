// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeIssuingDisputeResourceSchema } from "./StripeIssuingDisputePropsSchema.js";
import { StripeResourceEntityInputAlternatives_41 } from "./StripeResourceEntityInputAlternatives_41.js";
import { StripeResourceEntityInputAlternatives_43 } from "./StripeResourceEntityInputAlternatives_43.js";
import { StripeResourceEntityInputAlternatives_48 } from "./StripeResourceEntityInputAlternatives_48.js";
import { StripeResourceEntityInputAlternatives_50 } from "./StripeResourceEntityInputAlternatives_50.js";
import { StripeResourceEntityInputAlternatives_52 } from "./StripeResourceEntityInputAlternatives_52.js";
import { StripeResourceEntityInputAlternatives_54 } from "./StripeResourceEntityInputAlternatives_54.js";
import { StripeResourceEntityInputAlternatives_56 } from "./StripeResourceEntityInputAlternatives_56.js";
import { StripeResourceEntityInputAlternatives_58 } from "./StripeResourceEntityInputAlternatives_58.js";

export type StripeIssuingDisputePropsEntity = {
  readonly amount?: number;
  readonly evidence?: {
    readonly canceled?: StripeResourceEntityInputAlternatives_41;
    readonly duplicate?: StripeResourceEntityInputAlternatives_43;
    readonly fraudulent?: StripeResourceEntityInputAlternatives_48;
    readonly merchandise_not_as_described?: StripeResourceEntityInputAlternatives_50;
    readonly no_valid_authorization?: StripeResourceEntityInputAlternatives_52;
    readonly not_received?: StripeResourceEntityInputAlternatives_54;
    readonly other?: StripeResourceEntityInputAlternatives_56;
    readonly reason?:
      | "canceled"
      | "duplicate"
      | "fraudulent"
      | "merchandise_not_as_described"
      | "no_valid_authorization"
      | "not_received"
      | "other"
      | "service_not_as_described";
    readonly service_not_as_described?: StripeResourceEntityInputAlternatives_58;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_41
      | StripeResourceEntityInputAlternatives_43
      | StripeResourceEntityInputAlternatives_48
      | StripeResourceEntityInputAlternatives_50
      | StripeResourceEntityInputAlternatives_52
      | StripeResourceEntityInputAlternatives_54
      | StripeResourceEntityInputAlternatives_56
      | StripeResourceEntityInputAlternatives_58;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly transaction?: string;
  readonly treasury?: { readonly received_debit: string } & {
    readonly [x: string]: Schema.Json;
  };
};

export const StripeIssuingDisputePropsEntitySchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The dispute amount in the card's currency and in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). If not set, defaults to the full transaction amount.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    evidence: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          canceled: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_41,
          ),
          duplicate: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_43,
          ),
          fraudulent: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_48,
          ),
          merchandise_not_as_described: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_50,
          ),
          no_valid_authorization: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_52,
          ),
          not_received: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_54,
          ),
          other: Schema.optionalKey(StripeResourceEntityInputAlternatives_56),
          reason: Schema.optionalKey(
            Schema.Literals([
              "canceled",
              "duplicate",
              "fraudulent",
              "merchandise_not_as_described",
              "no_valid_authorization",
              "not_received",
              "other",
              "service_not_as_described",
            ]),
          ),
          service_not_as_described: Schema.optionalKey(
            StripeResourceEntityInputAlternatives_58,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputAlternatives_41,
              StripeResourceEntityInputAlternatives_43,
              StripeResourceEntityInputAlternatives_48,
              StripeResourceEntityInputAlternatives_50,
              StripeResourceEntityInputAlternatives_52,
              StripeResourceEntityInputAlternatives_54,
              StripeResourceEntityInputAlternatives_56,
              StripeResourceEntityInputAlternatives_58,
            ]),
          ),
        ],
      ).annotate({
        title: "evidence_param",
        description: "Evidence provided for the dispute.",
      }),
    ),
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "Specifies which fields in the response should be expanded.",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    transaction: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the issuing transaction to create a dispute for. For transaction on Treasury FinancialAccounts, use `treasury.received_debit`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    treasury: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          received_debit: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "treasury_param",
        description:
          "Params for disputes related to Treasury FinancialAccounts",
      }),
    ),
  }),
  StripeIssuingDisputeResourceSchema,
);
