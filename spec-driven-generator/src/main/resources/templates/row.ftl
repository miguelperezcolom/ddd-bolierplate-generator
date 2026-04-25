package ${project.packageName}.application.query.dto;

<#assign visibleFields = aggregate.fields?filter(f -> (f.searchable || f.visible) && f.name != "id")>
public record ${aggregate.name}Row(
        String id<#if visibleFields?has_content>,</#if>
<#list visibleFields as field>
        String ${field.name}<#if field.type == "Entity">Id</#if><#sep>,</#sep>
</#list>
) {
}
