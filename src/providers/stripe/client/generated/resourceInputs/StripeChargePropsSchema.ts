// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeChargeProps = {
  readonly amount?: number;
  readonly application_fee?: number;
  readonly application_fee_amount?: number;
  readonly capture?: boolean;
  readonly card?:
    | ({
        readonly address_city?: string;
        readonly address_country?: string;
        readonly address_line1?: string;
        readonly address_line2?: string;
        readonly address_state?: string;
        readonly address_zip?: string;
        readonly cvc?: string;
        readonly encrypted?: string;
        readonly exp_month: number;
        readonly exp_year: number;
        readonly metadata?: { readonly [x: string]: string };
        readonly name?: string;
        readonly network_token?: { readonly number?: string } & {
          readonly [x: string]: Schema.Json;
        };
        readonly number: string;
        readonly object?: "card";
        readonly swipe_data?: string;
      } & { readonly [x: string]: Schema.Json })
    | string;
  readonly currency?: string;
  readonly customer?: string;
  readonly description?: string;
  readonly destination?:
    | ({ readonly account: string; readonly amount?: number } & {
        readonly [x: string]: Schema.Json;
      })
    | string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly on_behalf_of?: string;
  readonly radar_options?: { readonly session?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly receipt_email?: string;
  readonly shipping?: {
    readonly address: {
      readonly city?: string;
      readonly country?: string;
      readonly line1?: string;
      readonly line2?: string;
      readonly postal_code?: string;
      readonly state?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly carrier?: string;
    readonly name: string;
    readonly phone?: string;
    readonly tracking_number?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly source?: string;
  readonly statement_descriptor?: string;
  readonly statement_descriptor_suffix?: string;
  readonly transfer_data?: {
    readonly amount?: number;
    readonly description?: string;
    readonly destination: string;
  } & { readonly [x: string]: Schema.Json };
  readonly transfer_group?: string;
};

export const StripeChargeResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "charge",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/ChargeId"],
});
export const StripeChargePropsSchema = annotateResourceSchema(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Amount intended to be collected by this payment. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    application_fee: Schema.optionalKey(Schema.Int),
    application_fee_amount: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "A fee in cents (or local equivalent) that will be applied to the charge and transferred to the application owner's Stripe account. The request must be made with an OAuth key or the `Stripe-Account` header in order to take an application fee. For more information, see the application fees [documentation](https://docs.stripe.com/connect/direct-charges#collect-fees).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    capture: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Whether to immediately capture the charge. Defaults to `true`. When `false`, the charge issues an authorization (or pre-authorization), and will need to be [captured](https://docs.stripe.com/api#capture_charge) later. Uncaptured charges expire after a set number of days (7 by default). For more information, see the [authorizing charges and settling later](https://docs.stripe.com/charges/placing-a-hold) documentation.",
      }),
    ),
    card: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            address_city: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            address_country: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            address_line1: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            address_line2: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            address_state: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            address_zip: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            cvc: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            encrypted: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            exp_month: Schema.Int,
            exp_year: Schema.Int,
            metadata: Schema.optionalKey(
              Schema.Record(Schema.String, Schema.String),
            ),
            name: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ),
            network_token: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  number: Schema.optionalKey(
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
              ).annotate({ title: "source_deprecated_card_network_token" }),
            ),
            number: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            object: Schema.optionalKey(Schema.Literal("card")),
            swipe_data: Schema.optionalKey(
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
        ).annotate({ title: "customer_payment_source_card" }),
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ]).annotate({
        description:
          "A token, like the ones returned by [Stripe.js](https://stripe.com/docs/js).",
      }),
    ),
    currency: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        format: "currency",
      }),
    ),
    customer: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of an existing customer that will be charged in this request.",
      }).check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ),
    description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An arbitrary string which you can attach to a `Charge` object. It is displayed when in the web interface alongside the charge. Note that if you use Stripe to send automatic email receipts to your customers, your receipt emails will include the `description` of the charge(s) that they are describing.",
      }).check(
        Schema.isMaxCodePoints(40000).annotate({
          expected: "a string with at most 40000 code points",
        }),
      ),
    ),
    destination: Schema.optionalKey(
      Schema.Union([
        Schema.StructWithRest(
          Schema.Struct({
            account: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            amount: Schema.optionalKey(Schema.Int),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "destination_specs" }),
        Schema.String,
      ]),
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
      Schema.Union([
        Schema.Record(Schema.String, Schema.String),
        Schema.Literal(""),
      ]).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    on_behalf_of: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The Stripe account ID for which these funds are intended. You can specify the business of record as the connected account using the `on_behalf_of` attribute on the charge. For details, see [Creating Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers#settlement-merchant).",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
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
    receipt_email: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The email address to which this charge's [receipt](https://docs.stripe.com/dashboard/receipts) will be sent. The receipt will not be sent until the charge is paid, and receipts are only sent for payments in live mode. If this charge is for a [Customer](https://docs.stripe.com/api/customers/object), the email address specified here will override the customer's email address. If `receipt_email` is specified for a charge in live mode, a receipt will be sent regardless of your [email settings](https://dashboard.stripe.com/account/emails).",
      }).check(
        Schema.isMaxCodePoints(800).annotate({
          expected: "a string with at most 800 code points",
        }),
      ),
    ),
    shipping: Schema.optionalKey(
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
          carrier: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          name: Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          phone: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          tracking_number: Schema.optionalKey(
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
        title: "optional_fields_shipping",
        description:
          "Shipping information for the charge. Helps prevent fraud on charges for physical goods.",
      }),
    ),
    source: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A payment source to be charged. This can be the ID of a [card](https://docs.stripe.com/api#cards) (i.e., credit or debit card), a [bank account](https://docs.stripe.com/api#bank_accounts), a [source](https://docs.stripe.com/api#sources), a [token](https://docs.stripe.com/api#tokens), or a [connected account](https://docs.stripe.com/connect/account-debits#charging-a-connected-account). For certain sources---namely, [cards](https://docs.stripe.com/api#cards), [bank accounts](https://docs.stripe.com/api#bank_accounts), and attached [sources](https://docs.stripe.com/api#sources)---you must also pass the ID of the associated customer.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    statement_descriptor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For a non-card charge, text that appears on the customer's statement as the statement descriptor. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nFor a card charge, this value is ignored unless you don't specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    statement_descriptor_suffix: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement. If the account has no prefix value, the suffix is concatenated to the account's statement descriptor.",
      }).check(
        Schema.isMaxCodePoints(22).annotate({
          expected: "a string with at most 22 code points",
        }),
      ),
    ),
    transfer_data: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          amount: Schema.optionalKey(Schema.Int),
          description: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          destination: Schema.String.check(
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
        title: "transfer_data_specs",
        description:
          "An optional dictionary including the account to automatically transfer to as part of a destination charge. [See the Connect documentation](https://docs.stripe.com/connect/destination-charges) for details.",
      }),
    ),
    transfer_group: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A string that identifies this transaction as part of a group. For details, see [Grouping transactions](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options).",
      }),
    ),
  }),
  StripeChargeResourceSchema,
);
