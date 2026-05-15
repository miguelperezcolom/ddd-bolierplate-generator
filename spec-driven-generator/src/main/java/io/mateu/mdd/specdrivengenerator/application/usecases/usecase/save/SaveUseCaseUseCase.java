package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveUseCaseUseCase {

    final UseCaseRepository repository;

    public void handle(SaveUseCaseCommand command) {
        var useCase = repository.findById(new UseCaseId(command.id())).orElseThrow();
        useCase.update(
                new UseCaseName(command.name()),
                new UseCaseExposedAsRest(command.exposedAsRest()),
                new UseCaseExposedAsGrpc(command.exposedAsGrpc()),
                new UseCaseExposedAsMcp(command.exposedAsMcp()),
                new UseCaseExposedAsAsync(command.exposedAsAsync()),
                new UseCaseExposedAsUi(command.exposedAsUi()),
                command.inputModelId() != null ? new UseCaseInputModelId(command.inputModelId()) : null,
                command.outputModelId() != null ? new UseCaseOutputModelId(command.outputModelId()) : null);
        repository.save(useCase);
    }

}
