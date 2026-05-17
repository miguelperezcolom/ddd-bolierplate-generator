package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleFieldAttribute;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleResult;

public record PageRule(
        String filter,
        PageRuleAction action,
        String fieldName,
        PageRuleFieldAttribute fieldAttribute,
        String value,
        String expression,
        String actionId,
        PageRuleResult result
) {
}
