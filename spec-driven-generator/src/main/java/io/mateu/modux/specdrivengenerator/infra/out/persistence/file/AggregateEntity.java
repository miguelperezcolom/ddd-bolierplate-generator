package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
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
        List<InvariantEntity> invariants
        ) implements Identifiable {
}
