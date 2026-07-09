package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.uidl.annotations.Lookup;

public class PageButtonViewModel {

    String label;
    String icon;
    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;
    String actionId;
    @Lookup(search = ModelMappingIdOptionsSupplier.class, label = ModelMappingIdLabelSupplier.class)
    String mappingId;

    public PageButtonViewModel() {
    }

    public PageButtonViewModel(String label, String icon, String useCaseId, String actionId, String mappingId) {
        this.mappingId = mappingId;
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

    public String mappingId() {
        return mappingId;
    }
}
