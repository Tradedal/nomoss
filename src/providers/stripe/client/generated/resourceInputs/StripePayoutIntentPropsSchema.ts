// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripePayoutIntentProps = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly confirmation_method?: "automatic" | "manual";
  readonly description?: string;
  readonly from: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly recipient_notification?: {
    readonly setting: "configured" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly schedule_options?: { readonly execute_on?: string } & {
    readonly [x: string]: Schema.Json;
  };
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
    readonly recipient?: string;
  } & { readonly [x: string]: Schema.Json };
} & { readonly [x: string]: Schema.Json };

export const StripePayoutIntentResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "money_management",
    resource: "payout-intent",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/PayoutIntentId"],
  });
export const StripePayoutIntentPropsSchema = annotateResourceSchema(
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
      ).annotate({ description: "The monetary amount to be sent." }),
      confirmation_method: Schema.optionalKey(
        Schema.Literals(["automatic", "manual"]).annotate({
          description:
            "Controls whether the PayoutIntent requires explicit confirmation before transitioning to `pending`. Defaults to `automatic`, but regulatory requirements may still require confirmation. See [Send money with Global Payouts](https://docs.stripe.com/global-payouts/send-money) for details.",
        }),
      ),
      description: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "An arbitrary string attached to the PayoutIntent. Often useful for displaying to users.",
        }),
      ),
      from: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.String.annotate({
            description: "The currency of the financial account.",
          }),
          financial_account: Schema.String.annotate({
            description: "The FinancialAccount that funds are pulled from.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        description: "The FinancialAccount that funds are pulled from.",
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
            "Recipient notification settings for the PayoutIntent. Only applicable when the PayoutIntent creates an OutboundPayment.",
        }),
      ),
      schedule_options: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            execute_on: Schema.optionalKey(
              Schema.String.annotate({
                description:
                  "The date when the payout should be executed, in YYYY-MM-DD format.",
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
          description:
            "Scheduling options for the payout. If omitted, the payout is scheduled for immediate execution.",
        }),
      ),
      statement_descriptor: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "The description that appears on the receiving end for the payout (for example, on a bank statement).",
        }),
      ),
      to: Schema.StructWithRest(
        Schema.Struct({
          currency: Schema.optionalKey(
            Schema.String.annotate({
              description: "The currency to send to the recipient.",
            }),
          ),
          payout_method: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "The payout method ID for the PayoutIntent. Optional when the PayoutIntent creates an OutboundPayment and the recipient has a default payout method. Required when the PayoutIntent creates an OutboundTransfer.",
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
                            "The preferred networks to use for this PayoutIntent.",
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
              description: "Payout method options for the PayoutIntent.",
            }),
          ),
          recipient: Schema.optionalKey(
            Schema.String.annotate({
              description: "The recipient ID for the PayoutIntent.",
            }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ description: "To which payout method the payout is sent." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripePayoutIntentResourceSchema,
);
