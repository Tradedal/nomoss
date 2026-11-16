// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeBillingPortalConfigurationResourceSchema } from "./StripeBillingPortalConfigurationPropsSchema.js";
import { StripeResourceEntityInputProperties_6 } from "./StripeResourceEntityInputProperties_6.js";
import { StripeResourceEntityInputProperties_8 } from "./StripeResourceEntityInputProperties_8.js";

export type StripeBillingPortalConfigurationPropsEntity = {
  readonly business_profile?: {
    readonly headline?: string | "";
    readonly privacy_policy_url?: string;
    readonly terms_of_service_url?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly default_return_url?: string | "";
  readonly expand?: ReadonlyArray<string>;
  readonly features: {
    readonly customer_update?: {
      readonly allowed_updates?:
        | ReadonlyArray<
            "address" | "email" | "name" | "phone" | "shipping" | "tax_id"
          >
        | "";
      readonly enabled: boolean;
    } & { readonly [x: string]: Schema.Json };
    readonly invoice_history?: { readonly enabled: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly payment_method_update?: {
      readonly enabled: boolean;
      readonly payment_method_configuration?: string | "";
    } & { readonly [x: string]: Schema.Json };
    readonly subscription_cancel?: StripeResourceEntityInputProperties_6;
    readonly subscription_pause?: {
      readonly duration?: {
        readonly interval_options?:
          | ReadonlyArray<
              {
                readonly interval: "day" | "month" | "week" | "year";
                readonly interval_count?: number;
              } & { readonly [x: string]: Schema.Json }
            >
          | "";
        readonly type: "indefinite" | "interval_options";
      } & { readonly [x: string]: Schema.Json };
      readonly enabled?: boolean;
    } & { readonly [x: string]: Schema.Json };
    readonly subscription_update?: StripeResourceEntityInputProperties_8;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_6
      | StripeResourceEntityInputProperties_8;
  };
  readonly login_page?: { readonly enabled: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string | "";
};

export const StripeBillingPortalConfigurationPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      business_profile: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            headline: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(60).annotate({
                    expected: "a string with at most 60 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
            privacy_policy_url: Schema.optionalKey(Schema.String),
            terms_of_service_url: Schema.optionalKey(Schema.String),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "business_profile_create_param",
          description:
            "The business information shown to customers in the portal.",
        }),
      ),
      default_return_url: Schema.optionalKey(
        Schema.Union([Schema.String, Schema.Literal("")]).annotate({
          description:
            "The default URL to redirect customers to when they click on the portal's link to return to your website. This can be [overridden](https://docs.stripe.com/api/customer_portal/sessions/create#create_portal_session-return_url) when creating the session.",
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
      features: Schema.StructWithRest(
        Schema.Struct({
          customer_update: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                allowed_updates: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.Literals([
                        "address",
                        "email",
                        "name",
                        "phone",
                        "shipping",
                        "tax_id",
                      ]),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                enabled: Schema.Boolean,
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "customer_update_creation_param" }),
          ),
          invoice_history: Schema.optionalKey(
            Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ]).annotate({ title: "invoice_list_param" }),
          ),
          payment_method_update: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                payment_method_configuration: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "payment_method_update_param" }),
          ),
          subscription_cancel: Schema.optionalKey(
            StripeResourceEntityInputProperties_6,
          ),
          subscription_pause: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                duration: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      interval_options: Schema.optionalKey(
                        Schema.Union([
                          Schema.Array(
                            Schema.StructWithRest(
                              Schema.Struct({
                                interval: Schema.Literals([
                                  "day",
                                  "month",
                                  "week",
                                  "year",
                                ]),
                                interval_count: Schema.optionalKey(Schema.Int),
                              }),
                              [
                                Schema.Record(
                                  Schema.String,
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({
                              title: "subscription_pause_interval_option_param",
                            }),
                          ),
                          Schema.Literal(""),
                        ]),
                      ),
                      type: Schema.Literals(["indefinite", "interval_options"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "subscription_pause_duration_param" }),
                ),
                enabled: Schema.optionalKey(Schema.Boolean),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "subscription_pause_param" }),
          ),
          subscription_update: Schema.optionalKey(
            StripeResourceEntityInputProperties_8,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Union([
              ResourceInputJsonSchema,
              StripeResourceEntityInputProperties_6,
              StripeResourceEntityInputProperties_8,
            ]),
          ),
        ],
      ).annotate({
        title: "features_creation_param",
        description: "Information about the features available in the portal.",
      }),
      login_page: Schema.optionalKey(
        Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ]).annotate({
          title: "login_page_create_param",
          description:
            "The hosted login page for this configuration. Learn more about the portal login page in our [integration docs](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal#share).",
        }),
      ),
      metadata: Schema.optionalKey(
        Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
        }),
      ),
      name: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(256).annotate({
              expected: "a string with at most 256 code points",
            }),
          ),
          Schema.Literal(""),
        ]).annotate({ description: "The name of the configuration." }),
      ),
    }),
    StripeBillingPortalConfigurationResourceSchema,
  );
