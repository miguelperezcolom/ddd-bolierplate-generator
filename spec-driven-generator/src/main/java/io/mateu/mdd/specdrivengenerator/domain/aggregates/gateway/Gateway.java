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
    private String serviceId;
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
    private boolean rateLimitEnabled;
    private Integer rateLimitRequestsPerSecond;
    private Integer rateLimitBurstSize;
    private boolean corsEnabled;
    private String corsAllowedOrigins;
    private Long globalTimeoutMs;

    public static Gateway of(GatewayId id, GatewayName name, String serviceId, String baseUrl,
                              GatewayAuthType authType, String authUsername, String authPassword,
                              String authApiKeyHeaderName, String authBearerToken,
                              String authOAuth2ClientId, String authOAuth2ClientSecret,
                              String authOAuth2TokenUrl, String authOAuth2Scopes,
                              List<GatewayOperation> operations,
                              boolean rateLimitEnabled, Integer rateLimitRequestsPerSecond, Integer rateLimitBurstSize,
                              boolean corsEnabled, String corsAllowedOrigins,
                              Long globalTimeoutMs) {
        var gateway = new Gateway();
        gateway.id = id;
        gateway.name = name;
        gateway.serviceId = serviceId;
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
        gateway.rateLimitEnabled = rateLimitEnabled;
        gateway.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        gateway.rateLimitBurstSize = rateLimitBurstSize;
        gateway.corsEnabled = corsEnabled;
        gateway.corsAllowedOrigins = corsAllowedOrigins;
        gateway.globalTimeoutMs = globalTimeoutMs;
        return gateway;
    }

    public static Gateway load(String id, String name, String serviceId, String baseUrl,
                                GatewayAuthType authType, String authUsername, String authPassword,
                                String authApiKeyHeaderName, String authBearerToken,
                                String authOAuth2ClientId, String authOAuth2ClientSecret,
                                String authOAuth2TokenUrl, String authOAuth2Scopes,
                                List<GatewayOperation> operations,
                                boolean rateLimitEnabled, Integer rateLimitRequestsPerSecond, Integer rateLimitBurstSize,
                                boolean corsEnabled, String corsAllowedOrigins,
                                Long globalTimeoutMs) {
        var gateway = new Gateway();
        gateway.id = new GatewayId(id);
        gateway.name = new GatewayName(name);
        gateway.serviceId = serviceId;
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
        gateway.rateLimitEnabled = rateLimitEnabled;
        gateway.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        gateway.rateLimitBurstSize = rateLimitBurstSize;
        gateway.corsEnabled = corsEnabled;
        gateway.corsAllowedOrigins = corsAllowedOrigins;
        gateway.globalTimeoutMs = globalTimeoutMs;
        return gateway;
    }

    public void update(GatewayName name, String serviceId, String baseUrl,
                       GatewayAuthType authType, String authUsername, String authPassword,
                       String authApiKeyHeaderName, String authBearerToken,
                       String authOAuth2ClientId, String authOAuth2ClientSecret,
                       String authOAuth2TokenUrl, String authOAuth2Scopes,
                       List<GatewayOperation> operations,
                       boolean rateLimitEnabled, Integer rateLimitRequestsPerSecond, Integer rateLimitBurstSize,
                       boolean corsEnabled, String corsAllowedOrigins,
                       Long globalTimeoutMs) {
        this.name = name;
        this.serviceId = serviceId;
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
        this.rateLimitEnabled = rateLimitEnabled;
        this.rateLimitRequestsPerSecond = rateLimitRequestsPerSecond;
        this.rateLimitBurstSize = rateLimitBurstSize;
        this.corsEnabled = corsEnabled;
        this.corsAllowedOrigins = corsAllowedOrigins;
        this.globalTimeoutMs = globalTimeoutMs;
    }
}
