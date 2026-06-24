<#assign ruleClass = rule.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.custom;

import ${project.packageName}.${module.slug}.application.rules.${ruleClass}Logic;
import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name?cap_first};
import org.springframework.stereotype.Component;

/**
 * Developer-owned condition/action logic for the "${rule.name}" business rule.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${ruleClass}Logic implements ${ruleClass}Logic {

    @Override
    public boolean matches(${aggregate.name?cap_first} fact) {
        // TODO: return true only when ALL of the rule's conditions hold:
<#if rule.conditions?? && rule.conditions?has_content>
<#list rule.conditions as c>
        //   - ${(c.expression)!''}<#if c.description?? && c.description?has_content> (${c.description})</#if>
</#list>
</#if>
        return false;
    }

    @Override
    public void apply(${aggregate.name?cap_first} fact) {
        // TODO: perform the rule's actions:
<#if rule.actions?? && rule.actions?has_content>
<#list rule.actions as a>
        //   - ${a.type}<#if a.fieldId?? && a.fieldId?has_content> field=${a.fieldId}</#if><#if a.expression?? && a.expression?has_content> expression=${a.expression}</#if><#if a.useCaseId?? && a.useCaseId?has_content> useCase=${a.useCaseId}</#if><#if a.domainEventId?? && a.domainEventId?has_content> event=${a.domainEventId}</#if><#if a.description?? && a.description?has_content> (${a.description})</#if>
</#list>
</#if>
    }
}
