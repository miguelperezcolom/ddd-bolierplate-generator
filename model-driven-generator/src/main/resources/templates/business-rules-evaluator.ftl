package ${project.packageName}.${module.slug}.application.rules;

import ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name?cap_first};
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

/**
 * Runs every enabled {@link ${aggregate.name?cap_first}Rule} against a ${aggregate.name} fact,
 * highest priority first. Inject this where the rules must fire (e.g. from a use-case Custom step
 * or an aggregate operation).
 */
@Component
@RequiredArgsConstructor
public class ${aggregate.name?cap_first}RulesEvaluator {

    private final List<${aggregate.name?cap_first}Rule> rules;

    public void evaluate(${aggregate.name?cap_first} fact) {
        rules.stream()
                .filter(${aggregate.name?cap_first}Rule::enabled)
                .sorted(Comparator.comparingInt(${aggregate.name?cap_first}Rule::priority).reversed())
                .forEach(rule -> {
                    if (rule.matches(fact)) {
                        rule.apply(fact);
                    }
                });
    }
}
