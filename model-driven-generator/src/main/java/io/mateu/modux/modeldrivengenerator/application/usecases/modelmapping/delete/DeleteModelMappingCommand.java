package io.mateu.modux.modeldrivengenerator.application.usecases.modelmapping.delete;

import java.util.List;

public record DeleteModelMappingCommand(List<String> selectedIds) {
}
