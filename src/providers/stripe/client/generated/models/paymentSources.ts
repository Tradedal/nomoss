// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripeexternal_account_requirements } from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import { Stripepayment_method_details_card_present } from "./paymentMethodDetails.js";

export type Stripecard = {
  readonly account?: string | Stripeaccount | null;
  readonly address_city?: string | null;
  readonly address_country?: string | null;
  readonly address_line1?: string | null;
  readonly address_line1_check?: string | null;
  readonly address_line2?: string | null;
  readonly address_state?: string | null;
  readonly address_zip?: string | null;
  readonly address_zip_check?: string | null;
  readonly allow_redisplay?: "always" | "limited" | "unspecified" | null;
  readonly available_payout_methods?: ReadonlyArray<
    "instant" | "standard"
  > | null;
  readonly brand: string;
  readonly country?: string | null;
  readonly currency?: string | null;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly cvc_check?: string | null;
  readonly default_for_currency?: boolean | null;
  readonly dynamic_last4?: string | null;
  readonly exp_month: number;
  readonly exp_year: number;
  readonly fingerprint?: string | null;
  readonly funding: string;
  readonly id: string;
  readonly last4: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly name?: string | null;
  readonly networks?: Stripetoken_card_networks;
  readonly object: "card";
  readonly regulated_status?: "regulated" | "unregulated" | null;
  readonly status?: string | null;
  readonly tokenization_method?: string | null;
  readonly wallet?: Stripetoken_card_wallet | null;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_account = {
  readonly account?: string | Stripeaccount | null;
  readonly account_holder_name?: string | null;
  readonly account_holder_type?: string | null;
  readonly account_type?: string | null;
  readonly available_payout_methods?: ReadonlyArray<
    "instant" | "standard"
  > | null;
  readonly bank_name?: string | null;
  readonly country: string;
  readonly currency: string;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly default_for_currency?: boolean | null;
  readonly fingerprint?: string | null;
  readonly future_requirements?: Stripeexternal_account_requirements | null;
  readonly id: string;
  readonly last4: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "bank_account";
  readonly requirements?: Stripeexternal_account_requirements | null;
  readonly routing_number?: string | null;
  readonly status: string;
} & { readonly [x: string]: Schema.Json };
export type Stripetoken_card_networks = {
  readonly preferred?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetoken_card_wallet_apple_pay = {
  readonly type: "apple_pay" | "apple_pay_later";
} & { readonly [x: string]: Schema.Json };
export type Stripecard_mandate_payment_method_details_india = {
  readonly inactive_reason?:
    | "canceled"
    | "card_not_supported"
    | "currency_not_supported"
    | "expired"
    | "issuer_not_supported"
    | "processing_error"
    | "undetermined"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecard_issuing_account_terms_of_service = {
  readonly date?: number | null;
  readonly ip?: string | null;
  readonly user_agent?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_accountholder = {
  readonly account?: string | Stripeaccount;
  readonly customer?: string | Stripecustomer;
  readonly customer_account?: string;
  readonly type: "account" | "customer";
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_account_number_details = {
  readonly expected_expiry_date?: number | null;
  readonly identifier_type: "account_number" | "tokenized_account_number";
  readonly status: "deactivated" | "expired" | "pending" | "transactable";
  readonly supported_networks: ReadonlyArray<"ach">;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_balance_api_resource_cash_balance =
  { readonly available?: { readonly [x: string]: number } | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripebank_connections_resource_balance_api_resource_credit_balance =
  { readonly used?: { readonly [x: string]: number } | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripebank_connections_resource_balance_refresh = {
  readonly last_attempted_at: number;
  readonly next_refresh_available_at?: number | null;
  readonly status: "failed" | "pending" | "succeeded";
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_ownership_refresh = {
  readonly last_attempted_at: number;
  readonly next_refresh_available_at?: number | null;
  readonly status: "failed" | "pending" | "succeeded";
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_account_status_details_api_resource_active_status_details =
  {
    readonly action: "none" | "relink_required";
    readonly cause:
      | "access_expired"
      | "institution_requirement"
      | "unspecified";
    readonly expected_deactivation_date: number;
  } & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_transaction_refresh = {
  readonly id: string;
  readonly last_attempted_at: number;
  readonly next_refresh_available_at?: number | null;
  readonly status: "failed" | "pending" | "succeeded";
} & { readonly [x: string]: Schema.Json };
export type Stripetoken = {
  readonly bank_account?: Stripebank_account;
  readonly card?: Stripecard;
  readonly client_ip?: string | null;
  readonly created: number;
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "token";
  readonly type: string;
  readonly used: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_link_account_session_filters = {
  readonly account_subcategories?: ReadonlyArray<
    "checking" | "credit_card" | "line_of_credit" | "mortgage" | "savings"
  > | null;
  readonly country?: string | null;
  readonly require_payment_method_support?: "all" | "at_least_one" | "none";
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_link_account_session_limits = {
  readonly accounts: number;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_link_account_session_manual_entry =
  { readonly mode?: "automatic" | "disabled" } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetoken_card_wallet = {
  readonly apple_pay?: Stripetoken_card_wallet_apple_pay;
  readonly type: "apple_pay" | "link";
} & { readonly [x: string]: Schema.Json };
export type Stripecard_mandate_payment_method_details = {
  readonly india?: Stripecard_mandate_payment_method_details_india;
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_balance = {
  readonly as_of: number;
  readonly cash?: Stripebank_connections_resource_balance_api_resource_cash_balance;
  readonly credit?: Stripebank_connections_resource_balance_api_resource_credit_balance;
  readonly current: { readonly [x: string]: number };
  readonly type: "cash" | "credit";
} & { readonly [x: string]: Schema.Json };
export type Stripebank_connections_resource_account_status_details = {
  readonly active?: Stripebank_connections_resource_account_status_details_api_resource_active_status_details;
} & { readonly [x: string]: Schema.Json };
export type Stripecard_generated_from_payment_method_details = {
  readonly card_present?: Stripepayment_method_details_card_present;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };

export const Stripecard = Schema.suspend(
  (): Schema.Codec<Stripecard> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account this card belongs to. Only applicable on Accounts (not customers or recipients) This property is only available when returned as an [External Account](/api/external_account_cards/object) where [controller.is_controller](/api/accounts/object#account_object-controller-is_controller) is `true`.",
            }),
            Schema.Null,
          ]),
        ),
        address_city: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "City/District/Suburb/Town/Village.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Billing address country, if provided when creating card.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_line1: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Address line 1 (Street address/PO Box/Company name).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_line1_check: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If `address_line1` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_line2: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Address line 2 (Apartment/Suite/Unit/Building).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_state: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "State/County/Province/Region.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_zip: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ZIP or postal code.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        address_zip_check: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If `address_zip` was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        allow_redisplay: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["always", "limited", "unspecified"]).annotate({
              description:
                "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow. The field defaults to “unspecified”.",
            }),
            Schema.Null,
          ]),
        ),
        available_payout_methods: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["instant", "standard"])).annotate({
              description:
                "A set of available payout methods for this card. Only values from this set should be passed as the `method` when creating a payout.",
            }),
            Schema.Null,
          ]),
        ),
        brand: Schema.String.annotate({
          description:
            "Card brand. Can be `American Express`, `Cartes Bancaires`, `Diners Club`, `Discover`, `Eftpos Australia`, `Girocard`, `JCB`, `MasterCard`, `UnionPay`, `Visa`, or `Unknown`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        country: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Two-letter ISO code representing the country of the card. You could use this attribute to get a sense of the international breakdown of cards you've collected.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO code for currency](https://www.iso.org/iso-4217-currency-codes.html) in lowercase. Must be a [supported currency](https://docs.stripe.com/currencies). Only applicable on accounts (not customers or recipients). The card can be used as a transfer destination for funds in this currency. This property is only available when returned as an [External Account](/api/external_account_cards/object) where [controller.is_controller](/api/accounts/object#account_object-controller-is_controller) is `true`.",
              format: "currency",
            }),
            Schema.Null,
          ]),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The customer that this card belongs to. This attribute will not be in the card object if the card belongs to an account or recipient instead.",
            }),
            Schema.Null,
          ]),
        ),
        cvc_check: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If a CVC was provided, results of the check: `pass`, `fail`, `unavailable`, or `unchecked`. A result of unchecked indicates that CVC was provided but hasn't been checked yet. Checks are typically performed when attaching a card to a Customer object, or when creating a charge. For more details, see [Check if a card is valid without a charge](https://support.stripe.com/questions/check-if-a-card-is-valid-without-a-charge).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        default_for_currency: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether this card is the default external account for its currency. This property is only available for accounts where [controller.requirement_collection](/api/accounts/object#account_object-controller-requirement_collection) is `application`, which includes Custom accounts.",
            }),
            Schema.Null,
          ]),
        ),
        dynamic_last4: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "(For tokenized numbers only.) The last four digits of the device account number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        exp_month: Schema.Number.annotate({
          description:
            "Two-digit number representing the card's expiration month.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        exp_year: Schema.Number.annotate({
          description:
            "Four-digit number representing the card's expiration year.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        fingerprint: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Uniquely identifies this particular card number. You can use this attribute to check whether two customers who’ve signed up with you are using the same card number, for example. For payment methods that tokenize card information (Apple Pay, Google Pay), the tokenized number might be provided instead of the underlying card number.\n\n*As of May 1, 2021, card fingerprint in India for Connect changed to allow two fingerprints for the same card---one for India and one for the rest of the world.*",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        funding: Schema.String.annotate({
          description:
            "Card funding type. Can be `credit`, `debit`, `prepaid`, or `unknown`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last4: Schema.String.annotate({
          description: "The last four digits of the card.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Cardholder name." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        networks: Schema.optionalKey(Stripetoken_card_networks),
        object: Schema.Literal("card").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        regulated_status: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["regulated", "unregulated"]).annotate({
              description: "Status of a card based on the card issuer.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For external accounts that are cards, possible values are `new` and `errored`. If a payout fails, the status is set to `errored` and [scheduled payouts](https://stripe.com/docs/payouts#payout-schedule) are stopped until account details are updated.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        tokenization_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "If the card number is tokenized, this is the method that was used. Can be `android_pay` (includes Google Pay), `apple_pay`, `masterpass`, `visa_checkout`, or null.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        wallet: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripetoken_card_wallet]).annotate({
              description:
                "If this Card is part of a card wallet, this contains the details of the card wallet.",
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
      title: "Card",
      description:
        "You can store multiple cards on a customer in order to charge the customer\nlater. You can also store multiple debit cards on a recipient in order to\ntransfer to those cards later.\n\nThis API is deprecated. Use the [PaymentMethods API](https://docs.stripe.com/api/payment_methods) instead.\n\nRelated guide: [Card payments with Sources](https://docs.stripe.com/sources/cards)",
      identifier: "Stripecard",
    }),
);
export const Stripebank_account = Schema.suspend(
  (): Schema.Codec<Stripebank_account> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account this bank account belongs to. Only applicable on Accounts (not customers or recipients) This property is only available when returned as an [External Account](/api/external_account_bank_accounts/object) where [controller.is_controller](/api/accounts/object#account_object-controller-is_controller) is `true`.",
            }),
            Schema.Null,
          ]),
        ),
        account_holder_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The name of the person or business that owns the bank account.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        account_holder_type: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The type of entity that holds the account. This can be either `individual` or `company`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        account_type: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The bank account type. This can only be `checking` or `savings` in most countries. In Japan, this can only be `futsu` or `toza`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        available_payout_methods: Schema.optionalKey(
          Schema.Union([
            Schema.Array(Schema.Literals(["instant", "standard"])).annotate({
              description:
                "A set of available payout methods for this bank account. Only values from this set should be passed as the `method` when creating a payout.",
            }),
            Schema.Null,
          ]),
        ),
        bank_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Name of the bank associated with the routing number (e.g., `WELLS FARGO`).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        country: Schema.String.annotate({
          description:
            "Two-letter ISO code representing the country the bank account is located in.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO code for the currency](https://stripe.com/docs/payouts) paid out to the bank account.",
          format: "currency",
        }),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "The ID of the customer that the bank account is associated with.",
            }),
            Schema.Null,
          ]),
        ),
        default_for_currency: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Whether this bank account is the default external account for its currency.",
            }),
            Schema.Null,
          ]),
        ),
        fingerprint: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Uniquely identifies this particular bank account. You can use this attribute to check whether two bank accounts are the same.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        future_requirements: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeexternal_account_requirements]).annotate({
              description:
                "Information about the [upcoming new requirements for the bank account](https://docs.stripe.com/connect/custom-accounts/future-requirements), including what information needs to be collected, and by when.",
            }),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        last4: Schema.String.annotate({
          description: "The last four digits of the bank account number.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
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
        object: Schema.Literal("bank_account").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        requirements: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeexternal_account_requirements]).annotate({
              description:
                "Information about the requirements for the bank account, including what information needs to be collected.",
            }),
            Schema.Null,
          ]),
        ),
        routing_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The routing transit number for the bank account.",
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
            "For bank accounts, possible values are `new`, `validated`, `verified`, `verification_failed`, `tokenized_account_number_deactivated` or `errored`. A bank account that hasn't had any activity or validation performed is `new`. If Stripe can determine that the bank account exists, its status will be `validated`. Note that there often isn’t enough information to know (e.g., for smaller credit unions), and the validation is not always run. If customer bank account verification has succeeded, the bank account status will be `verified`. If the verification failed for any reason, such as microdeposit failure, the status will be `verification_failed`. If the status is `tokenized_account_number_deactivated`, the account utilizes a tokenized account number which has been deactivated due to expiration or revocation. This account will need to be reverified to continue using it for money movement. If a payout sent to this bank account fails, we'll set the status to `errored` and will not continue to send [scheduled payouts](https://stripe.com/docs/payouts#payout-schedule) until the bank details are updated.\n\nFor external accounts, possible values are `new`, `errored`, `verification_failed`, and `tokenized_account_number_deactivated`. If a payout fails, the status is set to `errored` and scheduled payouts are stopped until account details are updated. In the US and India, if we can't [verify the owner of the bank account](https://support.stripe.com/questions/bank-account-ownership-verification), we'll set the status to `verification_failed`. Other validations aren't run against external accounts because they're only used for payouts. This means the other statuses don't apply.",
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
      title: "Bank Account",
      description:
        "These bank accounts are payment methods on `Customer` objects.\n\nOn the other hand [External Accounts](/api#external_accounts) are transfer\ndestinations on `Account` objects for connected accounts.\nThey can be bank accounts or debit cards as well, and are documented in the links above.\n\nRelated guide: [Bank debits and transfers](/payments/bank-debits-transfers)",
      identifier: "Stripebank_account",
    }),
);
export const Stripetoken_card_networks = Schema.StructWithRest(
  Schema.Struct({
    preferred: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The preferred network for co-branded cards. Can be `cartes_bancaires`, `mastercard`, `visa` or `invalid_preference` if requested network is not valid for the card.",
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
  title: "token_card_networks",
  description: "",
  identifier: "Stripetoken_card_networks",
});
export const Stripetoken_card_wallet_apple_pay = Schema.StructWithRest(
  Schema.Struct({ type: Schema.Literals(["apple_pay", "apple_pay_later"]) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "token_card_wallet_apple_pay",
  description: "",
  identifier: "Stripetoken_card_wallet_apple_pay",
});
export const Stripecard_mandate_payment_method_details_india =
  Schema.StructWithRest(
    Schema.Struct({
      inactive_reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "canceled",
            "card_not_supported",
            "currency_not_supported",
            "expired",
            "issuer_not_supported",
            "processing_error",
            "undetermined",
          ]).annotate({
            description:
              "The reason why the mandate has an `inactive` status. This field is only populated if the mandate is inactive.",
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
    title: "card_mandate_payment_method_details_india",
    description: "",
    identifier: "Stripecard_mandate_payment_method_details_india",
  });
export const Stripecard_issuing_account_terms_of_service =
  Schema.StructWithRest(
    Schema.Struct({
      date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "The Unix timestamp marking when the account representative accepted the service agreement.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      ip: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The IP address from which the account representative accepted the service agreement.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      user_agent: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The user agent of the browser from which the account representative accepted the service agreement.",
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
    title: "CardIssuingAccountTermsOfService",
    description: "",
    identifier: "Stripecard_issuing_account_terms_of_service",
  });
export const Stripebank_connections_resource_accountholder = Schema.suspend(
  (): Schema.Codec<Stripebank_connections_resource_accountholder> =>
    Schema.StructWithRest(
      Schema.Struct({
        account: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripeaccount,
          ]).annotate({
            description:
              "The ID of the Stripe account that this account belongs to. Only available when `account_holder.type` is `account`.",
          }),
        ),
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Stripecustomer,
          ]).annotate({
            description:
              "The ID for an Account representing a customer that this account belongs to. Only available when `account_holder.type` is `customer`.",
          }),
        ),
        customer_account: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        type: Schema.Literals(["account", "customer"]).annotate({
          description: "Type of account holder that this account belongs to.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "BankConnectionsResourceAccountholder",
      description: "",
      identifier: "Stripebank_connections_resource_accountholder",
    }),
);
export const Stripebank_connections_resource_account_number_details =
  Schema.StructWithRest(
    Schema.Struct({
      expected_expiry_date: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "When the account number is expected to expire, if applicable.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      identifier_type: Schema.Literals([
        "account_number",
        "tokenized_account_number",
      ]).annotate({
        description: "The type of account number associated with the account.",
      }),
      status: Schema.Literals([
        "deactivated",
        "expired",
        "pending",
        "transactable",
      ]).annotate({
        description:
          "Whether the account number is currently active and usable for transactions.",
      }),
      supported_networks: Schema.Array(Schema.Literal("ach")).annotate({
        description:
          "The payment networks that the account number can be used for.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BankConnectionsResourceAccountNumberDetails",
    description: "",
    identifier: "Stripebank_connections_resource_account_number_details",
  });
export const Stripebank_connections_resource_balance_api_resource_cash_balance =
  Schema.StructWithRest(
    Schema.Struct({
      available: Schema.optionalKey(
        Schema.Union([
          Schema.Record(Schema.String, Schema.Int).annotate({
            description:
              "The funds available to the account holder. Typically this is the current balance after subtracting any outbound pending transactions and adding any inbound pending transactions.\n\nEach key is a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.\n\nEach value is a integer amount. A positive amount indicates money owed to the account holder. A negative amount indicates money owed by the account holder.",
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
    title: "BankConnectionsResourceBalanceAPIResourceCashBalance",
    description: "",
    identifier:
      "Stripebank_connections_resource_balance_api_resource_cash_balance",
  });
export const Stripebank_connections_resource_balance_api_resource_credit_balance =
  Schema.StructWithRest(
    Schema.Struct({
      used: Schema.optionalKey(
        Schema.Union([
          Schema.Record(Schema.String, Schema.Int).annotate({
            description:
              "The credit that has been used by the account holder.\n\nEach key is a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.\n\nEach value is a integer amount. A positive amount indicates money owed to the account holder. A negative amount indicates money owed by the account holder.",
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
    title: "BankConnectionsResourceBalanceAPIResourceCreditBalance",
    description: "",
    identifier:
      "Stripebank_connections_resource_balance_api_resource_credit_balance",
  });
export const Stripebank_connections_resource_balance_refresh =
  Schema.StructWithRest(
    Schema.Struct({
      last_attempted_at: Schema.Number.annotate({
        description:
          "The time at which the last refresh attempt was initiated. Measured in seconds since the Unix epoch.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      next_refresh_available_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Time at which the next balance refresh can be initiated. This value will be `null` when `status` is `pending`. Measured in seconds since the Unix epoch.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      status: Schema.Literals(["failed", "pending", "succeeded"]).annotate({
        description: "The status of the last refresh attempt.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BankConnectionsResourceBalanceRefresh",
    description: "",
    identifier: "Stripebank_connections_resource_balance_refresh",
  });
export const Stripebank_connections_resource_ownership_refresh =
  Schema.StructWithRest(
    Schema.Struct({
      last_attempted_at: Schema.Number.annotate({
        description:
          "The time at which the last refresh attempt was initiated. Measured in seconds since the Unix epoch.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      next_refresh_available_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Time at which the next ownership refresh can be initiated. This value will be `null` when `status` is `pending`. Measured in seconds since the Unix epoch.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      status: Schema.Literals(["failed", "pending", "succeeded"]).annotate({
        description: "The status of the last refresh attempt.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BankConnectionsResourceOwnershipRefresh",
    description: "",
    identifier: "Stripebank_connections_resource_ownership_refresh",
  });
export const Stripebank_connections_resource_account_status_details_api_resource_active_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      action: Schema.Literals(["none", "relink_required"]).annotate({
        description: "The action (if any) to proactively relink the Account.",
      }),
      cause: Schema.Literals([
        "access_expired",
        "institution_requirement",
        "unspecified",
      ]).annotate({
        description: "The underlying cause of the Account becoming inactive.",
      }),
      expected_deactivation_date: Schema.Number.annotate({
        description:
          "When the Account is expected to become inactive, if applicable.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "BankConnectionsResourceAccountStatusDetailsAPIResourceActiveStatusDetails",
    description: "",
    identifier:
      "Stripebank_connections_resource_account_status_details_api_resource_active_status_details",
  });
export const Stripebank_connections_resource_transaction_refresh =
  Schema.StructWithRest(
    Schema.Struct({
      id: Schema.String.annotate({
        description: "Unique identifier for the object.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      last_attempted_at: Schema.Number.annotate({
        description:
          "The time at which the last refresh attempt was initiated. Measured in seconds since the Unix epoch.",
        format: "unix-time",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      next_refresh_available_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Time at which the next transaction refresh can be initiated. This value will be `null` when `status` is `pending`. Measured in seconds since the Unix epoch.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      status: Schema.Literals(["failed", "pending", "succeeded"]).annotate({
        description: "The status of the last refresh attempt.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BankConnectionsResourceTransactionRefresh",
    description: "",
    identifier: "Stripebank_connections_resource_transaction_refresh",
  });
export const Stripetoken = Schema.suspend(
  (): Schema.Codec<Stripetoken> =>
    Schema.StructWithRest(
      Schema.Struct({
        bank_account: Schema.optionalKey(Stripebank_account),
        card: Schema.optionalKey(Stripecard),
        client_ip: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "IP address of the client that generates the token.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
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
        object: Schema.Literal("token").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        type: Schema.String.annotate({
          description:
            "Type of the token: `account`, `bank_account`, `card`, or `pii`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        used: Schema.Boolean.annotate({
          description:
            "Determines if you have already used this token (you can only use tokens once).",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Token",
      description:
        "Tokenization is the process Stripe uses to collect sensitive card or bank\naccount details, or personally identifiable information (PII), directly from\nyour customers in a secure manner. A token representing this information is\nreturned to your server to use. Use our\n[recommended payments integrations](https://docs.stripe.com/payments) to perform this process\non the client-side. This guarantees that no sensitive card data touches your server,\nand allows your integration to operate in a PCI-compliant way.\n\nIf you can't use client-side tokenization, you can also create tokens using\nthe API with either your publishable or secret API key. If\nyour integration uses this method, you're responsible for any PCI compliance\nthat it might require, and you must keep your secret API key safe. Unlike with\nclient-side tokenization, your customer's information isn't sent directly to\nStripe, so we can't determine how it's handled or stored.\n\nYou can't store or use tokens more than once. To store card or bank account\ninformation for later use, create [Customer](https://docs.stripe.com/api#customers)\nobjects or [External accounts](/api#external_accounts).\n[Radar](https://docs.stripe.com/radar), our integrated solution for automatic fraud protection,\nperforms best with integrations that use client-side tokenization.",
      identifier: "Stripetoken",
    }),
);
export const Stripebank_connections_resource_link_account_session_filters =
  Schema.StructWithRest(
    Schema.Struct({
      account_subcategories: Schema.optionalKey(
        Schema.Union([
          Schema.Array(
            Schema.Literals([
              "checking",
              "credit_card",
              "line_of_credit",
              "mortgage",
              "savings",
            ]),
          ).annotate({
            description:
              "Restricts the Session to subcategories of accounts that can be linked. Valid subcategories are: `checking`, `savings`, `mortgage`, `line_of_credit`, `credit_card`.",
          }),
          Schema.Null,
        ]),
      ),
      country: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Country from which to filter accounts.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      require_payment_method_support: Schema.optionalKey(
        Schema.Literals(["all", "at_least_one", "none"]).annotate({
          description:
            "Whether the Session should require that linked accounts support payments and retrieve account numbers before completion.",
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
    title: "BankConnectionsResourceLinkAccountSessionFilters",
    description: "",
    identifier: "Stripebank_connections_resource_link_account_session_filters",
  });
export const Stripebank_connections_resource_link_account_session_limits =
  Schema.StructWithRest(
    Schema.Struct({
      accounts: Schema.Number.annotate({
        description:
          "The number of accounts that can be linked in this Session.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BankConnectionsResourceLinkAccountSessionLimits",
    description: "",
    identifier: "Stripebank_connections_resource_link_account_session_limits",
  });
export const Stripebank_connections_resource_link_account_session_manual_entry =
  Schema.StructWithRest(
    Schema.Struct({
      mode: Schema.optionalKey(
        Schema.Literals(["automatic", "disabled"]).annotate({
          description:
            "Controls how manual entry of bank account details is presented to the user.",
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
    title: "BankConnectionsResourceLinkAccountSessionManualEntry",
    description: "",
    identifier:
      "Stripebank_connections_resource_link_account_session_manual_entry",
  });
export const Stripetoken_card_wallet = Schema.suspend(
  (): Schema.Codec<Stripetoken_card_wallet> =>
    Schema.StructWithRest(
      Schema.Struct({
        apple_pay: Schema.optionalKey(Stripetoken_card_wallet_apple_pay),
        type: Schema.Literals(["apple_pay", "link"]).annotate({
          description:
            "The type of the card wallet, one of `apple_pay` or `link`. An additional hash is included on the Wallet subhash with a name matching this value. It contains additional information specific to the card wallet type.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "token_card_wallet",
      description: "",
      identifier: "Stripetoken_card_wallet",
    }),
);
export const Stripecard_mandate_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripecard_mandate_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        india: Schema.optionalKey(
          Stripecard_mandate_payment_method_details_india,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "card_mandate_payment_method_details",
      description: "",
      identifier: "Stripecard_mandate_payment_method_details",
    }),
);
export const Stripebank_connections_resource_balance = Schema.suspend(
  (): Schema.Codec<Stripebank_connections_resource_balance> =>
    Schema.StructWithRest(
      Schema.Struct({
        as_of: Schema.Number.annotate({
          description:
            "The time that the external institution calculated this balance. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        cash: Schema.optionalKey(
          Stripebank_connections_resource_balance_api_resource_cash_balance,
        ),
        credit: Schema.optionalKey(
          Stripebank_connections_resource_balance_api_resource_credit_balance,
        ),
        current: Schema.Record(Schema.String, Schema.Int).annotate({
          description:
            "The balances owed to (or by) the account holder, before subtracting any outbound pending transactions or adding any inbound pending transactions.\n\nEach key is a three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.\n\nEach value is a integer amount. A positive amount indicates money owed to the account holder. A negative amount indicates money owed by the account holder.",
        }),
        type: Schema.Literals(["cash", "credit"]).annotate({
          description:
            "The `type` of the balance. An additional hash is included on the balance with a name matching this value.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "BankConnectionsResourceBalance",
      description: "",
      identifier: "Stripebank_connections_resource_balance",
    }),
);
export const Stripebank_connections_resource_account_status_details =
  Schema.suspend(
    (): Schema.Codec<Stripebank_connections_resource_account_status_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          active: Schema.optionalKey(
            Stripebank_connections_resource_account_status_details_api_resource_active_status_details,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "BankConnectionsResourceAccountStatusDetails",
        description: "",
        identifier: "Stripebank_connections_resource_account_status_details",
      }),
  );
export const Stripecard_generated_from_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripecard_generated_from_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        card_present: Schema.optionalKey(
          Stripepayment_method_details_card_present,
        ),
        type: Schema.String.annotate({
          description:
            "The type of payment method transaction-specific details from the transaction that generated this `card` payment method. Always `card_present`.",
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
      title: "card_generated_from_payment_method_details",
      description: "",
      identifier: "Stripecard_generated_from_payment_method_details",
    }),
);
