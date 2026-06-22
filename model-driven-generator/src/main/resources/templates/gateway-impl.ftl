package ${project.packageName}.${module.slug}.infra.out.gateway;

import ${project.packageName}.${module.slug}.application.out.${gateway.name?cap_first}Gateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

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
    public void ${op.name?uncap_first}(/* TODO: define params from input model */) {
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
