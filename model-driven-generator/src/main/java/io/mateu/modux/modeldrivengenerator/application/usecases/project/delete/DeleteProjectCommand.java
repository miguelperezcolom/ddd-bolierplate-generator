package io.mateu.modux.modeldrivengenerator.application.usecases.project.delete;

import java.util.List;

public record DeleteProjectCommand(List<String> ids) {
}
