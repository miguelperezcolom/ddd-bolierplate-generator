package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatehla;

import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService.ElementChange;
import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService.SolutionDiff;

import java.util.Comparator;
import java.util.Map;

/**
 * The «Qué cambia respecto al sistema» section of a solution's HLA: the semantic diff
 * as a reviewable table — element, kind of change, and the decisions that justify it.
 * Pure function: diff in, markdown out.
 */
public final class SolutionDiffRenderer {

    private SolutionDiffRenderer() {}

    private static final Map<String, String> KIND_LABEL = Map.of(
            "ADDED", "＋ nuevo",
            "MODIFIED", "～ modificado",
            "REMOVED", "－ eliminado");

    /** Element types in reading order (strategic → domain → behaviour → integration). */
    private static final Map<String, Integer> TYPE_ORDER = Map.ofEntries(
            Map.entry("projects", 0), Map.entry("services", 1), Map.entry("boundedContexts", 2),
            Map.entry("aggregates", 3), Map.entry("entities", 4), Map.entry("models", 5),
            Map.entry("useCases", 6), Map.entry("domainEvents", 7),
            Map.entry("applicationEvents", 8), Map.entry("flows", 9),
            Map.entry("processes", 10), Map.entry("workflows", 11),
            Map.entry("subscriptions", 12), Map.entry("projections", 13),
            Map.entry("readModels", 14), Map.entry("queryServices", 15),
            Map.entry("aiAgents", 16), Map.entry("rags", 17), Map.entry("decisions", 18));

    public static String render(SolutionDiff diff, String solutionName) {
        var out = new StringBuilder();
        out.append("## Qué cambia respecto al sistema\n\n");
        out.append("_Solución «").append(solutionName).append("» (rama `").append(diff.branch())
                .append("`) — ").append(diff.added()).append(" nuevos, ")
                .append(diff.modified()).append(" modificados, ")
                .append(diff.removed()).append(" eliminados._\n\n");
        out.append("| Cambio | Tipo | Elemento | Decisiones |\n");
        out.append("|---|---|---|---|\n");
        diff.changes().stream()
                .sorted(Comparator
                        .comparingInt((ElementChange c) -> TYPE_ORDER.getOrDefault(c.type(), 99))
                        .thenComparing(ElementChange::kind)
                        .thenComparing(c -> c.name() != null ? c.name() : c.id()))
                .forEach(c -> out.append("| ").append(KIND_LABEL.getOrDefault(c.kind(), c.kind()))
                        .append(" | ").append(c.type())
                        .append(" | ").append(c.name() != null ? c.name() : c.id())
                        .append(" `").append(c.id()).append("`")
                        .append(" | ").append(String.join(", ", c.decisionIds()))
                        .append(" |\n"));
        return out.toString();
    }
}
