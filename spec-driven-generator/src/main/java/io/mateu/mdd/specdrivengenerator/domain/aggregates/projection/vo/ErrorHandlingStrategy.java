package io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo;

public enum ErrorHandlingStrategy {
    SKIP,
    RETRY,
    DEAD_LETTER
}
