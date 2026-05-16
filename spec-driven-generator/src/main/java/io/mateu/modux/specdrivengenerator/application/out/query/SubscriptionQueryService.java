package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SubscriptionDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface SubscriptionQueryService extends QueryService<SubscriptionDto, SubscriptionRow, String> {
}
