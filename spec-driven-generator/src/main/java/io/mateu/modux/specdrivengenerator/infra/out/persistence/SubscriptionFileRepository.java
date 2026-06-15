package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.SubscriptionRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.Subscription;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.SubscriptionActionEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionFileRepository implements SubscriptionRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Subscription> findById(SubscriptionId id) {
        return repository.findById(id.id(), SubscriptionEntity.class)
                .map(entity -> Subscription.load(
                        entity.id(),
                        entity.name(),
                        entity.eventName(),
                        entity.sourceService(),
                        entity.inputModelId(),
                        entity.topicName(),
                        entity.consumerGroup(),
                        entity.retryCount(),
                        entity.deadLetterTopic(),
                        toActions(entity.actions()),
                        entity.scalingStrategy(),
                        entity.filterExpression(),
                        entity.batchSize(), entity.batchTimeout(), entity.offsetResetStrategy(),
                        entity.consumerTimeout()));
    }

    @Override
    public Subscription save(Subscription entity) {
        repository.save(new SubscriptionEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getEventName(),
                entity.getSourceService(),
                entity.getInputModelId(),
                entity.getTopicName(),
                entity.getConsumerGroup(),
                entity.getRetryCount(),
                entity.getDeadLetterTopic(),
                toActionEntities(entity.getActions()),
                entity.getScalingStrategy() != null ? entity.getScalingStrategy().name() : null,
                entity.getFilterExpression(),
                entity.getBatchSize(), entity.getBatchTimeout(), entity.getOffsetResetStrategy(),
                entity.getConsumerTimeout()));
        return entity;
    }

    @Override
    public void deleteAllById(List<SubscriptionId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(SubscriptionId::id).toList(), SubscriptionEntity.class);
    }

    private List<SubscriptionAction> toActions(List<SubscriptionActionEntity> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new SubscriptionAction(a.id(), a.name(), a.type(),
                        a.useCaseId(), a.sagaId(), a.projectionId(), a.modelMappingId()))
                .toList();
    }

    private List<SubscriptionActionEntity> toActionEntities(List<SubscriptionAction> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new SubscriptionActionEntity(a.id(), a.name(), a.type(),
                        a.useCaseId(), a.sagaId(), a.projectionId(), a.modelMappingId()))
                .toList();
    }
}
