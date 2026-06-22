package io.mateu.modux.modeldrivengenerator.application.usecases.role.create;

import java.util.List;

public record CreateRoleCommand(
        String id,
        String name,
        List<String> allowedUseCaseIds
) {
    public CreateRoleCommand {
        if (allowedUseCaseIds == null) allowedUseCaseIds = List.of();
    }
}
