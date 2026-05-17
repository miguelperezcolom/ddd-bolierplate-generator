<#assign moduleSlugVal = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${moduleSlugVal}.infra.in.ui.components;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Dashboard component: ${component.name}
 * Presentation type: ${component.presentationType!'default'}
 * Data source type: ${component.dataSourceType!''}
 * Generated from ComponentEntity id=${component.id}
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ${component.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Component {

<#if component.dataSourceType?? && component.dataSourceType == "QueryService" && component.queryServiceId??>
    // TODO: inject query service with id=${component.queryServiceId}
    // final SomeQueryService queryService;

    public Object getData() {
        // TODO: implement data retrieval using query service
        return null;
    }
<#elseif component.dataSourceType?? && component.dataSourceType == "Gateway" && component.gatewayId??>
    // TODO: inject gateway with id=${component.gatewayId}
    // final SomeGateway gateway;

    public Object getData() {
        // TODO: implement data retrieval using gateway
        return null;
    }
<#else>
    public Object getData() {
        // TODO: implement data retrieval
        return null;
    }
</#if>

}
