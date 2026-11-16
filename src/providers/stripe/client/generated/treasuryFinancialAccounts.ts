// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror } from "./models/common.js";
import {
  Stripetreasury_financial_account,
  Stripetreasury_financial_account_features,
} from "./models/treasury.js";

export type GetTreasuryFinancialAccountsInput = {
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
  readonly status?: "closed" | "open";
};
export type GetTreasuryFinancialAccountsOutput = {
  readonly data: ReadonlyArray<Stripetreasury_financial_account>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTreasuryFinancialAccountsError = Stripeerror;
export type PostTreasuryFinancialAccountsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly features?: {
    readonly card_issuing?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly deposit_insurance?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_addresses?: {
      readonly aba?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly inbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly intra_stripe_flows?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly outbound_payments?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly outbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly nickname?: string | "";
  readonly platform_restrictions?: {
    readonly inbound_flows?: "restricted" | "unrestricted";
    readonly outbound_flows?: "restricted" | "unrestricted";
  } & { readonly [x: string]: Schema.Json };
  readonly supported_currencies: ReadonlyArray<string>;
};
export type PostTreasuryFinancialAccountsOutput =
  Stripetreasury_financial_account;
export type PostTreasuryFinancialAccountsError = Stripeerror;
export type GetTreasuryFinancialAccountsFinancialAccountInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
};
export type GetTreasuryFinancialAccountsFinancialAccountOutput =
  Stripetreasury_financial_account;
export type GetTreasuryFinancialAccountsFinancialAccountError = Stripeerror;
export type PostTreasuryFinancialAccountsFinancialAccountInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly features?: {
    readonly card_issuing?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly deposit_insurance?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly financial_addresses?: {
      readonly aba?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly inbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly intra_stripe_flows?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly outbound_payments?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly outbound_transfers?: {
      readonly ach?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
      readonly us_domestic_wire?: { readonly requested: boolean } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly forwarding_settings?: {
    readonly financial_account?: string;
    readonly payment_method?: string;
    readonly type: "financial_account" | "payment_method";
  } & { readonly [x: string]: Schema.Json };
  readonly metadata?: { readonly [x: string]: string };
  readonly nickname?: string | "";
  readonly platform_restrictions?: {
    readonly inbound_flows?: "restricted" | "unrestricted";
    readonly outbound_flows?: "restricted" | "unrestricted";
  } & { readonly [x: string]: Schema.Json };
  readonly financial_account: string;
};
export type PostTreasuryFinancialAccountsFinancialAccountOutput =
  Stripetreasury_financial_account;
export type PostTreasuryFinancialAccountsFinancialAccountError = Stripeerror;
export type PostTreasuryFinancialAccountsFinancialAccountCloseInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly forwarding_settings?: {
    readonly financial_account?: string;
    readonly payment_method?: string;
    readonly type: "financial_account" | "payment_method";
  } & { readonly [x: string]: Schema.Json };
  readonly financial_account: string;
};
export type PostTreasuryFinancialAccountsFinancialAccountCloseOutput =
  Stripetreasury_financial_account;
export type PostTreasuryFinancialAccountsFinancialAccountCloseError =
  Stripeerror;
export type GetTreasuryFinancialAccountsFinancialAccountFeaturesInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly financial_account: string;
};
export type GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  Stripetreasury_financial_account_features;
export type GetTreasuryFinancialAccountsFinancialAccountFeaturesError =
  Stripeerror;
export type PostTreasuryFinancialAccountsFinancialAccountFeaturesInput = {
  readonly card_issuing?: { readonly requested: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly deposit_insurance?: { readonly requested: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly expand?: ReadonlyArray<string>;
  readonly financial_addresses?: {
    readonly aba?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly inbound_transfers?: {
    readonly ach?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly intra_stripe_flows?: { readonly requested: boolean } & {
    readonly [x: string]: Schema.Json;
  };
  readonly outbound_payments?: {
    readonly ach?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly us_domestic_wire?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly outbound_transfers?: {
    readonly ach?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
    readonly us_domestic_wire?: { readonly requested: boolean } & {
      readonly [x: string]: Schema.Json;
    };
  } & { readonly [x: string]: Schema.Json };
  readonly financial_account: string;
};
export type PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  Stripetreasury_financial_account_features;
export type PostTreasuryFinancialAccountsFinancialAccountFeaturesError =
  Stripeerror;

export const GetTreasuryFinancialAccountsInput = Schema.Struct({
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
  status: Schema.optionalKey(Schema.Literals(["closed", "open"])),
});
export const GetTreasuryFinancialAccountsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetreasury_financial_account),
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
          new globalThis.RegExp("^\\/v1\\/treasury\\/financial_accounts", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/treasury\\/financial_accounts",
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
  title: "TreasuryFinancialAccountsResourceFinancialAccountList",
  description: "",
});
export const GetTreasuryFinancialAccountsError = Stripeerror;
export const PostTreasuryFinancialAccountsInput = Schema.Struct({
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
  features: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        card_issuing: Schema.optionalKey(
          Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ]).annotate({ title: "access" }),
        ),
        deposit_insurance: Schema.optionalKey(
          Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ]).annotate({ title: "access" }),
        ),
        financial_addresses: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              aba: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "aba_access" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "financial_addresses" }),
        ),
        inbound_transfers: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              ach: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "access_with_ach_details_inbound" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "inbound_transfers" }),
        ),
        intra_stripe_flows: Schema.optionalKey(
          Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ]).annotate({ title: "access" }),
        ),
        outbound_payments: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              ach: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "access_with_ach_details_outbound" }),
              ),
              us_domestic_wire: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "access" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "outbound_payments" }),
        ),
        outbound_transfers: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              ach: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "access_with_ach_details_outbound" }),
              ),
              us_domestic_wire: Schema.optionalKey(
                Schema.StructWithRest(
                  Schema.Struct({ requested: Schema.Boolean }),
                  [
                    Schema.Record(
                      Schema.String,
                      Schema.Json.annotate({ expected: "JSON value" }),
                    ),
                  ],
                ).annotate({ title: "access" }),
              ),
            }),
            [
              Schema.Record(
                Schema.String,
                Schema.Json.annotate({ expected: "JSON value" }),
              ),
            ],
          ).annotate({ title: "outbound_transfers" }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "feature_access",
      description:
        "Encodes whether a FinancialAccount has access to a particular feature. Stripe or the platform can control features via the requested field.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  nickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({ description: "The nickname for the FinancialAccount." }),
  ),
  platform_restrictions: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        inbound_flows: Schema.optionalKey(
          Schema.Literals(["restricted", "unrestricted"]),
        ),
        outbound_flows: Schema.optionalKey(
          Schema.Literals(["restricted", "unrestricted"]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "platform_restrictions",
      description:
        "The set of functionalities that the platform can restrict on the FinancialAccount.",
    }),
  ),
  supported_currencies: Schema.Array(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ).annotate({
    description: "The currencies the FinancialAccount can hold a balance in.",
  }),
});
export const PostTreasuryFinancialAccountsOutput =
  Stripetreasury_financial_account;
export const PostTreasuryFinancialAccountsError = Stripeerror;
export const GetTreasuryFinancialAccountsFinancialAccountInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  financial_account: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTreasuryFinancialAccountsFinancialAccountOutput =
  Stripetreasury_financial_account;
export const GetTreasuryFinancialAccountsFinancialAccountError = Stripeerror;
export const PostTreasuryFinancialAccountsFinancialAccountInput = Schema.Struct(
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
    features: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          card_issuing: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          deposit_insurance: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          financial_addresses: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                aba: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "aba_access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "financial_addresses" }),
          ),
          inbound_transfers: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_inbound" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "inbound_transfers" }),
          ),
          intra_stripe_flows: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
          outbound_payments: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_outbound" }),
                ),
                us_domestic_wire: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "outbound_payments" }),
          ),
          outbound_transfers: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ach: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access_with_ach_details_outbound" }),
                ),
                us_domestic_wire: Schema.optionalKey(
                  Schema.StructWithRest(
                    Schema.Struct({ requested: Schema.Boolean }),
                    [
                      Schema.Record(
                        Schema.String,
                        Schema.Json.annotate({ expected: "JSON value" }),
                      ),
                    ],
                  ).annotate({ title: "access" }),
                ),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "outbound_transfers" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "feature_access",
        description:
          "Encodes whether a FinancialAccount has access to a particular feature, with a status enum and associated `status_details`. Stripe or the platform may control features via the requested field.",
      }),
    ),
    forwarding_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          financial_account: Schema.optionalKey(Schema.String),
          payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          type: Schema.Literals(["financial_account", "payment_method"]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "forwarding_settings",
        description:
          "A different bank account where funds can be deposited/debited in order to get the closing FA's balance to $0",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Record(Schema.String, Schema.String).annotate({
        description:
          "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      }),
    ),
    nickname: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Literal(""),
      ]).annotate({ description: "The nickname for the FinancialAccount." }),
    ),
    platform_restrictions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          inbound_flows: Schema.optionalKey(
            Schema.Literals(["restricted", "unrestricted"]),
          ),
          outbound_flows: Schema.optionalKey(
            Schema.Literals(["restricted", "unrestricted"]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "platform_restrictions",
        description:
          "The set of functionalities that the platform can restrict on the FinancialAccount.",
      }),
    ),
    financial_account: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  },
);
export const PostTreasuryFinancialAccountsFinancialAccountOutput =
  Stripetreasury_financial_account;
export const PostTreasuryFinancialAccountsFinancialAccountError = Stripeerror;
export const PostTreasuryFinancialAccountsFinancialAccountCloseInput =
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
    forwarding_settings: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          financial_account: Schema.optionalKey(Schema.String),
          payment_method: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          type: Schema.Literals(["financial_account", "payment_method"]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "forwarding_settings",
        description:
          "A different bank account where funds can be deposited/debited in order to get the closing FA's balance to $0",
      }),
    ),
    financial_account: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostTreasuryFinancialAccountsFinancialAccountCloseOutput =
  Stripetreasury_financial_account;
export const PostTreasuryFinancialAccountsFinancialAccountCloseError =
  Stripeerror;
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesInput =
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
    financial_account: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  Stripetreasury_financial_account_features;
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesError =
  Stripeerror;
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesInput =
  Schema.Struct({
    card_issuing: Schema.optionalKey(
      Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({
        title: "access",
        description:
          "Encodes the FinancialAccount's ability to be used with the Issuing product, including attaching cards to and drawing funds from the FinancialAccount.",
      }),
    ),
    deposit_insurance: Schema.optionalKey(
      Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({
        title: "access",
        description:
          "Represents whether this FinancialAccount is eligible for deposit insurance. Various factors determine the insurance amount.",
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
    financial_addresses: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          aba: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "aba_access" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "financial_addresses",
        description:
          "Contains Features that add FinancialAddresses to the FinancialAccount.",
      }),
    ),
    inbound_transfers: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access_with_ach_details_inbound" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "inbound_transfers",
        description:
          "Contains settings related to adding funds to a FinancialAccount from another Account with the same owner.",
      }),
    ),
    intra_stripe_flows: Schema.optionalKey(
      Schema.StructWithRest(Schema.Struct({ requested: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({
        title: "access",
        description:
          "Represents the ability for the FinancialAccount to send money to, or receive money from other FinancialAccounts (for example, via OutboundPayment).",
      }),
    ),
    outbound_payments: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access_with_ach_details_outbound" }),
          ),
          us_domestic_wire: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "outbound_payments",
        description:
          "Includes Features related to initiating money movement out of the FinancialAccount to someone else's bucket of money.",
      }),
    ),
    outbound_transfers: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access_with_ach_details_outbound" }),
          ),
          us_domestic_wire: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({ requested: Schema.Boolean }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "access" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "outbound_transfers",
        description:
          "Contains a Feature and settings related to moving money out of the FinancialAccount into another Account with the same owner.",
      }),
    ),
    financial_account: Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  });
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  Stripetreasury_financial_account_features;
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesError =
  Stripeerror;
/**
 * The GetTreasuryFinancialAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryFinancialAccountsOperation: StripeOperation & {
  readonly input: typeof GetTreasuryFinancialAccountsInput;
  readonly output: typeof GetTreasuryFinancialAccountsOutput;
  readonly error: typeof GetTreasuryFinancialAccountsError;
} = {
  name: "GetTreasuryFinancialAccounts",
  method: "GET",
  path: "/v1/treasury/financial_accounts",
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
  input: GetTreasuryFinancialAccountsInput,
  output: GetTreasuryFinancialAccountsOutput,
  error: GetTreasuryFinancialAccountsError,
};
/**
 * The PostTreasuryFinancialAccountsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryFinancialAccountsOperation: StripeOperation & {
  readonly input: typeof PostTreasuryFinancialAccountsInput;
  readonly output: typeof PostTreasuryFinancialAccountsOutput;
  readonly error: typeof PostTreasuryFinancialAccountsError;
} = {
  name: "PostTreasuryFinancialAccounts",
  method: "POST",
  path: "/v1/treasury/financial_accounts",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryFinancialAccountsInput,
  output: PostTreasuryFinancialAccountsOutput,
  error: PostTreasuryFinancialAccountsError,
};
/**
 * The GetTreasuryFinancialAccountsFinancialAccountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryFinancialAccountsFinancialAccountOperation: StripeOperation & {
  readonly input: typeof GetTreasuryFinancialAccountsFinancialAccountInput;
  readonly output: typeof GetTreasuryFinancialAccountsFinancialAccountOutput;
  readonly error: typeof GetTreasuryFinancialAccountsFinancialAccountError;
} = {
  name: "GetTreasuryFinancialAccountsFinancialAccount",
  method: "GET",
  path: "/v1/treasury/financial_accounts/{financial_account}",
  pathParameters: ["financial_account"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryFinancialAccountsFinancialAccountInput,
  output: GetTreasuryFinancialAccountsFinancialAccountOutput,
  error: GetTreasuryFinancialAccountsFinancialAccountError,
};
/**
 * The PostTreasuryFinancialAccountsFinancialAccountOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryFinancialAccountsFinancialAccountOperation: StripeOperation & {
  readonly input: typeof PostTreasuryFinancialAccountsFinancialAccountInput;
  readonly output: typeof PostTreasuryFinancialAccountsFinancialAccountOutput;
  readonly error: typeof PostTreasuryFinancialAccountsFinancialAccountError;
} = {
  name: "PostTreasuryFinancialAccountsFinancialAccount",
  method: "POST",
  path: "/v1/treasury/financial_accounts/{financial_account}",
  pathParameters: ["financial_account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryFinancialAccountsFinancialAccountInput,
  output: PostTreasuryFinancialAccountsFinancialAccountOutput,
  error: PostTreasuryFinancialAccountsFinancialAccountError,
};
/**
 * The PostTreasuryFinancialAccountsFinancialAccountCloseOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryFinancialAccountsFinancialAccountCloseOperation: StripeOperation & {
  readonly input: typeof PostTreasuryFinancialAccountsFinancialAccountCloseInput;
  readonly output: typeof PostTreasuryFinancialAccountsFinancialAccountCloseOutput;
  readonly error: typeof PostTreasuryFinancialAccountsFinancialAccountCloseError;
} = {
  name: "PostTreasuryFinancialAccountsFinancialAccountClose",
  method: "POST",
  path: "/v1/treasury/financial_accounts/{financial_account}/close",
  pathParameters: ["financial_account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryFinancialAccountsFinancialAccountCloseInput,
  output: PostTreasuryFinancialAccountsFinancialAccountCloseOutput,
  error: PostTreasuryFinancialAccountsFinancialAccountCloseError,
};
/**
 * The GetTreasuryFinancialAccountsFinancialAccountFeaturesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesOperation: StripeOperation & {
  readonly input: typeof GetTreasuryFinancialAccountsFinancialAccountFeaturesInput;
  readonly output: typeof GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput;
  readonly error: typeof GetTreasuryFinancialAccountsFinancialAccountFeaturesError;
} = {
  name: "GetTreasuryFinancialAccountsFinancialAccountFeatures",
  method: "GET",
  path: "/v1/treasury/financial_accounts/{financial_account}/features",
  pathParameters: ["financial_account"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTreasuryFinancialAccountsFinancialAccountFeaturesInput,
  output: GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput,
  error: GetTreasuryFinancialAccountsFinancialAccountFeaturesError,
};
/**
 * The PostTreasuryFinancialAccountsFinancialAccountFeaturesOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesOperation: StripeOperation & {
  readonly input: typeof PostTreasuryFinancialAccountsFinancialAccountFeaturesInput;
  readonly output: typeof PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput;
  readonly error: typeof PostTreasuryFinancialAccountsFinancialAccountFeaturesError;
} = {
  name: "PostTreasuryFinancialAccountsFinancialAccountFeatures",
  method: "POST",
  path: "/v1/treasury/financial_accounts/{financial_account}/features",
  pathParameters: ["financial_account"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTreasuryFinancialAccountsFinancialAccountFeaturesInput,
  output: PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput,
  error: PostTreasuryFinancialAccountsFinancialAccountFeaturesError,
};
/**
 * The makeTreasuryFinancialAccountsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTreasuryFinancialAccountsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTreasuryFinancialAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryFinancialAccounts = Effect.fn(
    "treasuryFinancialAccounts.GetTreasuryFinancialAccounts",
  )(function* (input: GetTreasuryFinancialAccountsInput) {
    const response: GetTreasuryFinancialAccountsOutput = yield* client.invoke(
      GetTreasuryFinancialAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTreasuryFinancialAccounts function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryFinancialAccounts = Effect.fn(
    "treasuryFinancialAccounts.PostTreasuryFinancialAccounts",
  )(function* (input: PostTreasuryFinancialAccountsInput) {
    const response: PostTreasuryFinancialAccountsOutput = yield* client.invoke(
      PostTreasuryFinancialAccountsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTreasuryFinancialAccountsFinancialAccount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryFinancialAccountsFinancialAccount = Effect.fn(
    "treasuryFinancialAccounts.GetTreasuryFinancialAccountsFinancialAccount",
  )(function* (input: GetTreasuryFinancialAccountsFinancialAccountInput) {
    const response: GetTreasuryFinancialAccountsFinancialAccountOutput =
      yield* client.invoke(
        GetTreasuryFinancialAccountsFinancialAccountOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTreasuryFinancialAccountsFinancialAccount function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryFinancialAccountsFinancialAccount = Effect.fn(
    "treasuryFinancialAccounts.PostTreasuryFinancialAccountsFinancialAccount",
  )(function* (input: PostTreasuryFinancialAccountsFinancialAccountInput) {
    const response: PostTreasuryFinancialAccountsFinancialAccountOutput =
      yield* client.invoke(
        PostTreasuryFinancialAccountsFinancialAccountOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTreasuryFinancialAccountsFinancialAccountClose function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryFinancialAccountsFinancialAccountClose = Effect.fn(
    "treasuryFinancialAccounts.PostTreasuryFinancialAccountsFinancialAccountClose",
  )(function* (input: PostTreasuryFinancialAccountsFinancialAccountCloseInput) {
    const response: PostTreasuryFinancialAccountsFinancialAccountCloseOutput =
      yield* client.invoke(
        PostTreasuryFinancialAccountsFinancialAccountCloseOperation,
        input,
      );
    return response;
  });
  /**
   * The GetTreasuryFinancialAccountsFinancialAccountFeatures function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTreasuryFinancialAccountsFinancialAccountFeatures = Effect.fn(
    "treasuryFinancialAccounts.GetTreasuryFinancialAccountsFinancialAccountFeatures",
  )(function* (
    input: GetTreasuryFinancialAccountsFinancialAccountFeaturesInput,
  ) {
    const response: GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
      yield* client.invoke(
        GetTreasuryFinancialAccountsFinancialAccountFeaturesOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTreasuryFinancialAccountsFinancialAccountFeatures function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTreasuryFinancialAccountsFinancialAccountFeatures = Effect.fn(
    "treasuryFinancialAccounts.PostTreasuryFinancialAccountsFinancialAccountFeatures",
  )(function* (
    input: PostTreasuryFinancialAccountsFinancialAccountFeaturesInput,
  ) {
    const response: PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
      yield* client.invoke(
        PostTreasuryFinancialAccountsFinancialAccountFeaturesOperation,
        input,
      );
    return response;
  });
  return {
    GetTreasuryFinancialAccounts,
    PostTreasuryFinancialAccounts,
    GetTreasuryFinancialAccountsFinancialAccount,
    PostTreasuryFinancialAccountsFinancialAccount,
    PostTreasuryFinancialAccountsFinancialAccountClose,
    GetTreasuryFinancialAccountsFinancialAccountFeatures,
    PostTreasuryFinancialAccountsFinancialAccountFeatures,
  };
});
