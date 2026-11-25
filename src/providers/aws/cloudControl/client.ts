import { Context, Effect, HashSet, Option, Stream, Tuple } from "effect";
import { AwsRequestError } from "../client/awsClientModel.js";
import {
  type ListResourcesInput,
  makeCloudControlClient,
  type ResourceDescription,
} from "../client/generated/cloudControl.js";

/**
 * AwsCloudControlClient exposes generated Cloud Control operations with
 * pagination for resource discovery. Discovery shares operation validation
 * and execution with direct requests through the internal AWS client.
 */
export class AwsCloudControlClient extends Context.Service<AwsCloudControlClient>()(
  "nomoss/providers/aws/cloudControl/client/AwsCloudControlClient",
  {
    make: Effect.gen(function* () {
      const generated = yield* makeCloudControlClient;

      /**
       * The listResourceDescriptions service method supplies discovery pages
       * until AWS omits the continuation token. A repeated token fails discovery
       * so a malformed response cannot cause an endless pagination loop.
       */
      const listResourceDescriptions = (input: ListResourcesInput) => {
        const initial = {
          request: input,
          tokens: HashSet.fromIterable(
            Option.toArray(Option.fromUndefinedOr(input.NextToken)),
          ),
        };

        const descriptions = Stream.paginate(initial, (state) =>
          generated.listResources(state.request).pipe(
            Effect.filterOrFail(
              (response) =>
                Option.fromUndefinedOr(response.NextToken).pipe(
                  Option.map((token) => !HashSet.has(state.tokens, token)),
                  Option.getOrElse(() => true),
                ),
              () =>
                new AwsRequestError({
                  message: "Cloud Control returned a repeated pagination token",
                }),
            ),
            Effect.map((response) => {
              const resources: ReadonlyArray<ResourceDescription> =
                response.ResourceDescriptions ?? [];
              const next = Option.fromUndefinedOr(response.NextToken).pipe(
                Option.map((NextToken) => ({
                  request: { ...state.request, NextToken },
                  tokens: HashSet.add(state.tokens, NextToken),
                })),
              );

              const page = Tuple.make(resources, next);

              return page;
            }),
          ),
        );

        return descriptions;
      };

      return { ...generated, listResourceDescriptions };
    }),
  },
) {}
