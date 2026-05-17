package io.mateu.modux.specdrivengenerator.application.usecases.uishell.create;

import java.util.List;

public record CreateUiShellCommand(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds
) {
    public CreateUiShellCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
