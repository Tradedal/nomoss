# Examples

Each `application.ts` shows the stack's resources, provider, and state store. Run `yarn nomoss --help` from the repository root to see the stack names accepted by the shared CLI. [CLI entry point](cli.ts)

| Example | What it shows | How to try it |
| --- | --- | --- |
| [Queue](queue/application.ts) | Give a worker 31 seconds to process a message before SQS makes it available again. | `yarn nomoss queue diff` |
| [State machine](state-machine/application.ts) | Declare a workflow and its execution role. The deployed workflow waits five seconds before returning a ready status when invoked. | Run `yarn nomoss state-machine diff`. |
| [Stripe billing](stripe-billing/application.ts) | Offer monthly and annual prices for one membership and let subscribers switch plans in the billing portal. Nomoss creates the product and prices before it configures the portal with their Stripe IDs. | Set `STRIPE_API_KEY` to a Stripe sandbox key, then run `yarn nomoss stripe-billing diff`. |
| [HTTP echo](http-echo/application.ts) | Route `GET /health` and `POST /echo` through API Gateway to two Lambda functions. | Run `yarn nomoss http-echo diff` to build the checked-in handler and inspect the deployment. |

With provider credentials configured, replace `diff` with `create` to deploy the stack, `update` to apply later edits, or `delete` to remove its managed resources. Each example stores state under `.nomoss/state`.

## Run HTTP echo

Run `yarn nomoss http-echo diff --detailed` to build the TypeScript handlers in [index.ts](http-echo/index.ts) and review the resources and code digest. The declaration selects the source through `Asset.fromBuild` and defines the runtime, handlers, and timeout. The build includes the handlers' Effect imports in the deployment package. Nomoss packages and deploys that code when you run `yarn nomoss http-echo create`. Supply ordinary provider credentials and region configuration for deployment. Each function calls `grantInvoke(route)` to let API Gateway invoke it for the route's method and path across the declared API's stages.

The stack calls `LambdaExecutionRole("ExecutionRole")` to create a role Lambda can assume and give it permission to write CloudWatch Logs. Both functions pass that role as `executionRole`. Nomoss waits for the role and its inline policy before creating either function, and removes both functions before deleting the role.

`yarn nomoss http-echo create` prints the API URL after deployment. To look it up later, run `yarn nomoss http-echo state read Api`. A GET to `/health` returns `{"status":"ready"}`. A POST to `/echo` returns its request body in the JSON `message` field. Edit the handler or the declared timeout and run `yarn nomoss http-echo update --detailed` to review and apply the change. Run `yarn nomoss http-echo delete` to remove the managed resources.

### Permit one EventBridge rule to invoke a function

Call `addPermission` on the function when your application supplies the service principal and source restriction. In this example, `partnerRuleArn` is the ARN of an EventBridge rule that targets `echoFunction`. Add the call to the same stack resource program as the function.

```ts
yield* echoFunction.addPermission("PartnerRule", {
  action: "lambda:InvokeFunction",
  principal: "events.amazonaws.com",
  sourceArn: partnerRuleArn,
});
```

After deploying, inspect the statement with `aws lambda get-policy` and send a matching event through the rule. Remove the call and run the stack's `update` command to revoke the rule's permission while keeping the function's other statements.
