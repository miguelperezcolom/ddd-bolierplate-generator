package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;

import java.util.List;

/**
 * The structural pieces derived from all flows that are NOT already declared by hand — ready to
 * be merged into the model the code generator consumes.
 */
public record FlowDerivedModel(
        List<DomainEventEntity> domainEvents,
        List<ModelEntity> models,
        List<IntegrationEventEntity> integrationEvents,
        List<ReadModelEntity> readModels,
        List<ProjectionEntity> projections,
        List<SubscriptionEntity> subscriptions,
        List<ModelMappingEntity> modelMappings,
        List<SagaEntity> sagas
) {
    public boolean isEmpty() {
        return domainEvents.isEmpty() && models.isEmpty() && integrationEvents.isEmpty()
                && readModels.isEmpty() && projections.isEmpty() && subscriptions.isEmpty()
                && modelMappings.isEmpty() && sagas.isEmpty();
    }
}
