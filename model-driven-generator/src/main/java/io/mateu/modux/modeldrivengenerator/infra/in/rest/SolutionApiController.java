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

    /** Rejections travel as 400 + plain message (shown as a toast by the editor). */
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<Map<String, String>> onRejected(RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
}
