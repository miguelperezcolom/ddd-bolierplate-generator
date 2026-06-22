package ${project.packageName}.${module.slug}.infra.in.projection;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import lombok.RequiredArgsConstructor;
import java.util.function.Consumer;

@Configuration
@RequiredArgsConstructor
public class ${projection.name?cap_first}Projection {

<#if projection.handlers?has_content>
<#list projection.handlers as handler>
    @Bean
    public Consumer<Message<String>> ${handler.name?uncap_first?replace("[^a-zA-Z0-9]","",'r')}() {
        return message -> {
            var payload = message.getPayload();
<#if handler.type == "Create">
            // TODO: create ${projection.name} read model entry from event payload
<#elseif handler.type == "Update">
            // TODO: update ${projection.name} read model entry using event payload
<#elseif handler.type == "Delete">
            // TODO: delete ${projection.name} read model entry using event payload
<#elseif handler.type == "Upsert">
            // TODO: upsert ${projection.name} read model entry from event payload
<#else>
            // TODO: custom handler "${handler.name}"
</#if>
<#if handler.modelMappingId?? && handler.modelMappingId?has_content>
            // Apply model mapping: ${handler.modelMappingId}
</#if>
        };
    }

</#list>
<#else>
    @Bean
    public Consumer<Message<String>> ${projection.name?uncap_first}() {
        return message -> {
            var payload = message.getPayload();
            // TODO: handle event and update ${projection.name} read model
        };
    }
</#if>
}
