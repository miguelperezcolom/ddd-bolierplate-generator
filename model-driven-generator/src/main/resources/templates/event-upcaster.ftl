package ${upcasterPackage};

import java.util.Map;

/**
 * Upcasts older-schema payloads of ${eventLabel} up to the current schema version (v${schemaVersion}).
 *
 * <p>A two-zone hook: the generated zone declares the port; you implement the migration in the
 * developer-owned custom module ({@code Default${upcasterClass}}).
 */
public interface ${upcasterClass} {

    /**
     * Migrate a raw ${eventLabel} payload emitted at an older schema version up to the current one.
     *
     * @param payload     the decoded event payload (field name → value)
     * @param fromVersion the schemaVersion the payload was emitted with
     * @return the payload migrated to schema version ${schemaVersion}
     */
    Map<String, Object> upcast(Map<String, Object> payload, int fromVersion);
}
