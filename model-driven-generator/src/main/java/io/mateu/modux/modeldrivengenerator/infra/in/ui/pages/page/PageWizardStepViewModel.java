package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.PageIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.PageIdOptionsSupplier;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotNull;

public record PageWizardStepViewModel(
        @NotNull @Lookup(search = PageIdOptionsSupplier.class, label = PageIdLabelSupplier.class) String pageId,
        String label
) {
}
