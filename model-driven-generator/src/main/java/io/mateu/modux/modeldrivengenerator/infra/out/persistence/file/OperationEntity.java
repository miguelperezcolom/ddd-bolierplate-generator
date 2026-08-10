package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;
import java.util.List;

public record OperationEntity(
        String id,
        String name,
        String inputModelId,
        String outputModelId,
        String preconditions,
        String sets,
        String emits,
        String type,
        boolean paginated,
        Integer defaultPageSize,
        /**
         * CUSTOM operations: what the operation does, in natural language. The spec of the
         * two-zone hook — travels into the generated scaffold as javadoc, and
         * {@code mvn modux:ai-complete} proposes an implementation from it.
         */
        String intent,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description,
        /**
         * The modeled body: an ordered pipeline of steps (see {@code docs/design/operation-body.md}).
         * When present, generation emits it as the operation's real body instead of a throwing stub;
         * the legacy {@code preconditions}/{@code sets}/{@code emits} strings desugar into it. Empty
         * for operations still authored the old way — {@link OperationBodyDesugar} bridges them.
         */
        List<OperationStepEntity> steps
) implements Identifiable {

    /** Backward-compatible constructor (pre-steps callers and stores). */
    public OperationEntity(String id, String name, String inputModelId, String outputModelId,
            String preconditions, String sets, String emits, String type, boolean paginated,
            Integer defaultPageSize, String intent, String description) {
        this(id, name, inputModelId, outputModelId, preconditions, sets, emits, type, paginated,
                defaultPageSize, intent, description, null);
    }

    /** Backward-compatible constructor (pre-description callers). */
    public OperationEntity(String id, String name, String inputModelId, String outputModelId,
            String preconditions, String sets, String emits, String type, boolean paginated,
            Integer defaultPageSize, String intent) {
        this(id, name, inputModelId, outputModelId, preconditions, sets, emits, type, paginated,
                defaultPageSize, intent, null);
    }

    /** Backward-compatible constructor (pre-intent callers and stores). */
    public OperationEntity(String id, String name, String inputModelId, String outputModelId,
                           String preconditions, String sets, String emits, String type,
                           boolean paginated, Integer defaultPageSize) {
        this(id, name, inputModelId, outputModelId, preconditions, sets, emits, type,
                paginated, defaultPageSize, null);
    }
}
