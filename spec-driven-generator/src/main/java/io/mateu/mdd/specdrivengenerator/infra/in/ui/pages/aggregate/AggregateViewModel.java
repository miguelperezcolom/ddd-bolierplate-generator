package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.AggregateDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.OperationDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.create.CreateAggregateCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.create.CreateAggregateUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.save.SaveAggregateCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.save.SaveAggregateUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.InvariantIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.InvariantIdOptionsSupplier;
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
import java.util.Optional;

@Service
@Scope("prototype")
@RequiredArgsConstructor
@Style("width: 100%;")
public class AggregateViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {
    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;
    @NotEmpty String name;
    @Tab
            @MasterDetail(minHeightWhenDetailVisible = "24rem")
    List<FieldViewModel> fields;
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
        if (fields == null) {
            fields = List.of();
        }
        if (invariants == null) {
            invariants = List.of();
        }
        createUseCase.handle(new CreateAggregateCommand(id, name,
                fields.stream().map(field -> new FieldDto(
                        field.name(),
                        field.label(),
                        field.type(),
                        field.help(),
                        field.valueObject(),
                        field.entity(),
                        field.primitiveType(),
                        field.mandatory(),
                        field.readonly(),
                        field.visible(),
                        field.editable(),
                        field.searchable(),
                        field.filterable()
                )).toList(),
                operations.stream()
                        .map(operationViewModel -> new OperationDto(
                                operationViewModel.id(),
                                operationViewModel.name(),
                                operationViewModel.preconditions(),
                                operationViewModel.sets().stream()
                                        .map(settingViewModel -> new FieldValueSettingDto(
                                                settingViewModel.fieldName(),
                                                settingViewModel.value()
                                        ))
                                        .toList(),
                                operationViewModel.emits(),
                                operationViewModel.type()
                        ))
                        .toList(),
                invariants.stream()
                        .map(invariantViewModel -> new InvariantDto(
                                invariantViewModel.id(),
                                invariantViewModel.name()
                        ))
                        .toList()
        ));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        if (fields == null) {
            fields = List.of();
        }
        if (invariants == null) {
            invariants = List.of();
        }
        saveUseCase.handle(new SaveAggregateCommand(id, name,
                fields.stream().map(field -> new FieldDto(
                        field.name(),
                        field.label(),
                        field.type(),
                        field.help(),
                        field.valueObject(),
                        field.entity(),
                        field.primitiveType(),
                        field.mandatory(),
                        field.readonly(),
                        field.visible(),
                        field.editable(),
                        field.searchable(),
                        field.filterable()
                )).toList(),
                operations.stream()
                        .map(operationViewModel -> new OperationDto(
                                operationViewModel.id(),
                                operationViewModel.name(),
                                operationViewModel.preconditions(),
                                operationViewModel.sets() != null?operationViewModel.sets().stream()
                                        .map(settingViewModel -> new FieldValueSettingDto(
                                                settingViewModel.fieldName(),
                                                settingViewModel.value()
                                        ))
                                        .toList():List.of(),
                                operationViewModel.emits(),
                                operationViewModel.type()
                        ))
                        .toList(),
                invariants.stream().map(invariant -> new InvariantDto(
                        invariant.id(),
                        invariant.name()
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
        fields = model.fields().stream().map(field -> new FieldViewModel(field.name(),
                field.label(),
                field.type(),
                field.help(),
                field.valueObjectId(),
                field.entityId(),
                field.primitiveType(),
                field.mandatory(),
                field.readonly(),
                field.visible(),
                field.editable(),
                field.searchable(),
                field.filterable())).toList();
       operations = model.operations().stream().map(operationDto -> new OperationViewModel(
               operationDto.id(), operationDto.name(), operationDto.preconditions(),
               operationDto.sets().stream().map(settingDto -> new FieldValueSettingViewModel(
                       settingDto.fieldName(), settingDto.value())).toList(),
               operationDto.emits(), operationDto.type())).toList();
        invariants = model.invariants().stream()
                .map(invariant -> new InvariantViewModel(invariant.id(), invariant.name()))
                .toList();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New aggregate";
    }
}
