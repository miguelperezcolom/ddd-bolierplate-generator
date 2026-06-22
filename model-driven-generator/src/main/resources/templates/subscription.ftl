package ${project.packageName}.${module.slug}.infra.in.async;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import lombok.RequiredArgsConstructor;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class ${subscription.name?cap_first}Subscription {

<#if subscription.actions?has_content>
<#list subscription.actions as action>
<#if action.type == "CallUseCase" && action.useCaseId?has_content>
    // inject use case: ${action.useCaseId}
    // final ${action.name?cap_first}UseCase ${action.name?uncap_first}UseCase;
</#if>
</#list>
</#if>

    @Bean
    public Consumer<Message<String>> ${subscription.name?uncap_first}() {
        return message -> {
            var payload = message.getPayload();
<#if subscription.actions?has_content>
<#list subscription.actions as action>
<#if action.type == "CallUseCase">
            // TODO: call use case for action "${action.name}"
            // ${action.name?uncap_first}UseCase.handle(...);
<#elseif action.type == "StartSaga">
            // TODO: start saga for action "${action.name}"
<#elseif action.type == "UpdateProjection">
            // TODO: update projection for action "${action.name}"
<#else>
            // TODO: custom action "${action.name}"
</#if>
</#list>
</#if>
        };
    }
}
