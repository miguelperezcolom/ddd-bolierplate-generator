package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UseCaseEntity(
        String id,
        String name,
        boolean exposedAsRest,
        boolean exposedAsGrpc,
        boolean exposedAsMcp,
        boolean exposedAsAsync,
        boolean exposedAsUi,
        String inputModelId,
        String outputModelId,
        List<UseCaseStepEntity> steps,
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
        String grpcMethodName,
        /** Architecture decisions (ADRs) this use case traces back to. */
        List<String> decisionIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public UseCaseEntity(String id, String name, boolean exposedAsRest, boolean exposedAsGrpc,
                         boolean exposedAsMcp, boolean exposedAsAsync, boolean exposedAsUi,
                         String inputModelId, String outputModelId, List<UseCaseStepEntity> steps,
                         List<String> allowedRoles, List<String> allowedScopes, String apiVersion,
                         String mcpDescription, String restHttpMethod, String restPath,
                         Integer asyncRetryCount, String asyncDeadLetterQueue, String asyncOrderingKey,
                         String asyncTopicName, String asyncConsumerGroup, boolean cacheable,
                         Integer cacheTtlSeconds, Long timeoutMs, String transactionBoundary,
                         boolean idempotencyEnabled, String idempotencyKeyField,
                         boolean rateLimitEnabled, Integer rateLimitRequestsPerSecond,
                         String grpcServiceName, String grpcMethodName) {
        this(id, name, exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi,
                inputModelId, outputModelId, steps, allowedRoles, allowedScopes, apiVersion,
                mcpDescription, restHttpMethod, restPath, asyncRetryCount, asyncDeadLetterQueue,
                asyncOrderingKey, asyncTopicName, asyncConsumerGroup, cacheable, cacheTtlSeconds,
                timeoutMs, transactionBoundary, idempotencyEnabled, idempotencyKeyField,
                rateLimitEnabled, rateLimitRequestsPerSecond, grpcServiceName, grpcMethodName,
                List.of());
    }
}
