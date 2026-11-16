// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_terminal_reader,
  Stripeerror,
  Stripeterminal_reader,
} from "./models/common.js";

export type GetTerminalReadersInput = {
  readonly device_type?:
    | "bbpos_chipper2x"
    | "bbpos_wisepad3"
    | "bbpos_wisepos_e"
    | "mobile_phone_reader"
    | "simulated_stripe_s700"
    | "simulated_stripe_s710"
    | "simulated_stripe_t600"
    | "simulated_verifone_m425"
    | "simulated_verifone_p630"
    | "simulated_verifone_ux700"
    | "simulated_verifone_v660p"
    | "simulated_wisepos_e"
    | "stripe_m2"
    | "stripe_s700"
    | "stripe_s710"
    | "stripe_t600"
    | "verifone_P400"
    | "verifone_m425"
    | "verifone_p630"
    | "verifone_ux700"
    | "verifone_v660p";
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly location?: string;
  readonly serial_number?: string;
  readonly starting_after?: string;
  readonly status?: "offline" | "online";
};
export type GetTerminalReadersOutput = {
  readonly data: ReadonlyArray<Stripeterminal_reader>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTerminalReadersError = Stripeerror;
export type PostTerminalReadersInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly label?: string;
  readonly location?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly registration_code: string;
};
export type PostTerminalReadersOutput = Stripeterminal_reader;
export type PostTerminalReadersError = Stripeerror;
export type GetTerminalReadersReaderInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly reader: string;
};
export type GetTerminalReadersReaderOutput =
  | Stripeterminal_reader
  | Stripedeleted_terminal_reader;
export type GetTerminalReadersReaderError = Stripeerror;
export type PostTerminalReadersReaderInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly label?: string | "";
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly reader: string;
};
export type PostTerminalReadersReaderOutput =
  | Stripeterminal_reader
  | Stripedeleted_terminal_reader;
export type PostTerminalReadersReaderError = Stripeerror;
export type DeleteTerminalReadersReaderInput = { readonly reader: string };
export type DeleteTerminalReadersReaderOutput = Stripedeleted_terminal_reader;
export type DeleteTerminalReadersReaderError = Stripeerror;
export type PostTerminalReadersReaderCancelActionInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly reader: string;
};
export type PostTerminalReadersReaderCancelActionOutput =
  | Stripeterminal_reader
  | Stripedeleted_terminal_reader;
export type PostTerminalReadersReaderCancelActionError = Stripeerror;
export type PostTerminalReadersReaderCollectInputsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly inputs: ReadonlyArray<
    {
      readonly custom_text: {
        readonly description?: string;
        readonly skip_button?: string;
        readonly submit_button?: string;
        readonly title: string;
      } & { readonly [x: string]: Schema.Json };
      readonly required?: boolean;
      readonly selection?: {
        readonly choices: ReadonlyArray<
          {
            readonly id: string;
            readonly style?: "primary" | "secondary";
            readonly text: string;
          } & { readonly [x: string]: Schema.Json }
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly toggles?: ReadonlyArray<
        {
          readonly default_value?: "disabled" | "enabled";
          readonly description?: string;
          readonly title?: string;
        } & { readonly [x: string]: Schema.Json }
      >;
      readonly type:
        | "email"
        | "numeric"
        | "phone"
        | "selection"
        | "signature"
        | "text";
    } & { readonly [x: string]: Schema.Json }
  >;
  readonly metadata?: { readonly [x: string]: string };
  readonly reader: string;
};
export type PostTerminalReadersReaderCollectInputsOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderCollectInputsError = Stripeerror;
export type PostTerminalReadersReaderCollectPaymentMethodInput = {
  readonly collect_config?: {
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
    readonly enable_customer_cancellation?: boolean;
    readonly skip_tipping?: boolean;
    readonly tipping?: { readonly amount_eligible?: number } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly payment_intent: string;
  readonly reader: string;
};
export type PostTerminalReadersReaderCollectPaymentMethodOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderCollectPaymentMethodError = Stripeerror;
export type PostTerminalReadersReaderConfirmPaymentIntentInput = {
  readonly confirm_config?: { readonly return_url?: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly payment_intent: string;
  readonly reader: string;
};
export type PostTerminalReadersReaderConfirmPaymentIntentOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderConfirmPaymentIntentError = Stripeerror;
export type PostTerminalReadersReaderProcessPaymentIntentInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly payment_intent: string;
  readonly process_config?: {
    readonly allow_redisplay?: "always" | "limited" | "unspecified";
    readonly enable_customer_cancellation?: boolean;
    readonly return_url?: string;
    readonly skip_tipping?: boolean;
    readonly tipping?: { readonly amount_eligible?: number } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly reader: string;
};
export type PostTerminalReadersReaderProcessPaymentIntentOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderProcessPaymentIntentError = Stripeerror;
export type PostTerminalReadersReaderProcessSetupIntentInput = {
  readonly allow_redisplay: "always" | "limited" | "unspecified";
  readonly expand?: ReadonlyArray<string>;
  readonly process_config?: {
    readonly enable_customer_cancellation?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly setup_intent: string;
  readonly reader: string;
};
export type PostTerminalReadersReaderProcessSetupIntentOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderProcessSetupIntentError = Stripeerror;
export type PostTerminalReadersReaderRefundPaymentInput = {
  readonly amount?: number;
  readonly charge?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_intent?: string;
  readonly refund_application_fee?: boolean;
  readonly refund_payment_config?: {
    readonly enable_customer_cancellation?: boolean;
  } & { readonly [x: string]: Schema.Json };
  readonly reverse_transfer?: boolean;
  readonly reader: string;
};
export type PostTerminalReadersReaderRefundPaymentOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderRefundPaymentError = Stripeerror;
export type PostTerminalReadersReaderSetReaderDisplayInput = {
  readonly cart?: {
    readonly currency: string;
    readonly line_items: ReadonlyArray<
      {
        readonly amount: number;
        readonly description: string;
        readonly quantity: number;
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly tax?: number;
    readonly total: number;
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly type: "cart";
  readonly reader: string;
};
export type PostTerminalReadersReaderSetReaderDisplayOutput =
  Stripeterminal_reader;
export type PostTerminalReadersReaderSetReaderDisplayError = Stripeerror;

export const GetTerminalReadersInput = Schema.Struct({
  device_type: Schema.optionalKey(
    Schema.Literals([
      "bbpos_chipper2x",
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "mobile_phone_reader",
      "simulated_stripe_s700",
      "simulated_stripe_s710",
      "simulated_stripe_t600",
      "simulated_verifone_m425",
      "simulated_verifone_p630",
      "simulated_verifone_ux700",
      "simulated_verifone_v660p",
      "simulated_wisepos_e",
      "stripe_m2",
      "stripe_s700",
      "stripe_s710",
      "stripe_t600",
      "verifone_P400",
      "verifone_m425",
      "verifone_p630",
      "verifone_ux700",
      "verifone_v660p",
    ]),
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
  location: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  serial_number: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(Schema.Literals(["offline", "online"])),
});
export const GetTerminalReadersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeterminal_reader).annotate({
      description: "A list of readers",
    }),
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
).annotate({ title: "TerminalReaderRetrieveReader", description: "" });
export const GetTerminalReadersError = Stripeerror;
export const PostTerminalReadersInput = Schema.Struct({
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
  label: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Custom label given to the reader for easier identification. If no label is specified, the registration code will be used.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  location: Schema.optionalKey(
    Schema.String.annotate({
      description: "The location to assign the reader to.",
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
  registration_code: Schema.String.annotate({
    description:
      "A code generated by the reader used for registering to an account.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersOutput = Stripeterminal_reader;
export const PostTerminalReadersError = Stripeerror;
export const GetTerminalReadersReaderInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTerminalReadersReaderOutput = Schema.Union([
  Stripeterminal_reader,
  Stripedeleted_terminal_reader,
]);
export const GetTerminalReadersReaderError = Stripeerror;
export const PostTerminalReadersReaderInput = Schema.Struct({
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
  label: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({ description: "The new label of the reader." }),
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
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderOutput = Schema.Union([
  Stripeterminal_reader,
  Stripedeleted_terminal_reader,
]);
export const PostTerminalReadersReaderError = Stripeerror;
export const DeleteTerminalReadersReaderInput = Schema.Struct({
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteTerminalReadersReaderOutput = Stripedeleted_terminal_reader;
export const DeleteTerminalReadersReaderError = Stripeerror;
export const PostTerminalReadersReaderCancelActionInput = Schema.Struct({
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
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderCancelActionOutput = Schema.Union([
  Stripeterminal_reader,
  Stripedeleted_terminal_reader,
]);
export const PostTerminalReadersReaderCancelActionError = Stripeerror;
export const PostTerminalReadersReaderCollectInputsInput = Schema.Struct({
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
  inputs: Schema.Array(
    Schema.StructWithRest(
      Schema.Struct({
        custom_text: Schema.StructWithRest(
          Schema.Struct({
            description: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ),
            skip_button: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(14).annotate({
                  expected: "a string with at most 14 code points",
                }),
              ),
            ),
            submit_button: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(30).annotate({
                  expected: "a string with at most 30 code points",
                }),
              ),
            ),
            title: Schema.String.check(
              Schema.isMaxCodePoints(40).annotate({
                expected: "a string with at most 40 code points",
              }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "custom_text_params" }),
        required: Schema.optionalKey(Schema.Boolean),
        selection: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              choices: Schema.Array(
                Schema.StructWithRest(
                  Schema.Struct({
                    id: Schema.String.check(
                      Schema.isMaxCodePoints(50).annotate({
                        expected: "a string with at most 50 code points",
                      }),
                    ),
                    style: Schema.optionalKey(
                      Schema.Literals(["primary", "secondary"]),
                    ),
                    text: Schema.String.check(
                      Schema.isMaxCodePoints(30).annotate({
                        expected: "a string with at most 30 code points",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "choice_params" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "selection_params" }),
        ),
        toggles: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                default_value: Schema.optionalKey(
                  Schema.Literals(["disabled", "enabled"]),
                ),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(50).annotate({
                      expected: "a string with at most 50 code points",
                    }),
                  ),
                ),
                title: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(50).annotate({
                      expected: "a string with at most 50 code points",
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
            ).annotate({ title: "toggle_params" }),
          ),
        ),
        type: Schema.Literals([
          "email",
          "numeric",
          "phone",
          "selection",
          "signature",
          "text",
        ]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({ title: "input_params" }),
  ).annotate({
    description:
      "List of inputs to be collected from the customer using the Reader. Maximum 5 inputs.",
  }),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderCollectInputsOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderCollectInputsError = Stripeerror;
export const PostTerminalReadersReaderCollectPaymentMethodInput = Schema.Struct(
  {
    collect_config: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          allow_redisplay: Schema.optionalKey(
            Schema.Literals(["always", "limited", "unspecified"]),
          ),
          enable_customer_cancellation: Schema.optionalKey(Schema.Boolean),
          skip_tipping: Schema.optionalKey(Schema.Boolean),
          tipping: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_eligible: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "tipping_config" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "collect_config",
        description:
          "Configuration overrides for this collection, such as tipping, surcharging, and customer cancellation settings.",
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
    payment_intent: Schema.String.annotate({
      description:
        "The ID of the PaymentIntent to collect a payment method for.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    reader: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostTerminalReadersReaderCollectPaymentMethodOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderCollectPaymentMethodError = Stripeerror;
export const PostTerminalReadersReaderConfirmPaymentIntentInput = Schema.Struct(
  {
    confirm_config: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({ return_url: Schema.optionalKey(Schema.String) }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "confirm_config",
        description:
          "Configuration overrides for this confirmation, such as surcharge settings and return URL.",
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
    payment_intent: Schema.String.annotate({
      description: "The ID of the PaymentIntent to confirm.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    reader: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostTerminalReadersReaderConfirmPaymentIntentOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderConfirmPaymentIntentError = Stripeerror;
export const PostTerminalReadersReaderProcessPaymentIntentInput = Schema.Struct(
  {
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
    payment_intent: Schema.String.annotate({
      description: "The ID of the PaymentIntent to process on the reader.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    process_config: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          allow_redisplay: Schema.optionalKey(
            Schema.Literals(["always", "limited", "unspecified"]),
          ),
          enable_customer_cancellation: Schema.optionalKey(Schema.Boolean),
          return_url: Schema.optionalKey(Schema.String),
          skip_tipping: Schema.optionalKey(Schema.Boolean),
          tipping: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                amount_eligible: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "tipping_config" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "process_config",
        description:
          "Configuration overrides for this transaction, such as tipping and customer cancellation settings.",
      }),
    ),
    reader: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostTerminalReadersReaderProcessPaymentIntentOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderProcessPaymentIntentError = Stripeerror;
export const PostTerminalReadersReaderProcessSetupIntentInput = Schema.Struct({
  allow_redisplay: Schema.Literals([
    "always",
    "limited",
    "unspecified",
  ]).annotate({
    description:
      "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow.",
  }),
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
  process_config: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enable_customer_cancellation: Schema.optionalKey(Schema.Boolean),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "process_setup_config",
      description:
        "Configuration overrides for this setup, such as MOTO and customer cancellation settings.",
    }),
  ),
  setup_intent: Schema.String.annotate({
    description: "The ID of the SetupIntent to process on the reader.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderProcessSetupIntentOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderProcessSetupIntentError = Stripeerror;
export const PostTerminalReadersReaderRefundPaymentInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A positive integer in __cents__ representing how much of this charge to refund.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  charge: Schema.optionalKey(
    Schema.String.annotate({
      description: "ID of the Charge to refund.",
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
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  payment_intent: Schema.optionalKey(
    Schema.String.annotate({
      description: "ID of the PaymentIntent to refund.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  refund_application_fee: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the application fee should be refunded when refunding this charge. If a full charge refund is given, the full application fee will be refunded. Otherwise, the application fee will be refunded in an amount proportional to the amount of the charge refunded. An application fee can be refunded only by the application that created the charge.",
    }),
  ),
  refund_payment_config: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        enable_customer_cancellation: Schema.optionalKey(Schema.Boolean),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "refund_payment_config",
      description:
        "Configuration overrides for this refund, such as customer cancellation settings.",
    }),
  ),
  reverse_transfer: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Boolean indicating whether the transfer should be reversed when refunding this charge. The transfer will be reversed proportionally to the amount being refunded (either the entire or partial amount). A transfer can be reversed only by the application that created the charge.",
    }),
  ),
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderRefundPaymentOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderRefundPaymentError = Stripeerror;
export const PostTerminalReadersReaderSetReaderDisplayInput = Schema.Struct({
  cart: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        currency: Schema.String.annotate({ format: "currency" }),
        line_items: Schema.Array(
          Schema.StructWithRest(
            Schema.Struct({
              amount: Schema.Int,
              description: Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              quantity: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "line_item" }),
        ),
        tax: Schema.optionalKey(Schema.Int),
        total: Schema.Int,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "cart",
      description:
        "Cart details to display on the reader screen, including line items, amounts, and currency.",
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
  type: Schema.Literal("cart").annotate({
    description:
      "Type of information to display. Only `cart` is currently supported.",
  }),
  reader: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalReadersReaderSetReaderDisplayOutput =
  Stripeterminal_reader;
export const PostTerminalReadersReaderSetReaderDisplayError = Stripeerror;
/**
 * The GetTerminalReadersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalReadersOperation: StripeOperation & {
  readonly input: typeof GetTerminalReadersInput;
  readonly output: typeof GetTerminalReadersOutput;
  readonly error: typeof GetTerminalReadersError;
} = {
  name: "GetTerminalReaders",
  method: "GET",
  path: "/v1/terminal/readers",
  pathParameters: [],
  queryParameters: [
    "device_type",
    "ending_before",
    "expand",
    "limit",
    "location",
    "serial_number",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalReadersInput,
  output: GetTerminalReadersOutput,
  error: GetTerminalReadersError,
};
/**
 * The PostTerminalReadersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersInput;
  readonly output: typeof PostTerminalReadersOutput;
  readonly error: typeof PostTerminalReadersError;
} = {
  name: "PostTerminalReaders",
  method: "POST",
  path: "/v1/terminal/readers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersInput,
  output: PostTerminalReadersOutput,
  error: PostTerminalReadersError,
};
/**
 * The GetTerminalReadersReaderOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalReadersReaderOperation: StripeOperation & {
  readonly input: typeof GetTerminalReadersReaderInput;
  readonly output: typeof GetTerminalReadersReaderOutput;
  readonly error: typeof GetTerminalReadersReaderError;
} = {
  name: "GetTerminalReadersReader",
  method: "GET",
  path: "/v1/terminal/readers/{reader}",
  pathParameters: ["reader"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalReadersReaderInput,
  output: GetTerminalReadersReaderOutput,
  error: GetTerminalReadersReaderError,
};
/**
 * The PostTerminalReadersReaderOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderInput;
  readonly output: typeof PostTerminalReadersReaderOutput;
  readonly error: typeof PostTerminalReadersReaderError;
} = {
  name: "PostTerminalReadersReader",
  method: "POST",
  path: "/v1/terminal/readers/{reader}",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderInput,
  output: PostTerminalReadersReaderOutput,
  error: PostTerminalReadersReaderError,
};
/**
 * The DeleteTerminalReadersReaderOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteTerminalReadersReaderOperation: StripeOperation & {
  readonly input: typeof DeleteTerminalReadersReaderInput;
  readonly output: typeof DeleteTerminalReadersReaderOutput;
  readonly error: typeof DeleteTerminalReadersReaderError;
} = {
  name: "DeleteTerminalReadersReader",
  method: "DELETE",
  path: "/v1/terminal/readers/{reader}",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteTerminalReadersReaderInput,
  output: DeleteTerminalReadersReaderOutput,
  error: DeleteTerminalReadersReaderError,
};
/**
 * The PostTerminalReadersReaderCancelActionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderCancelActionOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderCancelActionInput;
  readonly output: typeof PostTerminalReadersReaderCancelActionOutput;
  readonly error: typeof PostTerminalReadersReaderCancelActionError;
} = {
  name: "PostTerminalReadersReaderCancelAction",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/cancel_action",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderCancelActionInput,
  output: PostTerminalReadersReaderCancelActionOutput,
  error: PostTerminalReadersReaderCancelActionError,
};
/**
 * The PostTerminalReadersReaderCollectInputsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderCollectInputsOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderCollectInputsInput;
  readonly output: typeof PostTerminalReadersReaderCollectInputsOutput;
  readonly error: typeof PostTerminalReadersReaderCollectInputsError;
} = {
  name: "PostTerminalReadersReaderCollectInputs",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/collect_inputs",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderCollectInputsInput,
  output: PostTerminalReadersReaderCollectInputsOutput,
  error: PostTerminalReadersReaderCollectInputsError,
};
/**
 * The PostTerminalReadersReaderCollectPaymentMethodOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderCollectPaymentMethodOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderCollectPaymentMethodInput;
  readonly output: typeof PostTerminalReadersReaderCollectPaymentMethodOutput;
  readonly error: typeof PostTerminalReadersReaderCollectPaymentMethodError;
} = {
  name: "PostTerminalReadersReaderCollectPaymentMethod",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/collect_payment_method",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderCollectPaymentMethodInput,
  output: PostTerminalReadersReaderCollectPaymentMethodOutput,
  error: PostTerminalReadersReaderCollectPaymentMethodError,
};
/**
 * The PostTerminalReadersReaderConfirmPaymentIntentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderConfirmPaymentIntentOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderConfirmPaymentIntentInput;
  readonly output: typeof PostTerminalReadersReaderConfirmPaymentIntentOutput;
  readonly error: typeof PostTerminalReadersReaderConfirmPaymentIntentError;
} = {
  name: "PostTerminalReadersReaderConfirmPaymentIntent",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/confirm_payment_intent",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderConfirmPaymentIntentInput,
  output: PostTerminalReadersReaderConfirmPaymentIntentOutput,
  error: PostTerminalReadersReaderConfirmPaymentIntentError,
};
/**
 * The PostTerminalReadersReaderProcessPaymentIntentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderProcessPaymentIntentOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderProcessPaymentIntentInput;
  readonly output: typeof PostTerminalReadersReaderProcessPaymentIntentOutput;
  readonly error: typeof PostTerminalReadersReaderProcessPaymentIntentError;
} = {
  name: "PostTerminalReadersReaderProcessPaymentIntent",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/process_payment_intent",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderProcessPaymentIntentInput,
  output: PostTerminalReadersReaderProcessPaymentIntentOutput,
  error: PostTerminalReadersReaderProcessPaymentIntentError,
};
/**
 * The PostTerminalReadersReaderProcessSetupIntentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderProcessSetupIntentOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderProcessSetupIntentInput;
  readonly output: typeof PostTerminalReadersReaderProcessSetupIntentOutput;
  readonly error: typeof PostTerminalReadersReaderProcessSetupIntentError;
} = {
  name: "PostTerminalReadersReaderProcessSetupIntent",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/process_setup_intent",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderProcessSetupIntentInput,
  output: PostTerminalReadersReaderProcessSetupIntentOutput,
  error: PostTerminalReadersReaderProcessSetupIntentError,
};
/**
 * The PostTerminalReadersReaderRefundPaymentOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderRefundPaymentOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderRefundPaymentInput;
  readonly output: typeof PostTerminalReadersReaderRefundPaymentOutput;
  readonly error: typeof PostTerminalReadersReaderRefundPaymentError;
} = {
  name: "PostTerminalReadersReaderRefundPayment",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/refund_payment",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderRefundPaymentInput,
  output: PostTerminalReadersReaderRefundPaymentOutput,
  error: PostTerminalReadersReaderRefundPaymentError,
};
/**
 * The PostTerminalReadersReaderSetReaderDisplayOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalReadersReaderSetReaderDisplayOperation: StripeOperation & {
  readonly input: typeof PostTerminalReadersReaderSetReaderDisplayInput;
  readonly output: typeof PostTerminalReadersReaderSetReaderDisplayOutput;
  readonly error: typeof PostTerminalReadersReaderSetReaderDisplayError;
} = {
  name: "PostTerminalReadersReaderSetReaderDisplay",
  method: "POST",
  path: "/v1/terminal/readers/{reader}/set_reader_display",
  pathParameters: ["reader"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalReadersReaderSetReaderDisplayInput,
  output: PostTerminalReadersReaderSetReaderDisplayOutput,
  error: PostTerminalReadersReaderSetReaderDisplayError,
};
/**
 * The makeTerminalReadersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTerminalReadersClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTerminalReaders function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalReaders = Effect.fn("terminalReaders.GetTerminalReaders")(
    function* (input: GetTerminalReadersInput) {
      const response: GetTerminalReadersOutput = yield* client.invoke(
        GetTerminalReadersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostTerminalReaders function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReaders = Effect.fn("terminalReaders.PostTerminalReaders")(
    function* (input: PostTerminalReadersInput) {
      const response: PostTerminalReadersOutput = yield* client.invoke(
        PostTerminalReadersOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The GetTerminalReadersReader function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalReadersReader = Effect.fn(
    "terminalReaders.GetTerminalReadersReader",
  )(function* (input: GetTerminalReadersReaderInput) {
    const response: GetTerminalReadersReaderOutput = yield* client.invoke(
      GetTerminalReadersReaderOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTerminalReadersReader function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReader = Effect.fn(
    "terminalReaders.PostTerminalReadersReader",
  )(function* (input: PostTerminalReadersReaderInput) {
    const response: PostTerminalReadersReaderOutput = yield* client.invoke(
      PostTerminalReadersReaderOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteTerminalReadersReader function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteTerminalReadersReader = Effect.fn(
    "terminalReaders.DeleteTerminalReadersReader",
  )(function* (input: DeleteTerminalReadersReaderInput) {
    const response: DeleteTerminalReadersReaderOutput = yield* client.invoke(
      DeleteTerminalReadersReaderOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTerminalReadersReaderCancelAction function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderCancelAction = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderCancelAction",
  )(function* (input: PostTerminalReadersReaderCancelActionInput) {
    const response: PostTerminalReadersReaderCancelActionOutput =
      yield* client.invoke(
        PostTerminalReadersReaderCancelActionOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderCollectInputs function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderCollectInputs = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderCollectInputs",
  )(function* (input: PostTerminalReadersReaderCollectInputsInput) {
    const response: PostTerminalReadersReaderCollectInputsOutput =
      yield* client.invoke(
        PostTerminalReadersReaderCollectInputsOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderCollectPaymentMethod function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderCollectPaymentMethod = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderCollectPaymentMethod",
  )(function* (input: PostTerminalReadersReaderCollectPaymentMethodInput) {
    const response: PostTerminalReadersReaderCollectPaymentMethodOutput =
      yield* client.invoke(
        PostTerminalReadersReaderCollectPaymentMethodOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderConfirmPaymentIntent function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderConfirmPaymentIntent = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderConfirmPaymentIntent",
  )(function* (input: PostTerminalReadersReaderConfirmPaymentIntentInput) {
    const response: PostTerminalReadersReaderConfirmPaymentIntentOutput =
      yield* client.invoke(
        PostTerminalReadersReaderConfirmPaymentIntentOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderProcessPaymentIntent function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderProcessPaymentIntent = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderProcessPaymentIntent",
  )(function* (input: PostTerminalReadersReaderProcessPaymentIntentInput) {
    const response: PostTerminalReadersReaderProcessPaymentIntentOutput =
      yield* client.invoke(
        PostTerminalReadersReaderProcessPaymentIntentOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderProcessSetupIntent function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderProcessSetupIntent = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderProcessSetupIntent",
  )(function* (input: PostTerminalReadersReaderProcessSetupIntentInput) {
    const response: PostTerminalReadersReaderProcessSetupIntentOutput =
      yield* client.invoke(
        PostTerminalReadersReaderProcessSetupIntentOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderRefundPayment function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderRefundPayment = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderRefundPayment",
  )(function* (input: PostTerminalReadersReaderRefundPaymentInput) {
    const response: PostTerminalReadersReaderRefundPaymentOutput =
      yield* client.invoke(
        PostTerminalReadersReaderRefundPaymentOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalReadersReaderSetReaderDisplay function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalReadersReaderSetReaderDisplay = Effect.fn(
    "terminalReaders.PostTerminalReadersReaderSetReaderDisplay",
  )(function* (input: PostTerminalReadersReaderSetReaderDisplayInput) {
    const response: PostTerminalReadersReaderSetReaderDisplayOutput =
      yield* client.invoke(
        PostTerminalReadersReaderSetReaderDisplayOperation,
        input,
      );
    return response;
  });
  return {
    GetTerminalReaders,
    PostTerminalReaders,
    GetTerminalReadersReader,
    PostTerminalReadersReader,
    DeleteTerminalReadersReader,
    PostTerminalReadersReaderCancelAction,
    PostTerminalReadersReaderCollectInputs,
    PostTerminalReadersReaderCollectPaymentMethod,
    PostTerminalReadersReaderConfirmPaymentIntent,
    PostTerminalReadersReaderProcessPaymentIntent,
    PostTerminalReadersReaderProcessSetupIntent,
    PostTerminalReadersReaderRefundPayment,
    PostTerminalReadersReaderSetReaderDisplay,
  };
});
