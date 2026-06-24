package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record GatewayOperationEntity(
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
        List<GatewayParameterEntity> parameters
) {
    public GatewayOperationEntity {
        if (parameters == null) {
            parameters = List.of();
        }
    }
}
