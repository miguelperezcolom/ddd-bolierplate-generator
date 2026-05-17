package io.mateu.modux.specdrivengenerator.application.usecases.uishell.create;

public record CreateUiShellCommand(
        String id,
        String name,
        String title,
        String appVariant
) {
}
