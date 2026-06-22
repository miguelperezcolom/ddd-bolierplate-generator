package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.UiMenuItemData;

import java.util.List;

public record SaveUiAdapterCommand(
        String id,
        String name,
        String serviceId,
        String title,
        String path,
        UiAppVariant appVariant,
        List<UiMenuItemData> menuItems
) {
    public SaveUiAdapterCommand {
        if (menuItems == null) menuItems = List.of();
    }
}
