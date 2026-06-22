package io.mateu.modux.modeldrivengenerator.application.usecases.usecase.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.usecase.UseCaseStepData;

import java.util.List;

public record CreateUseCaseCommand(String id, String name,
                                   boolean exposedAsRest,
                                   boolean exposedAsGrpc,
                                   boolean exposedAsMcp,
                                   boolean exposedAsAsync,
                                   boolean exposedAsUi,
                                   String inputModelId,
                                   String outputModelId,
                                   List<UseCaseStepData> steps,
                                   List<String> allowedRoles,
                                   List<String> allowedScopes,
                                   String apiVersion,
                                   String mcpDescription,
                                   String restHttpMethod,
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
}
