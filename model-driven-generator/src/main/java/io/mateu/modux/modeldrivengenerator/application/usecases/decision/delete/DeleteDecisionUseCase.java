package io.mateu.modux.modeldrivengenerator.application.usecases.decision.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DecisionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteDecisionUseCase {

    final DecisionRepository repository;

    public void handle(DeleteDecisionCommand command) {
        repository.deleteAllById(command.ids().stream().map(DecisionId::new).toList());
    }
}
