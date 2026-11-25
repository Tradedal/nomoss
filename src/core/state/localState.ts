import { Layer } from "effect";
import { ConfiguredStateSecretServiceLayer } from "./stateSecretService.js";
import { resourceStateFileStorageLayer } from "./stateStore.js";

/**
 * State supplied by the localState function persists in .nomoss/state between
 * application runs. Secret outputs use the policy selected by
 * NOMOSS_STATE_SECRET_STORE. The caller supplies filesystem and process services
 * required by that policy.
 */
export const localState = () => {
  const state = Layer.merge(
    resourceStateFileStorageLayer,
    ConfiguredStateSecretServiceLayer,
  );

  return state;
};
