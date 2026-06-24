package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.create.CreateFlowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.create.CreateFlowUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.save.SaveFlowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.save.SaveFlowUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
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

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class FlowViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    FlowArchetype archetype;

    @Tab("Trigger")
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    String triggerAggregateId;
    String triggerEvent;

    @Tab("Target")
    @Lookup(search = ModuleIdOptionsSupplier.class, label = ModuleIdLabelSupplier.class)
    String targetModuleId;

    @Hidden("state['archetype'] != 'MATERIALIZES'")
    String readModelName;
    @Hidden("state['archetype'] != 'MATERIALIZES'")
    List<String> materializedFields;

    @Hidden("state['archetype'] != 'TRIGGERS'")
    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String targetUseCaseId;

    @Tab("Overrides")
    List<String> overrides;

    final CreateFlowUseCase createUseCase;
    final SaveFlowUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateFlowCommand(id, name, description, archetype,
                triggerAggregateId, triggerEvent, targetModuleId,
                readModelName, materializedFields, targetUseCaseId, overrides));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveFlowCommand(id, name, description, archetype,
                triggerAggregateId, triggerEvent, targetModuleId,
                readModelName, materializedFields, targetUseCaseId, overrides));
    }

    @Override
    public String id() {
        return id;
    }

    public FlowViewModel load(FlowDto model) {
        id = model.id();
        name = model.name();
        description = model.description();
        archetype = model.archetype();
        triggerAggregateId = model.triggerAggregateId();
        triggerEvent = model.triggerEvent();
        targetModuleId = model.targetModuleId();
        readModelName = model.readModelName();
        materializedFields = model.materializedFields();
        targetUseCaseId = model.targetUseCaseId();
        overrides = model.overrides();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New flow";
    }

}
