package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LintReportFormatterTest {

    @Test
    void clean_model_reports_success_and_no_errors() {
        assertEquals("Model lint passed: no findings.", LintReportFormatter.render(List.of()));
        assertFalse(LintReportFormatter.hasErrors(List.of()));
    }

    @Test
    void findings_are_summarized_and_errors_gate() {
        var findings = List.of(
                new LintFinding("lifecycle-coherence", LintSeverity.ERROR, "AggregateEntity", "a1", "Reserva",
                        "state 'x' is unreachable"),
                new LintFinding("open-decisions", LintSeverity.INFO, "DecisionEntity", "d1", null,
                        "decision is still open"));

        var report = LintReportFormatter.render(findings);

        assertTrue(report.contains("2 finding(s)"), report);
        assertTrue(report.contains("1 ERROR"), report);
        assertTrue(report.contains("1 INFO"), report);
        assertTrue(report.contains("[lifecycle-coherence] AggregateEntity 'Reserva'"), report);
        // falls back to the id when the element has no name
        assertTrue(report.contains("'d1'"), report);
        assertTrue(LintReportFormatter.hasErrors(findings));
    }

    @Test
    void warnings_alone_do_not_gate() {
        var findings = List.of(new LintFinding("tenancy-declared", LintSeverity.WARNING,
                "ProjectEntity", "p1", "Booking", "tenancy strategy not declared"));
        assertFalse(LintReportFormatter.hasErrors(findings));
    }
}
