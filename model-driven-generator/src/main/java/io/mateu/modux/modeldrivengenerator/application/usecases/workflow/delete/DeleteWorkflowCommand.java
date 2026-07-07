package io.mateu.modux.modeldrivengenerator.application.usecases.workflow.delete;

import java.util.List;

public record DeleteWorkflowCommand(List<String> ids) {
}
