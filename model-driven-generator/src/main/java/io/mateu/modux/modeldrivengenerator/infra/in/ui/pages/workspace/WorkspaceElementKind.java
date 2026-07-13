package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

/**
 * What can be created from the workspace tree, and how each kind anchors itself in the model:
 * either attached to a parent's id list ({@code parentListField}, e.g. boundedContext.aggregateIds) or via
 * a reference field on the element itself ({@code ownRefField}, e.g. flow.targetBoundedContextId).
 */
public enum WorkspaceElementKind {

    AGGREGATE("aggregates", Scope.BOUNDED_CONTEXT, "aggregateIds", null),
    ENTITY("entities", Scope.BOUNDED_CONTEXT, "entityIds", null),
    VALUE_OBJECT("valueObjects", Scope.BOUNDED_CONTEXT, "valueObjectIds", null),
    DOMAIN_EVENT("domainEvents", Scope.BOUNDED_CONTEXT, "domainEventIds", null),
    USE_CASE("useCases", Scope.BOUNDED_CONTEXT, "useCaseIds", null),
    PROJECTION("projections", Scope.BOUNDED_CONTEXT, "projectionIds", null),
    READ_MODEL("readModels", Scope.BOUNDED_CONTEXT, "readModelIds", null),
    SUBSCRIPTION("subscriptions", Scope.BOUNDED_CONTEXT, "subscriptionIds", null),
    SAGA("sagas", Scope.BOUNDED_CONTEXT, "sagaIds", null),
    SCHEDULED_TRIGGER("scheduledTriggers", Scope.BOUNDED_CONTEXT, "scheduledTriggerIds", null),
    FLOW("flows", Scope.BOUNDED_CONTEXT, null, "targetBoundedContextId"),
    PROCESS("processes", Scope.BOUNDED_CONTEXT, null, "ownerBoundedContextId"),
    QUERY_SERVICE("queryServices", Scope.BOUNDED_CONTEXT, null, "boundedContextId"),
    INTEGRATION_EVENT("integrationEvents", Scope.BOUNDED_CONTEXT, null, "boundedContextId"),
    GATEWAY("gateways", Scope.SERVICE, "gatewayIds", "serviceId"),
    BOUNDED_CONTEXT("boundedContexts", Scope.SERVICE, "boundedContextIds", null),
    SERVICE("services", Scope.PROJECT, "serviceIds", null),
    DECISION("decisions", Scope.GLOBAL, null, null);

    /** Which parent the kind needs: a boundedContext, a service, a project, or none. */
    public enum Scope { BOUNDED_CONTEXT, SERVICE, PROJECT, GLOBAL }

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
            case BOUNDED_CONTEXT -> "boundedContexts";
            case SERVICE -> "services";
            case PROJECT -> "projects";
            case GLOBAL -> null;
        };
    }
}
