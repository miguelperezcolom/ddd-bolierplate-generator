package io.mateu.modux.modeldrivengenerator.infra.out.git;

import io.mateu.modux.modeldrivengenerator.application.out.store.WorkspaceStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.GranularYamlStorageFormat;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.MonolithicYamlStorageFormat;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.util.List;

/**
 * The git implementation of the workspace port: branches are workspaces, the merge
 * base comes from {@code git merge-base}, and landing a merge is a true merge commit
 * (both parents, {@code -s ours} + the semantic result written over it). All the git
 * plumbing the semantic services used to reach for lives here now.
 */
@Service
@RequiredArgsConstructor
public class GitWorkspaceStore implements WorkspaceStore {

    final SolutionGitService git;
    final CommonFileRepository repository;
    final GranularYamlStorageFormat granularFormat;
    final MonolithicYamlStorageFormat monolithicFormat;

    @Override
    public boolean available() {
        return git.isRepo();
    }

    @Override
    public String currentBranch() {
        return git.isRepo() ? git.currentBranch() : SYSTEM_BRANCH;
    }

    @Override
    public List<String> solutionBranches() {
        return git.solutionBranches();
    }

    @Override
    public String createSolution(String name) {
        return git.createSolution(name);
    }

    @Override
    public void switchTo(String branch) {
        git.switchTo(branch);
    }

    @Override
    public void discard(String branch) {
        git.discard(branch);
    }

    @Override
    public AllData systemModel() {
        return loadAt(SYSTEM_BRANCH);
    }

    @Override
    public AllData mergeBase() {
        var baseSha = git.raw("merge-base", SYSTEM_BRANCH, git.currentBranch()).trim();
        return loadAt(baseSha);
    }

    @Override
    public void landOnSystem(AllData merged, String label) {
        var branch = git.currentBranch();
        // A real merge commit: take main's tree with -s ours, then write the semantic
        // result over it — git keeps both parents, modux decides the content.
        git.commitAllPublic("wip: " + branch);
        git.raw("checkout", SYSTEM_BRANCH);
        git.raw("merge", "--no-ff", "--no-commit", "-s", "ours", branch);
        repository.loadFrom(repository.storePath().toString());
        repository.replaceWith(merged);
        git.commitMerge(label);
        git.raw("tag", "-f", "archive/" + branch.replace('/', '-'), branch);
        git.raw("branch", "-D", branch);
        repository.loadFrom(repository.storePath().toString());
    }

    @Override
    public void landOnCurrent(AllData merged, String label) {
        var branch = git.currentBranch();
        git.commitAllPublic("wip: " + branch);
        git.raw("merge", "--no-ff", "--no-commit", "-s", "ours", SYSTEM_BRANCH);
        repository.replaceWith(merged);
        git.commitMerge(label);
        repository.loadFrom(repository.storePath().toString());
    }

    @SneakyThrows
    private AllData loadAt(String ref) {
        var worktree = git.addWorktree(ref);
        try {
            var store = worktree.resolve(git.repoDir().relativize(repository.storePath()));
            return Files.isDirectory(store)
                    ? granularFormat.load(store)
                    : monolithicFormat.load(store);
        } finally {
            git.removeWorktree(worktree);
        }
    }
}
