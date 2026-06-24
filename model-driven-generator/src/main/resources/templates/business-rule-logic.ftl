<#assign ruleClass = rule.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.${module.slug}.application.rules;

import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name?cap_first};

/**
 * Condition and action logic for the "${rule.name}" business rule — the part that can't be derived
 * from the model. Implemented once in the custom module by {@code Default${ruleClass}Logic}.
 */
public interface ${ruleClass}Logic {

    /**
     * Whether the rule's conditions hold for the given fact.
<#if rule.conditions?? && rule.conditions?has_content>
     * <p>Conditions (all must hold):
<#list rule.conditions as c>
     * <ul><li>{@code ${(c.expression)!''}}<#if c.description?? && c.description?has_content> — ${c.description}</#if></li></ul>
</#list>
</#if>
     */
    boolean matches(${aggregate.name?cap_first} fact);

    /**
     * Apply the rule's actions when {@link #matches} is true.
<#if rule.actions?? && rule.actions?has_content>
     * <p>Actions:
<#list rule.actions as a>
     * <ul><li>${a.type}<#if a.fieldId?? && a.fieldId?has_content> field={@code ${a.fieldId}}</#if><#if a.expression?? && a.expression?has_content> expression={@code ${a.expression}}</#if><#if a.useCaseId?? && a.useCaseId?has_content> useCase={@code ${a.useCaseId}}</#if><#if a.domainEventId?? && a.domainEventId?has_content> event={@code ${a.domainEventId}}</#if><#if a.description?? && a.description?has_content> — ${a.description}</#if></li></ul>
</#list>
</#if>
     */
    void apply(${aggregate.name?cap_first} fact);
}
