package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.AggregateDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.specdrivengenerator.application.usecases.aggregate.create.CreateAggregateCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.aggregate.create.CreateAggregateUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.aggregate.save.SaveAggregateCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.aggregate.save.SaveAggregateUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.*;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
@Style("width: 100%;")
public class AggregateViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {
    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;
    @NotEmpty String name;
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;
    AggregatePersistenceType persistenceType;
    AggregateIdType idType;
    String tableName;
    String tableSchema;
    boolean optimisticLockingEnabled;
    boolean eventSourcingEnabled;
    Integer snapshotFrequency;
    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<OperationViewModel> operations;
    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<InvariantViewModel> invariants;

    final CreateAggregateUseCase createUseCase;
    final SaveAggregateUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        if (invariants == null) {
            invariants = List.of();
        }
        createUseCase.handle(new CreateAggregateCommand(id, name,
                modelId,
                persistenceType != null ? persistenceType.name() : null,
                idType != null ? idType.name() : null,
                tableName,
                tableSchema,
                optimisticLockingEnabled,
                eventSourcingEnabled,
                snapshotFrequency,
                operations.stream()
                        .map(operationViewModel -> new OperationDto(
                                operationViewModel.id(),
                                operationViewModel.name(),
                                operationViewModel.inputModelId(),
                                operationViewModel.outputModelId(),
                                operationViewModel.preconditions(),
                                operationViewModel.sets().stream()
                                        .map(settingViewModel -> new FieldValueSettingDto(
                                                settingViewModel.fieldName(),
                                                settingViewModel.value()
                                        ))
                                        .toList(),
                                operationViewModel.emits(),
                                operationViewModel.type(),
                                operationViewModel.paginated(),
                                operationViewModel.defaultPageSize()
                        ))
                        .toList(),
                invariants.stream()
                        .map(invariantViewModel -> new InvariantDto(
                                invariantViewModel.id(),
                                invariantViewModel.name(),
                                invariantViewModel.conditions() != null ? invariantViewModel.conditions() : List.of()
                        ))
                        .toList()
        ));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        if (invariants == null) {
            invariants = List.of();
        }
        saveUseCase.handle(new SaveAggregateCommand(id, name,
                modelId,
                persistenceType != null ? persistenceType.name() : null,
                idType != null ? idType.name() : null,
                tableName,
                tableSchema,
                optimisticLockingEnabled,
                eventSourcingEnabled,
                snapshotFrequency,
                operations.stream()
                        .map(operationViewModel -> new OperationDto(
                                operationViewModel.id(),
                                operationViewModel.name(),
                                operationViewModel.inputModelId(),
                                operationViewModel.outputModelId(),
                                operationViewModel.preconditions(),
                                operationViewModel.sets() != null ? operationViewModel.sets().stream()
                                        .map(settingViewModel -> new FieldValueSettingDto(
                                                settingViewModel.fieldName(),
                                                settingViewModel.value()
                                        ))
                                        .toList() : List.of(),
                                operationViewModel.emits(),
                                operationViewModel.type(),
                                operationViewModel.paginated(),
                                operationViewModel.defaultPageSize()
                        ))
                        .toList(),
                invariants.stream().map(invariant -> new InvariantDto(
                        invariant.id(),
                        invariant.name(),
                        invariant.conditions() != null ? invariant.conditions() : List.of()
                )).toList()
        ));
    }

    @Override
    public String id() {
        return id;
    }

    public AggregateViewModel load(AggregateDto model) {
        id = model.id();
        name = model.name();
        modelId = model.modelId();
        persistenceType = model.persistenceType() != null ? AggregatePersistenceType.valueOf(model.persistenceType()) : null;
        idType = model.idType() != null ? AggregateIdType.valueOf(model.idType()) : null;
        tableName = model.tableName();
        tableSchema = model.tableSchema();
        optimisticLockingEnabled = model.optimisticLockingEnabled();
        eventSourcingEnabled = model.eventSourcingEnabled();
        snapshotFrequency = model.snapshotFrequency();
        operations = model.operations().stream().map(operationDto -> new OperationViewModel(
               operationDto.id(), operationDto.name(), operationDto.inputModelId(), operationDto.outputModelId(),
               operationDto.preconditions(),
               operationDto.sets().stream().map(settingDto -> new FieldValueSettingViewModel(
                       settingDto.fieldName(), settingDto.value())).toList(),
               operationDto.emits(), operationDto.type(),
               operationDto.paginated(), operationDto.defaultPageSize())).toList();
        invariants = model.invariants().stream()
                .map(invariant -> new InvariantViewModel(invariant.id(), invariant.name(),
                        invariant.conditions() != null ? invariant.conditions() : List.of()))
                .toList();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New aggregate";
    }
}
