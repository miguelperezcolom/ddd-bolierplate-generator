package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.saga;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;

public class SagaStepViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String name;

    SagaStepType type;

    String compensatingStepId;

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

    @io.mateu.uidl.annotations.Help("Tope de ejecuciones EXITOSAS de este paso por instancia (vacío = usa el tope por defecto de la saga).")
    Integer maxSuccessfulExecutions;

}
