package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.BusinessRule;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;

public interface BusinessRuleRepository extends Repository<BusinessRule, BusinessRuleId> {
}
