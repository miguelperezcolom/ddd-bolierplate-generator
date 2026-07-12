package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;

/** One button of the group: its label and the use case (or policy) it fires. */
public class GroupButtonViewModel {

    @Hidden
    String itemId;

    String label;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;

    public GroupButtonViewModel() {
    }

    public GroupButtonViewModel(String itemId, String label, String useCaseId) {
        this.itemId = itemId;
        this.label = label;
        this.useCaseId = useCaseId;
    }
}
