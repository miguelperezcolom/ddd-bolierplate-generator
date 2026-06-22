package io.mateu.modux.modeldrivengenerator.application.usecases.module.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModuleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteModuleUseCase {

    final ModuleRepository repository;

    public void handle(DeleteModuleCommand command) {
        repository.deleteAllById(command.ids().stream().map(ModuleId::new).toList());
    }

}
