package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.Subscription;
import io.mateu.modux.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;

public interface SubscriptionRepository extends Repository<Subscription, SubscriptionId> {
}
