package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

public class ContextMapRelationViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    String sourceBoundedContextId;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    String targetBoundedContextId;

    ContextMapRelationType type;

    String description;

}
