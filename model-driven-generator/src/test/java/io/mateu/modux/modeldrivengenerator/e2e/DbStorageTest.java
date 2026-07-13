package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.out.db.DbWorkspaceStore;
import io.mateu.modux.modeldrivengenerator.infra.out.db.JdbcModelDatabase;
import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService;
import io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionMergeService;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SolutionEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The DATABASE repository backend, end to end over embedded H2: the catalog persists
 * as rows, workspaces replace git branches, the frozen element_base feeds the same
 * semantic three-way merge, and landing a solution makes it the new as-is — full
 * parity with the git implementation, produced by the SAME semantic services.
 */
@SpringBootTest
class DbStorageTest {

    @Autowired CommonFileRepository repository;
    @Autowired ModelLintService lintService;

    private static BoundedContextEntity boundedContext(String id, String name) {
        return new BoundedContextEntity(id, name, null,
                List.of(), List.of(), List.of(), List.of(), List.of(), List.of(), List.of(),
                List.of(), List.of(), List.of(), List.of(),
                null, null, false, null,
                List.of(), List.of(), List.of(), List.of(),
                null, List.of(), List.of(), List.of(), null, null, null, null);
    }

    @Test
    void catalogAndSolutionsWorkOnH2WithFullParity() {
        var db = new JdbcModelDatabase("jdbc:h2:mem:modux-db-test;DB_CLOSE_DELAY=-1", "", "");
        var workspaces = new DbWorkspaceStore(db, repository);
        var diffService = new SolutionDiffService(workspaces, repository);
        var mergeService = new SolutionMergeService(workspaces, repository, lintService);

        // ---- the catalog persists as rows and survives a reopen
        repository.openDatabase(db);
        repository.save(boundedContext("mod-uno", "Uno"));
        var reopened = new JdbcModelDatabase("jdbc:h2:mem:modux-db-test;DB_CLOSE_DELAY=-1", "", "");
        repository.openDatabase(reopened);
        assertThat(repository.findById("mod-uno", BoundedContextEntity.class)).isPresent();

        // ---- a solution branches off the system, self-describing, with its frozen base
        var branch = workspaces.createSolution("Prueba db");
        assertThat(branch).isEqualTo("solution/prueba-db");
        assertThat(workspaces.currentBranch()).isEqualTo(branch);
        assertThat(repository.findAllOfType(SolutionEntity.class)).hasSize(1);

        // ---- to-be work: one addition; the semantic diff sees exactly that
        repository.save(boundedContext("mod-dos", "Dos"));
        var diff = diffService.diffAgainstSystem();
        assertThat(diff.system()).isFalse();
        assertThat(diff.added()).isEqualTo(1);
        assertThat(diff.modified()).isZero();
        // the system itself is untouched
        assertThat(workspaces.systemModel().boundedContexts()).hasSize(1);

        // ---- no conflicts, approve, and the merge lands it as the new as-is
        assertThat(mergeService.check().conflicts()).isEmpty();
        var solution = repository.findAllOfType(SolutionEntity.class).get(0);
        repository.save(new SolutionEntity(solution.id(), solution.name(), null,
                "APPROVED", List.of()));
        mergeService.mergeIntoSystem(Map.of());

        assertThat(workspaces.currentBranch()).isEqualTo("main");
        assertThat(repository.findById("mod-dos", BoundedContextEntity.class)).isPresent();
        assertThat(repository.findAllOfType(SolutionEntity.class)).isEmpty(); // stripped on landing
        assertThat(workspaces.solutionBranches()).isEmpty(); // workspace archived
    }
}
