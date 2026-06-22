package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.Subscription;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionId;

public interface SubscriptionRepository extends Repository<Subscription, SubscriptionId> {
}
