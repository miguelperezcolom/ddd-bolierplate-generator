package io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventIntegrationModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventPublishAsIntegrationEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventSerializationFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveDomainEventUseCase {

    final DomainEventRepository repository;

    public void handle(SaveDomainEventCommand command) {
        var domainEvent = repository.findById(new DomainEventId(command.id())).orElseThrow();
        domainEvent.update(
                new DomainEventName(command.name()),
                command.modelId() != null ? new DomainEventModelId(command.modelId()) : null,
                new DomainEventPublishAsIntegrationEvent(command.publishAsIntegrationEvent()),
                command.integrationModelId() != null ? new DomainEventIntegrationModelId(command.integrationModelId()) : null,
                command.topicName(), command.partitions(), command.retentionMs(),
                command.serializationFormat() != null ? DomainEventSerializationFormat.valueOf(command.serializationFormat()) : null,
                command.compressionType() != null ? DomainEventCompressionType.valueOf(command.compressionType()) : null,
                command.deadLetterQueueEnabled(), command.deadLetterQueueName(),
                command.maxDeliveryAttempts(), command.schemaVersion(), command.routingKeyField(),
                command.replayable());
        repository.save(domainEvent);
    }

}
