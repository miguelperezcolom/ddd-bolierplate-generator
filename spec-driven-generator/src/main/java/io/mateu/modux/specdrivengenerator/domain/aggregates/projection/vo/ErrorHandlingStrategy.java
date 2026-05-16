package io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo;

public enum ErrorHandlingStrategy {
    SKIP,
    RETRY,
    DEAD_LETTER
}
