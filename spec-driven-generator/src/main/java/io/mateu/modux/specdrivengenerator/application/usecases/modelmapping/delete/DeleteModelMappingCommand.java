package io.mateu.modux.specdrivengenerator.application.usecases.modelmapping.delete;

import java.util.List;

public record DeleteModelMappingCommand(List<String> selectedIds) {
}
