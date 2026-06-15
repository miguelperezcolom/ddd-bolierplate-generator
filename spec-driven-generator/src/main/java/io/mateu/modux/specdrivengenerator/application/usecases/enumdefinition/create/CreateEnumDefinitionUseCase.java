package io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.EnumDefinitionRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.enumdefinition.EnumDefinition;
import io.mateu.modux.specdrivengenerator.domain.aggregates.enumdefinition.EnumDefinitionValue;
import io.mateu.modux.specdrivengenerator.domain.aggregates.enumdefinition.vo.EnumDefinitionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateEnumDefinitionUseCase {

    final EnumDefinitionRepository repository;

    public void handle(CreateEnumDefinitionCommand command) {
        var values = toValues(command.values());
        var enumDef = EnumDefinition.of(new EnumDefinitionId(command.id()), values);
        repository.save(enumDef);
    }

    private List<EnumDefinitionValue> toValues(List<io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData> values) {
        if (values == null) return List.of();
        return values.stream().map(v -> new EnumDefinitionValue(v.id(), v.name())).toList();
    }
}
