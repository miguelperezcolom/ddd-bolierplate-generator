package io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.BoundedContextRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteBoundedContextUseCase {

    final BoundedContextRepository repository;

    public void handle(DeleteBoundedContextCommand command) {
        repository.deleteAllById(command.ids().stream().map(BoundedContextId::new).toList());
    }

}
