package ${project.packageName}.${module.slug}.domain.vo;

<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if voFields?has_content>
<#list voFields as field>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "datetime"><#assign hasDateTime = true></#if>
<#if field.type == "decimal"><#assign hasBigDecimal = true></#if>
</#list>
</#if>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
public record ${vo.name?cap_first}(
<#if voFields?has_content>
<#list voFields as field>
    <#if field.type == "integer">
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
</#list>
<#else>
        // TODO: define fields for this composite value object
</#if>
) {}
