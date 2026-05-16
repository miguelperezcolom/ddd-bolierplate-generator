package io.mateu.modux.specdrivengenerator.application.usecases.invariant.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.InvariantRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
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
