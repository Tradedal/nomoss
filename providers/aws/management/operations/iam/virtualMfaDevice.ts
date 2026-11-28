import {
  iamOperations,
  iamService,
  makeIAMClient,
  TagMFADeviceRequest,
  UntagMFADeviceRequest,
  VirtualMFADevice,
} from "@nomoss/aws/iam";
import { AwsServiceError } from "@nomoss/aws/model";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  Option,
  Schema,
  String as Str,
  Stream,
  Struct,
} from "effect";
import {
  AWSVirtualMFADeviceOutputsSchema,
  AWSVirtualMFADeviceRequestSchema,
  AWSVirtualMFADeviceResourceSchema,
} from "nomoss/providers/aws/iam/virtualmfadevice";
import {
  ResourceModel,
  type ResourceNode,
} from "../../../../../src/core/resource/model.js";
import { ResourceLifecycle } from "../../../../../src/core/resource/resourceLifecycle.js";
import { AwsResourceMapping } from "../../resourceMapping.js";
import { resourceRequest } from "../../resourceOperation.js";
import { AwsResourceTagOperations } from "../../resourceTagOperations.js";
import { resourceTiming } from "../../resourceTiming.js";

/**
 * The identity schema requires the full IAM serial number. A device name
 * alone cannot address the device because IAM can include a path in the
 * serial number.
 */
const identity = Schema.Struct({
  SerialNumber: VirtualMFADevice.schema.fields.SerialNumber,
});

const checkpoint = identity.mapFields((fields) => ({
  ...fields,
  VirtualMfaDeviceName: Schema.String,
  Path: Schema.String,
  Users: Schema.Array(Schema.String),
  Tags: VirtualMFADevice.schema.fields.Tags,
}));

const missing = AwsServiceError.hasCode("NoSuchEntity");

const tag = resourceRequest(
  iamOperations.TagMFADevice,
  Schema.Struct({
    Parent: identity.fields.SerialNumber,
    Tags: TagMFADeviceRequest.schema.fields.Tags,
  }).pipe(Schema.encodeKeys({ Parent: "SerialNumber" })),
);

const untag = resourceRequest(
  iamOperations.UntagMFADevice,
  Schema.Struct({
    Parent: identity.fields.SerialNumber,
    TagKeys: UntagMFADeviceRequest.schema.fields.TagKeys,
  }).pipe(Schema.encodeKeys({ Parent: "SerialNumber" })),
);

/**
 * The deviceObservation function excludes the seed and QR code from saved
 * observations. Either value can produce authentication codes, so the
 * stack uses the serial number to identify the device and exposes no seed
 * material as an output.
 */
const deviceObservation = (
  current: VirtualMFADevice,
): typeof checkpoint.Type => {
  const { SerialNumber } = current;

  const resource = Str.split(SerialNumber, ":mfa/")[1];

  const separator = resource.lastIndexOf("/");

  const Users = Option.fromUndefinedOr(current.User).pipe(
    Option.map(({ UserName }) => UserName),
    Option.toArray,
  );

  return Struct.assign(
    {
      SerialNumber,
      VirtualMfaDeviceName: resource.substring(separator + 1),
      Path: `/${resource.substring(0, separator + 1)}`,
      Users,
    },
    Struct.pick(current, ["Tags"]),
  );
};

class VirtualMfaEnrollmentRequired extends Data.TaggedError(
  "VirtualMfaEnrollmentRequired",
)<{
  readonly reason: string;
}> {}

/**
 * The VirtualMfaDeviceManagement service manages a virtual device apart
 * from its enrollment. Supply an empty Users list. If an operator assigns
 * the device to a user outside the stack, IAM requires that user assignment
 * to end before the stack can delete the device.
 *
 * @see ../../../../../refs/aws-api-models/models/iam/service/2010-05-08/iam-2010-05-08.json (CreateVirtualMFADevice and EnableMFADevice)
 */
export class VirtualMfaDeviceManagement extends Context.Service<VirtualMfaDeviceManagement>()(
  "nomoss/providers/aws/management/operations/iam/virtualMfaDevice/VirtualMfaDeviceManagement",
  {
    make: Effect.gen(function* () {
      const iam = yield* makeIAMClient;

      const model = yield* ResourceModel;

      const names = yield* AwsResourceMapping;

      const tags = yield* AwsResourceTagOperations.make(iamService, {
        tag,
        untag,
      });

      yield* model.registerOutputsSchema(
        AWSVirtualMFADeviceResourceSchema,
        AWSVirtualMFADeviceOutputsSchema,
      );

      /**
       * The prepare operation fails with VirtualMfaEnrollmentRequired if Users
       * contains a name. IAM requires two consecutive authenticator codes to
       * enroll a device, and the declaration cannot supply those codes.
       */
      const prepare = Effect.fnUntraced(function* (node: ResourceNode) {
        const request = yield* model.decodeProps(
          node,
          AWSVirtualMFADeviceRequestSchema,
        );

        yield* new VirtualMfaEnrollmentRequired({
          reason:
            "Create the virtual device without Users and enroll it separately.",
        }).pipe(
          Effect.when(
            Effect.succeed(Arr.isReadonlyArrayNonEmpty(request.Users)),
          ),
        );

        return request;
      });

      /**
       * The lookup operation searches assigned and unassigned devices. If an
       * operator enrolls the saved device, the stack can still find it under the
       * same serial number. Stream.runHead stops once the serial number matches;
       * a page error before a match leaves the result unresolved.
       *
       * @see ../../../../../refs/effect/packages/effect/src/Stream.ts (filter and runHead)
       */
      const lookup = Effect.fnUntraced(function* ({
        SerialNumber,
      }: typeof identity.Type) {
        const device = yield* iam
          .listVirtualMFADevicesPages({ AssignmentStatus: "Any" })
          .pipe(
            Stream.flatMap(({ VirtualMFADevices }) =>
              Stream.fromIterable(VirtualMFADevices),
            ),
            Stream.filter((device) => device.SerialNumber === SerialNumber),
            Stream.runHead,
          );

        return Option.map(device, deviceObservation);
      });

      const lifecycle = yield* ResourceLifecycle.make(
        {
          identity,
          lookup,
        },
        resourceTiming.iam,
      );

      /**
       * The create operation returns IAM's serial number for the checkpoint.
       * If the initial confirmation fails, the next apply can look for the
       * same device by serial number.
       */
      const create = Effect.fn("VirtualMfaDevice.create")(function* (
        node: ResourceNode,
      ) {
        const request = yield* prepare(node);

        const VirtualMfaDeviceName = yield* names.resolveName(
          node,
          request.VirtualMfaDeviceName,
          226,
        );

        const input = Struct.assign(
          { VirtualMFADeviceName: VirtualMfaDeviceName },
          Struct.pick(request, ["Path", "Tags"]),
        );

        const response = yield* iam.createVirtualMFADevice(input);

        return deviceObservation(response.VirtualMFADevice);
      });

      /**
       * The update operation changes tags on the saved device. To remove a key
       * the stack previously declared, omit it from the new declaration. Tags
       * that exist only in IAM remain in place.
       */
      const update = lifecycle.observedUpdate(
        (node, current) =>
          Effect.all({ desired: prepare(node), previous: prepare(current) }),
        Effect.fnUntraced(function* (observed, { desired, previous }) {
          const accepts = yield* tags.reconcile(
            observed.SerialNumber,
            observed.Tags,
            previous.Tags,
            desired.Tags,
          );

          return (confirmed: typeof checkpoint.Type) => accepts(confirmed.Tags);
        }),
      );

      return ResourceLifecycle.execute(
        ResourceLifecycle.commands({
          Read: (command) => lifecycle.observe(command),
          Create: lifecycle.create(create, { checkpoint }),
          Update: lifecycle.update(update),
          Destroy: lifecycle.remove(
            (saved) =>
              iam
                .deleteVirtualMFADevice(saved)
                .pipe(Effect.catchIf(missing, () => Effect.void)),
            {},
          ),
        }),
      );
    }),
  },
) {}
