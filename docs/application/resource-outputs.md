# Resource outputs

A resource entity exposes the values returned by its provider after apply. An AWS queue entity, for example, exposes its URL through `queue.QueueUrl`. That property reads the queue's applied record in memory, so the read completes synchronously without a provider or storage request.

## Output values after apply

The queue application registers an SQS queue and returns a function that reads its URL. Nomoss calls that function after apply saves the URL. An embedded TypeScript application can use `ResourceStackOperations.Stack` to build the stack and read the result of apply itself. [Queue application](../../examples/queue/application.ts)

```ts
const operations = yield* ResourceStackOperations;
const prepared = yield* operations.Stack(
  "queue",
  Effect.gen(function* () {
    const queue = yield* AWSQueue({
      logicalId: "Queue",
      props: { QueueName: "events" },
    });

    return () => ({ queueUrl: queue.QueueUrl });
  }),
);
```

Pass the prepared stack to `apply` through the same operations service. The function's return type makes `result.outputs.queueUrl` a string. An unchanged apply also returns the URL.

```ts
const result = yield* operations.apply(prepared);
const queueUrl: string = result.outputs.queueUrl;
```

The callback captures the `queue` variable from the declaration. Each read of `queue.QueueUrl` uses the entity's current applied record, so a successful replacement supplies the new URL through that same object. A failed update leaves the last applied value available.

## Values for dependent requests

A relationship connects a dependent request to provider values from another resource. For example, a Stripe Price declaration accepts a Product entity through its `product` property. Here `stripe` is the StripeResources service used inside the [billing declaration](infrastructure-application-api.md#entity-relationships).

```ts
const product = yield* stripe.Product({
  logicalId: "Subscription",
  props: { name: "Application subscription" },
});

const price = yield* stripe.Price({
  logicalId: "MonthlySubscription",
  props: {
    product,
    currency: "usd",
    unit_amount: 2000,
    recurring: { interval: "month" },
  },
});
```

The `product` property holds the entity, so the application can declare the price before Stripe assigns a product ID. At apply, Nomoss creates the product and passes its validated ID to the price request. After replacement or reload, the same reference resolves to the current product. A scalar value or output reference fails entity validation. [resource graph contract](resource-graph.md)

Stripe accepts entities at relationship paths with a resolved target. Unresolved relationships keep their current value schemas. AWS entity support remains incomplete. [API tracker](../../attempts/dev-attempts_unified-resource-generation.md)

## Application Layer composition

The queue deployment supplies declaration and apply through one application Layer graph, which gives output reads access to that deployment's schemas and applied state. The [Effect guide](../development/effect-native-development.md#connect-services-and-manage-their-lifetimes) explains this service setup. For separate plan review or future direct returns from declarations, see the [application API contract](infrastructure-application-api.md#services-and-reviewed-plans).

## Output failures

An output read throws ResourceOutputResolutionMissing if preparation has not run, the resource has no applied record, or the selected optional field is absent. The error names the source resource and output. An absent required field or another output schema violation produces SchemaError.

ResourceStackOutputFailed reports a callback exception after infrastructure changes have been saved. Its cause identifies the callback error or unavailable provider value. Correct the callback, or refresh provider values with `operations.reconcile(prepared)`, then evaluate the declaration and apply again to obtain the result. Reconciliation leaves the callback unevaluated.
