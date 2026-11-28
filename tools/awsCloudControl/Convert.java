import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;
import software.amazon.smithy.aws.traits.protocols.AwsJson1_0Trait;
import software.amazon.smithy.build.FileManifest;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.TopDownIndex;
import software.amazon.smithy.model.loader.ModelAssembler;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.ShapeId;
import software.amazon.smithy.model.transform.ModelTransformer;
import software.amazon.smithy.openapi.OpenApiConfig;
import software.amazon.smithy.openapi.OpenApiVersion;
import software.amazon.smithy.openapi.fromsmithy.OpenApiConverter;

/**
 * The Convert command publishes one OpenAPI document per selected AWS
 * operation. Separate documents let operations such as AWS JSON 1.0 calls
 * share POST / while retaining their distinct target headers.
 *
 * See refs/smithy/docs/source-2.0/guides/model-translations/converting-to-openapi.rst.
 */
public final class Convert {
  public static void main(String[] args) throws Exception {
    Model model =
        Model.assembler()
            .discoverModels()
            .putProperty(ModelAssembler.ALLOW_UNKNOWN_TRAITS, true)
            .addImport(args[0])
            .assemble()
            .unwrap();

    ServiceShape service = model.expectShape(ShapeId.from(args[1]), ServiceShape.class);

    Path directory = Path.of(args[2]);
    Files.createDirectories(directory);

    var names = List.of(args).subList(3, args.length);
    var requested = Optional.of(names).filter(selection -> !selection.isEmpty());

    var selectedOperations =
        requested
            .map(selection -> resolveOperations(model, service, selection))
            .orElseGet(() -> service.getAllOperations().stream().sorted().toList());

    // A named selection can exclude shapes belonging only to unselected calls.
    // Unfiltered conversion keeps the service's original set of components.
    UnaryOperator<Model> project =
        requested
            .<UnaryOperator<Model>>map(selection -> ModelTransformer.create()::removeUnreferencedShapes)
            .orElseGet(UnaryOperator::identity);

    FileManifest output = FileManifest.create(directory);
    for (var operation : selectedOperations) {
      String document = renderOperation(model, service, operation, project);
      output.writeFile(operation.getName() + ".json", document);
    }
  }

  /**
   * The renderOperation method returns one OpenAPI document with its final newline.
   * The command writes that text with Smithy's FileManifest.writeFile.
   *
   * See refs/smithy/docs/source-2.0/guides/model-translations/converting-to-openapi.rst
   * and refs/smithy/smithy-build FileManifest#writeFile.
   */
  private static String renderOperation(
      Model model, ServiceShape service, ShapeId operation, UnaryOperator<Model> project) {
    ServiceShape selected =
        service.toBuilder().clearResources().operations(List.of(operation)).build();

    Model operationModel = model.toBuilder().addShape(selected).build();

    // An unsupported trait on an unrelated call can fail conversion.
    // ModelTransformer.removeUnreferencedShapes keeps the shapes the
    // selected operation depends on.
    Model projection = project.apply(operationModel);

    OpenApiConfig config = new OpenApiConfig();
    config.setService(service.getId());

    // OpenApiConverter selects the service's protocol. Keep the existing
    // AWS JSON selection for services whose models expose multiple
    // protocols. See refs/smithy/smithy-openapi OpenApiConfig#getProtocol.
    service
        .getTrait(AwsJson1_0Trait.class)
        .map(AwsJson1_0Trait::toShapeId)
        .ifPresent(config::setProtocol);

    config.setVersion(OpenApiVersion.VERSION_3_1_0);
    config.setKeepUnusedComponents(true);

    var document = OpenApiConverter.create().config(config).convertToNode(projection);

    return Node.prettyPrintJson(document) + "\n";
  }

  /**
   * The resolveOperations method checks every requested name before conversion.
   * A caller can select operations declared on resources within the service.
   * If any name is unknown, the command reports the whole list before writing files.
   *
   * See refs/smithy/docs/source-2.0/guides/building-codegen/using-the-semantic-model.rst
   * (TopDownIndex#getContainedOperations).
   */
  private static List<ShapeId> resolveOperations(
      Model model, ServiceShape service, List<String> names) {
    var contained = TopDownIndex.of(model).getContainedOperations(service);
    var available =
        contained.stream().map(Shape::getId).collect(Collectors.groupingBy(ShapeId::getName));

    var missing = names.stream().filter(name -> !available.containsKey(name)).toList();
    if (!missing.isEmpty()) {
      throw new IllegalArgumentException(
          "Unknown operations in " + service.getId() + ": " + missing);
    }

    return names.stream()
        .distinct()
        .flatMap(name -> available.get(name).stream())
        .sorted()
        .toList();
  }
}
