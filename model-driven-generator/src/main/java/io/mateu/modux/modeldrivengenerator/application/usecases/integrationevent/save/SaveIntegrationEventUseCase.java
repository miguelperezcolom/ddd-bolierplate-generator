package io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.IntegrationEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveIntegrationEventUseCase {

    final IntegrationEventRepository repository;

    public void handle(SaveIntegrationEventCommand command) {
        var event = repository.findById(new IntegrationEventId(command.id())).orElseThrow();
        event.update(
                new IntegrationEventName(command.name()),
                command.boundedContextId(),
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
