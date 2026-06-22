package io.mateu.modux.modeldrivengenerator.application.usecases.scheduledtrigger.delete;

import java.util.List;

public record DeleteScheduledTriggerCommand(List<String> ids) {
}
