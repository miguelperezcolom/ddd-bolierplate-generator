package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A sticky note on the diagrams: free commentary that can point at elements and/or at
 * RELATIONS. Element targets are ordinary references (targetIds, integrity-checked);
 * relation targets are view edge refs (e.g. {@code dep:ext-a->ext-b}) — presentation
 * coordinates, deliberately outside the reference check.
 */
@Builder(toBuilder = true)
public record NoteEntity(
        String id,
        String text,
        /** The elements this note annotates. */
        List<String> targetIds,
        /** The diagram relations this note annotates, as view edge refs. */
        List<String> edgeRefs
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public NoteEntity {
        if (targetIds == null) targetIds = List.of();
        if (edgeRefs == null) edgeRefs = List.of();
    }
}
