package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold;

import io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold.CrudLifecycleEvents.LifecycleEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;

import java.util.List;

/**
 * The three CRUD use cases every create/update/delete over an aggregate implies —
 * Crear/Actualizar/Eliminar{Agregado} — with their persistence pipeline and the
 * publication of the matching lifecycle domain event already wired. ONE deterministic
 * trio, shared by BOTH relationships that imply it: the actor→aggregate gesture (who may
 * run them) and the UI→aggregate / CRUD-page derivation (the screen that serves them),
 * so the two reinforce the same use cases instead of each minting its own. Ids follow the
 * actor convention (uc-crear{Cap(aggregateId)}), matching the sample models and the
 * generation golden tests. create → save + Creado/a; update → read + save + Modificado/a;
 * delete → delete + Eliminado/a. Pure model→model, unit-testable.
 */
public final class CrudUseCases {

    private CrudUseCases() {}

    /** The create/update/delete trio for {@code aggregate}, pipelines and events wired. */
    public static List<UseCaseEntity> forAggregate(AggregateEntity aggregate) {
        var events = CrudLifecycleEvents.lifecycleOf(aggregate.id(), aggregate.name());
        var aggCap = cap(aggregate.id());
        var nameCap = cap(aggregate.name());
        return List.of(
                crud("uc-crear" + aggCap, "Crear" + nameCap, "create", aggregate, events),
                crud("uc-actualizar" + aggCap, "Actualizar" + nameCap, "update", aggregate, events),
                crud("uc-eliminar" + aggCap, "Eliminar" + nameCap, "delete", aggregate, events));
    }

    /** The deterministic ids of the trio — to allow an actor on them or spot duplicates. */
    public static List<String> idsOf(String aggregateId) {
        var aggCap = cap(aggregateId);
        return List.of("uc-crear" + aggCap, "uc-actualizar" + aggCap, "uc-eliminar" + aggCap);
    }

    private static UseCaseEntity crud(String id, String name, String action,
                                      AggregateEntity aggregate, List<LifecycleEvent> events) {
        var cap = cap(aggregate.name());
        var steps = switch (action) {
            case "create" -> List.of(
                    new UseCaseStepEntity("step-save", "save" + cap, UseCaseStepType.SaveAggregate,
                            aggregate.id(), null, null, null, null, null, null, null, null, null, null),
                    CrudLifecycleEvents.publishStep(events.get(0)));
            case "update" -> List.of(
                    new UseCaseStepEntity("step-read", "read" + cap, UseCaseStepType.ReadAggregate,
                            aggregate.id(), null, null, null, null, null, null, null, null, null, null),
                    new UseCaseStepEntity("step-save", "save" + cap, UseCaseStepType.SaveAggregate,
                            aggregate.id(), null, null, null, null, null, null, null, null, null, null),
                    CrudLifecycleEvents.publishStep(events.get(1)));
            default -> List.of(
                    new UseCaseStepEntity("step-delete", "delete" + cap, UseCaseStepType.Custom,
                            aggregate.id(), null, null, null, null, null, null, null, null,
                            "Elimina el agregado " + cap, null),
                    CrudLifecycleEvents.publishStep(events.get(2)));
        };
        return new UseCaseEntity(id, name,
                false, false, false, false, true,
                "delete".equals(action) ? null : aggregate.modelId(), null,
                steps, List.of(), List.of(),
                null, null, null, null,
                null, null, null, null, null,
                false, null, null,
                null, false, null,
                false, null,
                null, null);
    }

    private static String cap(String s) {
        return s == null || s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
