package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record BusinessRuleEntity(
        String id,
        String name,
        String description,
        String modelId,
        Integer priority,
        boolean enabled,
        String ruleGroup,
        List<BusinessRuleConditionEntity> conditions,
        List<BusinessRuleActionEntity> actions
) implements Identifiable {
}
