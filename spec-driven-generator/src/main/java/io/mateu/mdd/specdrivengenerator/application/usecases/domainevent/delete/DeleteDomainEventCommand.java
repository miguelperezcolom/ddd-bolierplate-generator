package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.delete;

import java.util.List;

public record DeleteDomainEventCommand(List<String> ids) {
}
