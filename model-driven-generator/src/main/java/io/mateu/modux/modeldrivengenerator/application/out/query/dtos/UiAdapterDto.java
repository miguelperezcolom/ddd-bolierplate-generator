package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;

import java.util.List;

public record UiAdapterDto(
        String id,
        String name,
        String serviceId,
        String title,
        String path,
        UiAppVariant appVariant,
        List<UiMenuItemDto> menuItems
) {
    public UiAdapterDto {
        if (menuItems == null) menuItems = List.of();
    }
}
