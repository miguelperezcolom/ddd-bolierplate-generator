package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapFinding;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Renders the context map as a self-contained SVG: bounded-context modules as nodes, strategic
 * {@link ContextMapRelationType} relations as solid directed edges, and runtime flows as dashed
 * edges coloured by their {@link FlowContextMapFinding.Status coherence status} (green = backed,
 * orange = missing relation with a suggestion, amber = reversed).
 *
 * <p>Pure and deterministic (fixed circular layout) so it is unit-testable and diff-stable.
 * Node ids carry no behaviour yet, but each node/edge is tagged with {@code data-*} ids so
 * interactivity (click-to-open) can be wired later through the Element's event map.
 */
public final class ContextMapSvgRenderer {

    public record Node(String id, String label, SubdomainType subdomain, boolean external) {
        /** A bounded-context node with no strategic classification. */
        public Node(String id, String label) {
            this(id, label, null, false);
        }
        /** An external-system node (drawn dashed, outside the strategic classification). */
        public static Node external(String id, String label) {
            return new Node(id, label, null, true);
        }
    }

    public record Relation(String sourceId, String targetId, ContextMapRelationType type) {}

    public record Flow(String sourceId, String targetId, String label,
                       FlowContextMapFinding.Status status, ContextMapRelationType suggestedType) {}

    private static final int W = 960;
    private static final int H = 640;
    private static final double CX = W / 2.0;
    private static final double CY = H / 2.0 + 10;
    private static final double R = 220;
    private static final double NODE_HW = 78;   // node half-width
    private static final double NODE_HH = 24;   // node half-height

    private ContextMapSvgRenderer() {}

    public static String viewBox() {
        return "0 0 " + W + " " + H;
    }

    /** The inner SVG markup (defs + edges + nodes + legend). Wrap in an {@code <svg>} Element. */
    public static String render(List<Node> nodes, List<Relation> relations, List<Flow> flows) {
        var pos = layout(nodes);
        var labels = new LinkedHashMap<String, String>();
        nodes.forEach(n -> labels.put(n.id(), n.label()));
        var sb = new StringBuilder();
        sb.append(defs());
        sb.append("<rect x=\"0\" y=\"0\" width=\"").append(W).append("\" height=\"").append(H)
                .append("\" fill=\"transparent\"/>");

        // edges first, so the node boxes sit on top of the line ends
        for (var rel : relations) {
            var s = pos.get(rel.sourceId());
            var t = pos.get(rel.targetId());
            if (s == null || t == null) continue;
            sb.append(relationEdge(s, t, rel.type(),
                    labelOf(labels, rel.sourceId()), labelOf(labels, rel.targetId())));
        }
        for (var flow : flows) {
            var s = pos.get(flow.sourceId());
            var t = pos.get(flow.targetId());
            if (s == null || t == null || flow.sourceId().equals(flow.targetId())) continue;
            sb.append(flowEdge(s, t, flow,
                    labelOf(labels, flow.sourceId()), labelOf(labels, flow.targetId())));
        }

        for (var node : nodes) {
            var p = pos.get(node.id());
            if (p == null) continue;
            sb.append(nodeBox(node, p));
        }

        sb.append(legend());
        return sb.toString();
    }

    // --- layout -------------------------------------------------------------

    private record Pt(double x, double y) {}

    private static Map<String, Pt> layout(List<Node> nodes) {
        var pos = new LinkedHashMap<String, Pt>();
        int n = nodes.size();
        if (n == 0) return pos;
        if (n == 1) {
            pos.put(nodes.get(0).id(), new Pt(CX, CY));
            return pos;
        }
        for (int i = 0; i < n; i++) {
            double angle = -Math.PI / 2 + i * 2 * Math.PI / n;
            pos.put(nodes.get(i).id(), new Pt(CX + R * Math.cos(angle), CY + R * Math.sin(angle)));
        }
        return pos;
    }

    /** Point on the node's rectangle border in the direction of {@code towards}. */
    private static Pt border(Pt node, Pt towards) {
        double dx = towards.x() - node.x();
        double dy = towards.y() - node.y();
        if (dx == 0 && dy == 0) return node;
        double sx = Math.abs(dx) < 1e-6 ? Double.MAX_VALUE : NODE_HW / Math.abs(dx);
        double sy = Math.abs(dy) < 1e-6 ? Double.MAX_VALUE : NODE_HH / Math.abs(dy);
        double s = Math.min(sx, sy);
        return new Pt(node.x() + dx * s, node.y() + dy * s);
    }

    // --- pieces -------------------------------------------------------------

    private static String defs() {
        return """
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
              </marker>
              <marker id="arrow-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
              </marker>
            </defs>
            """;
    }

    private static String relationEdge(Pt s, Pt t, ContextMapRelationType type, String sLabel, String tLabel) {
        var a = border(s, t);
        var b = border(t, s);
        double mx = (a.x() + b.x()) / 2;
        double my = (a.y() + b.y()) / 2;
        String tip = sLabel + " → " + tLabel + ": " + full(type);
        return "<line x1=\"" + f(a.x()) + "\" y1=\"" + f(a.y()) + "\" x2=\"" + f(b.x()) + "\" y2=\"" + f(b.y())
                + "\" stroke=\"#64748b\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"><title>" + esc(tip) + "</title></line>"
                + "<text x=\"" + f(mx) + "\" y=\"" + f(my - 4) + "\" text-anchor=\"middle\" "
                + "font-size=\"11\" font-family=\"sans-serif\" fill=\"#475569\">" + esc(abbrev(type))
                + "<title>" + esc(tip) + "</title></text>";
    }

    private static String flowEdge(Pt s, Pt t, Flow flow, String sLabel, String tLabel) {
        var a = border(s, t);
        var b = border(t, s);
        // perpendicular offset so a flow edge does not overlap the strategic edge on the same pair
        double dx = b.x() - a.x();
        double dy = b.y() - a.y();
        double len = Math.max(1, Math.hypot(dx, dy));
        double ox = -dy / len * 26;
        double oy = dx / len * 26;
        double cxp = (a.x() + b.x()) / 2 + ox;
        double cyp = (a.y() + b.y()) / 2 + oy;
        String color = flowColor(flow.status());
        String label = flowLabel(flow);
        String tip = (flow.label() != null ? flow.label() + ": " : "") + sLabel + " → " + tLabel
                + " — " + statusText(flow);
        return "<path d=\"M " + f(a.x()) + " " + f(a.y()) + " Q " + f(cxp) + " " + f(cyp) + " "
                + f(b.x()) + " " + f(b.y()) + "\" fill=\"none\" stroke=\"" + color
                + "\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\" marker-end=\"url(#arrow-flow)\"><title>"
                + esc(tip) + "</title></path>"
                + "<text x=\"" + f(cxp) + "\" y=\"" + f(cyp) + "\" text-anchor=\"middle\" "
                + "font-size=\"10\" font-family=\"sans-serif\" fill=\"" + color + "\">" + esc(label)
                + "<title>" + esc(tip) + "</title></text>";
    }

    private static String nodeBox(Node node, Pt p) {
        double x = p.x() - NODE_HW;
        double y = p.y() - NODE_HH;
        String fill = node.external() ? "#f8fafc" : subdomainFill(node.subdomain());
        String dash = node.external() ? " stroke-dasharray=\"6 4\"" : "";
        String tip = node.label()
                + (node.subdomain() != null ? " — " + node.subdomain().name().toLowerCase() + " subdomain" : "")
                + (node.external() ? " — external system" : "");
        // data-module-id + pointer cursor are the hooks for click-to-open (wired via the Element's
        // event map once the frontend navigation primitive is confirmed).
        return "<g data-module-id=\"" + esc(node.id()) + "\" style=\"cursor: pointer;\">"
                + "<title>" + esc(tip) + "</title>"
                + "<rect x=\"" + f(x) + "\" y=\"" + f(y) + "\" width=\"" + f(NODE_HW * 2) + "\" height=\"" + f(NODE_HH * 2)
                + "\" rx=\"8\" fill=\"" + fill + "\" stroke=\"#334155\" stroke-width=\"1.5\"" + dash + "/>"
                + "<text x=\"" + f(p.x()) + "\" y=\"" + f(p.y() + 4) + "\" text-anchor=\"middle\" "
                + "font-size=\"13\" font-family=\"sans-serif\" font-weight=\"600\" fill=\"#0f172a\">"
                + esc(truncate(node.label())) + "</text></g>";
    }

    private static String subdomainFill(SubdomainType subdomain) {
        if (subdomain == null) return "#ffffff";
        return switch (subdomain) {
            case CORE -> "#fef3c7";       // amber tint: invest here
            case SUPPORTING -> "#e0e7ff"; // indigo tint
            case GENERIC -> "#f1f5f9";    // slate tint: consider off-the-shelf
        };
    }

    private static String labelOf(Map<String, String> labels, String id) {
        var label = labels.get(id);
        return label != null ? label : id;
    }

    private static String statusText(Flow flow) {
        return switch (flow.status()) {
            case OK -> "backed by a strategic relation";
            case MISSING_RELATION -> flow.suggestedType() != null
                    ? "no strategic relation — suggests " + full(flow.suggestedType())
                    : "no strategic relation declared";
            case REVERSED -> "a relation exists but points the other way";
            case INTERNAL -> "same context";
            case EXTERNAL -> "external system";
        };
    }

    /** Full human name of a relation type, e.g. OPEN_HOST_SERVICE → "open host service". */
    static String full(ContextMapRelationType type) {
        if (type == null) return "";
        return type.name().toLowerCase().replace('_', ' ');
    }

    private static String legend() {
        var items = new ArrayList<String>();
        items.add(legendRow(0, "#64748b", false, "strategic relation"));
        items.add(legendRow(1, "#16a34a", true, "flow — backed by a relation"));
        items.add(legendRow(2, "#f59e0b", true, "flow — no relation (suggests a type)"));
        items.add(legendRow(3, "#d97706", true, "flow — relation points the other way"));
        items.add(legendSwatch(4, "#fef3c7", "core subdomain"));
        items.add(legendSwatch(5, "#e0e7ff", "supporting"));
        items.add(legendSwatch(6, "#f1f5f9", "generic"));
        items.add(legendSwatch(7, "#f8fafc", "external system (dashed)"));
        return "<g font-family=\"sans-serif\" font-size=\"11\" fill=\"#475569\">" + String.join("", items) + "</g>";
    }

    private static String legendSwatch(int i, String fill, String text) {
        double y = 12 + i * 18;
        return "<rect x=\"18\" y=\"" + f(y) + "\" width=\"22\" height=\"12\" rx=\"3\" fill=\"" + fill
                + "\" stroke=\"#334155\" stroke-width=\"0.8\"/>"
                + "<text x=\"50\" y=\"" + f(y + 10) + "\">" + esc(text) + "</text>";
    }

    private static String legendRow(int i, String color, boolean dashed, String text) {
        double y = 18 + i * 18;
        String dash = dashed ? " stroke-dasharray=\"5 4\"" : "";
        return "<line x1=\"14\" y1=\"" + f(y) + "\" x2=\"44\" y2=\"" + f(y) + "\" stroke=\"" + color
                + "\" stroke-width=\"1.5\"" + dash + "/>"
                + "<text x=\"50\" y=\"" + f(y + 4) + "\">" + esc(text) + "</text>";
    }

    // --- helpers ------------------------------------------------------------

    private static String flowColor(FlowContextMapFinding.Status status) {
        return switch (status) {
            case OK -> "#16a34a";
            case MISSING_RELATION -> "#f59e0b";
            case REVERSED -> "#d97706";
            default -> "#94a3b8";
        };
    }

    private static String flowLabel(Flow flow) {
        var base = flow.label() != null ? flow.label() : "";
        if (flow.status() == FlowContextMapFinding.Status.MISSING_RELATION && flow.suggestedType() != null) {
            return base + " (→ " + abbrev(flow.suggestedType()) + "?)";
        }
        return base;
    }

    static String abbrev(ContextMapRelationType type) {
        if (type == null) return "";
        return switch (type) {
            case PARTNERSHIP -> "P";
            case SHARED_KERNEL -> "SK";
            case CUSTOMER_SUPPLIER -> "C/S";
            case CONFORMIST -> "CF";
            case OPEN_HOST_SERVICE -> "OHS";
            case ANTI_CORRUPTION_LAYER -> "ACL";
            case PUBLISHED_LANGUAGE -> "PL";
            case SEPARATE_WAYS -> "SW";
        };
    }

    private static String truncate(String label) {
        if (label == null) return "";
        return label.length() > 18 ? label.substring(0, 17) + "…" : label;
    }

    private static String esc(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
    }

    /** Trims trailing zeros so the SVG output stays compact and diff-stable. */
    private static String f(double v) {
        if (v == Math.rint(v)) return Integer.toString((int) Math.rint(v));
        return String.valueOf(Math.round(v * 100) / 100.0);
    }
}
