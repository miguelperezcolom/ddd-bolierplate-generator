package ${project.packageName}.${module.slug}.application.out;
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#if op.inputModel?? && op.inputModel.fields?has_content>
<#list op.inputModel.fields as field>
<#if field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "dateTime"><#assign hasDateTime = true></#if>
<#if field.type == "number" || field.type == "money"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
</#list>
</#if>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>

public interface ${gateway.name?cap_first}Gateway {

<#if gateway.operations?has_content>
<#list gateway.operations as op>
    void ${op.name?uncap_first}(<#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as f><#if f.basicType><#if f.type == "string" || f.type == "json">String ${f.name}<#elseif f.type == "integer">Integer ${f.name}<#elseif f.type == "number" || f.type == "money">BigDecimal ${f.name}<#elseif f.type == "bool">Boolean ${f.name}<#elseif f.type == "date">LocalDate ${f.name}<#elseif f.type == "time">LocalTime ${f.name}<#elseif f.type == "dateTime">LocalDateTime ${f.name}<#else>String ${f.name}</#if><#else>String ${f.name}Id</#if><#sep>, </#sep></#list></#if>);

</#list>
<#else>
    // TODO: define gateway operations
</#if>
}
