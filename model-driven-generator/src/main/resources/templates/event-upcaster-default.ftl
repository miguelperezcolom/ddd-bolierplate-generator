package ${project.packageName}.custom;

import ${upcasterPackage}.${upcasterClass};
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Developer-owned upcaster for ${eventLabel}. Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${upcasterClass} implements ${upcasterClass} {

    @Override
    public Map<String, Object> upcast(Map<String, Object> payload, int fromVersion) {
        // TODO: migrate ${eventLabel} payloads from `fromVersion` up to schema version ${schemaVersion}.
        // For example, add fields introduced in later versions with sensible defaults, or rename keys.
        // Until implemented, the payload is passed through unchanged.
        return payload;
    }
}
