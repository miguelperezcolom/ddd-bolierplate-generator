package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A journey (trayecto): a NAMED path through the landscape — an ordered series of
 * hops over existing elements (actors, external systems, bounded contexts, APIs…)
 * that together tell one story ("the availability request enters through the
 * metasearcher, crosses distribution and ends at Rumbo"). It only references
 * elements and rides on top of the declared dependencies: a reading layer, never
 * a second topology. Legs form a DAG via {@code afterLegIds}, so a journey can
 * branch; the editor numbers them 1, 2, 3a, 3b…
 */
@Builder(toBuilder = true)
public record JourneyEntity(
        String id,
        String name,
        String description,
        List<JourneyLegEntity> legs
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public JourneyEntity {
        if (legs == null) legs = List.of();
    }
}
