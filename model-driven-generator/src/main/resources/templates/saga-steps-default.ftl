package ${project.packageName}.custom;

import ${project.packageName}.${module.slug}.application.sagas.${saga.name?cap_first}Steps;
import org.springframework.stereotype.Component;

/**
 * Developer-owned implementation of the custom steps of the ${saga.name} saga.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${saga.name?cap_first}Steps implements ${saga.name?cap_first}Steps {
<#list saga.steps as step>
<#if step.type == "Custom">

    @Override
    public void ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
        // TODO: implement the "${step.name}" step of the ${saga.name} saga.
    }
</#if>
</#list>
}
