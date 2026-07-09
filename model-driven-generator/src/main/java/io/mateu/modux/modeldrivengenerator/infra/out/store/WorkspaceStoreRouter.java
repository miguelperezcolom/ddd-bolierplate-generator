package io.mateu.modux.modeldrivengenerator.infra.out.store;

import io.mateu.modux.modeldrivengenerator.application.out.store.WorkspaceStore;
import io.mateu.modux.modeldrivengenerator.infra.out.git.GitWorkspaceStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import lombok.Setter;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The single injected {@link WorkspaceStore}: it delegates to whatever adapter the
 * repository in use opened — git branches for LOCAL/GIT repositories, database
 * workspaces for DATABASE ones. Same pattern as the catalog: switching repository
 * re-points the delegate.
 */
@Service
@Primary
public class WorkspaceStoreRouter implements WorkspaceStore {

    @Setter
    private WorkspaceStore delegate;

    public WorkspaceStoreRouter(GitWorkspaceStore gitWorkspaceStore) {
        this.delegate = gitWorkspaceStore;
    }

    @Override public boolean available() { return delegate.available(); }
    @Override public String currentBranch() { return delegate.currentBranch(); }
    @Override public List<String> solutionBranches() { return delegate.solutionBranches(); }
    @Override public String createSolution(String name) { return delegate.createSolution(name); }
    @Override public void switchTo(String branch) { delegate.switchTo(branch); }
    @Override public void discard(String branch) { delegate.discard(branch); }
    @Override public AllData systemModel() { return delegate.systemModel(); }
    @Override public AllData mergeBase() { return delegate.mergeBase(); }
    @Override public void landOnSystem(AllData merged, String label) { delegate.landOnSystem(merged, label); }
    @Override public void landOnCurrent(AllData merged, String label) { delegate.landOnCurrent(merged, label); }
}
