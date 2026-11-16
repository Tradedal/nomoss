// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripepayment_method_details_card_installments_plan } from "./paymentMethodDetails.js";
import { Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details } from "./payments.js";

export type Stripepayment_method_options_card_present_routing = {
  readonly requested_priority?: "domestic" | "international" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_affirm = {
  readonly capture_method?: "manual";
  readonly preferred_locale?: string;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_afterpay_clearpay = {
  readonly capture_method?: "manual";
  readonly reference?: string | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_alipay = {
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_alma = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_amazon_pay = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_bancontact = {
  readonly preferred_language: "de" | "en" | "fr" | "nl";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_bizum = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_options_boleto = {
  readonly expires_after_days: number;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_card_mandate_options = {
  readonly amount: number;
  readonly amount_type: "fixed" | "maximum";
  readonly description?: string | null;
  readonly end_date?: number | null;
  readonly interval: "day" | "month" | "sporadic" | "week" | "year";
  readonly interval_count?: number | null;
  readonly reference: string;
  readonly start_date: number;
  readonly supported_types?: ReadonlyArray<"india"> | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_cashapp = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_crypto = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_customer_balance_eu_bank_account = {
  readonly country: "BE" | "DE" | "ES" | "FR" | "IE" | "NL";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_fpx = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_giropay = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_grabpay = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_ideal = {
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_interac_present = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_options_klarna = {
  readonly capture_method?: "manual";
  readonly preferred_locale?: string | null;
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_konbini = {
  readonly confirmation_number?: string | null;
  readonly expires_after_days?: number | null;
  readonly expires_at?: number | null;
  readonly product_description?: string | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_kr_card = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_mb_way = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_multibanco = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_oxxo = {
  readonly expires_after_days: number;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_p24 = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_pay_by_bank = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_options_paynow = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_paypal = {
  readonly capture_method?: "manual";
  readonly preferred_locale?: string | null;
  readonly reference?: string | null;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_paypay = {
  readonly [x: string]: Schema.Json;
};
export type Stripepayment_method_options_mandate_options_pix = {
  readonly amount?: number;
  readonly amount_includes_iof?: "always" | "never";
  readonly amount_type?: "fixed" | "maximum";
  readonly currency?: string;
  readonly end_date?: string;
  readonly payment_schedule?:
    | "halfyearly"
    | "monthly"
    | "quarterly"
    | "weekly"
    | "yearly";
  readonly reference?: string;
  readonly start_date?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_promptpay = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_revolut_pay = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_satispay = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none" | "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_scalapay = {
  readonly capture_method?: "manual";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_sequra = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_sofort = {
  readonly preferred_language?:
    | "de"
    | "en"
    | "es"
    | "fr"
    | "it"
    | "nl"
    | "pl"
    | null;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_sunbit = {
  readonly capture_method?: "manual";
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_twint = {
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_upi = {
  readonly setup_future_usage?: "off_session" | "on_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_us_bank_account_mandate_options = {
  readonly collection_method?: "paper";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_wechat_pay = {
  readonly app_id?: string | null;
  readonly client?: "android" | "ios" | "web" | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_zip = {
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_mandate_options_upi = {
  readonly amount?: number | null;
  readonly amount_type?: "fixed" | "maximum" | null;
  readonly description?: string | null;
  readonly end_date?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_card_installments = {
  readonly available_plans?: ReadonlyArray<Stripepayment_method_details_card_installments_plan> | null;
  readonly enabled: boolean;
  readonly plan?: Stripepayment_method_details_card_installments_plan | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_card_present = {
  readonly capture_method?: "manual" | "manual_preferred";
  readonly request_extended_authorization?: boolean | null;
  readonly request_incremental_authorization_support?: boolean | null;
  readonly routing?: Stripepayment_method_options_card_present_routing;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_customer_balance_bank_transfer = {
  readonly eu_bank_transfer?: Stripepayment_method_options_customer_balance_eu_bank_account;
  readonly requested_address_types?: ReadonlyArray<
    "aba" | "iban" | "sepa" | "sort_code" | "spei" | "swift" | "zengin"
  >;
  readonly type?:
    | "eu_bank_transfer"
    | "gb_bank_transfer"
    | "jp_bank_transfer"
    | "mx_bank_transfer"
    | "us_bank_transfer"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_pix = {
  readonly amount_includes_iof?: "always" | "never";
  readonly expires_after_seconds?: number | null;
  readonly expires_at?: number | null;
  readonly mandate_options?: Stripepayment_method_options_mandate_options_pix;
  readonly setup_future_usage?: "none" | "off_session";
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_billie = {
  readonly capture_method?: "manual";
  readonly company_details?: Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details;
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripepayment_method_options_customer_balance = {
  readonly bank_transfer?: Stripepayment_method_options_customer_balance_bank_transfer;
  readonly funding_type?: "bank_transfer" | null;
  readonly setup_future_usage?: "none";
} & { readonly [x: string]: Schema.Json };

export const Stripepayment_method_options_card_present_routing =
  Schema.StructWithRest(
    Schema.Struct({
      requested_priority: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["domestic", "international"]).annotate({
            description: "Requested routing priority",
          }),
          Schema.Null,
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
    title: "payment_method_options_card_present_routing",
    description: "",
    identifier: "Stripepayment_method_options_card_present_routing",
  });
export const Stripepayment_method_options_affirm = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    preferred_locale: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Preferred language of the Affirm authorization page that the customer is redirected to.",
      }).check(
        Schema.isMaxCodePoints(30).annotate({
          expected: "a string with at most 30 code points",
        }),
      ),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_affirm",
  description: "",
  identifier: "Stripepayment_method_options_affirm",
});
export const Stripepayment_method_options_afterpay_clearpay =
  Schema.StructWithRest(
    Schema.Struct({
      capture_method: Schema.optionalKey(
        Schema.Literal("manual").annotate({
          description:
            "Controls when the funds will be captured from the customer's account.",
        }),
      ),
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "An internal identifier or reference that this payment corresponds to. You must limit the identifier to 128 characters, and it can only contain letters, numbers, underscores, backslashes, and dashes.\nThis field differs from the statement descriptor and item name.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      setup_future_usage: Schema.optionalKey(
        Schema.Literal("none").annotate({
          description:
            "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
    title: "payment_method_options_afterpay_clearpay",
    description: "",
    identifier: "Stripepayment_method_options_afterpay_clearpay",
  });
export const Stripepayment_method_options_alipay = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_alipay",
  description: "",
  identifier: "Stripepayment_method_options_alipay",
});
export const Stripepayment_method_options_alma = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
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
  title: "payment_method_options_alma",
  description: "",
  identifier: "Stripepayment_method_options_alma",
});
export const Stripepayment_method_options_amazon_pay = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_amazon_pay",
  description: "",
  identifier: "Stripepayment_method_options_amazon_pay",
});
export const Stripepayment_method_options_bancontact = Schema.StructWithRest(
  Schema.Struct({
    preferred_language: Schema.Literals(["de", "en", "fr", "nl"]).annotate({
      description:
        "Preferred language of the Bancontact authorization page that the customer is redirected to.",
    }),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_bancontact",
  description: "",
  identifier: "Stripepayment_method_options_bancontact",
});
export const Stripepayment_method_options_bizum = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_options_bizum",
  description: "",
  identifier: "Stripepayment_method_options_bizum",
});
export const Stripepayment_method_options_boleto = Schema.StructWithRest(
  Schema.Struct({
    expires_after_days: Schema.Number.annotate({
      description:
        "The number of calendar days before a Boleto voucher expires. For example, if you create a Boleto voucher on Monday and you set expires_after_days to 2, the Boleto voucher will expire on Wednesday at 23:59 America/Sao_Paulo time.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_boleto",
  description: "",
  identifier: "Stripepayment_method_options_boleto",
});
export const Stripepayment_method_options_card_mandate_options =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.Number.annotate({
        description:
          "Amount to be charged for future payments, specified in the presentment currency.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      amount_type: Schema.Literals(["fixed", "maximum"]).annotate({
        description:
          "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
      }),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A description of the mandate or subscription that is meant to be displayed to the customer.",
          }).check(
            Schema.isMaxCodePoints(200).annotate({
              expected: "a string with at most 200 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      end_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "End date of the mandate or subscription. If not provided, the mandate will be active until canceled. If provided, end date should be after start date.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      interval: Schema.Literals([
        "day",
        "month",
        "sporadic",
        "week",
        "year",
      ]).annotate({
        description:
          "Specifies payment frequency. One of `day`, `week`, `month`, `year`, or `sporadic`.",
      }),
      interval_count: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The number of intervals between payments. For example, `interval=month` and `interval_count=3` indicates one payment every three months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks). This parameter is optional when `interval=sporadic`.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      reference: Schema.String.annotate({
        description: "Unique identifier for the mandate or subscription.",
      }).check(
        Schema.isMaxCodePoints(80).annotate({
          expected: "a string with at most 80 code points",
        }),
      ),
      start_date: Schema.Number.annotate({
        description:
          "Start date of the mandate or subscription. Start date should not be lesser than yesterday.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      supported_types: Schema.optionalKey(
        Schema.Union([
          Schema.Array(Schema.Literal("india")).annotate({
            description:
              "Specifies the type of mandates supported. Possible values are `india`.",
          }),
          Schema.Null,
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
    title: "payment_method_options_card_mandate_options",
    description: "",
    identifier: "Stripepayment_method_options_card_mandate_options",
  });
export const Stripepayment_method_options_cashapp = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_cashapp",
  description: "",
  identifier: "Stripepayment_method_options_cashapp",
});
export const Stripepayment_method_options_crypto = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_crypto",
  description: "",
  identifier: "Stripepayment_method_options_crypto",
});
export const Stripepayment_method_options_customer_balance_eu_bank_account =
  Schema.StructWithRest(
    Schema.Struct({
      country: Schema.Literals(["BE", "DE", "ES", "FR", "IE", "NL"]).annotate({
        description:
          "The desired country code of the bank account information. Permitted values include: `DE`, `FR`, `IE`, or `NL`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "payment_method_options_customer_balance_eu_bank_account",
    description: "",
    identifier: "Stripepayment_method_options_customer_balance_eu_bank_account",
  });
export const Stripepayment_method_options_fpx = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_fpx",
  description: "",
  identifier: "Stripepayment_method_options_fpx",
});
export const Stripepayment_method_options_giropay = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_giropay",
  description: "",
  identifier: "Stripepayment_method_options_giropay",
});
export const Stripepayment_method_options_grabpay = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_grabpay",
  description: "",
  identifier: "Stripepayment_method_options_grabpay",
});
export const Stripepayment_method_options_ideal = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_ideal",
  description: "",
  identifier: "Stripepayment_method_options_ideal",
});
export const Stripepayment_method_options_interac_present = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_options_interac_present",
  description: "",
  identifier: "Stripepayment_method_options_interac_present",
});
export const Stripepayment_method_options_klarna = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    preferred_locale: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Preferred locale of the Klarna checkout page that the customer is redirected to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_klarna",
  description: "",
  identifier: "Stripepayment_method_options_klarna",
});
export const Stripepayment_method_options_konbini = Schema.StructWithRest(
  Schema.Struct({
    confirmation_number: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An optional 10 to 11 digit numeric-only string determining the confirmation code at applicable convenience stores.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    expires_after_days: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The number of calendar days (between 1 and 60) after which Konbini payment instructions will expire. For example, if a PaymentIntent is confirmed with Konbini and `expires_after_days` set to 2 on Monday JST, the instructions will expire on Wednesday 23:59:59 JST.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    expires_at: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The timestamp at which the Konbini payment instructions will expire. Only one of `expires_after_days` or `expires_at` may be set.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    product_description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A product descriptor of up to 22 characters, which will appear to customers at the convenience store.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_konbini",
  description: "",
  identifier: "Stripepayment_method_options_konbini",
});
export const Stripepayment_method_options_kr_card = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_kr_card",
  description: "",
  identifier: "Stripepayment_method_options_kr_card",
});
export const Stripepayment_method_options_mb_way = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_mb_way",
  description: "",
  identifier: "Stripepayment_method_options_mb_way",
});
export const Stripepayment_method_options_multibanco = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_multibanco",
  description: "",
  identifier: "Stripepayment_method_options_multibanco",
});
export const Stripepayment_method_options_oxxo = Schema.StructWithRest(
  Schema.Struct({
    expires_after_days: Schema.Number.annotate({
      description:
        "The number of calendar days before an OXXO invoice expires. For example, if you create an OXXO invoice on Monday and you set expires_after_days to 2, the OXXO invoice will expire on Wednesday at 23:59 America/Mexico_City time.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_oxxo",
  description: "",
  identifier: "Stripepayment_method_options_oxxo",
});
export const Stripepayment_method_options_p24 = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_p24",
  description: "",
  identifier: "Stripepayment_method_options_p24",
});
export const Stripepayment_method_options_pay_by_bank = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_options_pay_by_bank",
  description: "",
  identifier: "Stripepayment_method_options_pay_by_bank",
});
export const Stripepayment_method_options_paynow = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_paynow",
  description: "",
  identifier: "Stripepayment_method_options_paynow",
});
export const Stripepayment_method_options_paypal = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    preferred_locale: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Preferred locale of the PayPal checkout page that the customer is redirected to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A reference of the PayPal transaction visible to customer which is mapped to PayPal's invoice ID. This must be a globally unique ID if you have configured in your PayPal settings to block multiple payments per invoice ID.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_paypal",
  description: "",
  identifier: "Stripepayment_method_options_paypal",
});
export const Stripepayment_method_options_paypay = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "payment_method_options_paypay",
  description: "",
  identifier: "Stripepayment_method_options_paypay",
});
export const Stripepayment_method_options_mandate_options_pix =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Number.annotate({
          description: "Amount to be charged for future payments.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      amount_includes_iof: Schema.optionalKey(
        Schema.Literals(["always", "never"]).annotate({
          description: "Determines if the amount includes the IOF tax.",
        }),
      ),
      amount_type: Schema.optionalKey(
        Schema.Literals(["fixed", "maximum"]).annotate({
          description: "Type of amount.",
        }),
      ),
      currency: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.",
          format: "currency",
        }),
      ),
      end_date: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Date when the mandate expires and no further payments will be charged, in `YYYY-MM-DD`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      payment_schedule: Schema.optionalKey(
        Schema.Literals([
          "halfyearly",
          "monthly",
          "quarterly",
          "weekly",
          "yearly",
        ]).annotate({
          description: "Schedule at which the future payments will be charged.",
        }),
      ),
      reference: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Subscription name displayed to buyers in their bank app.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      start_date: Schema.optionalKey(
        Schema.String.annotate({
          description: "Start date of the mandate, in `YYYY-MM-DD`.",
        }).check(
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
  ).annotate({
    title: "payment_method_options_mandate_options_pix",
    description: "",
    identifier: "Stripepayment_method_options_mandate_options_pix",
  });
export const Stripepayment_method_options_promptpay = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_promptpay",
  description: "",
  identifier: "Stripepayment_method_options_promptpay",
});
export const Stripepayment_method_options_revolut_pay = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_revolut_pay",
  description: "",
  identifier: "Stripepayment_method_options_revolut_pay",
});
export const Stripepayment_method_options_satispay = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_satispay",
  description: "",
  identifier: "Stripepayment_method_options_satispay",
});
export const Stripepayment_method_options_scalapay = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
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
  title: "payment_method_options_scalapay",
  description: "",
  identifier: "Stripepayment_method_options_scalapay",
});
export const Stripepayment_method_options_sequra = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_sequra",
  description: "",
  identifier: "Stripepayment_method_options_sequra",
});
export const Stripepayment_method_options_sofort = Schema.StructWithRest(
  Schema.Struct({
    preferred_language: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["de", "en", "es", "fr", "it", "nl", "pl"]).annotate({
          description:
            "Preferred language of the SOFORT authorization page that the customer is redirected to.",
        }),
        Schema.Null,
      ]),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_sofort",
  description: "",
  identifier: "Stripepayment_method_options_sofort",
});
export const Stripepayment_method_options_sunbit = Schema.StructWithRest(
  Schema.Struct({
    capture_method: Schema.optionalKey(
      Schema.Literal("manual").annotate({
        description:
          "Controls when the funds will be captured from the customer's account.",
      }),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_sunbit",
  description: "",
  identifier: "Stripepayment_method_options_sunbit",
});
export const Stripepayment_method_options_twint = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["none", "off_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_twint",
  description: "",
  identifier: "Stripepayment_method_options_twint",
});
export const Stripepayment_method_options_upi = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literals(["off_session", "on_session"]).annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_upi",
  description: "",
  identifier: "Stripepayment_method_options_upi",
});
export const Stripepayment_method_options_us_bank_account_mandate_options =
  Schema.StructWithRest(
    Schema.Struct({
      collection_method: Schema.optionalKey(
        Schema.Literal("paper").annotate({
          description: "Mandate collection method",
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
    title: "payment_method_options_us_bank_account_mandate_options",
    description: "",
    identifier: "Stripepayment_method_options_us_bank_account_mandate_options",
  });
export const Stripepayment_method_options_wechat_pay = Schema.StructWithRest(
  Schema.Struct({
    app_id: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The app ID registered with WeChat Pay. Only required when client is ios, android, or mini_program.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    client: Schema.optionalKey(
      Schema.Union([
        Schema.Literals(["android", "ios", "web"]).annotate({
          description: "The client type that the end customer will pay from",
        }),
        Schema.Null,
      ]),
    ),
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_wechat_pay",
  description: "",
  identifier: "Stripepayment_method_options_wechat_pay",
});
export const Stripepayment_method_options_zip = Schema.StructWithRest(
  Schema.Struct({
    setup_future_usage: Schema.optionalKey(
      Schema.Literal("none").annotate({
        description:
          "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
  title: "payment_method_options_zip",
  description: "",
  identifier: "Stripepayment_method_options_zip",
});
export const Stripepayment_method_options_mandate_options_upi =
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Amount to be charged for future payments.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      amount_type: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["fixed", "maximum"]).annotate({
            description:
              "One of `fixed` or `maximum`. If `fixed`, the `amount` param refers to the exact amount to be charged in future payments. If `maximum`, the amount charged can be up to the value passed for the `amount` param.",
          }),
          Schema.Null,
        ]),
      ),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "A description of the mandate or subscription that is meant to be displayed to the customer.",
          }).check(
            Schema.isMaxCodePoints(20).annotate({
              expected: "a string with at most 20 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      end_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "End date of the mandate or subscription.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
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
    title: "payment_method_options_mandate_options_upi",
    description: "",
    identifier: "Stripepayment_method_options_mandate_options_upi",
  });
export const Stripepayment_method_options_card_installments = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_options_card_installments> =>
    Schema.StructWithRest(
      Schema.Struct({
        available_plans: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Stripepayment_method_details_card_installments_plan,
            ).annotate({
              description:
                "Installment plans that may be selected for this PaymentIntent.",
            }),
            Schema.Null,
          ]),
        ),
        enabled: Schema.Boolean.annotate({
          description:
            "Whether Installments are enabled for this PaymentIntent.",
        }),
        plan: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripepayment_method_details_card_installments_plan,
            ]).annotate({
              description: "Installment plan selected for this PaymentIntent.",
            }),
            Schema.Null,
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
      title: "payment_method_options_card_installments",
      description: "",
      identifier: "Stripepayment_method_options_card_installments",
    }),
);
export const Stripepayment_method_options_card_present = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_options_card_present> =>
    Schema.StructWithRest(
      Schema.Struct({
        capture_method: Schema.optionalKey(
          Schema.Literals(["manual", "manual_preferred"]).annotate({
            description:
              "Controls when the funds will be captured from the customer's account.",
          }),
        ),
        request_extended_authorization: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Request ability to capture this payment beyond the standard [authorization validity window](https://docs.stripe.com/terminal/features/extended-authorizations#authorization-validity)",
            }),
            Schema.Null,
          ]),
        ),
        request_incremental_authorization_support: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Request ability to [increment](https://docs.stripe.com/terminal/features/incremental-authorizations) this PaymentIntent if the combination of MCC and card brand is eligible. Check [incremental_authorization_supported](https://docs.stripe.com/api/charges/object#charge_object-payment_method_details-card_present-incremental_authorization_supported) in the [Confirm](https://docs.stripe.com/api/payment_intents/confirm) response to verify support.",
            }),
            Schema.Null,
          ]),
        ),
        routing: Schema.optionalKey(
          Stripepayment_method_options_card_present_routing,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_options_card_present",
      description: "",
      identifier: "Stripepayment_method_options_card_present",
    }),
);
export const Stripepayment_method_options_customer_balance_bank_transfer =
  Schema.suspend(
    (): Schema.Codec<Stripepayment_method_options_customer_balance_bank_transfer> =>
      Schema.StructWithRest(
        Schema.Struct({
          eu_bank_transfer: Schema.optionalKey(
            Stripepayment_method_options_customer_balance_eu_bank_account,
          ),
          requested_address_types: Schema.optionalKey(
            Schema.Array(
              Schema.Literals([
                "aba",
                "iban",
                "sepa",
                "sort_code",
                "spei",
                "swift",
                "zengin",
              ]),
            ).annotate({
              description:
                "List of address types that should be returned in the financial_addresses response. If not specified, all valid types will be returned.\n\nPermitted values include: `sort_code`, `zengin`, `iban`, or `spei`.",
            }),
          ),
          type: Schema.optionalKey(
            Schema.Union([
              Schema.Literals([
                "eu_bank_transfer",
                "gb_bank_transfer",
                "jp_bank_transfer",
                "mx_bank_transfer",
                "us_bank_transfer",
              ]).annotate({
                description:
                  "The bank transfer type that this PaymentIntent is allowed to use for funding Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.",
              }),
              Schema.Null,
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
        title: "payment_method_options_customer_balance_bank_transfer",
        description: "",
        identifier:
          "Stripepayment_method_options_customer_balance_bank_transfer",
      }),
  );
export const Stripepayment_method_options_pix = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_options_pix> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount_includes_iof: Schema.optionalKey(
          Schema.Literals(["always", "never"]).annotate({
            description: "Determines if the amount includes the IOF tax.",
          }),
        ),
        expires_after_seconds: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The number of seconds after PaymentIntent confirmation when the Pix expires (between 60 and 1209600, inclusive). If neither expiration option is supplied, defaults to 14400 seconds (4 hours). Mutually exclusive with `expires_at`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        expires_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The absolute Unix timestamp at which the Pix expires. When supplied as an input, it must be between 60 and 1209600 seconds from the current time at validation, inclusive. If neither expiration option is supplied, the Pix expires 14400 seconds (4 hours) after PaymentIntent confirmation. Mutually exclusive with `expires_after_seconds`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        mandate_options: Schema.optionalKey(
          Stripepayment_method_options_mandate_options_pix,
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literals(["none", "off_session"]).annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
      title: "payment_method_options_pix",
      description: "",
      identifier: "Stripepayment_method_options_pix",
    }),
);
export const Stripepayment_method_options_billie = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_options_billie> =>
    Schema.StructWithRest(
      Schema.Struct({
        capture_method: Schema.optionalKey(
          Schema.Literal("manual").annotate({
            description:
              "Controls when the funds will be captured from the customer's account.",
          }),
        ),
        company_details: Schema.optionalKey(
          Stripepayment_flows_private_payment_methods_billie_payment_method_options_resource_company_details,
        ),
        reference: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An identifier or reference that this payment corresponds to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
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
      title: "payment_method_options_billie",
      description: "",
      identifier: "Stripepayment_method_options_billie",
    }),
);
export const Stripepayment_method_options_customer_balance = Schema.suspend(
  (): Schema.Codec<Stripepayment_method_options_customer_balance> =>
    Schema.StructWithRest(
      Schema.Struct({
        bank_transfer: Schema.optionalKey(
          Stripepayment_method_options_customer_balance_bank_transfer,
        ),
        funding_type: Schema.optionalKey(
          Schema.Union([
            Schema.Literal("bank_transfer").annotate({
              description:
                "The funding method type to be used when there are not enough funds in the customer balance. Permitted values include: `bank_transfer`.",
            }),
            Schema.Null,
          ]),
        ),
        setup_future_usage: Schema.optionalKey(
          Schema.Literal("none").annotate({
            description:
              "Indicates that you intend to make future payments with this PaymentIntent's payment method.\n\nIf you provide a Customer with the PaymentIntent, you can use this parameter to [attach the payment method](/payments/save-during-payment) to the Customer after the PaymentIntent is confirmed and the customer completes any required actions. If you don't provide a Customer, you can still [attach](/api/payment_methods/attach) the payment method to a Customer after the transaction completes.\n\nIf the payment method is `card_present` and isn't a digital wallet, Stripe creates and attaches a [generated_card](/api/charges/object#charge_object-payment_method_details-card_present-generated_card) payment method representing the card to the Customer instead.\n\nWhen processing card payments, Stripe uses `setup_future_usage` to help you comply with regional legislation and network rules, such as [SCA](/strong-customer-authentication).",
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
      title: "payment_method_options_customer_balance",
      description: "",
      identifier: "Stripepayment_method_options_customer_balance",
    }),
);
