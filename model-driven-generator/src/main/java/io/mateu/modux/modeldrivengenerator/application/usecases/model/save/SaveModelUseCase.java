package io.mateu.modux.modeldrivengenerator.application.usecases.model.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.ModelFieldValidationData;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.ModelValidationData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveModelUseCase {

    final ModelRepository repository;

    public void handle(SaveModelCommand command) {
        var model = repository.findById(new ModelId(command.id())).orElseThrow();
        var fields = command.fields() == null ? List.<ModelField>of() :
                command.fields().stream()
                        .map(f -> new ModelField(f.id(), f.name(), f.basicType(), f.type(), f.modelId(),
                                f.isEnum(), f.enumId(), toFieldValidations(f.validations())))
                        .toList();
        var validations = toValidations(command.validations());
        model.update(new ModelName(command.name()), fields, validations);
        repository.save(model);
    }

    private List<ModelFieldValidation> toFieldValidations(List<ModelFieldValidationData> validations) {
        if (validations == null) return List.of();
        return validations.stream()
                .map(v -> new ModelFieldValidation(v.id(), v.type(), v.params()))
                .toList();
    }

    private List<ModelValidation> toValidations(List<ModelValidationData> validations) {
        if (validations == null) return List.of();
        return validations.stream()
                .map(v -> new ModelValidation(v.id(), v.condition(), v.fieldIds(), v.message()))
                .toList();
    }

}
