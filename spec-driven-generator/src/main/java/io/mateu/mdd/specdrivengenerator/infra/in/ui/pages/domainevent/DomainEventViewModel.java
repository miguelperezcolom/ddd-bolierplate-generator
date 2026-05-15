package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.domainevent;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.create.CreateDomainEventCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.create.CreateDomainEventUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.save.SaveDomainEventCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.save.SaveDomainEventUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
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
public class DomainEventViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    final CreateDomainEventUseCase createUseCase;
    final SaveDomainEventUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateDomainEventCommand(id, name, modelId));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveDomainEventCommand(id, name, modelId));
    }

    @Override
    public String id() {
        return id;
    }

    public DomainEventViewModel load(DomainEventDto model) {
        id = model.id();
        name = model.name();
        modelId = model.modelId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New domain event";
    }

}
