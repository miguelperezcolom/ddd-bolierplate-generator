package ${project.packageName}.custom;
<#assign ucPackage = project.packageName + "." + module.slug + ".application.usecases." + usecase.name?lower_case?replace("[^a-z0-9]","",'r')>
<#assign customSteps = (usecase.steps![])?filter(s -> s.type == "Custom")>

import ${ucPackage}.${usecase.name?cap_first}Command;
<#if outputModel??>
import ${ucPackage}.${usecase.name?cap_first}Result;
</#if>
import ${ucPackage}.${usecase.name?cap_first}Steps;
import org.springframework.stereotype.Component;

/**
 * Developer-owned implementation of the custom steps of the ${usecase.name} use case.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${usecase.name?cap_first}Steps implements ${usecase.name?cap_first}Steps {
<#list customSteps as step>
<#assign returnsResult = outputModel?? && step.id == customSteps?last.id>

<#if step.intent?? && step.intent?has_content>
    /** Intent (from the model): ${step.intent} */
</#if>
    @Override
    public <#if returnsResult>${usecase.name?cap_first}Result<#else>void</#if> ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}(${usecase.name?cap_first}Command command) {
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
