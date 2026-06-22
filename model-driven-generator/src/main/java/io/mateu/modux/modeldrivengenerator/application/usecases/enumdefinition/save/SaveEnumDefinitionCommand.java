package io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData;

import java.util.List;

public record SaveEnumDefinitionCommand(String id, List<EnumDefinitionValueData> values) {
}
