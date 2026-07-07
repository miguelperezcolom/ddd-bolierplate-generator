package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionGitService;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SolutionEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * System/solutions workspace API (docs/design/system-and-solutions.md): the system is the
 * store repo's main branch, each solution a {@code solution/*} branch. Consumed by the
 * editor's «Modelo:» selector.
 */
@RestController
@RequestMapping(value = "/modux/editor/solutions", produces = "application/json")
@CrossOrigin
@RequiredArgsConstructor
public class SolutionApiController {

    final SolutionGitService git;
    final CommonFileRepository repository;
    final io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService diffService;
    final io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionMergeService mergeService;

    public record SolutionRef(String branch, String name, String status) {}
    public record WorkspaceDto(String current, boolean system, List<SolutionRef> solutions) {}
    public record SolutionCommand(String name, String branch) {}

    @GetMapping
    public WorkspaceDto workspace() {
        var current = git.currentBranch();
        var solutions = git.solutionBranches().stream()
                .map(branch -> {
                    // The entity self-describes the CURRENT branch only; others show the slug.
                    var entity = branch.equals(current)
                            ? repository.findAllOfType(SolutionEntity.class).stream()
                                    .findFirst().orElse(null)
                            : null;
                    return new SolutionRef(branch,
                            entity != null ? entity.name()
                                    : branch.substring(SolutionGitService.SOLUTION_PREFIX.length()),
                            entity != null ? entity.status() : null);
                })
                .toList();
        return new WorkspaceDto(current, SolutionGitService.SYSTEM_BRANCH.equals(current), solutions);
    }

    /** The semantic diff of the checked-out solution against the system (empty on main). */
    @GetMapping("/diff")
    public io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService.SolutionDiff diff() {
        return diffService.diffAgainstSystem();
    }

    @PostMapping("/create")
    public WorkspaceDto create(@RequestBody SolutionCommand command) {
        if (command.name() == null || command.name().isBlank()) {
            throw new IllegalArgumentException("La solución necesita un nombre");
        }
        git.createSolution(command.name().trim());
        return workspace();
    }

    @PostMapping("/switch")
    public WorkspaceDto switchTo(@RequestBody SolutionCommand command) {
        git.switchTo(command.branch());
        return workspace();
    }

    @PostMapping("/discard")
    public WorkspaceDto discard(@RequestBody SolutionCommand command) {
        git.discard(command.branch());
        return workspace();
    }

    // ---- F3: approval and semantic merge -----------------------------------

    public record StatusCommand(String status) {}
    public record MergeCommand(Map<String, String> resolutions) {}

    /** The approval gate of the CURRENT solution: green lint + no open decisions. */
    @GetMapping("/gate")
    public io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionMergeService.Gate gate() {
        return mergeService.approvalGate();
    }

    /** Status transition (EXPLORING → PROPOSED → APPROVED); APPROVED enforces the gate. */
    @PostMapping("/status")
    public WorkspaceDto status(@RequestBody StatusCommand command) {
        mergeService.setStatus(command.status());
        return workspace();
    }

    /** Dry run: the element conflicts a merge would need resolved. */
    @GetMapping("/merge-check")
    public io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionMergeService.MergeCheck mergeCheck() {
        return mergeService.check();
    }

    /** Semantic merge of the APPROVED current solution into the system. */
    @PostMapping("/merge")
    public WorkspaceDto merge(@RequestBody(required = false) MergeCommand command) {
        mergeService.mergeIntoSystem(
                command == null || command.resolutions() == null ? Map.of() : command.resolutions());
        return workspace();
    }

    /** Brings the system's advances into the living solution (semantic rebase). */
    @PostMapping("/update")
    public WorkspaceDto update(@RequestBody(required = false) MergeCommand command) {
        mergeService.updateFromSystem(
                command == null || command.resolutions() == null ? Map.of() : command.resolutions());
        return workspace();
    }

    /** Rejections travel as 400 + plain message (shown as a toast by the editor). */
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<Map<String, String>> onRejected(RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
}
