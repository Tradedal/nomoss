// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import { Stripev2_deleted_object } from "./models/common.js";
import {
  Stripev2_core_event,
  Stripev2_core_event_destination,
} from "./models/v2Accounts.js";
import {
  Stripev2_error,
  Stripev2_error_expired_azure_partner_authorization,
  Stripev2_error_idempotency_error,
  Stripev2_error_invalid_azure_partner_authorization,
  Stripev2_error_invalid_azure_partner_configuration,
  Stripev2_error_not_found,
} from "./models/v2Errors.js";

export type GetV2CoreEventDestinationsInput = {
  readonly include?: ReadonlyArray<"webhook_endpoint.url">;
  readonly limit?: number;
  readonly page?: string;
};
export type GetV2CoreEventDestinationsOutput = {
  readonly data: ReadonlyArray<Stripev2_core_event_destination>;
  readonly next_page_url: string | null;
  readonly previous_page_url: string | null;
} & { readonly [x: string]: Schema.Json };
export type GetV2CoreEventDestinationsError = Stripev2_error;
export type PostV2CoreEventDestinationsInput = {
  readonly amazon_eventbridge?: {
    readonly aws_account_id: string;
    readonly aws_region: string;
  } & { readonly [x: string]: Schema.Json };
  readonly azure_event_grid?: {
    readonly azure_region: string;
    readonly azure_resource_group_name: string;
    readonly azure_subscription_id: string;
  } & { readonly [x: string]: Schema.Json };
  readonly description?: string;
  readonly enabled_events: ReadonlyArray<string>;
  readonly event_payload: "snapshot" | "thin";
  readonly events_from?: ReadonlyArray<string>;
  readonly include?: ReadonlyArray<
    "webhook_endpoint.signing_secret" | "webhook_endpoint.url"
  >;
  readonly metadata?: { readonly [x: string]: string };
  readonly name: string;
  readonly snapshot_api_version?: string;
  readonly type: "amazon_eventbridge" | "azure_event_grid" | "webhook_endpoint";
  readonly webhook_endpoint?: { readonly url: string } & {
    readonly [x: string]: Schema.Json;
  };
};
export type PostV2CoreEventDestinationsOutput = Stripev2_core_event_destination;
export type PostV2CoreEventDestinationsError =
  | Stripev2_error_expired_azure_partner_authorization
  | Stripev2_error_idempotency_error
  | Stripev2_error_invalid_azure_partner_authorization
  | Stripev2_error_invalid_azure_partner_configuration
  | Stripev2_error;
export type GetV2CoreEventDestinationsIdInput = {
  readonly id: string;
  readonly include?: ReadonlyArray<"webhook_endpoint.url">;
};
export type GetV2CoreEventDestinationsIdOutput =
  Stripev2_core_event_destination;
export type GetV2CoreEventDestinationsIdError =
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreEventDestinationsIdInput = {
  readonly description?: string;
  readonly enabled_events?: ReadonlyArray<string>;
  readonly include?: ReadonlyArray<"webhook_endpoint.url">;
  readonly metadata?: { readonly [x: string]: string | null };
  readonly name?: string;
  readonly webhook_endpoint?: { readonly url: string } & {
    readonly [x: string]: Schema.Json;
  };
  readonly id: string;
};
export type PostV2CoreEventDestinationsIdOutput =
  Stripev2_core_event_destination;
export type PostV2CoreEventDestinationsIdError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error;
export type DeleteV2CoreEventDestinationsIdInput = { readonly id: string };
export type DeleteV2CoreEventDestinationsIdOutput = Stripev2_deleted_object;
export type DeleteV2CoreEventDestinationsIdError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreEventDestinationsIdDisableInput = { readonly id: string };
export type PostV2CoreEventDestinationsIdDisableOutput =
  Stripev2_core_event_destination;
export type PostV2CoreEventDestinationsIdDisableError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreEventDestinationsIdEnableInput = { readonly id: string };
export type PostV2CoreEventDestinationsIdEnableOutput =
  Stripev2_core_event_destination;
export type PostV2CoreEventDestinationsIdEnableError =
  | Stripev2_error_idempotency_error
  | Stripev2_error_not_found
  | Stripev2_error;
export type PostV2CoreEventDestinationsIdPingInput = { readonly id: string };
export type PostV2CoreEventDestinationsIdPingOutput = Stripev2_core_event;
export type PostV2CoreEventDestinationsIdPingError =
  | Stripev2_error_not_found
  | Stripev2_error;

export const GetV2CoreEventDestinationsInput = Schema.Struct({
  include: Schema.optionalKey(
    Schema.Array(Schema.Literal("webhook_endpoint.url")),
  ),
  limit: Schema.optionalKey(Schema.Int),
  page: Schema.optionalKey(Schema.String),
});
export const GetV2CoreEventDestinationsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripev2_core_event_destination).annotate({
      description: "List of event destinations.",
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
export const GetV2CoreEventDestinationsError = Schema.Union([Stripev2_error], {
  mode: "oneOf",
});
export const PostV2CoreEventDestinationsInput = Schema.Struct({
  amazon_eventbridge: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        aws_account_id: Schema.String.annotate({
          description:
            "Your AWS account where Stripe creates the partner event source.",
        }),
        aws_region: Schema.String.annotate({
          description:
            "The AWS region where Stripe creates the partner event source.",
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
        "AWS account and region where Stripe creates the EventBridge partner event source.",
    }),
  ),
  azure_event_grid: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        azure_region: Schema.String.annotate({
          description:
            "The Azure region where Stripe creates the partner topic.",
        }),
        azure_resource_group_name: Schema.String.annotate({
          description:
            "The Azure resource group where Stripe creates the partner topic.",
        }),
        azure_subscription_id: Schema.String.annotate({
          description:
            "The Azure subscription where Stripe creates the partner topic.",
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
        "Azure subscription, resource group, and region where Stripe creates the partner topic.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An optional user-defined description of the destination's purpose.",
    }),
  ),
  enabled_events: Schema.Array(Schema.String).annotate({
    description:
      "The list of event types enabled for delivery to this destination.",
  }),
  event_payload: Schema.Literals(["snapshot", "thin"]).annotate({
    description: "Whether to deliver as snapshot or thin events.",
  }),
  events_from: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The account or organization scopes that can supply events. Use this with `enabled_events` to define the subscription.\n`@self`: Receive events from the account that owns the event destination.\n`@accounts`: Receive events emitted from other accounts you manage, including your v1 and v2 accounts.\n`@organization_members`: Receive events from accounts directly linked to the organization.\n`@organization_members/@accounts`: Receive events from all accounts connected to any platform accounts in the organization.",
    }),
  ),
  include: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "webhook_endpoint.signing_secret",
        "webhook_endpoint.url",
      ]),
    ).annotate({
      description:
        "Include normally redacted webhook fields in the create response. Public API clients must include `webhook_endpoint.signing_secret` to receive the signing secret.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description: "User-defined key/value data for the destination.",
    }),
  ),
  name: Schema.String.annotate({
    description: "A user-defined label for identifying the destination.",
  }),
  snapshot_api_version: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For snapshot events only, the Stripe API version used to render event objects; do not provide this for thin events.",
    }),
  ),
  type: Schema.Literals([
    "amazon_eventbridge",
    "azure_event_grid",
    "webhook_endpoint",
  ]).annotate({
    description:
      "The delivery transport. Chosen when the destination is created and cannot be changed by update.",
  }),
  webhook_endpoint: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        url: Schema.String.annotate({
          description:
            "The URL where Stripe sends matching events. Live mode requires HTTPS; sandbox mode also supports HTTP.",
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
        "Delivery target for the webhook endpoint. Live mode requires HTTPS; sandbox mode also supports HTTP.",
    }),
  ),
});
export const PostV2CoreEventDestinationsOutput =
  Stripev2_core_event_destination;
export const PostV2CoreEventDestinationsError = Schema.Union(
  [
    Stripev2_error_expired_azure_partner_authorization,
    Stripev2_error_idempotency_error,
    Stripev2_error_invalid_azure_partner_authorization,
    Stripev2_error_invalid_azure_partner_configuration,
    Stripev2_error,
  ],
  { mode: "oneOf" },
);
export const GetV2CoreEventDestinationsIdInput = Schema.Struct({
  id: Schema.String,
  include: Schema.optionalKey(
    Schema.Array(Schema.Literal("webhook_endpoint.url")),
  ),
});
export const GetV2CoreEventDestinationsIdOutput =
  Stripev2_core_event_destination;
export const GetV2CoreEventDestinationsIdError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreEventDestinationsIdInput = Schema.Struct({
  description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An optional user-defined description of the destination's purpose; it does not control routing.",
    }),
  ),
  enabled_events: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The list of event types enabled for delivery to this destination. Event scopes are configured when the destination is created.",
    }),
  ),
  include: Schema.optionalKey(
    Schema.Array(Schema.Literal("webhook_endpoint.url")).annotate({
      description:
        "Include the normally redacted `webhook_endpoint.url` in the response.",
    }),
  ),
  metadata: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Union([Schema.String, Schema.Null]),
    ).annotate({ description: "Metadata." }),
  ),
  name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A user-defined label for identifying the destination; it does not control routing.",
    }),
  ),
  webhook_endpoint: Schema.optionalKey(
    Schema.StructWithRest(
      Schema.Struct({
        url: Schema.String.annotate({
          description:
            "The URL where Stripe sends matching events. Live mode requires HTTPS; sandbox mode also supports HTTP.",
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
        "New delivery target for the webhook endpoint. Live mode requires HTTPS; sandbox mode also supports HTTP.",
    }),
  ),
  id: Schema.String,
});
export const PostV2CoreEventDestinationsIdOutput =
  Stripev2_core_event_destination;
export const PostV2CoreEventDestinationsIdError = Schema.Union(
  [Stripev2_error_idempotency_error, Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const DeleteV2CoreEventDestinationsIdInput = Schema.Struct({
  id: Schema.String,
});
export const DeleteV2CoreEventDestinationsIdOutput = Stripev2_deleted_object;
export const DeleteV2CoreEventDestinationsIdError = Schema.Union(
  [Stripev2_error_idempotency_error, Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreEventDestinationsIdDisableInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreEventDestinationsIdDisableOutput =
  Stripev2_core_event_destination;
export const PostV2CoreEventDestinationsIdDisableError = Schema.Union(
  [Stripev2_error_idempotency_error, Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreEventDestinationsIdEnableInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreEventDestinationsIdEnableOutput =
  Stripev2_core_event_destination;
export const PostV2CoreEventDestinationsIdEnableError = Schema.Union(
  [Stripev2_error_idempotency_error, Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
export const PostV2CoreEventDestinationsIdPingInput = Schema.Struct({
  id: Schema.String,
});
export const PostV2CoreEventDestinationsIdPingOutput = Stripev2_core_event;
export const PostV2CoreEventDestinationsIdPingError = Schema.Union(
  [Stripev2_error_not_found, Stripev2_error],
  { mode: "oneOf" },
);
/**
 * The GetV2CoreEventDestinationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreEventDestinationsOperation: StripeOperation & {
  readonly input: typeof GetV2CoreEventDestinationsInput;
  readonly output: typeof GetV2CoreEventDestinationsOutput;
  readonly error: typeof GetV2CoreEventDestinationsError;
} = {
  name: "GetV2CoreEventDestinations",
  method: "GET",
  path: "/v2/core/event_destinations",
  pathParameters: [],
  queryParameters: ["include", "limit", "page"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreEventDestinationsInput,
  output: GetV2CoreEventDestinationsOutput,
  error: GetV2CoreEventDestinationsError,
};
/**
 * The PostV2CoreEventDestinationsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreEventDestinationsOperation: StripeOperation & {
  readonly input: typeof PostV2CoreEventDestinationsInput;
  readonly output: typeof PostV2CoreEventDestinationsOutput;
  readonly error: typeof PostV2CoreEventDestinationsError;
} = {
  name: "PostV2CoreEventDestinations",
  method: "POST",
  path: "/v2/core/event_destinations",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreEventDestinationsInput,
  output: PostV2CoreEventDestinationsOutput,
  error: PostV2CoreEventDestinationsError,
};
/**
 * The GetV2CoreEventDestinationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetV2CoreEventDestinationsIdOperation: StripeOperation & {
  readonly input: typeof GetV2CoreEventDestinationsIdInput;
  readonly output: typeof GetV2CoreEventDestinationsIdOutput;
  readonly error: typeof GetV2CoreEventDestinationsIdError;
} = {
  name: "GetV2CoreEventDestinationsId",
  method: "GET",
  path: "/v2/core/event_destinations/{id}",
  pathParameters: ["id"],
  queryParameters: ["include"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetV2CoreEventDestinationsIdInput,
  output: GetV2CoreEventDestinationsIdOutput,
  error: GetV2CoreEventDestinationsIdError,
};
/**
 * The PostV2CoreEventDestinationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreEventDestinationsIdOperation: StripeOperation & {
  readonly input: typeof PostV2CoreEventDestinationsIdInput;
  readonly output: typeof PostV2CoreEventDestinationsIdOutput;
  readonly error: typeof PostV2CoreEventDestinationsIdError;
} = {
  name: "PostV2CoreEventDestinationsId",
  method: "POST",
  path: "/v2/core/event_destinations/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/json",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreEventDestinationsIdInput,
  output: PostV2CoreEventDestinationsIdOutput,
  error: PostV2CoreEventDestinationsIdError,
};
/**
 * The DeleteV2CoreEventDestinationsIdOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteV2CoreEventDestinationsIdOperation: StripeOperation & {
  readonly input: typeof DeleteV2CoreEventDestinationsIdInput;
  readonly output: typeof DeleteV2CoreEventDestinationsIdOutput;
  readonly error: typeof DeleteV2CoreEventDestinationsIdError;
} = {
  name: "DeleteV2CoreEventDestinationsId",
  method: "DELETE",
  path: "/v2/core/event_destinations/{id}",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteV2CoreEventDestinationsIdInput,
  output: DeleteV2CoreEventDestinationsIdOutput,
  error: DeleteV2CoreEventDestinationsIdError,
};
/**
 * The PostV2CoreEventDestinationsIdDisableOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreEventDestinationsIdDisableOperation: StripeOperation & {
  readonly input: typeof PostV2CoreEventDestinationsIdDisableInput;
  readonly output: typeof PostV2CoreEventDestinationsIdDisableOutput;
  readonly error: typeof PostV2CoreEventDestinationsIdDisableError;
} = {
  name: "PostV2CoreEventDestinationsIdDisable",
  method: "POST",
  path: "/v2/core/event_destinations/{id}/disable",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreEventDestinationsIdDisableInput,
  output: PostV2CoreEventDestinationsIdDisableOutput,
  error: PostV2CoreEventDestinationsIdDisableError,
};
/**
 * The PostV2CoreEventDestinationsIdEnableOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreEventDestinationsIdEnableOperation: StripeOperation & {
  readonly input: typeof PostV2CoreEventDestinationsIdEnableInput;
  readonly output: typeof PostV2CoreEventDestinationsIdEnableOutput;
  readonly error: typeof PostV2CoreEventDestinationsIdEnableError;
} = {
  name: "PostV2CoreEventDestinationsIdEnable",
  method: "POST",
  path: "/v2/core/event_destinations/{id}/enable",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreEventDestinationsIdEnableInput,
  output: PostV2CoreEventDestinationsIdEnableOutput,
  error: PostV2CoreEventDestinationsIdEnableError,
};
/**
 * The PostV2CoreEventDestinationsIdPingOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostV2CoreEventDestinationsIdPingOperation: StripeOperation & {
  readonly input: typeof PostV2CoreEventDestinationsIdPingInput;
  readonly output: typeof PostV2CoreEventDestinationsIdPingOutput;
  readonly error: typeof PostV2CoreEventDestinationsIdPingError;
} = {
  name: "PostV2CoreEventDestinationsIdPing",
  method: "POST",
  path: "/v2/core/event_destinations/{id}/ping",
  pathParameters: ["id"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostV2CoreEventDestinationsIdPingInput,
  output: PostV2CoreEventDestinationsIdPingOutput,
  error: PostV2CoreEventDestinationsIdPingError,
};
/**
 * The makeCoreEventDestinationsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeCoreEventDestinationsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetV2CoreEventDestinations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreEventDestinations = Effect.fn(
    "coreEventDestinations.GetV2CoreEventDestinations",
  )(function* (input: GetV2CoreEventDestinationsInput) {
    const response: GetV2CoreEventDestinationsOutput = yield* client.invoke(
      GetV2CoreEventDestinationsOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreEventDestinations function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreEventDestinations = Effect.fn(
    "coreEventDestinations.PostV2CoreEventDestinations",
  )(function* (input: PostV2CoreEventDestinationsInput) {
    const response: PostV2CoreEventDestinationsOutput = yield* client.invoke(
      PostV2CoreEventDestinationsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetV2CoreEventDestinationsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetV2CoreEventDestinationsId = Effect.fn(
    "coreEventDestinations.GetV2CoreEventDestinationsId",
  )(function* (input: GetV2CoreEventDestinationsIdInput) {
    const response: GetV2CoreEventDestinationsIdOutput = yield* client.invoke(
      GetV2CoreEventDestinationsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The PostV2CoreEventDestinationsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreEventDestinationsId = Effect.fn(
    "coreEventDestinations.PostV2CoreEventDestinationsId",
  )(function* (input: PostV2CoreEventDestinationsIdInput) {
    const response: PostV2CoreEventDestinationsIdOutput = yield* client.invoke(
      PostV2CoreEventDestinationsIdOperation,
      input,
    );
    return response;
  });
  /**
   * The DeleteV2CoreEventDestinationsId function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteV2CoreEventDestinationsId = Effect.fn(
    "coreEventDestinations.DeleteV2CoreEventDestinationsId",
  )(function* (input: DeleteV2CoreEventDestinationsIdInput) {
    const response: DeleteV2CoreEventDestinationsIdOutput =
      yield* client.invoke(DeleteV2CoreEventDestinationsIdOperation, input);
    return response;
  });
  /**
   * The PostV2CoreEventDestinationsIdDisable function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreEventDestinationsIdDisable = Effect.fn(
    "coreEventDestinations.PostV2CoreEventDestinationsIdDisable",
  )(function* (input: PostV2CoreEventDestinationsIdDisableInput) {
    const response: PostV2CoreEventDestinationsIdDisableOutput =
      yield* client.invoke(
        PostV2CoreEventDestinationsIdDisableOperation,
        input,
      );
    return response;
  });
  /**
   * The PostV2CoreEventDestinationsIdEnable function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreEventDestinationsIdEnable = Effect.fn(
    "coreEventDestinations.PostV2CoreEventDestinationsIdEnable",
  )(function* (input: PostV2CoreEventDestinationsIdEnableInput) {
    const response: PostV2CoreEventDestinationsIdEnableOutput =
      yield* client.invoke(PostV2CoreEventDestinationsIdEnableOperation, input);
    return response;
  });
  /**
   * The PostV2CoreEventDestinationsIdPing function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostV2CoreEventDestinationsIdPing = Effect.fn(
    "coreEventDestinations.PostV2CoreEventDestinationsIdPing",
  )(function* (input: PostV2CoreEventDestinationsIdPingInput) {
    const response: PostV2CoreEventDestinationsIdPingOutput =
      yield* client.invoke(PostV2CoreEventDestinationsIdPingOperation, input);
    return response;
  });
  return {
    GetV2CoreEventDestinations,
    PostV2CoreEventDestinations,
    GetV2CoreEventDestinationsId,
    PostV2CoreEventDestinationsId,
    DeleteV2CoreEventDestinationsId,
    PostV2CoreEventDestinationsIdDisable,
    PostV2CoreEventDestinationsIdEnable,
    PostV2CoreEventDestinationsIdPing,
  };
});
