package io.mateu.modux.modeldrivengenerator.application.usecases.decision.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DecisionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveDecisionUseCase {

    final DecisionRepository repository;

    public void handle(SaveDecisionCommand command) {
        var decision = repository.findById(new DecisionId(command.id())).orElseThrow();
        decision.update(
                new DecisionName(command.name()),
                command.decision(),
                command.rationale(),
                command.status(),
                command.source());
        repository.save(decision);
    }
}
