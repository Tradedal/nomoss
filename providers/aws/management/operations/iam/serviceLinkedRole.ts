import { AwsClient } from "@nomoss/aws";
import {
  CreateServiceLinkedRoleRequest,
  iamOperations,
  iamService,
  Role,
} from "@nomoss/aws/iam";
import { AwsServiceError } from "@nomoss/aws/model";
import { Context, Data, Effect, Option, Schema } from "effect";
import {
  AWSServiceLinkedRoleOutputsSchema,
  AWSServiceLinkedRoleRequestSchema,
  AWSServiceLinkedRoleResourceSchema,
} from "nomoss/providers/aws/iam/servicelinkedrole";
import {
  ResourceIdentityMismatch,
  ResourceModel,
  type ResourceNode,
} from "../../../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../../../src/core/resource/resourceLifecycle.js";
import { ResourceStabilization } from "../../../../../src/core/resource/resourceStabilization.js";
import { resourceTiming } from "../../resourceTiming.js";

/**
 * The identity schema requires the original RoleId because IAM addresses
 * a role by name. A later command can tell the saved role from a different
 * role that has the same name.
 */
const identity = Schema.Struct({
  RoleName: Role.schema.fields.RoleName,
  RoleId: IamRoleId,
});

const missing = AwsServiceError.hasCode("NoSuchEntity");

class ServiceLinkedRoleDeletionFailed extends Data.TaggedError(
  "ServiceLinkedRoleDeletionFailed",
)<{
  readonly roleName: string;
  readonly task: string;
  readonly reason: string | undefined;
}> {}

/**
 * The ServiceLinkedRoleManagement service leaves a role in stack state
 * if the linked AWS service refuses to release it. Resources that still
 * use the role can block deletion even after IAM accepts the request.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (DeleteServiceLinkedRole and GetServiceLinkedRoleDeletionStatus)
 */
export class ServiceLinkedRoleManagement extends Context.Service<ServiceLinkedRoleManagement>()(
  "nomoss/providers/aws/management/operations/iam/serviceLinkedRole/ServiceLinkedRoleManagement",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;
      const stabilization = yield* ResourceStabilization;
      const client = yield* AwsClient;

      const bind = client.bindOperation(iamService);

      const getRole = bind(iamOperations.GetRole);
      const createRole = bind(iamOperations.CreateServiceLinkedRole);
      const updateRole = bind(iamOperations.UpdateRole);
      const deleteRole = bind(iamOperations.DeleteServiceLinkedRole);

      const status = bind(iamOperations.GetServiceLinkedRoleDeletionStatus);

      yield* model.registerOutputsSchema(
        AWSServiceLinkedRoleResourceSchema,
        AWSServiceLinkedRoleOutputsSchema,
      );

      const lifecycle = yield* ResourceLifecycle.make(
        {
          identity,
          lookup: ({ RoleName }) =>
            getRole({ RoleName }).pipe(
              Effect.map(({ Role }) => Option.some(Role)),
              Effect.catchIf(missing, () => Effect.succeedNone),
            ),
          ownership: {
            matches: (saved, observed) => saved.RoleId === observed.RoleId,
            onMismatch: (saved) =>
              new ResourceIdentityMismatch({
                property: "RoleId",
                expected: saved.RoleId,
                actual: null,
              }),
          },
        },
        resourceTiming.iam,
      );

      /**
       * The create operation requires a valid Role in the IAM reply. The stack
       * needs its RoleId to identify the same role on later reads and mutations.
       */
      const create = Effect.fn("ServiceLinkedRole.create")(function* (
        node: ResourceNode,
      ) {
        const properties = yield* model.decodeProps(
          node,
          CreateServiceLinkedRoleRequest.schema,
        );

        const response = yield* createRole(properties);

        return yield* Schema.decodeUnknownEffect(Role)(response.Role);
      });

      /**
       * The update operation clears the role description if the declaration
       * omits it. A read with either an empty string or no description confirms
       * that IAM cleared the value.
       */
      const update = lifecycle.observedUpdate(
        (node) => model.decodeProps(node, AWSServiceLinkedRoleRequestSchema),
        Effect.fnUntraced(function* ({ RoleName }, { Description }) {
          const description = Description ?? "";

          yield* updateRole({ RoleName, Description: description });

          return (observed: typeof Role.Type) =>
            (observed.Description ?? "") === description;
        }),
      );

      /**
       * The remove operation waits for IAM to report that the deletion task
       * succeeded or failed. If the task fails, the error includes its ID and
       * any reason IAM returned, so the caller can find out why the role remains.
       */
      const remove = Effect.fn("ServiceLinkedRole.remove")(function* ({
        RoleName,
      }: typeof identity.Type) {
        const { DeletionTaskId } = yield* deleteRole({ RoleName });

        const result = yield* status({ DeletionTaskId }).pipe(
          Effect.map(
            Option.liftPredicate(
              ({ Status }) => Status === "SUCCEEDED" || Status === "FAILED",
            ),
          ),
          stabilization.waitForPresence("90 seconds"),
        );

        yield* Effect.fail(
          new ServiceLinkedRoleDeletionFailed({
            roleName: RoleName,
            task: DeletionTaskId,
            reason: result.Reason?.Reason,
          }),
        ).pipe(Effect.when(Effect.succeed(result.Status === "FAILED")));
      });

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) => lifecycle.observe(command),
          Create: lifecycle.create(create, { checkpoint: Role }),
          Update: lifecycle.update(update),
          Destroy: lifecycle.remove(
            (saved) =>
              remove(saved).pipe(Effect.catchIf(missing, () => Effect.void)),
            {},
          ),
        }),
      );
    }),
  },
) {}

import { IamRoleId } from "../../mappings/iam/iamIdentity.js";
