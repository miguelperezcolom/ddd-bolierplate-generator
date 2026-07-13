package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ReadModelDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.create.CreateReadModelCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.create.CreateReadModelUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.save.SaveReadModelCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.save.SaveReadModelUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
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
public class ReadModelViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    String boundedContextId;

    String description;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    ReadModelStorageType storageType;

    ReadModelConsistency consistency;

    final CreateReadModelUseCase createUseCase;
    final SaveReadModelUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateReadModelCommand(id, name, boundedContextId, description,
                modelId, storageType, consistency));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveReadModelCommand(id, name, boundedContextId, description,
                modelId, storageType, consistency));
    }

    @Override
    public String id() {
        return id;
    }

    public ReadModelViewModel load(ReadModelDto model) {
        id = model.id();
        name = model.name();
        boundedContextId = model.boundedContextId();
        description = model.description();
        modelId = model.modelId();
        storageType = model.storageType();
        consistency = model.consistency();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New read model";
    }

}
