package io.mateu.modux.modeldrivengenerator.application.usecases.gateway.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;

import java.util.List;

public record SaveGatewayCommand(
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
        List<GatewayOperationData> operations,
        boolean rateLimitEnabled,
        Integer rateLimitRequestsPerSecond,
        Integer rateLimitBurstSize,
        boolean corsEnabled,
        String corsAllowedOrigins,
        Long globalTimeoutMs
) {
}
