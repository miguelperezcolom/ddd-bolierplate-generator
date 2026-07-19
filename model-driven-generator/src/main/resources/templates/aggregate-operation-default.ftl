<#assign modpkg = project.packageName + "." + module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.custom;

import ${modpkg}.domain.aggregates.${aggregate.name?lower_case}.${operation.name?cap_first}${aggregate.name}Operation;
import ${modpkg}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name}OperationContext;
import org.springframework.stereotype.Component;

/**
 * Developer-owned implementation of the {@code ${operation.name}} operation of ${aggregate.name}.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${operation.name?cap_first}${aggregate.name}Operation implements ${operation.name?cap_first}${aggregate.name}Operation {

<#if operation.intent?? && operation.intent?has_content>
    /** Intent (from the model): ${operation.intent} */
</#if>
    @Override
    public void execute(${aggregate.name}OperationContext context) {
<#if operation.intent?? && operation.intent?has_content>
        // Intended behaviour: ${operation.intent}
        // Tip: `mvn modux:ai-complete` proposes an implementation from that intent (AI-PROPOSALS.md).
        throw new UnsupportedOperationException(
            "Pendiente de implementar la operación «${operation.name}» de ${aggregate.name}: ${operation.intent?j_string}");
<#else>
        throw new UnsupportedOperationException(
            "Pendiente de implementar la operación «${operation.name}» de ${aggregate.name}");
</#if>
    }
}
