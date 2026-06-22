package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record AggregateEntity(
        String id,
        String name,
        String modelId,
        AggregatePersistenceType persistenceType,
        AggregateIdType idType,
        String tableName,
        String tableSchema,
        boolean optimisticLockingEnabled,
        boolean eventSourcingEnabled,
        Integer snapshotFrequency,
        List<OperationEntity> operations,
        List<InvariantEntity> invariants,
        List<String> valueObjectIds
        ) implements Identifiable {

    @Override
    public List<OperationEntity> operations() {
        return operations != null ? operations : List.of();
    }

    @Override
    public List<InvariantEntity> invariants() {
        return invariants != null ? invariants : List.of();
    }

    @Override
    public List<String> valueObjectIds() {
        return valueObjectIds != null ? valueObjectIds : List.of();
    }
}
