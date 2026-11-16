// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeOutboundPaymentResourceSchema } from "./StripeOutboundPaymentPropsSchema.js";

export type StripeOutboundPaymentPropsEntity = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly description?: string;
  readonly from: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly recipient_verification?: string;
  readonly statement_descriptor?: string;
  readonly to: {
    readonly currency?: string;
    readonly payout_method?: string;
    readonly payout_method_options?: {
      readonly bank_account?: {
        readonly preferred_network_options?: {
          readonly ach?: {
            readonly submission?: "next_day" | "same_day";
            readonly transaction_purpose?: "payroll";
          } & { readonly [x: string]: Schema.Json };
        } & { readonly [x: string]: Schema.Json };
        readonly preferred_networks?: ReadonlyArray<
          "ach" | "fedwire" | "fps" | "rtp" | "sepa" | "swift"
        >;
      } & { readonly [x: string]: Schema.Json };
    } & { readonly [x: string]: Schema.Json };
    readonly recipient: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const StripeOutboundPaymentPropsEntitySchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
      amount: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({
            description:
              "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          }),
          value: Schema.Number.annotate({
            description:
              "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "The requested amount and currency for the OutboundPayment.",
      }),
      description: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "An arbitrary string attached to the OutboundPayment. Often useful for displaying to users.",
        }),
      ),
      from: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({
            description: "Describes the FinancialAmount's currency drawn from.",
          }),
          financial_account: Schema.String.annotate({
            description: "The FinancialAccount that funds were pulled from.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description:
          "From which FinancialAccount and BalanceType to pull funds from.",
      }),
      metadata: Schema.optionalKey(
        Schema.Record(Schema.String, Schema.String).annotate({
          description:
            "Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
      ),
      recipient_notification: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            setting: Schema.Literals(["configured", "none"]).annotate({
              description:
                "Closed Enum. Configuration option to enable or disable notifications to recipients.\nDo not send notifications when `setting` is `none`. Use the account setting when `setting` is `configured` or omitted.",
            }),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({
          description:
            "Details about the notification settings for the OutboundPayment recipient.",
        }),
      ),
      recipient_verification: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The ID of the RecipientVerification for this OutboundPayment. Required where recipient-name verification is mandated before creating an OutboundPayment.",
        }),
      ),
      statement_descriptor: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The description that appears on the receiving end for an OutboundPayment (for example, on a bank statement). Must be between 3 and 22 characters long for most destinations (500 for FinancialAccount destinations), and not contain profanity.",
        }),
      ),
      to: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Describes the currency to send to the recipient.\nIf included, this currency must match a currency supported by the destination.\nCan be omitted in the following cases:\n- destination only supports one currency\n- destination supports multiple currencies and one matches `from.currency`\n- destination supports multiple currencies and one matches `amount.currency`\nWhen both `from.currency` and `amount.currency` are supported, Stripe selects `from.currency` to minimize currency conversion.",
            }),
          ),
          payout_method: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The payout method which the OutboundPayment uses to send payout.",
            }),
          ),
          payout_method_options: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                bank_account: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({
                      preferred_network_options: Schema.optionalKey(
                        Schema.StructWithRest(
                          Schema.Struct({
                            ach: Schema.optionalKey(
                              Schema.StructWithRest(
                                Schema.Struct({
                                  submission: Schema.optionalKey(
                                    Schema.Literals([
                                      "next_day",
                                      "same_day",
                                    ]).annotate({
                                      description:
                                        "Open Enum. ACH submission timing.",
                                    }),
                                  ),
                                  transaction_purpose: Schema.optionalKey(
                                    Schema.Literal("payroll").annotate({
                                      description:
                                        "The transaction purpose for this ACH payment.",
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
                                description: "ACH-specific network options.",
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
                          description: "Per-network configuration options.",
                        }),
                      ),
                      preferred_networks: Schema.optionalKey(
                        Schema.Array(
                          Schema.Literals([
                            "ach",
                            "fedwire",
                            "fps",
                            "rtp",
                            "sepa",
                            "swift",
                          ]),
                        ).annotate({
                          description:
                            "The preferred networks to use for this OutboundPayment.",
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
                    description: "Options for bank account payout methods.",
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
              description: "Payout method options for the OutboundPayment.",
            }),
          ),
          recipient: Schema.String.annotate({
            description: "To which account the OutboundPayment is sent.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description: "To which payout method to send the OutboundPayment.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripeOutboundPaymentResourceSchema,
);
