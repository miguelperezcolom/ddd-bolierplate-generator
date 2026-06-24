package ${project.packageName}.${module.slug}.infra.out.gateway;
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

import ${project.packageName}.${module.slug}.application.out.${gateway.name?cap_first}Gateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>

@Component
@RequiredArgsConstructor
public class ${gateway.name?cap_first}GatewayImpl implements ${gateway.name?cap_first}Gateway {

    final RestTemplate restTemplate;

<#if gateway.baseUrl?? && gateway.baseUrl?has_content>
    private static final String BASE_URL = "${gateway.baseUrl}";

</#if>
<#if gateway.operations?has_content>
<#list gateway.operations as op>
    @Override
    public void ${op.name?uncap_first}(<#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as f><#if f.basicType><#if f.type == "string" || f.type == "json">String ${f.name}<#elseif f.type == "integer">Integer ${f.name}<#elseif f.type == "number" || f.type == "money">BigDecimal ${f.name}<#elseif f.type == "bool">Boolean ${f.name}<#elseif f.type == "date">LocalDate ${f.name}<#elseif f.type == "time">LocalTime ${f.name}<#elseif f.type == "dateTime">LocalDateTime ${f.name}<#else>String ${f.name}</#if><#else>String ${f.name}Id</#if><#sep>, </#sep></#list></#if>) {
        // TODO: call ${op.httpMethod!'GET'} ${gateway.baseUrl!''}${op.path!'/' + op.name?lower_case}
        restTemplate.${(op.httpMethod?lower_case!'get')}ForObject(
                BASE_URL + "${op.path!'/' + op.name?lower_case?replace("[^a-z0-9]","-",'r')}",
                Void.class
        );
    }

</#list>
<#else>
    // TODO: implement gateway operations
</#if>
}
