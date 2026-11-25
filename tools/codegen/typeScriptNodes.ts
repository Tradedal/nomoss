import { Array as Arr, Match } from "effect";
import { ts } from "ts-morph";

export const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const expressionFile = ts.createSourceFile(
  "expression.ts",
  "",
  ts.ScriptTarget.Latest,
);

/**
 * The print helper supplies text to ts-morph when an API cannot accept a
 * constructed node. Callers must use the exported printer with the original
 * source file when a node's comments or whitespace depend on that file.
 */
export const print = (node: ts.Node): string => {
  const source: string = printer.printNode(
    ts.EmitHint.Unspecified,
    node,
    expressionFile,
  );

  return source;
};

/**
 * The literal helper keeps a name supplied by a provider as a string value in
 * generated code. The TypeScript printer escapes quotes and control characters
 * so they cannot change the meaning of the expression that contains the value.
 */
export const literal = (value: string) => {
  const expression: ts.StringLiteral = ts.factory.createStringLiteral(value);

  return expression;
};

/**
 * The identifier helper requires a valid TypeScript identifier because its
 * result refers to a declaration. Callers use the literal or access helper for
 * a provider's field when its name needs quotes.
 */
export const identifier = (name: string) => {
  const expression: ts.Identifier = ts.factory.createIdentifier(name);

  return expression;
};

/**
 * The property helper requires callers to quote a field's name when it cannot
 * appear as a TypeScript identifier. The literal and print helpers supply that
 * quoted form for a field in a generated object.
 */
export const property = (name: string, value: ts.Expression) => {
  const assignment: ts.PropertyAssignment = ts.factory.createPropertyAssignment(
    name,
    value,
  );

  return assignment;
};

/**
 * The strings helper keeps parameter names in the order recorded by the
 * catalog. Each name remains a string value, including names whose punctuation
 * would have another meaning in a TypeScript expression.
 */
export const strings = (values: ReadonlyArray<string>) => {
  const expression: ts.ArrayLiteralExpression =
    ts.factory.createArrayLiteralExpression(Arr.map(values, literal));

  return expression;
};

/**
 * The access helper allows generated code to read a field whose name requires
 * quotes. Callers can request optional access when a previous saved output may
 * be absent, so the read does not require a previous observation.
 */
export const access = (
  target: ts.Expression,
  name: string,
  optional = false,
) => {
  const token = Match.value(optional).pipe(
    Match.when(true, () =>
      ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
    ),
    Match.orElse(() => undefined),
  );

  const expression: ts.Expression = Match.value(
    /^[$_\p{ID_Start}](?:[$\p{ID_Continue}]|\u200C|\u200D)*$/u.test(name),
  ).pipe(
    Match.when(true, () =>
      ts.factory.createPropertyAccessChain(target, token, name),
    ),
    Match.orElse(() =>
      ts.factory.createElementAccessChain(target, token, literal(name)),
    ),
  );

  return expression;
};

/**
 * The call helper supports generated invocations whose types follow from their
 * arguments. Callers use the TypeScript factory directly when an invocation
 * requires explicit type arguments.
 */
export const call = (
  target: ts.Expression,
  args: ReadonlyArray<ts.Expression>,
) => {
  const expression: ts.CallExpression = ts.factory.createCallExpression(
    target,
    undefined,
    args,
  );

  return expression;
};

/**
 * The constant helper lets an emitter give an operation's final value an
 * explicit domain type. Its statement can appear inside the operation's
 * generator because it does not export the local value.
 */
export const constant = (
  name: string,
  value: ts.Expression,
  type?: ts.TypeNode,
) => {
  const statement: ts.VariableStatement = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [ts.factory.createVariableDeclaration(name, undefined, type, value)],
      ts.NodeFlags.Const,
    ),
  );

  return statement;
};

/**
 * The yieldAll helper requires an Effect.gen or Effect.fn operation to contain its output.
 * That operation carries failures and required services from the yielded
 * Effect to the generated method's caller.
 */
export const yieldAll = (value: ts.Expression) => {
  const expression: ts.YieldExpression = ts.factory.createYieldExpression(
    ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
    value,
  );

  return expression;
};

/**
 * The effectFunction helper gives callers a traced Effect operation whose
 * failures and required services follow from its body. The emitter must supply
 * statements that bind the final value to its domain type and return it.
 */
export const effectFunction = (
  name: string,
  parameters: ReadonlyArray<ts.ParameterDeclaration>,
  statements: ReadonlyArray<ts.Statement>,
) => {
  const body = ts.factory.createFunctionExpression(
    undefined,
    ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
    undefined,
    undefined,
    parameters,
    undefined,
    ts.factory.createBlock(statements, true),
  );

  const expression: ts.Expression = call(
    call(access(identifier("Effect"), "fn"), [literal(name)]),
    [body],
  );

  return expression;
};
