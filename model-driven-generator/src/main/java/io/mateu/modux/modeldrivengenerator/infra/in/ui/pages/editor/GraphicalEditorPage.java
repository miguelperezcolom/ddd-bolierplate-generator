package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.editor;

import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Element;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ActionHandler;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Map;

/**
 * Embeds the graphical model editor (editor/ package) as a web component. The
 * {@code import} attribute makes Mateu's element renderer dynamically load the
 * bundle that defines the tag; the component then talks to
 * {@code /modux/editor} (EditorApiController) on the same origin — model in,
 * commands and layout out.
 *
 * <p>Double click on the canvas raises {@code modux-activate}, wired through the
 * element's event map to {@link #handleAction} — which navigates to the
 * element's CRUD page (routes derive from the @Menu tree).
 */
@Service
@Scope("prototype")
@Title("Editor gráfico")
@lombok.RequiredArgsConstructor
public class GraphicalEditorPage implements ComponentTreeSupplier, ActionHandler {

    private final org.springframework.context.ApplicationContext context;

    /** elementType (as emitted by the editor views) → CRUD listing route. */
    private static final Map<String, String> CRUD_ROUTES = Map.ofEntries(
            Map.entry("module", "/modelo/organizacion/modules"),
            Map.entry("service", "/modelo/organizacion/services"),
            Map.entry("aggregate", "/modelo/domainModel/aggregates"),
            Map.entry("entity", "/modelo/domainModel/entities"),
            Map.entry("model", "/modelo/domainModel/models"),
            Map.entry("flow", "/modelo/patrones/flows"),
            Map.entry("workflow", "/modelo/patrones/workflows"),
            Map.entry("workflow-gateway", "/modelo/patrones/workflowGateways"),
            Map.entry("use-case", "/modelo/behaviour/useCases"),
            Map.entry("mapping", "/modelo/behaviour/modelMappings"),
            Map.entry("domain-event", "/modelo/domainModel/domainEvents"),
            Map.entry("subscription", "/modelo/inbound/subscriptions"),
            Map.entry("scheduled-trigger", "/modelo/inbound/scheduledTriggers"),
            Map.entry("projection", "/modelo/behaviour/projections"),
            Map.entry("read-model", "/modelo/patrones/readModels"),
            Map.entry("page", "/modelo/inbound/ui/pages"),
            Map.entry("component", "/modelo/inbound/ui/components"),
            Map.entry("ui-adapter", "/modelo/inbound/ui/uiAdapters"),
            Map.entry("query-service", "/modelo/outbound/queryServices"),
            Map.entry("actor", "/modelo/security/roles"),
            Map.entry("external-system", "/modelo/organizacion/externalSystems"),
            Map.entry("code-module", "/modelo/organizacion/codeModules"),
            Map.entry("custom-code", "/modelo/behaviour/customCodes"),
            Map.entry("transformation", "/modelo/behaviour/transformations"),
            Map.entry("etl-flow", "/modelo/patrones/etlFlows"),
            Map.entry("button-group", "/modelo/inbound/ui/buttonGroups"),
            Map.entry("identity-provider", "/modelo/security/identityProviders"),
            Map.entry("ai-agent", "/modelo/ia/aiAgents"),
            Map.entry("rag", "/modelo/ia/rags"),
            Map.entry("mcp-gateway", "/modelo/ia/mcpGateways"));

    /**
     * elementType → the CRUD adapter that loads its DETAIL view. The double click
     * opens mateu's own drawer with that read-only detail inside — the editor only
     * emits the event; mateu draws.
     */
    private static final Map<String, Class<?>> ADAPTERS = Map.ofEntries(
            Map.entry("module", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module.ModuleCrudAdapter.class),
            Map.entry("service", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.service.ServiceCrudAdapter.class),
            Map.entry("aggregate", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aggregate.AggregateCrudAdapter.class),
            Map.entry("entity", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.entity.EntityCrudAdapter.class),
            Map.entry("model", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.model.ModelCrudAdapter.class),
            Map.entry("flow", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowCrudAdapter.class),
            Map.entry("workflow", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow.WorkflowCrudAdapter.class),
            Map.entry("workflow-gateway", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway.WorkflowGatewayCrudAdapter.class),
            Map.entry("use-case", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.usecase.UseCaseCrudAdapter.class),
            Map.entry("mapping", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelmapping.ModelMappingCrudAdapter.class),
            Map.entry("domain-event", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.domainevent.DomainEventCrudAdapter.class),
            Map.entry("subscription", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.subscription.SubscriptionCrudAdapter.class),
            Map.entry("scheduled-trigger", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.scheduledtrigger.ScheduledTriggerCrudAdapter.class),
            Map.entry("projection", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.projection.ProjectionCrudAdapter.class),
            Map.entry("read-model", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudAdapter.class),
            Map.entry("page", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page.PageCrudAdapter.class),
            Map.entry("component", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.component.ComponentCrudAdapter.class),
            Map.entry("ui-adapter", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uiadapter.UiAdapterCrudAdapter.class),
            Map.entry("query-service", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice.QueryServiceCrudAdapter.class),
            Map.entry("actor", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.role.RoleCrudAdapter.class),
            Map.entry("external-system", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.externalsystem.ExternalSystemCrudAdapter.class),
            Map.entry("code-module", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.codemodule.CodeModuleCrudAdapter.class),
            Map.entry("custom-code", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.customcode.CustomCodeCrudAdapter.class),
            Map.entry("transformation", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.transformation.TransformationCrudAdapter.class),
            Map.entry("etl-flow", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.etlflow.EtlFlowCrudAdapter.class),
            Map.entry("button-group", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup.ButtonGroupCrudAdapter.class),
            Map.entry("identity-provider", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider.IdentityProviderCrudAdapter.class),
            Map.entry("ai-agent", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aiagent.AiAgentCrudAdapter.class),
            Map.entry("rag", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.rag.RagCrudAdapter.class),
            Map.entry("mcp-gateway", io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.mcpgateway.McpGatewayCrudAdapter.class));

    /**
     * Cache-busting fingerprint of the editor bundle. A rebuilt bundle gets a new URL, so
     * neither the browser's HTTP cache nor the tab's ES-module map can keep serving stale
     * editor code (dynamic imports are cached per-URL for the life of the page).
     */
    private static volatile String bundleVersion;

    private static String bundleVersion() {
        if (bundleVersion == null) {
            try (var in = GraphicalEditorPage.class
                    .getResourceAsStream("/static/modux-editor/modux-editor.js")) {
                var crc = new java.util.zip.CRC32();
                var buffer = new byte[8192];
                for (int n; in != null && (n = in.read(buffer)) > 0; ) crc.update(buffer, 0, n);
                bundleVersion = Long.toHexString(crc.getValue());
            } catch (Exception e) {
                bundleVersion = "0";
            }
        }
        return bundleVersion;
    }

    @Override
    public Component component(HttpRequest httpRequest) {
        var editor = new Element(
                "modux-editor-connected",
                Map.of(
                        "import", "/modux-editor/modux-editor.js?v=" + bundleVersion(),
                        "base", "/modux/editor",
                        "style", "display: block; height: calc(100vh - 220px); min-height: 480px;"),
                Map.of("modux-activate", "openElement"),
                null,
                null,
                null);
        return PageView.builder()
                .title("Editor gráfico")
                .subtitle("Context map, agregados, flows, procesos y eventstorming sobre lienzo editable — los cambios se guardan en el modelo.")
                .content(List.of(editor))
                .build();
    }

    @Override
    public List<String> supportedActions() {
        return List.of("openElement");
    }

    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public Object handleAction(String actionId, HttpRequest httpRequest) {
        if (!"openElement".equals(actionId)) return null;
        var event = (Map<String, Object>) httpRequest.runActionRq().parameters().get("event");
        if (event == null) return null;
        var type = (String) event.get("elementType");
        var id = (String) event.get("id");
        var route = CRUD_ROUTES.get(type);
        if (id == null) return null;
        var adapterClass = ADAPTERS.get(type);
        if (adapterClass == null) {
            return route == null ? null : URI.create(route + "/" + id + "/edit");
        }
        Object viewModel;
        try {
            viewModel = ((io.mateu.uidl.interfaces.CrudAdapter) context.getBean(adapterClass))
                    .getView(id, httpRequest);
        } catch (RuntimeException e) {
            // the detail could not load (stale id, scoped store…): fall back to navigating
            return route == null ? null : URI.create(route + "/" + id + "/edit");
        }
        // The DETAIL, read-only, without the crud toolbar: no «Back to list» here —
        // the drawer overlays the diagram, there is no listing to go back to.
        var content = new java.util.ArrayList<io.mateu.uidl.fluent.Component>(
                io.mateu.core.domain.out.componentmapper.PageFormBuilder.getView(
                        viewModel, "base_url",
                        httpRequest.runActionRq().route(),
                        httpRequest.runActionRq().consumedRoute(),
                        httpRequest.runActionRq().initiatorComponentId(),
                        httpRequest, true, false));
        return io.mateu.uidl.data.Drawer.builder()
                .id("modux-element-drawer")
                .headerTitle(String.valueOf(viewModel))
                // the drawer's state: the viewmodel, serialized the mateu way (field
                // access — our viewmodels have no getters)
                .initialData(io.mateu.core.infra.JsonSerializer.fromJson(
                        io.mateu.core.infra.JsonSerializer.toJson(viewModel)))
                .content(io.mateu.uidl.data.VerticalLayout.builder()
                        .content(content)
                        .spacing(true)
                        .build())
                .position(io.mateu.uidl.data.DrawerPosition.end)
                .width("560px")
                .build();
    }
}
