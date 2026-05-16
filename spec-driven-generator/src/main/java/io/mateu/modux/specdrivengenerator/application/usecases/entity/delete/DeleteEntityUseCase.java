package io.mateu.modux.specdrivengenerator.application.usecases.entity.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.EntityRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.entity.vo.EntityId;
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
