// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeSubscriptionScheduleProps = {
  readonly billing_mode?: {
    readonly flexible?: {
      readonly proration_discounts?: "included" | "itemized";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "classic" | "flexible";
  } & { readonly [x: string]: Schema.Json };
  readonly customer?: string;
  readonly customer_account?: string;
  readonly default_settings?: {
    readonly application_fee_percent?: number;
    readonly automatic_tax?: {
      readonly enabled: boolean;
      readonly liability?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly billing_cycle_anchor?: "automatic" | "phase_start";
    readonly billing_thresholds?:
      | ({
          readonly amount_gte?: number;
          readonly reset_billing_cycle_anchor?: boolean;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly collection_method?: "charge_automatically" | "send_invoice";
    readonly default_payment_method?: string;
    readonly description?: string | "";
    readonly invoice_settings?: {
      readonly account_tax_ids?: ReadonlyArray<string> | "";
      readonly custom_fields?:
        | ReadonlyArray<
            { readonly name: string; readonly value: string } & {
              readonly [x: string]: Schema.Json;
            }
          >
        | "";
      readonly days_until_due?: number;
      readonly description?: string | "";
      readonly footer?: string | "";
      readonly issuer?: {
        readonly account?: string;
        readonly type: "account" | "self";
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly on_behalf_of?: string | "";
    readonly transfer_data?:
      | ({ readonly amount_percent?: number; readonly destination: string } & {
          readonly [x: string]: Schema.Json;
        })
      | "";
  } & { readonly [x: string]: Schema.Json };
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
      readonly add_invoice_items?: ReadonlyArray<
        {
          readonly discountable?: boolean;
          readonly discounts?: ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >;
          readonly metadata?: { readonly [x: string]: string };
          readonly period?: {
            readonly end: {
              readonly timestamp?: number;
              readonly type: "min_item_period_end" | "phase_end" | "timestamp";
            } & { readonly [x: string]: Schema.Json };
            readonly start: {
              readonly timestamp?: number;
              readonly type:
                | "max_item_period_start"
                | "phase_start"
                | "timestamp";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly application_fee_percent?: number;
      readonly automatic_tax?: {
        readonly enabled: boolean;
        readonly liability?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly billing_cycle_anchor?: "automatic" | "phase_start";
      readonly billing_thresholds?:
        | ({
            readonly amount_gte?: number;
            readonly reset_billing_cycle_anchor?: boolean;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly collection_method?: "charge_automatically" | "send_invoice";
      readonly currency?: string;
      readonly default_payment_method?: string;
      readonly default_tax_rates?: ReadonlyArray<string> | "";
      readonly description?: string | "";
      readonly discounts?:
        | ReadonlyArray<
            {
              readonly coupon?: string;
              readonly discount?: string;
              readonly promotion_code?: string;
            } & { readonly [x: string]: Schema.Json }
          >
        | "";
      readonly duration?: {
        readonly interval: "day" | "month" | "week" | "year";
        readonly interval_count?: number;
      } & { readonly [x: string]: Schema.Json };
      readonly end_date?: number;
      readonly invoice_settings?: {
        readonly account_tax_ids?: ReadonlyArray<string> | "";
        readonly custom_fields?:
          | ReadonlyArray<
              { readonly name: string; readonly value: string } & {
                readonly [x: string]: Schema.Json;
              }
            >
          | "";
        readonly days_until_due?: number;
        readonly description?: string | "";
        readonly footer?: string | "";
        readonly issuer?: {
          readonly account?: string;
          readonly type: "account" | "self";
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly items: ReadonlyArray<
        {
          readonly billing_thresholds?:
            | ({ readonly usage_gte: number } & {
                readonly [x: string]: Schema.Json;
              })
            | "";
          readonly discounts?:
            | ReadonlyArray<
                {
                  readonly coupon?: string;
                  readonly discount?: string;
                  readonly promotion_code?: string;
                } & { readonly [x: string]: Schema.Json }
              >
            | "";
          readonly metadata?: { readonly [x: string]: string };
          readonly price?: string;
          readonly price_data?: {
            readonly currency: string;
            readonly product: string;
            readonly recurring: {
              readonly interval: "day" | "month" | "week" | "year";
              readonly interval_count?: number;
            } & { readonly [x: string]: Schema.Json };
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
            readonly unit_amount?: number;
            readonly unit_amount_decimal?: string;
          } & { readonly [x: string]: Schema.Json };
          readonly quantity?: number;
          readonly tax_rates?: ReadonlyArray<string> | "";
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly metadata?: { readonly [x: string]: string };
      readonly on_behalf_of?: string;
      readonly proration_behavior?:
        | "always_invoice"
        | "create_prorations"
        | "none";
      readonly transfer_data?: {
        readonly amount_percent?: number;
        readonly destination: string;
      } & { readonly [x: string]: Schema.Json };
      readonly trial?: boolean;
      readonly trial_end?: number;
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly start_date?: number | "now";
};

export const StripeSubscriptionScheduleResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "subscription-schedule",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/SubscriptionScheduleId"],
  });
export const StripeSubscriptionSchedulePropsSchema = annotateResourceSchema(
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
      Schema.String.annotate({
        description:
          "The identifier of the customer to create the subscription schedule for.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
            Schema.StructWithRest(
              Schema.Struct({
                enabled: Schema.Boolean,
                liability: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "automatic_tax_config" }),
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
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
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
            Schema.StructWithRest(
              Schema.Struct({
                account_tax_ids: Schema.optionalKey(
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
                custom_fields: Schema.optionalKey(
                  Schema.Union([
                    Schema.Array(
                      Schema.StructWithRest(
                        Schema.Struct({
                          name: Schema.String.check(
                            Schema.isMaxCodePoints(40).annotate({
                              expected: "a string with at most 40 code points",
                            }),
                          ),
                          value: Schema.String.check(
                            Schema.isMaxCodePoints(140).annotate({
                              expected: "a string with at most 140 code points",
                            }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "custom_field_params" }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                days_until_due: Schema.optionalKey(Schema.Int),
                description: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(1500).annotate({
                        expected: "a string with at most 1500 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                footer: Schema.optionalKey(
                  Schema.Union([
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                    Schema.Literal(""),
                  ]),
                ),
                issuer: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      account: Schema.optionalKey(Schema.String),
                      type: Schema.Literals(["account", "self"]),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "param" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({
              title: "subscription_schedule_default_settings_param",
            }),
          ),
          on_behalf_of: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
          transfer_data: Schema.optionalKey(
            Schema.Union([
              Schema.StructWithRest(
                Schema.Struct({
                  amount_percent: Schema.optionalKey(Schema.Finite),
                  destination: Schema.String,
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "transfer_data_specs" }),
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
                          Schema.Literals(["invoice", "pending_invoice_item"]),
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
                              Schema.Json.annotate({ expected: "JSON value" }),
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
              Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    discountable: Schema.optionalKey(Schema.Boolean),
                    discounts: Schema.optionalKey(
                      Schema.Array(
                        Schema.StructWithRest(
                          Schema.Struct({
                            coupon: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                            discount: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                            promotion_code: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "discounts_data_param" }),
                      ),
                    ),
                    metadata: Schema.optionalKey(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    period: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          end: Schema.StructWithRest(
                            Schema.Struct({
                              timestamp: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
                              ),
                              type: Schema.Literals([
                                "min_item_period_end",
                                "phase_end",
                                "timestamp",
                              ]),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "invoice_item_period_end" }),
                          start: Schema.StructWithRest(
                            Schema.Struct({
                              timestamp: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
                              ),
                              type: Schema.Literals([
                                "max_item_period_start",
                                "phase_start",
                                "timestamp",
                              ]),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "invoice_item_period_start" }),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "invoice_item_period" }),
                    ),
                    price: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                    ),
                    price_data: Schema.optionalKey(
                      Schema.StructWithRest(
                        Schema.Struct({
                          currency: Schema.String.annotate({
                            format: "currency",
                          }),
                          product: Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                          tax_behavior: Schema.optionalKey(
                            Schema.Literals([
                              "exclusive",
                              "inclusive",
                              "unspecified",
                            ]),
                          ),
                          unit_amount: Schema.optionalKey(Schema.Int),
                          unit_amount_decimal: Schema.optionalKey(
                            Schema.String.annotate({ format: "decimal" }),
                          ),
                        }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({
                        title: "one_time_price_data_with_negative_amounts",
                      }),
                    ),
                    quantity: Schema.optionalKey(Schema.Int),
                    tax_rates: Schema.optionalKey(
                      Schema.Union([
                        Schema.Array(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
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
                ).annotate({ title: "add_invoice_item_entry" }),
              ),
            ),
            application_fee_percent: Schema.optionalKey(Schema.Finite),
            automatic_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  enabled: Schema.Boolean,
                  liability: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        account: Schema.optionalKey(Schema.String),
                        type: Schema.Literals(["account", "self"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "automatic_tax_config" }),
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
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
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
              Schema.Union([
                Schema.Array(
                  Schema.StructWithRest(
                    Schema.Struct({
                      coupon: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      discount: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                      promotion_code: Schema.optionalKey(
                        Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "schedule_discounts_data_param" }),
                ),
                Schema.Literal(""),
              ]),
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
              Schema.StructWithRest(
                Schema.Struct({
                  account_tax_ids: Schema.optionalKey(
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
                  custom_fields: Schema.optionalKey(
                    Schema.Union([
                      Schema.Array(
                        Schema.StructWithRest(
                          Schema.Struct({
                            name: Schema.String.check(
                              Schema.isMaxCodePoints(40).annotate({
                                expected:
                                  "a string with at most 40 code points",
                              }),
                            ),
                            value: Schema.String.check(
                              Schema.isMaxCodePoints(140).annotate({
                                expected:
                                  "a string with at most 140 code points",
                              }),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "custom_field_params" }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  days_until_due: Schema.optionalKey(Schema.Int),
                  description: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(1500).annotate({
                          expected: "a string with at most 1500 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  footer: Schema.optionalKey(
                    Schema.Union([
                      Schema.String.check(
                        Schema.isMaxCodePoints(5000).annotate({
                          expected: "a string with at most 5000 code points",
                        }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  issuer: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        account: Schema.optionalKey(Schema.String),
                        type: Schema.Literals(["account", "self"]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "param" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "schedule_phase_invoice_settings" }),
            ),
            items: Schema.Array(
              Schema.StructWithRest(
                Schema.Struct({
                  billing_thresholds: Schema.optionalKey(
                    Schema.Union([
                      Schema.StructWithRest(
                        Schema.Struct({ usage_gte: Schema.Int }),
                        [
                          Schema.Record(
                            Schema.String,
                            Schema.Json.annotate({ expected: "JSON value" }),
                          ),
                        ],
                      ).annotate({ title: "item_billing_thresholds_param" }),
                      Schema.Literal(""),
                    ]),
                  ),
                  discounts: Schema.optionalKey(
                    Schema.Union([
                      Schema.Array(
                        Schema.StructWithRest(
                          Schema.Struct({
                            coupon: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                            discount: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                            promotion_code: Schema.optionalKey(
                              Schema.String.check(
                                Schema.isMaxCodePoints(5000).annotate({
                                  expected:
                                    "a string with at most 5000 code points",
                                }),
                              ),
                            ),
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "schedule_discounts_data_param" }),
                      ),
                      Schema.Literal(""),
                    ]),
                  ),
                  metadata: Schema.optionalKey(
                    Schema.Record(Schema.String, Schema.String),
                  ),
                  price: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  price_data: Schema.optionalKey(
                    Schema.StructWithRest(
                      Schema.Struct({
                        currency: Schema.String.annotate({
                          format: "currency",
                        }),
                        product: Schema.String.check(
                          Schema.isMaxCodePoints(5000).annotate({
                            expected: "a string with at most 5000 code points",
                          }),
                        ),
                        recurring: Schema.StructWithRest(
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
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "recurring_adhoc" }),
                        tax_behavior: Schema.optionalKey(
                          Schema.Literals([
                            "exclusive",
                            "inclusive",
                            "unspecified",
                          ]),
                        ),
                        unit_amount: Schema.optionalKey(Schema.Int),
                        unit_amount_decimal: Schema.optionalKey(
                          Schema.String.annotate({ format: "decimal" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "recurring_price_data" }),
                  ),
                  quantity: Schema.optionalKey(Schema.Int),
                  tax_rates: Schema.optionalKey(
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
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "configuration_item_params" }),
            ),
            metadata: Schema.optionalKey(
              Schema.Record(Schema.String, Schema.String),
            ),
            on_behalf_of: Schema.optionalKey(Schema.String),
            proration_behavior: Schema.optionalKey(
              Schema.Literals(["always_invoice", "create_prorations", "none"]),
            ),
            transfer_data: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  amount_percent: Schema.optionalKey(Schema.Finite),
                  destination: Schema.String,
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "transfer_data_specs" }),
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
              Schema.Json.annotate({ expected: "JSON value" }),
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
