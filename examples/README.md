# Examples

Each `application.ts` shows the stack's resources, provider, and state store. Run `yarn nomoss --help` from the repository root to see the stack names accepted by the shared CLI. [CLI entry point](cli.ts)

| Example | What it shows | How to try it |
| --- | --- | --- |
| [Queue](queue/application.ts) | Give a worker 31 seconds to process a message before SQS makes it available again. | `yarn nomoss queue diff` previews the declaration. Native deployment is unavailable. |
| [State machine](state-machine/application.ts) | Declare a workflow and its execution role. The workflow definition waits five seconds before returning a ready status. | Native deployment is unavailable. |
| [Stripe billing](stripe-billing/application.ts) | Offer monthly and annual prices for one membership and let subscribers switch plans in the billing portal. Nomoss creates the product and prices before it configures the portal with their Stripe IDs. | Set `STRIPE_API_KEY` to a Stripe sandbox key, then run `yarn nomoss stripe-billing diff`. |

For Stripe billing, replace `diff` with `create` to deploy the stack, `update` to apply later edits, or `delete` to remove its managed resources. Each example stores state under `.nomoss/state`.
