import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import software.amazon.smithy.aws.traits.protocols.AwsJson1_0Trait;
import software.amazon.smithy.jsonschema.JsonSchemaMapper;
import software.amazon.smithy.jsonschema.JsonSchemaMapperContext;
import software.amazon.smithy.jsonschema.Schema;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.knowledge.HttpBindingIndex;
import software.amazon.smithy.model.knowledge.OperationIndex;
import software.amazon.smithy.model.node.ArrayNode;
import software.amazon.smithy.model.node.Node;
import software.amazon.smithy.model.shapes.OperationShape;
import software.amazon.smithy.model.shapes.StructureShape;
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
 * AwsJsonOpenApiExtension supplies AWS JSON 1.0 HTTP bindings and execution
 * metadata to Smithy's converter. Schema conversion and document construction
 * remain Smithy's responsibility.
 */
public final class AwsJsonOpenApiExtension implements Smithy2OpenApiExtension {
    @Override
    public List<OpenApiProtocol<? extends Trait>> getProtocols() {
        return List.of(new AwsJsonProtocol());
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
        public Optional<Operation> createOperation(Context<AwsJson1_0Trait> context, OperationShape operation) {
            String target = context.getService().getId().getName() + "." + operation.getId().getName();

            var tokens = context.getModel().expectShape(operation.getInputShape(), StructureShape.class)
                    .members().stream().filter(member -> member.hasTrait("smithy.api#idempotencyToken"))
                    .map(member -> Node.from(member.getMemberName())).collect(ArrayNode.collect());

            ResponseObject.Builder success = ResponseObject.builder()
                    .description("Successful operation response");
            if (!operation.getOutputShape().equals(UnitTypeTrait.UNIT)) {
                success.putContent(CONTENT_TYPE, MediaTypeObject.builder()
                        .schema(context.createRef(operation.getOutputShape())).build());
            }

            OperationObject.Builder result = OperationObject.builder()
                    .operationId(operation.getId().getName())
                    .addParameter(ParameterObject.builder().name("X-Amz-Target").in("header").required(true)
                            .schema(Schema.builder().type("string").enumValues(List.of(target)).build()).build())
                    .requestBody(RequestBodyObject.builder().required(true)
                            .putContent(CONTENT_TYPE, MediaTypeObject.builder()
                                    .schema(context.createRef(operation.getInputShape())).build()).build())
                    .putResponse("200", success.build())
                    .putExtension("x-aws-idempotency-tokens", tokens)
                    .putExtension("x-aws-pagination", operation.findTrait("smithy.api#paginated")
                            .map(Trait::toNode).orElse(Node.objectNode()))
                    .putExtension("x-aws-waiters", operation.findTrait("smithy.waiters#waitable")
                            .map(Trait::toNode).orElse(Node.objectNode()));

            Map<String, List<Schema>> responses = new TreeMap<>();
            for (StructureShape error : OperationIndex.of(context.getModel()).getErrors(operation)) {
                String status = getOperationResponseStatusCode(context, error);
                responses.computeIfAbsent(status, key -> new ArrayList<>()).add(context.createRef(error));
            }
            responses.forEach((status, errors) -> result.putResponse(status, ResponseObject.builder()
                    .description("Modeled AWS failure")
                    .putContent(CONTENT_TYPE, MediaTypeObject.builder()
                            .schema(errors.size() == 1 ? errors.get(0) : Schema.builder().anyOf(errors).build())
                            .build()).build()));

            return Optional.of(Operation.create(getOperationMethod(context, operation),
                    getOperationUri(context, operation), result));
        }
    }

    /**
     * Service metadata preserves Smithy's identity, signing name, and regional
     * rules for AwsClient execution of generated operations.
     */
    public static final class AwsServiceMetadata implements OpenApiMapper {
        @Override
        public void before(Context<? extends Trait> context, OpenApi.Builder builder) {
            var service = context.getService();
            builder.putExtension("x-aws-service", Node.objectNodeBuilder()
                    .withMember("service", service.getId().toString())
                    .withMember("version", service.getVersion())
                    .withMember("protocol", "awsJson1_0")
                    .withMember("signingName", service.findTrait("aws.auth#sigv4").orElseThrow()
                            .toNode().expectObjectNode().expectStringMember("name"))
                    .withMember("endpointRules", service.findTrait("smithy.rules#endpointRuleSet")
                            .map(Trait::toNode).orElseThrow()).build());
        }
    }

    /**
     * Error metadata preserves modeled identity and retry traits beside the
     * converted schema so decoding and retry decisions share the same model.
     */
    public static final class AwsErrorMetadata implements JsonSchemaMapper {
        @Override
        public Schema.Builder updateSchema(JsonSchemaMapperContext context, Schema.Builder builder) {
            var shape = context.getShape();
            shape.findTrait("smithy.api#error").ifPresent(error -> builder.putExtension("x-aws-error",
                    Node.objectNodeBuilder().withMember("name", shape.getId().getName())
                            .withMember("fault", error.toNode())
                            .withMember("httpStatus", HttpBindingIndex.of(context.getModel())
                                    .getResponseCode(shape.getId()))
                            .withMember("retryable", shape.findTrait("smithy.api#retryable")
                                    .map(Trait::toNode).orElse(Node.nullNode())).build()));
            return builder;
        }
    }
}
