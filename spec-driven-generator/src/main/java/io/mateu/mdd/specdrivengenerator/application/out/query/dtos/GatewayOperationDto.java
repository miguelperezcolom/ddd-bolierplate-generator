package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record GatewayOperationDto(
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
