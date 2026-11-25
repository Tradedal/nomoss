import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.TreeSet;
import java.util.stream.Collectors;
import software.amazon.smithy.aws.traits.protocols.AwsJson1_0Trait;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.TopDownIndex;
import software.amazon.smithy.model.loader.ModelAssembler;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.ShapeId;
import software.amazon.smithy.model.transform.ModelTransformer;
import software.amazon.smithy.openapi.OpenApiConfig;
import software.amazon.smithy.openapi.OpenApiVersion;
import software.amazon.smithy.openapi.fromsmithy.OpenApiConverter;

/**
 * The Convert command publishes one OpenAPI document per selected AWS
 * operation. Separate documents preserve the target header for each
 * AWS JSON 1.0 operation on the shared POST path.
 */
public final class Convert {
    public static void main(String[] args) throws Exception {
        Model model = Model.assembler().discoverModels()
                .putProperty(ModelAssembler.ALLOW_UNKNOWN_TRAITS, true)
                .addImport(args[0]).assemble().unwrap();

        ServiceShape service = model.expectShape(ShapeId.from(args[1]), ServiceShape.class);
        Path directory = Path.of(args[2]);
        Files.createDirectories(directory);

        var requested = List.of(args).subList(3, args.length);
        // A selected operation may be declared on a resource inside the service.
        // Smithy's getContainedOperations includes those calls. See
        // refs/smithy/docs/source-2.0/guides/building-codegen/using-the-semantic-model.rst.
        var operations = requested.isEmpty()
                ? new TreeSet<>(service.getAllOperations())
                : TopDownIndex.of(model).getContainedOperations(service).stream()
                    .map(shape -> shape.getId()).collect(Collectors.toCollection(TreeSet::new));
        var available = operations.stream().map(ShapeId::getName).collect(Collectors.toSet());
        var missing = requested.stream().filter(name -> !available.contains(name)).toList();
        if (!missing.isEmpty()) {
            throw new IllegalArgumentException("Unknown operations in " + service.getId() + ": " + missing);
        }

        for (ShapeId operation : operations) {
            if (!requested.isEmpty() && !requested.contains(operation.getName())) {
                continue;
            }

            ServiceShape selected = service.toBuilder()
                    .clearResources().operations(List.of(operation)).build();

            Model projection = model.toBuilder().addShape(selected).build();
            // An unsupported trait on an unrelated call can fail conversion.
            // ModelTransformer.removeUnreferencedShapes keeps the shapes the
            // selected operation depends on.
            if (!requested.isEmpty()) {
                projection = ModelTransformer.create().removeUnreferencedShapes(projection);
            }

            OpenApiConfig config = new OpenApiConfig();
            config.setService(service.getId());
            // OpenApiConverter selects the service's protocol. Keep the existing
            // AWS JSON selection for services whose models expose multiple
            // protocols. See refs/smithy/smithy-openapi OpenApiConfig#getProtocol.
            if (service.hasTrait(AwsJson1_0Trait.class)) {
                config.setProtocol(AwsJson1_0Trait.ID);
            }
            config.setVersion(OpenApiVersion.VERSION_3_1_0);
            config.setKeepUnusedComponents(true);

            var document = OpenApiConverter.create().config(config).convertToNode(projection);
            Files.writeString(directory.resolve(operation.getName() + ".json"),
                    software.amazon.smithy.model.node.Node.prettyPrintJson(document) + "\n");
        }
    }
}
