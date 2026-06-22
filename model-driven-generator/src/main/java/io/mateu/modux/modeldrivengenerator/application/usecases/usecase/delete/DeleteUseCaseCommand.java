package io.mateu.modux.modeldrivengenerator.application.usecases.usecase.delete;

import java.util.List;

public record DeleteUseCaseCommand(List<String> ids) {
}
