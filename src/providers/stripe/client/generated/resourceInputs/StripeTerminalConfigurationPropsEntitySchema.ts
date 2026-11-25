// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceInputJson,
  ResourceInputJsonSchema,
} from "../../../../../core/resource/model.js";
import { StripeResourceEntityInputAlternatives_99 } from "./StripeResourceEntityInputAlternatives_99.js";
import { StripeResourceEntityInputAlternatives_100 } from "./StripeResourceEntityInputAlternatives_100.js";
import { StripeResourceEntityInputAlternatives_101 } from "./StripeResourceEntityInputAlternatives_101.js";
import { StripeResourceEntityInputAlternatives_102 } from "./StripeResourceEntityInputAlternatives_102.js";
import { StripeResourceEntityInputAlternatives_103 } from "./StripeResourceEntityInputAlternatives_103.js";
import { StripeResourceEntityInputAlternatives_104 } from "./StripeResourceEntityInputAlternatives_104.js";
import { StripeResourceEntityInputAlternatives_105 } from "./StripeResourceEntityInputAlternatives_105.js";
import { StripeResourceEntityInputAlternatives_106 } from "./StripeResourceEntityInputAlternatives_106.js";
import { StripeResourceEntityInputAlternatives_107 } from "./StripeResourceEntityInputAlternatives_107.js";
import { StripeResourceEntityInputAlternatives_108 } from "./StripeResourceEntityInputAlternatives_108.js";
import { StripeTerminalConfigurationResourceSchema } from "./StripeTerminalConfigurationPropsSchema.js";

export type StripeTerminalConfigurationPropsEntity = {
  readonly bbpos_wisepad3?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_99;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_99;
  };
  readonly bbpos_wisepos_e?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_100;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_100;
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
  readonly stripe_s700?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_101;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_101;
  };
  readonly stripe_s710?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_102;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_102;
  };
  readonly stripe_t600?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_103;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_103;
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
  readonly verifone_m425?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_104;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_104;
  };
  readonly verifone_p400?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_105;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_105;
  };
  readonly verifone_p630?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_106;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_106;
  };
  readonly verifone_ux700?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_107;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_107;
  };
  readonly verifone_v660p?: {
    readonly splashscreen?: StripeResourceEntityInputAlternatives_108;
  } & {
    readonly [x: string]:
      | ResourceInputJson
      | StripeResourceEntityInputAlternatives_108;
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

export const StripeTerminalConfigurationPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      bbpos_wisepad3: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            splashscreen: Schema.optionalKey(
              StripeResourceEntityInputAlternatives_99,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_99,
              ]),
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
              StripeResourceEntityInputAlternatives_100,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_100,
              ]),
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
        ]).annotate({
          description: "Configuration for cellular connectivity.",
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
      name: Schema.optionalKey(
        Schema.String.annotate({
          description: "Name of the configuration",
        }).check(
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
              StripeResourceEntityInputAlternatives_101,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_101,
              ]),
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
              StripeResourceEntityInputAlternatives_102,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_102,
              ]),
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
              StripeResourceEntityInputAlternatives_103,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_103,
              ]),
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
              StripeResourceEntityInputAlternatives_104,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_104,
              ]),
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
              StripeResourceEntityInputAlternatives_105,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_105,
              ]),
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
              StripeResourceEntityInputAlternatives_106,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_106,
              ]),
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
              StripeResourceEntityInputAlternatives_107,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_107,
              ]),
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
              StripeResourceEntityInputAlternatives_108,
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Union([
                ResourceInputJsonSchema,
                StripeResourceEntityInputAlternatives_108,
              ]),
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
    }),
    StripeTerminalConfigurationResourceSchema,
  );
