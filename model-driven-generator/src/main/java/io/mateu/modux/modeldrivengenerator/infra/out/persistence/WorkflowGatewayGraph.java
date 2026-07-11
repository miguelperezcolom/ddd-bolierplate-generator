package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * The inferred membership of the workflow flow graph: gateways never declare
 * their workflow — it flows in through their links (workflow TARGETS are
 * hand-offs and do not vote). Shared by the editor API and the fichas.
 */
@Service
@RequiredArgsConstructor
public class WorkflowGatewayGraph {

    final ModelStore repository;

    public Optional<String> workflowOf(String nodeId) {
        return Optional.ofNullable(resolve(nodeId, new HashSet<>()));
    }

    private String resolve(String nodeId, Set<String> visiting) {
        if (repository.findById(nodeId, WorkflowEntity.class).isPresent()) return nodeId;
        for (var wf : repository.findAllOfType(WorkflowEntity.class)) {
            if (wf.steps().stream().anyMatch(st -> st.id().equals(nodeId))) return wf.id();
        }
        if (!visiting.add(nodeId)) return null;
        var gateway = repository.findById(nodeId, WorkflowGatewayEntity.class).orElse(null);
        if (gateway == null) return null;
        for (var src : gateway.sourceIds()) {
            var wf = resolve(src, visiting);
            if (wf != null) return wf;
        }
        for (var tgt : gateway.targetIds()) {
            if (repository.findById(tgt, WorkflowEntity.class).isPresent()) continue;
            var wf = resolve(tgt, visiting);
            if (wf != null) return wf;
        }
        return null;
    }
}
