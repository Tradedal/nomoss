import { Context, Effect } from "effect";

/**
 * Applications provide this service to name the stack and register desired
 * resources. Provider services are captured when the application layer builds
 * the definition, so stack operations can run declaration, planning, apply,
 * destroy, and rendering without consumer lifecycle wiring.
 */
export class ResourceStackDefinition extends Context.Service<ResourceStackDefinition>()(
  "nomoss/core/resourceStackDefinition",
  {
    make: Effect.succeed({
      stackName: "",
      declare: Effect.fn("ResourceStackDefinition.declare")(function* () {}),
    }),
  },
) {}
