import { expect, layer } from "@effect/vitest";
import { Effect } from "effect";
import {
  projectStripeTestHelpersTestClockOutputs,
  StripeTestHelpersTestClockResourceClient,
} from "../../src/providers/stripe/client/generated/resourceBindings/TestHelpersTestClock.js";
import type { PostTestHelpersTestClocksTestClockAdvanceOutput } from "../../src/providers/stripe/client/generated/testHelpersTestClocks.js";
import {
  StripeLifecycleFixture,
  stripeTestClock,
  stripeTestClockClientTestLayer,
} from "../support/stripeLifecycleFixture.js";

layer(stripeTestClockClientTestLayer, { buildPerTest: true })(
  "StripeTestHelpersTestClockResourceClient",
  (it) => {
    it.effect(
      "Advancing a billing simulation keeps the saved clock identity when changes contain another identifier",
      () =>
        Effect.gen(function* () {
          const clock = yield* StripeTestHelpersTestClockResourceClient;
          const fixture = yield* StripeLifecycleFixture;
          const targetTime = stripeTestClock.frozen_time + 3600;
          const accepted: PostTestHelpersTestClocksTestClockAdvanceOutput = {
            ...stripeTestClock,
            status: "advancing",
            status_details: { advancing: { target_frozen_time: targetTime } },
          };
          const advanced = { ...stripeTestClock, frozen_time: targetTime };
          const clockPath = `/v1/test_helpers/test_clocks/${stripeTestClock.id}`;

          yield* fixture.enqueueResponses(
            "POST",
            "/v1/test_helpers/test_clocks",
            [Response.json(stripeTestClock)],
          );
          yield* fixture.enqueueResponses("POST", `${clockPath}/advance`, [
            Response.json(accepted),
          ]);
          yield* fixture.enqueueResponses("GET", clockPath, [
            Response.json(advanced),
          ]);

          const created = yield* clock.create({
            frozen_time: stripeTestClock.frozen_time,
            name: stripeTestClock.name ?? undefined,
          });
          const outputs = projectStripeTestHelpersTestClockOutputs(created);
          const changes = {
            frozen_time: targetTime,
            test_clock: "clock_another_simulation",
          };
          const changed = yield* clock.update(outputs, changes);
          const observed = yield* clock.read(outputs);

          expect(changed.id).toBe(created.id);
          expect(changed.status).toBe("advancing");
          expect(observed.id).toBe(created.id);
          expect(observed.frozen_time).toBe(targetTime);
          const requests = yield* fixture.requestsFor(
            "POST",
            `${clockPath}/advance`,
          );
          expect(requests).toHaveLength(1);
          const sent = yield* Effect.promise(() => requests[0].text());
          expect(new URLSearchParams(sent).get("frozen_time")).toBe(
            String(targetTime),
          );
          expect(new URLSearchParams(sent).has("test_clock")).toBe(false);
        }),
    );
  },
);
