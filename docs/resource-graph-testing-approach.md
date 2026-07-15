# Resource Graph Testing Approach

Resource graph tests follow the same service graph used by the implementation. Pure domain behavior is tested with values. Nomoss services run as real code. External effects are controlled at provider or transport adapters.

Provider adapter tests validate translation from external responses and errors into normalized domain state and tagged failures. Resource-policy tests validate how normalized state and desired resource nodes become observations. Reconciliation tests validate how observations become decisions. Apply tests validate how decisions select create, repair, and destroy operations. Workflow tests validate wiring, persisted state transitions, ordering, and cleanup across the real service graph with local state and controlled external effects.

Raw provider responses belong to adapter coverage. Decision behavior starts from domain observations. Apply behavior starts from plan decisions. Full workflow tests exercise the whole path to prove integration and sequencing.

The shared test API stays small: typed transport response control, local state storage, test config, and tracing setup. If behavior needs a new test hook, add it at the external adapter harness or shared fixture layer used by the real service graph.

The invariant is simple: tests override external effects and keep internal decisions real.
