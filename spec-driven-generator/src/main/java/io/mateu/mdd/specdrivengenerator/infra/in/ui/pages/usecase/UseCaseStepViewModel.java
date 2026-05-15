package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;

public class UseCaseStepViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String name;

    UseCaseStepType type;

    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    String aggregateId;

    String operationId;

    @Lookup(search = GatewayIdOptionsSupplier.class, label = GatewayIdLabelSupplier.class)
    String gatewayId;

    String gatewayOperationId;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    String domainEventId;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;

    @Lookup(search = ModelMappingIdOptionsSupplier.class, label = ModelMappingIdLabelSupplier.class)
    String modelMappingId;

}
