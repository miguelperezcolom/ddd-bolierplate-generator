<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if model?? && model.fields?has_content>
<#list model.fields as field>
<#if field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "datetime"><#assign hasDateTime = true></#if>
<#if field.type == "decimal"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
package ${project.packageName}.${module.slug}.application.query.dto;

<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
public record ${className}(<#if model?? && model.fields?has_content>
<#list model.fields as field>
<#if field.basicType>
    <#if field.type == "string" || field.type == "email" || field.type == "password" || field.type == "url" || field.type == "color" || field.type == "image" || field.type == "file" || field.type == "json">
        String ${field.name}<#sep>,</#sep>
    <#elseif field.type == "integer">
        Integer ${field.name}<#sep>,</#sep>
    <#elseif field.type == "decimal">
        BigDecimal ${field.name}<#sep>,</#sep>
    <#elseif field.type == "bool">
        Boolean ${field.name}<#sep>,</#sep>
    <#elseif field.type == "date">
        LocalDate ${field.name}<#sep>,</#sep>
    <#elseif field.type == "time">
        LocalTime ${field.name}<#sep>,</#sep>
    <#elseif field.type == "datetime">
        LocalDateTime ${field.name}<#sep>,</#sep>
    <#else>
        String ${field.name}<#sep>,</#sep>
    </#if>
<#else>
        String ${field.name}Id<#sep>,</#sep>
</#if>
</#list>
</#if>) {}
