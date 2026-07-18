package io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo;

/**
 * The resolved type of an interaction participant (a lifeline). Participants are not declared
 * apart: they are derived from the messages' refs, resolved against the catalog. UNKNOWN marks
 * a dangling ref — still painted, flagged by the linter.
 */
public enum InteractionParticipantType {
    ACTOR,
    APP,
    PAGE,
    USE_CASE,
    AGGREGATE,
    DOMAIN_SERVICE,
    QUERY_SERVICE,
    READ_MODEL,
    EXTERNAL_SYSTEM,
    API,
    API_OPERATION,
    AI_AGENT,
    PROCESS,
    WORKFLOW,
    UNKNOWN
}
