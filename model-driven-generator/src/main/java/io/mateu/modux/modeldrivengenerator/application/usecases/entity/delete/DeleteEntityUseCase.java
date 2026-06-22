package io.mateu.modux.modeldrivengenerator.application.usecases.entity.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.EntityRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.vo.EntityId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteEntityUseCase {

    final EntityRepository repository;

    public void handle(DeleteEntityCommand command) {
        repository.deleteAllById(command.ids().stream().map(EntityId::new).toList());
    }

}
