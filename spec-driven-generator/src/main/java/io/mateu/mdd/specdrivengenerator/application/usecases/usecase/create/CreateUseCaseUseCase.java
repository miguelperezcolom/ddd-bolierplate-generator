package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.UseCaseStepData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.*;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.HttpMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateUseCaseUseCase {

    final UseCaseRepository repository;

    public void handle(CreateUseCaseCommand command) {
        var useCase = UseCase.of(
                new UseCaseId(command.id()),
                new UseCaseName(command.name()),
                new UseCaseExposedAsRest(command.exposedAsRest()),
                new UseCaseExposedAsGrpc(command.exposedAsGrpc()),
                new UseCaseExposedAsMcp(command.exposedAsMcp()),
                new UseCaseExposedAsAsync(command.exposedAsAsync()),
                new UseCaseExposedAsUi(command.exposedAsUi()),
                command.inputModelId() != null ? new UseCaseInputModelId(command.inputModelId()) : null,
                command.outputModelId() != null ? new UseCaseOutputModelId(command.outputModelId()) : null,
                toSteps(command.steps()),
                command.allowedRoles(),
                command.allowedScopes(),
                command.apiVersion() != null ? new UseCaseApiVersion(command.apiVersion()) : null,
                command.mcpDescription(),
                command.restHttpMethod() != null ? HttpMethod.valueOf(command.restHttpMethod()) : null,
                command.restPath(),
                command.asyncRetryCount(),
                command.asyncDeadLetterQueue(),
                command.asyncOrderingKey(),
                command.asyncTopicName(),
                command.asyncConsumerGroup(),
                command.cacheable(),
                command.cacheTtlSeconds(),
                command.timeoutMs());
        repository.save(useCase);
    }

    private List<UseCaseStep> toSteps(List<UseCaseStepData> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new UseCaseStep(s.id(), s.name(), s.type(),
                        s.aggregateId(), s.operationId(),
                        s.gatewayId(), s.gatewayOperationId(),
                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                .toList();
    }

}
