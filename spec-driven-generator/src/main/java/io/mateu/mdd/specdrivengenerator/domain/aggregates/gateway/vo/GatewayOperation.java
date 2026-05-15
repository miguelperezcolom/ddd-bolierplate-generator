package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo;

public record GatewayOperation(
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
