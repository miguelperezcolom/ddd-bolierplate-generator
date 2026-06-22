package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.AggregateRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
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
