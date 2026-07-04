package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelhealth;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintFinding;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintSeverity;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Markdown;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Read-only report of every problem the model linter finds — referential integrity errors plus the
 * architectural rule catalog — grouped by severity. The model validating itself before generation
 * is the core payoff of being model-driven (and the feedback loop for AI-authored specs).
 */
@Service
@Scope("prototype")
@Title("Model health")
@RequiredArgsConstructor
public class ModelHealthPage implements ComponentTreeSupplier {

    final ModelLintService lintService;

    @Override
    public Component component(HttpRequest httpRequest) {
        var findings = lintService.lint();
        var md = new StringBuilder();
        if (findings.isEmpty()) {
            md.append("✅ **No findings.** The model is coherent and follows the pattern catalog.");
        } else {
            summary(md, findings);
            section(md, findings, LintSeverity.ERROR, "Errors", "the model is inconsistent — fix before generating");
            section(md, findings, LintSeverity.WARNING, "Warnings", "likely mistakes or risky defaults");
            section(md, findings, LintSeverity.INFO, "Advice", "missing patterns or classifications");
        }

        return PageView.builder()
                .title("Model health")
                .subtitle("What the model linter finds: integrity errors, risky defaults and missing patterns.")
                .content(List.of(new Markdown(md.toString(), null, null)))
                .build();
    }

    private static void summary(StringBuilder md, List<LintFinding> findings) {
        long errors = count(findings, LintSeverity.ERROR);
        long warnings = count(findings, LintSeverity.WARNING);
        long infos = count(findings, LintSeverity.INFO);
        md.append("**").append(errors).append(" errors · ")
                .append(warnings).append(" warnings · ")
                .append(infos).append(" advice**\n\n");
    }

    private static void section(StringBuilder md, List<LintFinding> findings, LintSeverity severity,
                                String title, String hint) {
        var subset = findings.stream().filter(f -> f.severity() == severity).toList();
        if (subset.isEmpty()) return;
        md.append("## ").append(icon(severity)).append(" ").append(title)
                .append("\n\n_").append(hint).append("_\n\n");
        md.append("| Element | Rule | Finding |\n|---|---|---|\n");
        for (var f : subset) {
            md.append("| ").append(f.elementType()).append(" **").append(nvl(f.elementName())).append("**")
                    .append(" | `").append(f.ruleId()).append("`")
                    .append(" | ").append(f.message()).append(" |\n");
        }
        md.append("\n");
    }

    private static long count(List<LintFinding> findings, LintSeverity severity) {
        return findings.stream().filter(f -> f.severity() == severity).count();
    }

    private static String icon(LintSeverity severity) {
        return switch (severity) {
            case ERROR -> "🔴";
            case WARNING -> "🟠";
            case INFO -> "🔵";
        };
    }

    private static String nvl(String s) {
        return s == null ? "—" : s;
    }
}
