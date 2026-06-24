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

    @Override
    public void ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
        // TODO: implement the "${step.name}" step of the ${usecase.name} use case.
    }
</#if>
</#list>
}
