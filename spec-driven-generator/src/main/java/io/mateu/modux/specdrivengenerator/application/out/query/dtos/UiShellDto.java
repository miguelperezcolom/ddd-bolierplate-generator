package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record UiShellDto(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds
) {
    public UiShellDto {
        if (serviceIds == null) serviceIds = List.of();
    }
}
