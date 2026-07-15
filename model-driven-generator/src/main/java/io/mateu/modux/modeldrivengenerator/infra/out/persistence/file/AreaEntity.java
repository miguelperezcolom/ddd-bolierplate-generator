package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

/**
 * An area on the diagrams: a named rectangle that visually groups elements and anchors
 * notes that comment a REGION rather than a concrete element. Membership is geometric
 * (whatever sits inside the rectangle), so the area itself carries no references — its
 * geometry lives in each view's layout, like every other node position.
 */
@Builder(toBuilder = true)
public record AreaEntity(
        String id,
        String name
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
