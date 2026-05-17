package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleFieldAttribute;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleResult;

public class PageRuleViewModel {

    String filter;
    PageRuleAction action;
    String fieldName;
    PageRuleFieldAttribute fieldAttribute;
    String value;
    String expression;
    String actionId;
    PageRuleResult result;

    public PageRuleViewModel() {
    }

    public PageRuleViewModel(String filter, PageRuleAction action, String fieldName,
                             PageRuleFieldAttribute fieldAttribute, String value, String expression,
                             String actionId, PageRuleResult result) {
        this.filter = filter;
        this.action = action;
        this.fieldName = fieldName;
        this.fieldAttribute = fieldAttribute;
        this.value = value;
        this.expression = expression;
        this.actionId = actionId;
        this.result = result;
    }

    public String filter() {
        return filter;
    }

    public PageRuleAction action() {
        return action;
    }

    public String fieldName() {
        return fieldName;
    }

    public PageRuleFieldAttribute fieldAttribute() {
        return fieldAttribute;
    }

    public String value() {
        return value;
    }

    public String expression() {
        return expression;
    }

    public String actionId() {
        return actionId;
    }

    public PageRuleResult result() {
        return result;
    }
}
