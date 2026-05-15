package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.service;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.service.create.CreateServiceCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.service.create.CreateServiceUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.service.save.SaveServiceCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.service.save.SaveServiceUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModuleIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModuleIdOptionsSupplier;
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
public class ServiceViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String gitRepository;
    String database;

    @Lookup(search = ModuleIdOptionsSupplier.class, label = ModuleIdLabelSupplier.class)
    List<String> modules;

    final CreateServiceUseCase createUseCase;
    final SaveServiceUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateServiceCommand(id, name, gitRepository, database, modules));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveServiceCommand(id, name, gitRepository, database, modules));
    }

    @Override
    public String id() {
        return id;
    }

    public ServiceViewModel load(ServiceDto model) {
        id = model.id();
        name = model.name();
        gitRepository = model.gitRepository();
        database = model.database();
        modules = model.moduleIds();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New service";
    }

}
