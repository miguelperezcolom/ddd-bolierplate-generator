package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapFinding;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Element;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Read-only view under <em>Patrones</em> that draws the project's context map: bounded contexts as
 * nodes, strategic relations as solid edges, and runtime flows overlaid as dashed edges coloured by
 * their coherence with the declared relations (see {@link FlowContextMapCoherenceService}).
 *
 * <p>The diagram is a server-rendered SVG ({@link ContextMapSvgRenderer}) embedded through a generic
 * {@link Element}, so no bespoke frontend component is needed and interactivity can be layered on
 * later via the element's event map.
 */
@Service
@Scope("prototype")
@Title("Context map")
@RequiredArgsConstructor
public class ContextMapDiagramPage implements ComponentTreeSupplier {

    final ModelStore repository;
    final FlowContextMapCoherenceService coherenceService;

    @Override
    public Component component(HttpRequest httpRequest) {
        var nodes = new java.util.ArrayList<ContextMapSvgRenderer.Node>();
        repository.findAllOfType(BoundedContextEntity.class).forEach(m ->
                nodes.add(new ContextMapSvgRenderer.Node(m.id(), m.name(), m.subdomainType(), false)));
        repository.findAllOfType(ProjectEntity.class).forEach(p ->
                p.externalSystems().forEach(x ->
                        nodes.add(ContextMapSvgRenderer.Node.external(x.id(), x.name()))));

        var relations = repository.findAllOfType(ProjectEntity.class).stream()
                .flatMap(p -> p.contextMap().stream())
                .map(ContextMapDiagramPage::toRelation)
                .toList();

        var flows = coherenceService.analyze().stream()
                .filter(f -> f.sourceBoundedContextId() != null && f.targetBoundedContextId() != null)
                .filter(f -> f.status() == FlowContextMapFinding.Status.OK
                        || f.status() == FlowContextMapFinding.Status.MISSING_RELATION
                        || f.status() == FlowContextMapFinding.Status.REVERSED)
                .map(f -> new ContextMapSvgRenderer.Flow(
                        f.sourceBoundedContextId(), f.targetBoundedContextId(), f.flowName(), f.status(), f.suggestedType()))
                .toList();

        var svg = "<svg viewBox=\"" + ContextMapSvgRenderer.viewBox() + "\" xmlns=\"http://www.w3.org/2000/svg\" "
                + "width=\"100%\" style=\"max-width: 960px; height: auto;\">"
                + ContextMapSvgRenderer.render(nodes, relations, flows)
                + "</svg>";

        // Inline SVG rendered as raw HTML (Element.html), so tooltips and future click handlers on
        // the nodes keep working — unlike an <img>, which would flatten it.
        var diagram = Element.html("div", Map.of("style", "width: 100%; overflow: auto;"), svg);

        return PageView.builder()
                .title("Context map")
                .subtitle("Bounded contexts, strategic relations, and the runtime flows that cross them.")
                .content(List.of(diagram))
                .build();
    }

    private static ContextMapSvgRenderer.Relation toRelation(ContextMapRelationEntity r) {
        return new ContextMapSvgRenderer.Relation(r.sourceBoundedContextId(), r.targetBoundedContextId(), parseType(r.type()));
    }

    private static ContextMapRelationType parseType(String type) {
        if (type == null) return null;
        try {
            return ContextMapRelationType.valueOf(type);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
