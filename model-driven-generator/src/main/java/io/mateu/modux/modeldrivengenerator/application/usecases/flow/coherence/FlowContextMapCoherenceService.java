package io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
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

    final CommonFileRepository repository;

    public List<FlowContextMapFinding> analyze() {
        return analyze(
                repository.findAllOfType(FlowEntity.class),
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(ModuleEntity.class),
                repository.findAllOfType(ProjectEntity.class));
    }

    /** Pure analysis over the given model slices — unit-testable without Spring or files. */
    public static List<FlowContextMapFinding> analyze(List<FlowEntity> flows,
                                               List<AggregateEntity> aggregates,
                                               List<ModuleEntity> modules,
                                               List<ProjectEntity> projects) {
        var relations = projects.stream()
                .flatMap(p -> p.contextMap().stream())
                .toList();

        var findings = new ArrayList<FlowContextMapFinding>();
        for (var flow : flows) {
            findings.add(analyzeOne(flow, modules, relations));
        }
        return findings;
    }

    private static FlowContextMapFinding analyzeOne(FlowEntity flow,
                                                    List<ModuleEntity> modules,
                                                    List<ContextMapRelationEntity> relations) {
        var archetype = flow.archetype();
        var sourceModuleId = ownerModuleId(flow.triggerAggregateId(), modules);
        var targetModuleId = flow.targetModuleId();

        // NOTIFIES targets an external system — it is not an edge of the bounded-context map.
        if (archetype == FlowArchetype.NOTIFIES) {
            return finding(flow, sourceModuleId, targetModuleId, FlowContextMapFinding.Status.EXTERNAL,
                    null, null,
                    "Notifies an external system — no context-map relation applies.");
        }

        // Intra-context flow (or unresolved source) — no strategic relation needed.
        if (sourceModuleId == null || sourceModuleId.equals(targetModuleId)) {
            return finding(flow, sourceModuleId, targetModuleId, FlowContextMapFinding.Status.INTERNAL,
                    null, null,
                    "Source and target are the same context — no strategic relation needed.");
        }

        var forward = relations.stream()
                .filter(r -> sourceModuleId.equals(r.sourceModuleId()) && targetModuleId.equals(r.targetModuleId()))
                .findFirst().orElse(null);
        if (forward != null) {
            return finding(flow, sourceModuleId, targetModuleId, FlowContextMapFinding.Status.OK,
                    parseType(forward.type()), null,
                    "Backed by a declared '" + forward.type() + "' relation.");
        }

        var reverse = relations.stream()
                .filter(r -> targetModuleId.equals(r.sourceModuleId()) && sourceModuleId.equals(r.targetModuleId()))
                .findFirst().orElse(null);
        if (reverse != null) {
            return finding(flow, sourceModuleId, targetModuleId, FlowContextMapFinding.Status.REVERSED,
                    parseType(reverse.type()), null,
                    "A '" + reverse.type() + "' relation exists but points the opposite way; the flow's "
                            + "source is upstream, so the relation should go source → target.");
        }

        var suggested = ContextMapArchetypeInference.impliedRelation(archetype).orElse(null);
        return finding(flow, sourceModuleId, targetModuleId, FlowContextMapFinding.Status.MISSING_RELATION,
                null, suggested,
                "Cross-context flow with no declared relation — declare it in the project's contextMap "
                        + "(sourceModuleId/targetModuleId/type)."
                        + (suggested != null ? " Suggested type: " + suggested + "." : ""));
    }

    private static String ownerModuleId(String aggregateId, List<ModuleEntity> modules) {
        if (aggregateId == null) return null;
        return modules.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregateId))
                .map(ModuleEntity::id)
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

    private static FlowContextMapFinding finding(FlowEntity flow, String sourceModuleId, String targetModuleId,
                                                 FlowContextMapFinding.Status status,
                                                 ContextMapRelationType declaredType,
                                                 ContextMapRelationType suggestedType,
                                                 String message) {
        return new FlowContextMapFinding(
                flow.id(), flow.name(), flow.archetype(),
                sourceModuleId, targetModuleId,
                status, declaredType, suggestedType, message);
    }
}
