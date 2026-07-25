package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayBranchConditionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowStepEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The loop guard: a cycle is legal only when at least one branch LEAVING it is guarded by the
 * condition of an EXCLUSIVE split. Everything else is an infinite loop.
 */
class WorkflowLoopValidatorTest {

    private static WorkflowStepEntity step(String id, String... dependsOn) {
        return WorkflowStepEntity.builder().id(id).name(id).dependsOnStepIds(List.of(dependsOn)).build();
    }

    private static WorkflowGatewayEntity exclusiveSplit(String id, List<String> sources,
                                                        List<String> targets,
                                                        List<GatewayBranchConditionEntity> conditions) {
        return WorkflowGatewayEntity.builder()
                .id(id).name(id).type("SPLIT").semantics("EXCLUSIVE")
                .sourceIds(sources).targetIds(targets).branchConditions(conditions).build();
    }

    @Test
    void a_linear_dependency_chain_is_not_a_loop() {
        var steps = List.of(step("A"), step("B", "A"), step("C", "B"));
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of()).isEmpty());
    }

    @Test
    void a_pure_step_dependency_cycle_is_an_infinite_loop() {
        var steps = List.of(step("A", "B"), step("B", "A"));
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of()).isPresent());
    }

    @Test
    void a_step_depending_on_itself_is_an_infinite_loop() {
        var steps = List.of(step("A", "A"));
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of()).isPresent());
    }

    @Test
    void a_gateway_loop_without_a_condition_is_an_infinite_loop() {
        // A → G, G → {A (back), B (exit)} — the exit is unconditioned
        var steps = List.of(step("A"), step("B"));
        var g = exclusiveSplit("G", List.of("A"), List.of("A", "B"), List.of());
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(g)).isPresent());
    }

    @Test
    void a_gateway_loop_with_a_conditioned_exit_is_allowed() {
        // the branch LEAVING the cycle (→ B) carries the condition
        var steps = List.of(step("A"), step("B"));
        var g = exclusiveSplit("G", List.of("A"), List.of("A", "B"),
                List.of(new GatewayBranchConditionEntity("B", "saldo <= 0")));
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(g)).isEmpty());
    }

    @Test
    void a_condition_only_on_the_loop_back_branch_does_not_make_it_escapable() {
        // condition guards the branch that STAYS in the cycle (→ A), not the exit (→ B)
        var steps = List.of(step("A"), step("B"));
        var g = exclusiveSplit("G", List.of("A"), List.of("A", "B"),
                List.of(new GatewayBranchConditionEntity("A", "reintentar")));
        // the chosen rule is strict: the branch that LEAVES the cycle must be the conditioned one
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(g)).isPresent());
    }

    @Test
    void a_candidate_link_that_closes_an_unconditioned_gateway_loop_is_rejected() {
        // G → A already; drawing A → G would close the cycle A → G → A with an unconditioned exit
        var steps = List.of(step("A"), step("B"));
        var g = exclusiveSplit("G", List.of(), List.of("A", "B"), List.of());
        var extra = List.<String[]>of(new String[]{"A", "G"});
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(g), extra).isPresent());
    }

    @Test
    void a_candidate_link_closing_a_loop_with_a_conditioned_exit_is_allowed() {
        var steps = List.of(step("A"), step("B"));
        var g = exclusiveSplit("G", List.of(), List.of("A", "B"),
                List.of(new GatewayBranchConditionEntity("B", "listo")));
        var extra = List.<String[]>of(new String[]{"A", "G"});
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(g), extra).isEmpty());
    }

    @Test
    void a_candidate_link_that_does_not_close_a_loop_is_allowed() {
        var steps = List.of(step("A"), step("B"));
        var extra = List.<String[]>of(new String[]{"A", "B"});
        assertTrue(WorkflowLoopValidator.findUnboundedLoop(steps, List.of(), extra).isEmpty());
    }
}
