<#assign mpkg = module.name?lower_case?replace("[^a-z0-9]","",'r')>
package ${project.packageName}.${mpkg}.infra.out.persistence;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.util.Map;
<#if domainEvents?has_content>
<#list domainEvents as ev>
import ${project.packageName}.${mpkg}.domain.events.${ev}Event;
</#list>
</#if>

/** Decodes a stored event payload back to its domain event type, by the stored event-type name. */
@Component
public class ${aggregate.name}EventCodec {

    private final ObjectMapper objectMapper;

    private final Map<String, Class<?>> types = Map.ofEntries(
<#if domainEvents?has_content>
<#list domainEvents as ev>
            Map.entry("${ev}Event", ${ev}Event.class)<#sep>,</#sep>
</#list>
</#if>
    );

    public ${aggregate.name}EventCodec(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /** Decode a payload to its registered domain event type, or to a {@link Map} if the type is unknown. */
    @SneakyThrows
    public Object decode(String eventType, String payload) {
        Class<?> type = types.getOrDefault(eventType, Map.class);
        return objectMapper.readValue(payload, type);
    }
}
