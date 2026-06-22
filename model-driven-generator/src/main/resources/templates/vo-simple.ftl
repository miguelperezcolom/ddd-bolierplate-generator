package ${project.packageName}.${module.slug}.domain.vo;

<#assign hasDate = (vo.dataType == "date")>
<#assign hasTime = (vo.dataType == "time")>
<#assign hasDateTime = (vo.dataType == "datetime")>
<#assign hasBigDecimal = (vo.dataType == "decimal")>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
public record ${vo.name?cap_first}(
<#if vo.dataType == "integer">
        Integer value
<#elseif vo.dataType == "decimal">
        BigDecimal value
<#elseif vo.dataType == "bool">
        Boolean value
<#elseif vo.dataType == "date">
        LocalDate value
<#elseif vo.dataType == "time">
        LocalTime value
<#elseif vo.dataType == "datetime">
        LocalDateTime value
<#else>
        String value
</#if>
) {}
