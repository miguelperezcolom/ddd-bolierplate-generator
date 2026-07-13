package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapFinding;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ContextMapSvgRendererTest {

    @Test
    void renders_nodes_relations_and_flows_with_status_colours() {
        var nodes = List.of(
                new ContextMapSvgRenderer.Node("mod-reservas", "Reservas"),
                new ContextMapSvgRenderer.Node("mod-frontoffice", "FrontOffice"));
        var relations = List.of(
                new ContextMapSvgRenderer.Relation("mod-reservas", "mod-frontoffice",
                        ContextMapRelationType.OPEN_HOST_SERVICE));
        var flows = List.of(
                new ContextMapSvgRenderer.Flow("mod-reservas", "mod-frontoffice", "ReservaVisible",
                        FlowContextMapFinding.Status.MISSING_RELATION, ContextMapRelationType.CUSTOMER_SUPPLIER));

        var svg = ContextMapSvgRenderer.render(nodes, relations, flows);

        // both nodes present, tagged for future interactivity
        assertTrue(svg.contains("data-boundedContext-id=\"mod-reservas\""));
        assertTrue(svg.contains("data-boundedContext-id=\"mod-frontoffice\""));
        assertTrue(svg.contains(">Reservas<"));
        // strategic relation drawn with its abbreviation
        assertTrue(svg.contains(">OHS<"));
        // missing-relation flow drawn in amber with the suggested type hint
        assertTrue(svg.contains("#f59e0b"));
        assertTrue(svg.contains("C/S?"));
        // hover tooltips carry the full, untruncated names
        assertTrue(svg.contains("<title>Reservas</title>"));
        assertTrue(svg.contains("open host service"));           // relation tooltip, full type name
        assertTrue(svg.contains("suggests customer supplier"));  // flow tooltip, coherence hint
    }

    @Test
    void skips_edges_whose_endpoints_are_unknown() {
        var nodes = List.of(new ContextMapSvgRenderer.Node("a", "A"));
        var relations = List.of(
                new ContextMapSvgRenderer.Relation("a", "ghost", ContextMapRelationType.CONFORMIST));

        var svg = ContextMapSvgRenderer.render(nodes, relations, List.of());

        assertTrue(svg.contains("data-boundedContext-id=\"a\""));
        assertFalse(svg.contains("marker-end")); // no edge rendered toward the missing node
    }

    @Test
    void escapes_labels_to_keep_the_svg_well_formed() {
        var nodes = List.of(new ContextMapSvgRenderer.Node("x", "A & <b>B</b>"));

        var svg = ContextMapSvgRenderer.render(nodes, List.of(), List.of());

        assertTrue(svg.contains("A &amp; &lt;b&gt;"));
        assertFalse(svg.contains("<b>B</b>"));
    }
}
