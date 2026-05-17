package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface BusinessRuleQueryService extends QueryService<BusinessRuleDto, BusinessRuleRow, String> {
}
