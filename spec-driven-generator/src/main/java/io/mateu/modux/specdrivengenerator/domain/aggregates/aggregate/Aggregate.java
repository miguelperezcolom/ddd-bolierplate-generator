package io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateModelId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.Operation;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.DomainEventName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.FieldValueSetting;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationPrecondition;
import lombok.Getter;

import java.util.List;

@Getter
public class Aggregate {

    private AggregateId id;
    private AggregateName name;
    private AggregateModelId modelId;
    private AggregatePersistenceType persistenceType;
    private AggregateIdType idType;
    private String tableName;
    private String tableSchema;
    private boolean optimisticLockingEnabled;
    private boolean eventSourcingEnabled;
    private Integer snapshotFrequency;
    private List<Operation> operations;
    private List<Invariant> invariants;

    public static Aggregate load(String id, String name, String modelId, String persistenceType, String idType, String tableName, String tableSchema, boolean optimisticLockingEnabled, boolean eventSourcingEnabled, Integer snapshotFrequency, List<OperationDto> operations, List<InvariantDto> invariants) {
        var aggregate = new Aggregate();
        aggregate.id = new AggregateId(id);
        aggregate.name = new AggregateName(name);
        aggregate.modelId = modelId != null ? new AggregateModelId(modelId) : null;
        aggregate.persistenceType = persistenceType != null ? AggregatePersistenceType.valueOf(persistenceType) : null;
        aggregate.idType = idType != null ? AggregateIdType.valueOf(idType) : null;
        aggregate.tableName = tableName;
        aggregate.tableSchema = tableSchema;
        aggregate.optimisticLockingEnabled = optimisticLockingEnabled;
        aggregate.eventSourcingEnabled = eventSourcingEnabled;
        aggregate.snapshotFrequency = snapshotFrequency;
        aggregate.operations = operations.stream().map(operation -> Operation.of(
                new OperationId(operation.id()),
                new OperationName(operation.name()),
                operation.inputModelId(),
                operation.outputModelId(),
                operation.preconditions().stream().map(OperationPrecondition::new).toList(),
                operation.sets().stream().map(setting -> new FieldValueSetting(setting.fieldName(), setting.value())).toList(),
                operation.emits().stream().map(DomainEventName::new).toList(),
                operation.type(),
                operation.paginated(),
                operation.defaultPageSize()
        )).toList();
        aggregate.invariants = invariants.stream()
                .map(invariant -> Invariant.of(new InvariantId(invariant.id()),
                        new InvariantName(invariant.name()),
                        invariant.conditions() != null ? invariant.conditions().stream()
                                .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                .toList() : List.of()))
                .toList();
        return aggregate;
    }

    public static Aggregate of(AggregateId id, AggregateName name, AggregateModelId modelId, AggregatePersistenceType persistenceType, AggregateIdType idType, String tableName, String tableSchema, boolean optimisticLockingEnabled, boolean eventSourcingEnabled, Integer snapshotFrequency, List<Operation> operations, List<Invariant> invariants) {
        var aggregate = new Aggregate();
        aggregate.id = id;
        aggregate.name = name;
        aggregate.modelId = modelId;
        aggregate.persistenceType = persistenceType;
        aggregate.idType = idType;
        aggregate.tableName = tableName;
        aggregate.tableSchema = tableSchema;
        aggregate.optimisticLockingEnabled = optimisticLockingEnabled;
        aggregate.eventSourcingEnabled = eventSourcingEnabled;
        aggregate.snapshotFrequency = snapshotFrequency;
        aggregate.operations = operations;
        aggregate.invariants = invariants;
        return aggregate;
    }

    public void update(AggregateName name, AggregateModelId modelId, AggregatePersistenceType persistenceType, AggregateIdType idType, String tableName, String tableSchema, boolean optimisticLockingEnabled, boolean eventSourcingEnabled, Integer snapshotFrequency, List<OperationDto> operations, List<InvariantDto> invariants) {
        this.name = name;
        this.modelId = modelId;
        this.persistenceType = persistenceType;
        this.idType = idType;
        this.tableName = tableName;
        this.tableSchema = tableSchema;
        this.optimisticLockingEnabled = optimisticLockingEnabled;
        this.eventSourcingEnabled = eventSourcingEnabled;
        this.snapshotFrequency = snapshotFrequency;
        this.operations = operations.stream().map(operationDto -> Operation.of(
                new OperationId(operationDto.id()),
                new OperationName(operationDto.name()),
                operationDto.inputModelId(),
                operationDto.outputModelId(),
                operationDto.preconditions() != null ? operationDto.preconditions().stream().map(OperationPrecondition::new).toList() : List.of(),
                operationDto.sets() != null ? operationDto.sets().stream().map(setting -> new FieldValueSetting(setting.fieldName(), setting.value())).toList() : List.of(),
                operationDto.emits() != null ? operationDto.emits().stream().map(DomainEventName::new).toList() : List.of(),
                operationDto.type(),
                operationDto.paginated(),
                operationDto.defaultPageSize()
        )).toList();
        this.invariants = invariants.stream()
                .map(invariant -> Invariant.of(new InvariantId(invariant.id()),
                        new InvariantName(invariant.name()),
                        invariant.conditions() != null ? invariant.conditions().stream()
                                .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                .toList() : List.of()))
                .toList();
    }
}
