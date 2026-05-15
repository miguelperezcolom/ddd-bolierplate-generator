package io.mateu.mdd.specdrivengenerator.application.usecases.saga.delete;

import java.util.List;

public record DeleteSagaCommand(List<String> ids) {
}
