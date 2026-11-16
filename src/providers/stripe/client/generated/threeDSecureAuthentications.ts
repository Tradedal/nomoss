// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripeerror,
  Stripethree_d_secure_authentication,
} from "./models/common.js";

export type GetThreeDSecureAuthenticationsInput = {
  readonly created?:
    | ({
        readonly gt?: number;
        readonly gte?: number;
        readonly lt?: number;
        readonly lte?: number;
      } & { readonly [x: string]: Schema.Json })
    | number;
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?:
    | "canceled"
    | "error"
    | "failed"
    | "requires_challenge"
    | "requires_submission"
    | "succeeded";
};
export type GetThreeDSecureAuthenticationsOutput = {
  readonly data: ReadonlyArray<Stripethree_d_secure_authentication>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetThreeDSecureAuthenticationsError = Stripeerror;
export type PostThreeDSecureAuthenticationsInput = {
  readonly acquirer_details?: {
    readonly acquirer_bin: string;
    readonly acquirer_country: string;
    readonly acquirer_merchant_id: string;
    readonly mcc?: string;
    readonly merchant_name?: string;
    readonly requestor_id?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly amount?: number;
  readonly channel: {
    readonly browser?: {
      readonly accept_header: string;
      readonly color_depth?: number;
      readonly device_id?: string;
      readonly ip_address: string;
      readonly java_enabled?: boolean;
      readonly javascript_enabled: boolean;
      readonly language: string;
      readonly screen_height?: number;
      readonly screen_width?: number;
      readonly timezone_offset?: number;
      readonly user_agent: string;
    } & { readonly [x: string]: Schema.Json };
    readonly three_r_i?: {
      readonly previous_authentication: string;
      readonly type:
        | "delayed_shipment"
        | "other_payment"
        | "recurring"
        | "split_shipment";
    } & { readonly [x: string]: Schema.Json };
    readonly type: "browser" | "three_r_i";
  } & { readonly [x: string]: Schema.Json };
  readonly currency?: string;
  readonly directory_server?:
    | "american_express"
    | "cartes_bancaires"
    | "discover"
    | "mastercard"
    | "visa";
  readonly expand?: ReadonlyArray<string>;
  readonly flow_preference?: {
    readonly challenge?: { readonly type: "mandated" | "preferred" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly data_share?: { readonly type: "ds_specific" | "emv_standard" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly frictionless?: { readonly type: "low_risk" | "none" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly type: "challenge" | "data_share" | "frictionless";
  } & { readonly [x: string]: Schema.Json };
  readonly future_usage?: {
    readonly installment?: {
      readonly amount: number;
      readonly expiry: {
        readonly date?: string;
        readonly type: "date" | "never";
      } & { readonly [x: string]: Schema.Json };
      readonly interval?: "day";
      readonly interval_count?: number;
      readonly number: number;
    } & { readonly [x: string]: Schema.Json };
    readonly recurring?: {
      readonly amount: number;
      readonly expiry: {
        readonly date?: string;
        readonly type: "date" | "never";
      } & { readonly [x: string]: Schema.Json };
      readonly interval?: "day";
      readonly interval_count?: number;
    } & { readonly [x: string]: Schema.Json };
    readonly type: "card_on_file" | "installment" | "recurring";
  } & { readonly [x: string]: Schema.Json };
  readonly message_category:
    | "non_payment_authentication"
    | "payment_authentication";
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly payment_method?: string;
  readonly payment_method_data?: {
    readonly billing_details?: {
      readonly address?: {
        readonly city?: string;
        readonly country?: string;
        readonly line1?: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly email?: string;
      readonly name?: string;
      readonly phone?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly card:
      | ({
          readonly cvc?: string;
          readonly exp_month: number;
          readonly exp_year: number;
          readonly number: string;
        } & { readonly [x: string]: Schema.Json })
      | ({ readonly token: string } & { readonly [x: string]: Schema.Json });
    readonly type: "card";
  } & { readonly [x: string]: Schema.Json };
  readonly reason?:
    | "cardholder_authentication"
    | "issuer_requested"
    | "liability_shift"
    | "processing_costs"
    | "regulatory_compliance";
  readonly shipping_address?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly submit?: "always" | "if_fingerprinting_not_supported" | "never";
};
export type PostThreeDSecureAuthenticationsOutput =
  Stripethree_d_secure_authentication;
export type PostThreeDSecureAuthenticationsError = Stripeerror;
export type GetThreeDSecureAuthenticationsAuthenticationInput = {
  readonly authentication: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetThreeDSecureAuthenticationsAuthenticationOutput =
  Stripethree_d_secure_authentication;
export type GetThreeDSecureAuthenticationsAuthenticationError = Stripeerror;
export type PostThreeDSecureAuthenticationsAuthenticationCancelInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly authentication: string;
};
export type PostThreeDSecureAuthenticationsAuthenticationCancelOutput =
  Stripethree_d_secure_authentication;
export type PostThreeDSecureAuthenticationsAuthenticationCancelError =
  Stripeerror;
export type PostThreeDSecureAuthenticationsAuthenticationSubmitInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly fingerprinting_result?: string;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly authentication: string;
};
export type PostThreeDSecureAuthenticationsAuthenticationSubmitOutput =
  Stripethree_d_secure_authentication;
export type PostThreeDSecureAuthenticationsAuthenticationSubmitError =
  Stripeerror;

export const GetThreeDSecureAuthenticationsInput = Schema.Struct({
  created: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          gt: Schema.optionalKey(Schema.Int),
          gte: Schema.optionalKey(Schema.Int),
          lt: Schema.optionalKey(Schema.Int),
          lte: Schema.optionalKey(Schema.Int),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "range_query_specs" }),
      Schema.Int,
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
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals([
      "canceled",
      "error",
      "failed",
      "requires_challenge",
      "requires_submission",
      "succeeded",
    ]),
  ),
});
export const GetThreeDSecureAuthenticationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripethree_d_secure_authentication),
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
          new globalThis.RegExp(
            "^\\/v1\\/three_d_secure\\/authentications",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/three_d_secure\\/authentications",
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
  title: "ThreeDSecureStandaloneResourceThreeDSecureAuthenticationList",
  description: "",
});
export const GetThreeDSecureAuthenticationsError = Stripeerror;
export const PostThreeDSecureAuthenticationsInput = Schema.Struct({
  acquirer_details: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acquirer_bin: Schema.String.check(
          Schema.isMaxCodePoints(11).annotate({
            expected: "a string with at most 11 code points",
          }),
        ),
        acquirer_country: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        acquirer_merchant_id: Schema.String.check(
          Schema.isMaxCodePoints(35).annotate({
            expected: "a string with at most 35 code points",
          }),
        ),
        mcc: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        merchant_name: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(40).annotate({
              expected: "a string with at most 40 code points",
            }),
          ),
        ),
        requestor_id: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(35).annotate({
              expected: "a string with at most 35 code points",
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
      title: "acquirer_details",
      description:
        "Contains additional details about the acquirer for this 3DS Authentication.\n\nRefer to the [Pass acquirer details and directory server section of the standalone 3DS guide](/payments/3d-secure/standalone-3d-secure#pass-acquirer-details-and-directory-server) for more information.",
    }),
  ),
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "A non-negative integer representing the amount in the [smallest currency unit](/currencies#zero-decimal). You can't include this parameter if `message_category` is `non_payment_authentication`",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  channel: Schema.StructWithRest(
    Schema.Struct({
      browser: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            accept_header: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            ),
            color_depth: Schema.optionalKey(Schema.Int),
            device_id: Schema.optionalKey(
              Schema.String.check(
                Schema.isMaxCodePoints(64).annotate({
                  expected: "a string with at most 64 code points",
                }),
              ),
            ),
            ip_address: Schema.String.check(
              Schema.isMaxCodePoints(45).annotate({
                expected: "a string with at most 45 code points",
              }),
            ),
            java_enabled: Schema.optionalKey(Schema.Boolean),
            javascript_enabled: Schema.Boolean,
            language: Schema.String.check(
              Schema.isMaxCodePoints(35).annotate({
                expected: "a string with at most 35 code points",
              }),
            ),
            screen_height: Schema.optionalKey(Schema.Int),
            screen_width: Schema.optionalKey(Schema.Int),
            timezone_offset: Schema.optionalKey(Schema.Int),
            user_agent: Schema.String.check(
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
        ).annotate({ title: "browser" }),
      ),
      three_r_i: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            previous_authentication: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            type: Schema.Literals([
              "delayed_shipment",
              "other_payment",
              "recurring",
              "split_shipment",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "three_ri" }),
      ),
      type: Schema.Literals(["browser", "three_r_i"]),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "channel",
    description:
      "Contains additional details on the channel used for this 3DS Authentication.",
  }),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
  ),
  directory_server: Schema.optionalKey(
    Schema.Literals([
      "american_express",
      "cartes_bancaires",
      "discover",
      "mastercard",
      "visa",
    ]).annotate({
      description:
        "The 3DS directory server with which this 3DS Authentication was processed.",
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
  flow_preference: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        challenge: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({ type: Schema.Literals(["mandated", "preferred"]) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "challenge" }),
        ),
        data_share: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              type: Schema.Literals(["ds_specific", "emv_standard"]),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "data_share" }),
        ),
        frictionless: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({ type: Schema.Literals(["low_risk", "none"]) }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "frictionless" }),
        ),
        type: Schema.Literals(["challenge", "data_share", "frictionless"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "flow_preference",
      description:
        "Contains additional details on your flow preference for this 3DS Authentication.\n\nRefer to the [Specify a flow preference section of the standalone 3DS guide](/payments/3d-secure/standalone-3d-secure#specify-a-flow-preference) for more information.",
    }),
  ),
  future_usage: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        installment: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              amount: Schema.Int,
              expiry: Schema.StructWithRest(
                Schema.Struct({
                  date: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  type: Schema.Literals(["date", "never"]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "expiry" }),
              interval: Schema.optionalKey(Schema.Literal("day")),
              interval_count: Schema.optionalKey(Schema.Int),
              number: Schema.Int,
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "installment" }),
        ),
        recurring: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              amount: Schema.Int,
              expiry: Schema.StructWithRest(
                Schema.Struct({
                  date: Schema.optionalKey(
                    Schema.String.check(
                      Schema.isMaxCodePoints(5000).annotate({
                        expected: "a string with at most 5000 code points",
                      }),
                    ),
                  ),
                  type: Schema.Literals(["date", "never"]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "expiry" }),
              interval: Schema.optionalKey(Schema.Literal("day")),
              interval_count: Schema.optionalKey(Schema.Int),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "recurring" }),
        ),
        type: Schema.Literals(["card_on_file", "installment", "recurring"]),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "future_usage",
      description:
        "Contains information about future usage of this 3DS Authentication",
    }),
  ),
  message_category: Schema.Literals([
    "non_payment_authentication",
    "payment_authentication",
  ]).annotate({
    description:
      "Indicates whether this 3DS Authentication is being performed for a payment or non-payment use case.",
  }),
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  payment_method: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "ID of the payment method (a PaymentMethod object) to attach to this 3DS Authentication.",
    }).check(
      Schema.isMaxCodePoints(255).annotate({
        expected: "a string with at most 255 code points",
      }),
    ),
  ),
  payment_method_data: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        billing_details: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              address: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    city: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(50).annotate({
                          expected: "a string with at most 50 code points",
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
                        Schema.isMaxCodePoints(50).annotate({
                          expected: "a string with at most 50 code points",
                        }),
                      ),
                    ),
                    line2: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(50).annotate({
                          expected: "a string with at most 50 code points",
                        }),
                      ),
                    ),
                    postal_code: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(16).annotate({
                          expected: "a string with at most 16 code points",
                        }),
                      ),
                    ),
                    state: Schema.optionalKey(
                      Schema.String.check(
                        Schema.isMaxCodePoints(3).annotate({
                          expected: "a string with at most 3 code points",
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
                ).annotate({ title: "address" }),
              ),
              email: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(800).annotate({
                    expected: "a string with at most 800 code points",
                  }),
                ),
              ),
              name: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
              ),
              phone: Schema.optionalKey(Schema.String),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "billing_details" }),
        ),
        card: Schema.Union([
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
          ).annotate({ title: "card" }),
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
          ).annotate({ title: "card_token" }),
        ]),
        type: Schema.Literal("card"),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "payment_method_data",
      description:
        "Hash used to generate the PaymentMethod to be used for this Authentication. This is mutually exclusive with the `payment_method` parameter.",
    }),
  ),
  reason: Schema.optionalKey(
    Schema.Literals([
      "cardholder_authentication",
      "issuer_requested",
      "liability_shift",
      "processing_costs",
      "regulatory_compliance",
    ]).annotate({
      description:
        "The reason for invoking standalone 3DS. This is tailored specifically for cases when you want Stripe to help determine the standalone 3DS flow to fit your use case instead of needing to select a specific 3DS flow.\n\nThis parameter is exclusive with `flow_preference`. You can either use `reason` for controlling 3DS according to your business requirements, or use `flow_preference` for having fine-grained control over your 3DS flow preference.",
    }),
  ),
  shipping_address: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        city: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(50).annotate({
              expected: "a string with at most 50 code points",
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
            Schema.isMaxCodePoints(50).annotate({
              expected: "a string with at most 50 code points",
            }),
          ),
        ),
        line2: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(50).annotate({
              expected: "a string with at most 50 code points",
            }),
          ),
        ),
        postal_code: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(16).annotate({
              expected: "a string with at most 16 code points",
            }),
          ),
        ),
        state: Schema.optionalKey(
          Schema.String.check(
            Schema.isMaxCodePoints(3).annotate({
              expected: "a string with at most 3 code points",
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
      title: "address",
      description:
        "The shipping address requested by the cardholder. You should try to include as complete address information as possible.",
    }),
  ),
  submit: Schema.optionalKey(
    Schema.Literals([
      "always",
      "if_fingerprinting_not_supported",
      "never",
    ]).annotate({
      description:
        "Set to `always` to skip the fingerprinting step and submit this Authentication immediately or `if_fingerprinting_not_supported` to submit this Authentication only if fingerprinting is not available. This parameter defaults to `never`.\n\nRefer to the [Submit at creation section of the standalone 3DS guide](/payments/3d-secure/standalone-3d-secure#submit-at-creation) for more information.",
    }),
  ),
});
export const PostThreeDSecureAuthenticationsOutput =
  Stripethree_d_secure_authentication;
export const PostThreeDSecureAuthenticationsError = Stripeerror;
export const GetThreeDSecureAuthenticationsAuthenticationInput = Schema.Struct({
  authentication: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
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
});
export const GetThreeDSecureAuthenticationsAuthenticationOutput =
  Stripethree_d_secure_authentication;
export const GetThreeDSecureAuthenticationsAuthenticationError = Stripeerror;
export const PostThreeDSecureAuthenticationsAuthenticationCancelInput =
  Schema.Struct({
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
    authentication: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostThreeDSecureAuthenticationsAuthenticationCancelOutput =
  Stripethree_d_secure_authentication;
export const PostThreeDSecureAuthenticationsAuthenticationCancelError =
  Stripeerror;
export const PostThreeDSecureAuthenticationsAuthenticationSubmitInput =
  Schema.Struct({
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
    fingerprinting_result: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The fingerprinting result of the issuer fingerprinting step.\n\nRefer to the [Issuer fingerprinting section of the Standalone 3DS guide](/payments/3d-secure/standalone-3d-secure#issuer-fingerprinting) for more information.",
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
    authentication: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostThreeDSecureAuthenticationsAuthenticationSubmitOutput =
  Stripethree_d_secure_authentication;
export const PostThreeDSecureAuthenticationsAuthenticationSubmitError =
  Stripeerror;
/**
 * The GetThreeDSecureAuthenticationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetThreeDSecureAuthenticationsOperation: StripeOperation & {
  readonly input: typeof GetThreeDSecureAuthenticationsInput;
  readonly output: typeof GetThreeDSecureAuthenticationsOutput;
  readonly error: typeof GetThreeDSecureAuthenticationsError;
} = {
  name: "GetThreeDSecureAuthentications",
  method: "GET",
  path: "/v1/three_d_secure/authentications",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetThreeDSecureAuthenticationsInput,
  output: GetThreeDSecureAuthenticationsOutput,
  error: GetThreeDSecureAuthenticationsError,
};
/**
 * The PostThreeDSecureAuthenticationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostThreeDSecureAuthenticationsOperation: StripeOperation & {
  readonly input: typeof PostThreeDSecureAuthenticationsInput;
  readonly output: typeof PostThreeDSecureAuthenticationsOutput;
  readonly error: typeof PostThreeDSecureAuthenticationsError;
} = {
  name: "PostThreeDSecureAuthentications",
  method: "POST",
  path: "/v1/three_d_secure/authentications",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostThreeDSecureAuthenticationsInput,
  output: PostThreeDSecureAuthenticationsOutput,
  error: PostThreeDSecureAuthenticationsError,
};
/**
 * The GetThreeDSecureAuthenticationsAuthenticationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetThreeDSecureAuthenticationsAuthenticationOperation: StripeOperation & {
  readonly input: typeof GetThreeDSecureAuthenticationsAuthenticationInput;
  readonly output: typeof GetThreeDSecureAuthenticationsAuthenticationOutput;
  readonly error: typeof GetThreeDSecureAuthenticationsAuthenticationError;
} = {
  name: "GetThreeDSecureAuthenticationsAuthentication",
  method: "GET",
  path: "/v1/three_d_secure/authentications/{authentication}",
  pathParameters: ["authentication"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetThreeDSecureAuthenticationsAuthenticationInput,
  output: GetThreeDSecureAuthenticationsAuthenticationOutput,
  error: GetThreeDSecureAuthenticationsAuthenticationError,
};
/**
 * The PostThreeDSecureAuthenticationsAuthenticationCancelOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostThreeDSecureAuthenticationsAuthenticationCancelOperation: StripeOperation & {
  readonly input: typeof PostThreeDSecureAuthenticationsAuthenticationCancelInput;
  readonly output: typeof PostThreeDSecureAuthenticationsAuthenticationCancelOutput;
  readonly error: typeof PostThreeDSecureAuthenticationsAuthenticationCancelError;
} = {
  name: "PostThreeDSecureAuthenticationsAuthenticationCancel",
  method: "POST",
  path: "/v1/three_d_secure/authentications/{authentication}/cancel",
  pathParameters: ["authentication"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostThreeDSecureAuthenticationsAuthenticationCancelInput,
  output: PostThreeDSecureAuthenticationsAuthenticationCancelOutput,
  error: PostThreeDSecureAuthenticationsAuthenticationCancelError,
};
/**
 * The PostThreeDSecureAuthenticationsAuthenticationSubmitOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostThreeDSecureAuthenticationsAuthenticationSubmitOperation: StripeOperation & {
  readonly input: typeof PostThreeDSecureAuthenticationsAuthenticationSubmitInput;
  readonly output: typeof PostThreeDSecureAuthenticationsAuthenticationSubmitOutput;
  readonly error: typeof PostThreeDSecureAuthenticationsAuthenticationSubmitError;
} = {
  name: "PostThreeDSecureAuthenticationsAuthenticationSubmit",
  method: "POST",
  path: "/v1/three_d_secure/authentications/{authentication}/submit",
  pathParameters: ["authentication"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostThreeDSecureAuthenticationsAuthenticationSubmitInput,
  output: PostThreeDSecureAuthenticationsAuthenticationSubmitOutput,
  error: PostThreeDSecureAuthenticationsAuthenticationSubmitError,
};
/**
 * The makeThreeDSecureAuthenticationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeThreeDSecureAuthenticationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetThreeDSecureAuthentications function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetThreeDSecureAuthentications = Effect.fn(
    "threeDSecureAuthentications.GetThreeDSecureAuthentications",
  )(function* (input: GetThreeDSecureAuthenticationsInput) {
    const response: GetThreeDSecureAuthenticationsOutput = yield* client.invoke(
      GetThreeDSecureAuthenticationsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostThreeDSecureAuthentications function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostThreeDSecureAuthentications = Effect.fn(
    "threeDSecureAuthentications.PostThreeDSecureAuthentications",
  )(function* (input: PostThreeDSecureAuthenticationsInput) {
    const response: PostThreeDSecureAuthenticationsOutput =
      yield* client.invoke(PostThreeDSecureAuthenticationsOperation, input);
    return response;
  });
  /**
   * The GetThreeDSecureAuthenticationsAuthentication function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetThreeDSecureAuthenticationsAuthentication = Effect.fn(
    "threeDSecureAuthentications.GetThreeDSecureAuthenticationsAuthentication",
  )(function* (input: GetThreeDSecureAuthenticationsAuthenticationInput) {
    const response: GetThreeDSecureAuthenticationsAuthenticationOutput =
      yield* client.invoke(
        GetThreeDSecureAuthenticationsAuthenticationOperation,
        input,
      );
    return response;
  });
  /**
   * The PostThreeDSecureAuthenticationsAuthenticationCancel function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostThreeDSecureAuthenticationsAuthenticationCancel = Effect.fn(
    "threeDSecureAuthentications.PostThreeDSecureAuthenticationsAuthenticationCancel",
  )(function* (
    input: PostThreeDSecureAuthenticationsAuthenticationCancelInput,
  ) {
    const response: PostThreeDSecureAuthenticationsAuthenticationCancelOutput =
      yield* client.invoke(
        PostThreeDSecureAuthenticationsAuthenticationCancelOperation,
        input,
      );
    return response;
  });
  /**
   * The PostThreeDSecureAuthenticationsAuthenticationSubmit function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostThreeDSecureAuthenticationsAuthenticationSubmit = Effect.fn(
    "threeDSecureAuthentications.PostThreeDSecureAuthenticationsAuthenticationSubmit",
  )(function* (
    input: PostThreeDSecureAuthenticationsAuthenticationSubmitInput,
  ) {
    const response: PostThreeDSecureAuthenticationsAuthenticationSubmitOutput =
      yield* client.invoke(
        PostThreeDSecureAuthenticationsAuthenticationSubmitOperation,
        input,
      );
    return response;
  });
  return {
    GetThreeDSecureAuthentications,
    PostThreeDSecureAuthentications,
    GetThreeDSecureAuthenticationsAuthentication,
    PostThreeDSecureAuthenticationsAuthenticationCancel,
    PostThreeDSecureAuthenticationsAuthenticationSubmit,
  };
});
