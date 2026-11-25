// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripetax_registration } from "./models/catalog.js";
import { Stripeerror } from "./models/common.js";

export type GetTaxRegistrationsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
  readonly status?: "active" | "all" | "expired" | "scheduled";
};
export type GetTaxRegistrationsOutput = {
  readonly data: ReadonlyArray<Stripetax_registration>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetTaxRegistrationsError = Stripeerror;
export type PostTaxRegistrationsInput = {
  readonly active_from: "now" | number;
  readonly country: string;
  readonly country_options: {
    readonly ae?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly al?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly am?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ao?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly at?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly au?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly aw?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly az?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ba?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bb?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bd?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly be?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bf?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bg?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bh?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bj?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly bs?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly bw?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly by?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ca?: {
      readonly province_standard?: { readonly province: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly type: "province_standard" | "simplified" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly cd?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ch?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ci?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cl?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cm?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly co?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cr?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cv?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly cy?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly cz?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly de?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly dk?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ec?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ee?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly eg?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly es?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly et?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly fi?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly fr?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly gb?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ge?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly gh?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly gn?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly gr?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly hr?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly hu?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly id?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ie?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly in?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly is?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly it?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly jp?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ke?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kg?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kh?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kr?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly kz?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly la?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly lk?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly lt?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly lu?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly lv?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ma?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly md?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly me?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly mk?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly mr?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly mt?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly mu?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly mx?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly my?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ng?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nl?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly no?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly np?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly nz?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly om?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly pe?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ph?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly pl?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly pt?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ro?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly rs?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly ru?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sa?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly se?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly sg?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly si?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly sk?: {
      readonly standard?: {
        readonly place_of_supply_scheme:
          | "inbound_goods"
          | "small_seller"
          | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "ioss" | "oss_non_union" | "oss_union" | "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly sn?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly sr?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly th?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tj?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tr?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tw?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly tz?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ua?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly ug?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly us?: {
      readonly admissions_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly attendance_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly entertainment_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly gross_receipts_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly hospitality_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly local_amusement_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly local_lease_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly luxury_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly mass_transit_parking_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly parking_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly resort_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly state: string;
      readonly state_sales_tax?: {
        readonly elections: ReadonlyArray<
          {
            readonly jurisdiction?: string;
            readonly type:
              | "local_use_tax"
              | "simplified_sellers_use_tax"
              | "single_local_use_tax";
          } & { readonly [x: string]: Schema.Json }
        >;
      } & { readonly [x: string]: Schema.Json };
      readonly tourism_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
      readonly type:
        | "admissions_tax"
        | "attendance_tax"
        | "digital_excise_tax"
        | "entertainment_tax"
        | "gross_receipts_tax"
        | "hospitality_tax"
        | "local_amusement_tax"
        | "local_lease_tax"
        | "luxury_tax"
        | "mass_transit_parking_tax"
        | "parking_tax"
        | "resort_tax"
        | "state_communications_tax"
        | "state_retail_delivery_fee"
        | "state_sales_tax"
        | "tourism_tax"
        | "utility_users_tax";
      readonly utility_users_tax?: { readonly jurisdiction: string } & {
        readonly [x: string]: Schema.Json;
      };
    } & { readonly [x: string]: Schema.Json };
    readonly uy?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly uz?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly vn?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly za?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
    readonly zm?: { readonly type: "simplified" } & {
      readonly [x: string]: Schema.Json;
    };
    readonly zw?: {
      readonly standard?: {
        readonly place_of_supply_scheme?: "inbound_goods" | "standard";
      } & { readonly [x: string]: Schema.Json };
      readonly type: "standard";
    } & { readonly [x: string]: Schema.Json };
  } & { readonly [x: string]: Schema.Json };
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: number;
};
export type PostTaxRegistrationsOutput = Stripetax_registration;
export type PostTaxRegistrationsError = Stripeerror;
export type GetTaxRegistrationsIdInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly id: string;
};
export type GetTaxRegistrationsIdOutput = Stripetax_registration;
export type GetTaxRegistrationsIdError = Stripeerror;
export type PostTaxRegistrationsIdInput = {
  readonly active_from?: "now" | number;
  readonly expand?: ReadonlyArray<string>;
  readonly expires_at?: "now" | number | "";
  readonly id: string;
};
export type PostTaxRegistrationsIdOutput = Stripetax_registration;
export type PostTaxRegistrationsIdError = Stripeerror;

export const GetTaxRegistrationsInput = Schema.Struct({
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
    Schema.Literals(["active", "all", "expired", "scheduled"]),
  ),
});
export const GetTaxRegistrationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripetax_registration),
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
          new globalThis.RegExp("^\\/v1\\/tax\\/registrations", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/tax\\/registrations",
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
  title: "TaxProductRegistrationsResourceTaxRegistrationList",
  description: "",
});
export const GetTaxRegistrationsError = Stripeerror;
export const PostTaxRegistrationsInput = Schema.Struct({
  active_from: Schema.Union([
    Schema.Literal("now"),
    Schema.Number.annotate({ format: "unix-time" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ]).annotate({
    description:
      "Time at which the Tax Registration becomes active. It can be either `now` to indicate the current time, or a future timestamp measured in seconds since the Unix epoch.",
  }),
  country: Schema.String.annotate({
    description:
      "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  country_options: Schema.StructWithRest(
    Schema.Struct({
      ae: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      al: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      am: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ao: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      at: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      au: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      aw: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      az: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ba: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      bb: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      bd: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      be: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      bf: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      bg: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      bh: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      bj: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      bs: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      bw: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      by: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ca: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            province_standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  province: Schema.String.check(
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
              ).annotate({ title: "province_standard" }),
            ),
            type: Schema.Literals([
              "province_standard",
              "simplified",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "canada" }),
      ),
      cd: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      ch: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      ci: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      cl: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      cm: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      co: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      cr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      cv: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      cy: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      cz: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      de: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      dk: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      ec: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ee: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      eg: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      es: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "spain" }),
      ),
      et: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      fi: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      fr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      gb: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      ge: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      gh: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      gn: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      gr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      hr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      hu: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      id: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ie: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      in: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      is: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      it: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      jp: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      ke: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      kg: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      kh: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      kr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      kz: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      la: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      lk: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      lt: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      lu: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      lv: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      ma: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      md: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      me: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      mk: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      mr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      mt: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      mu: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      mx: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      my: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ng: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      nl: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      no: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      np: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      nz: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      om: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      pe: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ph: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      pl: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      pt: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      ro: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      rs: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      ru: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      sa: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      se: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      sg: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      si: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      sk: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.Literals([
                    "inbound_goods",
                    "small_seller",
                    "standard",
                  ]),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literals([
              "ioss",
              "oss_non_union",
              "oss_union",
              "standard",
            ]),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "europe" }),
      ),
      sn: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      sr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      th: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "thailand" }),
      ),
      tj: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      tr: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      tw: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      tz: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ua: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      ug: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      us: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            admissions_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "admissions_tax" }),
            ),
            attendance_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "attendance_tax" }),
            ),
            entertainment_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "entertainment_tax" }),
            ),
            gross_receipts_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "gross_receipts_tax" }),
            ),
            hospitality_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "hospitality_tax" }),
            ),
            local_amusement_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "local_amusement_tax" }),
            ),
            local_lease_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "local_lease_tax" }),
            ),
            luxury_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "luxury_tax" }),
            ),
            mass_transit_parking_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "mass_transit_parking_tax" }),
            ),
            parking_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "parking_tax" }),
            ),
            resort_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "resort_tax" }),
            ),
            state: Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            state_sales_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  elections: Schema.Array(
                    Schema.StructWithRest(
                      Schema.Struct({
                        jurisdiction: Schema.optionalKey(
                          Schema.String.check(
                            Schema.isMaxCodePoints(5000).annotate({
                              expected:
                                "a string with at most 5000 code points",
                            }),
                          ),
                        ),
                        type: Schema.Literals([
                          "local_use_tax",
                          "simplified_sellers_use_tax",
                          "single_local_use_tax",
                        ]),
                      }),
                      [
                        Schema.Record(
                          Schema.String,
                          Schema.Json.annotate({ expected: "JSON value" }),
                        ),
                      ],
                    ).annotate({ title: "state_sales_tax_election" }),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "state_sales_tax" }),
            ),
            tourism_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "tourism_tax" }),
            ),
            type: Schema.Literals([
              "admissions_tax",
              "attendance_tax",
              "digital_excise_tax",
              "entertainment_tax",
              "gross_receipts_tax",
              "hospitality_tax",
              "local_amusement_tax",
              "local_lease_tax",
              "luxury_tax",
              "mass_transit_parking_tax",
              "parking_tax",
              "resort_tax",
              "state_communications_tax",
              "state_retail_delivery_fee",
              "state_sales_tax",
              "tourism_tax",
              "utility_users_tax",
            ]),
            utility_users_tax: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  jurisdiction: Schema.String.check(
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
              ).annotate({ title: "utility_users_tax_api_params" }),
            ),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "united_states" }),
      ),
      uy: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      uz: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      vn: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      za: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
      zm: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({ type: Schema.Literal("simplified") }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "simplified" }),
      ),
      zw: Schema.optionalKey(
        Schema.StructWithRest(
          Schema.Struct({
            standard: Schema.optionalKey(
              Schema.StructWithRest(
                Schema.Struct({
                  place_of_supply_scheme: Schema.optionalKey(
                    Schema.Literals(["inbound_goods", "standard"]),
                  ),
                }),
                [
                  Schema.Record(
                    Schema.String,
                    Schema.Json.annotate({ expected: "JSON value" }),
                  ),
                ],
              ).annotate({ title: "standard" }),
            ),
            type: Schema.Literal("standard"),
          }),
          [
            Schema.Record(
              Schema.String,
              Schema.Json.annotate({ expected: "JSON value" }),
            ),
          ],
        ).annotate({ title: "default" }),
      ),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "country_options",
    description:
      "Specific options for a registration in the specified `country`.",
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
  expires_at: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "If set, the Tax Registration stops being active at this time. If not set, the Tax Registration will be active indefinitely. Timestamp measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
});
export const PostTaxRegistrationsOutput = Stripetax_registration;
export const PostTaxRegistrationsError = Stripeerror;
export const GetTaxRegistrationsIdInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetTaxRegistrationsIdOutput = Stripetax_registration;
export const GetTaxRegistrationsIdError = Stripeerror;
export const PostTaxRegistrationsIdInput = Schema.Struct({
  active_from: Schema.optionalKey(
    Schema.Union([
      Schema.Literal("now"),
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
    ]).annotate({
      description:
        "Time at which the registration becomes active. It can be either `now` to indicate the current time, or a timestamp measured in seconds since the Unix epoch.",
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
  expires_at: Schema.optionalKey(
    Schema.Union([
      Schema.Literal("now"),
      Schema.Number.annotate({ format: "unix-time" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description:
        "If set, the registration stops being active at this time. If not set, the registration will be active indefinitely. It can be either `now` to indicate the current time, or a timestamp measured in seconds since the Unix epoch.",
    }),
  ),
  id: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostTaxRegistrationsIdOutput = Stripetax_registration;
export const PostTaxRegistrationsIdError = Stripeerror;
/**
 * The GetTaxRegistrationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxRegistrationsOperation: StripeOperation & {
  readonly input: typeof GetTaxRegistrationsInput;
  readonly output: typeof GetTaxRegistrationsOutput;
  readonly error: typeof GetTaxRegistrationsError;
} = {
  name: "GetTaxRegistrations",
  method: "GET",
  path: "/v1/tax/registrations",
  pathParameters: [],
  queryParameters: [
    "ending_before",
    "expand",
    "limit",
    "starting_after",
    "status",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxRegistrationsInput,
  output: GetTaxRegistrationsOutput,
  error: GetTaxRegistrationsError,
};
/**
 * The PostTaxRegistrationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxRegistrationsOperation: StripeOperation & {
  readonly input: typeof PostTaxRegistrationsInput;
  readonly output: typeof PostTaxRegistrationsOutput;
  readonly error: typeof PostTaxRegistrationsError;
} = {
  name: "PostTaxRegistrations",
  method: "POST",
  path: "/v1/tax/registrations",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxRegistrationsInput,
  output: PostTaxRegistrationsOutput,
  error: PostTaxRegistrationsError,
};
/**
 * The GetTaxRegistrationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetTaxRegistrationsIdOperation: StripeOperation & {
  readonly input: typeof GetTaxRegistrationsIdInput;
  readonly output: typeof GetTaxRegistrationsIdOutput;
  readonly error: typeof GetTaxRegistrationsIdError;
} = {
  name: "GetTaxRegistrationsId",
  method: "GET",
  path: "/v1/tax/registrations/{id}",
  pathParameters: ["id"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetTaxRegistrationsIdInput,
  output: GetTaxRegistrationsIdOutput,
  error: GetTaxRegistrationsIdError,
};
/**
 * The PostTaxRegistrationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostTaxRegistrationsIdOperation: StripeOperation & {
  readonly input: typeof PostTaxRegistrationsIdInput;
  readonly output: typeof PostTaxRegistrationsIdOutput;
  readonly error: typeof PostTaxRegistrationsIdError;
} = {
  name: "PostTaxRegistrationsId",
  method: "POST",
  path: "/v1/tax/registrations/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostTaxRegistrationsIdInput,
  output: PostTaxRegistrationsIdOutput,
  error: PostTaxRegistrationsIdError,
};
/**
 * The makeTaxRegistrationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeTaxRegistrationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetTaxRegistrations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxRegistrations = Effect.fn("taxRegistrations.GetTaxRegistrations")(
    function* (input: GetTaxRegistrationsInput) {
      const response: GetTaxRegistrationsOutput = yield* client.invoke(
        GetTaxRegistrationsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostTaxRegistrations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxRegistrations = Effect.fn(
    "taxRegistrations.PostTaxRegistrations",
  )(function* (input: PostTaxRegistrationsInput) {
    const response: PostTaxRegistrationsOutput = yield* client.invoke(
      PostTaxRegistrationsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetTaxRegistrationsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetTaxRegistrationsId = Effect.fn(
    "taxRegistrations.GetTaxRegistrationsId",
  )(function* (input: GetTaxRegistrationsIdInput) {
    const response: GetTaxRegistrationsIdOutput = yield* client.invoke(
      GetTaxRegistrationsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostTaxRegistrationsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostTaxRegistrationsId = Effect.fn(
    "taxRegistrations.PostTaxRegistrationsId",
  )(function* (input: PostTaxRegistrationsIdInput) {
    const response: PostTaxRegistrationsIdOutput = yield* client.invoke(
      PostTaxRegistrationsIdOperation,
      input,
    );
    return response;
  });
  return {
    GetTaxRegistrations,
    PostTaxRegistrations,
    GetTaxRegistrationsId,
    PostTaxRegistrationsId,
  };
});
