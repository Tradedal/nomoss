// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripeerror, Stripereporting_report_run } from "./models/common.js";

export type GetReportingReportRunsInput = {
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
};
export type GetReportingReportRunsOutput = {
  readonly data: ReadonlyArray<Stripereporting_report_run>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetReportingReportRunsError = Stripeerror;
export type PostReportingReportRunsInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly parameters?: {
    readonly columns?: ReadonlyArray<string>;
    readonly connected_account?: string;
    readonly currency?: string;
    readonly interval_end?: number;
    readonly interval_start?: number;
    readonly payout?: string;
    readonly reporting_category?:
      | "advance"
      | "advance_funding"
      | "anticipation_repayment"
      | "charge"
      | "charge_failure"
      | "climate_order_purchase"
      | "climate_order_refund"
      | "connect_collection_transfer"
      | "connect_reserved_funds"
      | "contribution"
      | "dispute"
      | "dispute_reversal"
      | "fee"
      | "financing_paydown"
      | "financing_paydown_reversal"
      | "financing_payout"
      | "financing_payout_reversal"
      | "issuing_authorization_hold"
      | "issuing_authorization_release"
      | "issuing_dispute"
      | "issuing_transaction"
      | "network_cost"
      | "other_adjustment"
      | "partial_capture_reversal"
      | "payout"
      | "payout_reversal"
      | "platform_earning"
      | "platform_earning_refund"
      | "refund"
      | "refund_failure"
      | "risk_reserved_funds"
      | "tax"
      | "topup"
      | "topup_reversal"
      | "transfer"
      | "transfer_reversal"
      | "unreconciled_customer_funds";
    readonly timezone?:
      | "Africa/Abidjan"
      | "Africa/Accra"
      | "Africa/Addis_Ababa"
      | "Africa/Algiers"
      | "Africa/Asmara"
      | "Africa/Asmera"
      | "Africa/Bamako"
      | "Africa/Bangui"
      | "Africa/Banjul"
      | "Africa/Bissau"
      | "Africa/Blantyre"
      | "Africa/Brazzaville"
      | "Africa/Bujumbura"
      | "Africa/Cairo"
      | "Africa/Casablanca"
      | "Africa/Ceuta"
      | "Africa/Conakry"
      | "Africa/Dakar"
      | "Africa/Dar_es_Salaam"
      | "Africa/Djibouti"
      | "Africa/Douala"
      | "Africa/El_Aaiun"
      | "Africa/Freetown"
      | "Africa/Gaborone"
      | "Africa/Harare"
      | "Africa/Johannesburg"
      | "Africa/Juba"
      | "Africa/Kampala"
      | "Africa/Khartoum"
      | "Africa/Kigali"
      | "Africa/Kinshasa"
      | "Africa/Lagos"
      | "Africa/Libreville"
      | "Africa/Lome"
      | "Africa/Luanda"
      | "Africa/Lubumbashi"
      | "Africa/Lusaka"
      | "Africa/Malabo"
      | "Africa/Maputo"
      | "Africa/Maseru"
      | "Africa/Mbabane"
      | "Africa/Mogadishu"
      | "Africa/Monrovia"
      | "Africa/Nairobi"
      | "Africa/Ndjamena"
      | "Africa/Niamey"
      | "Africa/Nouakchott"
      | "Africa/Ouagadougou"
      | "Africa/Porto-Novo"
      | "Africa/Sao_Tome"
      | "Africa/Timbuktu"
      | "Africa/Tripoli"
      | "Africa/Tunis"
      | "Africa/Windhoek"
      | "America/Adak"
      | "America/Anchorage"
      | "America/Anguilla"
      | "America/Antigua"
      | "America/Araguaina"
      | "America/Argentina/Buenos_Aires"
      | "America/Argentina/Catamarca"
      | "America/Argentina/ComodRivadavia"
      | "America/Argentina/Cordoba"
      | "America/Argentina/Jujuy"
      | "America/Argentina/La_Rioja"
      | "America/Argentina/Mendoza"
      | "America/Argentina/Rio_Gallegos"
      | "America/Argentina/Salta"
      | "America/Argentina/San_Juan"
      | "America/Argentina/San_Luis"
      | "America/Argentina/Tucuman"
      | "America/Argentina/Ushuaia"
      | "America/Aruba"
      | "America/Asuncion"
      | "America/Atikokan"
      | "America/Atka"
      | "America/Bahia"
      | "America/Bahia_Banderas"
      | "America/Barbados"
      | "America/Belem"
      | "America/Belize"
      | "America/Blanc-Sablon"
      | "America/Boa_Vista"
      | "America/Bogota"
      | "America/Boise"
      | "America/Buenos_Aires"
      | "America/Cambridge_Bay"
      | "America/Campo_Grande"
      | "America/Cancun"
      | "America/Caracas"
      | "America/Catamarca"
      | "America/Cayenne"
      | "America/Cayman"
      | "America/Chicago"
      | "America/Chihuahua"
      | "America/Ciudad_Juarez"
      | "America/Coral_Harbour"
      | "America/Cordoba"
      | "America/Costa_Rica"
      | "America/Coyhaique"
      | "America/Creston"
      | "America/Cuiaba"
      | "America/Curacao"
      | "America/Danmarkshavn"
      | "America/Dawson"
      | "America/Dawson_Creek"
      | "America/Denver"
      | "America/Detroit"
      | "America/Dominica"
      | "America/Edmonton"
      | "America/Eirunepe"
      | "America/El_Salvador"
      | "America/Ensenada"
      | "America/Fort_Nelson"
      | "America/Fort_Wayne"
      | "America/Fortaleza"
      | "America/Glace_Bay"
      | "America/Godthab"
      | "America/Goose_Bay"
      | "America/Grand_Turk"
      | "America/Grenada"
      | "America/Guadeloupe"
      | "America/Guatemala"
      | "America/Guayaquil"
      | "America/Guyana"
      | "America/Halifax"
      | "America/Havana"
      | "America/Hermosillo"
      | "America/Indiana/Indianapolis"
      | "America/Indiana/Knox"
      | "America/Indiana/Marengo"
      | "America/Indiana/Petersburg"
      | "America/Indiana/Tell_City"
      | "America/Indiana/Vevay"
      | "America/Indiana/Vincennes"
      | "America/Indiana/Winamac"
      | "America/Indianapolis"
      | "America/Inuvik"
      | "America/Iqaluit"
      | "America/Jamaica"
      | "America/Jujuy"
      | "America/Juneau"
      | "America/Kentucky/Louisville"
      | "America/Kentucky/Monticello"
      | "America/Knox_IN"
      | "America/Kralendijk"
      | "America/La_Paz"
      | "America/Lima"
      | "America/Los_Angeles"
      | "America/Louisville"
      | "America/Lower_Princes"
      | "America/Maceio"
      | "America/Managua"
      | "America/Manaus"
      | "America/Marigot"
      | "America/Martinique"
      | "America/Matamoros"
      | "America/Mazatlan"
      | "America/Mendoza"
      | "America/Menominee"
      | "America/Merida"
      | "America/Metlakatla"
      | "America/Mexico_City"
      | "America/Miquelon"
      | "America/Moncton"
      | "America/Monterrey"
      | "America/Montevideo"
      | "America/Montreal"
      | "America/Montserrat"
      | "America/Nassau"
      | "America/New_York"
      | "America/Nipigon"
      | "America/Nome"
      | "America/Noronha"
      | "America/North_Dakota/Beulah"
      | "America/North_Dakota/Center"
      | "America/North_Dakota/New_Salem"
      | "America/Nuuk"
      | "America/Ojinaga"
      | "America/Panama"
      | "America/Pangnirtung"
      | "America/Paramaribo"
      | "America/Phoenix"
      | "America/Port-au-Prince"
      | "America/Port_of_Spain"
      | "America/Porto_Acre"
      | "America/Porto_Velho"
      | "America/Puerto_Rico"
      | "America/Punta_Arenas"
      | "America/Rainy_River"
      | "America/Rankin_Inlet"
      | "America/Recife"
      | "America/Regina"
      | "America/Resolute"
      | "America/Rio_Branco"
      | "America/Rosario"
      | "America/Santa_Isabel"
      | "America/Santarem"
      | "America/Santiago"
      | "America/Santo_Domingo"
      | "America/Sao_Paulo"
      | "America/Scoresbysund"
      | "America/Shiprock"
      | "America/Sitka"
      | "America/St_Barthelemy"
      | "America/St_Johns"
      | "America/St_Kitts"
      | "America/St_Lucia"
      | "America/St_Thomas"
      | "America/St_Vincent"
      | "America/Swift_Current"
      | "America/Tegucigalpa"
      | "America/Thule"
      | "America/Thunder_Bay"
      | "America/Tijuana"
      | "America/Toronto"
      | "America/Tortola"
      | "America/Vancouver"
      | "America/Virgin"
      | "America/Whitehorse"
      | "America/Winnipeg"
      | "America/Yakutat"
      | "America/Yellowknife"
      | "Antarctica/Casey"
      | "Antarctica/Davis"
      | "Antarctica/DumontDUrville"
      | "Antarctica/Macquarie"
      | "Antarctica/Mawson"
      | "Antarctica/McMurdo"
      | "Antarctica/Palmer"
      | "Antarctica/Rothera"
      | "Antarctica/South_Pole"
      | "Antarctica/Syowa"
      | "Antarctica/Troll"
      | "Antarctica/Vostok"
      | "Arctic/Longyearbyen"
      | "Asia/Aden"
      | "Asia/Almaty"
      | "Asia/Amman"
      | "Asia/Anadyr"
      | "Asia/Aqtau"
      | "Asia/Aqtobe"
      | "Asia/Ashgabat"
      | "Asia/Ashkhabad"
      | "Asia/Atyrau"
      | "Asia/Baghdad"
      | "Asia/Bahrain"
      | "Asia/Baku"
      | "Asia/Bangkok"
      | "Asia/Barnaul"
      | "Asia/Beirut"
      | "Asia/Bishkek"
      | "Asia/Brunei"
      | "Asia/Calcutta"
      | "Asia/Chita"
      | "Asia/Choibalsan"
      | "Asia/Chongqing"
      | "Asia/Chungking"
      | "Asia/Colombo"
      | "Asia/Dacca"
      | "Asia/Damascus"
      | "Asia/Dhaka"
      | "Asia/Dili"
      | "Asia/Dubai"
      | "Asia/Dushanbe"
      | "Asia/Famagusta"
      | "Asia/Gaza"
      | "Asia/Harbin"
      | "Asia/Hebron"
      | "Asia/Ho_Chi_Minh"
      | "Asia/Hong_Kong"
      | "Asia/Hovd"
      | "Asia/Irkutsk"
      | "Asia/Istanbul"
      | "Asia/Jakarta"
      | "Asia/Jayapura"
      | "Asia/Jerusalem"
      | "Asia/Kabul"
      | "Asia/Kamchatka"
      | "Asia/Karachi"
      | "Asia/Kashgar"
      | "Asia/Kathmandu"
      | "Asia/Katmandu"
      | "Asia/Khandyga"
      | "Asia/Kolkata"
      | "Asia/Krasnoyarsk"
      | "Asia/Kuala_Lumpur"
      | "Asia/Kuching"
      | "Asia/Kuwait"
      | "Asia/Macao"
      | "Asia/Macau"
      | "Asia/Magadan"
      | "Asia/Makassar"
      | "Asia/Manila"
      | "Asia/Muscat"
      | "Asia/Nicosia"
      | "Asia/Novokuznetsk"
      | "Asia/Novosibirsk"
      | "Asia/Omsk"
      | "Asia/Oral"
      | "Asia/Phnom_Penh"
      | "Asia/Pontianak"
      | "Asia/Pyongyang"
      | "Asia/Qatar"
      | "Asia/Qostanay"
      | "Asia/Qyzylorda"
      | "Asia/Rangoon"
      | "Asia/Riyadh"
      | "Asia/Saigon"
      | "Asia/Sakhalin"
      | "Asia/Samarkand"
      | "Asia/Seoul"
      | "Asia/Shanghai"
      | "Asia/Singapore"
      | "Asia/Srednekolymsk"
      | "Asia/Taipei"
      | "Asia/Tashkent"
      | "Asia/Tbilisi"
      | "Asia/Tehran"
      | "Asia/Tel_Aviv"
      | "Asia/Thimbu"
      | "Asia/Thimphu"
      | "Asia/Tokyo"
      | "Asia/Tomsk"
      | "Asia/Ujung_Pandang"
      | "Asia/Ulaanbaatar"
      | "Asia/Ulan_Bator"
      | "Asia/Urumqi"
      | "Asia/Ust-Nera"
      | "Asia/Vientiane"
      | "Asia/Vladivostok"
      | "Asia/Yakutsk"
      | "Asia/Yangon"
      | "Asia/Yekaterinburg"
      | "Asia/Yerevan"
      | "Atlantic/Azores"
      | "Atlantic/Bermuda"
      | "Atlantic/Canary"
      | "Atlantic/Cape_Verde"
      | "Atlantic/Faeroe"
      | "Atlantic/Faroe"
      | "Atlantic/Jan_Mayen"
      | "Atlantic/Madeira"
      | "Atlantic/Reykjavik"
      | "Atlantic/South_Georgia"
      | "Atlantic/St_Helena"
      | "Atlantic/Stanley"
      | "Australia/ACT"
      | "Australia/Adelaide"
      | "Australia/Brisbane"
      | "Australia/Broken_Hill"
      | "Australia/Canberra"
      | "Australia/Currie"
      | "Australia/Darwin"
      | "Australia/Eucla"
      | "Australia/Hobart"
      | "Australia/LHI"
      | "Australia/Lindeman"
      | "Australia/Lord_Howe"
      | "Australia/Melbourne"
      | "Australia/NSW"
      | "Australia/North"
      | "Australia/Perth"
      | "Australia/Queensland"
      | "Australia/South"
      | "Australia/Sydney"
      | "Australia/Tasmania"
      | "Australia/Victoria"
      | "Australia/West"
      | "Australia/Yancowinna"
      | "Brazil/Acre"
      | "Brazil/DeNoronha"
      | "Brazil/East"
      | "Brazil/West"
      | "CET"
      | "CST6CDT"
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon"
      | "Chile/Continental"
      | "Chile/EasterIsland"
      | "Cuba"
      | "EET"
      | "EST"
      | "EST5EDT"
      | "Egypt"
      | "Eire"
      | "Etc/GMT"
      | "Etc/GMT+0"
      | "Etc/GMT+1"
      | "Etc/GMT+10"
      | "Etc/GMT+11"
      | "Etc/GMT+12"
      | "Etc/GMT+2"
      | "Etc/GMT+3"
      | "Etc/GMT+4"
      | "Etc/GMT+5"
      | "Etc/GMT+6"
      | "Etc/GMT+7"
      | "Etc/GMT+8"
      | "Etc/GMT+9"
      | "Etc/GMT-0"
      | "Etc/GMT-1"
      | "Etc/GMT-10"
      | "Etc/GMT-11"
      | "Etc/GMT-12"
      | "Etc/GMT-13"
      | "Etc/GMT-14"
      | "Etc/GMT-2"
      | "Etc/GMT-3"
      | "Etc/GMT-4"
      | "Etc/GMT-5"
      | "Etc/GMT-6"
      | "Etc/GMT-7"
      | "Etc/GMT-8"
      | "Etc/GMT-9"
      | "Etc/GMT0"
      | "Etc/Greenwich"
      | "Etc/UCT"
      | "Etc/UTC"
      | "Etc/Universal"
      | "Etc/Zulu"
      | "Europe/Amsterdam"
      | "Europe/Andorra"
      | "Europe/Astrakhan"
      | "Europe/Athens"
      | "Europe/Belfast"
      | "Europe/Belgrade"
      | "Europe/Berlin"
      | "Europe/Bratislava"
      | "Europe/Brussels"
      | "Europe/Bucharest"
      | "Europe/Budapest"
      | "Europe/Busingen"
      | "Europe/Chisinau"
      | "Europe/Copenhagen"
      | "Europe/Dublin"
      | "Europe/Gibraltar"
      | "Europe/Guernsey"
      | "Europe/Helsinki"
      | "Europe/Isle_of_Man"
      | "Europe/Istanbul"
      | "Europe/Jersey"
      | "Europe/Kaliningrad"
      | "Europe/Kiev"
      | "Europe/Kirov"
      | "Europe/Kyiv"
      | "Europe/Lisbon"
      | "Europe/Ljubljana"
      | "Europe/London"
      | "Europe/Luxembourg"
      | "Europe/Madrid"
      | "Europe/Malta"
      | "Europe/Mariehamn"
      | "Europe/Minsk"
      | "Europe/Monaco"
      | "Europe/Moscow"
      | "Europe/Nicosia"
      | "Europe/Oslo"
      | "Europe/Paris"
      | "Europe/Podgorica"
      | "Europe/Prague"
      | "Europe/Riga"
      | "Europe/Rome"
      | "Europe/Samara"
      | "Europe/San_Marino"
      | "Europe/Sarajevo"
      | "Europe/Saratov"
      | "Europe/Simferopol"
      | "Europe/Skopje"
      | "Europe/Sofia"
      | "Europe/Stockholm"
      | "Europe/Tallinn"
      | "Europe/Tirane"
      | "Europe/Tiraspol"
      | "Europe/Ulyanovsk"
      | "Europe/Uzhgorod"
      | "Europe/Vaduz"
      | "Europe/Vatican"
      | "Europe/Vienna"
      | "Europe/Vilnius"
      | "Europe/Volgograd"
      | "Europe/Warsaw"
      | "Europe/Zagreb"
      | "Europe/Zaporozhye"
      | "Europe/Zurich"
      | "Factory"
      | "GB"
      | "GB-Eire"
      | "GMT"
      | "GMT+0"
      | "GMT-0"
      | "GMT0"
      | "Greenwich"
      | "HST"
      | "Hongkong"
      | "Iceland"
      | "Indian/Antananarivo"
      | "Indian/Chagos"
      | "Indian/Christmas"
      | "Indian/Cocos"
      | "Indian/Comoro"
      | "Indian/Kerguelen"
      | "Indian/Mahe"
      | "Indian/Maldives"
      | "Indian/Mauritius"
      | "Indian/Mayotte"
      | "Indian/Reunion"
      | "Iran"
      | "Israel"
      | "Jamaica"
      | "Japan"
      | "Kwajalein"
      | "Libya"
      | "MET"
      | "MST"
      | "MST7MDT"
      | "Mexico/BajaNorte"
      | "Mexico/BajaSur"
      | "Mexico/General"
      | "NZ"
      | "NZ-CHAT"
      | "Navajo"
      | "PRC"
      | "PST8PDT"
      | "Pacific/Apia"
      | "Pacific/Auckland"
      | "Pacific/Bougainville"
      | "Pacific/Chatham"
      | "Pacific/Chuuk"
      | "Pacific/Easter"
      | "Pacific/Efate"
      | "Pacific/Enderbury"
      | "Pacific/Fakaofo"
      | "Pacific/Fiji"
      | "Pacific/Funafuti"
      | "Pacific/Galapagos"
      | "Pacific/Gambier"
      | "Pacific/Guadalcanal"
      | "Pacific/Guam"
      | "Pacific/Honolulu"
      | "Pacific/Johnston"
      | "Pacific/Kanton"
      | "Pacific/Kiritimati"
      | "Pacific/Kosrae"
      | "Pacific/Kwajalein"
      | "Pacific/Majuro"
      | "Pacific/Marquesas"
      | "Pacific/Midway"
      | "Pacific/Nauru"
      | "Pacific/Niue"
      | "Pacific/Norfolk"
      | "Pacific/Noumea"
      | "Pacific/Pago_Pago"
      | "Pacific/Palau"
      | "Pacific/Pitcairn"
      | "Pacific/Pohnpei"
      | "Pacific/Ponape"
      | "Pacific/Port_Moresby"
      | "Pacific/Rarotonga"
      | "Pacific/Saipan"
      | "Pacific/Samoa"
      | "Pacific/Tahiti"
      | "Pacific/Tarawa"
      | "Pacific/Tongatapu"
      | "Pacific/Truk"
      | "Pacific/Wake"
      | "Pacific/Wallis"
      | "Pacific/Yap"
      | "Poland"
      | "Portugal"
      | "ROC"
      | "ROK"
      | "Singapore"
      | "Turkey"
      | "UCT"
      | "US/Alaska"
      | "US/Aleutian"
      | "US/Arizona"
      | "US/Central"
      | "US/East-Indiana"
      | "US/Eastern"
      | "US/Hawaii"
      | "US/Indiana-Starke"
      | "US/Michigan"
      | "US/Mountain"
      | "US/Pacific"
      | "US/Pacific-New"
      | "US/Samoa"
      | "UTC"
      | "Universal"
      | "W-SU"
      | "WET"
      | "Zulu";
  } & { readonly [x: string]: Schema.Json };
  readonly report_type: string;
};
export type PostReportingReportRunsOutput = Stripereporting_report_run;
export type PostReportingReportRunsError = Stripeerror;
export type GetReportingReportRunsReportRunInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly report_run: string;
};
export type GetReportingReportRunsReportRunOutput = Stripereporting_report_run;
export type GetReportingReportRunsReportRunError = Stripeerror;

export const GetReportingReportRunsInput = Schema.Struct({
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
});
export const GetReportingReportRunsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripereporting_report_run),
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
          new globalThis.RegExp("^\\/v1\\/reporting\\/report_runs", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\/v1\\/reporting\\/report_runs",
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
  title: "FinancialReportingFinanceReportRunList",
  description: "",
});
export const GetReportingReportRunsError = Stripeerror;
export const PostReportingReportRunsInput = Schema.Struct({
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
  parameters: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        columns: Schema.optionalKey(
          Schema.Array(
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
        ),
        connected_account: Schema.optionalKey(Schema.String),
        currency: Schema.optionalKey(
          Schema.String.annotate({ format: "currency" }),
        ),
        interval_end: Schema.optionalKey(
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
        ),
        interval_start: Schema.optionalKey(
          Schema.Number.annotate({ format: "unix-time" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
        ),
        payout: Schema.optionalKey(Schema.String),
        reporting_category: Schema.optionalKey(
          Schema.Literals([
            "advance",
            "advance_funding",
            "anticipation_repayment",
            "charge",
            "charge_failure",
            "climate_order_purchase",
            "climate_order_refund",
            "connect_collection_transfer",
            "connect_reserved_funds",
            "contribution",
            "dispute",
            "dispute_reversal",
            "fee",
            "financing_paydown",
            "financing_paydown_reversal",
            "financing_payout",
            "financing_payout_reversal",
            "issuing_authorization_hold",
            "issuing_authorization_release",
            "issuing_dispute",
            "issuing_transaction",
            "network_cost",
            "other_adjustment",
            "partial_capture_reversal",
            "payout",
            "payout_reversal",
            "platform_earning",
            "platform_earning_refund",
            "refund",
            "refund_failure",
            "risk_reserved_funds",
            "tax",
            "topup",
            "topup_reversal",
            "transfer",
            "transfer_reversal",
            "unreconciled_customer_funds",
          ]),
        ),
        timezone: Schema.optionalKey(
          Schema.Literals([
            "Africa/Abidjan",
            "Africa/Accra",
            "Africa/Addis_Ababa",
            "Africa/Algiers",
            "Africa/Asmara",
            "Africa/Asmera",
            "Africa/Bamako",
            "Africa/Bangui",
            "Africa/Banjul",
            "Africa/Bissau",
            "Africa/Blantyre",
            "Africa/Brazzaville",
            "Africa/Bujumbura",
            "Africa/Cairo",
            "Africa/Casablanca",
            "Africa/Ceuta",
            "Africa/Conakry",
            "Africa/Dakar",
            "Africa/Dar_es_Salaam",
            "Africa/Djibouti",
            "Africa/Douala",
            "Africa/El_Aaiun",
            "Africa/Freetown",
            "Africa/Gaborone",
            "Africa/Harare",
            "Africa/Johannesburg",
            "Africa/Juba",
            "Africa/Kampala",
            "Africa/Khartoum",
            "Africa/Kigali",
            "Africa/Kinshasa",
            "Africa/Lagos",
            "Africa/Libreville",
            "Africa/Lome",
            "Africa/Luanda",
            "Africa/Lubumbashi",
            "Africa/Lusaka",
            "Africa/Malabo",
            "Africa/Maputo",
            "Africa/Maseru",
            "Africa/Mbabane",
            "Africa/Mogadishu",
            "Africa/Monrovia",
            "Africa/Nairobi",
            "Africa/Ndjamena",
            "Africa/Niamey",
            "Africa/Nouakchott",
            "Africa/Ouagadougou",
            "Africa/Porto-Novo",
            "Africa/Sao_Tome",
            "Africa/Timbuktu",
            "Africa/Tripoli",
            "Africa/Tunis",
            "Africa/Windhoek",
            "America/Adak",
            "America/Anchorage",
            "America/Anguilla",
            "America/Antigua",
            "America/Araguaina",
            "America/Argentina/Buenos_Aires",
            "America/Argentina/Catamarca",
            "America/Argentina/ComodRivadavia",
            "America/Argentina/Cordoba",
            "America/Argentina/Jujuy",
            "America/Argentina/La_Rioja",
            "America/Argentina/Mendoza",
            "America/Argentina/Rio_Gallegos",
            "America/Argentina/Salta",
            "America/Argentina/San_Juan",
            "America/Argentina/San_Luis",
            "America/Argentina/Tucuman",
            "America/Argentina/Ushuaia",
            "America/Aruba",
            "America/Asuncion",
            "America/Atikokan",
            "America/Atka",
            "America/Bahia",
            "America/Bahia_Banderas",
            "America/Barbados",
            "America/Belem",
            "America/Belize",
            "America/Blanc-Sablon",
            "America/Boa_Vista",
            "America/Bogota",
            "America/Boise",
            "America/Buenos_Aires",
            "America/Cambridge_Bay",
            "America/Campo_Grande",
            "America/Cancun",
            "America/Caracas",
            "America/Catamarca",
            "America/Cayenne",
            "America/Cayman",
            "America/Chicago",
            "America/Chihuahua",
            "America/Ciudad_Juarez",
            "America/Coral_Harbour",
            "America/Cordoba",
            "America/Costa_Rica",
            "America/Coyhaique",
            "America/Creston",
            "America/Cuiaba",
            "America/Curacao",
            "America/Danmarkshavn",
            "America/Dawson",
            "America/Dawson_Creek",
            "America/Denver",
            "America/Detroit",
            "America/Dominica",
            "America/Edmonton",
            "America/Eirunepe",
            "America/El_Salvador",
            "America/Ensenada",
            "America/Fort_Nelson",
            "America/Fort_Wayne",
            "America/Fortaleza",
            "America/Glace_Bay",
            "America/Godthab",
            "America/Goose_Bay",
            "America/Grand_Turk",
            "America/Grenada",
            "America/Guadeloupe",
            "America/Guatemala",
            "America/Guayaquil",
            "America/Guyana",
            "America/Halifax",
            "America/Havana",
            "America/Hermosillo",
            "America/Indiana/Indianapolis",
            "America/Indiana/Knox",
            "America/Indiana/Marengo",
            "America/Indiana/Petersburg",
            "America/Indiana/Tell_City",
            "America/Indiana/Vevay",
            "America/Indiana/Vincennes",
            "America/Indiana/Winamac",
            "America/Indianapolis",
            "America/Inuvik",
            "America/Iqaluit",
            "America/Jamaica",
            "America/Jujuy",
            "America/Juneau",
            "America/Kentucky/Louisville",
            "America/Kentucky/Monticello",
            "America/Knox_IN",
            "America/Kralendijk",
            "America/La_Paz",
            "America/Lima",
            "America/Los_Angeles",
            "America/Louisville",
            "America/Lower_Princes",
            "America/Maceio",
            "America/Managua",
            "America/Manaus",
            "America/Marigot",
            "America/Martinique",
            "America/Matamoros",
            "America/Mazatlan",
            "America/Mendoza",
            "America/Menominee",
            "America/Merida",
            "America/Metlakatla",
            "America/Mexico_City",
            "America/Miquelon",
            "America/Moncton",
            "America/Monterrey",
            "America/Montevideo",
            "America/Montreal",
            "America/Montserrat",
            "America/Nassau",
            "America/New_York",
            "America/Nipigon",
            "America/Nome",
            "America/Noronha",
            "America/North_Dakota/Beulah",
            "America/North_Dakota/Center",
            "America/North_Dakota/New_Salem",
            "America/Nuuk",
            "America/Ojinaga",
            "America/Panama",
            "America/Pangnirtung",
            "America/Paramaribo",
            "America/Phoenix",
            "America/Port-au-Prince",
            "America/Port_of_Spain",
            "America/Porto_Acre",
            "America/Porto_Velho",
            "America/Puerto_Rico",
            "America/Punta_Arenas",
            "America/Rainy_River",
            "America/Rankin_Inlet",
            "America/Recife",
            "America/Regina",
            "America/Resolute",
            "America/Rio_Branco",
            "America/Rosario",
            "America/Santa_Isabel",
            "America/Santarem",
            "America/Santiago",
            "America/Santo_Domingo",
            "America/Sao_Paulo",
            "America/Scoresbysund",
            "America/Shiprock",
            "America/Sitka",
            "America/St_Barthelemy",
            "America/St_Johns",
            "America/St_Kitts",
            "America/St_Lucia",
            "America/St_Thomas",
            "America/St_Vincent",
            "America/Swift_Current",
            "America/Tegucigalpa",
            "America/Thule",
            "America/Thunder_Bay",
            "America/Tijuana",
            "America/Toronto",
            "America/Tortola",
            "America/Vancouver",
            "America/Virgin",
            "America/Whitehorse",
            "America/Winnipeg",
            "America/Yakutat",
            "America/Yellowknife",
            "Antarctica/Casey",
            "Antarctica/Davis",
            "Antarctica/DumontDUrville",
            "Antarctica/Macquarie",
            "Antarctica/Mawson",
            "Antarctica/McMurdo",
            "Antarctica/Palmer",
            "Antarctica/Rothera",
            "Antarctica/South_Pole",
            "Antarctica/Syowa",
            "Antarctica/Troll",
            "Antarctica/Vostok",
            "Arctic/Longyearbyen",
            "Asia/Aden",
            "Asia/Almaty",
            "Asia/Amman",
            "Asia/Anadyr",
            "Asia/Aqtau",
            "Asia/Aqtobe",
            "Asia/Ashgabat",
            "Asia/Ashkhabad",
            "Asia/Atyrau",
            "Asia/Baghdad",
            "Asia/Bahrain",
            "Asia/Baku",
            "Asia/Bangkok",
            "Asia/Barnaul",
            "Asia/Beirut",
            "Asia/Bishkek",
            "Asia/Brunei",
            "Asia/Calcutta",
            "Asia/Chita",
            "Asia/Choibalsan",
            "Asia/Chongqing",
            "Asia/Chungking",
            "Asia/Colombo",
            "Asia/Dacca",
            "Asia/Damascus",
            "Asia/Dhaka",
            "Asia/Dili",
            "Asia/Dubai",
            "Asia/Dushanbe",
            "Asia/Famagusta",
            "Asia/Gaza",
            "Asia/Harbin",
            "Asia/Hebron",
            "Asia/Ho_Chi_Minh",
            "Asia/Hong_Kong",
            "Asia/Hovd",
            "Asia/Irkutsk",
            "Asia/Istanbul",
            "Asia/Jakarta",
            "Asia/Jayapura",
            "Asia/Jerusalem",
            "Asia/Kabul",
            "Asia/Kamchatka",
            "Asia/Karachi",
            "Asia/Kashgar",
            "Asia/Kathmandu",
            "Asia/Katmandu",
            "Asia/Khandyga",
            "Asia/Kolkata",
            "Asia/Krasnoyarsk",
            "Asia/Kuala_Lumpur",
            "Asia/Kuching",
            "Asia/Kuwait",
            "Asia/Macao",
            "Asia/Macau",
            "Asia/Magadan",
            "Asia/Makassar",
            "Asia/Manila",
            "Asia/Muscat",
            "Asia/Nicosia",
            "Asia/Novokuznetsk",
            "Asia/Novosibirsk",
            "Asia/Omsk",
            "Asia/Oral",
            "Asia/Phnom_Penh",
            "Asia/Pontianak",
            "Asia/Pyongyang",
            "Asia/Qatar",
            "Asia/Qostanay",
            "Asia/Qyzylorda",
            "Asia/Rangoon",
            "Asia/Riyadh",
            "Asia/Saigon",
            "Asia/Sakhalin",
            "Asia/Samarkand",
            "Asia/Seoul",
            "Asia/Shanghai",
            "Asia/Singapore",
            "Asia/Srednekolymsk",
            "Asia/Taipei",
            "Asia/Tashkent",
            "Asia/Tbilisi",
            "Asia/Tehran",
            "Asia/Tel_Aviv",
            "Asia/Thimbu",
            "Asia/Thimphu",
            "Asia/Tokyo",
            "Asia/Tomsk",
            "Asia/Ujung_Pandang",
            "Asia/Ulaanbaatar",
            "Asia/Ulan_Bator",
            "Asia/Urumqi",
            "Asia/Ust-Nera",
            "Asia/Vientiane",
            "Asia/Vladivostok",
            "Asia/Yakutsk",
            "Asia/Yangon",
            "Asia/Yekaterinburg",
            "Asia/Yerevan",
            "Atlantic/Azores",
            "Atlantic/Bermuda",
            "Atlantic/Canary",
            "Atlantic/Cape_Verde",
            "Atlantic/Faeroe",
            "Atlantic/Faroe",
            "Atlantic/Jan_Mayen",
            "Atlantic/Madeira",
            "Atlantic/Reykjavik",
            "Atlantic/South_Georgia",
            "Atlantic/St_Helena",
            "Atlantic/Stanley",
            "Australia/ACT",
            "Australia/Adelaide",
            "Australia/Brisbane",
            "Australia/Broken_Hill",
            "Australia/Canberra",
            "Australia/Currie",
            "Australia/Darwin",
            "Australia/Eucla",
            "Australia/Hobart",
            "Australia/LHI",
            "Australia/Lindeman",
            "Australia/Lord_Howe",
            "Australia/Melbourne",
            "Australia/NSW",
            "Australia/North",
            "Australia/Perth",
            "Australia/Queensland",
            "Australia/South",
            "Australia/Sydney",
            "Australia/Tasmania",
            "Australia/Victoria",
            "Australia/West",
            "Australia/Yancowinna",
            "Brazil/Acre",
            "Brazil/DeNoronha",
            "Brazil/East",
            "Brazil/West",
            "CET",
            "CST6CDT",
            "Canada/Atlantic",
            "Canada/Central",
            "Canada/Eastern",
            "Canada/Mountain",
            "Canada/Newfoundland",
            "Canada/Pacific",
            "Canada/Saskatchewan",
            "Canada/Yukon",
            "Chile/Continental",
            "Chile/EasterIsland",
            "Cuba",
            "EET",
            "EST",
            "EST5EDT",
            "Egypt",
            "Eire",
            "Etc/GMT",
            "Etc/GMT+0",
            "Etc/GMT+1",
            "Etc/GMT+10",
            "Etc/GMT+11",
            "Etc/GMT+12",
            "Etc/GMT+2",
            "Etc/GMT+3",
            "Etc/GMT+4",
            "Etc/GMT+5",
            "Etc/GMT+6",
            "Etc/GMT+7",
            "Etc/GMT+8",
            "Etc/GMT+9",
            "Etc/GMT-0",
            "Etc/GMT-1",
            "Etc/GMT-10",
            "Etc/GMT-11",
            "Etc/GMT-12",
            "Etc/GMT-13",
            "Etc/GMT-14",
            "Etc/GMT-2",
            "Etc/GMT-3",
            "Etc/GMT-4",
            "Etc/GMT-5",
            "Etc/GMT-6",
            "Etc/GMT-7",
            "Etc/GMT-8",
            "Etc/GMT-9",
            "Etc/GMT0",
            "Etc/Greenwich",
            "Etc/UCT",
            "Etc/UTC",
            "Etc/Universal",
            "Etc/Zulu",
            "Europe/Amsterdam",
            "Europe/Andorra",
            "Europe/Astrakhan",
            "Europe/Athens",
            "Europe/Belfast",
            "Europe/Belgrade",
            "Europe/Berlin",
            "Europe/Bratislava",
            "Europe/Brussels",
            "Europe/Bucharest",
            "Europe/Budapest",
            "Europe/Busingen",
            "Europe/Chisinau",
            "Europe/Copenhagen",
            "Europe/Dublin",
            "Europe/Gibraltar",
            "Europe/Guernsey",
            "Europe/Helsinki",
            "Europe/Isle_of_Man",
            "Europe/Istanbul",
            "Europe/Jersey",
            "Europe/Kaliningrad",
            "Europe/Kiev",
            "Europe/Kirov",
            "Europe/Kyiv",
            "Europe/Lisbon",
            "Europe/Ljubljana",
            "Europe/London",
            "Europe/Luxembourg",
            "Europe/Madrid",
            "Europe/Malta",
            "Europe/Mariehamn",
            "Europe/Minsk",
            "Europe/Monaco",
            "Europe/Moscow",
            "Europe/Nicosia",
            "Europe/Oslo",
            "Europe/Paris",
            "Europe/Podgorica",
            "Europe/Prague",
            "Europe/Riga",
            "Europe/Rome",
            "Europe/Samara",
            "Europe/San_Marino",
            "Europe/Sarajevo",
            "Europe/Saratov",
            "Europe/Simferopol",
            "Europe/Skopje",
            "Europe/Sofia",
            "Europe/Stockholm",
            "Europe/Tallinn",
            "Europe/Tirane",
            "Europe/Tiraspol",
            "Europe/Ulyanovsk",
            "Europe/Uzhgorod",
            "Europe/Vaduz",
            "Europe/Vatican",
            "Europe/Vienna",
            "Europe/Vilnius",
            "Europe/Volgograd",
            "Europe/Warsaw",
            "Europe/Zagreb",
            "Europe/Zaporozhye",
            "Europe/Zurich",
            "Factory",
            "GB",
            "GB-Eire",
            "GMT",
            "GMT+0",
            "GMT-0",
            "GMT0",
            "Greenwich",
            "HST",
            "Hongkong",
            "Iceland",
            "Indian/Antananarivo",
            "Indian/Chagos",
            "Indian/Christmas",
            "Indian/Cocos",
            "Indian/Comoro",
            "Indian/Kerguelen",
            "Indian/Mahe",
            "Indian/Maldives",
            "Indian/Mauritius",
            "Indian/Mayotte",
            "Indian/Reunion",
            "Iran",
            "Israel",
            "Jamaica",
            "Japan",
            "Kwajalein",
            "Libya",
            "MET",
            "MST",
            "MST7MDT",
            "Mexico/BajaNorte",
            "Mexico/BajaSur",
            "Mexico/General",
            "NZ",
            "NZ-CHAT",
            "Navajo",
            "PRC",
            "PST8PDT",
            "Pacific/Apia",
            "Pacific/Auckland",
            "Pacific/Bougainville",
            "Pacific/Chatham",
            "Pacific/Chuuk",
            "Pacific/Easter",
            "Pacific/Efate",
            "Pacific/Enderbury",
            "Pacific/Fakaofo",
            "Pacific/Fiji",
            "Pacific/Funafuti",
            "Pacific/Galapagos",
            "Pacific/Gambier",
            "Pacific/Guadalcanal",
            "Pacific/Guam",
            "Pacific/Honolulu",
            "Pacific/Johnston",
            "Pacific/Kanton",
            "Pacific/Kiritimati",
            "Pacific/Kosrae",
            "Pacific/Kwajalein",
            "Pacific/Majuro",
            "Pacific/Marquesas",
            "Pacific/Midway",
            "Pacific/Nauru",
            "Pacific/Niue",
            "Pacific/Norfolk",
            "Pacific/Noumea",
            "Pacific/Pago_Pago",
            "Pacific/Palau",
            "Pacific/Pitcairn",
            "Pacific/Pohnpei",
            "Pacific/Ponape",
            "Pacific/Port_Moresby",
            "Pacific/Rarotonga",
            "Pacific/Saipan",
            "Pacific/Samoa",
            "Pacific/Tahiti",
            "Pacific/Tarawa",
            "Pacific/Tongatapu",
            "Pacific/Truk",
            "Pacific/Wake",
            "Pacific/Wallis",
            "Pacific/Yap",
            "Poland",
            "Portugal",
            "ROC",
            "ROK",
            "Singapore",
            "Turkey",
            "UCT",
            "US/Alaska",
            "US/Aleutian",
            "US/Arizona",
            "US/Central",
            "US/East-Indiana",
            "US/Eastern",
            "US/Hawaii",
            "US/Indiana-Starke",
            "US/Michigan",
            "US/Mountain",
            "US/Pacific",
            "US/Pacific-New",
            "US/Samoa",
            "UTC",
            "Universal",
            "W-SU",
            "WET",
            "Zulu",
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
      title: "run_parameter_specs",
      description:
        "Parameters specifying how the report should be run. Different Report Types have different required and optional parameters, listed in the [API Access to Reports](https://docs.stripe.com/reporting/statements/api) documentation.",
    }),
  ),
  report_type: Schema.String.annotate({
    description:
      'The ID of the [report type](https://docs.stripe.com/reporting/statements/api#report-types) to run, such as `"balance.summary.1"`.',
  }),
});
export const PostReportingReportRunsOutput = Stripereporting_report_run;
export const PostReportingReportRunsError = Stripeerror;
export const GetReportingReportRunsReportRunInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  report_run: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetReportingReportRunsReportRunOutput = Stripereporting_report_run;
export const GetReportingReportRunsReportRunError = Stripeerror;
/**
 * The GetReportingReportRunsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetReportingReportRunsOperation: StripeOperation & {
  readonly input: typeof GetReportingReportRunsInput;
  readonly output: typeof GetReportingReportRunsOutput;
  readonly error: typeof GetReportingReportRunsError;
} = {
  name: "GetReportingReportRuns",
  method: "GET",
  path: "/v1/reporting/report_runs",
  pathParameters: [],
  queryParameters: [
    "created",
    "ending_before",
    "expand",
    "limit",
    "starting_after",
  ],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetReportingReportRunsInput,
  output: GetReportingReportRunsOutput,
  error: GetReportingReportRunsError,
};
/**
 * The PostReportingReportRunsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostReportingReportRunsOperation: StripeOperation & {
  readonly input: typeof PostReportingReportRunsInput;
  readonly output: typeof PostReportingReportRunsOutput;
  readonly error: typeof PostReportingReportRunsError;
} = {
  name: "PostReportingReportRuns",
  method: "POST",
  path: "/v1/reporting/report_runs",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostReportingReportRunsInput,
  output: PostReportingReportRunsOutput,
  error: PostReportingReportRunsError,
};
/**
 * The GetReportingReportRunsReportRunOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetReportingReportRunsReportRunOperation: StripeOperation & {
  readonly input: typeof GetReportingReportRunsReportRunInput;
  readonly output: typeof GetReportingReportRunsReportRunOutput;
  readonly error: typeof GetReportingReportRunsReportRunError;
} = {
  name: "GetReportingReportRunsReportRun",
  method: "GET",
  path: "/v1/reporting/report_runs/{report_run}",
  pathParameters: ["report_run"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetReportingReportRunsReportRunInput,
  output: GetReportingReportRunsReportRunOutput,
  error: GetReportingReportRunsReportRunError,
};
/**
 * The makeReportingReportRunsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeReportingReportRunsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetReportingReportRuns function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetReportingReportRuns = Effect.fn(
    "reportingReportRuns.GetReportingReportRuns",
  )(function* (input: GetReportingReportRunsInput) {
    const response: GetReportingReportRunsOutput = yield* client.invoke(
      GetReportingReportRunsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostReportingReportRuns function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostReportingReportRuns = Effect.fn(
    "reportingReportRuns.PostReportingReportRuns",
  )(function* (input: PostReportingReportRunsInput) {
    const response: PostReportingReportRunsOutput = yield* client.invoke(
      PostReportingReportRunsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetReportingReportRunsReportRun function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetReportingReportRunsReportRun = Effect.fn(
    "reportingReportRuns.GetReportingReportRunsReportRun",
  )(function* (input: GetReportingReportRunsReportRunInput) {
    const response: GetReportingReportRunsReportRunOutput =
      yield* client.invoke(GetReportingReportRunsReportRunOperation, input);
    return response;
  });
  return {
    GetReportingReportRuns,
    PostReportingReportRuns,
    GetReportingReportRunsReportRun,
  };
});
