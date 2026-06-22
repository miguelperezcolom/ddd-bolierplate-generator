package io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData;

import java.util.List;

public record CreateEnumDefinitionCommand(String id, List<EnumDefinitionValueData> values) {
}
