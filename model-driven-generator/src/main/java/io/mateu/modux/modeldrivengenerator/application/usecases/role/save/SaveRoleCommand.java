package io.mateu.modux.modeldrivengenerator.application.usecases.role.save;

import java.util.List;

public record SaveRoleCommand(
        String id,
        String name,
        List<String> allowedUseCaseIds
) {
    public SaveRoleCommand {
        if (allowedUseCaseIds == null) allowedUseCaseIds = List.of();
    }
}
