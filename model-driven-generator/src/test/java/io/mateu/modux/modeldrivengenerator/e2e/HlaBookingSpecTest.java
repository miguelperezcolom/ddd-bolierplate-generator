package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintSeverity;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Validates the HLA booking sample spec (sample/hla-booking) — the real-world exercise of
 * authoring a full enterprise system (write side + legacy PMS coexistence) as a modux model:
 * referentially clean, no lint ERRORs, and the deliberate PII-cross-context warning present
 * (the linter is the feedback loop for AI-authored specs).
 */
@SpringBootTest
class HlaBookingSpecTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Autowired
    CheckModelUseCase checkModelUseCase;

    @Autowired
    ModelLintService lintService;

    @Test
    void hla_booking_spec_is_clean_and_lints_as_expected() throws Exception {
        // work on a throwaway copy — loadFrom writes the generated schema next to the store
        var temp = java.nio.file.Files.createTempDirectory("hla-spec-test")
                .resolve("model-driven-store.yaml");
        java.nio.file.Files.copy(
                java.nio.file.Path.of("..", "sample", "hla-booking", "model-driven-store.yaml"), temp);
        repository.loadFrom(temp.toAbsolutePath().toString());

        // 1. referentially clean
        var violations = checkModelUseCase.check();
        assertEquals(0, violations.size(), "dangling references:\n"
                + violations.stream().map(Object::toString).reduce("", (a, b) -> a + "\n  - " + b));

        // 2. the intent layer loaded (processes are first-class)
        assertEquals(2, repository.findAllOfType(ProcessEntity.class).size());

        // 3. the HLA's ADR table travels IN the model (D1..D13), referenced via decisionIds —
        //    integrity (step 1) already proved no reference points at a missing decision
        assertEquals(13, repository.findAllOfType(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity.class).size());

        // 3. lint: no ERRORs; the deliberate PII-cross-context warning IS caught
        var findings = lintService.lint();
        findings.forEach(f -> System.out.println("  [" + f.severity() + "] " + f.ruleId()
                + " · " + f.elementType() + " " + f.elementName() + " — " + f.message()));

        assertTrue(findings.stream().noneMatch(f -> f.severity() == LintSeverity.ERROR),
                "the spec has lint ERRORs");
        assertTrue(findings.stream().anyMatch(f -> "pii-cross-context".equals(f.ruleId())
                        && f.message().contains("holderEmail")),
                "the deliberate PII exposure (holderEmail in the NOTIFIES flow) should be flagged");
    }
}
