package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import java.util.List;
import java.util.stream.Collectors;

/** Renders lint findings for the console (CLI gate and watch mode). */
public final class LintReportFormatter {

    private LintReportFormatter() {
    }

    public static boolean hasErrors(List<LintFinding> findings) {
        return findings.stream().anyMatch(f -> f.severity() == LintSeverity.ERROR);
    }

    public static String render(List<LintFinding> findings) {
        if (findings.isEmpty()) {
            return "Model lint passed: no findings.";
        }
        var counts = findings.stream().collect(Collectors.groupingBy(
                LintFinding::severity, java.util.TreeMap::new, Collectors.counting()));
        var summary = counts.entrySet().stream()
                .map(e -> e.getValue() + " " + e.getKey())
                .collect(Collectors.joining(", "));
        var lines = findings.stream()
                .map(f -> String.format("  %-7s [%s] %s '%s': %s", f.severity(), f.ruleId(), f.elementType(),
                        f.elementName() != null ? f.elementName() : f.elementId(), f.message()))
                .collect(Collectors.joining("\n"));
        return "Model lint: " + findings.size() + " finding(s) — " + summary + "\n" + lines;
    }
}
