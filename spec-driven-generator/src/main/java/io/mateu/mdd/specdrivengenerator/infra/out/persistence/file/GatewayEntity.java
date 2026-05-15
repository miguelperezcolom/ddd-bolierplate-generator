package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import io.mateu.uidl.interfaces.Identifiable;

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
        List<GatewayOperationEntity> operations
) implements Identifiable {
}
