import type { Schema } from "effect";
import type { ResourceRequestConfiguration } from "../../../core/resource/resourceRequest.js";
import type {
  StripeOperation,
  StripePayload,
} from "../client/stripeClientModel.js";

/**
 * The StripeResourceOperation interface retains the generated validators needed
 * for a JSON resource operation. The shared policy accepts resolved JSON inputs;
 * the selected native schema still validates the actual provider request.
 * Each operation retains the error codec for its API version and modeled failures.
 */
export interface StripeResourceOperation<
  State extends StripePayload = StripePayload,
> extends StripeOperation {
  readonly input: Schema.Codec<StripePayload, StripePayload>;
  readonly output: Schema.Codec<State, Schema.Json>;
  readonly error: Schema.Codec<
    { readonly error: { readonly message?: string } },
    Schema.Json
  >;
}

/**
 * The StripeResourceConfiguration interface supplies the contracts a policy
 * needs to address the same provider object across runs. The identify function
 * binds saved outputs to later requests. inputOutputs retains identity supplied
 * by creation parameters when responses omit it, and responseSchema validates
 * a selected response variant before projection. An omitted update or removal
 * operation fails as unsupported before provider I/O.
 */
export interface StripeResourceConfiguration<
  Props extends object,
  Outputs extends StripePayload,
  State extends StripePayload,
> {
  readonly propsSchema: Schema.Schema<Props>;
  readonly outputsSchema: Schema.Schema<Outputs>;
  readonly identify: (outputs: Outputs) => StripePayload;
  readonly projectOutputs: (state: State, previous?: Outputs) => StripePayload;
  readonly inputOutputs?: Readonly<Record<string, string>>;
  readonly responseSchema?: Schema.Schema<StripePayload>;
  readonly request?: ResourceRequestConfiguration;
  readonly operations: {
    readonly create: StripeResourceOperation<State>;
    readonly read: StripeResourceOperation<State>;
    readonly update?: StripeResourceOperation<State>;
    readonly remove?: StripeResourceOperation;
  };
  readonly removalValues: StripePayload;
  readonly deletedResponseMeansMissing: boolean;
}
