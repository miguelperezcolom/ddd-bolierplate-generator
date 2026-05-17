package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.Lookup;

public class PageButtonViewModel {

    String label;
    String icon;
    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;
    String actionId;

    public PageButtonViewModel() {
    }

    public PageButtonViewModel(String label, String icon, String useCaseId, String actionId) {
        this.label = label;
        this.icon = icon;
        this.useCaseId = useCaseId;
        this.actionId = actionId;
    }

    public String label() {
        return label;
    }

    public String icon() {
        return icon;
    }

    public String useCaseId() {
        return useCaseId;
    }

    public String actionId() {
        return actionId;
    }
}
