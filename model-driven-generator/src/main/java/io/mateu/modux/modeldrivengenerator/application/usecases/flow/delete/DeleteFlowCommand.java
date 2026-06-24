package io.mateu.modux.modeldrivengenerator.application.usecases.flow.delete;

import java.util.List;

public record DeleteFlowCommand(List<String> ids) {
}
