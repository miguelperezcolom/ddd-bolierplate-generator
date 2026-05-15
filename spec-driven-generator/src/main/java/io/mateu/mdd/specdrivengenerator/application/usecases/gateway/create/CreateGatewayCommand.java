package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;

import java.util.List;

public record CreateGatewayCommand(
        String id,
        String name,
        GatewayAuthType authType,
        String authUsername,
        String authPassword,
        String authApiKeyHeaderName,
        String authBearerToken,
        String authOAuth2ClientId,
        String authOAuth2ClientSecret,
        String authOAuth2TokenUrl,
        String authOAuth2Scopes,
        List<GatewayOperationData> operations
) {
}
