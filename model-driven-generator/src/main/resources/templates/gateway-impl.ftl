package ${project.packageName}.${module.slug}.infra.out.gateway;
<#macro jtype t><#if t=="string"||t=="json">String<#elseif t=="integer">Integer<#elseif t=="number"||t=="money">BigDecimal<#elseif t=="bool">Boolean<#elseif t=="date">LocalDate<#elseif t=="time">LocalTime<#elseif t=="dateTime">LocalDateTime<#else>String</#if></#macro>
<#assign hasDate=false><#assign hasTime=false><#assign hasDateTime=false><#assign hasBigDecimal=false>
<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as field><#if field.basicType><#if field.type=="date"><#assign hasDate=true></#if><#if field.type=="time"><#assign hasTime=true></#if><#if field.type=="dateTime"><#assign hasDateTime=true></#if><#if field.type=="number"||field.type=="money"><#assign hasBigDecimal=true></#if></#if></#list></#if>
<#if op.parameters?has_content><#list op.parameters as p><#if p.type=="date"><#assign hasDate=true></#if><#if p.type=="time"><#assign hasTime=true></#if><#if p.type=="dateTime"><#assign hasDateTime=true></#if><#if p.type=="number"||p.type=="money"><#assign hasBigDecimal=true></#if></#list></#if>
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
<#if ((gateway.authType)!'') == "ApiKey">

    // TODO: configure the API key (e.g. inject it from configuration)
    private String apiKey = "";
<#elseif ((gateway.authType)!'') == "BearerToken">

    // TODO: configure the bearer token
    private String bearerToken = "";
<#elseif ((gateway.authType)!'') == "Basic">

    // TODO: configure the credentials
    private String username = "";
    private String password = "";
</#if>

    private org.springframework.http.HttpHeaders authHeaders() {
        var headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
<#if ((gateway.authType)!'') == "ApiKey" && gateway.authApiKeyHeaderName?? && gateway.authApiKeyHeaderName?has_content>
        headers.set("${gateway.authApiKeyHeaderName}", apiKey);
<#elseif ((gateway.authType)!'') == "BearerToken">
        headers.setBearerAuth(bearerToken);
<#elseif ((gateway.authType)!'') == "Basic">
        headers.setBasicAuth(username, password);
</#if>
        return headers;
    }

<#if gateway.operations?has_content>
<#list gateway.operations as op>
<#assign __m = (op.httpMethod!'GET')?upper_case>
<#assign __qs = "">
<#if op.parameters?has_content><#list op.parameters as p><#if p.location=="query"><#assign __qs = __qs + ((__qs=="")?then("?","&")) + p.name + "={" + p.name + "}"></#if></#list></#if>
<#assign __url = 'BASE_URL + "' + (op.path!('/' + op.name?lower_case?replace("[^a-z0-9]","-",'r'))) + __qs + '"'>
    @Override
    public <#if op.outputClass??>${dtoPackage}.${op.outputClass}<#else>void</#if> ${op.name?uncap_first}(<#assign __f=true><#if op.parameters?has_content><#list op.parameters as p><#if !__f>, </#if><@jtype p.type/> ${p.argName}<#assign __f=false></#list></#if><#if op.inputModel?? && op.inputModel.fields?has_content><#list op.inputModel.fields as f><#if !__f>, </#if><#if f.basicType><@jtype f.type/> ${f.name}<#else>String ${f.name}Id</#if><#assign __f=false></#list></#if>) {
        var requestHeaders = authHeaders();
<#if op.parameters?has_content>
<#list op.parameters as p>
<#if p.location == "header">
        requestHeaders.set("${p.name}", String.valueOf(${p.argName}));
<#elseif p.location == "cookie">
        requestHeaders.add("Cookie", "${p.name}=" + String.valueOf(${p.argName}));
</#if>
</#list>
</#if>
        var uriVariables = new java.util.HashMap<String, Object>();
<#if op.parameters?has_content>
<#list op.parameters as p>
<#if p.location != "header" && p.location != "cookie">
        uriVariables.put("${p.name}", ${p.argName});
</#if>
</#list>
</#if>
        var requestBody = new java.util.HashMap<String, Object>();
<#if op.inputModel?? && op.inputModel.fields?has_content>
<#list op.inputModel.fields as f>
        requestBody.put("${f.name}", ${f.name}<#if !f.basicType>Id</#if>);
</#list>
</#if>
        var requestEntity = new org.springframework.http.HttpEntity<Object>(requestBody, requestHeaders);
<#if op.outputClass??>
        return restTemplate.exchange(${__url}, org.springframework.http.HttpMethod.${__m}, requestEntity, ${dtoPackage}.${op.outputClass}.class, uriVariables).getBody();
<#else>
        restTemplate.exchange(${__url}, org.springframework.http.HttpMethod.${__m}, requestEntity, Void.class, uriVariables);
</#if>
    }

</#list>
<#else>
    // TODO: implement gateway operations
</#if>
}
