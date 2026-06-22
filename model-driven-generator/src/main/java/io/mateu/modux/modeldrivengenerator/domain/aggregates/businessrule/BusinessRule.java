package io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleAction;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleActionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleCondition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleName;
import lombok.Getter;

import java.util.List;

@Getter
public class BusinessRule {

    private BusinessRuleId id;
    private BusinessRuleName name;
    private String description;
    private String modelId;
    private Integer priority;
    private boolean enabled;
    private String ruleGroup;
    private List<BusinessRuleCondition> conditions;
    private List<BusinessRuleAction> actions;

    public static BusinessRule of(BusinessRuleId id, BusinessRuleName name,
                                  String description, String modelId,
                                  Integer priority, boolean enabled, String ruleGroup,
                                  List<BusinessRuleCondition> conditions,
                                  List<BusinessRuleAction> actions) {
        var rule = new BusinessRule();
        rule.id = id;
        rule.name = name;
        rule.description = description;
        rule.modelId = modelId;
        rule.priority = priority;
        rule.enabled = enabled;
        rule.ruleGroup = ruleGroup;
        rule.conditions = conditions != null ? conditions : List.of();
        rule.actions = actions != null ? actions : List.of();
        return rule;
    }

    public static BusinessRule load(String id, String name,
                                    String description, String modelId,
                                    Integer priority, boolean enabled, String ruleGroup,
                                    List<BusinessRuleCondition> conditions,
                                    List<BusinessRuleAction> actions) {
        var rule = new BusinessRule();
        rule.id = new BusinessRuleId(id);
        rule.name = new BusinessRuleName(name);
        rule.description = description;
        rule.modelId = modelId;
        rule.priority = priority;
        rule.enabled = enabled;
        rule.ruleGroup = ruleGroup;
        rule.conditions = conditions != null ? conditions : List.of();
        rule.actions = actions != null ? actions : List.of();
        return rule;
    }

    public void update(BusinessRuleName name,
                       String description, String modelId,
                       Integer priority, boolean enabled, String ruleGroup,
                       List<BusinessRuleCondition> conditions,
                       List<BusinessRuleAction> actions) {
        this.name = name;
        this.description = description;
        this.modelId = modelId;
        this.priority = priority;
        this.enabled = enabled;
        this.ruleGroup = ruleGroup;
        this.conditions = conditions != null ? conditions : List.of();
        this.actions = actions != null ? actions : List.of();
    }
}
