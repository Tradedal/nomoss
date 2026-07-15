import { Credentials } from "@distilled.cloud/stripe";
import type {
  GetV2CoreAccountsIdInput,
  PostV2CoreAccountsIdCloseInput,
} from "@distilled.cloud/stripe/Operations";
import {
  GetV2CoreAccountsId,
  GetV2CoreAccountsIdOutput,
  PostV2CoreAccounts,
  PostV2CoreAccountsId,
  PostV2CoreAccountsIdClose,
  PostV2CoreAccountsIdInput,
  PostV2CoreAccountsInput,
} from "@distilled.cloud/stripe/Operations";
import { Context, Effect, Option, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";

export const StripeApiVersion = "2026-06-24.dahlia";

export const StripeAccountPropsSchema = annotateResourceSchema(
  PostV2CoreAccountsInput,
  {
    provider: "stripe",
    service: "core",
    resource: "account",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type StripeAccountProps = Schema.Schema.Type<
  typeof StripeAccountPropsSchema
>;

export const StripeAccountUpdatePropsSchema = PostV2CoreAccountsIdInput;

export type StripeAccountUpdateProps = Schema.Schema.Type<
  typeof StripeAccountUpdatePropsSchema
>;

export const StripeAccountOutputsSchema = Schema.Struct({
  AccountId: Schema.String,
});

export type StripeAccountOutputs = Schema.Schema.Type<
  typeof StripeAccountOutputsSchema
>;

export const StripeAccountObservedStateSchema = annotateResourceSchema(
  GetV2CoreAccountsIdOutput,
  {
    provider: "stripe",
    service: "core",
    resource: "account",
    operation: "read",
    stateSecretOutputKeys: [],
  },
);

export type StripeAccountObservedState = Schema.Schema.Type<
  typeof StripeAccountObservedStateSchema
>;

export const stripeAccountOutputsFromState = (
  state: StripeAccountObservedState,
): StripeAccountOutputs => {
  const outputs: StripeAccountOutputs = {
    AccountId: state.id,
  };

  return outputs;
};

/**
 * Stripe account lifecycle calls the generated v2 Core Account operations.
 * The API version stays explicit so provider behavior tracks the checked-in
 * Stripe OpenAPI reference.
 */
export class StripeAccountLifecycleService extends Context.Service<StripeAccountLifecycleService>()(
  "nomoss/providers/stripe/stripeAccount/StripeAccountLifecycleService",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;

      return {
        create: Effect.fn("StripeAccountLifecycleService.create")(function* (
          props: StripeAccountProps,
        ) {
          const account = yield* PostV2CoreAccounts(props, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return account;
        }),

        read: Effect.fn("StripeAccountLifecycleService.read")(function* (
          accountId: string,
        ) {
          const input: GetV2CoreAccountsIdInput = {
            id: accountId,
          };
          const account = yield* GetV2CoreAccountsId(input, {
            apiVersion: StripeApiVersion,
          }).pipe(
            Effect.provideService(Credentials, stripeCredentials),
            Effect.map((output) => Option.some(output)),
          );

          return account;
        }),

        update: Effect.fn("StripeAccountLifecycleService.update")(function* (
          input: StripeAccountUpdateProps,
        ) {
          const account = yield* PostV2CoreAccountsId(input, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return account;
        }),

        close: Effect.fn("StripeAccountLifecycleService.close")(function* (
          accountId: string,
        ) {
          const input: PostV2CoreAccountsIdCloseInput = {
            id: accountId,
          };

          yield* PostV2CoreAccountsIdClose(input, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));
        }),
      };
    }),
  },
) {}
