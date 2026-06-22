package io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo;

public enum ErrorHandlingStrategy {
    SKIP,
    RETRY,
    DEAD_LETTER
}
