package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UiAdapterEntity(
        String id,
        String name,
        String serviceId,
        String title,
        String path,
        UiAppVariant appVariant,
        List<UiMenuItemEntity> menuItems
) implements Identifiable {
}
