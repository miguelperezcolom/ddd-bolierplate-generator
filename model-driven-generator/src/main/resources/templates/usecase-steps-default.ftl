package ${project.packageName}.custom;
<#assign ucPackage = project.packageName + "." + module.slug + ".application.usecases." + usecase.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign customSteps = (usecase.steps![])?filter(s -> s.type == "Custom")>

import ${ucPackage}.${usecase.className}Command;
<#if outputModel??>
import ${ucPackage}.${usecase.className}Result;
</#if>
import ${ucPackage}.${usecase.className}Steps;
import org.springframework.stereotype.Component;

/**
 * Developer-owned implementation of the custom steps of the ${usecase.name} use case.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${usecase.className}Steps implements ${usecase.className}Steps {
<#list customSteps as step>
<#assign returnsResult = outputModel?? && step.id == customSteps?last.id>

<#if step.intent?? && step.intent?has_content>
    /** Intent (from the model): ${step.intent} */
</#if>
    @Override
    public <#if returnsResult>${usecase.className}Result<#else>void</#if> ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}(${usecase.className}Command command) {
<#if step.intent?? && step.intent?has_content>
        // TODO: implement "${step.name}" — intended behaviour: ${step.intent}
        // Tip: `mvn modux:ai-complete` proposes an implementation from that intent (AI-PROPOSALS.md).
<#else>
        // TODO: implement the "${step.name}" step of the ${usecase.name} use case.
</#if>
<#if returnsResult>
        return null;
</#if>
    }
</#list>
}
