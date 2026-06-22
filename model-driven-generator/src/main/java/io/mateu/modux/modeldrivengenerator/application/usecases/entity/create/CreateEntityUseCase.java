package io.mateu.modux.modeldrivengenerator.application.usecases.entity.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.EntityRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.Entity;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.vo.EntityId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.vo.EntityName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateEntityUseCase {

    final EntityRepository repository;

    public void handle(CreateEntityCommand command) {
        var entity = Entity.of(new EntityId(command.id()), new EntityName(command.name()),
                command.modelId(), command.parentAggregateId(), command.isCollection());
        repository.save(entity);
    }

}
