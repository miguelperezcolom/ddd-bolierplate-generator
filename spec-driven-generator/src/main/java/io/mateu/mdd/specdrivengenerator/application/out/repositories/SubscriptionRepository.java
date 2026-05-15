package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.Subscription;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;

public interface SubscriptionRepository extends Repository<Subscription, SubscriptionId> {
}
