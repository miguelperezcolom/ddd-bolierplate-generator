package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayBranchConditionEntity;
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

    /** SPLIT EXCLUSIVO: la condición que elige cada rama (una fila por salida). */
    @Help("Solo para splits EXCLUSIVOS: la expresión que, cuando es cierta, elige esa rama. Las ramas (salidas) se trazan en el diagrama; expresión vacía = rama sin condición.")
    java.util.List<BranchConditionViewModel> branchConditions = new java.util.ArrayList<>();

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

    /** The condition rows persisted: only exclusive splits, only real branches. */
    private java.util.List<GatewayBranchConditionEntity> conditionsToPersist(
            java.util.List<String> targetIds) {
        var filled = (branchConditions == null ? java.util.List.<BranchConditionViewModel>of() : branchConditions).stream()
                .filter(c -> c.expression != null && !c.expression.isBlank())
                .toList();
        if (filled.isEmpty()) return java.util.List.of();
        if (type != GatewayType.SPLIT || semantics != GatewaySemantics.EXCLUSIVE) {
            throw new IllegalArgumentException("Las condiciones por rama son del split EXCLUSIVO");
        }
        for (var c : filled) {
            if (c.targetId == null || !targetIds.contains(c.targetId)) {
                throw new IllegalArgumentException("Esa rama no sale de este split: " + c.targetId);
            }
        }
        return filled.stream()
                .map(c -> new GatewayBranchConditionEntity(c.targetId, c.expression.trim()))
                .toList();
    }

    @Override
    public String create(HttpRequest httpRequest) {
        validatePair();
        repository.save(new WorkflowGatewayEntity(id, name, type.name(),
                semantics == null ? null : semantics.name(), null, null,
                conditionsToPersist(java.util.List.of()), null));
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
                .branchConditions(conditionsToPersist(current.targetIds()))
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
        // one row per outgoing branch, prefilled with its stored condition
        branchConditions = entity.targetIds().stream()
                .map(t -> new BranchConditionViewModel(t,
                        entity.branchConditions().stream()
                                .filter(c -> t.equals(c.targetId()))
                                .map(GatewayBranchConditionEntity::expression)
                                .findFirst().orElse(null)))
                .collect(java.util.stream.Collectors.toCollection(java.util.ArrayList::new));
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New gateway";
    }
}
