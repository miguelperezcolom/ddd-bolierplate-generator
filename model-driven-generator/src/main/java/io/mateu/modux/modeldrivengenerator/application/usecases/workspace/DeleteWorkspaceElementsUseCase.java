package io.mateu.modux.modeldrivengenerator.application.usecases.workspace;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Deletes elements of any catalog type from the workspace tree: resolves each id's owning type
 * (ids are globally unique) and detaches the deleted ids from every {@code *Ids} reference list in
 * the catalog, so a delete never leaves the tree pointing at ghosts. Single-value references
 * ({@code modelId}…) are left for the linter to report — silently rewriting those could hide a
 * modeling decision.
 */
@Service
@RequiredArgsConstructor
public class DeleteWorkspaceElementsUseCase {

    private final CommonFileRepository repository;
    private final ElementTypeRegistry registry;

    private final ObjectMapper mapper = new ObjectMapper();

    public void handle(List<String> ids) {
        var deleted = new java.util.HashSet<String>();
        for (var id : ids) {
            for (var type : registry.all().values()) {
                if (repository.findById(id, type).isPresent()) {
                    repository.deleteAllById(List.of(id), type);
                    deleted.add(id);
                    break;
                }
            }
        }
        // The blessed id-sharing pair (element + its backing model): when another element still
        // holds the deleted id, references to that id still resolve — leave them untouched.
        var fullyGone = deleted.stream()
                .filter(id -> registry.all().values().stream()
                        .noneMatch(type -> repository.findById(id, type).isPresent()))
                .collect(java.util.stream.Collectors.toSet());
        if (!fullyGone.isEmpty()) {
            detachEverywhere(fullyGone);
        }
    }

    /** Remove the deleted ids from every element's {@code *Ids} list fields (recursively). */
    private void detachEverywhere(Set<String> deleted) {
        for (var element : repository.allElements()) {
            if (!(element instanceof Identifiable)) {
                continue;
            }
            var node = (ObjectNode) mapper.valueToTree(element);
            if (pruneIdLists(node, deleted)) {
                try {
                    repository.save((Identifiable) mapper.treeToValue(node, element.getClass()));
                } catch (com.fasterxml.jackson.core.JacksonException e) {
                    throw new IllegalStateException("Could not detach deleted ids from "
                            + element.getClass().getSimpleName(), e);
                }
            }
        }
    }

    private boolean pruneIdLists(ObjectNode node, Set<String> deleted) {
        var changed = false;
        var fields = node.fields();
        while (fields.hasNext()) {
            var field = fields.next();
            JsonNode value = field.getValue();
            if (value instanceof ArrayNode array) {
                if (field.getKey().endsWith("Ids")) {
                    for (var i = array.size() - 1; i >= 0; i--) {
                        if (deleted.contains(array.get(i).asText())) {
                            array.remove(i);
                            changed = true;
                        }
                    }
                } else {
                    for (var item : array) {
                        if (item instanceof ObjectNode child) {
                            changed |= pruneIdLists(child, deleted);
                        }
                    }
                }
            } else if (value instanceof ObjectNode child) {
                changed |= pruneIdLists(child, deleted);
            }
        }
        return changed;
    }
}
