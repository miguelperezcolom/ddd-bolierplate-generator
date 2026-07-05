package ${project.packageName}.custom;

import ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')}.${usecase.name?cap_first}Steps;
import org.springframework.stereotype.Component;

/**
 * Developer-owned implementation of the custom steps of the ${usecase.name} use case.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${usecase.name?cap_first}Steps implements ${usecase.name?cap_first}Steps {
<#list usecase.steps as step>
<#if step.type == "Custom">

<#if step.intent?? && step.intent?has_content>
    /** Intent (from the model): ${step.intent} */
</#if>
    @Override
    public void ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
<#if step.intent?? && step.intent?has_content>
        // TODO: implement "${step.name}" — intended behaviour: ${step.intent}
        // Tip: `mvn modux:ai-complete` proposes an implementation from that intent (AI-PROPOSALS.md).
<#else>
        // TODO: implement the "${step.name}" step of the ${usecase.name} use case.
</#if>
    }
</#if>
</#list>
}
