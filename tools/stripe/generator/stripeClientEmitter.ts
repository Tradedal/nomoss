import { Array as Arr, Context, Effect, Layer, String as Str } from "effect";
import {
  type Project,
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatement,
} from "ts-morph";
import {
  access,
  call,
  constant,
  effectFunction,
  identifier,
  literal,
  print,
  property,
  strings,
  yieldAll,
} from "../../codegen/typeScriptNodes.js";
import type { StripeOpenApiInvocation } from "../model.js";

const factory = ts.factory;

/**
 * The StripeClientEmitter service gives direct clients the same invocation
 * contracts as resource clients. Those contracts retain the specification's
 * API version when an application changes the transport or endpoint supplied
 * by its StripeClient service.
 */
export class StripeClientEmitter extends Context.Service<StripeClientEmitter>()(
  "nomoss/tools/stripe/generator/stripeClientEmitter",
  {
    make: Effect.sync(() => {
      /**
       * The emitOperation service method makes an operation's validation and
       * invocation contract available to both kinds of generated client. The
       * module must contain its compiled payload schemas. The caller supplies
       * imports for configuration and the StripeOperation type before
       * publication. API failures retain their modeled validation.
       */
      const emitOperation = Effect.fn("StripeClientEmitter.emitOperation")(
        function* (module: SourceFile, operation: StripeOpenApiInvocation) {
          const schemaTypes = factory.createTypeLiteralNode(
            Arr.map(["input", "output", "error"], (field) =>
              factory.createPropertySignature(
                [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
                field,
                undefined,
                factory.createTypeQueryNode(
                  identifier(`${operation.name}${Str.capitalize(field)}`),
                ),
              ),
            ),
          );

          const type = factory.createIntersectionTypeNode([
            factory.createTypeReferenceNode("StripeOperation"),
            schemaTypes,
          ]);

          const metadata = factory.createObjectLiteralExpression(
            [
              property("name", literal(operation.name)),
              property("method", literal(operation.method)),
              property("path", literal(operation.path)),
              property("pathParameters", strings(operation.pathParameters)),
              property("queryParameters", strings(operation.queryParameters)),
              property("contentType", literal(operation.contentType)),
              property("apiVersion", identifier("stripeApiVersion")),
              property("baseUrl", identifier("stripeApiBaseUrl")),
              property("input", identifier(`${operation.name}Input`)),
              property("output", identifier(`${operation.name}Output`)),
              property("error", identifier(`${operation.name}Error`)),
            ],
            true,
          );

          const declaration: VariableStatement = module.addVariableStatement({
            isExported: true,
            declarationKind: VariableDeclarationKind.Const,
            docs: [
              {
                description: (writer) =>
                  writer
                    .newLine()
                    .writeLine(
                      `The ${operation.name}Operation value selects the schemas`,
                    )
                    .write(
                      "that validate requests and decode responses for this API version.",
                    ),
              },
            ],
            declarations: [
              {
                name: `${operation.name}Operation`,
                type: print(type),
                initializer: print(metadata),
              },
            ],
          });

          return declaration;
        },
      );

      /**
       * The emitClientModule service method lets an application call selected
       * operations through its own StripeClient service. The returned module
       * defines an Effect that obtains that service from the application's
       * graph. Its functions validate requests and return decoded responses;
       * failures in transport, validation, or the modeled API propagate through
       * Effect. The project must already contain the client's compiled payload
       * schemas in its module. The caller must resolve imports for shared
       * models before publication.
       */
      const emitClientModule = Effect.fn(
        "StripeClientEmitter.emitClientModule",
      )(function* (
        project: Project,
        client: string,
        operations: ReadonlyArray<StripeOpenApiInvocation>,
      ) {
        const module = project.getSourceFileOrThrow(`${client}.ts`);

        module.addImportDeclarations([
          { moduleSpecifier: "effect", namedImports: ["Effect"] },
          {
            moduleSpecifier: "../stripeClient.js",
            namedImports: ["StripeClient"],
          },
          {
            moduleSpecifier: "../stripeClientModel.js",
            isTypeOnly: true,
            namedImports: ["StripeOperation"],
          },
          {
            moduleSpecifier: "./configuration.js",
            namedImports: ["stripeApiBaseUrl", "stripeApiVersion"],
          },
        ]);

        yield* Effect.forEach(
          operations,
          (operation) => emitOperation(module, operation),
          { discard: true },
        );

        const methods = Arr.map(operations, (operation) => {
          const input = factory.createParameterDeclaration(
            undefined,
            undefined,
            "input",
            undefined,
            factory.createTypeReferenceNode(`${operation.name}Input`),
          );

          const invoke = call(access(identifier("client"), "invoke"), [
            identifier(`${operation.name}Operation`),
            identifier("input"),
          ]);

          const output = constant(
            "response",
            yieldAll(invoke),
            factory.createTypeReferenceNode(`${operation.name}Output`),
          );

          const method = constant(
            operation.name,
            effectFunction(
              `${client}.${operation.name}`,
              [input],
              [output, factory.createReturnStatement(identifier("response"))],
            ),
          );

          ts.addSyntheticLeadingComment(
            method,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `*\n * The ${operation.name} function validates its request before it invokes Stripe.\n * The result is the decoded response. Failures in transport or validation\n * and modeled Stripe errors propagate to the caller.\n `,
            true,
          );

          return method;
        });

        const api = factory.createObjectLiteralExpression(
          Arr.map(operations, (operation) =>
            factory.createShorthandPropertyAssignment(operation.name),
          ),
          true,
        );

        const statements = Arr.appendAll(
          [constant("client", yieldAll(identifier("StripeClient")))],
          methods,
        );

        const acquisition = factory.createFunctionExpression(
          undefined,
          factory.createToken(ts.SyntaxKind.AsteriskToken),
          undefined,
          undefined,
          [],
          undefined,
          factory.createBlock(
            Arr.append(statements, factory.createReturnStatement(api)),
            true,
          ),
        );

        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    `The make${Str.capitalize(client)}Client Effect obtains the application's StripeClient service.`,
                  )
                  .write(
                    "Its result exposes functions with the contracts fixed by this specification.",
                  ),
            },
          ],
          declarations: [
            {
              name: `make${Str.capitalize(client)}Client`,
              initializer: print(
                call(access(identifier("Effect"), "gen"), [acquisition]),
              ),
            },
          ],
        });

        const generated: SourceFile = module;

        return generated;
      });

      return { emitOperation, emitClientModule };
    }),
  },
) {}

export const stripeClientEmitterLayer = Layer.effect(
  StripeClientEmitter,
  StripeClientEmitter.make,
);
