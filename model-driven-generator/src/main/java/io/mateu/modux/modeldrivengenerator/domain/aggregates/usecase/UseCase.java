package io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.*;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.TransactionBoundary;
import lombok.Getter;

import java.util.List;

@Getter
public class UseCase {

    private UseCaseId id;
    private UseCaseName name;
    private UseCaseExposedAsRest exposedAsRest;
    private UseCaseExposedAsGrpc exposedAsGrpc;
    private UseCaseExposedAsMcp exposedAsMcp;
    private UseCaseExposedAsAsync exposedAsAsync;
    private UseCaseExposedAsUi exposedAsUi;
    private UseCaseInputModelId inputModelId;
    private UseCaseOutputModelId outputModelId;
    private List<UseCaseStep> steps;
    private List<String> allowedRoles;
    private List<String> allowedScopes;
    private UseCaseApiVersion apiVersion;
    private String mcpDescription;
    private HttpMethod restHttpMethod;
    private String restPath;
    private Integer asyncRetryCount;
    private String asyncDeadLetterQueue;
    private String asyncOrderingKey;
    private String asyncTopicName;
    private String asyncConsumerGroup;
    private boolean cacheable;
    private Integer cacheTtlSeconds;
    private Long timeoutMs;
    private TransactionBoundary transactionBoundary;
    private boolean idempotencyEnabled;
    private String idempotencyKeyField;
    private boolean rateLimitEnabled;
    private Integer rateLimitRequestsPerSecond;
    private String grpcServiceName;
    private String grpcMethodName;

    public static UseCase of(UseCaseId id, UseCaseName name,
                             UseCaseExposedAsRest exposedAsRest,
                             UseCaseExposedAsGrpc exposedAsGrpc,
                             UseCaseExposedAsMcp exposedAsMcp,
                             UseCaseExposedAsAsync exposedAsAsync,
                             UseCaseExposedAsUi exposedAsUi,
                             UseCaseInputModelId inputModelId,
                             UseCaseOutputModelId outputModelId,
                             List<UseCaseStep> steps,
                             List<String> allowedRoles,
                             List<String> allowedScopes,
                             UseCaseApiVersion apiVersion,
                             String mcpDescription,
                             HttpMethod restHttpMethod,
                             String restPath,
                             Integer asyncRetryCount,
                             String asyncDeadLetterQueue,
                             String asyncOrderingKey,
                             String asyncTopicName,
                             String asyncConsumerGroup,
                             boolean cacheable,
                             Integer cacheTtlSeconds,
                             Long timeoutMs,
                             TransactionBoundary transactionBoundary,
                             boolean idempotencyEnabled,
                             String idempotencyKeyField,
                             boolean rateLimitEnabled,
                             Integer rateLimitRequestsPerSecond,
                             String grpcServiceName,
                             String grpcMethodName) {
        var useCase = new UseCase();
        useCase.id = id;
        useCase.name = name;
        useCase.exposedAsRest = exposedAsRest;
        useCase.exposedAsGrpc = exposedAsGrpc;
        useCase.exposedAsMcp = exposedAsMcp;
        useCase.exposedAsAsync = exposedAsAsync;
        useCase.exposedAsUi = exposedAsUi;
        useCase.inputModelId = inputModelId;
        useCase.outputModelId = outputModelId;
        useCase.steps = steps != null ? steps : List.of();
        useCase.allowedRoles = allowedRoles != null ? allowedRoles : List.of();
        useCase.allowedScopes = allowedScopes != null ? allowedScopes : List.of();
        useCase.apiVersion = apiVersion;
        useCase.mcpDescription = mcpDescription;
        useCase.restHttpMethod = restHttpMethod;
        useCase.restPath = restPath;
        useCase.asyncRetryCount = asyncRetryCount;
        useCase.asyncDeadLetterQueue = asyncDeadLetterQueue;
        useCase.asyncOrderingKey = asyncOrderingKey;
        useCase.asyncTopicName = asyncTopicName;
        useCase.asyncConsumerGroup = asyncConsumerGroup;
        useCase.cacheable = cacheable;
        useCase.cacheTtlSeconds = cacheTtlSeconds;
        useCase.timeoutMs = timeoutMs;
        useCase.transactionBoundary = transactionBoundary;
        useCase.idempotencyEnabled = idempotencyEnabled;
        useCase.idempotencyKeyField = idempotencyKeyField;
        useCase.rateLimitEnabled = rateLimitEnabled;
        useCase.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        useCase.grpcServiceName = grpcServiceName;
        useCase.grpcMethodName = grpcMethodName;
        return useCase;
    }

    public static UseCase load(String id, String name,
                               boolean exposedAsRest,
                               boolean exposedAsGrpc,
                               boolean exposedAsMcp,
                               boolean exposedAsAsync,
                               boolean exposedAsUi,
                               String inputModelId,
                               String outputModelId,
                               List<UseCaseStep> steps,
                               List<String> allowedRoles,
                               List<String> allowedScopes,
                               String apiVersion,
                               String mcpDescription,
                               HttpMethod restHttpMethod,
                               String restPath,
                               Integer asyncRetryCount,
                               String asyncDeadLetterQueue,
                               String asyncOrderingKey,
                               String asyncTopicName,
                               String asyncConsumerGroup,
                               boolean cacheable,
                               Integer cacheTtlSeconds,
                               Long timeoutMs,
                               String transactionBoundary,
                               boolean idempotencyEnabled,
                               String idempotencyKeyField,
                               boolean rateLimitEnabled,
                               Integer rateLimitRequestsPerSecond,
                               String grpcServiceName,
                               String grpcMethodName) {
        var useCase = new UseCase();
        useCase.id = new UseCaseId(id);
        useCase.name = new UseCaseName(name);
        useCase.exposedAsRest = new UseCaseExposedAsRest(exposedAsRest);
        useCase.exposedAsGrpc = new UseCaseExposedAsGrpc(exposedAsGrpc);
        useCase.exposedAsMcp = new UseCaseExposedAsMcp(exposedAsMcp);
        useCase.exposedAsAsync = new UseCaseExposedAsAsync(exposedAsAsync);
        useCase.exposedAsUi = new UseCaseExposedAsUi(exposedAsUi);
        useCase.inputModelId = inputModelId != null ? new UseCaseInputModelId(inputModelId) : null;
        useCase.outputModelId = outputModelId != null ? new UseCaseOutputModelId(outputModelId) : null;
        useCase.steps = steps != null ? steps : List.of();
        useCase.allowedRoles = allowedRoles != null ? allowedRoles : List.of();
        useCase.allowedScopes = allowedScopes != null ? allowedScopes : List.of();
        useCase.apiVersion = apiVersion != null ? new UseCaseApiVersion(apiVersion) : null;
        useCase.mcpDescription = mcpDescription;
        useCase.restHttpMethod = restHttpMethod;
        useCase.restPath = restPath;
        useCase.asyncRetryCount = asyncRetryCount;
        useCase.asyncDeadLetterQueue = asyncDeadLetterQueue;
        useCase.asyncOrderingKey = asyncOrderingKey;
        useCase.asyncTopicName = asyncTopicName;
        useCase.asyncConsumerGroup = asyncConsumerGroup;
        useCase.cacheable = cacheable;
        useCase.cacheTtlSeconds = cacheTtlSeconds;
        useCase.timeoutMs = timeoutMs;
        useCase.transactionBoundary = transactionBoundary != null ? TransactionBoundary.valueOf(transactionBoundary) : null;
        useCase.idempotencyEnabled = idempotencyEnabled;
        useCase.idempotencyKeyField = idempotencyKeyField;
        useCase.rateLimitEnabled = rateLimitEnabled;
        useCase.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        useCase.grpcServiceName = grpcServiceName;
        useCase.grpcMethodName = grpcMethodName;
        return useCase;
    }

    public void update(UseCaseName name,
                       UseCaseExposedAsRest exposedAsRest,
                       UseCaseExposedAsGrpc exposedAsGrpc,
                       UseCaseExposedAsMcp exposedAsMcp,
                       UseCaseExposedAsAsync exposedAsAsync,
                       UseCaseExposedAsUi exposedAsUi,
                       UseCaseInputModelId inputModelId,
                       UseCaseOutputModelId outputModelId,
                       List<UseCaseStep> steps,
                       List<String> allowedRoles,
                       List<String> allowedScopes,
                       UseCaseApiVersion apiVersion,
                       String mcpDescription,
                       HttpMethod restHttpMethod,
                       String restPath,
                       Integer asyncRetryCount,
                       String asyncDeadLetterQueue,
                       String asyncOrderingKey,
                       String asyncTopicName,
                       String asyncConsumerGroup,
                       boolean cacheable,
                       Integer cacheTtlSeconds,
                       Long timeoutMs,
                       TransactionBoundary transactionBoundary,
                       boolean idempotencyEnabled,
                       String idempotencyKeyField,
                       boolean rateLimitEnabled,
                       Integer rateLimitRequestsPerSecond,
                       String grpcServiceName,
                       String grpcMethodName) {
        this.name = name;
        this.exposedAsRest = exposedAsRest;
        this.exposedAsGrpc = exposedAsGrpc;
        this.exposedAsMcp = exposedAsMcp;
        this.exposedAsAsync = exposedAsAsync;
        this.exposedAsUi = exposedAsUi;
        this.inputModelId = inputModelId;
        this.outputModelId = outputModelId;
        this.steps = steps != null ? steps : List.of();
        this.allowedRoles = allowedRoles != null ? allowedRoles : List.of();
        this.allowedScopes = allowedScopes != null ? allowedScopes : List.of();
        this.apiVersion = apiVersion;
        this.mcpDescription = mcpDescription;
        this.restHttpMethod = restHttpMethod;
        this.restPath = restPath;
        this.asyncRetryCount = asyncRetryCount;
        this.asyncDeadLetterQueue = asyncDeadLetterQueue;
        this.asyncOrderingKey = asyncOrderingKey;
        this.asyncTopicName = asyncTopicName;
        this.asyncConsumerGroup = asyncConsumerGroup;
        this.cacheable = cacheable;
        this.cacheTtlSeconds = cacheTtlSeconds;
        this.timeoutMs = timeoutMs;
        this.transactionBoundary = transactionBoundary;
        this.idempotencyEnabled = idempotencyEnabled;
        this.idempotencyKeyField = idempotencyKeyField;
        this.rateLimitEnabled = rateLimitEnabled;
        this.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        this.grpcServiceName = grpcServiceName;
        this.grpcMethodName = grpcMethodName;
    }
}
