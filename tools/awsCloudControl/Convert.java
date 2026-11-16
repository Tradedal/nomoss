import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.TreeSet;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.loader.ModelAssembler;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.ShapeId;
import software.amazon.smithy.openapi.OpenApiConfig;
import software.amazon.smithy.openapi.OpenApiVersion;
import software.amazon.smithy.openapi.fromsmithy.OpenApiConverter;

/**
 * Convert publishes one OpenAPI document per AWS JSON operation. Separate
 * documents preserve the shared POST / route and operation-specific target
 * header that OpenAPI cannot otherwise distinguish as separate operations.
 */
public final class Convert {
    public static void main(String[] args) throws Exception {
        Model model = Model.assembler().discoverModels()
                .putProperty(ModelAssembler.ALLOW_UNKNOWN_TRAITS, true)
                .addImport(args[0]).assemble().unwrap();

        ServiceShape service = model.expectShape(ShapeId.from(args[1]), ServiceShape.class);
        Path directory = Path.of(args[2]);
        Files.createDirectories(directory);

        for (ShapeId operation : new TreeSet<>(service.getAllOperations())) {
            ServiceShape selected = service.toBuilder()
                    .clearResources().operations(List.of(operation)).build();

            Model projection = model.toBuilder().addShape(selected).build();

            OpenApiConfig config = new OpenApiConfig();
            config.setService(service.getId());
            config.setProtocol(ShapeId.from("aws.protocols#awsJson1_0"));
            config.setVersion(OpenApiVersion.VERSION_3_1_0);
            config.setKeepUnusedComponents(true);

            var document = OpenApiConverter.create().config(config).convertToNode(projection);
            Files.writeString(directory.resolve(operation.getName() + ".json"),
                    software.amazon.smithy.model.node.Node.prettyPrintJson(document) + "\n");
        }
    }
}
