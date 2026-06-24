<#assign ruleClass = rule.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.${module.slug}.application.rules;

import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name?cap_first};
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Business rule "${rule.name}"<#if rule.description?? && rule.description?has_content> — ${rule.description}</#if>.
 *
 * <p>The structural wiring (registration, priority, ordering) is generated and locked. The condition
 * and action logic — the part that can't be derived from the model — lives in {@link ${ruleClass}Logic},
 * implemented in the developer-owned custom module.
 */
@Component
@RequiredArgsConstructor
public class ${ruleClass}Rule implements ${aggregate.name?cap_first}Rule {

    private final ${ruleClass}Logic logic;

    @Override
    public int priority() {
        return ${(rule.priority)!0};
    }

    @Override
    public boolean enabled() {
        return ${((rule.enabled)!true)?c};
    }

    @Override
    public boolean matches(${aggregate.name?cap_first} fact) {
        return logic.matches(fact);
    }

    @Override
    public void apply(${aggregate.name?cap_first} fact) {
        logic.apply(fact);
    }
}
