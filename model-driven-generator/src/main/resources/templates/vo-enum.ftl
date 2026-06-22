package ${project.packageName}.${module.slug}.domain.vo;

public enum ${vo.name?cap_first} {
<#if vo.valuesJson?? && vo.valuesJson?has_content>
<#list vo.valuesJson?split(",") as value>
    ${value?trim?upper_case}<#sep>,</#sep>
</#list>
<#else>
    // TODO: add enum values
</#if>
}
