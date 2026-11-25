import {
  Array as Arr,
  Context,
  Effect,
  JsonPointer,
  Layer,
  Match,
  Record,
  String as Str,
} from "effect";
import {
  type FunctionDeclaration,
  type OptionalKind,
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatementStructure,
} from "ts-morph";
import type { ResourceOutputCatalog } from "../../codegen/resourceSchemas.js";
import {
  access,
  constant,
  identifier,
  literal,
  print,
} from "../../codegen/typeScriptNodes.js";

const factory = ts.factory;

/**
 * The StripeResourceDeclarations service emits entities that applications can
 * pass into related declarations before a provider creates those resources.
 * Generated output properties read the owning stack's applied values through
 * its output binding. Catalog selections determine the saved identities and
 * creation secrets that those properties must retain after later observations.
 */
export class StripeResourceDeclarations extends Context.Service<StripeResourceDeclarations>()(
  "nomoss/tools/stripe/generator/stripeResourceDeclarations",
  {
    make: Effect.sync(() => {
      /**
       * The emitOutputProjection service method gives callers a function that
       * selects values to save from a validated provider or local response.
       * For a field marked retainOnRead, a null or absent value falls back to
       * the previous output. The field stays absent from saved JSON when
       * neither value is available. The caller must validate responses before
       * projection and supply a stateType that contains the selected fields.
       */
      const emitOutputProjection = Effect.fn(
        "StripeResourceDeclarations.emitOutputProjection",
      )(
        (
          module: SourceFile,
          resource: ResourceOutputCatalog,
          stateType: ts.TypeNode,
        ) =>
          Effect.sync(() => {
            const [provider, , name] = Str.split(resource.typeName, "::");

            const outputsType = factory.createTypeReferenceNode(
              `${provider}${name}Outputs`,
            );
            const inputOutputs = Record.filter(
              resource.outputs,
              (output) => output.inputParameter !== undefined,
            );
            const resultType = Match.value(inputOutputs).pipe(
              Match.when(Record.isEmptyRecord, () => outputsType),
              Match.orElse(() =>
                factory.createTypeReferenceNode("Omit", [
                  outputsType,
                  factory.createUnionTypeNode(
                    Arr.map(Record.keys(inputOutputs), (name) =>
                      factory.createLiteralTypeNode(literal(name)),
                    ),
                  ),
                ]),
              ),
            );

            const retained = Record.filter(
              resource.outputs,
              (output) => output.retainOnRead === true,
            );

            const fields = Arr.map(
              Record.toEntries(
                Record.filter(
                  resource.outputs,
                  (output) =>
                    output.retainOnRead !== true &&
                    output.inputParameter === undefined,
                ),
              ),
              ([name, output]) => {
                const field = JsonPointer.unescapeToken(
                  Str.substring(1)(output.valuePath),
                );
                const providerValue = access(identifier("state"), field);

                const property: ts.PropertyAssignment =
                  factory.createPropertyAssignment(
                    literal(name),
                    providerValue,
                  );

                return property;
              },
            );

            /**
             * The projectRetained helper keeps a secret available to dependent
             * resources when Stripe returns it only at creation. If neither
             * the observation nor saved state supplies a value, the projected
             * JSON must omit that optional field.
             */
            const projectRetained = (
              names: ReadonlyArray<string>,
              properties: ReadonlyArray<ts.PropertyAssignment>,
            ): ts.Expression =>
              Arr.matchLeft(names, {
                onEmpty: () =>
                  factory.createObjectLiteralExpression(properties, true),
                onNonEmpty: (name, rest) => {
                  const absent = factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createParenthesizedExpression(
                      projectRetained(rest, properties),
                    ),
                  );
                  const value = identifier(`${Str.uncapitalize(name)}Value`);
                  const present = factory.createArrowFunction(
                    undefined,
                    undefined,
                    [
                      factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        value,
                      ),
                    ],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createParenthesizedExpression(
                      projectRetained(rest, [
                        ...properties,
                        factory.createPropertyAssignment(literal(name), value),
                      ]),
                    ),
                  );
                  const observed = factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                      identifier("Option"),
                      "fromNullishOr",
                    ),
                    undefined,
                    [identifier(Str.uncapitalize(name))],
                  );

                  const projection: ts.Expression =
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        identifier("Option"),
                        "match",
                      ),
                      undefined,
                      [
                        observed,
                        factory.createObjectLiteralExpression(
                          [
                            factory.createPropertyAssignment("onNone", absent),
                            factory.createPropertyAssignment("onSome", present),
                          ],
                          true,
                        ),
                      ],
                    );

                  return projection;
                },
              });

            const selectedFields = Arr.map(
              Record.values(
                Record.filter(
                  resource.outputs,
                  (output) => output.inputParameter === undefined,
                ),
              ),
              (output) =>
                factory.createLiteralTypeNode(
                  literal(
                    JsonPointer.unescapeToken(
                      Str.substring(1)(output.valuePath),
                    ),
                  ),
                ),
            );

            const inputType = factory.createTypeReferenceNode("Pick", [
              stateType,
              factory.createUnionTypeNode(selectedFields),
            ]);
            const identityDocumentation = Match.value(inputOutputs).pipe(
              Match.when(Record.isEmptyRecord, () => ""),
              Match.orElse(
                () =>
                  "\nStripeResourcePolicy supplies identity fields from creation parameters\nbefore ResourceModel validates the complete saved outputs.",
              ),
            );

            const declaration = module.addFunction({
              isExported: true,
              leadingTrivia: (writer) => writer.blankLine(),
              name: `project${provider}${name}Outputs`,
              parameters: [
                {
                  name: "state",
                  type: print(inputType),
                },
                ...Arr.match(Record.keys(retained), {
                  onEmpty: () => [],
                  onNonEmpty: () => [
                    {
                      name: "previous",
                      type: print(outputsType),
                      hasQuestionToken: true,
                    },
                  ],
                }),
              ],
              returnType: print(resultType),
              docs: [
                {
                  description: (writer) =>
                    writer
                      .newLine()
                      .writeLine(
                        `The project${provider}${name}Outputs function selects values to save`,
                      )
                      .writeLine(
                        "from a validated response. Fields marked retainOnRead use saved values",
                      )
                      .write("when the response omits them.")
                      .write(identityDocumentation),
                },
              ],
            });

            declaration.addVariableStatements(
              Arr.map(Record.toEntries(retained), ([name, output]) => {
                const field = JsonPointer.unescapeToken(
                  Str.substring(1)(output.valuePath),
                );
                const observed = access(identifier("state"), field);
                const saved = access(identifier("previous"), name, true);

                const value = factory.createBinaryExpression(
                  observed,
                  factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
                  saved,
                );

                const selected: OptionalKind<VariableStatementStructure> = {
                  declarationKind: VariableDeclarationKind.Const,
                  declarations: [
                    { name: Str.uncapitalize(name), initializer: print(value) },
                  ],
                };

                return selected;
              }),
            );

            const outputValue = projectRetained(Record.keys(retained), fields);
            const outputDeclaration = constant(
              "outputs",
              outputValue,
              resultType,
            );

            declaration.addStatements([
              (writer) => writer.blankLine().write(print(outputDeclaration)),
              (writer) =>
                writer
                  .blankLine()
                  .write(
                    print(factory.createReturnStatement(identifier("outputs"))),
                  ),
            ]);

            const projection: FunctionDeclaration = declaration;

            return projection;
          }),
      );

      return {
        emitOutputProjection,
      };
    }),
  },
) {}

export const stripeResourceDeclarationsLayer = Layer.effect(
  StripeResourceDeclarations,
  StripeResourceDeclarations.make,
);
