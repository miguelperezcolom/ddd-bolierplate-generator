package ${project.packageName}.application.query.dto;

<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false><#list safeFields as field><#if field.type == "Wrapper"><#if field.primitiveType == "date"><#assign hasDate = true></#if><#if field.primitiveType == "time"><#assign hasTime = true></#if><#if field.primitiveType == "datetime"><#assign hasDateTime = true></#if><#if field.primitiveType == "decimal"><#assign hasBigDecimal = true></#if></#if></#list>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>public record ${aggregate.name}Dto(
        String id<#if safeFields?has_content>,</#if>
<#list safeFields as field>
    <#if field.type == "ValueObject" || field.type == "Entity">
        String ${field.name}<#if field.type == "Entity">Id</#if><#sep>,</#sep>
    <#else>
        <#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
        String ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "integer">
        Integer ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "decimal">
        BigDecimal ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "bool">
        Boolean ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "date">
        LocalDate ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "time">
        LocalTime ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "datetime">
        LocalDateTime ${field.name}<#sep>,</#sep>
        <#else>
        String ${field.name}<#sep>,</#sep>
        </#if>
    </#if>
</#list>
) {
}
