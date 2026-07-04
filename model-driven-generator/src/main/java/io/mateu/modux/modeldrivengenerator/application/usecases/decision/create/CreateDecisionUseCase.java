package io.mateu.modux.modeldrivengenerator.application.usecases.decision.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DecisionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.Decision;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateDecisionUseCase {

    final DecisionRepository repository;

    public void handle(CreateDecisionCommand command) {
        repository.save(Decision.of(
                new DecisionId(command.id()),
                new DecisionName(command.name()),
                command.decision(),
                command.rationale(),
                command.status(),
                command.source()));
    }
}
