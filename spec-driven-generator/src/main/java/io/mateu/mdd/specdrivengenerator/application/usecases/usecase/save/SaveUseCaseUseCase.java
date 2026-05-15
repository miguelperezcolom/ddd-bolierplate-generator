package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveUseCaseUseCase {

    final UseCaseRepository repository;

    public void handle(SaveUseCaseCommand command) {
        var useCase = repository.findById(new UseCaseId(command.id())).orElseThrow();
        useCase.update(new UseCaseName(command.name()));
        repository.save(useCase);
    }

}
