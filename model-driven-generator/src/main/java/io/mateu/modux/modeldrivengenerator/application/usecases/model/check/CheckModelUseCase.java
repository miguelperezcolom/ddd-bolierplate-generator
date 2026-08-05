package io.mateu.modux.modeldrivengenerator.application.usecases.model.check;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.CatalogReflection;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Referential-integrity check over the whole catalog: every {@code *Id} / {@code *Ids} reference must
 * point at an element id that actually exists (top-level or nested). Dangling references are easy to
 * introduce and the single-file store hides them; this surfaces them. The reflection walk is shared
 * with the views feature via {@link CatalogReflection} (see {@code docs/design/catalog-and-views.md}).
 */
@Service
@RequiredArgsConstructor
public class CheckModelUseCase {

    private final ModelStore repository;

    public record Violation(String elementType, String elementId, String field, String missingId) {
        @Override
        public String toString() {
            return elementType + " '" + elementId + "' → field '" + field
                    + "' references missing id '" + missingId + "'";
        }
    }

    /** Returns every dangling reference found in the loaded model (empty when the model is clean). */
    public List<Violation> check() {
        var elements = repository.allElements();

        var ids = new HashSet<String>();
        for (var element : elements) {
            ids.addAll(CatalogReflection.ids(element));
        }

        var violations = new ArrayList<Violation>();
        for (var element : elements) {
            if (element instanceof Identifiable identifiable) {
                for (var reference : CatalogReflection.references(element)) {
                    if (!ids.contains(reference.id())) {
                        violations.add(new Violation(element.getClass().getSimpleName(),
                                identifiable.id(), reference.path(), reference.id()));
                    }
                }
            }
        }
        return violations;
    }
}
