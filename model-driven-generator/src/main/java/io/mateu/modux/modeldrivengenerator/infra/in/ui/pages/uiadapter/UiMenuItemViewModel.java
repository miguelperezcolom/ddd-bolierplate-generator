package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uiadapter;

public class UiMenuItemViewModel {

    String label;
    String icon;
    String description;
    String route;

    public UiMenuItemViewModel() {
    }

    public UiMenuItemViewModel(String label, String icon, String description, String route) {
        this.label = label;
        this.icon = icon;
        this.description = description;
        this.route = route;
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
}
