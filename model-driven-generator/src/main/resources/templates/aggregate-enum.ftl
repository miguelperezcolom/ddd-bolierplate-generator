package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.vo;

public enum ${enumName} {
<#if values?has_content>
<#list values as v>
    ${v}<#sep>,</#sep>
</#list>
<#else>
    // TODO: add enum values
</#if>
}
