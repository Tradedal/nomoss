// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_money_management_inbound_transfer } from "./models/common.js";
import {
  Stripev2_error,
  Stripev2_error_financial_account_operation_unsupported_for_property,
  Stripev2_error_financial_account_operation_unsupported_for_type,
  Stripev2_error_idempotency_error,
  Stripev2_error_inbound_transfer_from_closed_financial_account_unsupported,
  Stripev2_error_inbound_transfer_from_payment_method_mandate_inactive,
  Stripev2_error_inbound_transfer_from_payment_method_not_found,
  Stripev2_error_inbound_transfer_from_payment_method_type_unsupported,
  Stripev2_error_inbound_transfer_from_payment_method_unusable,
  Stripev2_error_inbound_transfer_from_payment_method_unverified,
  Stripev2_error_inbound_transfer_not_allowed,
  Stripev2_error_inbound_transfer_to_financial_account_not_found,
  Stripev2_error_not_found,
  Stripev2_error_unsupported_operation_with_managed_financial_account,
} from "./models/v2Errors.js";

export type GetV2MoneyManagementInboundTransfersInput = {
  readonly created?: {
    readonly gt?: string;
    readonly gte?: string;
    readonly lt?: string;
    readonly lte?: string;
  } & { readonly [x: string]: Schema.Json };
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2MoneyManagementInboundTransfersOutput = {
  readonly data: ReadonlyArray<Stripev2_money_management_inbound_transfer>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2MoneyManagementInboundTransfersError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2MoneyManagementInboundTransfersInput = {
  readonly amount: { readonly currency: string; readonly value: number } & {
    readonly [x: string]: Schema.Json;
  };
  readonly description?: string;
  readonly from: {
    readonly currency?: string;
    readonly payment_method: string;
  } & { readonly [x: string]: Schema.Json };
  readonly to: {
    readonly currency: string;
    readonly financial_account: string;
  } & { readonly [x: string]: Schema.Json };
};
export type PostV2MoneyManagementInboundTransfersOutput =
  Stripev2_money_management_inbound_transfer;
export type PostV2MoneyManagementInboundTransfersError =
  | Stripev2_error_financial_account_operation_unsupported_for_property
  | Stripev2_error_financial_account_operation_unsupported_for_type
  | Stripev2_error_idempotency_error
  | Stripev2_error_inbound_transfer_from_closed_financial_account_unsupported
  | Stripev2_error_inbound_transfer_from_payment_method_mandate_inactive
  | Stripev2_error_inbound_transfer_from_payment_method_not_found
  | Stripev2_error_inbound_transfer_from_payment_method_type_unsupported
  | Stripev2_error_inbound_transfer_from_payment_method_unusable
  | Stripev2_error_inbound_transfer_from_payment_method_unverified
  | Stripev2_error_inbound_transfer_not_allowed
  | Stripev2_error_inbound_transfer_to_financial_account_not_found
  | Stripev2_error_not_found
  | Stripev2_error_unsupported_operation_with_managed_financial_account
  | Stripev2_error;
export type GetV2MoneyManagementInboundTransfersIdInput = {
  readonly id: string;
};
export type GetV2MoneyManagementInboundTransfersIdOutput =
  Stripev2_money_management_inbound_transfer;
export type GetV2MoneyManagementInboundTransfersIdError =
  | Stripev2_error_not_found
  | Stripev2_error;

export const GetV2MoneyManagementInboundTransfersInput = Schema.Struct({
  created: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        gt: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created after the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        gte: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created on or after the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        lt: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created before the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
        lte: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Filter for objects created on or before the specified timestamp.\nMust be an RFC 3339 date & time value, for example: 2022-09-18T13:22:00Z.",
            format: "date-time",
          }),
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ),
  ),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2MoneyManagementInboundTransfersOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_money_management_inbound_transfer).annotate({
      description: "The list of retrieved InboundTransfers.",
    }),
    next_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the next page of the list. If there are no more pages, the value is null.",
      }),
      Schema.Null,
    ]),
    previous_page_url: Schema.Union([
      Schema.String.annotate({
        description:
          "URL to fetch the previous page of the list. If there are no previous pages, the value is null.",
      }),
      Schema.Null,
    ]),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);
export const GetV2MoneyManagementInboundTransfersError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2MoneyManagementInboundTransfersInput = Schema.Struct({
  amount: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description:
          "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      }),
      value: Schema.Number.annotate({
        description:
          "A non-negative integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#minor-units).",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description: "The amount and currency to credit to the FinancialAccount.",
  }),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An optional, freeform description field intended to store metadata.",
    }),
  ),
  from: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "An optional currency field used to specify which currency is debited from the Payment Method.\nSince many Payment Methods support only one currency, this field is optional.",
        }),
      ),
      payment_method: Schema.String.annotate({
        description:
          "ID of the verified bank account credential to debit for this InboundTransfer (for example, `usba_`), not a Payments API `pm_` PaymentMethod.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The verified bank account credential to debit for this InboundTransfer.",
  }),
  to: Schema.StructWithRest(
    Schema.Struct({
      currency: Schema.String.annotate({
        description: "The currency to credit to the FinancialAccount.",
      }),
      financial_account: Schema.String.annotate({
        description: "The FinancialAccount that receives the funds.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    description:
      "The FinancialAccount and currency to credit with the transferred funds.",
  }),
});
export const PostV2MoneyManagementInboundTransfersOutput =
  Stripev2_money_management_inbound_transfer;
export const PostV2MoneyManagementInboundTransfersError = Schema.Union(
  [
    Stripev2_error_financial_account_operation_unsupported_for_property,
    Stripev2_error_financial_account_operation_unsupported_for_type,
    Stripev2_error_idempotency_error,
    Stripev2_error_inbound_transfer_from_closed_financial_account_unsupported,
    Stripev2_error_inbound_transfer_from_payment_method_mandate_inactive,
    Stripev2_error_inbound_transfer_from_payment_method_not_found,
    Stripev2_error_inbound_transfer_from_payment_method_type_unsupported,
    Stripev2_error_inbound_transfer_from_payment_method_unusable,
    Stripev2_error_inbound_transfer_from_payment_method_unverified,
    Stripev2_error_inbound_transfer_not_allowed,
    Stripev2_error_inbound_transfer_to_financial_account_not_found,
    Stripev2_error_not_found,
    Stripev2_error_unsupported_operation_with_managed_financial_account,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2MoneyManagementInboundTransfersIdInput = Schema.Struct({
  id: Schema.String,
});
export const GetV2MoneyManagementInboundTransfersIdOutput =
  Stripev2_money_management_inbound_transfer;
export const GetV2MoneyManagementInboundTransfersIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
/**
 * The GetV2MoneyManagementInboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementInboundTransfersOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementInboundTransfersInput;
  readonly output: typeof GetV2MoneyManagementInboundTransfersOutput;
  readonly error: typeof GetV2MoneyManagementInboundTransfersError;
} = {
  name: "GetV2MoneyManagementInboundTransfers",
  method: "GET",
  path: "/v2/money_management/inbound_transfers",
  pathParameters: [],
  queryParameters: ["created", "limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementInboundTransfersInput,
  output: GetV2MoneyManagementInboundTransfersOutput,
  error: GetV2MoneyManagementInboundTransfersError,
};
/**
 * The PostV2MoneyManagementInboundTransfersOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2MoneyManagementInboundTransfersOperation: StripeOperation & {
  readonly input: typeof PostV2MoneyManagementInboundTransfersInput;
  readonly output: typeof PostV2MoneyManagementInboundTransfersOutput;
  readonly error: typeof PostV2MoneyManagementInboundTransfersError;
} = {
  name: "PostV2MoneyManagementInboundTransfers",
  method: "POST",
  path: "/v2/money_management/inbound_transfers",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2MoneyManagementInboundTransfersInput,
  output: PostV2MoneyManagementInboundTransfersOutput,
  error: PostV2MoneyManagementInboundTransfersError,
};
/**
 * The GetV2MoneyManagementInboundTransfersIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2MoneyManagementInboundTransfersIdOperation: StripeOperation & {
  readonly input: typeof GetV2MoneyManagementInboundTransfersIdInput;
  readonly output: typeof GetV2MoneyManagementInboundTransfersIdOutput;
  readonly error: typeof GetV2MoneyManagementInboundTransfersIdError;
} = {
  name: "GetV2MoneyManagementInboundTransfersId",
  method: "GET",
  path: "/v2/money_management/inbound_transfers/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2MoneyManagementInboundTransfersIdInput,
  output: GetV2MoneyManagementInboundTransfersIdOutput,
  error: GetV2MoneyManagementInboundTransfersIdError,
};
/**
 * The makeMoneyManagementInboundTransfersClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeMoneyManagementInboundTransfersClient = Effect.gen(
  function* () {
    const client = yield* StripeClient;
    /**
     * The GetV2MoneyManagementInboundTransfers function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementInboundTransfers = Effect.fn(
      "moneyManagementInboundTransfers.GetV2MoneyManagementInboundTransfers",
    )(function* (input: GetV2MoneyManagementInboundTransfersInput) {
      const response: GetV2MoneyManagementInboundTransfersOutput =
        yield* client.invoke(
          GetV2MoneyManagementInboundTransfersOperation,
          input,
        );
      return response;
    });
    /**
     * The PostV2MoneyManagementInboundTransfers function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const PostV2MoneyManagementInboundTransfers = Effect.fn(
      "moneyManagementInboundTransfers.PostV2MoneyManagementInboundTransfers",
    )(function* (input: PostV2MoneyManagementInboundTransfersInput) {
      const response: PostV2MoneyManagementInboundTransfersOutput =
        yield* client.invoke(
          PostV2MoneyManagementInboundTransfersOperation,
          input,
        );
      return response;
    });
    /**
     * The GetV2MoneyManagementInboundTransfersId function validates its request before it invokes Stripe.
     * The result is the decoded response. Failures in transport or validation
     * and modeled Stripe errors propagate to the caller.
     */
    const GetV2MoneyManagementInboundTransfersId = Effect.fn(
      "moneyManagementInboundTransfers.GetV2MoneyManagementInboundTransfersId",
    )(function* (input: GetV2MoneyManagementInboundTransfersIdInput) {
      const response: GetV2MoneyManagementInboundTransfersIdOutput =
        yield* client.invoke(
          GetV2MoneyManagementInboundTransfersIdOperation,
          input,
        );
      return response;
    });
    return {
      GetV2MoneyManagementInboundTransfers,
      PostV2MoneyManagementInboundTransfers,
      GetV2MoneyManagementInboundTransfersId,
    };
  },
);
