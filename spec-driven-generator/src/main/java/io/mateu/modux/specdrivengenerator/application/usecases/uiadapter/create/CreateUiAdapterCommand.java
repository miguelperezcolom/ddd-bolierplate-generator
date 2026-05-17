package io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.modux.specdrivengenerator.application.usecases.uiadapter.UiMenuItemData;

import java.util.List;

public record CreateUiAdapterCommand(
        String id,
        String name,
        String serviceId,
        String title,
        String path,
        UiAppVariant appVariant,
        List<UiMenuItemData> menuItems
) {
    public CreateUiAdapterCommand {
        if (menuItems == null) menuItems = List.of();
    }
}
