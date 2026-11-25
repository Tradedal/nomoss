// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { annotateResourceSchema } from "../../../../../core/resource/model.js";
import { StripeEventDestinationResourceSchema } from "./StripeEventDestinationPropsSchema.js";

export type StripeEventDestinationPropsEntity = {
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
} & { readonly [x: string]: Schema.Json };

export const StripeEventDestinationPropsEntitySchema = annotateResourceSchema(
  Schema.StructWithRest(
    Schema.Struct({
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
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ),
  StripeEventDestinationResourceSchema,
);
