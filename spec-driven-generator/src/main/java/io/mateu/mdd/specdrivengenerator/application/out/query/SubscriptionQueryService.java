package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface SubscriptionQueryService extends QueryService<SubscriptionDto, SubscriptionRow, String> {
}
