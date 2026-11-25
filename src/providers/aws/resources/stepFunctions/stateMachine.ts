import { Schema } from "effect";
import {
  createStateMachineOperation,
  deleteStateMachineOperation,
  describeStateMachineOperation,
  stepFunctionsService,
  updateStateMachineOperation,
} from "../../client/generated/stepFunctions.js";
import {
  resourceRequest,
  resourceResponse,
} from "../../management/resourceOperation.js";
import { awsResourceRegistration } from "../../management/resourceRegistration.js";
import {
  AWSStateMachineOutputsSchema,
  AWSStateMachineRequestSchema,
  AWSStateMachineResourceSchema,
} from "../generated/native/stepfunctions/statemachine/index.js";

const fields = AWSStateMachineRequestSchema.fields;
const outputs = AWSStateMachineOutputsSchema.fields;

// The application sets StateMachineName when it declares the workflow. After
// apply, it can read the name AWS reports through the Name output. Both use
// the same field in the AWS API.
const keys = {
  Arn: "stateMachineArn",
  Definition: "definition",
  Name: "name",
  RoleArn: "roleArn",
  StateMachineName: "name",
  StateMachineRevisionId: "revisionId",
  StateMachineType: "type",
} as const;

const identity = Schema.Struct({
  Arn: Schema.requiredKey(outputs.Arn),
}).pipe(Schema.encodeKeys(keys));

// Step Functions accepts and returns the workflow definition as JSON text.
// Schema.fromJsonString converts the declared object to text for AWS and
// parses the returned text so Nomoss can compare the definition with the
// declaration before saving an update.
//
// See refs/effect-website/apps/web/src/content/docs/v4/schema/transformations.mdx#json-strings
// in the command-options-fund reference checkout.
const settings = {
  Definition: Schema.fromJsonString(Schema.requiredKey(fields.Definition)),
  RoleArn: fields.RoleArn,
};

const createInput = Schema.Struct({
  ...settings,
  StateMachineName: Schema.requiredKey(fields.StateMachineName),
  StateMachineType: fields.StateMachineType,
}).pipe(Schema.encodeKeys(keys));

const observed = Schema.Struct({
  ...settings,
  ...AWSStateMachineOutputsSchema.fields,
  Arn: Schema.requiredKey(outputs.Arn),
  Name: Schema.requiredKey(outputs.Name),
  StateMachineType: fields.StateMachineType,
}).pipe(Schema.encodeKeys(keys));

const changes = Schema.Struct({
  ...identity.to.fields,
  Definition: Schema.optionalKey(settings.Definition),
  RoleArn: Schema.optionalKey(settings.RoleArn),
}).pipe(Schema.encodeKeys(keys));

/**
 * The stateMachineCommands Layer keeps the ARN in saved state while AWS
 * deletes the state machine. DeleteStateMachine starts deletion. The
 * registration waits for DescribeStateMachine to return
 * StateMachineDoesNotExist before core releases ownership.
 */
export const stateMachineCommands = awsResourceRegistration(
  AWSStateMachineResourceSchema,
  {
    service: stepFunctionsService,
    create: resourceResponse(
      resourceRequest(createStateMachineOperation, createInput),
      identity,
    ),
    read: resourceResponse(
      resourceRequest(describeStateMachineOperation, identity),
      observed,
    ),
    update: resourceRequest(updateStateMachineOperation, changes),
    remove: resourceRequest(deleteStateMachineOperation, identity),
    missingErrors: ["StateMachineDoesNotExist"],
    timeout: "5 minutes",
  },
);
