package io.mateu.modux.modeldrivengenerator.application.usecases.projection.delete;

import java.util.List;

public record DeleteProjectionCommand(List<String> ids) {
}
