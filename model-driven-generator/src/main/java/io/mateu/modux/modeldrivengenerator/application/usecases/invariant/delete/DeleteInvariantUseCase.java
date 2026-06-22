package io.mateu.modux.modeldrivengenerator.application.usecases.invariant.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.InvariantRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteInvariantUseCase {

    final InvariantRepository repository;

    public void handle(DeleteInvariantCommand command) {
        repository.deleteAllById(command.ids().stream().map(InvariantId::new).toList());
    }

}
