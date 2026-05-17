package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.BusinessRule;
import io.mateu.modux.specdrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;

public interface BusinessRuleRepository extends Repository<BusinessRule, BusinessRuleId> {
}
