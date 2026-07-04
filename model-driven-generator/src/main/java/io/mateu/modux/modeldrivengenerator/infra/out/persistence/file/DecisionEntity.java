package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import io.mateu.uidl.interfaces.Identifiable;

/**
 * An architecture decision record (ADR): what was decided, why, and where it came from. Model
 * elements reference it via {@code decisionIds}, giving in-model traceability from design docs
 * to the spec (checked by referential integrity).
 */
public record DecisionEntity(
        String id,
        String name,
        String decision,
        String rationale,
        DecisionStatus status,
        String source
) implements Identifiable {
}
