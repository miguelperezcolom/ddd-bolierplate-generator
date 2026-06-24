package io.mateu.modux.modeldrivengenerator.application.usecases.gateway.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveGatewayUseCase {

    final GatewayRepository repository;

    public void handle(SaveGatewayCommand command) {
        var gateway = repository.findById(new GatewayId(command.id())).orElseThrow();
        var operations = command.operations() == null ? List.<GatewayOperation>of() :
                command.operations().stream()
                        .map(o -> new GatewayOperation(o.id(), o.name(), o.httpMethod(), o.path(), o.inputModelId(), o.outputModelId(),
                                o.timeoutMs(), o.retryMaxAttempts(), o.retryWaitDurationMs(),
                                o.circuitBreakerEnabled(), o.circuitBreakerFailureRateThreshold(), o.circuitBreakerSlidingWindowSize(),
                                o.parameters() == null ? java.util.List.of() :
                                        o.parameters().stream()
                                                .map(p -> new io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayParameter(
                                                        p.name(), p.location(), p.type(), p.required()))
                                                .toList()))
                        .toList();
        gateway.update(new GatewayName(command.name()),
                command.serviceId(),
                command.baseUrl(),
                command.authType(), command.authUsername(), command.authPassword(),
                command.authApiKeyHeaderName(), command.authBearerToken(),
                command.authOAuth2ClientId(), command.authOAuth2ClientSecret(),
                command.authOAuth2TokenUrl(), command.authOAuth2Scopes(),
                operations,
                command.rateLimitEnabled(), command.rateLimitRequestsPerSecond(), command.rateLimitBurstSize(),
                command.corsEnabled(), command.corsAllowedOrigins(),
                command.globalTimeoutMs());
        repository.save(gateway);
    }

}
