package io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.EnumDefinitionRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.enumdefinition.vo.EnumDefinitionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteEnumDefinitionUseCase {

    final EnumDefinitionRepository repository;

    public void handle(DeleteEnumDefinitionCommand command) {
        repository.deleteAllById(command.ids().stream().map(EnumDefinitionId::new).toList());
    }
}
