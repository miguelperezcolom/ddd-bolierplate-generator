package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateGatewayUseCase {

    final GatewayRepository repository;

    public void handle(CreateGatewayCommand command) {
        var operations = command.operations() == null ? List.of() :
                command.operations().stream()
                        .map(o -> new GatewayOperation(o.id(), o.name(), o.inputModelId(), o.outputModelId(),
                                o.timeoutMs(), o.retryMaxAttempts(), o.retryWaitDurationMs(),
                                o.circuitBreakerEnabled(), o.circuitBreakerFailureRateThreshold(), o.circuitBreakerSlidingWindowSize()))
                        .toList();
        var gateway = Gateway.of(
                new GatewayId(command.id()),
                new GatewayName(command.name()),
                command.serviceId(),
                command.baseUrl(),
                command.authType(), command.authUsername(), command.authPassword(),
                command.authApiKeyHeaderName(), command.authBearerToken(),
                command.authOAuth2ClientId(), command.authOAuth2ClientSecret(),
                command.authOAuth2TokenUrl(), command.authOAuth2Scopes(),
                operations,
                command.rateLimitEnabled(), command.rateLimitRequestsPerSecond(), command.rateLimitBurstSize());
        repository.save(gateway);
    }

}
