package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.UiMenuItemData;

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
