import {
  Array as Arr,
  Effect,
  Match,
  Option,
  Predicate,
  Record,
  Result,
} from "effect";
import { AwsRequestError } from "./awsClientModel.js";
import { awsPartitions } from "./generated/partitions.js";

type Scalar = string | boolean | number;
type RuleRecord = Readonly<Record<string, Scalar>>;
type RuleValue = Scalar | RuleRecord;
type Scope = Readonly<Record<string, RuleValue>>;

interface FunctionCall {
  readonly fn: string;
  readonly argv: readonly Expression[];
}

type Expression = Scalar | { readonly ref: string } | FunctionCall;

interface AuthScheme {
  readonly name: Expression;
  readonly signingRegion?: Expression;
  readonly signingName?: Expression;
  readonly disableDoubleEncoding?: Expression;
  readonly disableNormalizePath?: Expression;
}

type Rule = {
  readonly conditions: readonly (FunctionCall & { readonly assign?: string })[];
} & (
  | { readonly type: "tree"; readonly rules: readonly Rule[] }
  | { readonly type: "error"; readonly error: Expression }
  | {
      readonly type: "endpoint";
      readonly endpoint: {
        readonly url: Expression;
        readonly headers: Readonly<Record<string, readonly Expression[]>>;
        readonly properties: {
          readonly authSchemes?: readonly AuthScheme[];
          readonly [key: string]: unknown;
        };
      };
    }
);

/**
 * Service models retain their rule order so modeled errors and custom
 * addresses take precedence where the service declares them.
 *
 * @see ../../../refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst (Rule set object)
 */
export interface AwsAddressRules {
  readonly version: string;
  readonly parameters: Readonly<
    Record<
      string,
      {
        readonly type: string;
        readonly required: boolean;
        readonly default?: Scalar;
        readonly documentation?: string;
        readonly builtIn?: string;
      }
    >
  >;
  readonly rules: readonly Rule[];
}

/**
 * The partitionPatterns collection compiles the Smithy region expressions.
 * For example, the China partition's pattern matches "cn-north-1" but
 * leaves "us-east-1" to the commercial partition.
 */
const partitionPatterns = awsPartitions.map(
  ({ id, regionRegex, regions, outputs }) => ({
    id,
    regions,
    outputs,
    pattern: new RegExp(regionRegex),
  }),
);

/**
 * The partitionFor function checks listed regions before matching
 * patterns. A region that matches neither uses the commercial partition,
 * as required by the Smithy aws.partition function.
 *
 * @see ../../../refs/smithy/smithy-aws-endpoints/src/main/java/software/amazon/smithy/rulesengine/aws/language/functions/partition/Partitions.java (region lookup)
 */
const partitionFor = (region: string) =>
  Arr.findFirst(partitionPatterns, ({ regions }) =>
    Arr.contains(regions, region),
  ).pipe(
    Option.orElse(() =>
      Arr.findFirst(partitionPatterns, ({ pattern }) => pattern.test(region)),
    ),
    Option.orElse(() =>
      Arr.findFirst(partitionPatterns, ({ id }) => id === "aws"),
    ),
    Option.map(({ outputs }): RuleRecord => outputs),
  );

const addressError = (message: string) => new AwsRequestError({ message });

const field = (value: RuleValue, key: string) =>
  Match.value(value).pipe(
    Match.when(Match.record, (record) => Record.get(record, key)),
    Match.orElse(() => Option.none<Scalar>()),
  );

/**
 * The addressTemplateTokens pattern keeps ordinary URL text intact while
 * substituting modeled variables. It reads "{Region}" as a reference and
 * "{{Region}}" as the literal "{Region}".
 *
 * @see ../../../refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst (String interpolation)
 */
const addressTemplateTokens = /{{([^{}]*)}}|{([^{}]+)}|([^{}]+|[{}])/g;

const interpolate = (template: string, scope: Scope) =>
  Result.all(
    Array.from(
      template.matchAll(addressTemplateTokens),
      ([, escaped, reference, literal]) =>
        Option.match(Option.fromUndefinedOr(reference), {
          onNone: () => Result.succeed(literal ?? `{${escaped}}`),
          onSome: (reference) => {
            const [name, key] = reference.split("#");
            return Record.get(scope, name).pipe(
              Option.flatMap((value) =>
                Option.match(Option.fromUndefinedOr(key), {
                  onSome: (key) => field(value, key),
                  onNone: () => Option.some(value),
                }),
              ),
              Option.filter(Predicate.isString),
              Result.fromOption(() =>
                addressError(
                  `Invalid AWS address template reference: ${reference}`,
                ),
              ),
            );
          },
        }),
    ),
  ).pipe(Result.map((parts) => parts.join("")));

const evaluate = (
  expression: Expression,
  scope: Scope,
): Result.Result<Option.Option<RuleValue>, AwsRequestError> =>
  Match.value(expression).pipe(
    Match.when(Match.string, (template) =>
      interpolate(template, scope).pipe(Result.map(Option.some)),
    ),
    Match.when(Match.boolean, (value) => Result.succeed(Option.some(value))),
    Match.when(Match.number, (value) => Result.succeed(Option.some(value))),
    Match.when({ ref: Match.string }, ({ ref }) =>
      Result.succeed(Record.get(scope, ref)),
    ),
    Match.orElse(({ fn, argv }) =>
      Result.all(argv.map((argument) => evaluate(argument, scope))).pipe(
        Result.flatMap(([left, right]) => {
          const first = Option.getOrUndefined(left ?? Option.none());
          const second = Option.getOrUndefined(right ?? Option.none());

          return Match.value(fn).pipe(
            Match.when("isSet", () => Option.some(first !== undefined)),
            Match.when("not", () => Option.some(first === false)),
            Match.when("booleanEquals", () =>
              Option.some(typeof first === "boolean" && first === second),
            ),
            Match.when("stringEquals", () =>
              Option.some(typeof first === "string" && first === second),
            ),
            Match.when("getAttr", () =>
              Option.all([
                Option.fromUndefinedOr(first),
                Option.liftPredicate(second, Predicate.isString),
              ]).pipe(Option.flatMap(([value, key]) => field(value, key))),
            ),
            Match.when("aws.partition", () =>
              Option.liftPredicate(first, Predicate.isString).pipe(
                Option.flatMap(partitionFor),
              ),
            ),
            Match.option,
            Result.fromOption(() =>
              addressError(
                `Unsupported AWS service address rule function: ${fn}`,
              ),
            ),
          );
        }),
      ),
    ),
  );

const textValue = (expression: Expression, scope: Scope) =>
  evaluate(expression, scope).pipe(
    Result.flatMap((value) =>
      Option.filter(value, Predicate.isString).pipe(
        Result.fromOption(() =>
          addressError("Expected a string in the AWS service address rules"),
        ),
      ),
    ),
    Effect.fromResult,
  );

type MatchedRule = {
  readonly rule: Exclude<Rule, { readonly type: "tree" }>;
  readonly scope: Scope;
};

const conditionScope = (rule: Rule, parameters: Scope) =>
  rule.conditions.reduce<Result.Result<Option.Option<Scope>, AwsRequestError>>(
    (current, condition) =>
      current.pipe(
        Result.flatMap(
          Option.match({
            onNone: () => Result.succeed(Option.none<Scope>()),
            onSome: (scope) =>
              evaluate(condition, scope).pipe(
                Result.map(Option.filter((value) => value !== false)),
                Result.map(
                  Option.map((value) =>
                    Option.match(Option.fromUndefinedOr(condition.assign), {
                      onNone: () => scope,
                      onSome: (name) => Record.set(scope, name, value),
                    }),
                  ),
                ),
              ),
          }),
        ),
      ),
    Result.succeed(Option.some(parameters)),
  );

// Smithy gives condition assignments to descendants of the matching rule.
// Sibling rules start with the original scope if the tree has no match.
// See refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst (Condition object).
const matchRule = (
  rules: readonly Rule[],
  parameters: Scope,
): Result.Result<Option.Option<MatchedRule>, AwsRequestError> =>
  rules.reduce<Result.Result<Option.Option<MatchedRule>, AwsRequestError>>(
    (previous, rule) =>
      previous.pipe(
        Result.flatMap((match) =>
          Option.match(match, {
            onSome: () => previous,
            onNone: () =>
              conditionScope(rule, parameters).pipe(
                Result.flatMap(
                  Option.match({
                    onNone: () => Result.succeed(Option.none<MatchedRule>()),
                    onSome: (scope) =>
                      Match.value(rule).pipe(
                        Match.when({ type: "tree" }, ({ rules }) =>
                          matchRule(rules, scope),
                        ),
                        Match.orElse((rule) =>
                          Result.succeed(Option.some({ rule, scope })),
                        ),
                      ),
                  }),
                ),
              ),
          }),
        ),
      ),
    Result.succeed(Option.none<MatchedRule>()),
  );

/**
 * The rejectRule operation reports the service's explanation when the
 * modeled rules reject a request before an AWS address can be selected.
 */
const rejectRule = Effect.fnUntraced(function* (
  error: Expression,
  scope: Scope,
) {
  const message = yield* textValue(error, scope);
  return yield* addressError(message);
});

/**
 * The resolveAwsServiceAddress function returns the URL, headers, and signing
 * scope for one request. It fails before transport if the service rejects
 * the supplied configuration or requires an unsupported signing scheme.
 *
 * @see ../../../refs/smithy/docs/source-2.0/guides/client-guidance/endpoints.md (Context and Auth schemes)
 * @see ../../../refs/smithy/docs/source-2.0/aws/rules-engine/auth-schemes.rst (sigv4 authentication scheme)
 * @see ../../../refs/effect/packages/effect/src/Effect.ts (fromResult)
 */
export const resolveAwsServiceAddress = Effect.fn("AwsServiceAddress.resolve")(
  function* (
    rules: AwsAddressRules,
    configuration: Readonly<Record<string, Scalar | undefined>>,
    signingName?: string,
  ) {
    const values = yield* Effect.forEach(
      Record.toEntries(rules.parameters),
      ([name, parameter]) =>
        Option.match(
          Option.fromUndefinedOr(configuration[name] ?? parameter.default),
          {
            onNone: () =>
              Match.value(parameter.required).pipe(
                Match.when(true, () =>
                  addressError(
                    `Missing AWS service address parameter: ${name}`,
                  ),
                ),
                Match.orElse(() =>
                  Effect.succeed(Option.none<readonly [string, Scalar]>()),
                ),
              ),
            onSome: (value) => Effect.succeedSome([name, value] as const),
          },
        ),
    );
    const parameters = Record.fromEntries(values.flatMap(Option.toArray));
    const { rule, scope } = yield* matchRule(rules.rules, parameters).pipe(
      Result.flatMap(
        Result.fromOption(() =>
          addressError("No AWS service address rule matched"),
        ),
      ),
      Effect.fromResult,
    );
    const address = yield* Match.value(rule).pipe(
      Match.when({ type: "error" }, ({ error }) => rejectRule(error, scope)),
      Match.orElse(({ endpoint }) => Effect.succeed(endpoint)),
    );

    const target = yield* textValue(address.url, scope);
    const url = yield* Effect.try({
      try: () => new URL(target),
      catch: () =>
        new AwsRequestError({ message: "Invalid AWS service address" }),
    }).pipe(
      Effect.filterOrFail(
        (url) =>
          (url.protocol === "https:" || url.protocol === "http:") &&
          !url.username &&
          !url.password,
        () =>
          new AwsRequestError({
            message:
              "Expected an HTTP or HTTPS AWS service address without user information",
          }),
      ),
    );
    const headers = yield* Effect.forEach(
      Record.toEntries(address.headers),
      ([name, values]) =>
        Effect.forEach(values, (value) => textValue(value, scope)).pipe(
          Effect.map((values) => [name, values.join(", ")] as const),
        ),
    );

    const schemes = address.properties.authSchemes ?? [];
    const sigV4 = yield* Effect.findFirst(schemes, (scheme) =>
      textValue(scheme.name, scope).pipe(
        Effect.map((name) => name === "sigv4" && signingName !== undefined),
      ),
    ).pipe(
      Effect.filterOrFail(
        (scheme) =>
          signingName === undefined ||
          schemes.length === 0 ||
          Option.isSome(scheme),
        () =>
          new AwsRequestError({
            message:
              "The AWS service address requires an unsupported authentication scheme",
          }),
      ),
      Effect.map(Option.getOrUndefined),
    );
    const flag = (expression: Expression) =>
      evaluate(expression, scope).pipe(
        Result.map((value) => Option.getOrUndefined(value) === true),
        Effect.fromResult,
      );
    const signing = yield* Option.match(Option.fromUndefinedOr(signingName), {
      onNone: () => Effect.succeedNone,
      onSome: (name) =>
        Effect.all({
          region: textValue(sigV4?.signingRegion ?? { ref: "Region" }, scope),
          signingName: textValue(sigV4?.signingName ?? name, scope),
          disableDoubleEncoding: flag(sigV4?.disableDoubleEncoding ?? false),
          disableNormalizePath: flag(sigV4?.disableNormalizePath ?? false),
        }).pipe(Effect.asSome),
    });

    return { url, headers: Record.fromEntries(headers), signing };
  },
);
