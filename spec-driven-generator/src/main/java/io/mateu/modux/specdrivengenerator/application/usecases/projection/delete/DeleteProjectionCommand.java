package io.mateu.modux.specdrivengenerator.application.usecases.projection.delete;

import java.util.List;

public record DeleteProjectionCommand(List<String> ids) {
}
