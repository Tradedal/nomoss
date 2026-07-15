import { Credentials } from "@distilled.cloud/stripe";
import type {
  GetProductsIdInput,
  PostProductsIdInput,
} from "@distilled.cloud/stripe/Operations";
import {
  GetProductsId,
  PostProducts,
  PostProductsId,
  PostProductsIdInput as PostProductsIdInputSchema,
  PostProductsInput,
  PostProductsOutput,
} from "@distilled.cloud/stripe/Operations";
import { type Cause, Context, Data, Effect, Option, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import { StripeApiVersion } from "./stripeAccount.js";

export const StripeProductPropsSchema = annotateResourceSchema(
  PostProductsInput,
  {
    provider: "stripe",
    service: "billing",
    resource: "product",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type StripeProductProps = Schema.Schema.Type<
  typeof StripeProductPropsSchema
>;

export const StripeProductUpdatePropsSchema = PostProductsIdInputSchema;

export type StripeProductUpdateProps = Schema.Schema.Type<
  typeof StripeProductUpdatePropsSchema
>;

export const StripeProductOutputsSchema = Schema.Struct({
  ProductId: Schema.String,
});

export type StripeProductOutputs = Schema.Schema.Type<
  typeof StripeProductOutputsSchema
>;

export const StripeProductObservedStateSchema = PostProductsOutput;

export type StripeProductObservedState = Schema.Schema.Type<
  typeof StripeProductObservedStateSchema
>;

export class StripeProductUpdateFailed extends Data.TaggedError(
  "StripeProductUpdateFailed",
)<{
  readonly cause: Cause.Cause<unknown>;
}> {}

export class StripeProductDestroyFailed extends Data.TaggedError(
  "StripeProductDestroyFailed",
)<{
  readonly cause: Cause.Cause<unknown>;
}> {}

export const stripeProductOutputsFromState = (
  state: StripeProductObservedState,
): StripeProductOutputs => {
  const outputs: StripeProductOutputs = {
    ProductId: state.id,
  };

  return outputs;
};

export const pendingStripeProductOutputs = (
  logicalId: string,
): StripeProductOutputs => {
  const outputs: StripeProductOutputs = {
    ProductId: `nomoss:pending:stripe-product-id:${logicalId}`,
  };

  return outputs;
};

export const stripeProductOutputsFromProps = (
  logicalId: string,
  props: StripeProductProps,
): StripeProductOutputs => {
  const outputs: StripeProductOutputs =
    props.id === undefined
      ? pendingStripeProductOutputs(logicalId)
      : {
          ProductId: props.id,
        };

  return outputs;
};

export class StripeProductLifecycle extends Context.Service<StripeProductLifecycle>()(
  "nomoss/providers/stripe/stripeProduct/StripeProductLifecycle",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;

      return {
        createProduct: Effect.fn("StripeProductLifecycle.createProduct")(
          function* (props: StripeProductProps) {
            const product = yield* PostProducts(props, {
              apiVersion: StripeApiVersion,
            }).pipe(Effect.provideService(Credentials, stripeCredentials));

            return product;
          },
        ),

        readProduct: Effect.fn("StripeProductLifecycle.readProduct")(function* (
          productId: string,
        ) {
          const input: GetProductsIdInput = {
            id: productId,
          };
          const product = yield* GetProductsId(input, {
            apiVersion: StripeApiVersion,
          }).pipe(
            Effect.provideService(Credentials, stripeCredentials),
            Effect.flatMap((output) =>
              Schema.decodeUnknownEffect(StripeProductObservedStateSchema)(
                output,
              ),
            ),
            Effect.map((output) => Option.some(output)),
          );

          return product;
        }),

        updateProduct: Effect.fn("StripeProductLifecycle.updateProduct")(
          function* (input: StripeProductUpdateProps) {
            const product = yield* PostProductsId(input, {
              apiVersion: StripeApiVersion,
            }).pipe(
              Effect.provideService(Credentials, stripeCredentials),
              Effect.catchCause((cause) =>
                Effect.fail(new StripeProductUpdateFailed({ cause })),
              ),
            );

            return product;
          },
        ),

        deactivateProduct: Effect.fn(
          "StripeProductLifecycle.deactivateProduct",
        )(function* (productId: string) {
          const input: PostProductsIdInput = {
            id: productId,
            active: false,
          };

          yield* PostProductsId(input, {
            apiVersion: StripeApiVersion,
          }).pipe(
            Effect.provideService(Credentials, stripeCredentials),
            Effect.catchCause((cause) =>
              Effect.fail(new StripeProductDestroyFailed({ cause })),
            ),
          );
        }),
      };
    }),
  },
) {}
