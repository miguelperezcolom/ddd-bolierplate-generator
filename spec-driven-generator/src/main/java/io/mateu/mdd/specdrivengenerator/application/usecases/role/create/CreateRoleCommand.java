package io.mateu.mdd.specdrivengenerator.application.usecases.role.create;

import java.util.List;

public record CreateRoleCommand(
        String id,
        String name,
        List<String> allowedUseCaseIds,
        List<String> allowedReadModelIds
) {
    public CreateRoleCommand {
        if (allowedUseCaseIds == null) allowedUseCaseIds = List.of();
        if (allowedReadModelIds == null) allowedReadModelIds = List.of();
    }
}
