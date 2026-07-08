package io.mateu.modux.modeldrivengenerator.application.usecases.repository.delete;

import java.util.List;

public record DeleteRepositoryCommand(List<String> ids) {
}
