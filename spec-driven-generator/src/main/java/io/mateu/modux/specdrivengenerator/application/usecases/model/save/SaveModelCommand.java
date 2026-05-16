package io.mateu.modux.specdrivengenerator.application.usecases.model.save;

import io.mateu.modux.specdrivengenerator.application.usecases.model.ModelFieldData;
import io.mateu.modux.specdrivengenerator.application.usecases.model.ModelValidationData;

import java.util.List;

public record SaveModelCommand(String id, String name, List<ModelFieldData> fields,
                               List<ModelValidationData> validations) {
}
