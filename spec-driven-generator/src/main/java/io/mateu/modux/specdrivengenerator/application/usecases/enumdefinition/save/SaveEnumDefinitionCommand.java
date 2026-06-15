package io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.save;

import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData;

import java.util.List;

public record SaveEnumDefinitionCommand(String id, List<EnumDefinitionValueData> values) {
}
