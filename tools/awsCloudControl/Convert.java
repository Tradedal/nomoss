import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;
import java.util.TreeSet;
import software.amazon.smithy.jsonschema.JsonSchemaConfig;
import software.amazon.smithy.jsonschema.JsonSchemaConverter;
import software.amazon.smithy.jsonschema.JsonSchemaVersion;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.loader.ModelAssembler;
import software.amazon.smithy.model.node.ArrayNode;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.node.ObjectNode;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.ShapeId;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.TimestampFormatTrait;

/** Uses Amazon's converter for data definitions and retains RPC execution metadata. */
class Convert {
    public static void main(String[] args) {
        Model model = Model.assembler()
                .putProperty(ModelAssembler.ALLOW_UNKNOWN_TRAITS, true)
                .addImport(args[0]).assemble().unwrap();
        ServiceShape service = model.expectShape(ShapeId.from(args[1]), ServiceShape.class);
        if (!service.hasTrait("aws.protocols#awsJson1_0")) {
            throw new IllegalArgumentException("Expected an awsJson1_0 service: " + service.getId());
        }

        var roots = new TreeSet<ShapeId>();
        List<Node> operations = new ArrayList<>();
        for (ShapeId id : new TreeSet<>(service.getOperations())) {
            OperationShape operation = model.expectShape(id, OperationShape.class);
            ShapeId input = operation.getInput().orElseThrow();
            ShapeId output = operation.getOutput().orElseThrow();
            roots.add(input);
            roots.add(output);
            List<Node> errors = new ArrayList<>();
            var errorIds = new TreeSet<>(service.getErrorsSet());
            errorIds.addAll(operation.getErrorsSet());
            for (ShapeId errorId : errorIds) {
                roots.add(errorId);
                Shape error = model.expectShape(errorId);
                String fault = error.findTrait("smithy.api#error").orElseThrow().toNode().expectStringNode().getValue();
                errors.add(Node.objectNodeBuilder()
                        .withMember("name", errorId.getName())
                        .withMember("fault", fault)
                        .withMember("httpStatus", error.findTrait("smithy.api#httpError")
                                .map(trait -> trait.toNode()).orElse(Node.from(fault.equals("client") ? 400 : 500)))
                        .withMember("retryable", error.findTrait("smithy.api#retryable")
                                .map(trait -> trait.toNode()).orElse(Node.nullNode()))
                        .build());
            }
            List<Node> tokens = new ArrayList<>();
            for (var member : model.expectShape(input, StructureShape.class).members()) {
                if (member.hasTrait("smithy.api#idempotencyToken")) {
                    tokens.add(Node.from(member.getMemberName()));
                }
            }
            operations.add(Node.objectNodeBuilder()
                    .withMember("name", id.getName())
                    .withMember("input", input.getName())
                    .withMember("output", output.getName())
                    .withMember("target", service.getId().getName() + "." + id.getName())
                    .withMember("headers", Node.objectNodeBuilder()
                            .withMember("content-type", "application/x-amz-json-1.0")
                            .withMember("x-amz-target", service.getId().getName() + "." + id.getName())
                            .build())
                    .withMember("errors", new ArrayNode(errors, service.getSourceLocation()))
                    .withMember("idempotencyTokens", new ArrayNode(tokens, service.getSourceLocation()))
                    .withMember("pagination", operation.findTrait("smithy.api#paginated")
                            .map(trait -> trait.toNode()).orElse(Node.objectNode()))
                    .withMember("waiters", operation.findTrait("smithy.waiters#waitable")
                            .map(trait -> trait.toNode()).orElse(Node.objectNode()))
                    .build());
        }

        List<Node> schemas = new ArrayList<>();
        var definitions = new TreeMap<String, Node>();
        for (ShapeId root : roots) {
            JsonSchemaConfig config = new JsonSchemaConfig();
            config.setService(service.getId());
            config.setJsonSchemaVersion(JsonSchemaVersion.DRAFT2020_12);
            config.setDefaultTimestampFormat(TimestampFormatTrait.Format.EPOCH_SECONDS);
            ObjectNode document = JsonSchemaConverter.builder()
                    .model(model).config(config).rootShape(root).build().convert().toNode().expectObjectNode();
            document.getObjectMember("$defs").ifPresent(shared -> shared.getMembers().forEach((name, value) -> {
                Node previous = definitions.putIfAbsent(name.getValue(), value);
                if (previous != null && !previous.equals(value)) {
                    throw new IllegalArgumentException("Conflicting definition: " + name.getValue());
                }
            }));
            schemas.add(Node.objectNodeBuilder()
                    .withMember("name", root.getName())
                    .withMember("schema", document.withoutMember("$defs"))
                    .build());
        }
        ObjectNode.Builder sharedDefinitions = Node.objectNodeBuilder();
        definitions.forEach(sharedDefinitions::withMember);
        ObjectNode bundle = Node.objectNodeBuilder()
                .withMember("service", service.getId().toString())
                .withMember("version", service.getVersion())
                .withMember("protocol", "awsJson1_0")
                .withMember("signingName", service.findTrait("aws.auth#sigv4").orElseThrow()
                        .toNode().expectObjectNode().expectStringMember("name"))
                .withMember("endpointRules", service.findTrait("smithy.rules#endpointRuleSet")
                        .map(trait -> trait.toNode()).orElseThrow())
                .withMember("operations", new ArrayNode(operations, service.getSourceLocation()))
                .withMember("schemas", new ArrayNode(schemas, service.getSourceLocation()))
                .withMember("definitions", sharedDefinitions.build())
                .build();
        System.out.println(Node.prettyPrintJson(bundle));
    }
}
