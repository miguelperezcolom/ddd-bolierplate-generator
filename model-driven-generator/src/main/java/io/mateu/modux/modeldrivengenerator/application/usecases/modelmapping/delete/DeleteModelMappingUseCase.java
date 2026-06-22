package io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModelMappingRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteModelMappingUseCase {

    final ModelMappingRepository repository;

    public void handle(DeleteModelMappingCommand command) {
        repository.deleteAllById(command.selectedIds().stream().map(ModelMappingId::new).toList());
    }
}
