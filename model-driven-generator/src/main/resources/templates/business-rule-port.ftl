package ${project.packageName}.${module.slug}.application.rules;

import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name?cap_first};

/**
 * A business rule evaluated against a ${aggregate.name} fact. Implementations are Spring beans
 * collected and run by {@link ${aggregate.name?cap_first}RulesEvaluator}, highest priority first.
 */
public interface ${aggregate.name?cap_first}Rule {

    /** Higher values run first. */
    int priority();

    /** Disabled rules are skipped by the evaluator. */
    boolean enabled();

    /** True when the rule's conditions hold for the given fact. */
    boolean matches(${aggregate.name?cap_first} fact);

    /** Apply the rule's actions to the given fact. */
    void apply(${aggregate.name?cap_first} fact);
}
