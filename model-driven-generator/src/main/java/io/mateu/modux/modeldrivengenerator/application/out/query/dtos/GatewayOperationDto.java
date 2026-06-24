package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

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
        Integer circuitBreakerSlidingWindowSize,
        List<GatewayParameterDto> parameters
) {
}
