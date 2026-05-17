package io.mateu.modux.specdrivengenerator.application.usecases.uishell.save;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiShellRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveUiShellUseCase {

    final UiShellRepository repository;

    public void handle(SaveUiShellCommand command) {
        var uiShell = repository.findById(new UiShellId(command.id())).orElseThrow();
        uiShell.update(
                new UiShellName(command.name()),
                command.title(),
                command.appVariant());
        repository.save(uiShell);
    }
}
