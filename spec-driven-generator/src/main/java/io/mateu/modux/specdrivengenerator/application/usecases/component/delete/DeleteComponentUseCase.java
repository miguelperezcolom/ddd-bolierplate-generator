package io.mateu.modux.specdrivengenerator.application.usecases.component.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ComponentRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteComponentUseCase {

    final ComponentRepository repository;

    public void handle(DeleteComponentCommand command) {
        repository.deleteAllById(command.ids().stream().map(ComponentId::new).toList());
    }
}
