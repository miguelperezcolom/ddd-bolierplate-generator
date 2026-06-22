package io.mateu.modux.modeldrivengenerator.application.usecases.subscription.delete;

import java.util.List;

public record DeleteSubscriptionCommand(List<String> ids) {
}
