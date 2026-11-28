import { AwsClient } from "@nomoss/aws";
import {
  type AccessKeyMetadata,
  iamOperations,
  iamService,
  StatusType,
} from "@nomoss/aws/iam";
import { AwsServiceError } from "@nomoss/aws/model";
import { Array as Arr, Context, Effect, Option, Schema, Stream } from "effect";
import {
  AWSAccessKeyOutputsSchema,
  AWSAccessKeyRequestSchema,
  AWSAccessKeyResourceSchema,
} from "nomoss/providers/aws/iam/accesskey";
import {
  ResourceModel,
  type ResourceNode,
} from "../../../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../../../src/core/resource/resourceLifecycle.js";
import { resourceTiming } from "../../resourceTiming.js";

/**
 * The identity schema requires the access key ID and its secret in saved
 * state. IAM's key list can confirm the ID, but the stack can recover the
 * secret only from the original create reply or its own state.
 */
const identity = Schema.Struct({
  UserName: AWSAccessKeyRequestSchema.fields.UserName,
  Id: AwsCredentials.fields.accessKeyId,
  SecretAccessKey: AwsCredentials.fields.secretAccessKey,
});

/**
 * The checkpoint schema lets a stack resume an interrupted create without
 * a second request for a key. The saved status records what IAM reported when
 * it issued the key; a fresh read determines whether the stack still needs
 * a status change.
 */
const checkpoint = Schema.Struct({ ...identity.fields, Status: StatusType });

const requestedStatus = Schema.Literals(["Active", "Inactive"]);

const missing = AwsServiceError.hasCode("NoSuchEntity");

/**
 * The AccessKeyManagement service supports an interrupted apply for a key
 * that IAM has already issued. IAM exposes the secret in the create reply
 * only, so the stack preserves that reply in protected state until it can
 * confirm the key and expose its outputs.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateAccessKey)
 */
export class AccessKeyManagement extends Context.Service<AccessKeyManagement>()(
  "nomoss/providers/aws/management/operations/iam/accessKey/AccessKeyManagement",
  {
    make: Effect.gen(function* () {
      const model = yield* ResourceModel;
      const client = yield* AwsClient;

      const bind = client.bindOperation(iamService);

      const createAccessKey = bind(iamOperations.CreateAccessKey);
      const updateAccessKey = bind(iamOperations.UpdateAccessKey);
      const deleteAccessKey = bind(iamOperations.DeleteAccessKey);

      const listAccessKeys = client.bindOperationPages(iamService)(
        iamOperations.ListAccessKeys,
      );

      yield* model.registerOutputsSchema(
        AWSAccessKeyResourceSchema,
        AWSAccessKeyOutputsSchema,
      );

      const propsFor = (node: ResourceNode) =>
        model.decodeProps(node, AWSAccessKeyRequestSchema);

      /**
       * The statusFor operation uses Active if the declaration omits Status. If
       * you remove an explicit Inactive value, the next apply can reactivate the
       * same key.
       */
      const statusFor = (node: ResourceNode) =>
        propsFor(node).pipe(
          Effect.flatMap(({ Status }) =>
            Schema.decodeUnknownEffect(requestedStatus)(Status ?? "Active"),
          ),
        );

      /**
       * The lookup operation can prove the saved key is absent if IAM reports
       * that the user is gone or if the full key list excludes the saved ID.
       * Stream.runHead stops at the first match. If a page fails before that
       * match, the stack cannot assume it is safe to discard the key record.
       *
       * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (ListAccessKeys)
       * @see ../../../../../refs/effect/packages/effect/src/Stream.ts (runHead)
       */
      const lookup = Effect.fn("AccessKey.lookup")(function* (
        saved: typeof identity.Type,
      ) {
        const key: Option.Option<AccessKeyMetadata> = yield* listAccessKeys({
          UserName: saved.UserName,
        }).pipe(
          Stream.map(({ AccessKeyMetadata }) =>
            Arr.findFirst(
              AccessKeyMetadata,
              ({ AccessKeyId }) => AccessKeyId === saved.Id,
            ),
          ),
          Stream.filter(Option.isSome),
          Stream.map(({ value }) => value),
          Stream.runHead,
          Effect.catchIf(missing, () => Effect.succeedNone),
        );

        return yield* key.pipe(
          Option.map(({ Status }) =>
            Schema.decodeUnknownEffect(StatusType)(Status).pipe(
              Effect.map((Status) => ({ ...saved, Status })),
            ),
          ),
          Effect.transposeOption,
        );
      });

      const lifecycle = yield* ResourceLifecycle.make(
        { identity, lookup },
        resourceTiming.iam,
      );

      /**
       * The create operation rejects an invalid status before IAM issues a key.
       * A declaration may ask for an inactive key, but IAM creates it as Active.
       * The stack saves the issued key before it applies the requested status.
       *
       * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateAccessKey)
       */
      const create = Effect.fn("AccessKey.create")(function* (
        node: ResourceNode,
      ) {
        const { UserName } = yield* propsFor(node);

        yield* statusFor(node);

        const { AccessKey } = yield* createAccessKey({ UserName });

        const created = yield* Schema.decodeEffect(checkpoint)({
          UserName: AccessKey.UserName,
          Id: AccessKey.AccessKeyId,
          SecretAccessKey: AccessKey.SecretAccessKey,
          Status: AccessKey.Status,
        });

        return created;
      });

      /**
       * The applyStatus operation changes the status of the key the stack already
       * has. If the latest read already shows the requested status, a resumed
       * apply leaves it unchanged. The result checks that status on a later read.
       */
      const applyStatus = Effect.fn("AccessKey.applyStatus")(function* (
        key: typeof checkpoint.Type,
        Status: typeof requestedStatus.Type,
      ) {
        yield* updateAccessKey({
          UserName: key.UserName,
          AccessKeyId: key.Id,
          Status,
        }).pipe(Effect.when(Effect.succeed(key.Status !== Status)));

        return (observed: typeof checkpoint.Type) => observed.Status === Status;
      });

      /**
       * The remove operation accepts NoSuchEntity from IAM so teardown can resume
       * after the provider deleted the key but the stack still has its record.
       */
      const remove = (key: typeof identity.Type) =>
        deleteAccessKey({
          UserName: key.UserName,
          AccessKeyId: key.Id,
        }).pipe(Effect.catchIf(missing, () => Effect.void));

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) => lifecycle.observe(command),
          Create: lifecycle.create(create, {
            checkpoint,
            configure: (node, observed) =>
              statusFor(node).pipe(
                Effect.flatMap((status) => applyStatus(observed, status)),
              ),
          }),
          Update: lifecycle.update(
            lifecycle.observedUpdate(statusFor, applyStatus),
          ),
          Destroy: lifecycle.remove(remove, {}),
        }),
      );
    }),
  },
) {}

import { AwsCredentials } from "@nomoss/aws/config";
