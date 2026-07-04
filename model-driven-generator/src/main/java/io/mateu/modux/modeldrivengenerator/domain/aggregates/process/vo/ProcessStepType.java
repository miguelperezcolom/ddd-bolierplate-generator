package io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo;

/** Nature of a business-process step: executed by the system, or waiting on a person. */
public enum ProcessStepType {
    /** The system runs a use case (optionally with compensation). */
    AUTOMATED,
    /** A person must act: a task lands on the role's worklist, with an optional deadline. */
    HUMAN
}
