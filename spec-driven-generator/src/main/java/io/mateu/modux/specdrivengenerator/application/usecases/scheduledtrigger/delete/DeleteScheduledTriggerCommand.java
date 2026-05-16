package io.mateu.modux.specdrivengenerator.application.usecases.scheduledtrigger.delete;

import java.util.List;

public record DeleteScheduledTriggerCommand(List<String> ids) {
}
