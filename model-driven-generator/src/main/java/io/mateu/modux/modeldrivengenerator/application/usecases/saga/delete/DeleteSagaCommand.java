package io.mateu.modux.modeldrivengenerator.application.usecases.saga.delete;

import java.util.List;

public record DeleteSagaCommand(List<String> ids) {
}
