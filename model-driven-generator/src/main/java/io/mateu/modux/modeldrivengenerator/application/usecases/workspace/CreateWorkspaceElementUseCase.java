package io.mateu.modux.modeldrivengenerator.application.usecases.workspace;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GlobalIdPolicy;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Creates a skeleton element of any catalog type from the workspace tree: enforces global id
 * uniqueness (the workspace and the MCP tools route on plain ids), builds the minimal record via
 * Jackson (so it works for every type without per-type code) and attaches it to its parent's
 * reference list so the new node is immediately visible in the tree. Details are then filled in
 * through the element's own editor.
 */
@Service
@RequiredArgsConstructor
public class CreateWorkspaceElementUseCase {

    private final ModelStore repository;
    private final ElementTypeRegistry registry;
    private final GlobalIdPolicy idPolicy;

    private final ObjectMapper mapper = new ObjectMapper();

    public void handle(CreateWorkspaceElementCommand command) {
        if (command.id() == null || command.id().isBlank()) {
            throw new IllegalArgumentException("The new element needs an id.");
        }
        var type = registry.classFor(command.typeName());
        idPolicy.conflict(command.id(), command.typeName()).ifPresent(owner -> {
            throw new IllegalArgumentException("Id '" + command.id() + "' already exists (in " + owner
                    + "). Ids must be unique across the whole model.");
        });

        var node = mapper.createObjectNode();
        node.put("id", command.id());
        node.put("name", command.name());
        command.elementRefs().forEach(node::put);
        repository.save(toEntity(node, type, command.typeName()));

        if (command.parentTypeName() != null) {
            attachToParent(command);
        }
    }

    private void attachToParent(CreateWorkspaceElementCommand command) {
        var parentType = registry.classFor(command.parentTypeName());
        var parent = repository.findById(command.parentId(), parentType)
                .orElseThrow(() -> new IllegalArgumentException("No parent " + command.parentTypeName()
                        + " '" + command.parentId() + "' to attach to."));
        var node = (ObjectNode) mapper.valueToTree(parent);
        // the list may be serialized as an explicit null — replace it with a fresh array then
        var list = node.get(command.parentListField());
        var array = list instanceof com.fasterxml.jackson.databind.node.ArrayNode arrayNode
                ? arrayNode : node.putArray(command.parentListField());
        array.add(command.id());
        repository.save(toEntity(node, parentType, command.parentTypeName()));
    }

    private Identifiable toEntity(ObjectNode node, Class<?> type, String typeName) {
        try {
            return (Identifiable) mapper.treeToValue(node, type);
        } catch (com.fasterxml.jackson.core.JacksonException e) {
            throw new IllegalArgumentException("Could not build a " + typeName + " element: "
                    + e.getOriginalMessage(), e);
        }
    }
}
