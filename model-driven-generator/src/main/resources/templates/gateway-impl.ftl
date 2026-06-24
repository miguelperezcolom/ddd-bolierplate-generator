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

    private static final String BASE_URL = "${gateway.baseUrl!''}";
<#if ((gateway.authType)!'') =="ApiKey">

    // TODO: configure the API key (e.g. inject it from configuration)
    private String apiKey = "";
<#elseif ((gateway.authType)!'') =="BearerToken">

    // TODO: configure the bearer token
    private String bearerToken = "";
<#elseif ((gateway.authType)!'') =="Basic">

    // TODO: configure the credentials
    private String username = "";
    private String password = "";
</#if>

    private org.springframework.http.HttpHeaders authHeaders() {
        var headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
<#if ((gateway.authType)!'') =="ApiKey" && gateway.authApiKeyHeaderName?? && gateway.authApiKeyHeaderName?has_content>
        headers.set("${gateway.authApiKeyHeaderName}", apiKey);
<#elseif ((gateway.authType)!'') =="BearerToken">
        headers.setBearerAuth(bearerToken);
<#elseif ((gateway.authType)!'') =="Basic">
        headers.setBasicAuth(username, password);
</#if>
        return headers;
    }

<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#assign __url = 'BASE_URL + "' + (op.path!('/' + op.name?lower_case?replace("[^a-z0-9]","-",'r'))) + '"'>
<#assign __m = (op.httpMethod!'GET')?upper_case>
    @Override
    public <#if op.outputClass??>${dtoPackage}.${op.outputClass}<#else>void</#if> ${op.name?uncap_first}(<#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as f><#if f.basicType><#if f.type == "string" || f.type == "json">String ${f.name}<#elseif f.type == "integer">Integer ${f.name}<#elseif f.type == "number" || f.type == "money">BigDecimal ${f.name}<#elseif f.type == "bool">Boolean ${f.name}<#elseif f.type == "date">LocalDate ${f.name}<#elseif f.type == "time">LocalTime ${f.name}<#elseif f.type == "dateTime">LocalDateTime ${f.name}<#else>String ${f.name}</#if><#else>String ${f.name}Id</#if><#sep>, </#sep></#list></#if>) {
        var requestHeaders = authHeaders();
        var requestBody = new java.util.HashMap<String, Object>();
<#if op.inputModel?? && op.inputModel.fields?has_content>
<#list op.inputModel.fields as f>
        requestBody.put("${f.name}", ${f.name}<#if !f.basicType>Id</#if>);
</#list>
</#if>
        var requestEntity = new org.springframework.http.HttpEntity<Object>(requestBody, requestHeaders);
<#if op.outputClass??>
        return restTemplate.exchange(${__url}, org.springframework.http.HttpMethod.${__m}, requestEntity, ${dtoPackage}.${op.outputClass}.class).getBody();
<#else>
        restTemplate.exchange(${__url}, org.springframework.http.HttpMethod.${__m}, requestEntity, Void.class);
</#if>
    }

</#list>
<#else>
    // TODO: implement gateway operations
</#if>
}
