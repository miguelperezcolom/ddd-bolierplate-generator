package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import lombok.Getter;

import java.util.List;

@Getter
public class Gateway {

    private GatewayId id;
    private GatewayName name;
    private String baseUrl;
    private GatewayAuthType authType;
    private String authUsername;
    private String authPassword;
    private String authApiKeyHeaderName;
    private String authBearerToken;
    private String authOAuth2ClientId;
    private String authOAuth2ClientSecret;
    private String authOAuth2TokenUrl;
    private String authOAuth2Scopes;
    private List<GatewayOperation> operations;

    public static Gateway of(GatewayId id, GatewayName name, String baseUrl,
                              GatewayAuthType authType, String authUsername, String authPassword,
                              String authApiKeyHeaderName, String authBearerToken,
                              String authOAuth2ClientId, String authOAuth2ClientSecret,
                              String authOAuth2TokenUrl, String authOAuth2Scopes,
                              List<GatewayOperation> operations) {
        var gateway = new Gateway();
        gateway.id = id;
        gateway.name = name;
        gateway.baseUrl = baseUrl;
        gateway.authType = authType;
        gateway.authUsername = authUsername;
        gateway.authPassword = authPassword;
        gateway.authApiKeyHeaderName = authApiKeyHeaderName;
        gateway.authBearerToken = authBearerToken;
        gateway.authOAuth2ClientId = authOAuth2ClientId;
        gateway.authOAuth2ClientSecret = authOAuth2ClientSecret;
        gateway.authOAuth2TokenUrl = authOAuth2TokenUrl;
        gateway.authOAuth2Scopes = authOAuth2Scopes;
        gateway.operations = operations != null ? operations : List.of();
        return gateway;
    }

    public static Gateway load(String id, String name, String baseUrl,
                                GatewayAuthType authType, String authUsername, String authPassword,
                                String authApiKeyHeaderName, String authBearerToken,
                                String authOAuth2ClientId, String authOAuth2ClientSecret,
                                String authOAuth2TokenUrl, String authOAuth2Scopes,
                                List<GatewayOperation> operations) {
        var gateway = new Gateway();
        gateway.id = new GatewayId(id);
        gateway.name = new GatewayName(name);
        gateway.baseUrl = baseUrl;
        gateway.authType = authType;
        gateway.authUsername = authUsername;
        gateway.authPassword = authPassword;
        gateway.authApiKeyHeaderName = authApiKeyHeaderName;
        gateway.authBearerToken = authBearerToken;
        gateway.authOAuth2ClientId = authOAuth2ClientId;
        gateway.authOAuth2ClientSecret = authOAuth2ClientSecret;
        gateway.authOAuth2TokenUrl = authOAuth2TokenUrl;
        gateway.authOAuth2Scopes = authOAuth2Scopes;
        gateway.operations = operations != null ? operations : List.of();
        return gateway;
    }

    public void update(GatewayName name, String baseUrl,
                       GatewayAuthType authType, String authUsername, String authPassword,
                       String authApiKeyHeaderName, String authBearerToken,
                       String authOAuth2ClientId, String authOAuth2ClientSecret,
                       String authOAuth2TokenUrl, String authOAuth2Scopes,
                       List<GatewayOperation> operations) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.authType = authType;
        this.authUsername = authUsername;
        this.authPassword = authPassword;
        this.authApiKeyHeaderName = authApiKeyHeaderName;
        this.authBearerToken = authBearerToken;
        this.authOAuth2ClientId = authOAuth2ClientId;
        this.authOAuth2ClientSecret = authOAuth2ClientSecret;
        this.authOAuth2TokenUrl = authOAuth2TokenUrl;
        this.authOAuth2Scopes = authOAuth2Scopes;
        this.operations = operations != null ? operations : List.of();
    }
}
