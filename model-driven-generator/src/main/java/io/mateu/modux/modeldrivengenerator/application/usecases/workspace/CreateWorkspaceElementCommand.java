package io.mateu.modux.modeldrivengenerator.application.usecases.workspace;

import java.util.Map;

/**
 * Create a minimal element (id + name + the references that anchor it in the tree) of any catalog
 * type, optionally attaching its id to a parent's reference list so it is reachable/visible.
 *
 * @param typeName        element type name as in the catalog (e.g. "aggregates")
 * @param id              the new element's id (must be unique across the whole model)
 * @param name            the new element's name
 * @param elementRefs     extra reference fields to set on the element itself
 *                        (e.g. targetModuleId for a flow, serviceId for a gateway)
 * @param parentTypeName  type of the parent to attach to (null = no attachment)
 * @param parentId        id of the parent to attach to
 * @param parentListField the parent's id-list field the new id is appended to (e.g. "aggregateIds")
 */
public record CreateWorkspaceElementCommand(
        String typeName,
        String id,
        String name,
        Map<String, String> elementRefs,
        String parentTypeName,
        String parentId,
        String parentListField
) {

    /** An unattached element (global concepts like decisions). */
    public CreateWorkspaceElementCommand(String typeName, String id, String name) {
        this(typeName, id, name, Map.of(), null, null, null);
    }
}
