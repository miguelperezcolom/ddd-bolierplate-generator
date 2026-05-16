package io.mateu.mdd.specdrivengenerator.application.usecases.subscription.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.SubscriptionRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.subscription.SubscriptionActionData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.ScalingStrategy;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionAction;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveSubscriptionUseCase {

    final SubscriptionRepository repository;

    public void handle(SaveSubscriptionCommand command) {
        var subscription = repository.findById(new SubscriptionId(command.id())).orElseThrow();
        subscription.update(
                new SubscriptionName(command.name()),
                command.eventName(),
                command.sourceService(),
                command.inputModelId(),
                command.topicName(),
                command.consumerGroup(),
                command.retryCount(),
                command.deadLetterTopic(),
                toActions(command.actions()),
                command.scalingStrategy() != null ? ScalingStrategy.valueOf(command.scalingStrategy()) : null,
                command.filterExpression(),
                command.batchSize(), command.batchTimeout(), command.offsetResetStrategy(),
                command.consumerTimeout());
        repository.save(subscription);
    }

    private List<SubscriptionAction> toActions(List<SubscriptionActionData> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new SubscriptionAction(a.id(), a.name(), a.type(),
                        a.useCaseId(), a.sagaId(), a.projectionId(), a.modelMappingId()))
                .toList();
    }
}
