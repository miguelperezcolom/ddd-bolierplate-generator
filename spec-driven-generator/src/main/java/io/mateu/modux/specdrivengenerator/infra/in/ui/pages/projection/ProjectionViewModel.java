package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.projection;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectionDto;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.create.CreateProjectionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.create.CreateProjectionUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.save.SaveProjectionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.projection.save.SaveProjectionUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ErrorHandlingStrategy;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionStorageType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.RebuildStrategy;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
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
public class ProjectionViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    ProjectionStorageType storageType;
    RebuildStrategy rebuildStrategy;
    ErrorHandlingStrategy errorHandlingStrategy;
    Integer maxRetries;
    boolean snapshotEnabled;
    Integer snapshotFrequency;

    @Tab
    List<ProjectionEventHandlerViewModel> handlers = new ArrayList<>();

    final CreateProjectionUseCase createUseCase;
    final SaveProjectionUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateProjectionCommand(id, name, modelId, storageType != null ? storageType.name() : null, toHandlerData(handlers), rebuildStrategy != null ? rebuildStrategy.name() : null, errorHandlingStrategy != null ? errorHandlingStrategy.name() : null, maxRetries, snapshotEnabled, snapshotFrequency));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveProjectionCommand(id, name, modelId, storageType != null ? storageType.name() : null, toHandlerData(handlers), rebuildStrategy != null ? rebuildStrategy.name() : null, errorHandlingStrategy != null ? errorHandlingStrategy.name() : null, maxRetries, snapshotEnabled, snapshotFrequency));
    }

    @Override
    public String id() {
        return id;
    }

    public ProjectionViewModel load(ProjectionDto model) {
        id = model.id();
        name = model.name();
        modelId = model.modelId();
        storageType = model.storageType() != null ? ProjectionStorageType.valueOf(model.storageType()) : null;
        rebuildStrategy = model.rebuildStrategy() != null ? RebuildStrategy.valueOf(model.rebuildStrategy()) : null;
        errorHandlingStrategy = model.errorHandlingStrategy() != null ? ErrorHandlingStrategy.valueOf(model.errorHandlingStrategy()) : null;
        maxRetries = model.maxRetries();
        snapshotEnabled = model.snapshotEnabled();
        snapshotFrequency = model.snapshotFrequency();
        handlers = model.handlers() == null ? new ArrayList<>() : model.handlers().stream().map(h -> {
            var vm = new ProjectionEventHandlerViewModel();
            vm.id = h.id();
            vm.name = h.name();
            vm.domainEventId = h.domainEventId();
            vm.type = h.type();
            vm.modelMappingId = h.modelMappingId();
            return vm;
        }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<ProjectionEventHandlerData> toHandlerData(List<ProjectionEventHandlerViewModel> handlers) {
        if (handlers == null) return List.of();
        return handlers.stream()
                .map(h -> new ProjectionEventHandlerData(h.id, h.name, h.domainEventId, h.type, h.modelMappingId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New projection";
    }
}
