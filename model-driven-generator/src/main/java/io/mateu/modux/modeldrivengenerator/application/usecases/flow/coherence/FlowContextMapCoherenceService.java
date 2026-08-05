package io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Cross-checks the runtime intent layer ({@link FlowEntity}) against the strategic context map
 * ({@link ContextMapRelationEntity} on the project): every cross-context flow ought to have a
 * declared strategic relationship backing it. Where one is missing, it proposes a type from the
 * flow's archetype (see {@link ContextMapArchetypeInference}).
 *
 * <p>Read-only analysis — it never mutates the model. Findings feed the context-map diagram and
 * model-coherence warnings.
 */
@Service
@RequiredArgsConstructor
public class FlowContextMapCoherenceService {

    final ModelStore repository;

    public List<FlowContextMapFinding> analyze() {
        return analyze(
                repository.findAllOfType(FlowEntity.class),
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(BoundedContextEntity.class),
                repository.findAllOfType(ContextMapRelationEntity.class));
    }

    /** Pure analysis over the given model slices — unit-testable without Spring or files. */
    public static List<FlowContextMapFinding> analyze(List<FlowEntity> flows,
                                               List<AggregateEntity> aggregates,
                                               List<BoundedContextEntity> boundedContexts,
                                               List<ContextMapRelationEntity> relations) {
        var findings = new ArrayList<FlowContextMapFinding>();
        for (var flow : flows) {
            findings.add(analyzeOne(flow, boundedContexts, relations));
        }
        return findings;
    }

    private static FlowContextMapFinding analyzeOne(FlowEntity flow,
                                                    List<BoundedContextEntity> boundedContexts,
                                                    List<ContextMapRelationEntity> relations) {
        var archetype = flow.archetype();
        var aggregateOwner = ownerBoundedContextId(flow.triggerAggregateId(), boundedContexts);
        var nonAggregateOwner = flow.triggerDomainServiceId() != null
                ? domainServiceOwnerBoundedContextId(flow.triggerDomainServiceId(), boundedContexts)
                : useCaseOwnerBoundedContextId(flow.triggerUseCaseId(), boundedContexts);
        var sourceBoundedContextId = aggregateOwner != null ? aggregateOwner : nonAggregateOwner;
        var targetBoundedContextId = flow.targetBoundedContextId();

        // NOTIFIES targets an external system — it is not an edge of the bounded-context map.
        if (archetype == FlowArchetype.NOTIFIES) {
            return finding(flow, sourceBoundedContextId, targetBoundedContextId, FlowContextMapFinding.Status.EXTERNAL,
                    null, null,
                    "Notifies an external system — no context-map relation applies.");
        }

        // Intra-context flow (or unresolved source) — no strategic relation needed.
        if (sourceBoundedContextId == null || sourceBoundedContextId.equals(targetBoundedContextId)) {
            return finding(flow, sourceBoundedContextId, targetBoundedContextId, FlowContextMapFinding.Status.INTERNAL,
                    null, null,
                    "Source and target are the same context — no strategic relation needed.");
        }

        var forward = relations.stream()
                .filter(r -> sourceBoundedContextId.equals(r.sourceBoundedContextId()) && targetBoundedContextId.equals(r.targetBoundedContextId()))
                .findFirst().orElse(null);
        if (forward != null) {
            return finding(flow, sourceBoundedContextId, targetBoundedContextId, FlowContextMapFinding.Status.OK,
                    parseType(forward.type()), null,
                    "Backed by a declared '" + forward.type() + "' relation.");
        }

        var reverse = relations.stream()
                .filter(r -> targetBoundedContextId.equals(r.sourceBoundedContextId()) && sourceBoundedContextId.equals(r.targetBoundedContextId()))
                .findFirst().orElse(null);
        if (reverse != null) {
            return finding(flow, sourceBoundedContextId, targetBoundedContextId, FlowContextMapFinding.Status.REVERSED,
                    parseType(reverse.type()), null,
                    "A '" + reverse.type() + "' relation exists but points the opposite way; the flow's "
                            + "source is upstream, so the relation should go source → target.");
        }

        var suggested = ContextMapArchetypeInference.impliedRelation(archetype).orElse(null);
        return finding(flow, sourceBoundedContextId, targetBoundedContextId, FlowContextMapFinding.Status.MISSING_RELATION,
                null, suggested,
                "Cross-context flow with no declared relation — declare it in the project's contextMap "
                        + "(sourceBoundedContextId/targetBoundedContextId/type)."
                        + (suggested != null ? " Suggested type: " + suggested + "." : ""));
    }

    private static String ownerBoundedContextId(String aggregateId, List<BoundedContextEntity> boundedContexts) {
        if (aggregateId == null) return null;
        return boundedContexts.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregateId))
                .map(BoundedContextEntity::id)
                .findFirst().orElse(null);
    }

    /** Alternative trigger: the boundedContext owning the publishing use case (application events). */
    private static String useCaseOwnerBoundedContextId(String useCaseId, List<BoundedContextEntity> boundedContexts) {
        if (useCaseId == null) return null;
        return boundedContexts.stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(useCaseId))
                .map(BoundedContextEntity::id)
                .findFirst().orElse(null);
    }

    /** Alternative trigger: the boundedContext owning the emitting domain service. */
    private static String domainServiceOwnerBoundedContextId(String domainServiceId, List<BoundedContextEntity> boundedContexts) {
        if (domainServiceId == null) return null;
        return boundedContexts.stream()
                .filter(m -> m.domainServiceIds().contains(domainServiceId))
                .map(BoundedContextEntity::id)
                .findFirst().orElse(null);
    }

    private static ContextMapRelationType parseType(String type) {
        if (type == null) return null;
        try {
            return ContextMapRelationType.valueOf(type);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private static FlowContextMapFinding finding(FlowEntity flow, String sourceBoundedContextId, String targetBoundedContextId,
                                                 FlowContextMapFinding.Status status,
                                                 ContextMapRelationType declaredType,
                                                 ContextMapRelationType suggestedType,
                                                 String message) {
        return new FlowContextMapFinding(
                flow.id(), flow.name(), flow.archetype(),
                sourceBoundedContextId, targetBoundedContextId,
                status, declaredType, suggestedType, message);
    }
}
