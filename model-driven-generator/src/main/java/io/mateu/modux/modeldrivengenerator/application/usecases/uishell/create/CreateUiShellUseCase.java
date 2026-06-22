package io.mateu.modux.modeldrivengenerator.application.usecases.uishell.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.UiShellRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.UiShell;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateUiShellUseCase {

    final UiShellRepository repository;

    public void handle(CreateUiShellCommand command) {
        var uiShell = UiShell.of(
                new UiShellId(command.id()),
                new UiShellName(command.name()),
                command.title(),
                command.appVariant(),
                command.serviceIds(),
                command.url(),
                command.deploymentType(),
                command.cdnProvider(),
                command.cdnSiteId(),
                command.bucketProvider(),
                command.bucketName(),
                command.bucketRegion(),
                command.deploymentServiceId(),
                command.designSystem());
        repository.save(uiShell);
    }
}
