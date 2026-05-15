package io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.AggregateRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateIdType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregatePersistenceType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveAggregateUseCase {

    final AggregateRepository repository;

    public void handle(SaveAggregateCommand command) {
        var aggregate = repository.findById(new AggregateId(command.id())).orElseThrow();
        aggregate.update(
                new AggregateName(command.name()),
                command.modelId() != null ? new AggregateModelId(command.modelId()) : null,
                command.persistenceType() != null ? AggregatePersistenceType.valueOf(command.persistenceType()) : null,
                command.idType() != null ? AggregateIdType.valueOf(command.idType()) : null,
                command.operations(),
                command.invariants()
        );
        repository.save(aggregate);
    }

}
