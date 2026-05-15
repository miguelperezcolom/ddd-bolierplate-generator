package io.mateu.mdd.specdrivengenerator.application.usecases.model.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelFieldData;

import java.util.List;

public record CreateModelCommand(String id, String name, List<ModelFieldData> fields) {
}
