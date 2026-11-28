import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Optional;
import software.amazon.smithy.aws.traits.protocols.AwsQueryTrait;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.node.ArrayNode;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.node.ObjectNode;
import software.amazon.smithy.model.shapes.CollectionShape;
import software.amazon.smithy.model.shapes.MapShape;
import software.amazon.smithy.model.shapes.MemberShape;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.Shape;
import software.amazon.smithy.model.shapes.ShapeId;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.Trait;
import software.amazon.smithy.model.traits.UnitTypeTrait;
import software.amazon.smithy.openapi.fromsmithy.Context;
import software.amazon.smithy.openapi.fromsmithy.OpenApiProtocol;
import software.amazon.smithy.openapi.model.MediaTypeObject;
import software.amazon.smithy.openapi.model.OperationObject;
import software.amazon.smithy.openapi.model.ResponseObject;

/**
 * The AwsQueryOpenApiProtocol class preserves the member names and XML
 * traits that the generated client needs to encode forms and read replies.
 *
 * See refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst
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
  public Optional<Operation> createOperation(
      Context<AwsQueryTrait> context, OperationShape operation) {
    Model model = context.getModel();
    StructureShape input = model.expectShape(operation.getInputShape(), StructureShape.class);
    var output = operation.getOutputShape();

    var errors =
        OperationIndex.of(model).getErrors(operation).stream()
            .map(error -> context.createRef(error).toNode())
            .collect(ArrayNode.collect());

    var wire =
        Node.objectNodeBuilder()
            .withMember("input", input.getId().toString())
            .withMember("output", output.toString())
            .withMember("shapes", wireShapes(model, input.getId(), output))
            .build();

    var success = ResponseObject.builder().description("Successful AWS Query response");

    Optional.of(output)
        .filter(id -> !id.equals(UnitTypeTrait.UNIT))
        .map(context::createRef)
        .map(schema -> MediaTypeObject.builder().schema(schema).build())
        .ifPresent(content -> success.putContent("text/xml", content));

    var tokens =
        input.members().stream()
            .filter(member -> member.hasTrait("smithy.api#idempotencyToken"))
            .map(MemberShape::getMemberName)
            .map(Node::from)
            .collect(ArrayNode.collect());

    var pagination =
        operation.findTrait("smithy.api#paginated").map(Trait::toNode).orElse(Node.objectNode());
    var waiters =
        operation.findTrait("smithy.waiters#waitable").map(Trait::toNode).orElse(Node.objectNode());

    // The runtime uses Smithy's marker names and wait conditions after it
    // decodes the XML result. Keep those traits beside the wire schema.
    // See refs/smithy/docs/source-2.0/spec/behavior-traits.rst (paginated and waitable).
    var projected =
        OperationObject.builder()
            .operationId(operation.getId().getName())
            .putResponse("200", success.build())
            .putExtension("x-aws-input", context.createRef(input).toNode())
            .putExtension("x-aws-errors", errors)
            .putExtension("x-aws-query", wire)
            .putExtension("x-aws-idempotency-tokens", tokens)
            .putExtension("x-aws-pagination", pagination)
            .putExtension("x-aws-waiters", waiters);

    return Optional.of(Operation.create("POST", "/", projected));
  }

  /**
   * The wireShapes method records each reachable Smithy shape once. A member
   * refers to its target by shape ID, including when the model is recursive.
   *
   * See refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst
   * (Query key resolution and XML shape serialization).
   */
  private static ObjectNode wireShapes(Model model, ShapeId input, ShapeId output) {
    var pending = new ArrayDeque<ShapeId>();
    var seen = new HashSet<ShapeId>();
    var shapes = Node.objectNodeBuilder();

    pending.add(input);
    pending.add(output);

    while (!pending.isEmpty()) {
      var id = pending.removeFirst();
      if (seen.add(id)) {
        var shape = model.expectShape(id);
        shapes.withMember(id.toString(), wireShape(shape));
        shape.members().forEach(member -> pending.add(member.getTarget()));
      }
    }

    return shapes.build();
  }

  /**
   * The wireShape method identifies how the client must interpret a
   * member's value. A shape outside the supported protocol fails generation
   * rather than producing a client that sends the wrong wire value.
   */
  private static ObjectNode wireShape(Shape shape) {
    if (shape.getId().equals(UnitTypeTrait.UNIT)) {
      return Node.objectNode().withMember("type", "unit");
    }

    var wire = Node.objectNodeBuilder();
    switch (shape.getType()) {
      case STRING, ENUM, BLOB -> wire.withMember("type", "string");
      case BYTE, SHORT, INTEGER, LONG, FLOAT, DOUBLE, INT_ENUM -> wire.withMember("type", "number");
      case BOOLEAN -> wire.withMember("type", "boolean");
      case TIMESTAMP -> {
        wire.withMember("type", "timestamp");
        shape.findTrait("smithy.api#timestampFormat")
            .ifPresent(trait -> wire.withMember("timestampFormat", trait.toNode()));
      }
      case STRUCTURE, UNION -> {
        var members = Node.objectNodeBuilder();
        shape.members().forEach(member -> members.withMember(member.getMemberName(), wireMember(member)));
        wire.withMember("type", "structure").withMember("members", members.build());
      }
      case LIST, SET -> wire.withMember("type", "list")
          .withMember("member", wireMember(((CollectionShape) shape).getMember()));
      case MAP -> {
        var map = (MapShape) shape;
        wire.withMember("type", "map")
            .withMember("key", wireMember(map.getKey()))
            .withMember("value", wireMember(map.getValue()));
      }
      default -> throw new IllegalArgumentException("Unsupported AWS Query shape: " + shape.getId());
    }

    return wire.build();
  }

  /**
   * The wireMember method keeps XML traits on the member that declares
   * them. Two members that target the same shape can use different names.
   */
  private static ObjectNode wireMember(MemberShape member) {
    return Node.objectNode()
        .withMember("target", member.getTarget().toString())
        .withOptionalMember("xmlName", member.findTrait("smithy.api#xmlName"))
        .withOptionalMember("timestampFormat", member.findTrait("smithy.api#timestampFormat"))
        .withOptionalMember("flattened", member.findTrait("smithy.api#xmlFlattened").map(trait -> Node.from(true)))
        .withOptionalMember("attribute", member.findTrait("smithy.api#xmlAttribute").map(trait -> Node.from(true)));
  }
}
