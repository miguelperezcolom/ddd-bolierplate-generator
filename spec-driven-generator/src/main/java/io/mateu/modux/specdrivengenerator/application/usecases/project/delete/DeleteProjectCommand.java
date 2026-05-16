package io.mateu.modux.specdrivengenerator.application.usecases.project.delete;

import java.util.List;

public record DeleteProjectCommand(List<String> ids) {
}
