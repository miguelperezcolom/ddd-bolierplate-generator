package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.PageDto;
import io.mateu.modux.specdrivengenerator.application.usecases.page.create.CreatePageCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.page.create.CreatePageUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.page.save.SavePageCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.page.save.SavePageUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ComponentIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ComponentIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
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

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class PageViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String route;

    PageType type;

    @Hidden("state['type'] != 'CRUD'")
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    String aggregateId;

    @Hidden("state['type'] != 'FORM'")
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    @Hidden("state['type'] != 'DASHBOARD'")
    @Lookup(search = ComponentIdOptionsSupplier.class, label = ComponentIdLabelSupplier.class)
    List<String> componentIds;

    final CreatePageUseCase createUseCase;
    final SavePageUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreatePageCommand(id, name, route, type, aggregateId, modelId, componentIds));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SavePageCommand(id, name, route, type, aggregateId, modelId, componentIds));
    }

    @Override
    public String id() {
        return id;
    }

    public PageViewModel load(PageDto model) {
        id = model.id();
        name = model.name();
        route = model.route();
        type = model.type();
        aggregateId = model.aggregateId();
        modelId = model.modelId();
        componentIds = model.componentIds();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New page";
    }
}
