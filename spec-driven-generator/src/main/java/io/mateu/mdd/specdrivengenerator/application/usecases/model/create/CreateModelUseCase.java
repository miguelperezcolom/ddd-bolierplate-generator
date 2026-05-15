package io.mateu.mdd.specdrivengenerator.application.usecases.model.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelFieldValidationData;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelValidationData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidation;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateModelUseCase {

    final ModelRepository repository;

    public void handle(CreateModelCommand command) {
        var fields = command.fields() == null ? List.<ModelField>of() :
                command.fields().stream()
                        .map(f -> new ModelField(f.id(), f.name(), f.basicType(), f.type(), f.modelId(),
                                toFieldValidations(f.validations())))
                        .toList();
        var validations = toValidations(command.validations());
        var model = Model.of(
                new ModelId(command.id()),
                new ModelName(command.name()),
                fields, validations);
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
