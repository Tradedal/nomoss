// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import { Stripepayment_method } from "./models/paymentMethods.js";

export type GetPaymentMethodsInput = {
  readonly allow_redisplay?: "always" | "limited" | "unspecified";
  readonly customer?: string;
  readonly customer_account?: string;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly type?:
    | "acss_debit"
    | "affirm"
    | "afterpay_clearpay"
    | "alipay"
    | "alma"
    | "amazon_pay"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "bizum"
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
    | "kakao_pay"
    | "klarna"
    | "konbini"
    | "kr_card"
    | "link"
    | "mb_way"
    | "mobilepay"
    | "multibanco"
    | "naver_pay"
    | "nz_bank_account"
    | "oxxo"
    | "p24"
    | "pay_by_bank"
    | "payco"
    | "paynow"
    | "paypal"
    | "paypay"
    | "payto"
    | "pix"
    | "promptpay"
    | "revolut_pay"
    | "samsung_pay"
    | "satispay"
    | "scalapay"
    | "sepa_debit"
    | "sequra"
    | "sofort"
    | "sunbit"
    | "swish"
    | "twint"
    | "upi"
    | "us_bank_account"
    | "wechat_pay"
    | "zip";
};
export type GetPaymentMethodsOutput = {
  readonly data: ReadonlyArray<Stripepayment_method>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetPaymentMethodsError = Stripeerror;
export type PostPaymentMethodsInput = {
  readonly acss_debit?: {
    readonly account_number: string;
    readonly institution_number: string;
    readonly transit_number: string;
  } & { readonly [x: string]: Schema.Json };
  readonly affirm?: { readonly [x: string]: Schema.Json };
  readonly afterpay_clearpay?: { readonly [x: string]: Schema.Json };
  readonly alipay?: { readonly [x: string]: Schema.Json };
  readonly allow_redisplay?: "always" | "limited" | "unspecified";
  readonly alma?: { readonly [x: string]: Schema.Json };
  readonly amazon_pay?: { readonly [x: string]: Schema.Json };
  readonly au_becs_debit?: {
    readonly account_number: string;
    readonly bsb_number: string;
  } & { readonly [x: string]: Schema.Json };
  readonly bacs_debit?: {
    readonly account_number?: string;
    readonly sort_code?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly bancontact?: { readonly [x: string]: Schema.Json };
  readonly billie?: { readonly [x: string]: Schema.Json };
  readonly billing_details?: {
    readonly address?:
      | ({
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly email?: string | "";
    readonly name?: string | "";
    readonly phone?: string | "";
    readonly tax_id?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly bizum?: { readonly [x: string]: Schema.Json };
  readonly blik?: { readonly [x: string]: Schema.Json };
  readonly boleto?: { readonly tax_id: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly card?:
    | ({
        readonly cvc?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly networks?: {
          readonly preferred?: "cartes_bancaires" | "mastercard" | "visa";
        } & { readonly [x: string]: Schema.Json };
        readonly number: string;
      } & { readonly [x: string]: Schema.Json })
    | ({ readonly token: string } & { readonly [x: string]: Schema.Json });
  readonly cashapp?: { readonly [x: string]: Schema.Json };
  readonly crypto?: { readonly [x: string]: Schema.Json };
  readonly custom?: { readonly type: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly customer?: string;
  readonly customer_balance?: { readonly [x: string]: Schema.Json };
  readonly eps?: {
    readonly bank?:
      | "arzte_und_apotheker_bank"
      | "austrian_anadi_bank_ag"
      | "bank_austria"
      | "bankhaus_carl_spangler"
      | "bankhaus_schelhammer_und_schattera_ag"
      | "bawag_psk_ag"
      | "bks_bank_ag"
      | "brull_kallmus_bank_ag"
      | "btv_vier_lander_bank"
      | "capital_bank_grawe_gruppe_ag"
      | "deutsche_bank_ag"
      | "dolomitenbank"
      | "easybank_ag"
      | "erste_bank_und_sparkassen"
      | "hypo_alpeadriabank_international_ag"
      | "hypo_bank_burgenland_aktiengesellschaft"
      | "hypo_noe_lb_fur_niederosterreich_u_wien"
      | "hypo_oberosterreich_salzburg_steiermark"
      | "hypo_tirol_bank_ag"
      | "hypo_vorarlberg_bank_ag"
      | "marchfelder_bank"
      | "oberbank_ag"
      | "raiffeisen_bankengruppe_osterreich"
      | "schoellerbank_ag"
      | "sparda_bank_wien"
      | "volksbank_gruppe"
      | "volkskreditbank_ag"
      | "vr_bank_braunau";
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly fpx?: {
    readonly bank:
      | "affin_bank"
      | "agrobank"
      | "alliance_bank"
      | "ambank"
      | "bank_islam"
      | "bank_muamalat"
      | "bank_of_china"
      | "bank_rakyat"
      | "bnp_paribas"
      | "bsn"
      | "cimb"
      | "citibank"
      | "deutsche_bank"
      | "hong_leong_bank"
      | "hsbc"
      | "kfh"
      | "maybank2e"
      | "maybank2u"
      | "mbsb_bank"
      | "ocbc"
      | "pb_enterprise"
      | "public_bank"
      | "rhb"
      | "standard_chartered"
      | "uob";
  } & { readonly [x: string]: Schema.Json };
  readonly giropay?: { readonly [x: string]: Schema.Json };
  readonly grabpay?: { readonly [x: string]: Schema.Json };
  readonly ideal?: {
    readonly bank?:
      | "abn_amro"
      | "adyen"
      | "asn_bank"
      | "bunq"
      | "buut"
      | "finom"
      | "handelsbanken"
      | "ing"
      | "knab"
      | "mollie"
      | "moneyou"
      | "n26"
      | "nn"
      | "rabobank"
      | "regiobank"
      | "revolut"
      | "sns_bank"
      | "triodos_bank"
      | "van_lanschot"
      | "yoursafe";
  } & { readonly [x: string]: Schema.Json };
  readonly interac_present?: { readonly [x: string]: Schema.Json };
  readonly kakao_pay?: { readonly [x: string]: Schema.Json };
  readonly klarna?: {
    readonly dob?: {
      readonly day: number;
      readonly month: number;
      readonly year: number;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly konbini?: { readonly [x: string]: Schema.Json };
  readonly kr_card?: { readonly [x: string]: Schema.Json };
  readonly link?: { readonly [x: string]: Schema.Json };
  readonly mb_way?: { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly mobilepay?: { readonly [x: string]: Schema.Json };
  readonly multibanco?: { readonly [x: string]: Schema.Json };
  readonly naver_pay?: { readonly funding?: "card" | "points" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly nz_bank_account?: {
    readonly account_holder_name?: string;
    readonly account_number: string;
    readonly bank_code: string;
    readonly branch_code: string;
    readonly reference?: string;
    readonly suffix: string;
  } & { readonly [x: string]: Schema.Json };
  readonly oxxo?: { readonly [x: string]: Schema.Json };
  readonly p24?: {
    readonly bank?:
      | "alior_bank"
      | "bank_millennium"
      | "bank_nowy_bfg_sa"
      | "bank_pekao_sa"
      | "banki_spbdzielcze"
      | "blik"
      | "bnp_paribas"
      | "boz"
      | "citi_handlowy"
      | "credit_agricole"
      | "envelobank"
      | "etransfer_pocztowy24"
      | "getin_bank"
      | "ideabank"
      | "ing"
      | "inteligo"
      | "mbank_mtransfer"
      | "nest_przelew"
      | "noble_pay"
      | "pbac_z_ipko"
      | "plus_bank"
      | "santander_przelew24"
      | "tmobile_usbugi_bankowe"
      | "toyota_bank"
      | "velobank"
      | "volkswagen_bank";
  } & { readonly [x: string]: Schema.Json };
  readonly pay_by_bank?: { readonly [x: string]: Schema.Json };
  readonly payco?: { readonly [x: string]: Schema.Json };
  readonly payment_method?: string;
  readonly paynow?: { readonly [x: string]: Schema.Json };
  readonly paypal?: { readonly [x: string]: Schema.Json };
  readonly paypay?: { readonly [x: string]: Schema.Json };
  readonly payto?: {
    readonly account_number?: string;
    readonly bsb_number?: string;
    readonly pay_id?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly pix?: { readonly [x: string]: Schema.Json };
  readonly promptpay?: { readonly [x: string]: Schema.Json };
  readonly radar_options?: { readonly session?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly revolut_pay?: { readonly [x: string]: Schema.Json };
  readonly samsung_pay?: { readonly [x: string]: Schema.Json };
  readonly satispay?: { readonly [x: string]: Schema.Json };
  readonly scalapay?: { readonly [x: string]: Schema.Json };
  readonly sepa_debit?: { readonly iban: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly sequra?: { readonly [x: string]: Schema.Json };
  readonly sofort?: {
    readonly country: "AT" | "BE" | "DE" | "ES" | "IT" | "NL";
  } & { readonly [x: string]: Schema.Json };
  readonly sunbit?: { readonly [x: string]: Schema.Json };
  readonly swish?: { readonly [x: string]: Schema.Json };
  readonly twint?: { readonly [x: string]: Schema.Json };
  readonly type?:
    | "acss_debit"
    | "affirm"
    | "afterpay_clearpay"
    | "alipay"
    | "alma"
    | "amazon_pay"
    | "au_becs_debit"
    | "bacs_debit"
    | "bancontact"
    | "billie"
    | "bizum"
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
    | "kakao_pay"
    | "klarna"
    | "konbini"
    | "kr_card"
    | "link"
    | "mb_way"
    | "mobilepay"
    | "multibanco"
    | "naver_pay"
    | "nz_bank_account"
    | "oxxo"
    | "p24"
    | "pay_by_bank"
    | "payco"
    | "paynow"
    | "paypal"
    | "paypay"
    | "payto"
    | "pix"
    | "promptpay"
    | "revolut_pay"
    | "samsung_pay"
    | "satispay"
    | "scalapay"
    | "sepa_debit"
    | "sequra"
    | "sofort"
    | "sunbit"
    | "swish"
    | "twint"
    | "upi"
    | "us_bank_account"
    | "wechat_pay"
    | "zip";
  readonly upi?: {
    readonly mandate_options?: {
      readonly amount?: number;
      readonly amount_type?: "fixed" | "maximum";
      readonly description?: string;
      readonly end_date?: number;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly us_bank_account?: {
    readonly account_holder_type?: "company" | "individual";
    readonly account_number?: string;
    readonly account_type?: "checking" | "savings";
    readonly financial_connections_account?: string;
    readonly routing_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly wechat_pay?: { readonly [x: string]: Schema.Json };
  readonly zip?: { readonly [x: string]: Schema.Json };
};
export type PostPaymentMethodsOutput = Stripepayment_method;
export type PostPaymentMethodsError = Stripeerror;
export type GetPaymentMethodsPaymentMethodInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method: string;
};
export type GetPaymentMethodsPaymentMethodOutput = Stripepayment_method;
export type GetPaymentMethodsPaymentMethodError = Stripeerror;
export type PostPaymentMethodsPaymentMethodInput = {
  readonly allow_redisplay?: "always" | "limited" | "unspecified";
  readonly billing_details?: {
    readonly address?:
      | ({
          readonly city?: string;
          readonly country?: string;
          readonly line1?: string;
          readonly line2?: string;
          readonly postal_code?: string;
          readonly state?: string;
        } & { readonly [x: string]: Schema.Json })
      | "";
    readonly email?: string | "";
    readonly name?: string | "";
    readonly phone?: string | "";
    readonly tax_id?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly card?: {
    readonly exp_month?: number;
    readonly exp_year?: number;
    readonly networks?: {
      readonly preferred?: "" | "cartes_bancaires" | "mastercard" | "visa";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly us_bank_account?: {
    readonly account_holder_type?: "company" | "individual";
    readonly account_type?: "checking" | "savings";
  } & { readonly [x: string]: Schema.Json };
  readonly payment_method: string;
};
export type PostPaymentMethodsPaymentMethodOutput = Stripepayment_method;
export type PostPaymentMethodsPaymentMethodError = Stripeerror;
export type PostPaymentMethodsPaymentMethodAttachInput = {
  readonly customer?: string;
  readonly customer_account?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method: string;
};
export type PostPaymentMethodsPaymentMethodAttachOutput = Stripepayment_method;
export type PostPaymentMethodsPaymentMethodAttachError = Stripeerror;
export type PostPaymentMethodsPaymentMethodDetachInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_method: string;
};
export type PostPaymentMethodsPaymentMethodDetachOutput = Stripepayment_method;
export type PostPaymentMethodsPaymentMethodDetachError = Stripeerror;

export const GetPaymentMethodsInput = Schema.Struct({
  allow_redisplay: Schema.optionalKey(
    Schema.Literals(["always", "limited", "unspecified"]),
  ),
  customer: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  ending_before: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  type: Schema.optionalKey(
    Schema.Literals([
      "acss_debit",
      "affirm",
      "afterpay_clearpay",
      "alipay",
      "alma",
      "amazon_pay",
      "au_becs_debit",
      "bacs_debit",
      "bancontact",
      "billie",
      "bizum",
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
      "kakao_pay",
      "klarna",
      "konbini",
      "kr_card",
      "link",
      "mb_way",
      "mobilepay",
      "multibanco",
      "naver_pay",
      "nz_bank_account",
      "oxxo",
      "p24",
      "pay_by_bank",
      "payco",
      "paynow",
      "paypal",
      "paypay",
      "payto",
      "pix",
      "promptpay",
      "revolut_pay",
      "samsung_pay",
      "satispay",
      "scalapay",
      "sepa_debit",
      "sequra",
      "sofort",
      "sunbit",
      "swish",
      "twint",
      "upi",
      "us_bank_account",
      "wechat_pay",
      "zip",
    ]),
  ),
});
export const GetPaymentMethodsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripepayment_method),
    has_more: Schema.Boolean.annotate({
      description:
        "True if this list has another page of items after this one that can be fetched.",
    }),
    object: Schema.Literal("list").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value. Always has the value `list`.",
    }),
    url: Schema.String.annotate({
      description: "The URL where this list can be accessed.",
    })
      .check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^\\/v1\\/payment_methods", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/payment_methods",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "PaymentFlowsPaymentMethodList", description: "" });
export const GetPaymentMethodsError = Stripeerror;
export const PostPaymentMethodsInput = Schema.Struct({
  acss_debit: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_number: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        institution_number: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        transit_number: Schema.String.check(
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
      title: "payment_method_param",
      description:
        "If this is an `acss_debit` PaymentMethod, this hash contains details about the ACSS Debit payment method.",
    }),
  ),
  affirm: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `affirm` PaymentMethod, this hash contains details about the Affirm payment method.",
    }),
  ),
  afterpay_clearpay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `AfterpayClearpay` PaymentMethod, this hash contains details about the AfterpayClearpay payment method.",
    }),
  ),
  alipay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `Alipay` PaymentMethod, this hash contains details about the Alipay payment method.",
    }),
  ),
  allow_redisplay: Schema.optionalKey(
    Schema.Literals(["always", "limited", "unspecified"]).annotate({
      description:
        "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to `unspecified`.",
    }),
  ),
  alma: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an Alma PaymentMethod, this hash contains details about the Alma payment method.",
    }),
  ),
  amazon_pay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an AmazonPay PaymentMethod, this hash contains details about the AmazonPay payment method.",
    }),
  ),
  au_becs_debit: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_number: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        bsb_number: Schema.String.check(
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
      title: "param",
      description:
        "If this is an `au_becs_debit` PaymentMethod, this hash contains details about the bank account.",
    }),
  ),
  bacs_debit: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_number: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        sort_code: Schema.optionalKey(
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
    ).annotate({
      title: "param",
      description:
        "If this is a `bacs_debit` PaymentMethod, this hash contains details about the Bacs Direct Debit bank account.",
    }),
  ),
  bancontact: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `bancontact` PaymentMethod, this hash contains details about the Bancontact payment method.",
    }),
  ),
  billie: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `billie` PaymentMethod, this hash contains details about the Billie payment method.",
    }),
  ),
  billing_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
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
            ).annotate({ title: "billing_details_address" }),
            Schema.Literal(""),
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(800).annotate({
                expected: "a string with at most 800 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
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
        tax_id: Schema.optionalKey(
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
    ).annotate({
      title: "billing_details_inner_params",
      description:
        "Billing information associated with the PaymentMethod that may be used or required by particular types of payment methods.",
    }),
  ),
  bizum: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `bizum` PaymentMethod, this hash contains details about the Bizum payment method.",
    }),
  ),
  blik: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `blik` PaymentMethod, this hash contains details about the BLIK payment method.",
    }),
  ),
  boleto: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        tax_id: Schema.String.check(
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
      title: "param",
      description:
        "If this is a `boleto` PaymentMethod, this hash contains details about the Boleto payment method.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          cvc: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          exp_month: Schema.Int,
          exp_year: Schema.Int,
          networks: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                preferred: Schema.optionalKey(
                  Schema.Literals(["cartes_bancaires", "mastercard", "visa"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "networks_params" }),
          ),
          number: Schema.String.check(
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
      ).annotate({ title: "card_details_params" }),
      Schema.StructWithRest(
        Schema.Struct({
          token: Schema.String.check(
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
      ).annotate({ title: "token_params" }),
    ]).annotate({
      description:
        'If this is a `card` PaymentMethod, this hash contains the user\'s card details. For backwards compatibility, you can alternatively provide a Stripe token (e.g., for Apple Pay, Amex Express Checkout, or legacy Checkout) into the card hash with format `card: {token: "tok_visa"}`. When providing a card number, you must meet the requirements for [PCI compliance](https://stripe.com/docs/security#validating-pci-compliance). We strongly recommend using Stripe.js instead of interacting with this API directly.',
    }),
  ),
  cashapp: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `cashapp` PaymentMethod, this hash contains details about the Cash App Pay payment method.",
    }),
  ),
  crypto: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a Crypto PaymentMethod, this hash contains details about the Crypto payment method.",
    }),
  ),
  custom: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        type: Schema.String.check(
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
      title: "create_param",
      description:
        "If this is a `custom` PaymentMethod, this hash contains details about the Custom payment method.",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The `Customer` to whom the original PaymentMethod is attached.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_balance: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `customer_balance` PaymentMethod, this hash contains details about the CustomerBalance payment method.",
    }),
  ),
  eps: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank: Schema.optionalKey(
          Schema.Literals([
            "arzte_und_apotheker_bank",
            "austrian_anadi_bank_ag",
            "bank_austria",
            "bankhaus_carl_spangler",
            "bankhaus_schelhammer_und_schattera_ag",
            "bawag_psk_ag",
            "bks_bank_ag",
            "brull_kallmus_bank_ag",
            "btv_vier_lander_bank",
            "capital_bank_grawe_gruppe_ag",
            "deutsche_bank_ag",
            "dolomitenbank",
            "easybank_ag",
            "erste_bank_und_sparkassen",
            "hypo_alpeadriabank_international_ag",
            "hypo_bank_burgenland_aktiengesellschaft",
            "hypo_noe_lb_fur_niederosterreich_u_wien",
            "hypo_oberosterreich_salzburg_steiermark",
            "hypo_tirol_bank_ag",
            "hypo_vorarlberg_bank_ag",
            "marchfelder_bank",
            "oberbank_ag",
            "raiffeisen_bankengruppe_osterreich",
            "schoellerbank_ag",
            "sparda_bank_wien",
            "volksbank_gruppe",
            "volkskreditbank_ag",
            "vr_bank_braunau",
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
      title: "param",
      description:
        "If this is an `eps` PaymentMethod, this hash contains details about the EPS payment method.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  fpx: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank: Schema.Literals([
          "affin_bank",
          "agrobank",
          "alliance_bank",
          "ambank",
          "bank_islam",
          "bank_muamalat",
          "bank_of_china",
          "bank_rakyat",
          "bnp_paribas",
          "bsn",
          "cimb",
          "citibank",
          "deutsche_bank",
          "hong_leong_bank",
          "hsbc",
          "kfh",
          "maybank2e",
          "maybank2u",
          "mbsb_bank",
          "ocbc",
          "pb_enterprise",
          "public_bank",
          "rhb",
          "standard_chartered",
          "uob",
        ]),
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
        "If this is an `fpx` PaymentMethod, this hash contains details about the FPX payment method.",
    }),
  ),
  giropay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `giropay` PaymentMethod, this hash contains details about the Giropay payment method.",
    }),
  ),
  grabpay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `grabpay` PaymentMethod, this hash contains details about the GrabPay payment method.",
    }),
  ),
  ideal: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank: Schema.optionalKey(
          Schema.Literals([
            "abn_amro",
            "adyen",
            "asn_bank",
            "bunq",
            "buut",
            "finom",
            "handelsbanken",
            "ing",
            "knab",
            "mollie",
            "moneyou",
            "n26",
            "nn",
            "rabobank",
            "regiobank",
            "revolut",
            "sns_bank",
            "triodos_bank",
            "van_lanschot",
            "yoursafe",
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
      title: "param",
      description:
        "If this is an `ideal` PaymentMethod, this hash contains details about the iDEAL payment method.",
    }),
  ),
  interac_present: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `interac_present` PaymentMethod, this hash contains details about the Interac Present payment method.",
    }),
  ),
  kakao_pay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `kakao_pay` PaymentMethod, this hash contains details about the Kakao Pay payment method.",
    }),
  ),
  klarna: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        dob: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              day: Schema.Int,
              month: Schema.Int,
              year: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "date_of_birth" }),
        ),
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
        "If this is a `klarna` PaymentMethod, this hash contains details about the Klarna payment method.",
    }),
  ),
  konbini: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `konbini` PaymentMethod, this hash contains details about the Konbini payment method.",
    }),
  ),
  kr_card: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `kr_card` PaymentMethod, this hash contains details about the Korean Card payment method.",
    }),
  ),
  link: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `Link` PaymentMethod, this hash contains details about the Link payment method (Link is also known as Onelink in the UK).",
    }),
  ),
  mb_way: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a MB WAY PaymentMethod, this hash contains details about the MB WAY payment method.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  mobilepay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `mobilepay` PaymentMethod, this hash contains details about the MobilePay payment method.",
    }),
  ),
  multibanco: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `multibanco` PaymentMethod, this hash contains details about the Multibanco payment method.",
    }),
  ),
  naver_pay: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        funding: Schema.optionalKey(Schema.Literals(["card", "points"])),
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
        "If this is a `naver_pay` PaymentMethod, this hash contains details about the Naver Pay payment method.",
    }),
  ),
  nz_bank_account: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_holder_name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        account_number: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        bank_code: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        branch_code: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        reference: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          ),
        ),
        suffix: Schema.String.check(
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
      title: "param",
      description:
        "If this is an nz_bank_account PaymentMethod, this hash contains details about the nz_bank_account payment method.",
    }),
  ),
  oxxo: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `oxxo` PaymentMethod, this hash contains details about the OXXO payment method.",
    }),
  ),
  p24: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        bank: Schema.optionalKey(
          Schema.Literals([
            "alior_bank",
            "bank_millennium",
            "bank_nowy_bfg_sa",
            "bank_pekao_sa",
            "banki_spbdzielcze",
            "blik",
            "bnp_paribas",
            "boz",
            "citi_handlowy",
            "credit_agricole",
            "envelobank",
            "etransfer_pocztowy24",
            "getin_bank",
            "ideabank",
            "ing",
            "inteligo",
            "mbank_mtransfer",
            "nest_przelew",
            "noble_pay",
            "pbac_z_ipko",
            "plus_bank",
            "santander_przelew24",
            "tmobile_usbugi_bankowe",
            "toyota_bank",
            "velobank",
            "volkswagen_bank",
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
      title: "param",
      description:
        "If this is a `p24` PaymentMethod, this hash contains details about the P24 payment method.",
    }),
  ),
  pay_by_bank: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `pay_by_bank` PaymentMethod, this hash contains details about the PayByBank payment method.",
    }),
  ),
  payco: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `payco` PaymentMethod, this hash contains details about the PAYCO payment method.",
    }),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description: "The PaymentMethod to share.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  paynow: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `paynow` PaymentMethod, this hash contains details about the PayNow payment method.",
    }),
  ),
  paypal: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `paypal` PaymentMethod, this hash contains details about the PayPal payment method.",
    }),
  ),
  paypay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `paypay` PaymentMethod, this hash contains details about the PayPay payment method.",
    }),
  ),
  payto: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_number: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        bsb_number: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        pay_id: Schema.optionalKey(
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
    ).annotate({
      title: "param",
      description:
        "If this is a `payto` PaymentMethod, this hash contains details about the PayTo payment method.",
    }),
  ),
  pix: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `pix` PaymentMethod, this hash contains details about the Pix payment method.",
    }),
  ),
  promptpay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `promptpay` PaymentMethod, this hash contains details about the PromptPay payment method.",
    }),
  ),
  radar_options: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        session: Schema.optionalKey(
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
    ).annotate({
      title: "radar_options_with_hidden_options",
      description:
        "Options to configure Radar. See [Radar Session](https://docs.stripe.com/radar/radar-session) for more information.",
    }),
  ),
  revolut_pay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `revolut_pay` PaymentMethod, this hash contains details about the Revolut Pay payment method.",
    }),
  ),
  samsung_pay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `samsung_pay` PaymentMethod, this hash contains details about the SamsungPay payment method.",
    }),
  ),
  satispay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `satispay` PaymentMethod, this hash contains details about the Satispay payment method.",
    }),
  ),
  scalapay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a Scalapay PaymentMethod, this hash contains details about the Scalapay payment method.",
    }),
  ),
  sepa_debit: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        iban: Schema.String.check(
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
      title: "param",
      description:
        "If this is a `sepa_debit` PaymentMethod, this hash contains details about the SEPA debit bank account.",
    }),
  ),
  sequra: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a SeQura PaymentMethod, this hash contains details about the SeQura payment method.",
    }),
  ),
  sofort: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        country: Schema.Literals(["AT", "BE", "DE", "ES", "IT", "NL"]),
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
        "If this is a `sofort` PaymentMethod, this hash contains details about the SOFORT payment method.",
    }),
  ),
  sunbit: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `sunbit` PaymentMethod, this hash contains details about the Sunbit payment method.",
    }),
  ),
  swish: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `swish` PaymentMethod, this hash contains details about the Swish payment method.",
    }),
  ),
  twint: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a TWINT PaymentMethod, this hash contains details about the TWINT payment method.",
    }),
  ),
  type: Schema.optionalKey(
    Schema.Literals([
      "acss_debit",
      "affirm",
      "afterpay_clearpay",
      "alipay",
      "alma",
      "amazon_pay",
      "au_becs_debit",
      "bacs_debit",
      "bancontact",
      "billie",
      "bizum",
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
      "kakao_pay",
      "klarna",
      "konbini",
      "kr_card",
      "link",
      "mb_way",
      "mobilepay",
      "multibanco",
      "naver_pay",
      "nz_bank_account",
      "oxxo",
      "p24",
      "pay_by_bank",
      "payco",
      "paynow",
      "paypal",
      "paypay",
      "payto",
      "pix",
      "promptpay",
      "revolut_pay",
      "samsung_pay",
      "satispay",
      "scalapay",
      "sepa_debit",
      "sequra",
      "sofort",
      "sunbit",
      "swish",
      "twint",
      "upi",
      "us_bank_account",
      "wechat_pay",
      "zip",
    ]).annotate({
      description:
        "The type of the PaymentMethod. An additional hash is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type.",
    }),
  ),
  upi: Schema.optionalKey(
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
                    expected: "a string with at most 20 code points",
                  }),
                ),
              ),
              end_date: Schema.optionalKey(
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
          ).annotate({ title: "mandate_options" }),
        ),
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
        "If this is a `upi` PaymentMethod, this hash contains details about the UPI payment method.",
    }),
  ),
  us_bank_account: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_holder_type: Schema.optionalKey(
          Schema.Literals(["company", "individual"]),
        ),
        account_number: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        account_type: Schema.optionalKey(
          Schema.Literals(["checking", "savings"]),
        ),
        financial_connections_account: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        routing_number: Schema.optionalKey(
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
    ).annotate({
      title: "payment_method_param",
      description:
        "If this is an `us_bank_account` PaymentMethod, this hash contains details about the US bank account payment method.",
    }),
  ),
  wechat_pay: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is an `wechat_pay` PaymentMethod, this hash contains details about the wechat_pay payment method.",
    }),
  ),
  zip: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      title: "param",
      description:
        "If this is a `zip` PaymentMethod, this hash contains details about the Zip payment method.",
    }),
  ),
});
export const PostPaymentMethodsOutput = Stripepayment_method;
export const PostPaymentMethodsError = Stripeerror;
export const GetPaymentMethodsPaymentMethodInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  payment_method: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetPaymentMethodsPaymentMethodOutput = Stripepayment_method;
export const GetPaymentMethodsPaymentMethodError = Stripeerror;
export const PostPaymentMethodsPaymentMethodInput = Schema.Struct({
  allow_redisplay: Schema.optionalKey(
    Schema.Literals(["always", "limited", "unspecified"]).annotate({
      description:
        "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to `unspecified`.",
    }),
  ),
  billing_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
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
            ).annotate({ title: "billing_details_address" }),
            Schema.Literal(""),
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(800).annotate({
                expected: "a string with at most 800 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Literal(""),
          ]),
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
        tax_id: Schema.optionalKey(
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
    ).annotate({
      title: "billing_details_inner_params",
      description:
        "Billing information associated with the PaymentMethod that may be used or required by particular types of payment methods.",
    }),
  ),
  card: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        exp_month: Schema.optionalKey(Schema.Int),
        exp_year: Schema.optionalKey(Schema.Int),
        networks: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              preferred: Schema.optionalKey(
                Schema.Literals(["", "cartes_bancaires", "mastercard", "visa"]),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "networks_update_api_param" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "update_api_param",
      description:
        "If this is a `card` PaymentMethod, this hash contains the user's card details.",
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
      description: "Specifies which fields in the response should be expanded.",
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
  us_bank_account: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        account_holder_type: Schema.optionalKey(
          Schema.Literals(["company", "individual"]),
        ),
        account_type: Schema.optionalKey(
          Schema.Literals(["checking", "savings"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "update_param",
      description:
        "If this is an `us_bank_account` PaymentMethod, this hash contains details about the US bank account payment method.",
    }),
  ),
  payment_method: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPaymentMethodsPaymentMethodOutput = Stripepayment_method;
export const PostPaymentMethodsPaymentMethodError = Stripeerror;
export const PostPaymentMethodsPaymentMethodAttachInput = Schema.Struct({
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the customer to which to attach the PaymentMethod.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  customer_account: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the Account representing the customer to which to attach the PaymentMethod.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  payment_method: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPaymentMethodsPaymentMethodAttachOutput = Stripepayment_method;
export const PostPaymentMethodsPaymentMethodAttachError = Stripeerror;
export const PostPaymentMethodsPaymentMethodDetachInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ).annotate({
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  payment_method: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostPaymentMethodsPaymentMethodDetachOutput = Stripepayment_method;
export const PostPaymentMethodsPaymentMethodDetachError = Stripeerror;
/**
 * The GetPaymentMethodsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentMethodsOperation: StripeOperation & {
  readonly input: typeof GetPaymentMethodsInput;
  readonly output: typeof GetPaymentMethodsOutput;
  readonly error: typeof GetPaymentMethodsError;
} = {
  name: "GetPaymentMethods",
  method: "GET",
  path: "/v1/payment_methods",
  pathParameters: [],
  queryParameters: [
    "allow_redisplay",
    "customer",
    "customer_account",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "type",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentMethodsInput,
  output: GetPaymentMethodsOutput,
  error: GetPaymentMethodsError,
};
/**
 * The PostPaymentMethodsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodsOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodsInput;
  readonly output: typeof PostPaymentMethodsOutput;
  readonly error: typeof PostPaymentMethodsError;
} = {
  name: "PostPaymentMethods",
  method: "POST",
  path: "/v1/payment_methods",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodsInput,
  output: PostPaymentMethodsOutput,
  error: PostPaymentMethodsError,
};
/**
 * The GetPaymentMethodsPaymentMethodOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetPaymentMethodsPaymentMethodOperation: StripeOperation & {
  readonly input: typeof GetPaymentMethodsPaymentMethodInput;
  readonly output: typeof GetPaymentMethodsPaymentMethodOutput;
  readonly error: typeof GetPaymentMethodsPaymentMethodError;
} = {
  name: "GetPaymentMethodsPaymentMethod",
  method: "GET",
  path: "/v1/payment_methods/{payment_method}",
  pathParameters: ["payment_method"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetPaymentMethodsPaymentMethodInput,
  output: GetPaymentMethodsPaymentMethodOutput,
  error: GetPaymentMethodsPaymentMethodError,
};
/**
 * The PostPaymentMethodsPaymentMethodOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodsPaymentMethodOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodsPaymentMethodInput;
  readonly output: typeof PostPaymentMethodsPaymentMethodOutput;
  readonly error: typeof PostPaymentMethodsPaymentMethodError;
} = {
  name: "PostPaymentMethodsPaymentMethod",
  method: "POST",
  path: "/v1/payment_methods/{payment_method}",
  pathParameters: ["payment_method"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodsPaymentMethodInput,
  output: PostPaymentMethodsPaymentMethodOutput,
  error: PostPaymentMethodsPaymentMethodError,
};
/**
 * The PostPaymentMethodsPaymentMethodAttachOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodsPaymentMethodAttachOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodsPaymentMethodAttachInput;
  readonly output: typeof PostPaymentMethodsPaymentMethodAttachOutput;
  readonly error: typeof PostPaymentMethodsPaymentMethodAttachError;
} = {
  name: "PostPaymentMethodsPaymentMethodAttach",
  method: "POST",
  path: "/v1/payment_methods/{payment_method}/attach",
  pathParameters: ["payment_method"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodsPaymentMethodAttachInput,
  output: PostPaymentMethodsPaymentMethodAttachOutput,
  error: PostPaymentMethodsPaymentMethodAttachError,
};
/**
 * The PostPaymentMethodsPaymentMethodDetachOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostPaymentMethodsPaymentMethodDetachOperation: StripeOperation & {
  readonly input: typeof PostPaymentMethodsPaymentMethodDetachInput;
  readonly output: typeof PostPaymentMethodsPaymentMethodDetachOutput;
  readonly error: typeof PostPaymentMethodsPaymentMethodDetachError;
} = {
  name: "PostPaymentMethodsPaymentMethodDetach",
  method: "POST",
  path: "/v1/payment_methods/{payment_method}/detach",
  pathParameters: ["payment_method"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostPaymentMethodsPaymentMethodDetachInput,
  output: PostPaymentMethodsPaymentMethodDetachOutput,
  error: PostPaymentMethodsPaymentMethodDetachError,
};
/**
 * The makePaymentMethodsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makePaymentMethodsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetPaymentMethods function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentMethods = Effect.fn("paymentMethods.GetPaymentMethods")(
    function* (input: GetPaymentMethodsInput) {
      const response: GetPaymentMethodsOutput = yield* client.invoke(
        GetPaymentMethodsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostPaymentMethods function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethods = Effect.fn("paymentMethods.PostPaymentMethods")(
    function* (input: PostPaymentMethodsInput) {
      const response: PostPaymentMethodsOutput = yield* client.invoke(
        PostPaymentMethodsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetPaymentMethodsPaymentMethod function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetPaymentMethodsPaymentMethod = Effect.fn(
    "paymentMethods.GetPaymentMethodsPaymentMethod",
  )(function* (input: GetPaymentMethodsPaymentMethodInput) {
    const response: GetPaymentMethodsPaymentMethodOutput = yield* client.invoke(
      GetPaymentMethodsPaymentMethodOperation,
      input,
    );
    return response;
  });
  /**
   * The PostPaymentMethodsPaymentMethod function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodsPaymentMethod = Effect.fn(
    "paymentMethods.PostPaymentMethodsPaymentMethod",
  )(function* (input: PostPaymentMethodsPaymentMethodInput) {
    const response: PostPaymentMethodsPaymentMethodOutput =
      yield* client.invoke(PostPaymentMethodsPaymentMethodOperation, input);
    return response;
  });
  /**
   * The PostPaymentMethodsPaymentMethodAttach function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodsPaymentMethodAttach = Effect.fn(
    "paymentMethods.PostPaymentMethodsPaymentMethodAttach",
  )(function* (input: PostPaymentMethodsPaymentMethodAttachInput) {
    const response: PostPaymentMethodsPaymentMethodAttachOutput =
      yield* client.invoke(
        PostPaymentMethodsPaymentMethodAttachOperation,
        input,
      );
    return response;
  });
  /**
   * The PostPaymentMethodsPaymentMethodDetach function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostPaymentMethodsPaymentMethodDetach = Effect.fn(
    "paymentMethods.PostPaymentMethodsPaymentMethodDetach",
  )(function* (input: PostPaymentMethodsPaymentMethodDetachInput) {
    const response: PostPaymentMethodsPaymentMethodDetachOutput =
      yield* client.invoke(
        PostPaymentMethodsPaymentMethodDetachOperation,
        input,
      );
    return response;
  });
  return {
    GetPaymentMethods,
    PostPaymentMethods,
    GetPaymentMethodsPaymentMethod,
    PostPaymentMethodsPaymentMethod,
    PostPaymentMethodsPaymentMethodAttach,
    PostPaymentMethodsPaymentMethodDetach,
  };
});
