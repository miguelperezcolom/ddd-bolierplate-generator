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

        // 1b. global id uniqueness — the workspace tree, the MCP tools and cross-references all
        // route on plain ids, so the same id in two elements is ambiguous. One blessed exception:
        // an element and its backing data model (ModelEntity) conventionally share the id.
        var typesById = new java.util.LinkedHashMap<String, java.util.List<String>>();
        for (var element : repository.allElements()) {
            if (element instanceof io.mateu.uidl.interfaces.Identifiable identifiable) {
                typesById.computeIfAbsent(identifiable.id(), k -> new ArrayList<>())
                        .add(element.getClass().getSimpleName());
            }
        }
        typesById.forEach((id, types) -> {
            var isBackingModelPair = types.size() == 2 && types.contains("ModelEntity");
            if (types.size() > 1 && !isBackingModelPair) {
                findings.add(new LintFinding("duplicate-id", LintSeverity.ERROR,
                        String.join(", ", types), id, id,
                        "Id '" + id + "' is used by " + types.size() + " elements (" + String.join(", ", types)
                                + "). Ids must be unique across the whole model (only an element and its"
                                + " backing model may share one)."));
            }
        });

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
