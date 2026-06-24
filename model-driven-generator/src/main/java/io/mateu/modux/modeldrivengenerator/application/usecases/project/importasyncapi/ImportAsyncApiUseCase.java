package io.mateu.modux.modeldrivengenerator.application.usecases.project.importasyncapi;

import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImportAsyncApiUseCase {

    final CommonFileRepository repository;

    @SneakyThrows
    @SuppressWarnings("unchecked")
    public void handle(ImportAsyncApiCommand command) {
        Map<String, Object> spec = new YAMLMapper().readValue(new File(command.filePath()), Map.class);

        Object channelsObj = spec.get("channels");
        if (!(channelsObj instanceof Map<?, ?> channels)) {
            log.warn("No channels found in AsyncAPI spec at {}", command.filePath());
            return;
        }

        for (Map.Entry<?, ?> entry : channels.entrySet()) {
            String channelKey = (String) entry.getKey();
            Object channelVal = entry.getValue();
            if (!(channelVal instanceof Map<?, ?> channel)) continue;

            if (channel.containsKey("publish")) {
                Object publishObj = channel.get("publish");
                String name = extractName(publishObj, channelKey);

                var existing = repository.findAllOfType(DomainEventEntity.class).stream()
                        .filter(e -> channelKey.equals(e.topicName()))
                        .findFirst();

                DomainEventEntity event;
                if (existing.isPresent()) {
                    DomainEventEntity e = existing.get();
                    event = new DomainEventEntity(
                            e.id(), name, e.modelId(), e.publishAsIntegrationEvent(),
                            e.integrationModelId(), channelKey, e.partitions(), e.retentionMs(),
                            e.serializationFormat(), e.compressionType(), e.deadLetterQueueEnabled(),
                            e.deadLetterQueueName(), e.maxDeliveryAttempts(), e.schemaVersion(),
                            e.routingKeyField(), e.replayable());
                } else {
                    event = new DomainEventEntity(
                            UUID.randomUUID().toString(), name, null, false,
                            null, channelKey, null, null,
                            null, null, false,
                            null, null, null,
                            null, false);
                }
                repository.save(event);
                log.info("Saved domain event '{}' for topic '{}'", name, channelKey);
            }

            if (channel.containsKey("subscribe")) {
                Object subscribeObj = channel.get("subscribe");
                String name = extractName(subscribeObj, channelKey);

                var existing = repository.findAllOfType(SubscriptionEntity.class).stream()
                        .filter(s -> channelKey.equals(s.topicName()))
                        .findFirst();

                SubscriptionEntity subscription;
                if (existing.isPresent()) {
                    SubscriptionEntity s = existing.get();
                    subscription = new SubscriptionEntity(
                            s.id(), name, channelKey, s.sourceService(),
                            s.inputModelId(), channelKey, s.consumerGroup(), s.retryCount(),
                            s.deadLetterTopic(), s.actions(), s.scalingStrategy(),
                            s.filterExpression(), s.batchSize(), s.batchTimeout(),
                            s.offsetResetStrategy(), s.consumerTimeout(),
                            s.idempotencyEnabled(), s.idempotencyKeyField());
                } else {
                    subscription = new SubscriptionEntity(
                            UUID.randomUUID().toString(), name, channelKey, null,
                            null, channelKey, null, null,
                            null, null, null,
                            null, null, null,
                            null, null,
                            true, null);
                }
                repository.save(subscription);
                log.info("Saved subscription '{}' for topic '{}'", name, channelKey);
            }
        }
    }

    @SuppressWarnings("unchecked")
    private String extractName(Object operationObj, String fallback) {
        if (operationObj instanceof Map<?, ?> operation) {
            Object operationId = operation.get("operationId");
            if (operationId instanceof String s && !s.isBlank()) return s;
            Object message = operation.get("message");
            if (message instanceof Map<?, ?> msg) {
                Object msgName = msg.get("name");
                if (msgName instanceof String s && !s.isBlank()) return s;
            }
        }
        return fallback;
    }
}
