import { Credentials } from "@distilled.cloud/stripe";
import type {
  DeleteWebhookEndpointsWebhookEndpointInput,
  GetWebhookEndpointsWebhookEndpointInput,
} from "@distilled.cloud/stripe/Operations";
import {
  DeleteWebhookEndpointsWebhookEndpoint,
  GetWebhookEndpointsWebhookEndpoint,
  PostWebhookEndpoints,
  PostWebhookEndpointsInput,
  PostWebhookEndpointsOutput,
  PostWebhookEndpointsWebhookEndpoint,
  PostWebhookEndpointsWebhookEndpointInput,
} from "@distilled.cloud/stripe/Operations";
import { Config, Context, Effect, Option, Redacted, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import { StripeApiVersion } from "./stripeAccount.js";

export const StripeWebhookEndpointRequestPropsSchema =
  PostWebhookEndpointsInput;

export type StripeWebhookEndpointRequestProps = Schema.Schema.Type<
  typeof StripeWebhookEndpointRequestPropsSchema
>;

/**
 * `payments-infra` declares the Stripe endpoint that delivers billing events
 * to Example's webhook route. `ResourceModel` records this annotation with
 * the resource node so later endpoint updates retain the signing secret that
 * Stripe returns only at creation.
 */
export const StripeWebhookEndpointPropsSchema = annotateResourceSchema(
  Schema.Struct({
    endpoint: StripeWebhookEndpointRequestPropsSchema,
    rotationKey: Schema.optional(Schema.String),
  }),
  {
    provider: "stripe",
    service: "billing",
    resource: "webhook-endpoint",
    operation: "create",
    stateSecretOutputKeys: ["WebhookSigningSecret"],
  },
);

export type StripeWebhookEndpointProps = Schema.Schema.Type<
  typeof StripeWebhookEndpointPropsSchema
>;

export const StripeWebhookEndpointUpdatePropsSchema =
  PostWebhookEndpointsWebhookEndpointInput;

export type StripeWebhookEndpointUpdateProps = Schema.Schema.Type<
  typeof StripeWebhookEndpointUpdatePropsSchema
>;

/**
 * Stripe presents this credential only when a webhook endpoint is created.
 * The applied endpoint output uses this named value so state persistence can
 * retain its Keychain reference and later webhook updates can preserve it.
 */
export const StripeWebhookSigningSecretSchema = Schema.String.pipe(
  Schema.brand("StripeWebhookSigningSecret"),
);

export type StripeWebhookSigningSecret = Schema.Schema.Type<
  typeof StripeWebhookSigningSecretSchema
>;

/**
 * Stripe returns a webhook signing secret when an endpoint is created, then
 * omits it from later reads and updates. The applied resource node must retain
 * that original output so an update response cannot erase the signing secret
 * used to verify billing webhook deliveries.
 */
export const StripeWebhookEndpointOutputsSchema = Schema.Struct({
  WebhookEndpointId: Schema.String,
  WebhookSigningSecret: Schema.optional(StripeWebhookSigningSecretSchema),
});

export type StripeWebhookEndpointOutputs = Schema.Schema.Type<
  typeof StripeWebhookEndpointOutputsSchema
>;

export const StripeWebhookEndpointObservedStateSchema =
  PostWebhookEndpointsOutput;

export type StripeWebhookEndpointObservedState = Schema.Schema.Type<
  typeof StripeWebhookEndpointObservedStateSchema
>;

const StripeWebhookEndpointBasicAuthConfig = Config.all({
  username: Config.string("NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_USERNAME").pipe(
    Config.option,
  ),
  password: Config.string("NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_PASSWORD").pipe(
    Config.option,
  ),
});

const webhookSigningSecretValue = (
  secret: string | Redacted.Redacted<string>,
) =>
  Option.match(Option.liftPredicate(secret, Redacted.isRedacted), {
    onNone: () => secret,
    onSome: Redacted.value,
  });

/**
 * Stripe create and update responses become the applied resource node through
 * this projection. When an update omits the creation-only signing secret, the
 * prior node supplies the value that billing webhook verification still needs.
 */
export const stripeWebhookEndpointOutputsFromState = (
  state: StripeWebhookEndpointObservedState,
  previous?: StripeWebhookEndpointOutputs,
): StripeWebhookEndpointOutputs => {
  const previousSigningSecret = Option.flatMap(
    Option.fromNullishOr(previous),
    ({ WebhookSigningSecret }) => Option.fromUndefinedOr(WebhookSigningSecret),
  );
  const endpointSigningSecret = Option.fromNullishOr(state.secret).pipe(
    Option.orElse(() => previousSigningSecret),
    Option.flatMap((secret) =>
      Schema.decodeUnknownOption(StripeWebhookSigningSecretSchema)(
        webhookSigningSecretValue(secret),
      ),
    ),
  );
  const outputs = Option.match(endpointSigningSecret, {
    onNone: (): StripeWebhookEndpointOutputs => ({
      WebhookEndpointId: state.id,
    }),
    onSome: (WebhookSigningSecret): StripeWebhookEndpointOutputs => ({
      WebhookEndpointId: state.id,
      WebhookSigningSecret,
    }),
  });

  return outputs;
};

export const pendingStripeWebhookEndpointOutputs = (
  logicalId: string,
): StripeWebhookEndpointOutputs => {
  const outputs: StripeWebhookEndpointOutputs = {
    WebhookEndpointId: `nomoss:pending:stripe-webhook-endpoint-id:${logicalId}`,
  };

  return outputs;
};

const basicAuthDeliveryUrl = (
  url: string,
  credentials: { readonly username: string; readonly password: string },
) => {
  const deliveryUrl = new URL(url);

  deliveryUrl.username = credentials.username;
  deliveryUrl.password = credentials.password;

  return deliveryUrl.toString();
};

/**
 * Billing infrastructure invokes this service when the declared Stripe webhook
 * endpoint must be created, read, updated, or removed. Its delivery URL may
 * use dev-only Basic Auth, while the persisted resource node remains safe for
 * later lifecycle runs and Stripe request verification.
 */
export class StripeWebhookEndpointLifecycle extends Context.Service<StripeWebhookEndpointLifecycle>()(
  "nomoss/providers/stripe/stripeWebhookEndpoint/StripeWebhookEndpointLifecycle",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;
      const basicAuth = yield* StripeWebhookEndpointBasicAuthConfig;
      const deliveryUrlFor = (url: string) =>
        Option.all(basicAuth).pipe(
          Option.match({
            onNone: () => url,
            onSome: (credentials) => basicAuthDeliveryUrl(url, credentials),
          }),
        );

      return {
        createWebhookEndpoint: Effect.fn(
          "StripeWebhookEndpointLifecycle.createWebhookEndpoint",
        )(function* (props: StripeWebhookEndpointRequestProps) {
          const endpointProps =
            yield* StripeWebhookEndpointRequestPropsSchema.makeEffect({
              api_version: props.api_version,
              connect: props.connect,
              description: props.description,
              enabled_events: props.enabled_events,
              metadata: props.metadata,
              url: deliveryUrlFor(props.url),
            });
          const endpoint = yield* PostWebhookEndpoints(endpointProps, {
            apiVersion: StripeApiVersion.Dahlia,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return endpoint;
        }),

        rotateWebhookEndpoint: Effect.fn(
          "StripeWebhookEndpointLifecycle.rotateWebhookEndpoint",
        )(function* (
          previousWebhookEndpointId: string,
          props: StripeWebhookEndpointRequestProps,
        ) {
          const endpointProps =
            yield* StripeWebhookEndpointRequestPropsSchema.makeEffect({
              api_version: props.api_version,
              connect: props.connect,
              description: props.description,
              enabled_events: props.enabled_events,
              metadata: props.metadata,
              url: deliveryUrlFor(props.url),
            });
          const endpoint = yield* PostWebhookEndpoints(endpointProps, {
            apiVersion: StripeApiVersion.Dahlia,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));
          const deleteInput: DeleteWebhookEndpointsWebhookEndpointInput = {
            webhook_endpoint: previousWebhookEndpointId,
          };

          yield* DeleteWebhookEndpointsWebhookEndpoint(deleteInput, {
            apiVersion: StripeApiVersion.Dahlia,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return endpoint;
        }),

        readWebhookEndpoint: Effect.fn(
          "StripeWebhookEndpointLifecycle.readWebhookEndpoint",
        )(function* (webhookEndpointId: string) {
          const input: GetWebhookEndpointsWebhookEndpointInput = {
            webhook_endpoint: webhookEndpointId,
          };
          const endpoint = yield* GetWebhookEndpointsWebhookEndpoint(input, {
            apiVersion: StripeApiVersion.Dahlia,
          }).pipe(
            Effect.provideService(Credentials, stripeCredentials),
            Effect.flatMap((output) =>
              Schema.decodeUnknownEffect(
                StripeWebhookEndpointObservedStateSchema,
              )(output),
            ),
            Effect.map((output) => Option.some(output)),
          );

          return endpoint;
        }),

        updateWebhookEndpoint: Effect.fn(
          "StripeWebhookEndpointLifecycle.updateWebhookEndpoint",
        )(function* (input: StripeWebhookEndpointUpdateProps) {
          const endpointInput = yield* Option.match(
            Option.fromUndefinedOr(input.url),
            {
              onNone: () => Effect.succeed(input),
              onSome: (url) =>
                StripeWebhookEndpointUpdatePropsSchema.makeEffect({
                  description: input.description,
                  disabled: input.disabled,
                  enabled_events: input.enabled_events,
                  expand: input.expand,
                  metadata: input.metadata,
                  url: deliveryUrlFor(url),
                  webhook_endpoint: input.webhook_endpoint,
                }),
            },
          );
          const endpoint = yield* PostWebhookEndpointsWebhookEndpoint(
            endpointInput,
            {
              apiVersion: StripeApiVersion.Dahlia,
            },
          ).pipe(Effect.provideService(Credentials, stripeCredentials));

          return endpoint;
        }),

        deleteWebhookEndpoint: Effect.fn(
          "StripeWebhookEndpointLifecycle.deleteWebhookEndpoint",
        )(function* (webhookEndpointId: string) {
          const input: DeleteWebhookEndpointsWebhookEndpointInput = {
            webhook_endpoint: webhookEndpointId,
          };

          yield* DeleteWebhookEndpointsWebhookEndpoint(input, {
            apiVersion: StripeApiVersion.Dahlia,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));
        }),
      };
    }),
  },
) {}
