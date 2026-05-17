package io.mateu.modux.specdrivengenerator.application.usecases.uishell.save;

public record SaveUiShellCommand(
        String id,
        String name,
        String title,
        String appVariant
) {
}
