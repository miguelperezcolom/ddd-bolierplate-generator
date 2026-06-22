package io.mateu.modux.modeldrivengenerator.application.usecases.enumdefinition.delete;

import java.util.List;

public record DeleteEnumDefinitionCommand(List<String> ids) {
}
