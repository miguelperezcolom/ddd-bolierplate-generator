package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record AggregateEntity(
        String id,
        String name,
        String modelId,
        String persistenceType,
        String idType,
        String tableName,
        String tableSchema,
        boolean optimisticLockingEnabled,
        boolean eventSourcingEnabled,
        Integer snapshotFrequency,
        List<OperationEntity> operations,
        List<InvariantEntity> invariants
        ) implements Identifiable {
}
