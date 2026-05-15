package io.mateu.mdd.specdrivengenerator.application.usecases.role.save;

import java.util.List;

public record SaveRoleCommand(
        String id,
        String name,
        List<String> allowedUseCaseIds,
        List<String> allowedReadModelIds
) {
    public SaveRoleCommand {
        if (allowedUseCaseIds == null) allowedUseCaseIds = List.of();
        if (allowedReadModelIds == null) allowedReadModelIds = List.of();
    }
}
