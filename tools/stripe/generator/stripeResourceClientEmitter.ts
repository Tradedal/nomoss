import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Option,
  Record,
  String as Str,
} from "effect";
import {
  type Block,
  type FunctionDeclaration,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import type { ResourceOutputCatalog } from "../../codegen/resourceSchemas.js";
import type { StripeOpenApiInvocation } from "../model.js";
import {
  access,
  call,
  constant,
  effectFunction,
  identifier,
  literal,
  print,
  property,
  yieldAll,
} from "./typeScriptNodes.js";

const factory = ts.factory;

/**
 * The StripeResourceClientEmitter service lets resources use the same Stripe
 * contracts as direct clients. A resource's saved outputs identify the object
 * to read, so observation does not depend on the props desired for creation.
 */
export class StripeResourceClientEmitter extends Context.Service<StripeResourceClientEmitter>()(
  "nomoss/tools/stripe/generator/stripeResourceClientEmitter",
  {
    make: Effect.sync(() => {
      /**
       * The emitReadInputBinding service method gives generated callers a
       * function that identifies a provider object from saved outputs. The
       * resource must select executable operations or this call fails with
       * NoSuchElementError. Before publication, the caller must import the
       * types for those outputs and the selected operation into the module
       * that contains the returned function.
       */
      const emitReadInputBinding = Effect.fn(
        "StripeResourceClientEmitter.emitReadInputBinding",
      )(function* (
        module: SourceFile,
        resource: ResourceOutputCatalog,
        operation: StripeOpenApiInvocation,
      ) {
        const binding = yield* Effect.fromOption(
          Option.fromUndefinedOr(resource.operations),
        );

        const [provider, , name] = Str.split(resource.typeName, "::");

        const outputType = factory.createTypeReferenceNode(
          `${provider}${name}Outputs`,
        );

        const inputType = factory.createTypeReferenceNode(
          `${operation.name}Input`,
        );

        const fields = Arr.map(
          Record.toEntries(binding.read.parameters),
          ([name, output]) =>
            property(
              print(literal(name)),
              access(identifier("outputs"), output),
            ),
        );

        const declaration = module.addFunction({
          isExported: true,
          leadingTrivia: (writer) => writer.blankLine(),
          name: `bind${provider}${name}ReadInput`,
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    `The bind${provider}${name}ReadInput function identifies the object to read.`,
                  )
                  .write(
                    "Its input must contain outputs saved or observed for that resource.",
                  ),
            },
          ],
          parameters: [{ name: "outputs", type: print(outputType) }],
          returnType: print(inputType),
        });

        declaration.addStatements([
          print(
            constant(
              "input",
              factory.createObjectLiteralExpression(fields, true),
              inputType,
            ),
          ),
          (writer) =>
            writer
              .blankLine()
              .write(print(factory.createReturnStatement(identifier("input")))),
        ]);

        const readInput: FunctionDeclaration = declaration;

        return readInput;
      });

      /**
       * The emitCreate service method gives a generated resource client a
       * create method that accepts the declaration's props contract. It checks
       * the resolved values against the operation schema before it invokes
       * StripeClient. The client constructor supplies that service, and the
       * module imports the operation's schema. The returned body exposes a
       * creation method whose result is the decoded provider response.
       */
      const emitCreate = Effect.fn("StripeResourceClientEmitter.emitCreate")(
        function* (
          body: Block,
          resource: ResourceOutputCatalog,
          operation: StripeOpenApiInvocation,
        ) {
          const [provider, , name] = Str.split(resource.typeName, "::");

          const propsName = Str.replace(
            /Schema$/,
            "",
          )(resource.propsSchema ?? `${provider}${name}PropsSchema`);

          const props = factory.createParameterDeclaration(
            undefined,
            undefined,
            "props",
            undefined,
            factory.createTypeReferenceNode(propsName),
          );

          const decode = call(
            access(identifier("Schema"), "decodeUnknownEffect"),
            [identifier(`${operation.name}Input`)],
          );
          const input = constant(
            "input",
            yieldAll(call(decode, [identifier("props")])),
            factory.createTypeReferenceNode(`${operation.name}Input`),
          );

          const invoke = call(access(identifier("client"), "invoke"), [
            identifier(`${operation.name}Operation`),
            identifier("input"),
          ]);

          const created = constant(
            "created",
            yieldAll(invoke),
            factory.createTypeReferenceNode(`${operation.name}Output`),
          );

          const method = effectFunction(
            `${provider}${name}.create`,
            [props],
            [
              input,
              created,
              factory.createReturnStatement(identifier("created")),
            ],
          );

          body.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            docs: [
              {
                description: (writer) =>
                  writer
                    .newLine()
                    .writeLine(
                      "The create service method requires all output references in props to be resolved.",
                    )
                    .writeLine(
                      "It validates those values with the creation schema and returns the decoded",
                    )
                    .write(
                      "response. Validation and API failures propagate to the caller.",
                    ),
              },
            ],
            leadingTrivia: (writer) => writer.blankLine(),
            declarations: [{ name: "create", initializer: print(method) }],
          });

          const generated: Block = body;

          return generated;
        },
      );

      /**
       * The emitRead service method gives a generated resource client a read
       * method that identifies an object from its saved outputs. The client
       * module must supply the function that binds those outputs to the
       * selected operation's input and import its contract. The generated
       * method returns a decoded observation and leaves API failures,
       * including 404s, for the resource policy to interpret.
       */
      const emitRead = Effect.fn("StripeResourceClientEmitter.emitRead")(
        function* (
          body: Block,
          resource: ResourceOutputCatalog,
          operation: StripeOpenApiInvocation,
        ) {
          const [provider, , name] = Str.split(resource.typeName, "::");

          const outputs = factory.createParameterDeclaration(
            undefined,
            undefined,
            "outputs",
            undefined,
            factory.createTypeReferenceNode(`${provider}${name}Outputs`),
          );

          const bind = call(identifier(`bind${provider}${name}ReadInput`), [
            identifier("outputs"),
          ]);

          const input = constant(
            "input",
            bind,
            factory.createTypeReferenceNode(`${operation.name}Input`),
          );

          const invoke = call(access(identifier("client"), "invoke"), [
            identifier(`${operation.name}Operation`),
            identifier("input"),
          ]);

          const observed = constant(
            "observed",
            yieldAll(invoke),
            factory.createTypeReferenceNode(`${operation.name}Output`),
          );

          const method = effectFunction(
            `${provider}${name}.read`,
            [outputs],
            [
              input,
              observed,
              factory.createReturnStatement(identifier("observed")),
            ],
          );

          body.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            docs: [
              {
                description: (writer) =>
                  writer
                    .newLine()
                    .writeLine(
                      "The read service method observes the object identified by saved outputs.",
                    )
                    .writeLine(
                      "The result is the decoded response before the policy merges saved values.",
                    )
                    .write(
                      "API failures propagate so the policy can decide whether the object is absent.",
                    ),
              },
            ],
            leadingTrivia: (writer) => writer.blankLine(),
            declarations: [{ name: "read", initializer: print(method) }],
          });

          const generated: Block = body;

          return generated;
        },
      );

      /**
       * The emitUpdate service method requires the selected update contract
       * and its schema imports in the generated module. Saved output bindings
       * supply identity independently of the changes a caller requests. Its
       * generated method accepts that operation's remaining inputs and returns
       * the decoded response; validation and provider failures propagate.
       */
      const emitUpdate = Effect.fn("StripeResourceClientEmitter.emitUpdate")(
        function* (
          body: Block,
          resource: ResourceOutputCatalog,
          operation: StripeOpenApiInvocation,
        ) {
          const binding = yield* Option.fromUndefinedOr(
            resource.operations?.update,
          ).pipe(Effect.fromOption);
          const [provider, , name] = Str.split(resource.typeName, "::");
          const inputType = factory.createTypeReferenceNode(
            `${operation.name}Input`,
          );
          const changesType = factory.createTypeReferenceNode("Omit", [
            inputType,
            factory.createUnionTypeNode(
              Arr.map(Record.keys(binding.parameters), (parameter) =>
                factory.createLiteralTypeNode(literal(parameter)),
              ),
            ),
          ]);
          const parameters = [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              "outputs",
              undefined,
              factory.createTypeReferenceNode(`${provider}${name}Outputs`),
            ),
            factory.createParameterDeclaration(
              undefined,
              undefined,
              "changes",
              undefined,
              changesType,
            ),
          ];
          const fields = Arr.map(
            Record.toEntries(binding.parameters),
            ([parameter, output]) =>
              property(
                print(literal(parameter)),
                access(identifier("outputs"), output),
              ),
          );
          const request = factory.createObjectLiteralExpression(
            [factory.createSpreadAssignment(identifier("changes")), ...fields],
            true,
          );
          const decode = call(access(identifier("Schema"), "decodeEffect"), [
            identifier(`${operation.name}Input`),
          ]);
          const input = constant(
            "input",
            yieldAll(call(decode, [request])),
            inputType,
          );
          const changed = constant(
            "changed",
            yieldAll(
              call(access(identifier("client"), "invoke"), [
                identifier(`${operation.name}Operation`),
                identifier("input"),
              ]),
            ),
            factory.createTypeReferenceNode(`${operation.name}Output`),
          );
          const method = effectFunction(
            `${provider}${name}.update`,
            parameters,
            [
              input,
              changed,
              factory.createReturnStatement(identifier("changed")),
            ],
          );

          body.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            leadingTrivia: (writer) => writer.blankLine(),
            docs: [
              {
                description: (writer) =>
                  writer
                    .newLine()
                    .writeLine(
                      "The update service method identifies the object through saved outputs.",
                    )
                    .writeLine(
                      "Changes follow the selected update operation's input contract. Identity",
                    )
                    .writeLine(
                      "comes from saved outputs and takes precedence over supplied changes.",
                    )
                    .write(
                      "The result is the decoded provider response; validation and API failures propagate.",
                    ),
              },
            ],
            declarations: [{ name: "update", initializer: print(method) }],
          });

          const generated: Block = body;
          return generated;
        },
      );

      /**
       * The emitResourceClient service method lets an application create a
       * resource and read its saved identity through a generated service. Its
       * Layer requires the application's StripeClient service. The supplied
       * operations must match the resource's bindings for creation and reads.
       * Before publication, the caller must supply the schema types and the
       * function that binds saved outputs to the read input in this module.
       */
      const emitResourceClient = Effect.fn(
        "StripeResourceClientEmitter.emitResourceClient",
      )(function* (
        module: SourceFile,
        resource: ResourceOutputCatalog,
        create: StripeOpenApiInvocation,
        read: StripeOpenApiInvocation,
        update?: StripeOpenApiInvocation,
      ) {
        const [provider, , name] = Str.split(resource.typeName, "::");
        const serviceName = `${provider}${name}ResourceClient`;

        const acquisition = factory.createFunctionExpression(
          undefined,
          factory.createToken(ts.SyntaxKind.AsteriskToken),
          undefined,
          undefined,
          [],
          undefined,
          factory.createBlock(
            [constant("client", yieldAll(identifier("StripeClient")))],
            true,
          ),
        );

        const acquire = call(access(identifier("Effect"), "gen"), [
          acquisition,
        ]);

        const service = factory.createCallExpression(
          access(identifier("Context"), "Service"),
          [factory.createTypeReferenceNode(serviceName)],
          [],
        );

        const registration = call(service, [
          literal(
            `nomoss/providers/stripe/client/generated/resourceBindings/${name}/${serviceName}`,
          ),
          factory.createObjectLiteralExpression(
            [property("make", acquire)],
            true,
          ),
        ]);

        const declaration = module.addClass({
          isExported: true,
          name: serviceName,
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    `The ${serviceName} service creates resources from resolved props.`,
                  )
                  .writeLine(
                    "Its reads identify the provider object through saved outputs. The application",
                  )
                  .write(
                    "supplies credentials and transport through its StripeClient service.",
                  ),
            },
          ],
          leadingTrivia: (writer) => writer.blankLine(),
          extends: print(registration),
        });

        const body = declaration.getFirstDescendantByKindOrThrow(
          ts.SyntaxKind.Block,
        );

        module.addImportDeclaration({
          moduleSpecifier: "../../stripeClient.js",
          namedImports: ["StripeClient"],
        });

        yield* Effect.forEach(
          Record.toEntries(
            Arr.groupBy(
              [create, read, ...Option.toArray(Option.fromUndefinedOr(update))],
              (operation) => operation.client,
            ),
          ),
          ([client, operations]) =>
            Effect.sync(() =>
              module.addImportDeclaration({
                moduleSpecifier: `../${client}.js`,
                namedImports: Arr.dedupe(
                  Arr.map(
                    operations,
                    (operation) => `${operation.name}Operation`,
                  ),
                ),
              }),
            ),
          { discard: true },
        );

        yield* emitCreate(body, resource, create);
        yield* emitRead(body, resource, read);

        yield* Effect.forEach(
          Option.toArray(Option.fromUndefinedOr(update)),
          (operation) => emitUpdate(body, resource, operation),
          { discard: true },
        );

        const api = factory.createObjectLiteralExpression(
          [
            factory.createShorthandPropertyAssignment("create"),
            factory.createShorthandPropertyAssignment("read"),
            ...Arr.map(Option.toArray(Option.fromUndefinedOr(update)), () =>
              factory.createShorthandPropertyAssignment("update"),
            ),
          ],
          true,
        );

        body.addStatements((writer) =>
          writer.blankLine().write(print(factory.createReturnStatement(api))),
        );

        const layer = call(access(identifier("Layer"), "effect"), [
          identifier(serviceName),
          access(identifier(serviceName), "make"),
        ]);

        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          leadingTrivia: (writer) => writer.blankLine(),
          declarations: [
            {
              name: `${Str.uncapitalize(provider)}${name}ResourceClientLayer`,
              initializer: print(layer),
            },
          ],
        });

        const generated: SourceFile = module;

        return generated;
      });

      return {
        emitReadInputBinding,
        emitCreate,
        emitRead,
        emitUpdate,
        emitResourceClient,
      };
    }),
  },
) {}

export const stripeResourceClientEmitterLayer = Layer.effect(
  StripeResourceClientEmitter,
  StripeResourceClientEmitter.make,
);
