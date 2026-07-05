package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

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
        String intent
) implements Identifiable {

    /** Backward-compatible constructor (pre-intent callers and stores). */
    public OperationEntity(String id, String name, String inputModelId, String outputModelId,
                           String preconditions, String sets, String emits, String type,
                           boolean paginated, Integer defaultPageSize) {
        this(id, name, inputModelId, outputModelId, preconditions, sets, emits, type,
                paginated, defaultPageSize, null);
    }
}
