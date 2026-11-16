# Resource outputs

A resource entity exposes the values returned by its provider after apply. An AWS queue entity, for example, exposes its URL through `queue.outputs.QueueUrl`. That property reads the queue's applied record in memory, so the read completes synchronously without a provider or storage request.

## Output values after apply

In the [queue definition](../../examples/queue/stack.ts), `queue` holds the entity returned by `registerQueue` and `operations` is the ResourceStackOperations service. The declaration passes the following callback to `prepare` inside its Effect scope. Nomoss evaluates the callback after apply saves provider values, which allows the declaration to finish before the queue exists.

```ts
const prepared = yield* operations.prepare("queue", () => ({
  queueUrl: queue.outputs.QueueUrl,
}));
return prepared;
```

The [deployment program](../../examples/queue/deploy.ts) evaluates that declaration, then applies its prepared stack after the declaration scope has closed. The callback's return type makes `result.outputs.queueUrl` a string. An unchanged apply also evaluates the callback and returns the URL.

```ts
const prepared = yield* queueStackDefinition;
const result = yield* operations.apply(prepared);
const queueUrl: string = result.outputs.queueUrl;
```

The callback captures the `queue` variable from the declaration. Each call to `queue.outputs.QueueUrl` reads the entity's current applied record, so a successful replacement supplies the new URL through that same object. A failed update leaves the last applied value available.

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

The price can be declared before Stripe assigns the product's ID because `product` holds the resource entity. On the first apply, Nomoss creates the product first, reads its applied ID, and supplies that ID in the price request. After replacement or reload, the relationship resolves from the product's current applied record. Nomoss rejects an ID string, ARN, or scalar output reference in that property during relationship validation. The [resource graph contract](resource-graph.md) defines the supported mappings and request validation.

Entity inputs are available for resolved Stripe relationships. AWS generation and unresolved provider relationships still need the work recorded in the [API tracker](../../attempts/dev-attempts_unified-resource-generation.md), so those fields continue to use their current value schemas.

## Application Layer composition

The queue deployment supplies declaration and apply through one application Layer graph, which gives output reads access to that deployment's schemas and applied state. The [Effect guide](../development/effect-native-development.md#connect-services-and-manage-their-lifetimes) explains this service setup. For separate plan review or future direct returns from declarations, see the [application API contract](infrastructure-application-api.md#services-and-reviewed-plans).

## Output failures

An output read throws ResourceOutputResolutionMissing if preparation has not run, the resource has no applied record, or the selected optional field is absent. The error names the source resource and output. An absent required field or another output schema violation produces SchemaError.

ResourceStackOutputFailed reports a callback exception after infrastructure changes have been saved. Its cause identifies the callback error or unavailable provider value. Correct the callback, or refresh provider values with `operations.reconcile(prepared)`, then evaluate the declaration and apply again to obtain the result. Reconciliation leaves the callback unevaluated.
