import java.util.List;
import java.util.Optional;
import software.amazon.smithy.aws.traits.protocols.AwsQueryTrait;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.node.ArrayNode;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.shapes.CollectionShape;
import software.amazon.smithy.model.shapes.MapShape;
import software.amazon.smithy.model.shapes.MemberShape;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.UnitTypeTrait;
import software.amazon.smithy.openapi.fromsmithy.Context;
import software.amazon.smithy.openapi.fromsmithy.OpenApiProtocol;
import software.amazon.smithy.openapi.model.MediaTypeObject;
import software.amazon.smithy.openapi.model.OperationObject;
import software.amazon.smithy.openapi.model.ResponseObject;

/**
 * The AwsQueryOpenApiProtocol class supplies an operation projection to
 * Smithy's OpenApiConverter. Its extension retains the Smithy member names
 * and XML traits needed by the AWS SDK's Query serializers.
 *
 * See refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst
 * and refs/aws-sdk-js-v3/clients/client-iam/src/schemas/schemas_0.ts
 * (CreateRole and its request and result schemas).
 */
public final class AwsQueryOpenApiProtocol implements OpenApiProtocol<AwsQueryTrait> {
    @Override
    public Class<AwsQueryTrait> getProtocolType() {
        return AwsQueryTrait.class;
    }

    @Override
    public String getOperationMethod(Context<AwsQueryTrait> context, OperationShape operation) {
        return "POST";
    }

    @Override
    public String getOperationUri(Context<AwsQueryTrait> context, OperationShape operation) {
        return "/";
    }

    @Override
    public Optional<Operation> createOperation(Context<AwsQueryTrait> context, OperationShape operation) {
        Model model = context.getModel();
        StructureShape input = model.expectShape(operation.getInputShape(), StructureShape.class);
        boolean returnsUnit = operation.getOutputShape().equals(UnitTypeTrait.UNIT);

        var errors = OperationIndex.of(model).getErrors(operation).stream()
                .map(error -> context.createRef(error).toNode())
                .collect(ArrayNode.collect());

        var wire = Node.objectNodeBuilder()
                .withMember("input", wireShape(model, input))
                .withMember("output", wireShape(model, model.expectShape(operation.getOutputShape())))
                .build();

        var success = ResponseObject.builder().description("Successful AWS Query response");
        if (!returnsUnit) {
            success.putContent("text/xml", MediaTypeObject.builder()
                    .schema(context.createRef(operation.getOutputShape()))
                    .build());
        }

        var projected = OperationObject.builder()
                .operationId(operation.getId().getName())
                .putResponse("200", success.build())
                .putExtension("x-aws-input", context.createRef(input).toNode())
                .putExtension("x-aws-errors", errors)
                .putExtension("x-aws-query", wire)
                .putExtension("x-aws-idempotency-tokens", input.members().stream()
                        .filter(member -> member.hasTrait("smithy.api#idempotencyToken"))
                        .map(member -> Node.from(member.getMemberName()))
                        .collect(ArrayNode.collect()))
                .putExtension("x-aws-pagination", operation.findTrait("smithy.api#paginated")
                        .map(trait -> trait.toNode()).orElse(Node.objectNode()))
                .putExtension("x-aws-waiters", operation.findTrait("smithy.waiters#waitable")
                        .map(trait -> trait.toNode()).orElse(Node.objectNode()));

        return Optional.of(Operation.create("POST", "/", projected));
    }

    /**
     * The wireShape helper emits public StaticSchema values from Smithy's
     * resolved model. Unsupported shapes fail generation so a new operation
     * cannot silently use the wrong AWS Query representation.
     *
     * See refs/smithy-typescript/packages/types/src/schema/static-schemas.ts
     * and refs/smithy-typescript/packages/types/src/schema/sentinels.ts.
     */
    private static Node wireShape(Model model, Shape shape) {
        var id = shape.getId();
        var namespace = Node.from(id.getNamespace());
        var name = Node.from(id.getName());
        var traits = wireTraits(shape);

        if (id.equals(UnitTypeTrait.UNIT)) {
            return Node.from("unit");
        }

        return switch (shape.getType()) {
            case STRING, ENUM -> Node.from(0);
            case BYTE, SHORT, INTEGER, LONG, FLOAT, DOUBLE, INT_ENUM -> Node.from(1);
            case BOOLEAN -> Node.from(2);
            case TIMESTAMP -> Node.from(4);
            case BLOB -> Node.from(21);
            case STRUCTURE -> Node.arrayNode(
                    Node.from(3), namespace, name, traits,
                    shape.members().stream().map(member -> Node.from(member.getMemberName()))
                            .collect(ArrayNode.collect()),
                    shape.members().stream().map(member -> wireMember(model, member))
                            .collect(ArrayNode.collect()));
            case LIST, SET -> Node.arrayNode(Node.from(1), namespace, name, traits,
                    wireMember(model, ((CollectionShape) shape).getMember()));
            case MAP -> {
                var map = (MapShape) shape;
                yield Node.arrayNode(Node.from(2), namespace, name, traits,
                        wireMember(model, map.getKey()), wireMember(model, map.getValue()));
            }
            default -> throw new IllegalArgumentException("Unsupported AWS Query shape: " + id);
        };
    }

    private static Node wireMember(Model model, MemberShape member) {
        Node target = wireShape(model, model.expectShape(member.getTarget()));
        Node traits = wireTraits(member);

        return traits.equals(Node.from(0)) ? target : Node.arrayNode(target, traits);
    }

    private static Node wireTraits(Shape shape) {
        var selected = Node.objectNodeBuilder();

        shape.findTrait("smithy.api#xmlName").ifPresent(trait ->
                selected.withMember("xmlName", trait.toNode()));

        for (String name : List.of("xmlFlattened", "xmlAttribute", "idempotencyToken")) {
            if (shape.hasTrait("smithy.api#" + name)) {
                selected.withMember(name, Node.from(1));
            }
        }

        var traits = selected.build();
        return traits.getMembers().isEmpty() ? Node.from(0) : traits;
    }
}
