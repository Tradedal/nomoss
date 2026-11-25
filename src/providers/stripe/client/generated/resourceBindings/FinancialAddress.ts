import { Context, Effect, Layer, Schema } from "effect";
import {
  ResourceEntity,
  type ResourceKey,
} from "../../../../../core/resource/model.js";
import { ResourceOutputBinding } from "../../../../../core/resource/resourceOutputBinding.js";
import { StripeClient } from "../../stripeClient.js";
import type {
  GetV2MoneyManagementFinancialAddressesIdInput,
  GetV2MoneyManagementFinancialAddressesIdOutput,
} from "../moneyManagementFinancialAddresses.js";
import {
  GetV2MoneyManagementFinancialAddressesIdOperation,
  PostV2MoneyManagementFinancialAddressesInput,
  PostV2MoneyManagementFinancialAddressesOperation,
  type PostV2MoneyManagementFinancialAddressesOutput,
} from "../moneyManagementFinancialAddresses.js";
import type { StripeFinancialAddressPropsEntity } from "../resourceInputs/StripeFinancialAddressPropsEntitySchema.js";
import type { StripeFinancialAddressProps } from "../resourceInputs/StripeFinancialAddressPropsSchema.js";
import {
  type StripeFinancialAddressOutputs,
  StripeFinancialAddressOutputsSchema,
} from "../resourceOutputs.js";

/**
 * The projectStripeFinancialAddressOutputs function selects values to save
 * from a validated response. Fields marked retainOnRead use saved values
 * when the response omits them.
 */
export function projectStripeFinancialAddressOutputs(
  state: Pick<PostV2MoneyManagementFinancialAddressesOutput, "id">,
): StripeFinancialAddressOutputs {
  const outputs: StripeFinancialAddressOutputs = {
    FinancialAddressId: state.id,
  };

  return outputs;
}

/**
 * The bindStripeFinancialAddressReadInput function identifies the object to read.
 * Its input must contain outputs saved or observed for that resource.
 */
export function bindStripeFinancialAddressReadInput(
  outputs: StripeFinancialAddressOutputs,
): GetV2MoneyManagementFinancialAddressesIdInput {
  const input: GetV2MoneyManagementFinancialAddressesIdInput = {
    id: outputs.FinancialAddressId,
  };

  return input;
}

/**
 * The StripeFinancialAddressResourceClient service creates resources from resolved props.
 * Its reads identify the provider object through saved outputs. The application
 * supplies credentials and transport through its StripeClient service.
 */
export class StripeFinancialAddressResourceClient extends Context.Service<StripeFinancialAddressResourceClient>()(
  "nomoss/providers/stripe/client/generated/resourceBindings/FinancialAddress/StripeFinancialAddressResourceClient",
  {
    make: Effect.gen(function* () {
      const client = yield* StripeClient;

      /**
       * The create service method requires all output references in props to be resolved.
       * It validates those values with the creation schema and returns the decoded
       * response. Validation and API failures propagate to the caller.
       */
      const create = Effect.fn("StripeFinancialAddress.create")(function* (
        props: StripeFinancialAddressProps,
      ) {
        const input: PostV2MoneyManagementFinancialAddressesInput =
          yield* Schema.decodeUnknownEffect(
            PostV2MoneyManagementFinancialAddressesInput,
          )(props);
        const created: PostV2MoneyManagementFinancialAddressesOutput =
          yield* client.invoke(
            PostV2MoneyManagementFinancialAddressesOperation,
            input,
          );
        return created;
      });

      /**
       * The read service method observes the object identified by saved outputs.
       * The result is the decoded response before the policy merges saved values.
       * API failures propagate so the policy can decide whether the object is absent.
       */
      const read = Effect.fn("StripeFinancialAddress.read")(function* (
        outputs: StripeFinancialAddressOutputs,
      ) {
        const input: GetV2MoneyManagementFinancialAddressesIdInput =
          bindStripeFinancialAddressReadInput(outputs);
        const observed: GetV2MoneyManagementFinancialAddressesIdOutput =
          yield* client.invoke(
            GetV2MoneyManagementFinancialAddressesIdOperation,
            input,
          );
        return observed;
      });

      return {
        create,
        read,
      };
    }),
  },
) {}

export const stripeFinancialAddressResourceClientLayer = Layer.effect(
  StripeFinancialAddressResourceClient,
  StripeFinancialAddressResourceClient.make,
);
export const StripeFinancialAddressResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("stripe"),
  service: Schema.Literal("money_management"),
  resource: Schema.Literal("financial-address"),
});

/**
 * The StripeFinancialAddressResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class StripeFinancialAddressResource<
  Props = StripeFinancialAddressPropsEntity,
> extends ResourceEntity<{
  readonly provider: "stripe";
  readonly service: "money_management";
  readonly resource: "financial-address";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "stripe",
        service: "money_management",
        resource: "financial-address",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get FinancialAddressId(): Required<StripeFinancialAddressOutputs>["FinancialAddressId"] {
    const value: Required<StripeFinancialAddressOutputs>["FinancialAddressId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "FinancialAddressId",
        StripeFinancialAddressOutputsSchema.fields.FinancialAddressId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createStripeFinancialAddressDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): StripeFinancialAddressResource<Props> {
  const resource: StripeFinancialAddressResource<Props> =
    new StripeFinancialAddressResource<Props>(key, props, binding);

  return resource;
}
