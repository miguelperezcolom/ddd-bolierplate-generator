package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uiadapter;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.PageIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.PageIdOptionsSupplier;
import io.mateu.uidl.annotations.Lookup;

public class UiMenuItemViewModel {

    String label;
    String icon;
    String description;
    String route;
    @Lookup(search = PageIdOptionsSupplier.class, label = PageIdLabelSupplier.class)
    String pageId;

    public UiMenuItemViewModel() {
    }

    public UiMenuItemViewModel(String label, String icon, String description, String route, String pageId) {
        this.label = label;
        this.icon = icon;
        this.description = description;
        this.route = route;
        this.pageId = pageId;
    }

    public String label() {
        return label;
    }

    public String icon() {
        return icon;
    }

    public String description() {
        return description;
    }

    public String route() {
        return route;
    }

    public String pageId() {
        return pageId;
    }
}
