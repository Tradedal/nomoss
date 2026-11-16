import { Array as Arr, Match, Record, type Schema } from "effect";
import { ts } from "ts-morph";

/**
 * jsonExpression preserves JSON values when generators embed catalog metadata
 * in TypeScript. Property names and negative numbers retain their meaning in
 * the emitted syntax tree.
 */
export const jsonExpression = (value: Schema.Json): ts.Expression => {
  const factory = ts.factory;

  const expression: ts.Expression = Match.value(value).pipe(
    Match.when(Match.string, (value) => factory.createStringLiteral(value)),
    Match.when(Match.number, (value) =>
      Match.value(value < 0).pipe(
        Match.when(true, () =>
          factory.createPrefixUnaryExpression(
            ts.SyntaxKind.MinusToken,
            factory.createNumericLiteral(-value),
          ),
        ),
        Match.orElse(() => factory.createNumericLiteral(value)),
      ),
    ),
    Match.when(true, () => factory.createTrue()),
    Match.when(false, () => factory.createFalse()),
    Match.when(null, () => factory.createNull()),
    Match.when(Arr.isArray<Schema.Json>, (values) =>
      factory.createArrayLiteralExpression(
        Arr.map(values, jsonExpression),
        true,
      ),
    ),
    Match.orElse((record) =>
      factory.createObjectLiteralExpression(
        Arr.map(Record.toEntries(record), ([name, value]) =>
          factory.createPropertyAssignment(
            factory.createStringLiteral(name),
            jsonExpression(value),
          ),
        ),
        true,
      ),
    ),
  );

  return expression;
};
