package io.mateu.modux.modeldrivengenerator.infra.out.db;

import io.mateu.modux.modeldrivengenerator.application.out.store.WorkspaceStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import lombok.RequiredArgsConstructor;

import java.text.Normalizer;
import java.util.List;

/**
 * The database implementation of the workspace port: workspaces are rows, the merge
 * base is the {@code element_base} frozen when the solution branched (refreshed on
 * every «⟳ Actualizar del sistema»), and landings write rows + a history line — no
 * git anywhere. Created per DATABASE repository by the store opener.
 */
@RequiredArgsConstructor
public class DbWorkspaceStore implements WorkspaceStore {

    private final JdbcModelDatabase db;
    private final CommonFileRepository repository;

    @Override
    public boolean available() {
        return true;
    }

    @Override
    public String currentBranch() {
        return db.getCurrentWorkspace();
    }

    @Override
    public List<String> solutionBranches() {
        return db.solutionWorkspaces();
    }

    @Override
    public String createSolution(String name) {
        var branch = SOLUTION_PREFIX + slug(name);
        var system = db.load(SYSTEM_BRANCH);
        db.createWorkspace(branch, name);
        db.replaceAll(branch, system);
        db.replaceBase(branch, system);
        db.appendHistory(branch, "solución creada desde el sistema");
        switchTo(branch);
        // Parity with git: the branch registers its self-describing SolutionEntity.
        repository.save(new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SolutionEntity(
                "solution-" + slug(name), name, null, "EXPLORING", List.of()));
        return branch;
    }

    @Override
    public void switchTo(String branch) {
        db.switchTo(branch);
        repository.openDatabase(db);
    }

    @Override
    public void discard(String branch) {
        db.appendHistory(branch, "solución descartada");
        db.dropWorkspace(branch);
        if (branch.equals(db.getCurrentWorkspace())) switchTo(SYSTEM_BRANCH);
    }

    @Override
    public AllData systemModel() {
        return db.load(SYSTEM_BRANCH);
    }

    @Override
    public AllData mergeBase() {
        return db.loadBase(db.getCurrentWorkspace());
    }

    @Override
    public void landOnSystem(AllData merged, String label) {
        var branch = db.getCurrentWorkspace();
        db.replaceAll(SYSTEM_BRANCH, merged);
        db.appendHistory(SYSTEM_BRANCH, label);
        db.appendHistory(branch, "archivada tras el merge");
        db.dropWorkspace(branch);
        switchTo(SYSTEM_BRANCH);
    }

    @Override
    public void landOnCurrent(AllData merged, String label) {
        var branch = db.getCurrentWorkspace();
        db.replaceAll(branch, merged);
        // The solution is now in sync with the system: the base moves forward too.
        db.replaceBase(branch, db.load(SYSTEM_BRANCH));
        db.appendHistory(branch, label);
        switchTo(branch);
    }

    private static String slug(String name) {
        return Normalizer.normalize(name.toLowerCase(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
