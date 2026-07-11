package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * The gateway's ficha: name, type and SEMANTICS — the same pair the diagram
 * toggles with a double click, editable here as well. Its links (sources,
 * targets, branch conditions) are drawn on the workflows view.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class WorkflowGatewayViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @NotNull
    GatewayType type = GatewayType.JOIN;

    @Help("Join: ALL espera a todas las entradas, ANY arranca con la primera. Split: PARALLEL abre todas las ramas, EXCLUSIVE elige una. Vacío = por defecto (ALL / PARALLEL).")
    GatewaySemantics semantics;

    final ModelStore repository;

    private void validatePair() {
        if (semantics == null) return;
        var valid = type == GatewayType.JOIN
                ? Set.of(GatewaySemantics.ALL, GatewaySemantics.ANY)
                : Set.of(GatewaySemantics.PARALLEL, GatewaySemantics.EXCLUSIVE);
        if (!valid.contains(semantics)) {
            throw new IllegalArgumentException(
                    "Semántica inválida para un " + type + ": " + semantics
                            + " (join: ALL/ANY · split: PARALLEL/EXCLUSIVE)");
        }
    }

    @Override
    public String create(HttpRequest httpRequest) {
        validatePair();
        repository.save(new WorkflowGatewayEntity(id, name, type.name(),
                semantics == null ? null : semantics.name(), null, null, null));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        validatePair();
        var current = repository.findById(id, WorkflowGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown gateway: " + id));
        repository.save(current.toBuilder()
                .name(name)
                .type(type.name())
                .semantics(semantics == null ? null : semantics.name())
                .build());
    }

    @Override
    public String id() {
        return id;
    }

    public WorkflowGatewayViewModel load(WorkflowGatewayEntity entity) {
        id = entity.id();
        name = entity.name();
        type = entity.type() == null ? GatewayType.JOIN : GatewayType.valueOf(entity.type());
        semantics = entity.semantics() == null ? null : GatewaySemantics.valueOf(entity.semantics());
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New gateway";
    }
}
