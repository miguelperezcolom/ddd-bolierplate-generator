package ${project.packageName}.${module.slug}.application.out;
<#macro jtype t><#if t=="string"||t=="json">String<#elseif t=="integer">Integer<#elseif t=="number"||t=="money">BigDecimal<#elseif t=="bool">Boolean<#elseif t=="date">LocalDate<#elseif t=="time">LocalTime<#elseif t=="dateTime">LocalDateTime<#else>String</#if></#macro>
<#assign hasDate=false><#assign hasTime=false><#assign hasDateTime=false><#assign hasBigDecimal=false>
<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as field><#if field.basicType><#if field.type=="date"><#assign hasDate=true></#if><#if field.type=="time"><#assign hasTime=true></#if><#if field.type=="dateTime"><#assign hasDateTime=true></#if><#if field.type=="number"||field.type=="money"><#assign hasBigDecimal=true></#if></#if></#list></#if>
<#if op.parameters?has_content><#list op.parameters as p><#if p.type=="date"><#assign hasDate=true></#if><#if p.type=="time"><#assign hasTime=true></#if><#if p.type=="dateTime"><#assign hasDateTime=true></#if><#if p.type=="number"||p.type=="money"><#assign hasBigDecimal=true></#if></#list></#if>
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
    <#if op.outputClass??>${dtoPackage}.${op.outputClass}<#else>void</#if> ${op.name?uncap_first}(<#assign __f=true><#if op.parameters?has_content><#list op.parameters as p><#if !__f>, </#if><@jtype p.type/> ${p.name}<#assign __f=false></#list></#if><#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as f><#if !__f>, </#if><#if f.basicType><@jtype f.type/> ${f.name}<#else>String ${f.name}Id</#if><#assign __f=false></#list></#if>);

</#list>
<#else>
    // TODO: define gateway operations
</#if>
}
