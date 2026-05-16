package io.mateu.modux.specdrivengenerator.application.usecases.invariant.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.InvariantRepository;
import io.mateu.modux.specdrivengenerator.application.usecases.invariant.InvariantConditionData;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateInvariantUseCase {

    final InvariantRepository repository;

    public void handle(CreateInvariantCommand command) {
        var invariant = Invariant.of(
                new InvariantId(command.id()),
                new InvariantName(command.name()),
                toConditions(command.conditions()));
        repository.save(invariant);
    }

    private List<InvariantCondition> toConditions(List<InvariantConditionData> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                .toList();
    }
}
