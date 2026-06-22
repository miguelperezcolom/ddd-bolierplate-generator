package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.delete;

import java.util.List;

public record DeleteAggregateCommand(List<String> ids) {
}
