package io.mateu.modux.specdrivengenerator.domain.aggregates.gateway.vo;

public record GatewayOperation(
        String id,
        String name,
        String httpMethod,
        String path,
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
