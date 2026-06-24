package io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo;

/**
 * High-level intent archetype of a flow. Each archetype desugars into a known set of
 * structural building blocks (see the flows RFC).
 */
public enum FlowArchetype {
    /** Event in source context materializes a read model in the target context (projection). */
    MATERIALIZES,
    /** Event in source context triggers a use case in the target context (choreography). */
    TRIGGERS,
    /** Event notifies an external system through a gateway/outbound adapter. */
    NOTIFIES,
    /** Multi-step process with compensation (saga). */
    ORCHESTRATES
}
