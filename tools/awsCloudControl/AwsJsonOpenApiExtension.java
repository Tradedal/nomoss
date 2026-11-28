import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.stream.Collectors;
import software.amazon.smithy.aws.traits.protocols.AwsJson1_0Trait;
import software.amazon.smithy.aws.traits.protocols.AwsQueryErrorTrait;
import software.amazon.smithy.aws.traits.protocols.AwsQueryTrait;
import software.amazon.smithy.aws.traits.protocols.RestJson1Trait;
import software.amazon.smithy.jsonschema.JsonSchemaMapper;
import software.amazon.smithy.jsonschema.JsonSchemaMapperContext;
import software.amazon.smithy.jsonschema.Schema;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.HttpBinding;
import software.amazon.smithy.model.knowledge.HttpBindingIndex;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.node.ArrayNode;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.node.ObjectNode;
import software.amazon.smithy.model.shapes.MemberShape;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.StructureShape;
import software.amazon.smithy.model.traits.JsonNameTrait;
import software.amazon.smithy.model.traits.TimestampFormatTrait;
import software.amazon.smithy.model.traits.Trait;
import software.amazon.smithy.model.traits.UnitTypeTrait;
import software.amazon.smithy.openapi.OpenApiConfig;
import software.amazon.smithy.openapi.fromsmithy.Context;
import software.amazon.smithy.openapi.fromsmithy.OpenApiMapper;
import software.amazon.smithy.openapi.fromsmithy.OpenApiProtocol;
import software.amazon.smithy.openapi.fromsmithy.Smithy2OpenApiExtension;
import software.amazon.smithy.openapi.model.MediaTypeObject;
import software.amazon.smithy.openapi.model.OpenApi;
import software.amazon.smithy.openapi.model.OperationObject;
import software.amazon.smithy.openapi.model.ParameterObject;
import software.amazon.smithy.openapi.model.RequestBodyObject;
import software.amazon.smithy.openapi.model.ResponseObject;

/**
 * The AwsJsonOpenApiExtension class lets Smithy's converter describe AWS JSON
 * and AWS Query operations. Its mappers also retain the service and error
 * metadata Nomoss needs to call the converted operations.
 *
 * See refs/smithy/smithy-openapi Smithy2OpenApiExtension.
 */
public final class AwsJsonOpenApiExtension implements Smithy2OpenApiExtension {
  @Override
  public List<OpenApiProtocol<? extends Trait>> getProtocols() {
    return List.of(new AwsJsonProtocol(), new AwsQueryOpenApiProtocol());
  }

  @Override
  public List<OpenApiMapper> getOpenApiMappers() {
    return List.of(new AwsServiceMetadata());
  }

  @Override
  public List<JsonSchemaMapper> getJsonSchemaMappers() {
    return List.of(new AwsErrorMetadata());
  }

  /**
   * The protocol implementation describes the POST body, target header, and
   * responses of one AWS JSON 1.0 operation. Each service projection contains
   * one operation to preserve header-based selection in OpenAPI.
   */
  public static final class AwsJsonProtocol implements OpenApiProtocol<AwsJson1_0Trait> {
    private static final String CONTENT_TYPE = "application/x-amz-json-1.0";

    @Override
    public Class<AwsJson1_0Trait> getProtocolType() {
      return AwsJson1_0Trait.class;
    }

    @Override
    public void updateDefaultSettings(Model model, OpenApiConfig config) {
      config.setDefaultTimestampFormat(TimestampFormatTrait.Format.EPOCH_SECONDS);
      config.setUseIntegerType(true);
    }

    @Override
    public String getOperationUri(Context<AwsJson1_0Trait> context, OperationShape operation) {
      return "/";
    }

    @Override
    public String getOperationMethod(Context<AwsJson1_0Trait> context, OperationShape operation) {
      return "POST";
    }

    @Override
    public Optional<Operation> createOperation(
        Context<AwsJson1_0Trait> context, OperationShape operation) {
      String target = context.getService().getId().getName() + "." + operation.getId().getName();
      Model model = context.getModel();
      StructureShape input = model.expectShape(operation.getInputShape(), StructureShape.class);

      var tokens =
          input.members().stream()
              .filter(member -> member.hasTrait("smithy.api#idempotencyToken"))
              .map(member -> Node.from(member.getMemberName()))
              .collect(ArrayNode.collect());

      ResponseObject.Builder success =
          ResponseObject.builder().description("Successful operation response");

      // An operation with no output fields can succeed with an empty body.
      // Leave the body schema out so the client accepts that response.
      // See Empty body serialization in
      // refs/smithy/docs/source-2.0/aws/protocols/aws-json.rst.template.
      Optional.of(operation.getOutputShape())
          .filter(id -> !id.equals(UnitTypeTrait.UNIT))
          .map(id -> model.expectShape(id, StructureShape.class))
          .filter(output -> !output.members().isEmpty())
          .map(context::createRef)
          .map(schema -> MediaTypeObject.builder().schema(schema).build())
          .ifPresent(content -> success.putContent(CONTENT_TYPE, content));

      var targetValue = Schema.builder().type("string").enumValues(List.of(target)).build();
      var targetHeader =
          ParameterObject.builder()
              .name("X-Amz-Target")
              .in("header")
              .required(true)
              .schema(targetValue)
              .build();

      var inputSchema = context.createRef(operation.getInputShape());
      var requestContent = MediaTypeObject.builder().schema(inputSchema).build();
      var requestBody =
          RequestBodyObject.builder()
              .required(true)
              .putContent(CONTENT_TYPE, requestContent)
              .build();

      var pagination =
          operation.findTrait("smithy.api#paginated").map(Trait::toNode).orElse(Node.objectNode());
      var waiters =
          operation.findTrait("smithy.waiters#waitable").map(Trait::toNode).orElse(Node.objectNode());

      OperationObject.Builder result =
          OperationObject.builder()
              .operationId(operation.getId().getName())
              .addParameter(targetHeader)
              .requestBody(requestBody)
              .putResponse("200", success.build())
              .putExtension("x-aws-idempotency-tokens", tokens)
              .putExtension("x-aws-pagination", pagination)
              .putExtension("x-aws-waiters", waiters);

      var responses =
          OperationIndex.of(model).getErrors(operation).stream()
              .collect(
                  Collectors.groupingBy(
                      error -> getOperationResponseStatusCode(context, error),
                      TreeMap::new,
                      Collectors.mapping(context::createRef, Collectors.toList())));

      // OpenAPI allows one response per status. Preserve every modeled
      // error at that status so the generated client can decode its payload.
      responses.forEach(
          (status, errors) -> {
            Schema errorSchema =
                switch (errors.size()) {
                  case 1 -> errors.get(0);
                  default -> Schema.builder().anyOf(errors).build();
                };

            var content = MediaTypeObject.builder().schema(errorSchema).build();
            var response =
                ResponseObject.builder()
                    .description("Modeled AWS failure")
                    .putContent(CONTENT_TYPE, content)
                    .build();

            result.putResponse(status, response);
          });

      return Optional.of(
          Operation.create(
              getOperationMethod(context, operation), getOperationUri(context, operation), result));
    }
  }

  /**
   * The AwsServiceMetadata mapper retains the protocol, signing name, and
   * regional rules that AwsClient uses for each generated operation.
   */
  public static final class AwsServiceMetadata implements OpenApiMapper {
    /**
     * The jsonMemberName method supplies the JSON name for a modeled member.
     * Using the same name for a request field and its token lets the client find
     * the field after schema encoding.
     *
     * See refs/smithy/docs/source-2.0/spec/protocol-traits.rst (jsonName).
     */
    private static String jsonMemberName(MemberShape member) {
      return member
          .getTrait(JsonNameTrait.class)
          .map(JsonNameTrait::getValue)
          .orElseGet(member::getMemberName);
    }

    /**
     * The jsonNames method lets generated resource codecs use a Smithy member
     * name even when AWS spells it differently in JSON. Request codecs need
     * aliases for the complete input. Response codecs need only those for
     * members present in the response body.
     *
     * See refs/smithy/smithy-openapi JsonValueNodeTransformer#getKey and
     * refs/smithy/docs/source-2.0/spec/http-bindings.rst. The ObjectNode
     * collector preserves the bindings' order in the generated document.
     */
    private static ObjectNode jsonNames(Collection<HttpBinding> bindings) {
      return bindings.stream()
          .map(HttpBinding::getMember)
          .map(member -> Map.entry(member.getMemberName(), jsonMemberName(member)))
          .filter(name -> !name.getKey().equals(name.getValue()))
          .collect(
              ObjectNode.collectStringKeys(
                  Map.Entry::getKey, entry -> Node.from(entry.getValue())));
    }

    /**
     * The before mapper supplies service metadata used for address resolution
     * and signing. AWS Query also needs the namespace to decode XML replies.
     *
     * See refs/smithy/smithy-openapi OpenApiMapper#before and
     * refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst.
     */
    @Override
    public void before(Context<? extends Trait> context, OpenApi.Builder builder) {
      var service = context.getService();

      var protocolTrait = context.getProtocolTrait();
      String protocol = protocolTrait.toShapeId().getName();

      var signingName =
          service
              .findTrait("aws.auth#sigv4")
              .orElseThrow()
              .toNode()
              .expectObjectNode()
              .expectStringMember("name");

      var endpointRules =
          service.findTrait("smithy.rules#endpointRuleSet").map(Trait::toNode).orElseThrow();

      var metadata =
          Node.objectNodeBuilder()
              .withMember("service", service.getId().toString())
              .withMember("version", service.getVersion())
              .withMember("protocol", protocol)
              .withMember("signingName", signingName)
              .withMember("endpointRules", endpointRules);

      if (protocolTrait instanceof AwsQueryTrait) {
        var namespace =
            service
                .findTrait("smithy.api#xmlNamespace")
                .orElseThrow()
                .toNode()
                .expectObjectNode()
                .expectStringMember("uri");

        metadata.withMember("xmlNamespace", namespace);
      }

      builder.putExtension("x-aws-service", metadata.build());
    }

    /**
     * The updateOperation mapper preserves the REST JSON input structure that
     * callers pass to the client. Smithy publishes body fields and labels
     * separately. HttpBindingIndex identifies which input members the client
     * must send outside the JSON document.
     *
     * See refs/smithy/docs/source-2.0/spec/http-bindings.rst and
     * refs/smithy/smithy-openapi OpenApiMapper#updateOperation. The ObjectNode
     * collector retains the request bindings' order in the generated document.
     */
    @Override
    public OperationObject updateOperation(
        Context<? extends Trait> context,
        OperationShape shape,
        OperationObject operation,
        String method,
        String path) {
      if (!(context.getProtocolTrait() instanceof RestJson1Trait)) {
        return operation;
      }

      var model = context.getModel();
      var index = HttpBindingIndex.of(model);
      var bindings = index.getRequestBindings(shape);

      var requestParameters = bindings.values().stream().filter(binding -> {
        var location = binding.getLocation();
        return switch (location) {
          case LABEL, QUERY, HEADER -> true;
          case DOCUMENT -> false;
          default -> throw new IllegalArgumentException(
              shape.getId() + " uses an unsupported REST JSON binding: " + location);
        };
      });

      var parameters =
          requestParameters
              .collect(
                  ObjectNode.collectStringKeys(
                      binding -> jsonMemberName(binding.getMember()),
                      binding ->
                          Node.objectNodeBuilder()
                              .withMember("location", binding.getLocation().toString())
                              .withMember("name", binding.getLocationName())
                              .build()));

      var input = model.expectShape(shape.getInputShape(), StructureShape.class);

      var tokens =
          input.members().stream()
              .filter(member -> member.hasTrait("smithy.api#idempotencyToken"))
              .map(AwsServiceMetadata::jsonMemberName)
              .map(Node::from)
              .collect(ArrayNode.collect());

      var errors =
          OperationIndex.of(model).getErrors(shape).stream()
              .map(error -> context.createRef(error).toNode())
              .collect(ArrayNode.collect());

      var inputNames = jsonNames(bindings.values());
      var outputNames = jsonNames(index.getResponseBindings(shape, HttpBinding.Location.DOCUMENT));

      var pagination =
          shape.findTrait("smithy.api#paginated").map(Trait::toNode).orElse(Node.objectNode());
      var waiters =
          shape.findTrait("smithy.waiters#waitable").map(Trait::toNode).orElse(Node.objectNode());

      var result = operation.toBuilder();

      if (!inputNames.getMembers().isEmpty() || !outputNames.getMembers().isEmpty()) {
        var memberNames =
            Node.objectNode().withMember("input", inputNames).withMember("output", outputNames);

        result.putExtension("x-aws-member-names", memberNames);
      }

      return result
          .putExtension("x-aws-input", context.createRef(shape.getInputShape()).toNode())
          .putExtension("x-aws-errors", errors)
          .putExtension("x-aws-http-bindings", parameters)
          .putExtension("x-aws-idempotency-tokens", tokens)
          .putExtension("x-aws-pagination", pagination)
          .putExtension("x-aws-waiters", waiters)
          .build();
    }
  }

  /**
   * The AwsErrorMetadata mapper attaches retry traits and the wire error
   * code to modeled failures. A Query error can use a code or status
   * different from its Smithy shape name or ordinary HTTP binding.
   *
   * See refs/smithy/smithy-jsonschema JsonSchemaMapper#updateSchema and
   * refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst.
   */
  public static final class AwsErrorMetadata implements JsonSchemaMapper {
    @Override
    public Schema.Builder updateSchema(JsonSchemaMapperContext context, Schema.Builder builder) {
      var shape = context.getShape();
      var error = shape.findTrait("smithy.api#error");

      if (error.isEmpty()) {
        return builder;
      }

      var queryError = shape.getTrait(AwsQueryErrorTrait.class);
      int status =
          queryError
              .map(AwsQueryErrorTrait::getHttpResponseCode)
              .orElseGet(() -> HttpBindingIndex.of(context.getModel()).getResponseCode(shape.getId()));
      var code = queryError.map(AwsQueryErrorTrait::getCode).map(Node::from);
      var retryable = shape.findTrait("smithy.api#retryable").map(Trait::toNode).orElse(Node.nullNode());

      var metadata = Node.objectNodeBuilder()
          .withMember("name", shape.getId().getName())
          .withMember("fault", error.get().toNode())
          .withMember("httpStatus", status)
          .withMember("retryable", retryable)
          .withOptionalMember("code", code);

      builder.putExtension("x-aws-error", metadata.build());

      return builder;
    }
  }
}
