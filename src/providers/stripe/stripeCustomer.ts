import { Credentials } from "@distilled.cloud/stripe";
import type {
  DeleteCustomersCustomerInput,
  GetCustomersCustomerInput,
} from "@distilled.cloud/stripe/Operations";
import {
  DeleteCustomersCustomer,
  GetCustomersCustomer,
  PostCustomers,
  PostCustomersCustomer,
  PostCustomersCustomerInput as PostCustomersCustomerInputSchema,
  PostCustomersInput,
  PostCustomersOutput,
} from "@distilled.cloud/stripe/Operations";
import { type Cause, Context, Data, Effect, Option, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import { StripeApiVersion } from "./stripeAccount.js";

export const StripeCustomerPropsSchema = annotateResourceSchema(
  PostCustomersInput,
  {
    provider: "stripe",
    service: "billing",
    resource: "customer",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type StripeCustomerProps = Schema.Schema.Type<
  typeof StripeCustomerPropsSchema
>;

export const StripeCustomerUpdatePropsSchema = PostCustomersCustomerInputSchema;

export type StripeCustomerUpdateProps = Schema.Schema.Type<
  typeof StripeCustomerUpdatePropsSchema
>;

export const StripeCustomerOutputsSchema = Schema.Struct({
  CustomerId: Schema.String,
});

export type StripeCustomerOutputs = Schema.Schema.Type<
  typeof StripeCustomerOutputsSchema
>;

export const StripeCustomerObservedStateSchema = PostCustomersOutput;

export type StripeCustomerObservedState = Schema.Schema.Type<
  typeof StripeCustomerObservedStateSchema
>;

export const stripeCustomerOutputsFromState = (
  state: StripeCustomerObservedState,
): StripeCustomerOutputs => {
  const outputs: StripeCustomerOutputs = {
    CustomerId: state.id,
  };

  return outputs;
};

export class StripeCustomerCreateFailed extends Data.TaggedError(
  "StripeCustomerCreateFailed",
)<{
  readonly cause: Cause.Cause<unknown>;
}> {}

export const pendingStripeCustomerOutputs = (
  logicalId: string,
): StripeCustomerOutputs => {
  const outputs: StripeCustomerOutputs = {
    CustomerId: `nomoss:pending:stripe-customer-id:${logicalId}`,
  };

  return outputs;
};

export class StripeCustomerLifecycle extends Context.Service<StripeCustomerLifecycle>()(
  "nomoss/providers/stripe/stripeCustomer/StripeCustomerLifecycle",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;

      return {
        createCustomer: Effect.fn("StripeCustomerLifecycle/createCustomer")(
          function* (props: StripeCustomerProps) {
            const customer = yield* PostCustomers(props, {
              apiVersion: StripeApiVersion,
            }).pipe(
              Effect.provideService(Credentials, stripeCredentials),
              Effect.catchCause((cause) =>
                Effect.fail(new StripeCustomerCreateFailed({ cause })),
              ),
            );

            return customer;
          },
        ),

        readCustomer: Effect.fn("StripeCustomerLifecycle/readCustomer")(
          function* (customerId: string) {
            const input: GetCustomersCustomerInput = {
              customer: customerId,
            };
            const customer = yield* GetCustomersCustomer(input, {
              apiVersion: StripeApiVersion,
            }).pipe(
              Effect.provideService(Credentials, stripeCredentials),
              Effect.flatMap((output) =>
                Schema.decodeUnknownEffect(StripeCustomerObservedStateSchema)(
                  output,
                ),
              ),
              Effect.map((output) => Option.some(output)),
            );

            return customer;
          },
        ),

        updateCustomer: Effect.fn("StripeCustomerLifecycle/updateCustomer")(
          function* (input: StripeCustomerUpdateProps) {
            const customer = yield* PostCustomersCustomer(input, {
              apiVersion: StripeApiVersion,
            }).pipe(Effect.provideService(Credentials, stripeCredentials));

            return customer;
          },
        ),

        deleteCustomer: Effect.fn("StripeCustomerLifecycle/deleteCustomer")(
          function* (customerId: string) {
            const input: DeleteCustomersCustomerInput = {
              customer: customerId,
            };

            yield* DeleteCustomersCustomer(input, {
              apiVersion: StripeApiVersion,
            }).pipe(Effect.provideService(Credentials, stripeCredentials));
          },
        ),
      };
    }),
  },
) {}
