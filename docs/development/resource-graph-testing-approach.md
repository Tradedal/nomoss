# Test resource graph behavior

Test resource graph behavior through the production operations that applications call. Pure domain rules may use values directly. A workflow must execute the real internal decisions and service graph; control its external provider or transport effects through the responsible services.

Choose the public operation that can establish the claimed behavior. To check how a provider adapter interprets a response or error, supply the raw value and assert the domain state or tagged failure it returns. To check how a resource policy or reconciliation operation chooses an action, supply domain observations and assert the decision. To check apply, pass plan decisions through that operation and observe the create, repair, or destroy result its caller receives.

Exercise the complete service path to establish a workflow result. Use local storage and controlled external effects to observe saved state, dependency order, provider actions, and cleanup. A helper test alone cannot establish those application outcomes.

Shared fixtures must provide typed transport responses, local state storage, configuration, and tracing through the services used by production. If a test needs more control over an external effect, add it to the shared fixture for that adapter. Internal decisions must continue to run as production code.
