package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

@Builder(toBuilder = true)
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
        /** The page the app opens first (exclusive with homeAppId). */
        String homePageId,
        /** The APP it opens first — an app is just another UI component, like a page. */
        String homeAppId,
        /** The app's viewmodel: the state an ORCHESTRATOR keeps, shared with its pages. */
        String modelId,
        /** VIEW_EDITOR: the read-only detail view. */
        String viewPageId,
        /** VIEW_EDITOR: the edit view. */
        String editPageId
) implements Identifiable {

    /** Backward-compatible constructor (pre-viewPageId callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems,
                           UiAppType appType, String headerPageId, String homePageId,
                           String homeAppId, String modelId) {
        this(id, name, serviceId, title, path, appVariant, menuItems, appType, headerPageId,
                homePageId, homeAppId, modelId, null, null);
    }

    /** Backward-compatible constructor (pre-modelId callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems,
                           UiAppType appType, String headerPageId, String homePageId, String homeAppId) {
        this(id, name, serviceId, title, path, appVariant, menuItems, appType, headerPageId,
                homePageId, homeAppId, null);
    }

    /** Backward-compatible constructor (pre-homeAppId callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems,
                           UiAppType appType, String headerPageId, String homePageId) {
        this(id, name, serviceId, title, path, appVariant, menuItems, appType, headerPageId,
                homePageId, null, null);
    }

    /** Backward-compatible constructor (pre-homePageId callers and stores). */
    public UiAdapterEntity(String id, String name, String serviceId, String title,
                           String path, UiAppVariant appVariant, List<UiMenuItemEntity> menuItems,
                           UiAppType appType, String headerPageId) {
        this(id, name, serviceId, title, path, appVariant, menuItems, appType, headerPageId,
                null, null);
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
