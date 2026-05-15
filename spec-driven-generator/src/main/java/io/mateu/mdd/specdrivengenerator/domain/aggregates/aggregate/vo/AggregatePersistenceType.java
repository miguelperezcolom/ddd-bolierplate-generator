package io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo;

public enum AggregatePersistenceType {
    JPA,
    MONGODB,
    EVENT_SOURCED,
    IN_MEMORY
}
