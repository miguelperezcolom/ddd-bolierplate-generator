package io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.EnumDefinitionRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.EnumDefinitionValue;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.enumdefinition.vo.EnumDefinitionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveEnumDefinitionUseCase {

    final EnumDefinitionRepository repository;

    public void handle(SaveEnumDefinitionCommand command) {
        var enumDef = repository.findById(new EnumDefinitionId(command.id())).orElseThrow();
        enumDef.update(toValues(command.values()));
        repository.save(enumDef);
    }

    private List<EnumDefinitionValue> toValues(List<EnumDefinitionValueData> values) {
        if (values == null) return List.of();
        return values.stream().map(v -> new EnumDefinitionValue(v.id(), v.name())).toList();
    }
}
