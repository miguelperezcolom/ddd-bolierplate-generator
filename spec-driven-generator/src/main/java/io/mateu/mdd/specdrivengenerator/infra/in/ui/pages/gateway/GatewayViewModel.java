package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayUseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Tab;

import java.util.ArrayList;
import java.util.List;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class GatewayViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String baseUrl;

    @Tab("Authentication")
    GatewayAuthType authType;
    String authUsername;
    String authPassword;
    String authApiKeyHeaderName;
    String authBearerToken;
    String authOAuth2ClientId;
    String authOAuth2ClientSecret;
    String authOAuth2TokenUrl;
    String authOAuth2Scopes;

    @Tab("Operations")
    List<GatewayOperationViewModel> operations = new ArrayList<>();

    final CreateGatewayUseCase createUseCase;
    final SaveGatewayUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateGatewayCommand(id, name, baseUrl,
                authType, authUsername, authPassword, authApiKeyHeaderName, authBearerToken,
                authOAuth2ClientId, authOAuth2ClientSecret, authOAuth2TokenUrl, authOAuth2Scopes,
                toOperationData(operations)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveGatewayCommand(id, name, baseUrl,
                authType, authUsername, authPassword, authApiKeyHeaderName, authBearerToken,
                authOAuth2ClientId, authOAuth2ClientSecret, authOAuth2TokenUrl, authOAuth2Scopes,
                toOperationData(operations)));
    }

    @Override
    public String id() {
        return id;
    }

    public GatewayViewModel load(GatewayDto model) {
        id = model.id();
        name = model.name();
        baseUrl = model.baseUrl();
        authType = model.authType();
        authUsername = model.authUsername();
        authPassword = model.authPassword();
        authApiKeyHeaderName = model.authApiKeyHeaderName();
        authBearerToken = model.authBearerToken();
        authOAuth2ClientId = model.authOAuth2ClientId();
        authOAuth2ClientSecret = model.authOAuth2ClientSecret();
        authOAuth2TokenUrl = model.authOAuth2TokenUrl();
        authOAuth2Scopes = model.authOAuth2Scopes();
        operations = model.operations() == null ? new ArrayList<>() :
                model.operations().stream().map(o -> {
                    var vm = new GatewayOperationViewModel();
                    vm.id = o.id();
                    vm.name = o.name();
                    vm.httpMethod = o.httpMethod();
                    vm.path = o.path();
                    vm.inputModelId = o.inputModelId();
                    vm.outputModelId = o.outputModelId();
                    vm.timeoutMs = o.timeoutMs();
                    vm.retryMaxAttempts = o.retryMaxAttempts();
                    vm.retryWaitDurationMs = o.retryWaitDurationMs();
                    vm.circuitBreakerEnabled = o.circuitBreakerEnabled();
                    vm.circuitBreakerFailureRateThreshold = o.circuitBreakerFailureRateThreshold();
                    vm.circuitBreakerSlidingWindowSize = o.circuitBreakerSlidingWindowSize();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<GatewayOperationData> toOperationData(List<GatewayOperationViewModel> ops) {
        if (ops == null) return List.of();
        return ops.stream()
                .map(o -> new GatewayOperationData(o.id, o.name, o.httpMethod, o.path, o.inputModelId, o.outputModelId,
                        o.timeoutMs, o.retryMaxAttempts, o.retryWaitDurationMs,
                        o.circuitBreakerEnabled, o.circuitBreakerFailureRateThreshold, o.circuitBreakerSlidingWindowSize))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New gateway";
    }

}
