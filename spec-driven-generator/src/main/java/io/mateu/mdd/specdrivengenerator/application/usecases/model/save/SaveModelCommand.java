package io.mateu.mdd.specdrivengenerator.application.usecases.model.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelFieldData;

import java.util.List;

public record SaveModelCommand(String id, String name, List<ModelFieldData> fields) {
}
