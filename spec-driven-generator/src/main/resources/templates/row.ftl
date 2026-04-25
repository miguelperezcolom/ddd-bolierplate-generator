package ${project.packageName}.application.query.dto;

public record ${aggregate.name}Row(
        String id<#if aggregate.fields?has_content>,</#if>
<#list aggregate.fields as field>
    <#if field.searchable || field.visible>
        String ${field.name}<#if field.type == "Entity">Id</#if><#sep>,</#sep>
    </#if>
</#list>
) {
}
