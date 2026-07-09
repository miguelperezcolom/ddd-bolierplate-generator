package io.mateu.modux.modeldrivengenerator.application.out.store;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;

import java.util.List;

/**
 * The system/solutions workspace port (docs/design/storage-ports.md): the as-is lives
 * in the system workspace, each to-be proposal in its own solution workspace. Git
 * branches implement it for file repositories; database rows for DATABASE ones. The
 * SEMANTIC layer (diff, three-way merge, approval gate) sits above and only ever sees
 * {@link AllData} snapshots — it never knows what a branch or a table is.
 */
public interface WorkspaceStore {

    String SYSTEM_BRANCH = "main";
    String SOLUTION_PREFIX = "solution/";

    /** True when the open repository supports workspaces at all. */
    boolean available();

    /** The active workspace: {@link #SYSTEM_BRANCH} or {@code solution/<slug>}. */
    String currentBranch();

    default boolean onSystem() {
        return SYSTEM_BRANCH.equals(currentBranch());
    }

    List<String> solutionBranches();

    /** Branches a new solution off the system and switches to it; returns its branch id. */
    String createSolution(String name);

    /** Checks the workspace out and reloads the catalog from it. */
    void switchTo(String branch);

    /** Archives the solution and removes its workspace. */
    void discard(String branch);

    /** The committed as-is — the system side of every comparison. */
    AllData systemModel();

    /** The three-way base of the CURRENT solution (what it branched from / last synced to). */
    AllData mergeBase();

    /**
     * Lands a semantic merge on the system: the merged model becomes the new as-is,
     * the current solution is archived and the catalog ends up on the system.
     */
    void landOnSystem(AllData merged, String label);

    /** Lands a semantic update on the CURRENT solution and refreshes its merge base. */
    void landOnCurrent(AllData merged, String label);
}
