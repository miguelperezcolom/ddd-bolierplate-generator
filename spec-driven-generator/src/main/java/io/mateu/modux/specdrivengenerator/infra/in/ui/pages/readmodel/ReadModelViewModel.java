package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.readmodel;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ReadModelDto;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.create.CreateReadModelCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.create.CreateReadModelUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.save.SaveReadModelCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.readmodel.save.SaveReadModelUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ConsistencyLevel;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
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

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ReadModelViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    ReadModelStorageType storageType;

    List<String> filterFields = new ArrayList<>();
    List<String> sortFields = new ArrayList<>();
    List<String> indexFields = new ArrayList<>();
    boolean cacheable;
    Integer cacheTtlSeconds;
    ConsistencyLevel consistencyLevel;
    Long maxStalenessMs;

    final CreateReadModelUseCase createUseCase;
    final SaveReadModelUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateReadModelCommand(id, name, modelId,
                storageType != null ? storageType.name() : null,
                filterFields, sortFields, cacheable, cacheTtlSeconds, consistencyLevel != null ? consistencyLevel.name() : null, maxStalenessMs, indexFields));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveReadModelCommand(id, name, modelId,
                storageType != null ? storageType.name() : null,
                filterFields, sortFields, cacheable, cacheTtlSeconds, consistencyLevel != null ? consistencyLevel.name() : null, maxStalenessMs, indexFields));
    }

    @Override
    public String id() {
        return id;
    }

    public ReadModelViewModel load(ReadModelDto model) {
        id = model.id();
        name = model.name();
        modelId = model.modelId();
        storageType = model.storageType() != null ? ReadModelStorageType.valueOf(model.storageType()) : null;
        filterFields = model.filterFields() != null ? new ArrayList<>(model.filterFields()) : new ArrayList<>();
        sortFields = model.sortFields() != null ? new ArrayList<>(model.sortFields()) : new ArrayList<>();
        indexFields = model.indexFields() != null ? new ArrayList<>(model.indexFields()) : new ArrayList<>();
        cacheable = model.cacheable();
        cacheTtlSeconds = model.cacheTtlSeconds();
        consistencyLevel = model.consistencyLevel() != null ? ConsistencyLevel.valueOf(model.consistencyLevel()) : null;
        maxStalenessMs = model.maxStalenessMs();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New read model";
    }
}
