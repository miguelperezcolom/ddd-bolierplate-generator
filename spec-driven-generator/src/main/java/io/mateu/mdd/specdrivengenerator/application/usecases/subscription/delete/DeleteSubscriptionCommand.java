package io.mateu.mdd.specdrivengenerator.application.usecases.subscription.delete;

import java.util.List;

public record DeleteSubscriptionCommand(List<String> ids) {
}
