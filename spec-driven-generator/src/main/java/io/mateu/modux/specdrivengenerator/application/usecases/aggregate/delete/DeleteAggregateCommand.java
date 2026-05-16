package io.mateu.modux.specdrivengenerator.application.usecases.aggregate.delete;

import java.util.List;

public record DeleteAggregateCommand(List<String> ids) {
}
