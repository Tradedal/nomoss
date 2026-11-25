// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeInvoiceProps = {
  readonly account_tax_ids?: ReadonlyArray<string> | "";
  readonly application_fee_amount?: number;
  readonly auto_advance?: boolean;
  readonly automatic_tax?: {
    readonly enabled: boolean;
    readonly liability?: {
      readonly account?: string;
      readonly type: "account" | "self";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly automatically_finalizes_at?: number;
  readonly collection_method?: "charge_automatically" | "send_invoice";
  readonly currency?: string;
  readonly custom_fields?:
    | ReadonlyArray<
        { readonly name: string; readonly value: string } & {
          readonly [x: string]: Schema.Json;
        }
      >
    | "";
  readonly customer?: string;
  readonly customer_account?: string;
  readonly days_until_due?: number;
  readonly default_payment_method?: string;
  readonly default_source?: string;
  readonly default_tax_rates?: ReadonlyArray<string>;
  readonly description?: string;
  readonly discounts?:
    | ReadonlyArray<
        {
          readonly coupon?: string;
          readonly discount?: string;
          readonly promotion_code?: string;
        } & { readonly [x: string]: Schema.Json }
      >
    | "";
  readonly due_date?: number;
  readonly effective_at?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly footer?: string;
  readonly from_invoice?: {
    readonly action: "revision";
    readonly invoice: string;
  } & { readonly [x: string]: Schema.Json };
  readonly issuer?: {
    readonly account?: string;
    readonly type: "account" | "self";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly number?: string;
  readonly on_behalf_of?: string;
  readonly payment_settings?: {
    readonly default_mandate?: string | "";
    readonly payment_method_options?: {
      readonly acss_debit?:
        | ({
            readonly mandate_options?: {
              readonly transaction_type?: "business" | "personal";
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly bancontact?:
        | ({ readonly preferred_language?: "de" | "en" | "fr" | "nl" } & {
            readonly [x: string]: Schema.Json;
          })
        | "";
      readonly billie?:
        | ({
            readonly company_details?:
              | ({
                  readonly registered_address?:
                    | ({
                        readonly city?: string;
                        readonly country?: string;
                        readonly line1?: string;
                        readonly line2?: string;
                        readonly postal_code?: string;
                        readonly state?: string;
                      } & { readonly [x: string]: Schema.Json })
                    | "";
                  readonly registered_name?: string;
                  readonly registration_number?: string;
                  readonly registration_type?:
                    | ""
                    | "ch_ein"
                    | "de_hrb"
                    | "dk_cvr"
                    | "es_cif"
                    | "fi_tunnus"
                    | "fr_siren"
                    | "fr_siret"
                    | "it_rea"
                    | "nl_kvk"
                    | "no_org_number"
                    | "no_pno"
                    | "se_org_number"
                    | "se_pno"
                    | "uk_crn";
                  readonly vat?: string;
                } & { readonly [x: string]: Schema.Json })
              | "";
            readonly reference?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly blik?: { readonly [x: string]: Schema.Json } | "";
      readonly card?:
        | ({
            readonly installments?: {
              readonly enabled?: boolean;
              readonly plan?:
                | ({
                    readonly count?: number;
                    readonly interval?: "month";
                    readonly type: "bonus" | "fixed_count" | "revolving";
                  } & { readonly [x: string]: Schema.Json })
                | "";
            } & { readonly [x: string]: Schema.Json };
            readonly request_three_d_secure?: "any" | "automatic" | "challenge";
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly customer_balance?:
        | ({
            readonly bank_transfer?: {
              readonly eu_bank_transfer?: { readonly country: string } & {
                readonly [x: string]: Schema.Json;
              };
              readonly type?: string;
            } & { readonly [x: string]: Schema.Json };
            readonly funding_type?: string;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly konbini?: { readonly [x: string]: Schema.Json } | "";
      readonly payto?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly purpose?:
                | "dependant_support"
                | "government"
                | "loan"
                | "mortgage"
                | "other"
                | "pension"
                | "personal"
                | "retail"
                | "salary"
                | "tax"
                | "utility";
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly pix?:
        | ({
            readonly amount_includes_iof?: "always" | "never";
            readonly expires_after_seconds?: number;
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly sepa_debit?: { readonly [x: string]: Schema.Json } | "";
      readonly upi?:
        | ({
            readonly mandate_options?: {
              readonly amount?: number;
              readonly amount_type?: "fixed" | "maximum";
              readonly description?: string;
              readonly end_date?: number;
            } & { readonly [x: string]: Schema.Json };
          } & { readonly [x: string]: Schema.Json })
        | "";
      readonly us_bank_account?:
        | ({
            readonly financial_connections?: {
              readonly filters?: {
                readonly account_subcategories?: ReadonlyArray<
                  "checking" | "savings"
                >;
              } & { readonly [x: string]: Schema.Json };
              readonly permissions?: ReadonlyArray<
                "balances" | "ownership" | "payment_method" | "transactions"
              >;
              readonly prefetch?: ReadonlyArray<
                "balances" | "ownership" | "transactions"
              >;
            } & { readonly [x: string]: Schema.Json };
            readonly verification_method?:
              | "automatic"
              | "instant"
              | "microdeposits";
          } & { readonly [x: string]: Schema.Json })
        | "";
    } & { readonly [x: string]: Schema.Json };
    readonly payment_method_types?:
      | ReadonlyArray<
          | "ach_credit_transfer"
          | "ach_debit"
          | "acss_debit"
          | "affirm"
          | "alipay"
          | "amazon_pay"
          | "au_becs_debit"
          | "bacs_debit"
          | "bancontact"
          | "billie"
          | "blik"
          | "boleto"
          | "card"
          | "cashapp"
          | "crypto"
          | "custom"
          | "customer_balance"
          | "eps"
          | "fpx"
          | "giropay"
          | "grabpay"
          | "ideal"
          | "jp_credit_transfer"
          | "kakao_pay"
          | "klarna"
          | "konbini"
          | "kr_card"
          | "link"
          | "mb_way"
          | "multibanco"
          | "naver_pay"
          | "nz_bank_account"
          | "p24"
          | "pay_by_bank"
          | "payco"
          | "paynow"
          | "paypal"
          | "payto"
          | "pix"
          | "promptpay"
          | "revolut_pay"
          | "satispay"
          | "sepa_credit_transfer"
          | "sepa_debit"
          | "sequra"
          | "sofort"
          | "swish"
          | "twint"
          | "upi"
          | "us_bank_account"
          | "wechat_pay"
        >
      | "";
  } & { readonly [x: string]: Schema.Json };
  readonly pending_invoice_items_behavior?: "exclude" | "include";
  readonly rendering?: {
    readonly amount_tax_display?: "" | "exclude_tax" | "include_inclusive_tax";
    readonly pdf?: { readonly page_size?: "a4" | "auto" | "letter" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly template?: string;
    readonly template_version?: number | "";
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_cost?: {
    readonly shipping_rate?: string;
    readonly shipping_rate_data?: {
      readonly delivery_estimate?: {
        readonly maximum?: {
          readonly unit: "business_day" | "day" | "hour" | "month" | "week";
          readonly value: number;
        } & { readonly [x: string]: Schema.Json };
        readonly minimum?: {
          readonly unit: "business_day" | "day" | "hour" | "month" | "week";
          readonly value: number;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json };
      readonly display_name: string;
      readonly fixed_amount?: {
        readonly amount: number;
        readonly currency: string;
        readonly currency_options?: {
          readonly [x: string]: {
            readonly amount: number;
            readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
          } & { readonly [x: string]: Schema.Json };
        };
      } & { readonly [x: string]: Schema.Json };
      readonly metadata?: { readonly [x: string]: string };
      readonly tax_behavior?: "exclusive" | "inclusive" | "unspecified";
      readonly tax_code?: string;
      readonly type?: "fixed_amount";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly shipping_details?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly name: string;
    readonly phone?: string | "";
  } & { readonly [x: string]: Schema.Json };
  readonly statement_descriptor?: string;
  readonly subscription?: string;
  readonly transfer_data?: {
    readonly amount?: number;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
};

export const StripeInvoiceResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "invoice",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/InvoiceId"],
});
export const StripeInvoicePropsSchema = annotateResourceSchema(
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
      ]).annotate({
        description:
          "The account tax IDs associated with the invoice. Only editable when the invoice is a draft.",
      }),
    ),
    application_fee_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A fee in cents (or local equivalent) that will be applied to the invoice and transferred to the application owner's Stripe account. The request must be made with an OAuth key or the Stripe-Account header in order to take an application fee. For more information, see the application fees [documentation](https://docs.stripe.com/billing/invoices/connect#collecting-fees).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    auto_advance: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Controls whether Stripe performs [automatic collection](https://docs.stripe.com/invoicing/integration/automatic-advancement-collection) of the invoice. If `false`, the invoice's state doesn't automatically advance without an explicit action. Defaults to false.",
      }),
    ),
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
      ).annotate({
        title: "automatic_tax_param",
        description: "Settings for automatic tax lookup for this invoice.",
      }),
    ),
    automatically_finalizes_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The time when this invoice should be scheduled to finalize (up to 5 years in the future). The invoice is finalized at this time if it's still in draft state.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    collection_method: Schema.optionalKey(
      Schema.Literals(["charge_automatically", "send_invoice"]).annotate({
        description:
          "Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay this invoice using the default source attached to the customer. When sending an invoice, Stripe will email this invoice to the customer with payment instructions. Defaults to `charge_automatically`.",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The currency to create this invoice in. Defaults to that of `customer` if not specified.",
        format: "currency",
      }),
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
      ]).annotate({
        description:
          "A list of up to 4 custom fields to be displayed on the invoice.",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ID of the customer to bill.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    customer_account: Schema.optionalKey(
      Schema.String.annotate({
        description: "The ID of the account to bill.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    days_until_due: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The number of days from when the invoice is created until it is due. Valid only for invoices where `collection_method=send_invoice`.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    default_payment_method: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the default payment method for the invoice. It must belong to the customer associated with the invoice. If not set, defaults to the subscription's default payment method, if any, or to the default payment method in the customer's invoice settings.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    default_source: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "ID of the default payment source for the invoice. It must belong to the customer associated with the invoice and be in a chargeable state. If not set, defaults to the subscription's default source, if any, or to the customer's default source.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    default_tax_rates: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "The tax rates that will apply to any line item that does not have `tax_rates` set.",
      }),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string attached to the object. Often useful for displaying to users. Referenced as 'memo' in the Dashboard.",
      }).check(
        Schema.isMaxCodePoints(1500).annotate({
          expected: "a string with at most 1500 code points",
        }),
      ),
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
          ).annotate({ title: "discounts_data_param" }),
        ),
        Schema.Literal(""),
      ]).annotate({
        description:
          "The coupons and promotion codes to redeem into discounts for the invoice. If not specified, inherits the discount from the invoice's customer. Pass an empty string to avoid inheriting any discounts.",
      }),
    ),
    due_date: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The date on which payment for this invoice is due. Valid only for invoices where `collection_method=send_invoice`.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    effective_at: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The date when this invoice is in effect. Same as `finalized_at` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the invoice PDF and receipt.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    footer: Schema.optionalKey(
      Schema.String.annotate({
        description: "Footer to be displayed on the invoice.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    from_invoice: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          action: Schema.Literal("revision"),
          invoice: Schema.String.check(
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
        title: "from_invoice",
        description:
          "Revise an existing invoice. The new invoice will be created in `status=draft`. See the [revision documentation](https://docs.stripe.com/invoicing/invoice-revisions) for more details.",
      }),
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
      ).annotate({
        title: "param",
        description:
          "The connected account that issues the invoice. The invoice is presented with the branding and support information of the specified account.",
      }),
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
    number: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Set the number for this invoice. If no number is present then a number will be assigned automatically when the invoice is finalized. In many markets, regulations require invoices to be unique, sequential and / or gapless. You are responsible for ensuring this is true across all your different invoicing systems in the event that you edit the invoice number using our API. If you use only Stripe for your invoices and do not change invoice numbers, Stripe handles this aspect of compliance for you automatically.",
      }).check(
        Schema.isMaxCodePoints(26).annotate({
          expected: "a string with at most 26 code points",
        }),
      ),
    ),
    on_behalf_of: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The account (if any) for which the funds of the invoice payment are intended. If set, the invoice will be presented with the branding and support information of the specified account. See the [Invoices with Connect](https://docs.stripe.com/billing/invoices/connect) documentation for details.",
      }),
    ),
    payment_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          default_mandate: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
          payment_method_options: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                acss_debit: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              transaction_type: Schema.optionalKey(
                                Schema.Literals(["business", "personal"]),
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
                          ).annotate({ title: "mandate_options_param" }),
                        ),
                        verification_method: Schema.optionalKey(
                          Schema.Literals([
                            "automatic",
                            "instant",
                            "microdeposits",
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
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                bancontact: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        preferred_language: Schema.optionalKey(
                          Schema.Literals(["de", "en", "fr", "nl"]),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                billie: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        company_details: Schema.optionalKey(
                          Schema.Union([
                            Schema.StructWithRest(
                              Schema.Struct({
                                registered_address: Schema.optionalKey(
                                  Schema.Union([
                                    Schema.StructWithRest(
                                      Schema.Struct({
                                        city: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        country: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line1: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        line2: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        postal_code: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
                                        ),
                                        state: Schema.optionalKey(
                                          Schema.String.check(
                                            Schema.isMaxCodePoints(
                                              5000,
                                            ).annotate({
                                              expected:
                                                "a string with at most 5000 code points",
                                            }),
                                          ),
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
                                      title: "registered_address_param",
                                    }),
                                    Schema.Literal(""),
                                  ]),
                                ),
                                registered_name: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                registration_number: Schema.optionalKey(
                                  Schema.String.check(
                                    Schema.isMaxCodePoints(5000).annotate({
                                      expected:
                                        "a string with at most 5000 code points",
                                    }),
                                  ),
                                ),
                                registration_type: Schema.optionalKey(
                                  Schema.Literals([
                                    "",
                                    "ch_ein",
                                    "de_hrb",
                                    "dk_cvr",
                                    "es_cif",
                                    "fi_tunnus",
                                    "fr_siren",
                                    "fr_siret",
                                    "it_rea",
                                    "nl_kvk",
                                    "no_org_number",
                                    "no_pno",
                                    "se_org_number",
                                    "se_pno",
                                    "uk_crn",
                                  ]),
                                ),
                                vat: Schema.optionalKey(
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
                                  Schema.Json.annotate({
                                    expected: "JSON value",
                                  }),
                                ),
                              ],
                            ).annotate({ title: "company_details_param" }),
                            Schema.Literal(""),
                          ]),
                        ),
                        reference: Schema.optionalKey(
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
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                blik: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                card: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        installments: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              enabled: Schema.optionalKey(Schema.Boolean),
                              plan: Schema.optionalKey(
                                Schema.Union([
                                  Schema.StructWithRest(
                                    Schema.Struct({
                                      count: Schema.optionalKey(Schema.Int),
                                      interval: Schema.optionalKey(
                                        Schema.Literal("month"),
                                      ),
                                      type: Schema.Literals([
                                        "bonus",
                                        "fixed_count",
                                        "revolving",
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
                                  ).annotate({ title: "installment_plan" }),
                                  Schema.Literal(""),
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
                          ).annotate({ title: "installments_param" }),
                        ),
                        request_three_d_secure: Schema.optionalKey(
                          Schema.Literals(["any", "automatic", "challenge"]),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                customer_balance: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        bank_transfer: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              eu_bank_transfer: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    country: Schema.String.check(
                                      Schema.isMaxCodePoints(5000).annotate({
                                        expected:
                                          "a string with at most 5000 code points",
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
                                ).annotate({ title: "eu_bank_transfer_param" }),
                              ),
                              type: Schema.optionalKey(Schema.String),
                            }),
                            [
                              Schema.Record(
                                Schema.String,
                                Schema.Json.annotate({
                                  expected: "JSON value",
                                }),
                              ),
                            ],
                          ).annotate({ title: "bank_transfer_param" }),
                        ),
                        funding_type: Schema.optionalKey(Schema.String),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                konbini: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                payto: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              purpose: Schema.optionalKey(
                                Schema.Literals([
                                  "dependant_support",
                                  "government",
                                  "loan",
                                  "mortgage",
                                  "other",
                                  "pension",
                                  "personal",
                                  "retail",
                                  "salary",
                                  "tax",
                                  "utility",
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
                          ).annotate({ title: "mandate_options_param" }),
                        ),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                pix: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        amount_includes_iof: Schema.optionalKey(
                          Schema.Literals(["always", "never"]),
                        ),
                        expires_after_seconds: Schema.optionalKey(Schema.Int),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                sepa_debit: Schema.optionalKey(
                  Schema.Union([
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ).annotate({
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                upi: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        mandate_options: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.optionalKey(Schema.Int),
                              amount_type: Schema.optionalKey(
                                Schema.Literals(["fixed", "maximum"]),
                              ),
                              description: Schema.optionalKey(
                                Schema.String.check(
                                  Schema.isMaxCodePoints(20).annotate({
                                    expected:
                                      "a string with at most 20 code points",
                                  }),
                                ),
                              ),
                              end_date: Schema.optionalKey(
                                Schema.Number.annotate({
                                  format: "unix-time",
                                }).check(
                                  Schema.isInt().annotate({
                                    expected: "an integer",
                                  }),
                                ),
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
                              "invoice_payment_method_options_mandate_options_param",
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
                      title: "invoice_payment_method_options_param",
                    }),
                    Schema.Literal(""),
                  ]),
                ),
                us_bank_account: Schema.optionalKey(
                  Schema.Union([
                    Schema.StructWithRest(
                      Schema.Struct({
                        financial_connections: Schema.optionalKey(
                          Schema.StructWithRest(
                            Schema.Struct({
                              filters: Schema.optionalKey(
                                Schema.StructWithRest(
                                  Schema.Struct({
                                    account_subcategories: Schema.optionalKey(
                                      Schema.Array(
                                        Schema.Literals([
                                          "checking",
                                          "savings",
                                        ]),
                                      ),
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
                                    "invoice_linked_account_options_filters_param",
                                }),
                              ),
                              permissions: Schema.optionalKey(
                                Schema.Array(
                                  Schema.Literals([
                                    "balances",
                                    "ownership",
                                    "payment_method",
                                    "transactions",
                                  ]),
                                ),
                              ),
                              prefetch: Schema.optionalKey(
                                Schema.Array(
                                  Schema.Literals([
                                    "balances",
                                    "ownership",
                                    "transactions",
                                  ]),
                                ),
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
                            title: "invoice_linked_account_options_param",
                          }),
                        ),
                        verification_method: Schema.optionalKey(
                          Schema.Literals([
                            "automatic",
                            "instant",
                            "microdeposits",
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
                      title: "invoice_payment_method_options_param",
                    }),
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
            ).annotate({ title: "payment_method_options" }),
          ),
          payment_method_types: Schema.optionalKey(
            Schema.Union([
              Schema.Array(
                Schema.Literals([
                  "ach_credit_transfer",
                  "ach_debit",
                  "acss_debit",
                  "affirm",
                  "alipay",
                  "amazon_pay",
                  "au_becs_debit",
                  "bacs_debit",
                  "bancontact",
                  "billie",
                  "blik",
                  "boleto",
                  "card",
                  "cashapp",
                  "crypto",
                  "custom",
                  "customer_balance",
                  "eps",
                  "fpx",
                  "giropay",
                  "grabpay",
                  "ideal",
                  "jp_credit_transfer",
                  "kakao_pay",
                  "klarna",
                  "konbini",
                  "kr_card",
                  "link",
                  "mb_way",
                  "multibanco",
                  "naver_pay",
                  "nz_bank_account",
                  "p24",
                  "pay_by_bank",
                  "payco",
                  "paynow",
                  "paypal",
                  "payto",
                  "pix",
                  "promptpay",
                  "revolut_pay",
                  "satispay",
                  "sepa_credit_transfer",
                  "sepa_debit",
                  "sequra",
                  "sofort",
                  "swish",
                  "twint",
                  "upi",
                  "us_bank_account",
                  "wechat_pay",
                ]),
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
      ).annotate({
        title: "payment_settings",
        description:
          "Configuration settings for the PaymentIntent that is generated when the invoice is finalized.",
      }),
    ),
    pending_invoice_items_behavior: Schema.optionalKey(
      Schema.Literals(["exclude", "include"]).annotate({
        description:
          "How to handle pending invoice items on invoice creation. Defaults to `exclude` if the parameter is omitted.",
      }),
    ),
    rendering: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount_tax_display: Schema.optionalKey(
            Schema.Literals(["", "exclude_tax", "include_inclusive_tax"]),
          ),
          pdf: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                page_size: Schema.optionalKey(
                  Schema.Literals(["a4", "auto", "letter"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "rendering_pdf_param" }),
          ),
          template: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          template_version: Schema.optionalKey(
            Schema.Union([Schema.Int, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "rendering_param",
        description:
          "The rendering-related settings that control how invoices render in customer-facing interfaces such as the PDF or hosted invoice page.",
      }),
    ),
    shipping_cost: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          shipping_rate: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          shipping_rate_data: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                delivery_estimate: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      maximum: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            unit: Schema.Literals([
                              "business_day",
                              "day",
                              "hour",
                              "month",
                              "week",
                            ]),
                            value: Schema.Int,
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "delivery_estimate_bound" }),
                      ),
                      minimum: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            unit: Schema.Literals([
                              "business_day",
                              "day",
                              "hour",
                              "month",
                              "week",
                            ]),
                            value: Schema.Int,
                          }),
                          [
                            Schema.Record(
                              Schema.String,
                              Schema.Json.annotate({ expected: "JSON value" }),
                            ),
                          ],
                        ).annotate({ title: "delivery_estimate_bound" }),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "delivery_estimate" }),
                ),
                display_name: Schema.String.check(
                  Schema.isMaxCodePoints(100).annotate({
                    expected: "a string with at most 100 code points",
                  }),
                ),
                fixed_amount: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      amount: Schema.Int,
                      currency: Schema.String.annotate({ format: "currency" }),
                      currency_options: Schema.optionalKey(
                        Schema.Record(
                          Schema.String,
                          Schema.StructWithRest(
                            Schema.Struct({
                              amount: Schema.Int,
                              tax_behavior: Schema.optionalKey(
                                Schema.Literals([
                                  "exclusive",
                                  "inclusive",
                                  "unspecified",
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
                          ).annotate({ title: "currency_option" }),
                        ),
                      ),
                    }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "fixed_amount" }),
                ),
                metadata: Schema.optionalKey(
                  Schema.Record(Schema.String, Schema.String),
                ),
                tax_behavior: Schema.optionalKey(
                  Schema.Literals(["exclusive", "inclusive", "unspecified"]),
                ),
                tax_code: Schema.optionalKey(Schema.String),
                type: Schema.optionalKey(Schema.Literal("fixed_amount")),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "create_params" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "shipping_cost",
        description: "Settings for the cost of shipping for this invoice.",
      }),
    ),
    shipping_details: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          address: Schema.StructWithRest(
            Schema.Struct({
              city: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              country: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              line1: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              line2: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              postal_code: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              state: Schema.optionalKey(
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
          ).annotate({ title: "optional_fields_address" }),
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          phone: Schema.optionalKey(
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
      ).annotate({
        title: "recipient_shipping_with_optional_fields_address",
        description:
          "Shipping details for the invoice. The Invoice PDF will use the `shipping_details` value if it is set, otherwise the PDF will render the shipping address from the customer.",
      }),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Extra information about a charge for the customer's credit card statement. It must contain at least one letter. If not specified and this invoice is part of a subscription, the default `statement_descriptor` will be set to the first subscription item's product's `statement_descriptor`.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    subscription: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the subscription to invoice, if any. If set, the created invoice will only include pending invoice items for that subscription. The subscription's billing cycle and regular subscription events won't be affected.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    transfer_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
          destination: Schema.String,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "transfer_data_specs",
        description:
          "If specified, the funds from the invoice will be transferred to the destination and the ID of the resulting transfer will be found on the invoice's charge.",
      }),
    ),
  }),
  StripeInvoiceResourceSchema,
);
