package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * Guards the workflow flow graph against INFINITE loops. A cycle is allowed only when it can be
 * left through a CONDITION: at least one branch leaving the cycle must be guarded by the condition
 * of an EXCLUSIVE split. A cycle with no such conditioned exit would spin forever, so introducing
 * it is rejected.
 *
 * <p>The flow graph mixes two kinds of edge: a step's {@code dependsOnStepIds} (predecessor →
 * step) and a gateway's links (source → gateway, gateway → target). Only gateway targets can carry
 * a condition, so a pure step-dependency cycle is always inescapable.
 */
@Service
@RequiredArgsConstructor
public class WorkflowLoopValidator {

    final ModelStore repository;
    final WorkflowGatewayGraph workflowGraph;

    /** Thrown when saving would introduce a cycle with no conditioned way out. */
    public static class UnboundedLoopException extends IllegalArgumentException {
        public UnboundedLoopException(String message) {
            super(message);
        }
    }

    /** Rejects the given (candidate) workflow state if it contains an inescapable loop. */
    public void assertNoUnboundedLoop(List<WorkflowStepEntity> steps,
                                      List<WorkflowGatewayEntity> gateways) {
        findUnboundedLoop(steps, gateways).ifPresent(msg -> {
            throw new UnboundedLoopException(msg);
        });
    }

    /**
     * Rejects a would-be flow link {@code from → to}. Every link (a step/gateway → gateway, or a
     * gateway → step/gateway) adds exactly this one edge to the flow graph, so simulating it as a
     * single unconditioned edge over the current state faithfully catches a loop it would close.
     * A hand-off to another workflow leaves this one (a sink) and cannot close a loop — skip it.
     */
    public void assertLinkBounded(String workflowId, String from, String to) {
        List<WorkflowStepEntity> steps;
        List<WorkflowGatewayEntity> gateways;
        if (workflowId != null) {
            steps = repository.findById(workflowId, WorkflowEntity.class)
                    .map(WorkflowEntity::steps).orElse(List.of());
            gateways = memberGateways(workflowId);
        } else {
            // both ends still loose: fall back to the whole flow graph
            steps = repository.findAllOfType(WorkflowEntity.class).stream()
                    .flatMap(w -> w.steps().stream()).toList();
            gateways = repository.findAllOfType(WorkflowGatewayEntity.class);
        }
        findUnboundedLoop(steps, gateways, List.<String[]>of(new String[]{from, to})).ifPresent(msg -> {
            throw new UnboundedLoopException(msg);
        });
    }

    /**
     * Rejects the candidate {@code steps} for the workflow if, together with its gateways read from
     * the store, they form an inescapable loop. Used by the step-dependency editing paths.
     */
    public void assertWorkflowBounded(String workflowId, List<WorkflowStepEntity> steps) {
        assertNoUnboundedLoop(steps, memberGateways(workflowId));
    }

    /** The gateways inferred to belong to the given workflow. */
    public List<WorkflowGatewayEntity> memberGateways(String workflowId) {
        if (workflowId == null) return List.of();
        return repository.findAllOfType(WorkflowGatewayEntity.class).stream()
                .filter(g -> workflowId.equals(workflowGraph.workflowOf(g.id()).orElse(null)))
                .toList();
    }

    // --- pure detector -------------------------------------------------------------------------

    private record Edge(String to, boolean conditioned) {}

    /**
     * Returns a human message describing the first inescapable loop found, or empty when every
     * cycle has a conditioned exit (and when there is no cycle at all).
     */
    public static Optional<String> findUnboundedLoop(List<WorkflowStepEntity> steps,
                                                     List<WorkflowGatewayEntity> gateways) {
        return findUnboundedLoop(steps, gateways, List.of());
    }

    /**
     * As {@link #findUnboundedLoop(List, List)} but with candidate edges ({@code {from, to}}) added
     * as unconditioned — used to pre-check a link before it is drawn.
     */
    public static Optional<String> findUnboundedLoop(List<WorkflowStepEntity> steps,
                                                     List<WorkflowGatewayEntity> gateways,
                                                     List<String[]> extraEdges) {
        var adjacency = new HashMap<String, List<Edge>>();
        var label = new HashMap<String, String>();

        for (var s : steps) {
            label.putIfAbsent(s.id(), s.name() != null ? s.name() : s.id());
            for (var dep : s.dependsOnStepIds()) {
                edge(adjacency, dep, s.id(), false); // predecessor → step
            }
        }
        for (var g : gateways) {
            label.putIfAbsent(g.id(), g.name() != null ? g.name() : g.id());
            var exclusiveSplit = "SPLIT".equals(g.type()) && "EXCLUSIVE".equals(g.semantics());
            var conditioned = new HashSet<String>();
            if (exclusiveSplit) {
                for (var c : g.branchConditions()) {
                    if (c.expression() != null && !c.expression().isBlank()) conditioned.add(c.targetId());
                }
            }
            for (var src : g.sourceIds()) edge(adjacency, src, g.id(), false);
            for (var tgt : g.targetIds()) edge(adjacency, g.id(), tgt, conditioned.contains(tgt));
        }
        for (var extra : extraEdges) {
            label.putIfAbsent(extra[0], extra[0]);
            label.putIfAbsent(extra[1], extra[1]);
            edge(adjacency, extra[0], extra[1], false);
        }

        for (var scc : stronglyConnectedComponents(adjacency)) {
            if (!isCycle(scc, adjacency)) continue;
            if (!hasConditionedExit(scc, adjacency)) {
                var names = scc.stream().map(id -> label.getOrDefault(id, id)).sorted().toList();
                return Optional.of("Bucle infinito: el ciclo " + String.join(" → ", names)
                        + " no tiene salida condicionada. Un bucle solo es válido si al menos una rama "
                        + "que sale del ciclo está guardada por la condición de un split EXCLUSIVO.");
            }
        }
        return Optional.empty();
    }

    private static void edge(Map<String, List<Edge>> adjacency, String from, String to, boolean conditioned) {
        adjacency.computeIfAbsent(from, k -> new ArrayList<>()).add(new Edge(to, conditioned));
        adjacency.computeIfAbsent(to, k -> new ArrayList<>());
    }

    /** A component is a cycle when it has more than one node or a single node linking to itself. */
    private static boolean isCycle(Set<String> scc, Map<String, List<Edge>> adjacency) {
        if (scc.size() > 1) return true;
        var only = scc.iterator().next();
        return adjacency.getOrDefault(only, List.of()).stream().anyMatch(e -> e.to().equals(only));
    }

    private static boolean hasConditionedExit(Set<String> scc, Map<String, List<Edge>> adjacency) {
        for (var node : scc) {
            for (var e : adjacency.getOrDefault(node, List.of())) {
                if (e.conditioned() && !scc.contains(e.to())) return true;
            }
        }
        return false;
    }

    // Tarjan's strongly connected components.
    private static List<Set<String>> stronglyConnectedComponents(Map<String, List<Edge>> adjacency) {
        var index = new HashMap<String, Integer>();
        var lowlink = new HashMap<String, Integer>();
        var onStack = new HashSet<String>();
        var stack = new ArrayDeque<String>();
        var result = new ArrayList<Set<String>>();
        var counter = new int[]{0};
        for (var node : adjacency.keySet()) {
            if (!index.containsKey(node)) {
                strongConnect(node, adjacency, index, lowlink, onStack, stack, result, counter);
            }
        }
        return result;
    }

    private static void strongConnect(String v, Map<String, List<Edge>> adjacency,
                                      Map<String, Integer> index, Map<String, Integer> lowlink,
                                      Set<String> onStack, Deque<String> stack,
                                      List<Set<String>> result, int[] counter) {
        // Iterative Tarjan to stay safe on deep graphs.
        var callStack = new ArrayDeque<String>();
        var iterators = new HashMap<String, Integer>();
        callStack.push(v);
        while (!callStack.isEmpty()) {
            var node = callStack.peek();
            if (!index.containsKey(node)) {
                index.put(node, counter[0]);
                lowlink.put(node, counter[0]);
                counter[0]++;
                stack.push(node);
                onStack.add(node);
                iterators.put(node, 0);
            }
            var edges = adjacency.getOrDefault(node, List.of());
            var i = iterators.get(node);
            if (i < edges.size()) {
                iterators.put(node, i + 1);
                var w = edges.get(i).to();
                if (!index.containsKey(w)) {
                    callStack.push(w);
                } else if (onStack.contains(w)) {
                    lowlink.put(node, Math.min(lowlink.get(node), index.get(w)));
                }
            } else {
                if (lowlink.get(node).equals(index.get(node))) {
                    var component = new HashSet<String>();
                    String w;
                    do {
                        w = stack.pop();
                        onStack.remove(w);
                        component.add(w);
                    } while (!w.equals(node));
                    result.add(component);
                }
                callStack.pop();
                if (!callStack.isEmpty()) {
                    var parent = callStack.peek();
                    lowlink.put(parent, Math.min(lowlink.get(parent), lowlink.get(node)));
                }
            }
        }
    }
}
