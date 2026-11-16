import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  type SchemaRepresentation,
  String as Str,
} from "effect";
import {
  Node,
  type OptionalKind,
  type Project,
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatementStructure,
} from "ts-morph";
import { access, call, identifier, printer } from "./typeScriptNodes.js";

const factory = ts.factory;

interface StripeSchemaDeclaration {
  readonly name: string;
  readonly typeName: string;
  readonly code: SchemaRepresentation.Code;
}

/**
 * The StripeSchemaEmitter service publishes Effect's compiled types and
 * validators together. Recursive references retain the compiler's deferred
 * evaluation across generated modules.
 */
export class StripeSchemaEmitter extends Context.Service<StripeSchemaEmitter>()(
  "nomoss/tools/stripe/generator/stripeSchemaEmitter",
  {
    make: Effect.sync(() => {
      /**
       * The emitSchemaModule service method gives the supplied project a module
       * with the selected validators and their TypeScript types. Each
       * name must identify a shared reference or a root whose position matches
       * rootNames. Before publication, the caller must supply imports for any
       * references whose declarations belong to other modules. Compiled payload
       * expressions remain intact. The deferModelDependencies option is for
       * grouped shared models whose dependencies may be uninitialized during
       * import. Catalog roots retain their constructors and public type names.
       */
      const emitSchemaModule = Effect.fn(
        "StripeSchemaEmitter.emitSchemaModule",
      )(function* (
        project: Project,
        modulePath: string,
        names: ReadonlyArray<string>,
        code: SchemaRepresentation.CodeDocument,
        rootNames: ReadonlyArray<string>,
        deferModelDependencies = false,
      ) {
        const schemas = yield* Effect.forEach(
          names,
          Effect.fnUntraced(function* (name) {
            const schema = yield* Record.get(
              code.references.recursives,
              name,
            ).pipe(
              Option.orElse(() =>
                Arr.findFirst(
                  code.references.nonRecursives,
                  (reference) => reference.$ref === name,
                ).pipe(Option.map((reference) => reference.code)),
              ),
              Option.orElse(() =>
                Arr.findFirstIndex(rootNames, (root) => root === name).pipe(
                  Option.flatMap((index) => Arr.get(code.codes, index)),
                ),
              ),
              Effect.fromOption,
            );

            const typeName = Match.value(
              Arr.contains(rootNames, name) && Str.endsWith("Schema")(name),
            ).pipe(
              Match.when(true, () => Str.substring(0, name.length - 6)(name)),
              Match.orElse(() => name),
            );

            const declaration: StripeSchemaDeclaration = {
              name,
              typeName,
              code: schema,
            };

            return declaration;
          }),
        );

        const schemaModule = project.createSourceFile(modulePath);

        /**
         * The schema module needs the escaping in Effect's compiled regular
         * expressions to remain intact. Biome can produce invalid syntax when
         * it converts those expressions to literals, so this module disables
         * that conversion.
         */
        schemaModule.addImportDeclaration({
          moduleSpecifier: "effect",
          namedImports: ["Schema"],
          leadingTrivia: (writer) =>
            writer
              .writeLine(
                "// This schema module comes from the selected resource contracts. Do not edit.",
              )
              .writeLine("")
              .writeLine(
                "// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.",
              ),
        });

        schemaModule.addTypeAliases(
          Arr.map(schemas, (schema) => ({
            name: schema.typeName,
            isExported: true,
            type: schema.code.Type,
          })),
        );

        /**
         * The catalog schemas retain concrete constructors because resource
         * declarations use their Struct fields to create references to future
         * outputs. If these roots were deferred, callers would lose that public field API.
         */
        const runtimeDeclarations = Arr.map(schemas, (schema) => {
          const declaration: OptionalKind<VariableStatementStructure> = {
            isExported: true,
            declarationKind: VariableDeclarationKind.Const,
            declarations: [
              {
                name: schema.name,
                initializer: schema.code.runtime,
              },
            ],
          };

          return declaration;
        });

        schemaModule.addVariableStatements(runtimeDeclarations);

        /**
         * The schema module can import another group that imports it in return.
         * A shared model that reads a dependency during import would then see
         * an uninitialized binding. Schema.suspend delays those dependency reads
         * until callers use the validator. Catalog roots retain their Struct
         * fields for resource declarations.
         */
        const sharedNames = Arr.appendAll(
          Record.keys(code.references.recursives),
          Arr.map(code.references.nonRecursives, (reference) => reference.$ref),
        );

        const dependentModels = Arr.filter(
          schemaModule.getVariableDeclarations(),
          (declaration) => {
            const initializer = declaration.getInitializerOrThrow();

            return (
              deferModelDependencies &&
              Arr.contains(sharedNames, declaration.getName()) &&
              !Arr.contains(rootNames, declaration.getName()) &&
              Arr.some(
                Arr.prepend(initializer.getDescendants(), initializer),
                (node) =>
                  Node.isIdentifier(node) &&
                  Arr.contains(sharedNames, node.getText()) &&
                  !Arr.some(
                    node.getAncestors(),
                    (ancestor) =>
                      Node.isTypeNode(ancestor) ||
                      Node.isArrowFunction(ancestor) ||
                      Node.isFunctionExpression(ancestor),
                  ),
              )
            );
          },
        );

        yield* Effect.forEach(
          dependentModels,
          (declaration) =>
            Effect.sync(() => {
              const initializer = declaration.getInitializerOrThrow();
              const deferred = factory.createArrowFunction(
                undefined,
                undefined,
                [],
                factory.createTypeReferenceNode("Schema.Codec", [
                  factory.createTypeReferenceNode(declaration.getName()),
                ]),
                factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                initializer.compilerNode,
              );

              initializer.replaceWithText(
                printer.printNode(
                  ts.EmitHint.Expression,
                  call(access(identifier("Schema"), "suspend"), [deferred]),
                  schemaModule.compilerNode,
                ),
              );
            }),
          { discard: true },
        );

        const generated: SourceFile = schemaModule;

        return generated;
      });

      return { emitSchemaModule };
    }),
  },
) {}

export const stripeSchemaEmitterLayer = Layer.effect(
  StripeSchemaEmitter,
  StripeSchemaEmitter.make,
);
