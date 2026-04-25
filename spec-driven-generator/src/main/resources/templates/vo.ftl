package ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo;

<#assign hasDate = (field.primitiveType == "date")><#assign hasTime = (field.primitiveType == "time")><#assign hasDateTime = (field.primitiveType == "datetime")><#assign hasBigDecimal = (field.primitiveType == "decimal")>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
public record ${field.name?cap_first}(
<#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
        String value
<#elseif field.primitiveType == "integer">
        Integer value
<#elseif field.primitiveType == "decimal">
        BigDecimal value
<#elseif field.primitiveType == "bool">
        Boolean value
<#elseif field.primitiveType == "date">
        LocalDate value
<#elseif field.primitiveType == "time">
        LocalTime value
<#elseif field.primitiveType == "datetime">
        LocalDateTime value
<#else>
        String value
</#if>
) {
<#if field.mandatory>
    public ${field.name?cap_first} {
        if (value == null<#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url"> || value.isBlank()</#if>) {
            throw new IllegalArgumentException("${field.name} is required");
        }
    }
</#if>
}
