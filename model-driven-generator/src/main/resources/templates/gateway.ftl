package ${project.packageName}.${module.slug}.application.out;
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#if op.inputModel??>
<#if op.inputModel.fields?has_content>
<#list op.inputModel.fields as field>
<#if field.basicType?? && field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "datetime"><#assign hasDateTime = true></#if>
<#if field.type == "decimal"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
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

public interface ${gateway.name?cap_first}Gateway {

<#if gateway.operations?has_content>
<#list gateway.operations as op>
    void ${op.name?uncap_first}(/* TODO: define params from input model */);

</#list>
<#else>
    // TODO: define gateway operations
</#if>
}
