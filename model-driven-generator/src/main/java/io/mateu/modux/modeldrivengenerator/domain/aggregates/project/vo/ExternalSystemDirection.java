package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

/** Direction of the integration with an external system, seen from this project. */
public enum ExternalSystemDirection {
    /** They call us / send us data. */
    INBOUND,
    /** We call them / notify them. */
    OUTBOUND,
    BOTH
}
