package io.mateu.modux.specdrivengenerator.application.usecases.entity.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.EntityRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.entity.vo.EntityId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.entity.vo.EntityName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveEntityUseCase {

    final EntityRepository repository;

    public void handle(SaveEntityCommand command) {
        var role = repository.findById(new EntityId(command.id())).orElseThrow();
        role.update(new EntityName(command.name()),
                command.modelId(), command.parentAggregateId(), command.isCollection());
        repository.save(role);
    }

}
