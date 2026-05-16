package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.HttpMethod;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStep;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UseCaseFileRepository implements UseCaseRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<UseCase> findById(UseCaseId id) {
        return repository.findById(id.id(), UseCaseEntity.class)
                .map(entity -> UseCase.load(
                        entity.id(),
                        entity.name(),
                        entity.exposedAsRest(),
                        entity.exposedAsGrpc(),
                        entity.exposedAsMcp(),
                        entity.exposedAsAsync(),
                        entity.exposedAsUi(),
                        entity.inputModelId(),
                        entity.outputModelId(),
                        toSteps(entity.steps()),
                        entity.allowedRoles(),
                        entity.allowedScopes(),
                        entity.apiVersion(),
                        entity.mcpDescription(),
                        entity.restHttpMethod() != null ? HttpMethod.valueOf(entity.restHttpMethod()) : null,
                        entity.restPath(),
                        entity.asyncRetryCount(),
                        entity.asyncDeadLetterQueue(),
                        entity.asyncOrderingKey(),
                        entity.asyncTopicName(),
                        entity.asyncConsumerGroup(),
                        entity.cacheable(),
                        entity.cacheTtlSeconds(),
                        entity.timeoutMs(),
                        entity.transactionBoundary(),
                        entity.idempotencyEnabled(),
                        entity.idempotencyKeyField(),
                        entity.rateLimitEnabled(),
                        entity.rateLimitRequestsPerSecond(),
                        entity.grpcServiceName(), entity.grpcMethodName()));
    }

    @Override
    public UseCase save(UseCase entity) {
        repository.save(new UseCaseEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getExposedAsRest().value(),
                entity.getExposedAsGrpc().value(),
                entity.getExposedAsMcp().value(),
                entity.getExposedAsAsync().value(),
                entity.getExposedAsUi().value(),
                entity.getInputModelId() != null ? entity.getInputModelId().id() : null,
                entity.getOutputModelId() != null ? entity.getOutputModelId().id() : null,
                toStepEntities(entity.getSteps()),
                entity.getAllowedRoles(),
                entity.getAllowedScopes(),
                entity.getApiVersion() != null ? entity.getApiVersion().version() : null,
                entity.getMcpDescription(),
                entity.getRestHttpMethod() != null ? entity.getRestHttpMethod().name() : null,
                entity.getRestPath(),
                entity.getAsyncRetryCount(),
                entity.getAsyncDeadLetterQueue(),
                entity.getAsyncOrderingKey(),
                entity.getAsyncTopicName(),
                entity.getAsyncConsumerGroup(),
                entity.isCacheable(),
                entity.getCacheTtlSeconds(),
                entity.getTimeoutMs(),
                entity.getTransactionBoundary() != null ? entity.getTransactionBoundary().name() : null,
                entity.isIdempotencyEnabled(),
                entity.getIdempotencyKeyField(),
                entity.isRateLimitEnabled(),
                entity.getRateLimitRequestsPerSecond(),
                entity.getGrpcServiceName(), entity.getGrpcMethodName()));
        return entity;
    }

    @Override
    public void deleteAllById(List<UseCaseId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UseCaseId::id).toList());
    }

    private List<UseCaseStep> toSteps(List<UseCaseStepEntity> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new UseCaseStep(s.id(), s.name(), s.type(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }

    private List<UseCaseStepEntity> toStepEntities(List<UseCaseStep> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new UseCaseStepEntity(s.id(), s.name(), s.type(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }
}
