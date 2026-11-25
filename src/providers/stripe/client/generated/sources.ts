// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import {
  Stripesource,
  Stripesource_mandate_notification,
  Stripesource_transaction,
} from "./models/sources.js";

export type PostSourcesInput = {
  readonly amount?: number;
  readonly currency?: string;
  readonly customer?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly flow?: "code_verification" | "none" | "receiver" | "redirect";
  readonly mandate?: {
    readonly acceptance?: {
      readonly date?: number;
      readonly ip?: string;
      readonly offline?: { readonly contact_email: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly online?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly status: "accepted" | "pending" | "refused" | "revoked";
      readonly type?: "offline" | "online";
      readonly user_agent?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly amount?: number | "";
    readonly currency?: string;
    readonly interval?: "one_time" | "scheduled" | "variable";
    readonly notification_method?:
      | "deprecated_none"
      | "email"
      | "manual"
      | "none"
      | "stripe_email";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly original_source?: string;
  readonly owner?: {
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
  readonly receiver?: {
    readonly refund_attributes_method?: "email" | "manual" | "none";
  } & { readonly [x: string]: Schema.Json };
  readonly redirect?: { readonly return_url: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly source_order?: {
    readonly items?: ReadonlyArray<
      {
        readonly amount?: number;
        readonly currency?: string;
        readonly description?: string;
        readonly parent?: string;
        readonly quantity?: number;
        readonly type?: "discount" | "shipping" | "sku" | "tax";
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly shipping?: {
      readonly address: {
        readonly city?: string;
        readonly country?: string;
        readonly line1: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly carrier?: string;
      readonly name?: string;
      readonly phone?: string;
      readonly tracking_number?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly statement_descriptor?: string;
  readonly token?: string;
  readonly type?: string;
  readonly usage?: "reusable" | "single_use";
};
export type PostSourcesOutput = Stripesource;
export type PostSourcesError = Stripeerror;
export type GetSourcesSourceInput = {
  readonly client_secret?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly source: string;
};
export type GetSourcesSourceOutput = Stripesource;
export type GetSourcesSourceError = Stripeerror;
export type PostSourcesSourceInput = {
  readonly amount?: number;
  readonly expand?: ReadonlyArray<string>;
  readonly mandate?: {
    readonly acceptance?: {
      readonly date?: number;
      readonly ip?: string;
      readonly offline?: { readonly contact_email: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly online?: {
        readonly date?: number;
        readonly ip?: string;
        readonly user_agent?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly status: "accepted" | "pending" | "refused" | "revoked";
      readonly type?: "offline" | "online";
      readonly user_agent?: string;
    } & { readonly [x: string]: Schema.Json };
    readonly amount?: number | "";
    readonly currency?: string;
    readonly interval?: "one_time" | "scheduled" | "variable";
    readonly notification_method?:
      | "deprecated_none"
      | "email"
      | "manual"
      | "none"
      | "stripe_email";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly owner?: {
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
  readonly source_order?: {
    readonly items?: ReadonlyArray<
      {
        readonly amount?: number;
        readonly currency?: string;
        readonly description?: string;
        readonly parent?: string;
        readonly quantity?: number;
        readonly type?: "discount" | "shipping" | "sku" | "tax";
      } & { readonly [x: string]: Schema.Json }
    >;
    readonly shipping?: {
      readonly address: {
        readonly city?: string;
        readonly country?: string;
        readonly line1: string;
        readonly line2?: string;
        readonly postal_code?: string;
        readonly state?: string;
      } & { readonly [x: string]: Schema.Json };
      readonly carrier?: string;
      readonly name?: string;
      readonly phone?: string;
      readonly tracking_number?: string;
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly source: string;
};
export type PostSourcesSourceOutput = Stripesource;
export type PostSourcesSourceError = Stripeerror;
export type GetSourcesSourceMandateNotificationsMandateNotificationInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly mandate_notification: string;
  readonly source: string;
};
export type GetSourcesSourceMandateNotificationsMandateNotificationOutput =
  Stripesource_mandate_notification;
export type GetSourcesSourceMandateNotificationsMandateNotificationError =
  Stripeerror;
export type GetSourcesSourceSourceTransactionsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly source: string;
  readonly starting_after?: string;
};
export type GetSourcesSourceSourceTransactionsOutput = {
  readonly data: ReadonlyArray<Stripesource_transaction>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetSourcesSourceSourceTransactionsError = Stripeerror;
export type GetSourcesSourceSourceTransactionsSourceTransactionInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly source: string;
  readonly source_transaction: string;
};
export type GetSourcesSourceSourceTransactionsSourceTransactionOutput =
  Stripesource_transaction;
export type GetSourcesSourceSourceTransactionsSourceTransactionError =
  Stripeerror;
export type PostSourcesSourceVerifyInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly values: ReadonlyArray<string>;
  readonly source: string;
};
export type PostSourcesSourceVerifyOutput = Stripesource;
export type PostSourcesSourceVerifyError = Stripeerror;

export const PostSourcesInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Amount associated with the source. This is the amount for which the source will be chargeable once ready. Required for `single_use` sources. Not supported for `receiver` type sources, where charge amount may not be specified until funds land.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  currency: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) associated with the source. This is the currency for which the source will be chargeable once ready.",
      format: "currency",
    }),
  ),
  customer: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The `Customer` to whom the original source is attached to. Must be set when the original source is not a `Source` (e.g., `Card`).",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
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
  flow: Schema.optionalKey(
    Schema.Literals([
      "code_verification",
      "none",
      "receiver",
      "redirect",
    ]).annotate({
      description:
        "The authentication `flow` of the source to create. `flow` is one of `redirect`, `receiver`, `code_verification`, `none`. It is generally inferred unless a type supports multiple flows.",
    }),
  ),
  mandate: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acceptance: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              date: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              ip: Schema.optionalKey(Schema.String),
              offline: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    contact_email: Schema.String.check(
                      Schema.isMaxCodePoints(800).annotate({
                        expected: "a string with at most 800 code points",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_offline_acceptance_params" }),
              ),
              online: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    ip: Schema.optionalKey(Schema.String),
                    user_agent: Schema.optionalKey(
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
                ).annotate({ title: "mandate_online_acceptance_params" }),
              ),
              status: Schema.Literals([
                "accepted",
                "pending",
                "refused",
                "revoked",
              ]),
              type: Schema.optionalKey(Schema.Literals(["offline", "online"])),
              user_agent: Schema.optionalKey(
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
          ).annotate({ title: "mandate_acceptance_params" }),
        ),
        amount: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
        currency: Schema.optionalKey(
          Schema.String.annotate({ format: "currency" }),
        ),
        interval: Schema.optionalKey(
          Schema.Literals(["one_time", "scheduled", "variable"]),
        ),
        notification_method: Schema.optionalKey(
          Schema.Literals([
            "deprecated_none",
            "email",
            "manual",
            "none",
            "stripe_email",
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
      title: "mandate_params",
      description:
        "Information about a mandate possibility attached to a source object (generally for bank debits) as well as its acceptance status.",
    }),
  ),
  metadata: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
  original_source: Schema.optionalKey(
    Schema.String.annotate({ description: "The source to share." }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
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
          ).annotate({ title: "source_address" }),
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
        phone: Schema.optionalKey(
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
      title: "owner",
      description:
        "Information about the owner of the payment instrument that may be used or required by particular source types.",
    }),
  ),
  receiver: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        refund_attributes_method: Schema.optionalKey(
          Schema.Literals(["email", "manual", "none"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "receiver_params",
      description:
        "Optional parameters for the receiver flow. Can be set only if the source is a receiver (`flow` is `receiver`).",
    }),
  ),
  redirect: Schema.optionalKey(
    Schema.StructWithRest(Schema.Struct({ return_url: Schema.String }), [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ]).annotate({
      title: "redirect_params",
      description:
        "Parameters required for the redirect flow. Required if the source is authenticated by a redirect (`flow` is `redirect`).",
    }),
  ),
  source_order: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        items: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.optionalKey(Schema.Int),
                currency: Schema.optionalKey(
                  Schema.String.annotate({ format: "currency" }),
                ),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(1000).annotate({
                      expected: "a string with at most 1000 code points",
                    }),
                  ),
                ),
                parent: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                quantity: Schema.optionalKey(Schema.Int),
                type: Schema.optionalKey(
                  Schema.Literals(["discount", "shipping", "sku", "tax"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "order_item_specs" }),
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
                  line1: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
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
              ).annotate({ title: "address" }),
              carrier: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
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
          ).annotate({ title: "order_shipping" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "shallow_order_specs",
      description:
        "Information about the items and shipping associated with the source. Required for transactional credit (for example Klarna) sources before you can charge it.",
    }),
  ),
  statement_descriptor: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An arbitrary string to be displayed on your customer's statement. As an example, if your website is `RunClub` and the item you're charging for is a race ticket, you may want to specify a `statement_descriptor` of `RunClub 5K race ticket.` While many payment types will display this information, some may not display it at all.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  token: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An optional token used to create the source. When passed, token properties will override source parameters.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  type: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The `type` of the source to create. Required unless `customer` and `original_source` are specified (see the [Cloning card Sources](https://docs.stripe.com/sources/connect#cloning-card-sources) guide)",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
  usage: Schema.optionalKey(Schema.Literals(["reusable", "single_use"])),
});
export const PostSourcesOutput = Stripesource;
export const PostSourcesError = Stripeerror;
export const GetSourcesSourceInput = Schema.Struct({
  client_secret: Schema.optionalKey(
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
  source: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetSourcesSourceOutput = Stripesource;
export const GetSourcesSourceError = Stripeerror;
export const PostSourcesSourceInput = Schema.Struct({
  amount: Schema.optionalKey(
    Schema.Number.annotate({
      description: "Amount associated with the source.",
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
      description: "Specifies which fields in the response should be expanded.",
    }),
  ),
  mandate: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        acceptance: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              date: Schema.optionalKey(
                Schema.Number.annotate({ format: "unix-time" }).check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                ),
              ),
              ip: Schema.optionalKey(Schema.String),
              offline: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    contact_email: Schema.String.check(
                      Schema.isMaxCodePoints(800).annotate({
                        expected: "a string with at most 800 code points",
                      }),
                    ),
                  }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "mandate_offline_acceptance_params" }),
              ),
              online: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({
                    date: Schema.optionalKey(
                      Schema.Number.annotate({ format: "unix-time" }).check(
                        Schema.isInt().annotate({ expected: "an integer" }),
                      ),
                    ),
                    ip: Schema.optionalKey(Schema.String),
                    user_agent: Schema.optionalKey(
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
                ).annotate({ title: "mandate_online_acceptance_params" }),
              ),
              status: Schema.Literals([
                "accepted",
                "pending",
                "refused",
                "revoked",
              ]),
              type: Schema.optionalKey(Schema.Literals(["offline", "online"])),
              user_agent: Schema.optionalKey(
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
          ).annotate({ title: "mandate_acceptance_params" }),
        ),
        amount: Schema.optionalKey(
          Schema.Union([Schema.Int, Schema.Literal("")]),
        ),
        currency: Schema.optionalKey(
          Schema.String.annotate({ format: "currency" }),
        ),
        interval: Schema.optionalKey(
          Schema.Literals(["one_time", "scheduled", "variable"]),
        ),
        notification_method: Schema.optionalKey(
          Schema.Literals([
            "deprecated_none",
            "email",
            "manual",
            "none",
            "stripe_email",
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
      title: "mandate_params",
      description:
        "Information about a mandate possibility attached to a source object (generally for bank debits) as well as its acceptance status.",
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
  owner: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
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
          ).annotate({ title: "source_address" }),
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
        phone: Schema.optionalKey(
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
      title: "owner",
      description:
        "Information about the owner of the payment instrument that may be used or required by particular source types.",
    }),
  ),
  source_order: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        items: Schema.optionalKey(
          Schema.Array(
            Schema.StructWithRest(
              Schema.Struct({
                amount: Schema.optionalKey(Schema.Int),
                currency: Schema.optionalKey(
                  Schema.String.annotate({ format: "currency" }),
                ),
                description: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(1000).annotate({
                      expected: "a string with at most 1000 code points",
                    }),
                  ),
                ),
                parent: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                quantity: Schema.optionalKey(Schema.Int),
                type: Schema.optionalKey(
                  Schema.Literals(["discount", "shipping", "sku", "tax"]),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "order_item_specs" }),
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
                  line1: Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
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
              ).annotate({ title: "address" }),
              carrier: Schema.optionalKey(
                Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
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
          ).annotate({ title: "order_shipping" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "order_params",
      description:
        "Information about the items and shipping associated with the source. Required for transactional credit (for example Klarna) sources before you can charge it.",
    }),
  ),
  source: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSourcesSourceOutput = Stripesource;
export const PostSourcesSourceError = Stripeerror;
export const GetSourcesSourceMandateNotificationsMandateNotificationInput =
  Schema.Struct({
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    ),
    mandate_notification: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    source: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetSourcesSourceMandateNotificationsMandateNotificationOutput =
  Stripesource_mandate_notification;
export const GetSourcesSourceMandateNotificationsMandateNotificationError =
  Stripeerror;
export const GetSourcesSourceSourceTransactionsInput = Schema.Struct({
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
  source: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetSourcesSourceSourceTransactionsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripesource_transaction),
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
).annotate({ title: "ApmsSourcesSourceTransactionList", description: "" });
export const GetSourcesSourceSourceTransactionsError = Stripeerror;
export const GetSourcesSourceSourceTransactionsSourceTransactionInput =
  Schema.Struct({
    expand: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
    ),
    source: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    source_transaction: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetSourcesSourceSourceTransactionsSourceTransactionOutput =
  Stripesource_transaction;
export const GetSourcesSourceSourceTransactionsSourceTransactionError =
  Stripeerror;
export const PostSourcesSourceVerifyInput = Schema.Struct({
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
  values: Schema.Array(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ).annotate({ description: "The values needed to verify the source." }),
  source: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostSourcesSourceVerifyOutput = Stripesource;
export const PostSourcesSourceVerifyError = Stripeerror;
/**
 * The PostSourcesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSourcesOperation: StripeOperation & {
  readonly input: typeof PostSourcesInput;
  readonly output: typeof PostSourcesOutput;
  readonly error: typeof PostSourcesError;
} = {
  name: "PostSources",
  method: "POST",
  path: "/v1/sources",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSourcesInput,
  output: PostSourcesOutput,
  error: PostSourcesError,
};
/**
 * The GetSourcesSourceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSourcesSourceOperation: StripeOperation & {
  readonly input: typeof GetSourcesSourceInput;
  readonly output: typeof GetSourcesSourceOutput;
  readonly error: typeof GetSourcesSourceError;
} = {
  name: "GetSourcesSource",
  method: "GET",
  path: "/v1/sources/{source}",
  pathParameters: ["source"],
  queryParameters: ["client_secret", "expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSourcesSourceInput,
  output: GetSourcesSourceOutput,
  error: GetSourcesSourceError,
};
/**
 * The PostSourcesSourceOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSourcesSourceOperation: StripeOperation & {
  readonly input: typeof PostSourcesSourceInput;
  readonly output: typeof PostSourcesSourceOutput;
  readonly error: typeof PostSourcesSourceError;
} = {
  name: "PostSourcesSource",
  method: "POST",
  path: "/v1/sources/{source}",
  pathParameters: ["source"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSourcesSourceInput,
  output: PostSourcesSourceOutput,
  error: PostSourcesSourceError,
};
/**
 * The GetSourcesSourceMandateNotificationsMandateNotificationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSourcesSourceMandateNotificationsMandateNotificationOperation: StripeOperation & {
  readonly input: typeof GetSourcesSourceMandateNotificationsMandateNotificationInput;
  readonly output: typeof GetSourcesSourceMandateNotificationsMandateNotificationOutput;
  readonly error: typeof GetSourcesSourceMandateNotificationsMandateNotificationError;
} = {
  name: "GetSourcesSourceMandateNotificationsMandateNotification",
  method: "GET",
  path: "/v1/sources/{source}/mandate_notifications/{mandate_notification}",
  pathParameters: ["mandate_notification", "source"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSourcesSourceMandateNotificationsMandateNotificationInput,
  output: GetSourcesSourceMandateNotificationsMandateNotificationOutput,
  error: GetSourcesSourceMandateNotificationsMandateNotificationError,
};
/**
 * The GetSourcesSourceSourceTransactionsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSourcesSourceSourceTransactionsOperation: StripeOperation & {
  readonly input: typeof GetSourcesSourceSourceTransactionsInput;
  readonly output: typeof GetSourcesSourceSourceTransactionsOutput;
  readonly error: typeof GetSourcesSourceSourceTransactionsError;
} = {
  name: "GetSourcesSourceSourceTransactions",
  method: "GET",
  path: "/v1/sources/{source}/source_transactions",
  pathParameters: ["source"],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSourcesSourceSourceTransactionsInput,
  output: GetSourcesSourceSourceTransactionsOutput,
  error: GetSourcesSourceSourceTransactionsError,
};
/**
 * The GetSourcesSourceSourceTransactionsSourceTransactionOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetSourcesSourceSourceTransactionsSourceTransactionOperation: StripeOperation & {
  readonly input: typeof GetSourcesSourceSourceTransactionsSourceTransactionInput;
  readonly output: typeof GetSourcesSourceSourceTransactionsSourceTransactionOutput;
  readonly error: typeof GetSourcesSourceSourceTransactionsSourceTransactionError;
} = {
  name: "GetSourcesSourceSourceTransactionsSourceTransaction",
  method: "GET",
  path: "/v1/sources/{source}/source_transactions/{source_transaction}",
  pathParameters: ["source", "source_transaction"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetSourcesSourceSourceTransactionsSourceTransactionInput,
  output: GetSourcesSourceSourceTransactionsSourceTransactionOutput,
  error: GetSourcesSourceSourceTransactionsSourceTransactionError,
};
/**
 * The PostSourcesSourceVerifyOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostSourcesSourceVerifyOperation: StripeOperation & {
  readonly input: typeof PostSourcesSourceVerifyInput;
  readonly output: typeof PostSourcesSourceVerifyOutput;
  readonly error: typeof PostSourcesSourceVerifyError;
} = {
  name: "PostSourcesSourceVerify",
  method: "POST",
  path: "/v1/sources/{source}/verify",
  pathParameters: ["source"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostSourcesSourceVerifyInput,
  output: PostSourcesSourceVerifyOutput,
  error: PostSourcesSourceVerifyError,
};
/**
 * The makeSourcesClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeSourcesClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The PostSources function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSources = Effect.fn("sources.PostSources")(function* (
    input: PostSourcesInput,
  ) {
    const response: PostSourcesOutput = yield* client.invoke(
      PostSourcesOperation,
      input,
    );
    return response;
  });
  /**
   * The GetSourcesSource function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSourcesSource = Effect.fn("sources.GetSourcesSource")(function* (
    input: GetSourcesSourceInput,
  ) {
    const response: GetSourcesSourceOutput = yield* client.invoke(
      GetSourcesSourceOperation,
      input,
    );
    return response;
  });
  /**
   * The PostSourcesSource function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSourcesSource = Effect.fn("sources.PostSourcesSource")(function* (
    input: PostSourcesSourceInput,
  ) {
    const response: PostSourcesSourceOutput = yield* client.invoke(
      PostSourcesSourceOperation,
      input,
    );
    return response;
  });
  /**
   * The GetSourcesSourceMandateNotificationsMandateNotification function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSourcesSourceMandateNotificationsMandateNotification = Effect.fn(
    "sources.GetSourcesSourceMandateNotificationsMandateNotification",
  )(function* (
    input: GetSourcesSourceMandateNotificationsMandateNotificationInput,
  ) {
    const response: GetSourcesSourceMandateNotificationsMandateNotificationOutput =
      yield* client.invoke(
        GetSourcesSourceMandateNotificationsMandateNotificationOperation,
        input,
      );
    return response;
  });
  /**
   * The GetSourcesSourceSourceTransactions function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSourcesSourceSourceTransactions = Effect.fn(
    "sources.GetSourcesSourceSourceTransactions",
  )(function* (input: GetSourcesSourceSourceTransactionsInput) {
    const response: GetSourcesSourceSourceTransactionsOutput =
      yield* client.invoke(GetSourcesSourceSourceTransactionsOperation, input);
    return response;
  });
  /**
   * The GetSourcesSourceSourceTransactionsSourceTransaction function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetSourcesSourceSourceTransactionsSourceTransaction = Effect.fn(
    "sources.GetSourcesSourceSourceTransactionsSourceTransaction",
  )(function* (
    input: GetSourcesSourceSourceTransactionsSourceTransactionInput,
  ) {
    const response: GetSourcesSourceSourceTransactionsSourceTransactionOutput =
      yield* client.invoke(
        GetSourcesSourceSourceTransactionsSourceTransactionOperation,
        input,
      );
    return response;
  });
  /**
   * The PostSourcesSourceVerify function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostSourcesSourceVerify = Effect.fn("sources.PostSourcesSourceVerify")(
    function* (input: PostSourcesSourceVerifyInput) {
      const response: PostSourcesSourceVerifyOutput = yield* client.invoke(
        PostSourcesSourceVerifyOperation,
        input,
      );
      return response;
    },
  );
  return {
    PostSources,
    GetSourcesSource,
    PostSourcesSource,
    GetSourcesSourceMandateNotificationsMandateNotification,
    GetSourcesSourceSourceTransactions,
    GetSourcesSourceSourceTransactionsSourceTransaction,
    PostSourcesSourceVerify,
  };
});
