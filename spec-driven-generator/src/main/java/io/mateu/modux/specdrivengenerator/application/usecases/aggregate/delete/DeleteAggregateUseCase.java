package io.mateu.modux.specdrivengenerator.application.usecases.aggregate.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.AggregateRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteAggregateUseCase {

    final AggregateRepository repository;

    public void handle(DeleteAggregateCommand command) {
        repository.deleteAllById(command.ids().stream().map(AggregateId::new).toList());
    }

}
