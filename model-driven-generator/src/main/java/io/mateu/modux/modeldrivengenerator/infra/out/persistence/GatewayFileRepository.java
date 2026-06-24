package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayParameterEntity;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GatewayFileRepository implements GatewayRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Gateway> findById(GatewayId id) {
        return repository.findById(id.id(), GatewayEntity.class)
                .map(entity -> Gateway.load(entity.id(), entity.name(), entity.serviceId(), entity.baseUrl(),
                        entity.authType(), entity.authUsername(), entity.authPassword(),
                        entity.authApiKeyHeaderName(), entity.authBearerToken(),
                        entity.authOAuth2ClientId(), entity.authOAuth2ClientSecret(),
                        entity.authOAuth2TokenUrl(), entity.authOAuth2Scopes(),
                        entity.operations() == null ? List.of() :
                                entity.operations().stream()
                                        .map(o -> new GatewayOperation(o.id(), o.name(), o.httpMethod(), o.path(), o.inputModelId(), o.outputModelId(),
                                                o.timeoutMs(), o.retryMaxAttempts(), o.retryWaitDurationMs(),
                                                o.circuitBreakerEnabled(), o.circuitBreakerFailureRateThreshold(), o.circuitBreakerSlidingWindowSize(),
                                                o.parameters() == null ? List.of() :
                                                        o.parameters().stream()
                                                                .map(p -> new io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayParameter(
                                                                        p.name(), p.location(), p.type(), p.required()))
                                                                .toList()))
                                        .toList(),
                        entity.rateLimitEnabled(), entity.rateLimitRequestsPerSecond(), entity.rateLimitBurstSize(),
                        entity.corsEnabled(), entity.corsAllowedOrigins(),
                        entity.globalTimeoutMs()));
    }

    @Override
    public Gateway save(Gateway entity) {
        var operationEntities = entity.getOperations() == null ? List.<GatewayOperationEntity>of() :
                entity.getOperations().stream()
                        .map(o -> new GatewayOperationEntity(o.id(), o.name(), o.httpMethod(), o.path(), o.inputModelId(), o.outputModelId(),
                                o.timeoutMs(), o.retryMaxAttempts(), o.retryWaitDurationMs(),
                                o.circuitBreakerEnabled(), o.circuitBreakerFailureRateThreshold(), o.circuitBreakerSlidingWindowSize(),
                                o.parameters() == null ? List.of() :
                                        o.parameters().stream()
                                                .map(p -> new GatewayParameterEntity(p.name(), p.location(), p.type(), p.required()))
                                                .toList()))
                        .toList();
        repository.save(new GatewayEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getServiceId(),
                entity.getBaseUrl(),
                entity.getAuthType(), entity.getAuthUsername(), entity.getAuthPassword(),
                entity.getAuthApiKeyHeaderName(), entity.getAuthBearerToken(),
                entity.getAuthOAuth2ClientId(), entity.getAuthOAuth2ClientSecret(),
                entity.getAuthOAuth2TokenUrl(), entity.getAuthOAuth2Scopes(),
                operationEntities,
                entity.isRateLimitEnabled(), entity.getRateLimitRequestsPerSecond(), entity.getRateLimitBurstSize(),
                entity.isCorsEnabled(), entity.getCorsAllowedOrigins(),
                entity.getGlobalTimeoutMs()));
        return entity;
    }

    @Override
    public void deleteAllById(List<GatewayId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(GatewayId::id).toList(), GatewayEntity.class);
    }
}
