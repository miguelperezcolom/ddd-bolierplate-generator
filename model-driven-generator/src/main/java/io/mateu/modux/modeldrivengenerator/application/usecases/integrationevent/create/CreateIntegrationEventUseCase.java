package io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.IntegrationEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.IntegrationEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateIntegrationEventUseCase {

    final IntegrationEventRepository repository;

    public void handle(CreateIntegrationEventCommand command) {
        var event = IntegrationEvent.of(
                new IntegrationEventId(command.id()),
                new IntegrationEventName(command.name()),
                command.serviceId(),
                command.description(),
                command.sourceDomainEventId(),
                command.payloadModelId(),
                command.topicName(),
                command.partitions(),
                command.retentionMs(),
                command.serializationFormat(),
                command.compressionType(),
                command.deadLetterQueueEnabled(),
                command.deadLetterQueueName(),
                command.maxDeliveryAttempts(),
                command.schemaVersion(),
                command.routingKeyField(),
                command.replayable());
        repository.save(event);
    }

}
