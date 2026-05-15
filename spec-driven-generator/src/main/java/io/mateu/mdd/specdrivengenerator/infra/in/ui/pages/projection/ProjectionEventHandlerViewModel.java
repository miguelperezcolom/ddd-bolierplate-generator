package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.projection;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;

public class ProjectionEventHandlerViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String name;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    String domainEventId;

    ProjectionEventHandlerType type;

    @Lookup(search = ModelMappingIdOptionsSupplier.class, label = ModelMappingIdLabelSupplier.class)
    String modelMappingId;

}
