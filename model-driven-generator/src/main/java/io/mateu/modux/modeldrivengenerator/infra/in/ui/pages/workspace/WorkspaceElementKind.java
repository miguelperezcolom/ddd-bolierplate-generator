package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

/**
 * What can be created from the workspace tree, and how each kind anchors itself in the model:
 * either attached to a parent's id list ({@code parentListField}, e.g. module.aggregateIds) or via
 * a reference field on the element itself ({@code ownRefField}, e.g. flow.targetModuleId).
 */
public enum WorkspaceElementKind {

    AGGREGATE("aggregates", Scope.MODULE, "aggregateIds", null),
    ENTITY("entities", Scope.MODULE, "entityIds", null),
    VALUE_OBJECT("valueObjects", Scope.MODULE, "valueObjectIds", null),
    DOMAIN_EVENT("domainEvents", Scope.MODULE, "domainEventIds", null),
    USE_CASE("useCases", Scope.MODULE, "useCaseIds", null),
    PROJECTION("projections", Scope.MODULE, "projectionIds", null),
    READ_MODEL("readModels", Scope.MODULE, "readModelIds", null),
    SUBSCRIPTION("subscriptions", Scope.MODULE, "subscriptionIds", null),
    SAGA("sagas", Scope.MODULE, "sagaIds", null),
    SCHEDULED_TRIGGER("scheduledTriggers", Scope.MODULE, "scheduledTriggerIds", null),
    FLOW("flows", Scope.MODULE, null, "targetModuleId"),
    PROCESS("processes", Scope.MODULE, null, "ownerModuleId"),
    QUERY_SERVICE("queryServices", Scope.MODULE, null, "moduleId"),
    INTEGRATION_EVENT("integrationEvents", Scope.MODULE, null, "moduleId"),
    GATEWAY("gateways", Scope.SERVICE, "gatewayIds", "serviceId"),
    MODULE("modules", Scope.SERVICE, "moduleIds", null),
    SERVICE("services", Scope.PROJECT, "serviceIds", null),
    DECISION("decisions", Scope.GLOBAL, null, null);

    /** Which parent the kind needs: a module, a service, a project, or none. */
    public enum Scope { MODULE, SERVICE, PROJECT, GLOBAL }

    private final String typeName;
    private final Scope scope;
    private final String parentListField;
    private final String ownRefField;

    WorkspaceElementKind(String typeName, Scope scope, String parentListField, String ownRefField) {
        this.typeName = typeName;
        this.scope = scope;
        this.parentListField = parentListField;
        this.ownRefField = ownRefField;
    }

    public String typeName() {
        return typeName;
    }

    public Scope scope() {
        return scope;
    }

    /** The parent's id-list field the new id is appended to, or null when not list-attached. */
    public String parentListField() {
        return parentListField;
    }

    /** The element's own reference field pointing at the parent, or null. */
    public String ownRefField() {
        return ownRefField;
    }

    /** The catalog type name of the parent this kind attaches to (null for GLOBAL). */
    public String parentTypeName() {
        return switch (scope) {
            case MODULE -> "modules";
            case SERVICE -> "services";
            case PROJECT -> "projects";
            case GLOBAL -> null;
        };
    }
}
