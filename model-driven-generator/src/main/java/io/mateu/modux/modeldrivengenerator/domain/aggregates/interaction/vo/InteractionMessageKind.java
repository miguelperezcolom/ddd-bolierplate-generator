package io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo;

/**
 * The kind of a message in an interaction. Maps 1:1 with the mechanisms modux already
 * understands (see docs/design/sequence-scenarios.md): COMMAND rides on CallUseCase steps,
 * wired API operations and button actions; QUERY on CallQueryService steps and listings;
 * EVENT on emits + subscription/flow TRIGGERS; EXTERNAL on CallExternalUseCase steps.
 */
public enum InteractionMessageKind {
    COMMAND,
    QUERY,
    EVENT,
    EXTERNAL
}
