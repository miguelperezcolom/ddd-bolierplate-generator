package ${project.packageName}.${module.slug}.application.usecases.${usecase.name?lower_case?replace("[^a-z0-9]","",'r')};
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field>
<#if field.basicType?? && field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "dateTime"><#assign hasDateTime = true></#if>
<#if field.type == "number" || field.type == "money"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
<#if hasDate>
import java.time.LocalDate;
</#if>
<#if hasTime>
import java.time.LocalTime;
</#if>
<#if hasDateTime>
import java.time.LocalDateTime;
</#if>
<#if hasBigDecimal>
import java.math.BigDecimal;
</#if>

public record ${usecase.name?cap_first}Command(
<#if inputModel?? && inputModel.fields?has_content>
<#list inputModel.fields as field>
<#if field.basicType?? && field.basicType>
    <#if field.type == "integer">
    Integer ${field.name}<#sep>,</#sep>
    <#elseif field.type == "number" || field.type == "money">
    BigDecimal ${field.name}<#sep>,</#sep>
    <#elseif field.type == "bool">
    Boolean ${field.name}<#sep>,</#sep>
    <#elseif field.type == "date">
    LocalDate ${field.name}<#sep>,</#sep>
    <#elseif field.type == "time">
    LocalTime ${field.name}<#sep>,</#sep>
    <#elseif field.type == "dateTime">
    LocalDateTime ${field.name}<#sep>,</#sep>
    <#else>
    String ${field.name}<#sep>,</#sep>
    </#if>
<#else>
    String ${field.name}Id<#sep>,</#sep>
</#if>
</#list>
<#else>
    String id
</#if>
) {}
