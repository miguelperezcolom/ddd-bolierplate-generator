package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.scheduledtrigger;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ScheduledTriggerDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.create.CreateScheduledTriggerCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.create.CreateScheduledTriggerUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.save.SaveScheduledTriggerCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.save.SaveScheduledTriggerUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
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
public class ScheduledTriggerViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @NotEmpty
    String cronExpression;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;

    @Lookup(search = ModelMappingIdOptionsSupplier.class, label = ModelMappingIdLabelSupplier.class)
    String modelMappingId;

    String description;

    final CreateScheduledTriggerUseCase createUseCase;
    final SaveScheduledTriggerUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateScheduledTriggerCommand(id, name, cronExpression, useCaseId, modelMappingId, description));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveScheduledTriggerCommand(id, name, cronExpression, useCaseId, modelMappingId, description));
    }

    @Override
    public String id() {
        return id;
    }

    public ScheduledTriggerViewModel load(ScheduledTriggerDto model) {
        id = model.id();
        name = model.name();
        cronExpression = model.cronExpression();
        useCaseId = model.useCaseId();
        modelMappingId = model.modelMappingId();
        description = model.description();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New scheduled trigger";
    }
}
