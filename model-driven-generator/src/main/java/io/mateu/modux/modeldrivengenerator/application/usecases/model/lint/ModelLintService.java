package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * The model linter: referential integrity ({@link CheckModelUseCase}, as ERROR findings) plus the
 * architectural/semantic {@link LintRules rule catalog}. This is the unique payoff of having a
 * model: the system can be validated <em>before</em> a line of code is generated — and it doubles
 * as the feedback loop for AI-authored specs (generate → lint → fix → regenerate).
 */
@Service
@RequiredArgsConstructor
public class ModelLintService {

    private final CommonFileRepository repository;
    private final CheckModelUseCase checkModelUseCase;

    public List<LintFinding> lint() {
        var findings = new ArrayList<LintFinding>();

        // 1. referential integrity — dangling ids are always errors
        checkModelUseCase.check().forEach(v -> findings.add(new LintFinding(
                "referential-integrity", LintSeverity.ERROR,
                v.elementType(), v.elementId(), v.elementId(),
                "Field '" + v.field() + "' references missing id '" + v.missingId() + "'.")));

        // 2. the semantic rule catalog
        var snapshot = ModelSnapshot.from(repository);
        for (var rule : LintRules.all()) {
            findings.addAll(rule.apply(snapshot));
        }

        findings.sort(Comparator
                .comparing((LintFinding f) -> f.severity().ordinal())
                .thenComparing(LintFinding::ruleId)
                .thenComparing(f -> f.elementName() != null ? f.elementName() : ""));
        return findings;
    }
}
