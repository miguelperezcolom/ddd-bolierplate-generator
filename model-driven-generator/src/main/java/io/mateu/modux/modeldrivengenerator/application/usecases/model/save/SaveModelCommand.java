package io.mateu.modux.modeldrivengenerator.application.usecases.model.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.ModelFieldData;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.ModelValidationData;

import java.util.List;

public record SaveModelCommand(String id, String name, List<ModelFieldData> fields,
                               List<ModelValidationData> validations) {
}
