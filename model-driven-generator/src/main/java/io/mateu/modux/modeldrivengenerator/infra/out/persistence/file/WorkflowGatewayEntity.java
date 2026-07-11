package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A workflow gateway, first-class and initially LOOSE: which workflow it belongs
 * to is inferred from its links, never declared. A JOIN takes many sources and
 * ONE target; a SPLIT takes ONE source and many targets. Sources/targets are
 * step ids, other gateway ids, or workflow ids (a workflow as target is the
 * hand-off to another workflow).
 */
@Builder(toBuilder = true)
public record WorkflowGatewayEntity(
        String id,
        String name,
        /** JOIN or SPLIT. */
        String type,
        /**
         * How the gateway behaves: a JOIN waits for ALL (default) or fires on ANY
         * input; a SPLIT opens every branch in PARALLEL (default) or EXCLUSIVEly
         * picks one. The pair completes the algebra: an EXCLUSIVE split must
         * converge on an ANY join, or the flow would wait for branches never run.
         */
        String semantics,
        List<String> sourceIds,
        List<String> targetIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-semantics callers and stores). */
    public WorkflowGatewayEntity(String id, String name, String type,
                                 List<String> sourceIds, List<String> targetIds) {
        this(id, name, type, null, sourceIds, targetIds);
    }

    public WorkflowGatewayEntity {
        if (sourceIds == null) sourceIds = List.of();
        if (targetIds == null) targetIds = List.of();
    }
}
