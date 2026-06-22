package io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.delete;

import java.util.List;

public record DeleteIntegrationEventCommand(List<String> ids) {
}
