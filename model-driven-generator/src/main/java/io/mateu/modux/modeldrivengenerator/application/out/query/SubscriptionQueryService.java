package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.SubscriptionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface SubscriptionQueryService extends QueryService<SubscriptionDto, SubscriptionRow, String> {
}
