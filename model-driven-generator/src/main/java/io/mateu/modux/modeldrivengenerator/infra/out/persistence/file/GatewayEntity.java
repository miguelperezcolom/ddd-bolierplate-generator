package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

public record GatewayEntity(
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
        List<GatewayOperationEntity> operations,
        boolean rateLimitEnabled,
        Integer rateLimitRequestsPerSecond,
        Integer rateLimitBurstSize,
        boolean corsEnabled,
        String corsAllowedOrigins,
        Long globalTimeoutMs
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
