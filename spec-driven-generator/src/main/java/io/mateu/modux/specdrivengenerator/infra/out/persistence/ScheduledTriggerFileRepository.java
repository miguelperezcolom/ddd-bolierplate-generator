package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ScheduledTriggerRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.ScheduledTrigger;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduledTriggerFileRepository implements ScheduledTriggerRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<ScheduledTrigger> findById(ScheduledTriggerId id) {
        return repository.findById(id.id(), ScheduledTriggerEntity.class)
                .map(entity -> ScheduledTrigger.load(
                        entity.id(),
                        entity.name(),
                        entity.cronExpression(),
                        entity.timezone(),
                        entity.useCaseId(),
                        entity.modelMappingId(),
                        entity.description(),
                        entity.executionEnvironment(),
                        entity.lockProvider(),
                        entity.maxExecutionTimeMs(),
                        entity.failureNotificationEmail(),
                        entity.misfirePolicy(),
                        entity.allowConcurrentExecution(),
                        entity.retryOnFailure(), entity.retryCount()));
    }

    @Override
    public ScheduledTrigger save(ScheduledTrigger entity) {
        repository.save(new ScheduledTriggerEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getCronExpression(),
                entity.getTimezone(),
                entity.getUseCaseId(),
                entity.getModelMappingId(),
                entity.getDescription(),
                entity.getExecutionEnvironment() != null ? entity.getExecutionEnvironment().name() : null,
                entity.getLockProvider(),
                entity.getMaxExecutionTimeMs(),
                entity.getFailureNotificationEmail(),
                entity.getMisfirePolicy() != null ? entity.getMisfirePolicy().name() : null,
                entity.isAllowConcurrentExecution(),
                entity.isRetryOnFailure(), entity.getRetryCount()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ScheduledTriggerId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ScheduledTriggerId::id).toList());
    }
}
