import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { localState } from "nomoss/core";
import { AwsProviderLive, awsClientConfigLayer } from "nomoss/providers/aws";
import { AWSRole } from "nomoss/providers/aws/iam/role";
import { AWSStateMachine } from "nomoss/providers/aws/stepfunctions/statemachine";

/**
 * The stateMachineStack definition declares a workflow and the IAM role it
 * assumes. The role entity supplies its ARN after creation, so the workflow
 * waits for that role. Applied outputs expose the workflow's ARN and name.
 *
 * @see ../../docs/application/resource-graph.md (Relationships and request values)
 */
export const stateMachineStack = {
  name: "state-machine",
  providers: AwsProviderLive.pipe(
    Layer.provide(
      Layer.provideMerge(awsClientConfigLayer, FetchHttpClient.layer),
    ),
  ),
  state: localState(),
  resources: Effect.gen(function* () {
    const executionRole = yield* AWSRole({
      logicalId: "ExecutionRole",
      props: {
        AssumeRolePolicyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Principal: { Service: "states.amazonaws.com" },
              Action: "sts:AssumeRole",
            },
          ],
        },
      },
    });

    const workflow = yield* AWSStateMachine({
      logicalId: "HandoffWorkflow",
      props: {
        StateMachineName: "nomoss-example-handoff",
        RoleArn: executionRole,
        Definition: {
          StartAt: "WaitForHandoff",
          States: {
            WaitForHandoff: { Type: "Wait", Seconds: 5, Next: "Ready" },
            Ready: { Type: "Pass", Result: { status: "ready" }, End: true },
          },
        },
      },
    });

    return () => ({ arn: workflow.Arn, name: workflow.Name });
  }),
};
