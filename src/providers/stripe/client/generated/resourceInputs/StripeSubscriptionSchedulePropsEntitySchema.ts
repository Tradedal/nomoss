// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_77 } from "./StripeResourceEntityInputAlternatives_77.js";
import { StripeResourceEntityInputAlternatives_80 } from "./StripeResourceEntityInputAlternatives_80.js";
import { StripeResourceEntityInputAlternatives_81 } from "./StripeResourceEntityInputAlternatives_81.js";
import { StripeResourceEntityInputAlternatives_87 } from "./StripeResourceEntityInputAlternatives_87.js";
import { StripeResourceEntityInputAlternatives_88 } from "./StripeResourceEntityInputAlternatives_88.js";
import { StripeResourceEntityInputAlternatives_97 } from "./StripeResourceEntityInputAlternatives_97.js";
import { StripeResourceEntityInputItems_3 } from "./StripeResourceEntityInputItems_3.js";
import { StripeResourceEntityInputItems_5 } from "./StripeResourceEntityInputItems_5.js";
import { StripeResourceEntityInputProperties_25 } from "./StripeResourceEntityInputProperties_25.js";
import { StripeResourceEntityInputProperties_27 } from "./StripeResourceEntityInputProperties_27.js";
import { StripeResourceEntityInputProperties_29 } from "./StripeResourceEntityInputProperties_29.js";
import { StripeResourceEntityInputProperties_31 } from "./StripeResourceEntityInputProperties_31.js";
import { StripeResourceEntityInputProperties_33 } from "./StripeResourceEntityInputProperties_33.js";
import { StripeSubscriptionScheduleResourceSchema } from "./StripeSubscriptionSchedulePropsSchema.js";

export type StripeSubscriptionSchedulePropsEntity = {
  readonly billing_mode?: {
    readonly flexible?: {
      readonly proration_discounts?: "included" | "itemized";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "classic" | "flexible";
  } & { readonly [x: string]: Schema.Json };
  readonly customer?: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "customer";
  }>;
  readonly customer_account?: string;
  readonly default_settings?: {
    readonly application_fee_percent?: number;
    readonly automatic_tax?: StripeResourceEntityInputProperties_25;
    readonly billing_cycle_anchor?: "automatic" | "phase_start";
    readonly billing_thresholds?:
      | ({
          readonly amount_gte?: number;
          readonly reset_billing_cycle_anchor?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly collection_method?: "charge_automatically" | "send_invoice";
    readonly default_payment_method?: StripeResourceEntityInputAlternatives_77;
    readonly description?: string | "";
    readonly invoice_settings?: StripeResourceEntityInputProperties_27;
    readonly on_behalf_of?: StripeResourceEntityInputAlternatives_80;
    readonly transfer_data?: StripeResourceEntityInputAlternatives_81;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputProperties_25
      | StripeResourceEntityInputAlternatives_77
      | StripeResourceEntityInputProperties_27
      | StripeResourceEntityInputAlternatives_80
      | StripeResourceEntityInputAlternatives_81;
  };
  readonly end_behavior?: "cancel" | "none" | "release" | "renew";
  readonly expand?: ReadonlyArray<string>;
  readonly from_subscription?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly pause_schedules?: ReadonlyArray<
    {
      readonly key?: string;
      readonly pause?: {
        readonly pause_at: {
          readonly timestamp?: number;
          readonly type: "now" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly settings?: {
          readonly bill_for?: {
            readonly outstanding_usage_through?: {
              readonly type?: "none" | "pause_at";
            } & { readonly [x: string]: Schema.Json };
            readonly unused_time_from?: {
              readonly type?: "item_current_period_start" | "none" | "pause_at";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly invoicing_behavior?: "invoice" | "pending_invoice_item";
          readonly type?: "subscription";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly resume?: {
        readonly resume_at: {
          readonly duration?: {
            readonly interval: "day" | "month" | "week" | "year";
            readonly interval_count?: number;
          } & { readonly [x: string]: Schema.Json };
          readonly timestamp?: number;
          readonly type: "duration" | "now" | "timestamp";
        } & { readonly [x: string]: Schema.Json };
        readonly settings?: {
          readonly billing_cycle_anchor?: "resume_at" | "unchanged";
          readonly payment_behavior?:
            | "resume_on_payment_attempt"
            | "resume_on_payment_success";
          readonly proration_behavior?:
            | "always_invoice"
            | "create_prorations"
            | "none";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly phases?: ReadonlyArray<
    {
      readonly add_invoice_items?: StripeResourceEntityInputItems_3;
      readonly application_fee_percent?: number;
      readonly automatic_tax?: StripeResourceEntityInputProperties_29;
      readonly billing_cycle_anchor?: "automatic" | "phase_start";
      readonly billing_thresholds?:
        | ({
            readonly amount_gte?: number;
            readonly reset_billing_cycle_anchor?: boolean;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly collection_method?: "charge_automatically" | "send_invoice";
      readonly currency?: string;
      readonly default_payment_method?: StripeResourceEntityInputAlternatives_87;
      readonly default_tax_rates?: ReadonlyArray<string> | "";
      readonly description?: string | "";
      readonly discounts?: StripeResourceEntityInputAlternatives_88;
      readonly duration?: {
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly end_date?: number;
      readonly invoice_settings?: StripeResourceEntityInputProperties_31;
      readonly items: StripeResourceEntityInputItems_5;
      readonly metadata?: { readonly [x: string]: string };
      readonly on_behalf_of?: StripeResourceEntityInputAlternatives_97;
      readonly proration_behavior?:
        | "always_invoice"
        | "create_prorations"
        | "none";
      readonly transfer_data?: StripeResourceEntityInputProperties_33;
      readonly trial?: boolean;
      readonly trial_end?: number;
    } & {
      readonly [x: string]:
        | ResourceInputJson
        | StripeResourceEntityInputItems_3
        | StripeResourceEntityInputProperties_29
        | StripeResourceEntityInputAlternatives_87
        | StripeResourceEntityInputAlternatives_88
        | StripeResourceEntityInputProperties_31
        | StripeResourceEntityInputItems_5
        | StripeResourceEntityInputAlternatives_97
        | StripeResourceEntityInputProperties_33;
    }
  >;
  readonly start_date?: number | "now";
};

export const StripeSubscriptionSchedulePropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      billing_mode: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            flexible: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  proration_discounts: Schema.optionalKey(
                    Schema.Literals(["included", "itemized"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "flexible_params" }),
            ),
            type: Schema.Literals(["classic", "flexible"]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          title: "billing_mode",
          description:
            "Controls how prorations and invoices for subscriptions are calculated and orchestrated.",
        }),
      ),
      customer: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            ResourceReferenceSchema(
              Schema.Struct({
                provider: Schema.Literal("stripe"),
                service: Schema.Literal("billing"),
                resource: Schema.Literal("customer"),
              }),
              {
                value: null,
                outputs: [
                  {
                    source: ["CustomerId"],
                    target: [],
                  },
                ],
              },
            ).annotate({ expected: "ResourceEntity" }),
          ]),
        ]),
      ),
      customer_account: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The identifier of the account to create the subscription schedule for.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      default_settings: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            application_fee_percent: Schema.optionalKey(Schema.Finite),
            automatic_tax: Schema.optionalKey(
              StripeResourceEntityInputProperties_25,
            ),
            billing_cycle_anchor: Schema.optionalKey(
              Schema.Literals(["automatic", "phase_start"]),
            ),
            billing_thresholds: Schema.optionalKey(
              Schema.Union([
                Schema.StructWithRest(
                  Schema.Struct({
                    amount_gte: Schema.optionalKey(Schema.Int),
                    reset_billing_cycle_anchor: Schema.optionalKey(
                      Schema.Boolean,
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "billing_thresholds_param" }),
                Schema.Literal(""),
              ]),
            ),
            collection_method: Schema.optionalKey(
              Schema.Literals(["charge_automatically", "send_invoice"]),
            ),
            default_payment_method: Schema.optionalKey(
              StripeResourceEntityInputAlternatives_77,
            ),
            description: Schema.optionalKey(
              Schema.Union([
                Schema.String.check(
                  Schema.isMaxCodePoints(500).annotate({
                    expected: "a string with at most 500 code points",
                  }),
                ),
                Schema.Literal(""),
              ]),
            ),
            invoice_settings: Schema.optionalKey(
              StripeResourceEntityInputProperties_27,
            ),
            on_behalf_of: Schema.optionalKey(
              StripeResourceEntityInputAlternatives_80,
            ),
            transfer_data: Schema.optionalKey(
              StripeResourceEntityInputAlternatives_81,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputProperties_25,
                StripeResourceEntityInputAlternatives_77,
                StripeResourceEntityInputProperties_27,
                StripeResourceEntityInputAlternatives_80,
                StripeResourceEntityInputAlternatives_81,
              ]),
            ),
          ],
        ).annotate({
          title: "default_settings_params",
          description:
            "Object representing the subscription schedule's default settings.",
        }),
      ),
      end_behavior: Schema.optionalKey(
        Schema.Literals(["cancel", "none", "release", "renew"]).annotate({
          description:
            "Behavior of the subscription schedule and underlying subscription when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running. `cancel` will end the subscription schedule and cancel the underlying subscription.",
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
      from_subscription: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Migrate an existing subscription to be managed by a subscription schedule. If this parameter is set, a subscription schedule will be created using the subscription's item(s), set to auto-renew using the subscription's interval. When using this parameter, other parameters (such as phase values) cannot be set. To create a subscription schedule with other modifications, we recommend making two separate API calls.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      metadata: Schema.optionalKey(
        Schema.Union([
          Schema.Record(Schema.String, Schema.String),
          Schema.Literal(""),
        ]).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
        }),
      ),
      pause_schedules: Schema.optionalKey(
        Schema.Array(
          Schema.StructWithRest(
            Schema.Struct({
              key: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(40).annotate({
                    expected: "a string with at most 40 code points",
                  }),
                ),
              ),
              pause: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    pause_at: Schema.StructWithRest(
                      Schema.Struct({
                        timestamp: Schema.optionalKey(
                          Schema.Number.annotate({ format: "unix-time" }).check(
                            Schema.isInt().annotate({ expected: "an integer" }),
                          ),
                        ),
                        type: Schema.Literals(["now", "timestamp"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "pause_at_params" }),
                    settings: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          bill_for: Schema.optionalKey(
                            Schema.StructWithRest(
                              Schema.Struct({
                                outstanding_usage_through: Schema.optionalKey(
                                  Schema.StructWithRest(
                                    Schema.Struct({
                                      type: Schema.optionalKey(
                                        Schema.Literals(["none", "pause_at"]),
                                      ),
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
                                    title:
                                      "pause_settings_bill_for_outstanding_usage_through_params",
                                  }),
                                ),
                                unused_time_from: Schema.optionalKey(
                                  Schema.StructWithRest(
                                    Schema.Struct({
                                      type: Schema.optionalKey(
                                        Schema.Literals([
                                          "item_current_period_start",
                                          "none",
                                          "pause_at",
                                        ]),
                                      ),
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
                                    title:
                                      "pause_settings_bill_for_unused_time_from_params",
                                  }),
                                ),
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
                              title: "pause_settings_bill_for_params",
                            }),
                          ),
                          invoicing_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "invoice",
                              "pending_invoice_item",
                            ]),
                          ),
                          type: Schema.optionalKey(
                            Schema.Literal("subscription"),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "pause_settings_params" }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "pause_schedule_create_pause_params" }),
              ),
              resume: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    resume_at: Schema.StructWithRest(
                      Schema.Struct({
                        duration: Schema.optionalKey(
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
                          ).annotate({ title: "resume_at_duration_params" }),
                        ),
                        timestamp: Schema.optionalKey(
                          Schema.Number.annotate({ format: "unix-time" }).check(
                            Schema.isInt().annotate({ expected: "an integer" }),
                          ),
                        ),
                        type: Schema.Literals(["duration", "now", "timestamp"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "resume_at_params" }),
                    settings: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          billing_cycle_anchor: Schema.optionalKey(
                            Schema.Literals(["resume_at", "unchanged"]),
                          ),
                          payment_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "resume_on_payment_attempt",
                              "resume_on_payment_success",
                            ]),
                          ),
                          proration_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "always_invoice",
                              "create_prorations",
                              "none",
                            ]),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "resume_settings_params" }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "pause_schedule_create_resume_params" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "pause_schedules_create_params" }),
        ).annotate({
          description:
            "Configures the subscription's pause behavior and, optionally, its resume behavior. Only one entry is supported.",
        }),
      ),
      phases: Schema.optionalKey(
        Schema.Array(
          Schema.StructWithRest(
            Schema.Struct({
              add_invoice_items: Schema.optionalKey(
                StripeResourceEntityInputItems_3,
              ),
              application_fee_percent: Schema.optionalKey(Schema.Finite),
              automatic_tax: Schema.optionalKey(
                StripeResourceEntityInputProperties_29,
              ),
              billing_cycle_anchor: Schema.optionalKey(
                Schema.Literals(["automatic", "phase_start"]),
              ),
              billing_thresholds: Schema.optionalKey(
                Schema.Union([
                  Schema.StructWithRest(
                    Schema.Struct({
                      amount_gte: Schema.optionalKey(Schema.Int),
                      reset_billing_cycle_anchor: Schema.optionalKey(
                        Schema.Boolean,
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "billing_thresholds_param" }),
                  Schema.Literal(""),
                ]),
              ),
              collection_method: Schema.optionalKey(
                Schema.Literals(["charge_automatically", "send_invoice"]),
              ),
              currency: Schema.optionalKey(
                Schema.String.annotate({ format: "currency" }),
              ),
              default_payment_method: Schema.optionalKey(
                StripeResourceEntityInputAlternatives_87,
              ),
              default_tax_rates: Schema.optionalKey(
                Schema.Union([
                  Schema.Array(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              description: Schema.optionalKey(
                Schema.Union([
                  Schema.String.check(
                    Schema.isMaxCodePoints(500).annotate({
                      expected: "a string with at most 500 code points",
                    }),
                  ),
                  Schema.Literal(""),
                ]),
              ),
              discounts: Schema.optionalKey(
                StripeResourceEntityInputAlternatives_88,
              ),
              duration: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    interval: Schema.Literals(["day", "month", "week", "year"]),
                    interval_count: Schema.optionalKey(Schema.Int),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "duration_params" }),
              ),
              end_date: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              invoice_settings: Schema.optionalKey(
                StripeResourceEntityInputProperties_31,
              ),
              items: StripeResourceEntityInputItems_5,
              metadata: Schema.optionalKey(
                Schema.Record(Schema.String, Schema.String),
              ),
              on_behalf_of: Schema.optionalKey(
                StripeResourceEntityInputAlternatives_97,
              ),
              proration_behavior: Schema.optionalKey(
                Schema.Literals([
                  "always_invoice",
                  "create_prorations",
                  "none",
                ]),
              ),
              transfer_data: Schema.optionalKey(
                StripeResourceEntityInputProperties_33,
              ),
              trial: Schema.optionalKey(Schema.Boolean),
              trial_end: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Union([
                  ResourceInputJsonSchema,
                  StripeResourceEntityInputItems_3,
                  StripeResourceEntityInputProperties_29,
                  StripeResourceEntityInputAlternatives_87,
                  StripeResourceEntityInputAlternatives_88,
                  StripeResourceEntityInputProperties_31,
                  StripeResourceEntityInputItems_5,
                  StripeResourceEntityInputAlternatives_97,
                  StripeResourceEntityInputProperties_33,
                ]),
              ),
            ],
          ).annotate({ title: "phase_configuration_params" }),
        ).annotate({
          description:
            "List representing phases of the subscription schedule. Each phase can be customized to have different durations, plans, and coupons. If there are multiple phases, the `end_date` of one phase will always equal the `start_date` of the next phase.",
        }),
      ),
      start_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Literal("now"),
        ]).annotate({
          description:
            "When the subscription schedule starts. We recommend using `now` so that it starts the subscription immediately, and to avoid unexpected behavior due to request delays or clock skew resulting in a slightly backdated or postdated start. You can also use a Unix timestamp to backdate the subscription so that it starts on a past date, or set a future date for the subscription to start on.",
        }),
      ),
    }),
    StripeSubscriptionScheduleResourceSchema,
  );
