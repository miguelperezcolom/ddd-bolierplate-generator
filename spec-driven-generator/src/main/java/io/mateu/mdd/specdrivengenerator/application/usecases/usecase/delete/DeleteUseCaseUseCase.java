package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteUseCaseUseCase {

    final UseCaseRepository repository;

    public void handle(DeleteUseCaseCommand command) {
        repository.deleteAllById(command.ids().stream().map(UseCaseId::new).toList());
    }

}
