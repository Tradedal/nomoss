import { Credentials } from "@distilled.cloud/stripe";
import type {
  GetPricesPriceInput,
  PostPricesPriceInput,
} from "@distilled.cloud/stripe/Operations";
import {
  GetPricesPrice,
  PostPrices,
  PostPricesInput,
  PostPricesOutput,
  PostPricesPrice,
} from "@distilled.cloud/stripe/Operations";
import { Context, Effect, Match, Option, Schema } from "effect";

import {
  annotateResourceSchema,
  type ResourceOutputRef,
  ResourceOutputRefSchema,
} from "../../core/model.js";
import { StripeApiVersion } from "./stripeAccount.js";

export const StripePricePropsSchema = annotateResourceSchema(PostPricesInput, {
  provider: "stripe",
  service: "billing",
  resource: "price",
  operation: "create",
  stateSecretOutputKeys: [],
});

export type StripePriceProps = Schema.Schema.Type<
  typeof StripePricePropsSchema
>;

/**
 * A Price declaration can point at a Product resource ref before Stripe creates
 * the Product id. Nomoss resolves the ref during apply and then calls the
 * generated Stripe Price operation with a concrete Product id.
 */
export const StripePriceDeclarationPropsSchema = annotateResourceSchema(
  Schema.Struct({
    active: Schema.optional(Schema.Boolean),
    currency: Schema.String,
    lookup_key: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    nickname: Schema.optional(Schema.String),
    product: ResourceOutputRefSchema,
    recurring: Schema.Struct({
      interval: Schema.Literals(["month", "year"]),
      interval_count: Schema.optional(Schema.Finite),
    }),
    tax_behavior: Schema.optional(
      Schema.Literals(["exclusive", "inclusive", "unspecified"]),
    ),
    unit_amount: Schema.Finite,
  }),
  {
    provider: "stripe",
    service: "billing",
    resource: "price",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type StripePriceDeclarationProps = Schema.Schema.Type<
  typeof StripePriceDeclarationPropsSchema
>;

export const StripeRecurringPriceDeclarationPropsSchema = Schema.Struct({
  active: Schema.optional(Schema.Boolean),
  currency: Schema.String,
  lookup_key: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  nickname: Schema.optional(Schema.String),
  recurring: Schema.Struct({
    interval: Schema.Literals(["month", "year"]),
    interval_count: Schema.optional(Schema.Finite),
  }),
  tax_behavior: Schema.optional(
    Schema.Literals(["exclusive", "inclusive", "unspecified"]),
  ),
  unit_amount: Schema.Finite,
});

export type StripeRecurringPriceDeclarationProps = Schema.Schema.Type<
  typeof StripeRecurringPriceDeclarationPropsSchema
>;

export const StripePriceOutputsSchema = Schema.Struct({
  PriceId: Schema.String,
});

export type StripePriceOutputs = Schema.Schema.Type<
  typeof StripePriceOutputsSchema
>;

export const StripePriceObservedStateSchema = PostPricesOutput;

export type StripePriceObservedState = Schema.Schema.Type<
  typeof StripePriceObservedStateSchema
>;

export const stripePriceOutputsFromState = (
  state: StripePriceObservedState,
): StripePriceOutputs => {
  const outputs: StripePriceOutputs = {
    PriceId: state.id,
  };

  return outputs;
};

export const pendingStripePriceOutputs = (
  logicalId: string,
): StripePriceOutputs => {
  const outputs: StripePriceOutputs = {
    PriceId: `nomoss:pending:stripe-price-id:${logicalId}`,
  };

  return outputs;
};

export const stripePricePropsFromDeclaration = (
  product: string | ResourceOutputRef,
  props: StripeRecurringPriceDeclarationProps,
): StripePriceProps | StripePriceDeclarationProps => {
  const priceProps = Match.type<string | ResourceOutputRef>().pipe(
    Match.when(Match.string, (stripeProductId) =>
      StripePricePropsSchema.make({
        active: props.active,
        currency: props.currency,
        lookup_key: props.lookup_key,
        metadata: props.metadata,
        nickname: props.nickname,
        product: stripeProductId,
        recurring: props.recurring,
        tax_behavior: props.tax_behavior,
        unit_amount: props.unit_amount,
      }),
    ),
    Match.orElse((productRef) =>
      StripePriceDeclarationPropsSchema.make({
        active: props.active,
        currency: props.currency,
        lookup_key: props.lookup_key,
        metadata: props.metadata,
        nickname: props.nickname,
        product: productRef,
        recurring: props.recurring,
        tax_behavior: props.tax_behavior,
        unit_amount: props.unit_amount,
      }),
    ),
  )(product);

  return priceProps;
};

export class StripePriceLifecycle extends Context.Service<StripePriceLifecycle>()(
  "nomoss/providers/stripe/stripePrice/StripePriceLifecycle",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;

      return {
        createPrice: Effect.fn("StripePriceLifecycle.createPrice")(function* (
          props: StripePriceProps,
        ) {
          const price = yield* PostPrices(props, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return price;
        }),

        readPrice: Effect.fn("StripePriceLifecycle.readPrice")(function* (
          priceId: string,
        ) {
          const input: GetPricesPriceInput = {
            price: priceId,
          };
          const price = yield* GetPricesPrice(input, {
            apiVersion: StripeApiVersion,
          }).pipe(
            Effect.provideService(Credentials, stripeCredentials),
            Effect.flatMap((output) =>
              Schema.decodeUnknownEffect(StripePriceObservedStateSchema)(
                output,
              ),
            ),
            Effect.map((output) => Option.some(output)),
          );

          return price;
        }),

        deactivatePrice: Effect.fn("StripePriceLifecycle.deactivatePrice")(
          function* (priceId: string) {
            /**
             * Stripe keeps Price terms immutable for active subscriptions.
             * Replacement clears the lookup key on the old Price so future
             * Checkout sessions resolve only the newly declared terms.
             */
            const input: PostPricesPriceInput = {
              price: priceId,
              active: false,
              lookup_key: "",
            };

            yield* PostPricesPrice(input, {
              apiVersion: StripeApiVersion,
            }).pipe(Effect.provideService(Credentials, stripeCredentials));
          },
        ),
      };
    }),
  },
) {}
