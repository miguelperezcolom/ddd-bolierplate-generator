package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.saga;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SagaDto;
import io.mateu.modux.specdrivengenerator.application.usecases.saga.SagaStepData;
import io.mateu.modux.specdrivengenerator.application.usecases.saga.create.CreateSagaCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.saga.create.CreateSagaUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.saga.save.SaveSagaCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.saga.save.SaveSagaUseCase;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
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
public class SagaViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    Long timeoutMs;
    Long compensationTimeoutMs;
    Integer maxRetries;
    Long retryBackoffMs;
    String deadLetterQueue;
    boolean persistenceEnabled;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    List<String> triggeringEventIds = new ArrayList<>();

    @Tab
    List<SagaStepViewModel> steps = new ArrayList<>();

    final CreateSagaUseCase createUseCase;
    final SaveSagaUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateSagaCommand(id, name, timeoutMs, compensationTimeoutMs, triggeringEventIds, toStepData(steps), maxRetries, retryBackoffMs, deadLetterQueue, persistenceEnabled));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveSagaCommand(id, name, timeoutMs, compensationTimeoutMs, triggeringEventIds, toStepData(steps), maxRetries, retryBackoffMs, deadLetterQueue, persistenceEnabled));
    }

    @Override
    public String id() {
        return id;
    }

    public SagaViewModel load(SagaDto model) {
        id = model.id();
        name = model.name();
        timeoutMs = model.timeoutMs();
        compensationTimeoutMs = model.compensationTimeoutMs();
        maxRetries = model.maxRetries();
        retryBackoffMs = model.retryBackoffMs();
        deadLetterQueue = model.deadLetterQueue();
        persistenceEnabled = model.persistenceEnabled();
        triggeringEventIds = model.triggeringEventIds() != null ? new ArrayList<>(model.triggeringEventIds()) : new ArrayList<>();
        steps = model.steps() == null ? new ArrayList<>() : model.steps().stream().map(s -> {
            var vm = new SagaStepViewModel();
            vm.id = s.id();
            vm.name = s.name();
            vm.type = s.type();
            vm.compensatingStepId = s.compensatingStepId();
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

    private List<SagaStepData> toStepData(List<SagaStepViewModel> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new SagaStepData(s.id, s.name, s.type, s.compensatingStepId,
                        s.aggregateId, s.operationId,
                        s.gatewayId, s.gatewayOperationId,
                        s.domainEventId, s.useCaseId, s.modelMappingId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New saga";
    }
}
