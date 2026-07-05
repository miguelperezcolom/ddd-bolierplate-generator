package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The single home of the id-uniqueness policy. Ids identify exactly one element across the whole
 * model (the workspace tree, the MCP tools and cross-references route on plain ids), with one
 * blessed exception: an element and its backing data model ({@link ModelEntity}) conventionally
 * share an id (aggregate {@code reserva} ↔ model {@code reserva}).
 *
 * <p>The policy is deliberately two-tiered:
 * <ul>
 *   <li><b>Creation time</b> ({@link #conflict}) is lenient about the model pairing — the natural
 *       authoring order creates the model first and the element over it (or vice versa), before
 *       the {@code modelId} back-link exists.</li>
 *   <li><b>Lint time</b> ({@link #isBackingModelPair}) is strict — once the model settles, the
 *       sharing is only legal if the element actually points at that model via {@code modelId}.
 *       The {@code duplicate-id} rule enforces it.</li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
public class GlobalIdPolicy {

    private final CommonFileRepository repository;
    private final ElementTypeRegistry registry;

    /**
     * The type name already holding {@code id}, when creating an element of {@code typeName} would
     * make the id ambiguous; empty when the id is free (or the conflict is the blessed model pairing).
     */
    public Optional<String> conflict(String id, String typeName) {
        for (var entry : registry.all().entrySet()) {
            if (entry.getKey().equals(typeName)) {
                continue; // same type = an update, not a conflict
            }
            var blessedModelPairing = "models".equals(entry.getKey()) ^ "models".equals(typeName);
            if (!blessedModelPairing && repository.findById(id, entry.getValue()).isPresent()) {
                return Optional.of(entry.getKey());
            }
        }
        return Optional.empty();
    }

    /**
     * Strict check for elements sharing one id: exactly a {@link ModelEntity} plus one element
     * whose {@code modelId} points back at it (its backing model) — anything else is a duplicate.
     */
    public static boolean isBackingModelPair(List<Object> elements) {
        if (elements.size() != 2) {
            return false;
        }
        var model = elements.stream()
                .filter(e -> e instanceof ModelEntity)
                .map(e -> (ModelEntity) e)
                .findFirst().orElse(null);
        if (model == null) {
            return false;
        }
        var other = elements.get(0) instanceof ModelEntity ? elements.get(1) : elements.get(0);
        try {
            return model.id().equals(other.getClass().getMethod("modelId").invoke(other));
        } catch (ReflectiveOperationException e) {
            return false; // the other element cannot be backed by a model
        }
    }
}
