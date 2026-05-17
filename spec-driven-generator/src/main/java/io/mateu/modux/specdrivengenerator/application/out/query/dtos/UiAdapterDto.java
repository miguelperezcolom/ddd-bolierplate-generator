package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;

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
