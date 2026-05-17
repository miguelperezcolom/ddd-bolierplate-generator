package io.mateu.modux.specdrivengenerator.application.usecases.uishell.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiShellRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteUiShellUseCase {

    final UiShellRepository repository;

    public void handle(DeleteUiShellCommand command) {
        repository.deleteAllById(command.ids().stream().map(UiShellId::new).toList());
    }
}
