// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaddress, Stripeshipping } from "./common.js";

export type Stripesource_type_ach_credit_transfer = {
  readonly account_number?: string | null;
  readonly bank_name?: string | null;
  readonly fingerprint?: string | null;
  readonly refund_account_holder_name?: string | null;
  readonly refund_account_holder_type?: string | null;
  readonly refund_routing_number?: string | null;
  readonly routing_number?: string | null;
  readonly swift_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_ach_debit = {
  readonly bank_name?: string | null;
  readonly country?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly routing_number?: string | null;
  readonly type?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_acss_debit = {
  readonly bank_address_city?: string | null;
  readonly bank_address_line_1?: string | null;
  readonly bank_address_line_2?: string | null;
  readonly bank_address_postal_code?: string | null;
  readonly bank_name?: string | null;
  readonly category?: string | null;
  readonly country?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly routing_number?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_alipay = {
  readonly data_string?: string | null;
  readonly native_url?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_au_becs_debit = {
  readonly bsb_number?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_bancontact = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_card = {
  readonly address_line1_check?: string | null;
  readonly address_zip_check?: string | null;
  readonly brand?: string | null;
  readonly country?: string | null;
  readonly cvc_check?: string | null;
  readonly dynamic_last4?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly fingerprint?: string;
  readonly funding?: string | null;
  readonly last4?: string | null;
  readonly name?: string | null;
  readonly three_d_secure?: string;
  readonly tokenization_method?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_card_present = {
  readonly application_cryptogram?: string;
  readonly application_preferred_name?: string;
  readonly authorization_code?: string | null;
  readonly authorization_response_code?: string;
  readonly brand?: string | null;
  readonly country?: string | null;
  readonly cvm_type?: string;
  readonly data_type?: string | null;
  readonly dedicated_file_name?: string;
  readonly emv_auth_data?: string;
  readonly evidence_customer_signature?: string | null;
  readonly evidence_transaction_certificate?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly fingerprint?: string;
  readonly funding?: string | null;
  readonly last4?: string | null;
  readonly pos_device_id?: string | null;
  readonly pos_entry_mode?: string;
  readonly read_method?: string | null;
  readonly reader?: string | null;
  readonly terminal_verification_results?: string;
  readonly transaction_status_information?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_code_verification_flow = {
  readonly attempts_remaining: number;
  readonly status: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_eps = {
  readonly reference?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_giropay = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_ideal = {
  readonly bank?: string | null;
  readonly bic?: string | null;
  readonly iban_last4?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_klarna = {
  readonly background_image_url?: string;
  readonly client_token?: string | null;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly locale?: string;
  readonly logo_url?: string;
  readonly page_title?: string;
  readonly pay_later_asset_urls_descriptive?: string;
  readonly pay_later_asset_urls_standard?: string;
  readonly pay_later_name?: string;
  readonly pay_later_redirect_url?: string;
  readonly pay_now_asset_urls_descriptive?: string;
  readonly pay_now_asset_urls_standard?: string;
  readonly pay_now_name?: string;
  readonly pay_now_redirect_url?: string;
  readonly pay_over_time_asset_urls_descriptive?: string;
  readonly pay_over_time_asset_urls_standard?: string;
  readonly pay_over_time_name?: string;
  readonly pay_over_time_redirect_url?: string;
  readonly payment_method_categories?: string;
  readonly purchase_country?: string;
  readonly purchase_type?: string;
  readonly redirect_url?: string;
  readonly shipping_delay?: number;
  readonly shipping_first_name?: string;
  readonly shipping_last_name?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_multibanco = {
  readonly entity?: string | null;
  readonly reference?: string | null;
  readonly refund_account_holder_address_city?: string | null;
  readonly refund_account_holder_address_country?: string | null;
  readonly refund_account_holder_address_line1?: string | null;
  readonly refund_account_holder_address_line2?: string | null;
  readonly refund_account_holder_address_postal_code?: string | null;
  readonly refund_account_holder_address_state?: string | null;
  readonly refund_account_holder_name?: string | null;
  readonly refund_iban?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_p24 = { readonly reference?: string | null } & {
  readonly [x: string]: Schema.Json;
};
export type Stripesource_receiver_flow = {
  readonly address?: string | null;
  readonly amount_charged: number;
  readonly amount_received: number;
  readonly amount_returned: number;
  readonly refund_attributes_method: string;
  readonly refund_attributes_status: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_redirect_flow = {
  readonly failure_reason?: string | null;
  readonly return_url: string;
  readonly status: string;
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_sepa_debit = {
  readonly bank_code?: string | null;
  readonly branch_code?: string | null;
  readonly country?: string | null;
  readonly fingerprint?: string | null;
  readonly last4?: string | null;
  readonly mandate_reference?: string | null;
  readonly mandate_url?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_sofort = {
  readonly bank_code?: string | null;
  readonly bank_name?: string | null;
  readonly bic?: string | null;
  readonly country?: string | null;
  readonly iban_last4?: string | null;
  readonly preferred_language?: string | null;
  readonly statement_descriptor?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_order_item = {
  readonly amount?: number | null;
  readonly currency?: string | null;
  readonly description?: string | null;
  readonly parent?: string | null;
  readonly quantity?: number;
  readonly type?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_three_d_secure = {
  readonly address_line1_check?: string | null;
  readonly address_zip_check?: string | null;
  readonly authenticated?: boolean | null;
  readonly brand?: string | null;
  readonly card?: string | null;
  readonly country?: string | null;
  readonly customer?: string | null;
  readonly cvc_check?: string | null;
  readonly dynamic_last4?: string | null;
  readonly exp_month?: number | null;
  readonly exp_year?: number | null;
  readonly fingerprint?: string;
  readonly funding?: string | null;
  readonly last4?: string | null;
  readonly name?: string | null;
  readonly three_d_secure?: string;
  readonly tokenization_method?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_type_wechat = {
  readonly prepay_id?: string;
  readonly qr_code_url?: string | null;
  readonly statement_descriptor?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_mandate_notification_acss_debit_data = {
  readonly statement_descriptor?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_mandate_notification_bacs_debit_data = {
  readonly last4?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_mandate_notification_sepa_debit_data = {
  readonly creditor_identifier?: string;
  readonly last4?: string;
  readonly mandate_reference?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction_ach_credit_transfer_data = {
  readonly customer_data?: string;
  readonly fingerprint?: string;
  readonly last4?: string;
  readonly routing_number?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction_chf_credit_transfer_data = {
  readonly reference?: string;
  readonly sender_address_country?: string;
  readonly sender_address_line1?: string;
  readonly sender_iban?: string;
  readonly sender_name?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction_gbp_credit_transfer_data = {
  readonly fingerprint?: string;
  readonly funding_method?: string;
  readonly last4?: string;
  readonly reference?: string;
  readonly sender_account_number?: string;
  readonly sender_name?: string;
  readonly sender_sort_code?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction_paper_check_data = {
  readonly available_at?: string;
  readonly invoices?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction_sepa_credit_transfer_data = {
  readonly reference?: string;
  readonly sender_iban?: string;
  readonly sender_name?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_owner = {
  readonly address?: Stripeaddress | null;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly verified_address?: Stripeaddress | null;
  readonly verified_email?: string | null;
  readonly verified_name?: string | null;
  readonly verified_phone?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_transaction = {
  readonly ach_credit_transfer?: Stripesource_transaction_ach_credit_transfer_data;
  readonly amount: number;
  readonly chf_credit_transfer?: Stripesource_transaction_chf_credit_transfer_data;
  readonly created: number;
  readonly currency: string;
  readonly gbp_credit_transfer?: Stripesource_transaction_gbp_credit_transfer_data;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "source_transaction";
  readonly paper_check?: Stripesource_transaction_paper_check_data;
  readonly sepa_credit_transfer?: Stripesource_transaction_sepa_credit_transfer_data;
  readonly source: string;
  readonly status: string;
  readonly type:
    | "ach_credit_transfer"
    | "ach_debit"
    | "alipay"
    | "bancontact"
    | "card"
    | "card_present"
    | "eps"
    | "giropay"
    | "ideal"
    | "klarna"
    | "multibanco"
    | "p24"
    | "sepa_debit"
    | "sofort"
    | "three_d_secure"
    | "wechat";
} & { readonly [x: string]: Schema.Json };
export type Stripesource_order = {
  readonly amount: number;
  readonly currency: string;
  readonly email?: string;
  readonly items?: ReadonlyArray<Stripesource_order_item> | null;
  readonly shipping?: Stripeshipping;
} & { readonly [x: string]: Schema.Json };
export type Stripesource = {
  readonly ach_credit_transfer?: Stripesource_type_ach_credit_transfer;
  readonly ach_debit?: Stripesource_type_ach_debit;
  readonly acss_debit?: Stripesource_type_acss_debit;
  readonly alipay?: Stripesource_type_alipay;
  readonly allow_redisplay?: "always" | "limited" | "unspecified" | null;
  readonly amount?: number | null;
  readonly au_becs_debit?: Stripesource_type_au_becs_debit;
  readonly bancontact?: Stripesource_type_bancontact;
  readonly card?: Stripesource_type_card;
  readonly card_present?: Stripesource_type_card_present;
  readonly client_secret: string;
  readonly code_verification?: Stripesource_code_verification_flow;
  readonly created: number;
  readonly currency?: string | null;
  readonly customer?: string;
  readonly eps?: Stripesource_type_eps;
  readonly flow: string;
  readonly giropay?: Stripesource_type_giropay;
  readonly id: string;
  readonly ideal?: Stripesource_type_ideal;
  readonly klarna?: Stripesource_type_klarna;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly multibanco?: Stripesource_type_multibanco;
  readonly object: "source";
  readonly owner?: Stripesource_owner | null;
  readonly p24?: Stripesource_type_p24;
  readonly receiver?: Stripesource_receiver_flow;
  readonly redirect?: Stripesource_redirect_flow;
  readonly sepa_debit?: Stripesource_type_sepa_debit;
  readonly sofort?: Stripesource_type_sofort;
  readonly source_order?: Stripesource_order;
  readonly statement_descriptor?: string | null;
  readonly status: string;
  readonly three_d_secure?: Stripesource_type_three_d_secure;
  readonly type:
    | "ach_credit_transfer"
    | "ach_debit"
    | "acss_debit"
    | "alipay"
    | "au_becs_debit"
    | "bancontact"
    | "card"
    | "card_present"
    | "eps"
    | "giropay"
    | "ideal"
    | "klarna"
    | "multibanco"
    | "p24"
    | "sepa_debit"
    | "sofort"
    | "three_d_secure"
    | "wechat";
  readonly usage?: string | null;
  readonly wechat?: Stripesource_type_wechat;
} & { readonly [x: string]: Schema.Json };
export type Stripesource_mandate_notification = {
  readonly acss_debit?: Stripesource_mandate_notification_acss_debit_data;
  readonly amount?: number | null;
  readonly bacs_debit?: Stripesource_mandate_notification_bacs_debit_data;
  readonly created: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "source_mandate_notification";
  readonly reason: string;
  readonly sepa_debit?: Stripesource_mandate_notification_sepa_debit_data;
  readonly source: Stripesource;
  readonly status: string;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };

export const Stripesource_type_ach_credit_transfer = Schema.StructWithRest(
  Schema.Struct({
    account_number: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    refund_account_holder_name: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_type: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_routing_number: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    routing_number: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    swift_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_ach_credit_transfer" });
export const Stripesource_type_ach_debit = Schema.StructWithRest(
  Schema.Struct({
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    routing_number: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    type: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_ach_debit" });
export const Stripesource_type_acss_debit = Schema.StructWithRest(
  Schema.Struct({
    bank_address_city: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    bank_address_line_1: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    bank_address_line_2: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    bank_address_postal_code: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    routing_number: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_acss_debit" });
export const Stripesource_type_alipay = Schema.StructWithRest(
  Schema.Struct({
    data_string: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    native_url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_alipay" });
export const Stripesource_type_au_becs_debit = Schema.StructWithRest(
  Schema.Struct({
    bsb_number: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_au_becs_debit" });
export const Stripesource_type_bancontact = Schema.StructWithRest(
  Schema.Struct({
    bank_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bic: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    iban_last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    preferred_language: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_bancontact" });
export const Stripesource_type_card = Schema.StructWithRest(
  Schema.Struct({
    address_line1_check: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    address_zip_check: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    brand: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    cvc_check: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    dynamic_last4: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    exp_month: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    exp_year: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.String),
    funding: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    three_d_secure: Schema.optionalKey(Schema.String),
    tokenization_method: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_card" });
export const Stripesource_type_card_present = Schema.StructWithRest(
  Schema.Struct({
    application_cryptogram: Schema.optionalKey(Schema.String),
    application_preferred_name: Schema.optionalKey(Schema.String),
    authorization_code: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    authorization_response_code: Schema.optionalKey(Schema.String),
    brand: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    cvm_type: Schema.optionalKey(Schema.String),
    data_type: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    dedicated_file_name: Schema.optionalKey(Schema.String),
    emv_auth_data: Schema.optionalKey(Schema.String),
    evidence_customer_signature: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    evidence_transaction_certificate: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    exp_month: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    exp_year: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.String),
    funding: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    pos_device_id: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    pos_entry_mode: Schema.optionalKey(Schema.String),
    read_method: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    reader: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    terminal_verification_results: Schema.optionalKey(Schema.String),
    transaction_status_information: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_card_present" });
export const Stripesource_code_verification_flow = Schema.StructWithRest(
  Schema.Struct({
    attempts_remaining: Schema.Number.annotate({
      description:
        "The number of attempts remaining to authenticate the source object with a verification code.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    status: Schema.String.annotate({
      description:
        "The status of the code verification, either `pending` (awaiting verification, `attempts_remaining` should be greater than 0), `succeeded` (successful verification) or `failed` (failed verification, cannot be verified anymore as `attempts_remaining` should be 0).",
    }).check(
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
  title: "SourceCodeVerificationFlow",
  description: "",
  identifier: "Stripesource_code_verification_flow",
});
export const Stripesource_type_eps = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_eps" });
export const Stripesource_type_giropay = Schema.StructWithRest(
  Schema.Struct({
    bank_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bic: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_giropay" });
export const Stripesource_type_ideal = Schema.StructWithRest(
  Schema.Struct({
    bank: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bic: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    iban_last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_ideal" });
export const Stripesource_type_klarna = Schema.StructWithRest(
  Schema.Struct({
    background_image_url: Schema.optionalKey(Schema.String),
    client_token: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    locale: Schema.optionalKey(Schema.String),
    logo_url: Schema.optionalKey(Schema.String),
    page_title: Schema.optionalKey(Schema.String),
    pay_later_asset_urls_descriptive: Schema.optionalKey(Schema.String),
    pay_later_asset_urls_standard: Schema.optionalKey(Schema.String),
    pay_later_name: Schema.optionalKey(Schema.String),
    pay_later_redirect_url: Schema.optionalKey(Schema.String),
    pay_now_asset_urls_descriptive: Schema.optionalKey(Schema.String),
    pay_now_asset_urls_standard: Schema.optionalKey(Schema.String),
    pay_now_name: Schema.optionalKey(Schema.String),
    pay_now_redirect_url: Schema.optionalKey(Schema.String),
    pay_over_time_asset_urls_descriptive: Schema.optionalKey(Schema.String),
    pay_over_time_asset_urls_standard: Schema.optionalKey(Schema.String),
    pay_over_time_name: Schema.optionalKey(Schema.String),
    pay_over_time_redirect_url: Schema.optionalKey(Schema.String),
    payment_method_categories: Schema.optionalKey(Schema.String),
    purchase_country: Schema.optionalKey(Schema.String),
    purchase_type: Schema.optionalKey(Schema.String),
    redirect_url: Schema.optionalKey(Schema.String),
    shipping_delay: Schema.optionalKey(Schema.Int),
    shipping_first_name: Schema.optionalKey(Schema.String),
    shipping_last_name: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_klarna" });
export const Stripesource_type_multibanco = Schema.StructWithRest(
  Schema.Struct({
    entity: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    reference: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    refund_account_holder_address_city: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_address_country: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_address_line1: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_address_line2: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_address_postal_code: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_address_state: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_account_holder_name: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    refund_iban: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_multibanco" });
export const Stripesource_type_p24 = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_p24" });
export const Stripesource_receiver_flow = Schema.StructWithRest(
  Schema.Struct({
    address: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The address of the receiver source. This is the value that should be communicated to the customer to send their funds to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    amount_charged: Schema.Number.annotate({
      description:
        "The total amount that was moved to your balance. This is almost always equal to the amount charged. In rare cases when customers deposit excess funds and we are unable to refund those, those funds get moved to your balance and show up in amount_charged as well. The amount charged is expressed in the source's currency.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_received: Schema.Number.annotate({
      description:
        "The total amount received by the receiver source. `amount_received = amount_returned + amount_charged` should be true for consumed sources unless customers deposit excess funds. The amount received is expressed in the source's currency.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_returned: Schema.Number.annotate({
      description:
        "The total amount that was returned to the customer. The amount returned is expressed in the source's currency.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    refund_attributes_method: Schema.String.annotate({
      description:
        "Type of refund attribute method, one of `email`, `manual`, or `none`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    refund_attributes_status: Schema.String.annotate({
      description:
        "Type of refund attribute status, one of `missing`, `requested`, or `available`.",
    }).check(
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
  title: "SourceReceiverFlow",
  description: "",
  identifier: "Stripesource_receiver_flow",
});
export const Stripesource_redirect_flow = Schema.StructWithRest(
  Schema.Struct({
    failure_reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The failure reason for the redirect, either `user_abort` (the customer aborted or dropped out of the redirect flow), `declined` (the authentication failed or the transaction was declined), or `processing_error` (the redirect failed due to a technical error). Present only if the redirect status is `failed`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    return_url: Schema.String.annotate({
      description:
        "The URL you provide to redirect the customer to after they authenticated their payment.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    status: Schema.String.annotate({
      description:
        "The status of the redirect, either `pending` (ready to be used by your customer to authenticate the transaction), `succeeded` (successful authentication, cannot be reused) or `not_required` (redirect should not be used) or `failed` (failed authentication, cannot be reused).",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    url: Schema.String.annotate({
      description:
        "The URL provided to you to redirect a customer to as part of a `redirect` authentication flow.",
    }).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
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
  title: "SourceRedirectFlow",
  description: "",
  identifier: "Stripesource_redirect_flow",
});
export const Stripesource_type_sepa_debit = Schema.StructWithRest(
  Schema.Struct({
    bank_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    branch_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    mandate_reference: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    mandate_url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_sepa_debit" });
export const Stripesource_type_sofort = Schema.StructWithRest(
  Schema.Struct({
    bank_code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bank_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    bic: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    iban_last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    preferred_language: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_sofort" });
export const Stripesource_order_item = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "The amount (price) for this order item.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    currency: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "This currency of this order item. Required when `amount` is present.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Human-readable description for this order item.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    parent: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The ID of the associated object for this line item. Expandable if not null (e.g., expandable to a SKU).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    quantity: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The quantity of this order item. When type is `sku`, this is the number of instances of the SKU to be ordered.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The type of this order item. Must be `sku`, `tax`, or `shipping`.",
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
  title: "SourceOrderItem",
  description: "",
  identifier: "Stripesource_order_item",
});
export const Stripesource_type_three_d_secure = Schema.StructWithRest(
  Schema.Struct({
    address_line1_check: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    address_zip_check: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    authenticated: Schema.optionalKey(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    brand: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    card: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    customer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    cvc_check: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    dynamic_last4: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    exp_month: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    exp_year: Schema.optionalKey(Schema.Union([Schema.Int, Schema.Null])),
    fingerprint: Schema.optionalKey(Schema.String),
    funding: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    last4: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    three_d_secure: Schema.optionalKey(Schema.String),
    tokenization_method: Schema.optionalKey(
      Schema.Union([Schema.String, Schema.Null]),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_three_d_secure" });
export const Stripesource_type_wechat = Schema.StructWithRest(
  Schema.Struct({
    prepay_id: Schema.optionalKey(Schema.String),
    qr_code_url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    statement_descriptor: Schema.optionalKey(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Stripesource_type_wechat" });
export const Stripesource_mandate_notification_acss_debit_data =
  Schema.StructWithRest(
    Schema.Struct({
      statement_descriptor: Schema.optionalKey(
        Schema.String.annotate({
          description: "The statement descriptor associate with the debit.",
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
    title: "SourceMandateNotificationAcssDebitData",
    description: "",
    identifier: "Stripesource_mandate_notification_acss_debit_data",
  });
export const Stripesource_mandate_notification_bacs_debit_data =
  Schema.StructWithRest(
    Schema.Struct({
      last4: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Last 4 digits of the account number associated with the debit.",
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
    title: "SourceMandateNotificationBacsDebitData",
    description: "",
    identifier: "Stripesource_mandate_notification_bacs_debit_data",
  });
export const Stripesource_mandate_notification_sepa_debit_data =
  Schema.StructWithRest(
    Schema.Struct({
      creditor_identifier: Schema.optionalKey(
        Schema.String.annotate({ description: "SEPA creditor ID." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      last4: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Last 4 digits of the account number associated with the debit.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      mandate_reference: Schema.optionalKey(
        Schema.String.annotate({
          description: "Mandate reference associated with the debit.",
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
    title: "SourceMandateNotificationSepaDebitData",
    description: "",
    identifier: "Stripesource_mandate_notification_sepa_debit_data",
  });
export const Stripesource_transaction_ach_credit_transfer_data =
  Schema.StructWithRest(
    Schema.Struct({
      customer_data: Schema.optionalKey(
        Schema.String.annotate({
          description: "Customer data associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      fingerprint: Schema.optionalKey(
        Schema.String.annotate({
          description: "Bank account fingerprint associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      last4: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Last 4 digits of the account number associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      routing_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "Routing number associated with the transfer.",
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
    title: "SourceTransactionAchCreditTransferData",
    description: "",
    identifier: "Stripesource_transaction_ach_credit_transfer_data",
  });
export const Stripesource_transaction_chf_credit_transfer_data =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.String.annotate({
          description: "Reference associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_address_country: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender's country address.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_address_line1: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender's line 1 address.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_iban: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender's bank account IBAN.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_name: Schema.optionalKey(
        Schema.String.annotate({ description: "Sender's name." }).check(
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
    title: "SourceTransactionChfCreditTransferData",
    description: "",
    identifier: "Stripesource_transaction_chf_credit_transfer_data",
  });
export const Stripesource_transaction_gbp_credit_transfer_data =
  Schema.StructWithRest(
    Schema.Struct({
      fingerprint: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Bank account fingerprint associated with the Stripe owned bank account receiving the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      funding_method: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The credit transfer rails the sender used to push this transfer. The possible rails are: Faster Payments, BACS, CHAPS, and wire transfers. Currently only Faster Payments is supported.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      last4: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Last 4 digits of sender account number associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reference: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Sender entered arbitrary information about the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_account_number: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender account number associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_name: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender name associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_sort_code: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender sort code associated with the transfer.",
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
    title: "SourceTransactionGbpCreditTransferData",
    description: "",
    identifier: "Stripesource_transaction_gbp_credit_transfer_data",
  });
export const Stripesource_transaction_paper_check_data = Schema.StructWithRest(
  Schema.Struct({
    available_at: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Time at which the deposited funds will be available for use. Measured in seconds since the Unix epoch.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    invoices: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Comma-separated list of invoice IDs associated with the paper check.",
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
  title: "SourceTransactionPaperCheckData",
  description: "",
  identifier: "Stripesource_transaction_paper_check_data",
});
export const Stripesource_transaction_sepa_credit_transfer_data =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.String.annotate({
          description: "Reference associated with the transfer.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_iban: Schema.optionalKey(
        Schema.String.annotate({
          description: "Sender's bank account IBAN.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      sender_name: Schema.optionalKey(
        Schema.String.annotate({ description: "Sender's name." }).check(
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
    title: "SourceTransactionSepaCreditTransferData",
    description: "",
    identifier: "Stripesource_transaction_sepa_credit_transfer_data",
  });
export const Stripesource_owner = Schema.suspend(
  (): Schema.Codec<Stripesource_owner> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description: "Owner's address.",
            }),
            Schema.Null,
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Owner's email address.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Owner's full name." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Owner's phone number (including extension).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        verified_address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress]).annotate({
              description:
                "Verified owner's address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.",
            }),
            Schema.Null,
          ]),
        ),
        verified_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Verified owner's email address. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        verified_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Verified owner's full name. Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        verified_phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Verified owner's phone number (including extension). Verified values are verified or provided by the payment method directly (and if supported) at the time of authorization or settlement. They cannot be set or mutated.",
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
      title: "SourceOwner",
      description: "",
      identifier: "Stripesource_owner",
    }),
);
export const Stripesource_transaction = Schema.suspend(
  (): Schema.Codec<Stripesource_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        ach_credit_transfer: Schema.optionalKey(
          Stripesource_transaction_ach_credit_transfer_data,
        ),
        amount: Schema.Number.annotate({
          description:
            "A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the amount your customer has pushed to the receiver.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        chf_credit_transfer: Schema.optionalKey(
          Stripesource_transaction_chf_credit_transfer_data,
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        gbp_credit_transfer: Schema.optionalKey(
          Stripesource_transaction_gbp_credit_transfer_data,
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("source_transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        paper_check: Schema.optionalKey(
          Stripesource_transaction_paper_check_data,
        ),
        sepa_credit_transfer: Schema.optionalKey(
          Stripesource_transaction_sepa_credit_transfer_data,
        ),
        source: Schema.String.annotate({
          description: "The ID of the source this transaction is attached to.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.String.annotate({
          description:
            "The status of the transaction, one of `succeeded`, `pending`, or `failed`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        type: Schema.Literals([
          "ach_credit_transfer",
          "ach_debit",
          "alipay",
          "bancontact",
          "card",
          "card_present",
          "eps",
          "giropay",
          "ideal",
          "klarna",
          "multibanco",
          "p24",
          "sepa_debit",
          "sofort",
          "three_d_secure",
          "wechat",
        ]).annotate({
          description: "The type of source this transaction is attached to.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Source Transaction",
      description:
        "Some payment methods have no required amount that a customer must send.\nCustomers can be instructed to send any amount, and it can be made up of\nmultiple transactions. As such, sources can have multiple associated\ntransactions.",
      identifier: "Stripesource_transaction",
    }),
);
export const Stripesource_order = Schema.suspend(
  (): Schema.Codec<Stripesource_order> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount for the order.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        email: Schema.optionalKey(
          Schema.String.annotate({
            description: "The email address of the customer placing the order.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        items: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Stripesource_order_item).annotate({
              description: "List of items constituting the order.",
            }),
            Schema.Null,
          ]),
        ),
        shipping: Schema.optionalKey(Stripeshipping),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "SourceOrder",
      description: "",
      identifier: "Stripesource_order",
    }),
);
export const Stripesource = Schema.suspend(
  (): Schema.Codec<Stripesource> =>
    Schema.StructWithRest(
      Schema.Struct({
        ach_credit_transfer: Schema.optionalKey(
          Stripesource_type_ach_credit_transfer,
        ),
        ach_debit: Schema.optionalKey(Stripesource_type_ach_debit),
        acss_debit: Schema.optionalKey(Stripesource_type_acss_debit),
        alipay: Schema.optionalKey(Stripesource_type_alipay),
        allow_redisplay: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["always", "limited", "unspecified"]).annotate({
              description:
                "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to “unspecified”.",
            }),
            Schema.Null,
          ]),
        ),
        amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the total amount associated with the source. This is the amount for which the source will be chargeable once ready. Required for `single_use` sources.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        au_becs_debit: Schema.optionalKey(Stripesource_type_au_becs_debit),
        bancontact: Schema.optionalKey(Stripesource_type_bancontact),
        card: Schema.optionalKey(Stripesource_type_card),
        card_present: Schema.optionalKey(Stripesource_type_card_present),
        client_secret: Schema.String.annotate({
          description:
            "The client secret of the source. Used for client-side retrieval using a publishable key.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        code_verification: Schema.optionalKey(
          Stripesource_code_verification_flow,
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) associated with the source. This is the currency for which the source will be chargeable once ready. Required for `single_use` sources.",
              format: "currency",
            }),
            Schema.Null,
          ]),
        ),
        customer: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "The ID of the customer to which this source is attached. This will not be present when the source has not been attached to a customer.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        eps: Schema.optionalKey(Stripesource_type_eps),
        flow: Schema.String.annotate({
          description:
            "The authentication `flow` of the source. `flow` is one of `redirect`, `receiver`, `code_verification`, `none`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        giropay: Schema.optionalKey(Stripesource_type_giropay),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        ideal: Schema.optionalKey(Stripesource_type_ideal),
        klarna: Schema.optionalKey(Stripesource_type_klarna),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        multibanco: Schema.optionalKey(Stripesource_type_multibanco),
        object: Schema.Literal("source").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        owner: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripesource_owner]).annotate({
              description:
                "Information about the owner of the payment instrument that may be used or required by particular source types.",
            }),
            Schema.Null,
          ]),
        ),
        p24: Schema.optionalKey(Stripesource_type_p24),
        receiver: Schema.optionalKey(Stripesource_receiver_flow),
        redirect: Schema.optionalKey(Stripesource_redirect_flow),
        sepa_debit: Schema.optionalKey(Stripesource_type_sepa_debit),
        sofort: Schema.optionalKey(Stripesource_type_sofort),
        source_order: Schema.optionalKey(Stripesource_order),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Extra information about a source. This will appear on your customer's statement every time you charge the source.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.String.annotate({
          description:
            "The status of the source, one of `canceled`, `chargeable`, `consumed`, `failed`, or `pending`. Only `chargeable` sources can be used to create a charge.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        three_d_secure: Schema.optionalKey(Stripesource_type_three_d_secure),
        type: Schema.Literals([
          "ach_credit_transfer",
          "ach_debit",
          "acss_debit",
          "alipay",
          "au_becs_debit",
          "bancontact",
          "card",
          "card_present",
          "eps",
          "giropay",
          "ideal",
          "klarna",
          "multibanco",
          "p24",
          "sepa_debit",
          "sofort",
          "three_d_secure",
          "wechat",
        ]).annotate({
          description:
            "The `type` of the source. The `type` is a payment method, one of `ach_credit_transfer`, `ach_debit`, `alipay`, `bancontact`, `card`, `card_present`, `eps`, `giropay`, `ideal`, `multibanco`, `klarna`, `p24`, `sepa_debit`, `sofort`, `three_d_secure`, or `wechat`. An additional hash is included on the source with a name matching this value. It contains additional information specific to the [payment method](https://docs.stripe.com/sources) used.",
        }),
        usage: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Either `reusable` or `single_use`. Whether this source should be reusable or not. Some source types may or may not be reusable by construction, while others may leave the option at creation. If an incompatible value is passed, an error will be returned.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        wechat: Schema.optionalKey(Stripesource_type_wechat),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Source",
      description:
        "`Source` objects allow you to accept a variety of payment methods. They\nrepresent a customer's payment instrument, and can be used with the Stripe API\njust like a `Card` object: once chargeable, they can be charged, or can be\nattached to customers.\n\nThis API is deprecated. Use the [PaymentMethods API](https://docs.stripe.com/api/payment_methods) instead.\n\nRelated guides: [Sources API](https://docs.stripe.com/sources) and [Sources & Customers](https://docs.stripe.com/sources/customers).",
      identifier: "Stripesource",
    }),
);
export const Stripesource_mandate_notification = Schema.suspend(
  (): Schema.Codec<Stripesource_mandate_notification> =>
    Schema.StructWithRest(
      Schema.Struct({
        acss_debit: Schema.optionalKey(
          Stripesource_mandate_notification_acss_debit_data,
        ),
        amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "A positive integer in the smallest currency unit (that is, 100 cents for $1.00, or 1 for ¥1, Japanese Yen being a zero-decimal currency) representing the amount associated with the mandate notification. The amount is expressed in the currency of the underlying source. Required if the notification type is `debit_initiated`.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        bacs_debit: Schema.optionalKey(
          Stripesource_mandate_notification_bacs_debit_data,
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        object: Schema.Literal("source_mandate_notification").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        reason: Schema.String.annotate({
          description:
            "The reason of the mandate notification. Valid reasons are `mandate_confirmed` or `debit_initiated`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        sepa_debit: Schema.optionalKey(
          Stripesource_mandate_notification_sepa_debit_data,
        ),
        source: Stripesource,
        status: Schema.String.annotate({
          description:
            "The status of the mandate notification. Valid statuses are `pending` or `submitted`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        type: Schema.String.annotate({
          description:
            "The type of source this mandate notification is attached to. Should be the source type identifier code for the payment method, such as `three_d_secure`.",
        }).check(
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
      title: "Source Mandate Notification",
      description:
        "Source mandate notifications should be created when a notification related to\na source mandate must be sent to the payer. They will trigger a webhook or\ndeliver an email to the customer.",
      identifier: "Stripesource_mandate_notification",
    }),
);
