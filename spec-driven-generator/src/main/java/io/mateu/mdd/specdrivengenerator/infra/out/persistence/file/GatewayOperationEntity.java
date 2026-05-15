package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

public record GatewayOperationEntity(
        String id,
        String name,
        String inputModelId,
        String outputModelId,
        Integer timeoutMs,
        Integer retryMaxAttempts,
        Integer retryWaitDurationMs,
        boolean circuitBreakerEnabled,
        Integer circuitBreakerFailureRateThreshold,
        Integer circuitBreakerSlidingWindowSize
) {
}
