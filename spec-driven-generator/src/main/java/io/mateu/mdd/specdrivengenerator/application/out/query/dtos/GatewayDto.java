package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;

import java.util.List;

public record GatewayDto(
        String id,
        String name,
        String serviceId,
        String baseUrl,
        GatewayAuthType authType,
        String authUsername,
        String authPassword,
        String authApiKeyHeaderName,
        String authBearerToken,
        String authOAuth2ClientId,
        String authOAuth2ClientSecret,
        String authOAuth2TokenUrl,
        String authOAuth2Scopes,
        List<GatewayOperationDto> operations,
        boolean rateLimitEnabled,
        Integer rateLimitRequestsPerSecond,
        Integer rateLimitBurstSize,
        boolean corsEnabled,
        String corsAllowedOrigins
) {
}
