package io.mateu.modux.specdrivengenerator.application.usecases.domainevent.delete;

import java.util.List;

public record DeleteDomainEventCommand(List<String> ids) {
}
