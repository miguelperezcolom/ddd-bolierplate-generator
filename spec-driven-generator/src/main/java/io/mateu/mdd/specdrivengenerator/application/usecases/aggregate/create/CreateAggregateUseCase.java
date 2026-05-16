package io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.AggregateRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.Aggregate;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.Operation;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.DomainEventName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.FieldValueSetting;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationPrecondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateAggregateUseCase {

    final AggregateRepository repository;

    public void handle(CreateAggregateCommand command) {
        var aggregate = Aggregate.of(
                new AggregateId(command.id()),
                new AggregateName(command.name()),
                command.modelId() != null ? new AggregateModelId(command.modelId()) : null,
                command.persistenceType() != null ? AggregatePersistenceType.valueOf(command.persistenceType()) : null,
                command.idType() != null ? AggregateIdType.valueOf(command.idType()) : null,
                command.tableName(),
                command.tableSchema(),
                command.optimisticLockingEnabled(),
                command.eventSourcingEnabled(),
                command.snapshotFrequency(),
                command.operations().stream()
                        .map(operation -> Operation.of(
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
                        )).toList(),
                command.invariants().stream()
                        .map(invariant -> Invariant.of(new InvariantId(invariant.id()),
                                new InvariantName(invariant.name())))
                        .toList()
        );
        repository.save(aggregate);
    }

}
