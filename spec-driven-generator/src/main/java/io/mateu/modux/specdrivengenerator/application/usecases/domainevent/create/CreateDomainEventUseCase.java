package io.mateu.modux.specdrivengenerator.application.usecases.domainevent.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.DomainEventRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventIntegrationModelId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventModelId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventPublishAsIntegrationEvent;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventCompressionType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventSerializationFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateDomainEventUseCase {

    final DomainEventRepository repository;

    public void handle(CreateDomainEventCommand command) {
        var domainEvent = DomainEvent.of(
                new DomainEventId(command.id()),
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
