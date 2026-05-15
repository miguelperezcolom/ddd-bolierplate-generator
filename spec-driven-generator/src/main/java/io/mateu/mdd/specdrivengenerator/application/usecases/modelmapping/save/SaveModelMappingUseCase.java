package io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelMappingRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingSourceModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingTargetModelId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveModelMappingUseCase {

    final ModelMappingRepository repository;

    public void handle(SaveModelMappingCommand command) {
        var mapping = repository.findById(new ModelMappingId(command.id())).orElseThrow();
        mapping.update(
                new ModelMappingName(command.name()),
                command.sourceModelId() != null ? new ModelMappingSourceModelId(command.sourceModelId()) : null,
                command.targetModelId() != null ? new ModelMappingTargetModelId(command.targetModelId()) : null);
        repository.save(mapping);
    }
}
