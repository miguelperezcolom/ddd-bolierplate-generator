package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record RoleDto(
        String id,
        String name,
        List<String> allowedUseCaseIds
) {
    public RoleDto {
        if (allowedUseCaseIds == null) allowedUseCaseIds = List.of();
    }
}
