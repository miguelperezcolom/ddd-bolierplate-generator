package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record DomainEventEntity(
        String id,
        String name,
        String modelId,
        boolean publishAsIntegrationEvent,
        String integrationModelId,
        String topicName,
        Integer partitions,
        Long retentionMs
) implements Identifiable {
}
