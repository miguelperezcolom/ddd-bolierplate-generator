package io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;

/**
 * The coherence verdict for a single {@link io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow}
 * against the declared context map: does the runtime flow's source→target edge have a strategic
 * relationship backing it, and if not, what type would fit its archetype?
 */
public record FlowContextMapFinding(
        String flowId,
        String flowName,
        FlowArchetype archetype,
        String sourceBoundedContextId,
        String targetBoundedContextId,
        Status status,
        /** The declared relation's type when {@link Status#OK} or {@link Status#REVERSED}; else null. */
        ContextMapRelationType declaredType,
        /** The type inferred from the archetype when {@link Status#MISSING_RELATION}; else null. */
        ContextMapRelationType suggestedType,
        String message
) {

    public enum Status {
        /** Cross-context flow backed by a declared source→target relation. */
        OK,
        /** Cross-context flow with no declared relation — {@code suggestedType} proposes one. */
        MISSING_RELATION,
        /** A relation exists but points target→source, opposite to the flow's upstream direction. */
        REVERSED,
        /** Source and target are the same context — no strategic relation needed. */
        INTERNAL,
        /** Archetype targets an external system (NOTIFIES) — outside the context map. */
        EXTERNAL
    }
}
