package io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo;

public enum AggregatePersistenceType {
    JPA,
    MONGODB,
    EVENT_SOURCED,
    IN_MEMORY
}
