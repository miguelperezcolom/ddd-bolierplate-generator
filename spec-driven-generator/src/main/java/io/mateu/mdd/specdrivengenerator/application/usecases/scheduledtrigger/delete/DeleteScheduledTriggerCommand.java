package io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.delete;

import java.util.List;

public record DeleteScheduledTriggerCommand(List<String> ids) {
}
