// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_terminal_configuration,
  Stripeerror,
  Stripeterminal_configuration,
} from "./models/common.js";

export type GetTerminalConfigurationsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly is_account_default?: boolean;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetTerminalConfigurationsOutput = {
  readonly data: ReadonlyArray<Stripeterminal_configuration>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTerminalConfigurationsError = Stripeerror;
export type PostTerminalConfigurationsInput = {
  readonly bbpos_wisepad3?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly bbpos_wisepos_e?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly cellular?:
    | ({ readonly enabled: boolean } & { readonly [x: string]: Schema.Json })
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly name?: string;
  readonly offline?:
    | ({ readonly enabled: boolean } & { readonly [x: string]: Schema.Json })
    | "";
  readonly reader_security?:
    | ({ readonly admin_menu_passcode?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly reboot_window?: {
    readonly end_hour: number;
    readonly start_hour: number;
  } & { readonly [x: string]: Schema.Json };
  readonly stripe_s700?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly stripe_s710?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly stripe_t600?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly tipping?:
    | ({
        readonly aed?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly aud?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly cad?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly chf?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly czk?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly dkk?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly eur?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly gbp?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly gip?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly hkd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly huf?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly jpy?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly mxn?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly myr?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly nok?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly nzd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly pln?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly ron?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly sek?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly sgd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly usd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly verifone_m425?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly verifone_p400?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly verifone_p630?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly verifone_ux700?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly verifone_v660p?: { readonly splashscreen?: string | "" } & {
    readonly [x: string]: Schema.Json;
  };
  readonly wifi?:
    | ({
        readonly enterprise_eap_peap?: {
          readonly ca_certificate_file?: string;
          readonly password: string;
          readonly ssid: string;
          readonly username: string;
        } & { readonly [x: string]: Schema.Json };
        readonly enterprise_eap_tls?: {
          readonly ca_certificate_file?: string;
          readonly client_certificate_file: string;
          readonly private_key_file: string;
          readonly private_key_file_password?: string;
          readonly ssid: string;
        } & { readonly [x: string]: Schema.Json };
        readonly personal_psk?: {
          readonly password: string;
          readonly ssid: string;
        } & { readonly [x: string]: Schema.Json };
        readonly type:
          | "enterprise_eap_peap"
          | "enterprise_eap_tls"
          | "personal_psk";
      } & { readonly [x: string]: Schema.Json })
    | "";
};
export type PostTerminalConfigurationsOutput = Stripeterminal_configuration;
export type PostTerminalConfigurationsError = Stripeerror;
export type GetTerminalConfigurationsConfigurationInput = {
  readonly configuration: string;
  readonly expand?: ReadonlyArray<string>;
};
export type GetTerminalConfigurationsConfigurationOutput =
  | Stripeterminal_configuration
  | Stripedeleted_terminal_configuration;
export type GetTerminalConfigurationsConfigurationError = Stripeerror;
export type PostTerminalConfigurationsConfigurationInput = {
  readonly bbpos_wisepad3?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly bbpos_wisepos_e?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly cellular?:
    | ({ readonly enabled: boolean } & { readonly [x: string]: Schema.Json })
    | "";
  readonly expand?: ReadonlyArray<string>;
  readonly name?: string;
  readonly offline?:
    | ({ readonly enabled: boolean } & { readonly [x: string]: Schema.Json })
    | "";
  readonly reader_security?:
    | ({ readonly admin_menu_passcode?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly reboot_window?:
    | ({ readonly end_hour: number; readonly start_hour: number } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly stripe_s700?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly stripe_s710?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly stripe_t600?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly tipping?:
    | ({
        readonly aed?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly aud?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly cad?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly chf?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly czk?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly dkk?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly eur?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly gbp?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly gip?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly hkd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly huf?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly jpy?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly mxn?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly myr?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly nok?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly nzd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly pln?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly ron?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly sek?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly sgd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
        readonly usd?: {
          readonly fixed_amounts?: ReadonlyArray<number>;
          readonly percentages?: ReadonlyArray<number>;
          readonly smart_tip_threshold?: number;
        } & { readonly [x: string]: Schema.Json };
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly verifone_m425?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly verifone_p400?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly verifone_p630?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly verifone_ux700?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly verifone_v660p?:
    | ({ readonly splashscreen?: string | "" } & {
        readonly [x: string]: Schema.Json;
      })
    | "";
  readonly wifi?:
    | ({
        readonly enterprise_eap_peap?: {
          readonly ca_certificate_file?: string;
          readonly password: string;
          readonly ssid: string;
          readonly username: string;
        } & { readonly [x: string]: Schema.Json };
        readonly enterprise_eap_tls?: {
          readonly ca_certificate_file?: string;
          readonly client_certificate_file: string;
          readonly private_key_file: string;
          readonly private_key_file_password?: string;
          readonly ssid: string;
        } & { readonly [x: string]: Schema.Json };
        readonly personal_psk?: {
          readonly password: string;
          readonly ssid: string;
        } & { readonly [x: string]: Schema.Json };
        readonly type:
          | "enterprise_eap_peap"
          | "enterprise_eap_tls"
          | "personal_psk";
      } & { readonly [x: string]: Schema.Json })
    | "";
  readonly configuration: string;
};
export type PostTerminalConfigurationsConfigurationOutput =
  | Stripeterminal_configuration
  | Stripedeleted_terminal_configuration;
export type PostTerminalConfigurationsConfigurationError = Stripeerror;
export type DeleteTerminalConfigurationsConfigurationInput = {
  readonly configuration: string;
};
export type DeleteTerminalConfigurationsConfigurationOutput =
  Stripedeleted_terminal_configuration;
export type DeleteTerminalConfigurationsConfigurationError = Stripeerror;

export const GetTerminalConfigurationsInput = Schema.Struct({
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
  is_account_default: Schema.optionalKey(Schema.Boolean),
  limit: Schema.optionalKey(Schema.Int),
  starting_after: Schema.optionalKey(
    Schema.String.check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const GetTerminalConfigurationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripeterminal_configuration),
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
          new globalThis.RegExp("^\\/v1\\/terminal\\/configurations", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/terminal\\/configurations",
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
  title: "TerminalConfigurationConfigurationList",
  description: "",
});
export const GetTerminalConfigurationsError = Stripeerror;
export const PostTerminalConfigurationsInput = Schema.Struct({
  bbpos_wisepad3: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "bbpos_wise_pad3",
      description:
        "An object containing device type specific settings for BBPOS WisePad 3 readers.",
    }),
  ),
  bbpos_wisepos_e: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "bbpos_wise_pose",
      description:
        "An object containing device type specific settings for BBPOS WisePOS E readers.",
    }),
  ),
  cellular: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "cellular" }),
      Schema.Literal(""),
    ]).annotate({ description: "Configuration for cellular connectivity." }),
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
  name: Schema.optionalKey(
    Schema.String.annotate({ description: "Name of the configuration" }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  offline: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "offline" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for collecting transactions offline.",
    }),
  ),
  reader_security: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          admin_menu_passcode: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "reader_security" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for reader security settings.",
    }),
  ),
  reboot_window: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({ end_hour: Schema.Int, start_hour: Schema.Int }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "reboot_window",
      description:
        "Reboot time settings for readers. that support customized reboot time configuration.",
    }),
  ),
  stripe_s700: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "stripe_s700",
      description:
        "An object containing device type specific settings for Stripe S700 readers.",
    }),
  ),
  stripe_s710: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "stripe_s710",
      description:
        "An object containing device type specific settings for Stripe S710 readers.",
    }),
  ),
  stripe_t600: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "stripe_t600",
      description:
        "An object containing device type specific settings for Stripe T600 readers.",
    }),
  ),
  tipping: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          aed: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          aud: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          cad: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          chf: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          czk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          dkk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          eur: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          gbp: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          gip: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          hkd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          huf: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          jpy: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          mxn: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          myr: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          nok: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          nzd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          pln: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          ron: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          sek: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          sgd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          usd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "tipping" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Tipping configurations for readers that support on-reader tips.",
    }),
  ),
  verifone_m425: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "verifone_m425",
      description:
        "An object containing device type specific settings for Verifone M425 readers.",
    }),
  ),
  verifone_p400: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "verifone_p400",
      description:
        "An object containing device type specific settings for Verifone P400 readers.",
    }),
  ),
  verifone_p630: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "verifone_p630",
      description:
        "An object containing device type specific settings for Verifone P630 readers.",
    }),
  ),
  verifone_ux700: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "verifone_ux700",
      description:
        "An object containing device type specific settings for Verifone UX700 readers.",
    }),
  ),
  verifone_v660p: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        splashscreen: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Literal("")]),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "verifone_v660p",
      description:
        "An object containing device type specific settings for Verifone V660p readers.",
    }),
  ),
  wifi: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          enterprise_eap_peap: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ca_certificate_file: Schema.optionalKey(Schema.String),
                password: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                ssid: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                username: Schema.String.check(
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
            ).annotate({ title: "enterprise_peap_config" }),
          ),
          enterprise_eap_tls: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ca_certificate_file: Schema.optionalKey(Schema.String),
                client_certificate_file: Schema.String,
                private_key_file: Schema.String,
                private_key_file_password: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                ssid: Schema.String.check(
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
            ).annotate({ title: "enterprise_tls_config" }),
          ),
          personal_psk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                password: Schema.String.check(
                  Schema.isMaxCodePoints(63).annotate({
                    expected: "a string with at most 63 code points",
                  }),
                ),
                ssid: Schema.String.check(
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
            ).annotate({ title: "personal_psk_config" }),
          ),
          type: Schema.Literals([
            "enterprise_eap_peap",
            "enterprise_eap_tls",
            "personal_psk",
          ]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "wifi" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for connecting to a WiFi network.",
    }),
  ),
});
export const PostTerminalConfigurationsOutput = Stripeterminal_configuration;
export const PostTerminalConfigurationsError = Stripeerror;
export const GetTerminalConfigurationsConfigurationInput = Schema.Struct({
  configuration: Schema.String.check(
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
export const GetTerminalConfigurationsConfigurationOutput = Schema.Union([
  Stripeterminal_configuration,
  Stripedeleted_terminal_configuration,
]);
export const GetTerminalConfigurationsConfigurationError = Stripeerror;
export const PostTerminalConfigurationsConfigurationInput = Schema.Struct({
  bbpos_wisepad3: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "bbpos_wise_pad3" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for BBPOS WisePad 3 readers.",
    }),
  ),
  bbpos_wisepos_e: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "bbpos_wise_pose" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for BBPOS WisePOS E readers.",
    }),
  ),
  cellular: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "cellular" }),
      Schema.Literal(""),
    ]).annotate({ description: "Configuration for cellular connectivity." }),
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
  name: Schema.optionalKey(
    Schema.String.annotate({ description: "Name of the configuration" }).check(
      Schema.isMaxCodePoints(100).annotate({
        expected: "a string with at most 100 code points",
      }),
    ),
  ),
  offline: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(Schema.Struct({ enabled: Schema.Boolean }), [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ]).annotate({ title: "offline" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for collecting transactions offline.",
    }),
  ),
  reader_security: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          admin_menu_passcode: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Literal(""),
            ]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "reader_security" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for reader security settings.",
    }),
  ),
  reboot_window: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({ end_hour: Schema.Int, start_hour: Schema.Int }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "reboot_window" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Reboot time settings for readers. that support customized reboot time configuration.",
    }),
  ),
  stripe_s700: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "stripe_s700" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Stripe S700 readers.",
    }),
  ),
  stripe_s710: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "stripe_s710" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Stripe S710 readers.",
    }),
  ),
  stripe_t600: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "stripe_t600" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Stripe T600 readers.",
    }),
  ),
  tipping: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          aed: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          aud: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          cad: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          chf: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          czk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          dkk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          eur: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          gbp: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          gip: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          hkd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          huf: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          jpy: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          mxn: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          myr: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          nok: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          nzd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          pln: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          ron: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          sek: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          sgd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
          usd: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                fixed_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
                percentages: Schema.optionalKey(Schema.Array(Schema.Int)),
                smart_tip_threshold: Schema.optionalKey(Schema.Int),
              }),
              [
                Schema.Record(
                  Schema.String,
                  Schema.Json.annotate({ expected: "JSON value" }),
                ),
              ],
            ).annotate({ title: "currency_specific_config" }),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "tipping" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Tipping configurations for readers that support on-reader tips.",
    }),
  ),
  verifone_m425: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "verifone_m425" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Verifone M425 readers.",
    }),
  ),
  verifone_p400: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "verifone_p400" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Verifone P400 readers.",
    }),
  ),
  verifone_p630: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "verifone_p630" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Verifone P630 readers.",
    }),
  ),
  verifone_ux700: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "verifone_ux700" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Verifone UX700 readers.",
    }),
  ),
  verifone_v660p: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          splashscreen: Schema.optionalKey(
            Schema.Union([Schema.String, Schema.Literal("")]),
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "verifone_v660p" }),
      Schema.Literal(""),
    ]).annotate({
      description:
        "An object containing device type specific settings for Verifone V660p readers.",
    }),
  ),
  wifi: Schema.optionalKey(
    Schema.Union([
      Schema.StructWithRest(
        Schema.Struct({
          enterprise_eap_peap: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ca_certificate_file: Schema.optionalKey(Schema.String),
                password: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                ssid: Schema.String.check(
                  Schema.isMaxCodePoints(5000).annotate({
                    expected: "a string with at most 5000 code points",
                  }),
                ),
                username: Schema.String.check(
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
            ).annotate({ title: "enterprise_peap_config" }),
          ),
          enterprise_eap_tls: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                ca_certificate_file: Schema.optionalKey(Schema.String),
                client_certificate_file: Schema.String,
                private_key_file: Schema.String,
                private_key_file_password: Schema.optionalKey(
                  Schema.String.check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  ),
                ),
                ssid: Schema.String.check(
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
            ).annotate({ title: "enterprise_tls_config" }),
          ),
          personal_psk: Schema.optionalKey(
            Schema.StructWithRest(
              Schema.Struct({
                password: Schema.String.check(
                  Schema.isMaxCodePoints(63).annotate({
                    expected: "a string with at most 63 code points",
                  }),
                ),
                ssid: Schema.String.check(
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
            ).annotate({ title: "personal_psk_config" }),
          ),
          type: Schema.Literals([
            "enterprise_eap_peap",
            "enterprise_eap_tls",
            "personal_psk",
          ]),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({ title: "wifi" }),
      Schema.Literal(""),
    ]).annotate({
      description: "Configurations for connecting to a WiFi network.",
    }),
  ),
  configuration: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTerminalConfigurationsConfigurationOutput = Schema.Union([
  Stripeterminal_configuration,
  Stripedeleted_terminal_configuration,
]);
export const PostTerminalConfigurationsConfigurationError = Stripeerror;
export const DeleteTerminalConfigurationsConfigurationInput = Schema.Struct({
  configuration: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteTerminalConfigurationsConfigurationOutput =
  Stripedeleted_terminal_configuration;
export const DeleteTerminalConfigurationsConfigurationError = Stripeerror;
/**
 * The GetTerminalConfigurationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalConfigurationsOperation: StripeOperation & {
  readonly input: typeof GetTerminalConfigurationsInput;
  readonly output: typeof GetTerminalConfigurationsOutput;
  readonly error: typeof GetTerminalConfigurationsError;
} = {
  name: "GetTerminalConfigurations",
  method: "GET",
  path: "/v1/terminal/configurations",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "is_account_default",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalConfigurationsInput,
  output: GetTerminalConfigurationsOutput,
  error: GetTerminalConfigurationsError,
};
/**
 * The PostTerminalConfigurationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalConfigurationsOperation: StripeOperation & {
  readonly input: typeof PostTerminalConfigurationsInput;
  readonly output: typeof PostTerminalConfigurationsOutput;
  readonly error: typeof PostTerminalConfigurationsError;
} = {
  name: "PostTerminalConfigurations",
  method: "POST",
  path: "/v1/terminal/configurations",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalConfigurationsInput,
  output: PostTerminalConfigurationsOutput,
  error: PostTerminalConfigurationsError,
};
/**
 * The GetTerminalConfigurationsConfigurationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTerminalConfigurationsConfigurationOperation: StripeOperation & {
  readonly input: typeof GetTerminalConfigurationsConfigurationInput;
  readonly output: typeof GetTerminalConfigurationsConfigurationOutput;
  readonly error: typeof GetTerminalConfigurationsConfigurationError;
} = {
  name: "GetTerminalConfigurationsConfiguration",
  method: "GET",
  path: "/v1/terminal/configurations/{configuration}",
  pathParameters: ["configuration"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTerminalConfigurationsConfigurationInput,
  output: GetTerminalConfigurationsConfigurationOutput,
  error: GetTerminalConfigurationsConfigurationError,
};
/**
 * The PostTerminalConfigurationsConfigurationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTerminalConfigurationsConfigurationOperation: StripeOperation & {
  readonly input: typeof PostTerminalConfigurationsConfigurationInput;
  readonly output: typeof PostTerminalConfigurationsConfigurationOutput;
  readonly error: typeof PostTerminalConfigurationsConfigurationError;
} = {
  name: "PostTerminalConfigurationsConfiguration",
  method: "POST",
  path: "/v1/terminal/configurations/{configuration}",
  pathParameters: ["configuration"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTerminalConfigurationsConfigurationInput,
  output: PostTerminalConfigurationsConfigurationOutput,
  error: PostTerminalConfigurationsConfigurationError,
};
/**
 * The DeleteTerminalConfigurationsConfigurationOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteTerminalConfigurationsConfigurationOperation: StripeOperation & {
  readonly input: typeof DeleteTerminalConfigurationsConfigurationInput;
  readonly output: typeof DeleteTerminalConfigurationsConfigurationOutput;
  readonly error: typeof DeleteTerminalConfigurationsConfigurationError;
} = {
  name: "DeleteTerminalConfigurationsConfiguration",
  method: "DELETE",
  path: "/v1/terminal/configurations/{configuration}",
  pathParameters: ["configuration"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteTerminalConfigurationsConfigurationInput,
  output: DeleteTerminalConfigurationsConfigurationOutput,
  error: DeleteTerminalConfigurationsConfigurationError,
};
/**
 * The makeTerminalConfigurationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTerminalConfigurationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTerminalConfigurations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalConfigurations = Effect.fn(
    "terminalConfigurations.GetTerminalConfigurations",
  )(function* (input: GetTerminalConfigurationsInput) {
    const response: GetTerminalConfigurationsOutput = yield* client.invoke(
      GetTerminalConfigurationsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTerminalConfigurations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalConfigurations = Effect.fn(
    "terminalConfigurations.PostTerminalConfigurations",
  )(function* (input: PostTerminalConfigurationsInput) {
    const response: PostTerminalConfigurationsOutput = yield* client.invoke(
      PostTerminalConfigurationsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTerminalConfigurationsConfiguration function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTerminalConfigurationsConfiguration = Effect.fn(
    "terminalConfigurations.GetTerminalConfigurationsConfiguration",
  )(function* (input: GetTerminalConfigurationsConfigurationInput) {
    const response: GetTerminalConfigurationsConfigurationOutput =
      yield* client.invoke(
        GetTerminalConfigurationsConfigurationOperation,
        input,
      );
    return response;
  });
  /**
   * The PostTerminalConfigurationsConfiguration function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTerminalConfigurationsConfiguration = Effect.fn(
    "terminalConfigurations.PostTerminalConfigurationsConfiguration",
  )(function* (input: PostTerminalConfigurationsConfigurationInput) {
    const response: PostTerminalConfigurationsConfigurationOutput =
      yield* client.invoke(
        PostTerminalConfigurationsConfigurationOperation,
        input,
      );
    return response;
  });
  /**
   * The DeleteTerminalConfigurationsConfiguration function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteTerminalConfigurationsConfiguration = Effect.fn(
    "terminalConfigurations.DeleteTerminalConfigurationsConfiguration",
  )(function* (input: DeleteTerminalConfigurationsConfigurationInput) {
    const response: DeleteTerminalConfigurationsConfigurationOutput =
      yield* client.invoke(
        DeleteTerminalConfigurationsConfigurationOperation,
        input,
      );
    return response;
  });
  return {
    GetTerminalConfigurations,
    PostTerminalConfigurations,
    GetTerminalConfigurationsConfiguration,
    PostTerminalConfigurationsConfiguration,
    DeleteTerminalConfigurationsConfiguration,
  };
});
