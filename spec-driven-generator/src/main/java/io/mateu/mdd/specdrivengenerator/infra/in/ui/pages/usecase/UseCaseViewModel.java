package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.UseCaseStepData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.HttpMethod;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.Tab;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class UseCaseViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    boolean exposedAsRest;
    boolean exposedAsGrpc;
    boolean exposedAsMcp;
    boolean exposedAsAsync;
    boolean exposedAsUi;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String inputModelId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String outputModelId;

    List<String> allowedRoles = new ArrayList<>();

    List<String> allowedScopes = new ArrayList<>();

    String apiVersion;
    String mcpDescription;
    HttpMethod restHttpMethod;
    String restPath;
    Integer asyncRetryCount;
    String asyncDeadLetterQueue;
    String asyncOrderingKey;
    String asyncTopicName;
    String asyncConsumerGroup;
    boolean cacheable;
    Integer cacheTtlSeconds;
    Long timeoutMs;

    @Tab
    List<UseCaseStepViewModel> steps = new ArrayList<>();

    final CreateUseCaseUseCase createUseCase;
    final SaveUseCaseUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateUseCaseCommand(id, name,
                exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi,
                inputModelId, outputModelId, toStepData(steps), allowedRoles, allowedScopes, apiVersion, mcpDescription,
                restHttpMethod != null ? restHttpMethod.name() : null, restPath,
                asyncRetryCount, asyncDeadLetterQueue, asyncOrderingKey, asyncTopicName, asyncConsumerGroup,
                cacheable, cacheTtlSeconds, timeoutMs));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUseCaseCommand(id, name,
                exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi,
                inputModelId, outputModelId, toStepData(steps), allowedRoles, allowedScopes, apiVersion, mcpDescription,
                restHttpMethod != null ? restHttpMethod.name() : null, restPath,
                asyncRetryCount, asyncDeadLetterQueue, asyncOrderingKey, asyncTopicName, asyncConsumerGroup,
                cacheable, cacheTtlSeconds, timeoutMs));
    }

    @Override
    public String id() {
        return id;
    }

    public UseCaseViewModel load(UseCaseDto model) {
        id = model.id();
        name = model.name();
        exposedAsRest = model.exposedAsRest();
        exposedAsGrpc = model.exposedAsGrpc();
        exposedAsMcp = model.exposedAsMcp();
        exposedAsAsync = model.exposedAsAsync();
        exposedAsUi = model.exposedAsUi();
        inputModelId = model.inputModelId();
        outputModelId = model.outputModelId();
        allowedRoles = model.allowedRoles() != null ? new ArrayList<>(model.allowedRoles()) : new ArrayList<>();
        allowedScopes = model.allowedScopes() != null ? new ArrayList<>(model.allowedScopes()) : new ArrayList<>();
        apiVersion = model.apiVersion();
        mcpDescription = model.mcpDescription();
        restHttpMethod = model.restHttpMethod() != null ? HttpMethod.valueOf(model.restHttpMethod()) : null;
        restPath = model.restPath();
        asyncRetryCount = model.asyncRetryCount();
        asyncDeadLetterQueue = model.asyncDeadLetterQueue();
        asyncOrderingKey = model.asyncOrderingKey();
        asyncTopicName = model.asyncTopicName();
        asyncConsumerGroup = model.asyncConsumerGroup();
        cacheable = model.cacheable();
        cacheTtlSeconds = model.cacheTtlSeconds();
        timeoutMs = model.timeoutMs();
        steps = model.steps() == null ? new ArrayList<>() : model.steps().stream().map(s -> {
            var vm = new UseCaseStepViewModel();
            vm.id = s.id();
            vm.name = s.name();
            vm.type = s.type();
            vm.aggregateId = s.aggregateId();
            vm.operationId = s.operationId();
            vm.gatewayId = s.gatewayId();
            vm.gatewayOperationId = s.gatewayOperationId();
            vm.domainEventId = s.domainEventId();
            vm.useCaseId = s.useCaseId();
            vm.modelMappingId = s.modelMappingId();
            return vm;
        }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<UseCaseStepData> toStepData(List<UseCaseStepViewModel> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new UseCaseStepData(s.id, s.name, s.type,
                        s.aggregateId, s.operationId,
                        s.gatewayId, s.gatewayOperationId,
                        s.domainEventId, s.useCaseId, s.modelMappingId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New use case";
    }

}
