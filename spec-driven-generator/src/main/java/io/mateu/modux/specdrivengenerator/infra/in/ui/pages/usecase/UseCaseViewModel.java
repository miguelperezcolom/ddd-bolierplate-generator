package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.modux.specdrivengenerator.application.usecases.usecase.UseCaseStepData;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.HttpMethod;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.TransactionBoundary;
import io.mateu.modux.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseUseCase;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.StyleConstants;
import io.mateu.uidl.annotations.*;
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
@Style(StyleConstants.FULL_WIDTH_WITH_PADDING)
public class UseCaseViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Tab("Exposition")
    boolean exposedAsRest;
    boolean exposedAsGrpc;
    boolean exposedAsMcp;
    boolean exposedAsAsync;
    boolean exposedAsUi;

    @Tab("In/Out")
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String inputModelId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String outputModelId;

    @Tab("Security")
    List<String> allowedRoles = new ArrayList<>();

    List<String> allowedScopes = new ArrayList<>();

    @Tab("Metadata")
    String apiVersion;
    String mcpDescription;
    @Tab("Rest")
    HttpMethod restHttpMethod;
    String restPath;
    @Tab("Resilience")
    Integer asyncRetryCount;
    String asyncDeadLetterQueue;
    Long timeoutMs;
    @Tab("Async")
    String asyncOrderingKey;
    String asyncTopicName;
    String asyncConsumerGroup;
    @Tab("Cache")
    boolean cacheable;
    Integer cacheTtlSeconds;
    @Tab("Transactional")
    TransactionBoundary transactionBoundary;
    @Tab("Idempotency")
    boolean idempotencyEnabled;
    String idempotencyKeyField;
    @Tab("Rate Limiting")
    boolean rateLimitEnabled;
    Integer rateLimitRequestsPerSecond;
    @Tab("gRPC")
    String grpcServiceName;
    String grpcMethodName;

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
                cacheable, cacheTtlSeconds, timeoutMs, transactionBoundary != null ? transactionBoundary.name() : null,
                idempotencyEnabled, idempotencyKeyField, rateLimitEnabled, rateLimitRequestsPerSecond,
                grpcServiceName, grpcMethodName));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUseCaseCommand(id, name,
                exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi,
                inputModelId, outputModelId, toStepData(steps), allowedRoles, allowedScopes, apiVersion, mcpDescription,
                restHttpMethod != null ? restHttpMethod.name() : null, restPath,
                asyncRetryCount, asyncDeadLetterQueue, asyncOrderingKey, asyncTopicName, asyncConsumerGroup,
                cacheable, cacheTtlSeconds, timeoutMs, transactionBoundary != null ? transactionBoundary.name() : null,
                idempotencyEnabled, idempotencyKeyField, rateLimitEnabled, rateLimitRequestsPerSecond,
                grpcServiceName, grpcMethodName));
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
        transactionBoundary = model.transactionBoundary() != null ? TransactionBoundary.valueOf(model.transactionBoundary()) : null;
        idempotencyEnabled = model.idempotencyEnabled();
        idempotencyKeyField = model.idempotencyKeyField();
        rateLimitEnabled = model.rateLimitEnabled();
        rateLimitRequestsPerSecond = model.rateLimitRequestsPerSecond();
        grpcServiceName = model.grpcServiceName();
        grpcMethodName = model.grpcMethodName();
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
