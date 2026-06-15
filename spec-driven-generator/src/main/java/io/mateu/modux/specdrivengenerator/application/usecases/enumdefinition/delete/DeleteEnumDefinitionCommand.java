package io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.delete;

import java.util.List;

public record DeleteEnumDefinitionCommand(List<String> ids) {
}
