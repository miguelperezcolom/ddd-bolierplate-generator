package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;

/**
 * The structural building blocks derived from a single flow. Any field may be null when the
 * archetype does not produce that piece.
 */
public record FlowExpansion(
        DomainEventEntity domainEvent,
        ModelEntity payloadModel,
        IntegrationEventEntity integrationEvent,
        ReadModelEntity readModel,
        ProjectionEntity projection,
        SubscriptionEntity subscription,
        ModelMappingEntity modelMapping
) {
}
