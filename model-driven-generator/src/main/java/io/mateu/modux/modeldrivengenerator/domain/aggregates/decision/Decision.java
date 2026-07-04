package io.mateu.modux.modeldrivengenerator.domain.aggregates.decision;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import lombok.Getter;

/**
 * An architecture decision record (ADR) inside the model: what was decided and why. Model elements
 * link to decisions through their {@code decisionIds}, so the traceability from an HLA/design doc
 * to the spec survives serialization (YAML comments do not) and is referentially checked.
 */
@Getter
public class Decision {

    private DecisionId id;
    private DecisionName name;

    /** What was decided (the "Decisión" column of an ADR table). */
    private String decision;

    /** Why — trade-offs and motivation (the "Motivo" column). */
    private String rationale;

    private DecisionStatus status;

    /** Pointer to the source document/section (e.g. "hla_booking_v5.md §2 D4"). */
    private String source;

    public static Decision of(DecisionId id, DecisionName name, String decision, String rationale,
                              DecisionStatus status, String source) {
        var adr = new Decision();
        adr.id = id;
        adr.name = name;
        adr.decision = decision;
        adr.rationale = rationale;
        adr.status = status;
        adr.source = source;
        return adr;
    }

    public static Decision load(String id, String name, String decision, String rationale,
                                String status, String source) {
        return of(new DecisionId(id), new DecisionName(name), decision, rationale,
                status != null ? DecisionStatus.valueOf(status) : null, source);
    }

    public void update(DecisionName name, String decision, String rationale,
                       DecisionStatus status, String source) {
        this.name = name;
        this.decision = decision;
        this.rationale = rationale;
        this.status = status;
        this.source = source;
    }
}
