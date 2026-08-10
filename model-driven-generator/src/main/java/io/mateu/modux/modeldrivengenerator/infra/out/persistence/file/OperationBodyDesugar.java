package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import java.util.ArrayList;
import java.util.List;

/**
 * Bridges the legacy free-text operation body ({@code preconditions}/{@code sets}/{@code emits})
 * to the modeled {@code steps} pipeline of {@code docs/design/operation-body.md} (§7, migration).
 *
 * <p>Pure and non-destructive: it derives the effective step list without mutating the store. An
 * operation that already carries {@code steps} is returned untouched (the modeled body wins); one
 * that only has the legacy strings is desugared on the fly — {@code preconditions} →
 * {@code CheckPrecondition}, {@code sets} → {@code SetField}, {@code emits} →
 * {@code PublishDomainEvent}. Wiring this into load or generation is a later phase; here it is the
 * migration <em>logic</em>, proven in isolation.
 *
 * <p>The legacy fields are free text, so splitting is best-effort: each is broken on line breaks,
 * semicolons and commas, trimmed, blanks dropped. Emitted-event tokens are left unresolved
 * ({@code domainEventId == null}); linking them to a real event by id, and reporting the dangling
 * ones, is a catalog-aware concern for the linter (§6) — this class has no catalog.
 */
public final class OperationBodyDesugar {

    private OperationBodyDesugar() {}

    /** True when the operation already carries a modeled body; the legacy fields are then ignored. */
    public static boolean hasModeledBody(OperationEntity op) {
        return op.steps() != null && !op.steps().isEmpty();
    }

    /**
     * The effective steps of an operation: its modeled {@code steps} if present, else the
     * desugaring of its legacy {@code preconditions}/{@code sets}/{@code emits}.
     */
    public static List<OperationStepEntity> effectiveSteps(OperationEntity op) {
        if (hasModeledBody(op)) {
            return op.steps();
        }
        var opId = op.id() == null ? "op" : op.id();
        var steps = new ArrayList<OperationStepEntity>();
        var i = new int[] {0};
        for (var precondition : split(op.preconditions())) {
            steps.add(guard(opId + "-pre-" + (++i[0]), precondition));
        }
        i[0] = 0;
        for (var field : split(op.sets())) {
            steps.add(setField(opId + "-set-" + (++i[0]), field));
        }
        i[0] = 0;
        for (var event : split(op.emits())) {
            steps.add(publish(opId + "-emit-" + (++i[0]), event));
        }
        return steps;
    }

    private static OperationStepEntity guard(String id, String condition) {
        return step(id, condition, UseCaseStepType.CheckPrecondition, condition, null, null);
    }

    private static OperationStepEntity setField(String id, String field) {
        return step(id, field, UseCaseStepType.SetField, null, field, null);
    }

    /** Emitted event: name kept, but left unresolved to an id (a catalog-aware linter step). */
    private static OperationStepEntity publish(String id, String event) {
        return step(id, event, UseCaseStepType.PublishDomainEvent, null, null, event);
    }

    private static OperationStepEntity step(String id, String name, UseCaseStepType type,
            String condition, String fieldName, String intent) {
        return new OperationStepEntity(id, name, type,
                null, null, null, null, null, null, null, null, null, null, null, null, null,
                fieldName, condition, null, null, null, null, null, intent);
    }

    /** Break a free-text legacy field on line breaks, semicolons and commas; trim; drop blanks. */
    private static List<String> split(String raw) {
        var out = new ArrayList<String>();
        if (raw == null || raw.isBlank()) {
            return out;
        }
        for (var token : raw.split("[\\r\\n;,]+")) {
            var trimmed = token.trim();
            if (!trimmed.isEmpty()) {
                out.add(trimmed);
            }
        }
        return out;
    }
}
