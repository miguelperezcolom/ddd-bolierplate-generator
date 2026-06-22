package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryCardinality;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

public class QueryOperationViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String inputModelId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String outputModelId;

    QueryCardinality cardinality;

}
