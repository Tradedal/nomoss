import { NodeServices } from "@effect/platform-node";
import { ConfigProvider, Layer } from "effect";
import { SecureRandom } from "effect/crypto";
import { ConfiguredStateSecretServiceLayer } from "../../src/core/state/stateSecretService.js";
import {
  resourceStateFileStorageLayer,
  resourceStateStoreBaseLayer,
} from "../../src/core/state/stateStore.js";

/**
 * stateSecretServiceIntegrationTestLayer runs production state persistence
 * with the macOS login Keychain and local files. Scoped tests remain
 * responsible for cleanup of their own credential and state document.
 */
export const stateSecretServiceIntegrationTestLayer =
  resourceStateStoreBaseLayer.pipe(
    Layer.provide(ConfiguredStateSecretServiceLayer),
    Layer.provide(
      ConfigProvider.layer(
        ConfigProvider.fromUnknown({
          NOMOSS_STATE_SECRET_STORE: "macos-keychain",
        }),
      ),
    ),
    Layer.provide(resourceStateFileStorageLayer),
    Layer.provideMerge(NodeServices.layer),
    Layer.provideMerge(SecureRandom.layerWebCrypto),
  );
