package ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')};

/** Custom steps of the ${usecase.name} use case — a hook implemented in the developer-owned custom module. */
public interface ${usecase.name?cap_first}Steps {
<#list usecase.steps as step>
<#if step.type == "Custom">
<#if step.intent?? && step.intent?has_content>
    /** ${step.intent} */
</#if>
    void ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}();
</#if>
</#list>
}
