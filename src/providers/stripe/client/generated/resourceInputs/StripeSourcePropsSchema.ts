// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeSourceProps = {
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

export const StripeSourceResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "stripe",
  service: "billing",
  resource: "source",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/SourceId"],
});
export const StripeSourcePropsSchema = annotateResourceSchema(
  Schema.Struct({
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
        description:
          "Specifies which fields in the response should be expanded.",
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
                type: Schema.optionalKey(
                  Schema.Literals(["offline", "online"]),
                ),
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
  }),
  StripeSourceResourceSchema,
);
