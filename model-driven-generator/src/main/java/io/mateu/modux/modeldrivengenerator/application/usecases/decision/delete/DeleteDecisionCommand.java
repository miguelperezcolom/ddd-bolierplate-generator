package io.mateu.modux.modeldrivengenerator.application.usecases.decision.delete;

import java.util.List;

public record DeleteDecisionCommand(List<String> ids) {
}
