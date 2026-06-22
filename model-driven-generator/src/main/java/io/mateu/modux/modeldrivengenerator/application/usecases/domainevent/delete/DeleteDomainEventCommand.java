package io.mateu.modux.modeldrivengenerator.application.usecases.domainevent.delete;

import java.util.List;

public record DeleteDomainEventCommand(List<String> ids) {
}
