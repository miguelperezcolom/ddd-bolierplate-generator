package io.mateu.modux.specdrivengenerator.application.usecases.uishell.save;

import java.util.List;

public record SaveUiShellCommand(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds
) {
    public SaveUiShellCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
