package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.subscription;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelMappingIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ProjectionIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ProjectionIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.SagaIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.SagaIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;

public class SubscriptionActionViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String name;

    SubscriptionActionType type;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;

    @Lookup(search = SagaIdOptionsSupplier.class, label = SagaIdLabelSupplier.class)
    String sagaId;

    @Lookup(search = ProjectionIdOptionsSupplier.class, label = ProjectionIdLabelSupplier.class)
    String projectionId;

    @Lookup(search = ModelMappingIdOptionsSupplier.class, label = ModelMappingIdLabelSupplier.class)
    String modelMappingId;

}
