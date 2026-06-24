package io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo;

import java.util.List;

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
        Integer circuitBreakerSlidingWindowSize,
        List<GatewayParameter> parameters
) {
    public GatewayOperation {
        if (parameters == null) {
            parameters = List.of();
        }
    }
}
