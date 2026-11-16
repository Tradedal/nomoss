import {
  Context,
  Effect,
  Layer,
  Option,
  Predicate,
  Record,
  Schema,
  String as Str,
} from "effect";
import {
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatement,
} from "ts-morph";
import {
  type ResourceSchemaAnnotation,
  ResourceSchemaAnnotationSchema,
} from "../../../src/core/resource/model.js";
import { ResourceSourceInvalid } from "../../codegen/resourceErrors.js";
import type { ResourceOutputCatalog } from "../../codegen/resourceSchemas.js";
import { jsonExpression } from "../../codegen/typeScriptJson.js";
import { access, call, identifier, print, printer } from "./typeScriptNodes.js";

/**
 * The StripeAnnotations service requires generated declarations and command
 * registrations to share dispatch identities and protected-output rules.
 * Their declaration annotations also retain reviewed replacement choices so
 * planning can compose operations from the same resource metadata.
 */
export class StripeAnnotations extends Context.Service<StripeAnnotations>()(
  "nomoss/tools/stripe/generator/stripeAnnotations",
  {
    make: Effect.sync(() => {
      /**
       * The prepareResourceAnnotation service method validates catalog choices
       * against the runtime's canonical annotation schema before emission. A
       * missing dispatch name fails with ResourceSourceInvalid.
       */
      const prepareResourceAnnotation = Effect.fn(
        "StripeAnnotations.prepareResourceAnnotation",
      )(function* (resource: ResourceOutputCatalog) {
        const service = Str.split(resource.typeName, "::")[1];
        const resourceName = yield* Effect.fromOption(
          Option.fromUndefinedOr(resource.resource),
        ).pipe(
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message: "The API resource has no declared dispatch name",
              }),
          ),
        );
        const annotation: ResourceSchemaAnnotation =
          yield* Schema.decodeUnknownEffect(ResourceSchemaAnnotationSchema)(
            Record.filter(
              {
                provider: "stripe",
                service: Str.toLowerCase(service),
                resource: resourceName,
                operation: "create",
                stateSecretOutputKeys: resource.stateSecretOutputKeys ?? [],
                primaryIdentifier: resource.primaryIdentifier,
                replacement: resource.replacement,
              },
              Predicate.isNotUndefined,
            ),
          );

        return annotation;
      });

      /**
       * The emitMetadata service method requires ResourceSchemaAnnotationSchema
       * to be imported into the destination module. Metadata precedes an
       * existing props schema so declaration validation can read it during
       * initialization. The emitted annotation retains the catalog's dispatch,
       * protected-output, and replacement rules, and catalog validation failures
       * propagate before emission.
       */
      const emitMetadata = Effect.fn("StripeAnnotations.emitMetadata")(
        function* (schemaModule: SourceFile, resource: ResourceOutputCatalog) {
          const [provider, , name] = Str.split(resource.typeName, "::");
          const annotation = yield* prepareResourceAnnotation(resource);

          const metadata = call(
            access(identifier("ResourceSchemaAnnotationSchema"), "make"),
            [jsonExpression(annotation)],
          );

          const propsName =
            resource.propsSchema ?? `${provider}${name}PropsSchema`;

          const index = Option.fromUndefinedOr(
            schemaModule.getVariableDeclaration(propsName),
          ).pipe(
            Option.map((props) =>
              props.getVariableStatementOrThrow().getChildIndex(),
            ),
            Option.getOrElse(() => schemaModule.getStatements().length),
          );

          const declaration: VariableStatement =
            schemaModule.insertVariableStatement(index, {
              isExported: true,
              declarationKind: VariableDeclarationKind.Const,
              leadingTrivia: (writer) => writer.blankLine(),
              declarations: [
                {
                  name: `${provider}${name}ResourceSchema`,
                  initializer: print(metadata),
                },
              ],
            });

          return declaration;
        },
      );

      /**
       * The annotateProps service method makes an existing props schema usable
       * for resource registration. It attaches the schema's resource annotation. The
       * caller must supply a module that declares that schema and imports the
       * annotateResourceSchema function and ResourceSchemaAnnotationSchema.
       * The returned module retains the same props schema with its annotation.
       * A missing declaration causes a ts-morph defect. A missing dispatch name
       * fails with ResourceSourceInvalid.
       */
      const annotateProps = Effect.fn("StripeAnnotations.annotateProps")(
        function* (
          schemaModule: SourceFile,
          resource: ResourceOutputCatalog,
          metadata = true,
        ) {
          const [provider, , name] = Str.split(resource.typeName, "::");

          const propsName =
            resource.propsSchema ?? `${provider}${name}PropsSchema`;

          const props = schemaModule.getVariableDeclarationOrThrow(propsName);

          yield* emitMetadata(schemaModule, resource).pipe(
            Effect.when(Effect.succeed(metadata)),
          );

          const expression = call(identifier("annotateResourceSchema"), [
            props.getInitializerOrThrow().compilerNode,
            identifier(`${provider}${name}ResourceSchema`),
          ]);

          const annotatedSource: string = printer.printNode(
            ts.EmitHint.Expression,
            expression,
            schemaModule.compilerNode,
          );

          props.setInitializer(annotatedSource);

          const generated: SourceFile = schemaModule;

          return generated;
        },
      );

      return { prepareResourceAnnotation, emitMetadata, annotateProps };
    }),
  },
) {}

export const stripeAnnotationsLayer = Layer.effect(
  StripeAnnotations,
  StripeAnnotations.make,
);
