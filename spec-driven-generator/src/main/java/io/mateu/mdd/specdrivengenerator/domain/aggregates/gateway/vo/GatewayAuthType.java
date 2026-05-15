package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo;

public enum GatewayAuthType {
    None,
    Basic,
    ApiKey,
    BearerToken,
    OAuth2ClientCredentials
}
