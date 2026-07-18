package io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo;

/** What starts an interaction: who (or what) kicks off the message chain. */
public enum InteractionTriggerKind {
    /** A human actor starts the conversation (through a page or directly on a use case). */
    ACTOR,
    /** A published API operation is the entry point. */
    API_OPERATION,
    /** An event (domain or application) starts the chain; triggerRef is the event NAME. */
    EVENT,
    /** A use case is the entry point. */
    USE_CASE
}
