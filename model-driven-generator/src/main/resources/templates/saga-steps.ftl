package ${project.packageName}.${module.slug}.application.sagas;

/** Custom steps of the ${saga.name} saga — a hook implemented in the developer-owned custom module. */
public interface ${saga.name?cap_first}Steps {
<#list saga.steps as step>
<#if step.type == "Custom">
    void ${step.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}();
</#if>
</#list>
}
