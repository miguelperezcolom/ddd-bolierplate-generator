package io.mateu.modux.specdrivengenerator.application.usecases.usecase.delete;

import java.util.List;

public record DeleteUseCaseCommand(List<String> ids) {
}
