package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                new UseCaseExposedAsUi(command.exposedAsUi()));
        repository.save(useCase);
    }

}
