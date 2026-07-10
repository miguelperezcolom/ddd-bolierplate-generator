package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UiAdapterEntity(
        String id,
        String name,
        String serviceId,
        String title,
        String path,
        UiAppVariant appVariant,
        List<UiMenuItemEntity> menuItems,
        /** The app's archetype: regular, orchestrator or master-detail. */
        UiAppType appType,
        /** MASTER_DETAIL: the page rendered as the header (the tabs are its menu pages). */
        String headerPageId,
        /** The page the app opens first. */
        String homePageId
) implements Identifiable {

    /** Backward-compatible constructor (pre-homePageId callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems,
                           UiAppType appType, String headerPageId) {
        this(id, name, serviceId, title, path, appVariant, menuItems, appType, headerPageId, null);
    }

    /** Backward-compatible constructor (pre-appType callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems) {
        this(id, name, serviceId, title, path, appVariant, menuItems, UiAppType.APP, null, null);
    }

    public UiAppType appType() {
        return appType != null ? appType : UiAppType.APP;
    }
}
