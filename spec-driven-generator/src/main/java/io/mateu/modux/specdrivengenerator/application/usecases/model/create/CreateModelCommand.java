package io.mateu.modux.specdrivengenerator.application.usecases.model.create;

import io.mateu.modux.specdrivengenerator.application.usecases.model.ModelFieldData;
import io.mateu.modux.specdrivengenerator.application.usecases.model.ModelValidationData;

import java.util.List;

public record CreateModelCommand(String id, String name, List<ModelFieldData> fields,
                                 List<ModelValidationData> validations) {
}
