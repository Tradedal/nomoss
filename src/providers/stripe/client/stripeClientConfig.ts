import { Config, Context, Effect, Layer, type Redacted } from "effect";

/**
 * StripeClientConfig supplies authentication and an optional service address.
 * Each generated operation supplies the API version its schemas describe.
 */
export class StripeClientConfig extends Context.Service<
  StripeClientConfig,
  {
    readonly apiKey: Redacted.Redacted<string>;
    readonly apiBaseUrl?: string;
  }
>()("nomoss/providers/stripe/client/stripeClientConfig") {}

export const stripeClientConfigLayer = Layer.effect(
  StripeClientConfig,
  Effect.gen(function* () {
    const apiKey = yield* Config.Redacted("STRIPE_API_KEY");

    return { apiKey };
  }),
);
