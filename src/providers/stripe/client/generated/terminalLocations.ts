// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_terminal_location,
  Stripeerror,
  Stripeterminal_location,
} from "./models/common.js";

export type GetTerminalLocationsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetTerminalLocationsOutput = {
  readonly data: ReadonlyArray<Stripeterminal_location>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTerminalLocationsError = Stripeerror;
export type PostTerminalLocationsInput = {
  readonly address?: {
    readonly city?: string;
    readonly country: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kana?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kanji?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly configuration_overrides?: string;
  readonly display_name?: string;
  readonly display_name_kana?: string;
  readonly display_name_kanji?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly phone?: string;
};
export type PostTerminalLocationsOutput = Stripeterminal_location;
export type PostTerminalLocationsError = Stripeerror;
export type GetTerminalLocationsLocationInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly location: string;
};
export type GetTerminalLocationsLocationOutput =
  | Stripeterminal_location
  | Stripedeleted_terminal_location;
export type GetTerminalLocationsLocationError = Stripeerror;
export type PostTerminalLocationsLocationInput = {
  readonly address?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kana?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly address_kanji?: {
    readonly city?: string;
    readonly country?: string;
    readonly line1?: string;
    readonly line2?: string;
    readonly postal_code?: string;
    readonly state?: string;
    readonly town?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly configuration_overrides?: string | "";
  readonly display_name?: string | "";
  readonly display_name_kana?: string | "";
  readonly display_name_kanji?: string | "";
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly phone?: string | "";
  readonly location: string;
};
export type PostTerminalLocationsLocationOutput =
  | Stripeterminal_location
  | Stripedeleted_terminal_location;
export type PostTerminalLocationsLocationError = Stripeerror;
export type DeleteTerminalLocationsLocationInput = {
  readonly location: string;
};
export type DeleteTerminalLocationsLocationOutput =
  Stripedeleted_terminal_location;
export type DeleteTerminalLocationsLocationError = Stripeerror;

export const GetTerminalLocationsInput = Schema.Struct({
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
});
export const GetTerminalLocationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeterminal_location),
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
          new globalThis.RegExp("^\\/v1\\/terminal\\/locations", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/terminal\\/locations",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "TerminalLocationLocationList", description: "" });
export const GetTerminalLocationsError = Stripeerror;
export const PostTerminalLocationsInput = Schema.Struct({
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
        country: Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
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
    ).annotate({
      title: "create_location_address_param",
      description: "The full address of the location.",
    }),
  ),
  address_kana: Schema.optionalKey(
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
        town: Schema.optionalKey(
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
      title: "japan_address_kana_specs",
      description:
        "The Kana variation of the full address of the location (Japan only).",
    }),
  ),
  address_kanji: Schema.optionalKey(
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
        town: Schema.optionalKey(
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
      title: "japan_address_kanji_specs",
      description:
        "The Kanji variation of the full address of the location (Japan only).",
    }),
  ),
  configuration_overrides: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of a configuration that will be used to customize all readers in this location.",
    }).check(
      Schema.isMaxCodePoints(500).annotate({
        expected: "a string with at most 500 code points",
      }),
    ),
  ),
  display_name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A name for the location. Maximum length is 1000 characters.",
    }).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
  ),
  display_name_kana: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kana variation of the name for the location (Japan only). Maximum length is 1000 characters.",
    }).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
      }),
    ),
  ),
  display_name_kanji: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Kanji variation of the name for the location (Japan only). Maximum length is 1000 characters.",
    }).check(
      Schema.isMaxCodePoints(1000).annotate({
        expected: "a string with at most 1000 code points",
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
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  phone: Schema.optionalKey(
    Schema.String.annotate({
      description: "The phone number for the location.",
    }),
  ),
});
export const PostTerminalLocationsOutput = Stripeterminal_location;
export const PostTerminalLocationsError = Stripeerror;
export const GetTerminalLocationsLocationInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  location: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTerminalLocationsLocationOutput = Schema.Union([
  Stripeterminal_location,
  Stripedeleted_terminal_location,
]);
export const GetTerminalLocationsLocationError = Stripeerror;
export const PostTerminalLocationsLocationInput = Schema.Struct({
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
    ).annotate({
      title: "update_location_address_param",
      description:
        "The full address of the location. You can't change the location's `country`. If you need to modify the `country` field, create a new `Location` object and re-register any existing readers to that location.",
    }),
  ),
  address_kana: Schema.optionalKey(
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
        town: Schema.optionalKey(
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
      title: "japan_address_kana_specs",
      description:
        "The Kana variation of the full address of the location (Japan only).",
    }),
  ),
  address_kanji: Schema.optionalKey(
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
        town: Schema.optionalKey(
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
      title: "japan_address_kanji_specs",
      description:
        "The Kanji variation of the full address of the location (Japan only).",
    }),
  ),
  configuration_overrides: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The ID of a configuration that will be used to customize all readers in this location.",
    }),
  ),
  display_name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({ description: "A name for the location." }),
  ),
  display_name_kana: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The Kana variation of the name for the location (Japan only).",
    }),
  ),
  display_name_kanji: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1000).annotate({
          expected: "a string with at most 1000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "The Kanji variation of the name for the location (Japan only).",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  phone: Schema.optionalKey(
    Schema.Union([Schema.String, Schema.Literal("")]).annotate({
      description: "The phone number for the location.",
    }),
  ),
  location: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalLocationsLocationOutput = Schema.Union([
  Stripeterminal_location,
  Stripedeleted_terminal_location,
]);
export const PostTerminalLocationsLocationError = Stripeerror;
export const DeleteTerminalLocationsLocationInput = Schema.Struct({
  location: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteTerminalLocationsLocationOutput =
  Stripedeleted_terminal_location;
export const DeleteTerminalLocationsLocationError = Stripeerror;
/**
 * The GetTerminalLocationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalLocationsOperation: StripeOperation & {
  readonly input: typeof GetTerminalLocationsInput;
  readonly output: typeof GetTerminalLocationsOutput;
  readonly error: typeof GetTerminalLocationsError;
} = {
  name: "GetTerminalLocations",
  method: "GET",
  path: "/v1/terminal/locations",
  pathParameters: [],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalLocationsInput,
  output: GetTerminalLocationsOutput,
  error: GetTerminalLocationsError,
};
/**
 * The PostTerminalLocationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalLocationsOperation: StripeOperation & {
  readonly input: typeof PostTerminalLocationsInput;
  readonly output: typeof PostTerminalLocationsOutput;
  readonly error: typeof PostTerminalLocationsError;
} = {
  name: "PostTerminalLocations",
  method: "POST",
  path: "/v1/terminal/locations",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalLocationsInput,
  output: PostTerminalLocationsOutput,
  error: PostTerminalLocationsError,
};
/**
 * The GetTerminalLocationsLocationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalLocationsLocationOperation: StripeOperation & {
  readonly input: typeof GetTerminalLocationsLocationInput;
  readonly output: typeof GetTerminalLocationsLocationOutput;
  readonly error: typeof GetTerminalLocationsLocationError;
} = {
  name: "GetTerminalLocationsLocation",
  method: "GET",
  path: "/v1/terminal/locations/{location}",
  pathParameters: ["location"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalLocationsLocationInput,
  output: GetTerminalLocationsLocationOutput,
  error: GetTerminalLocationsLocationError,
};
/**
 * The PostTerminalLocationsLocationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalLocationsLocationOperation: StripeOperation & {
  readonly input: typeof PostTerminalLocationsLocationInput;
  readonly output: typeof PostTerminalLocationsLocationOutput;
  readonly error: typeof PostTerminalLocationsLocationError;
} = {
  name: "PostTerminalLocationsLocation",
  method: "POST",
  path: "/v1/terminal/locations/{location}",
  pathParameters: ["location"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalLocationsLocationInput,
  output: PostTerminalLocationsLocationOutput,
  error: PostTerminalLocationsLocationError,
};
/**
 * The DeleteTerminalLocationsLocationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteTerminalLocationsLocationOperation: StripeOperation & {
  readonly input: typeof DeleteTerminalLocationsLocationInput;
  readonly output: typeof DeleteTerminalLocationsLocationOutput;
  readonly error: typeof DeleteTerminalLocationsLocationError;
} = {
  name: "DeleteTerminalLocationsLocation",
  method: "DELETE",
  path: "/v1/terminal/locations/{location}",
  pathParameters: ["location"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteTerminalLocationsLocationInput,
  output: DeleteTerminalLocationsLocationOutput,
  error: DeleteTerminalLocationsLocationError,
};
/**
 * The makeTerminalLocationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTerminalLocationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTerminalLocations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalLocations = Effect.fn(
    "terminalLocations.GetTerminalLocations",
  )(function* (input: GetTerminalLocationsInput) {
    const response: GetTerminalLocationsOutput = yield* client.invoke(
      GetTerminalLocationsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTerminalLocations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalLocations = Effect.fn(
    "terminalLocations.PostTerminalLocations",
  )(function* (input: PostTerminalLocationsInput) {
    const response: PostTerminalLocationsOutput = yield* client.invoke(
      PostTerminalLocationsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTerminalLocationsLocation function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalLocationsLocation = Effect.fn(
    "terminalLocations.GetTerminalLocationsLocation",
  )(function* (input: GetTerminalLocationsLocationInput) {
    const response: GetTerminalLocationsLocationOutput = yield* client.invoke(
      GetTerminalLocationsLocationOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTerminalLocationsLocation function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalLocationsLocation = Effect.fn(
    "terminalLocations.PostTerminalLocationsLocation",
  )(function* (input: PostTerminalLocationsLocationInput) {
    const response: PostTerminalLocationsLocationOutput = yield* client.invoke(
      PostTerminalLocationsLocationOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteTerminalLocationsLocation function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteTerminalLocationsLocation = Effect.fn(
    "terminalLocations.DeleteTerminalLocationsLocation",
  )(function* (input: DeleteTerminalLocationsLocationInput) {
    const response: DeleteTerminalLocationsLocationOutput =
      yield* client.invoke(DeleteTerminalLocationsLocationOperation, input);
    return response;
  });
  return {
    GetTerminalLocations,
    PostTerminalLocations,
    GetTerminalLocationsLocation,
    PostTerminalLocationsLocation,
    DeleteTerminalLocationsLocation,
  };
});
