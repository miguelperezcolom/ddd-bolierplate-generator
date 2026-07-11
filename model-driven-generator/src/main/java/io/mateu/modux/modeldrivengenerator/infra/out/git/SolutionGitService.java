package io.mateu.modux.modeldrivengenerator.infra.out.git;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SolutionEntity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * The system/solutions machinery (docs/design/system-and-solutions.md): the store lives in
 * its OWN git repo — main is the system (as-is), each {@code solution/*} branch a to-be.
 * This service shells out to git in the store directory; the semantic layer (registering
 * the {@link SolutionEntity}, reloading the in-memory catalog after a checkout) stays here
 * so the REST controller reads as intent.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SolutionGitService {

    public static final String SYSTEM_BRANCH = "main";
    public static final String SOLUTION_PREFIX = "solution/";

    final CommonFileRepository repository;

    /** The repo root: the store's directory (granular) or its parent (monolithic file). */
    public Path repoDir() {
        var store = repository.storePath();
        return Files.isDirectory(store) ? store : store.getParent();
    }

    public boolean isRepo() {
        return Files.isDirectory(repoDir().resolve(".git"));
    }

    /** Initialises the repo lazily: the current store becomes the system's baseline. */
    public void ensureRepo() {
        if (!isRepo()) {
            git("init");
            git("checkout", "-B", SYSTEM_BRANCH);
            commitAll("sistema: línea base");
            log.info("store git repo initialised at {}", repoDir());
            return;
        }
        // A repo initialised elsewhere but WITHOUT history (unborn HEAD — e.g. the user
        // ran `git init` in the store folder): the current store becomes the baseline.
        if (!hasCommits()) {
            git("checkout", "-B", SYSTEM_BRANCH);
            commitAll("sistema: línea base");
            log.info("store git repo baselined at {}", repoDir());
        }
    }

    /** False while HEAD is unborn (a repo with no commits yet). */
    public boolean hasCommits() {
        if (!isRepo()) return false;
        try {
            git("rev-parse", "--verify", "HEAD");
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }

    public String currentBranch() {
        // An unborn repo IS the as-is: its baseline gets committed on the first solution op.
        return isRepo() && hasCommits()
                ? git("rev-parse", "--abbrev-ref", "HEAD").trim()
                : SYSTEM_BRANCH;
    }

    public List<String> solutionBranches() {
        if (!isRepo()) return List.of();
        return git("branch", "--list", SOLUTION_PREFIX + "*", "--format=%(refname:short)")
                .lines().map(String::trim).filter(s -> !s.isBlank()).toList();
    }

    /** Branches from the system, registers the self-describing SolutionEntity, commits. */
    public String createSolution(String name) {
        ensureRepo();
        var slug = slug(name);
        var branch = SOLUTION_PREFIX + slug;
        if (solutionBranches().contains(branch)) {
            throw new IllegalArgumentException("Ya existe la solución " + name);
        }
        commitAll("wip: " + currentBranch());
        git("checkout", SYSTEM_BRANCH);
        git("checkout", "-b", branch);
        repository.loadFrom(repository.storePath().toString());
        repository.save(new SolutionEntity("sol-" + slug, name, null, "EXPLORING", List.of()));
        commitAll("solución " + name + ": creación");
        return branch;
    }

    /** Checks out the branch and reloads the in-memory catalog from disk. */
    public void switchTo(String branch) {
        ensureRepo();
        if (!SYSTEM_BRANCH.equals(branch) && !solutionBranches().contains(branch)) {
            throw new IllegalArgumentException("Rama desconocida: " + branch);
        }
        commitAll("wip: " + currentBranch());
        git("checkout", branch);
        repository.loadFrom(repository.storePath().toString());
    }

    /** Abandona la solución: tag de archivo + borrado de la rama (historia accesible). */
    public void discard(String branch) {
        if (!branch.startsWith(SOLUTION_PREFIX)) {
            throw new IllegalArgumentException("Solo se descartan ramas solution/*: " + branch);
        }
        if (branch.equals(currentBranch())) switchTo(SYSTEM_BRANCH);
        git("tag", "-f", "archive/" + branch.replace('/', '-'), branch);
        git("branch", "-D", branch);
    }

    /**
     * A read-only checkout of any ref at a temp path (git worktree) — how a solution
     * reads the as-is or the merge base without leaving its own branch. Pair with
     * {@link #removeWorktree(Path)}.
     */
    @SneakyThrows
    public Path addWorktree(String ref) {
        ensureRepo();
        var tmp = Files.createTempDirectory("modux-worktree-");
        // The directory must not exist for git; recreate it as git's own.
        Files.delete(tmp);
        git("worktree", "add", "--detach", tmp.toString(), ref);
        return tmp;
    }

    /** A read-only checkout of the SYSTEM. */
    public Path addSystemWorktree() {
        return addWorktree(SYSTEM_BRANCH);
    }

    /** Escape hatch for the merge machinery (SolutionMergeService). */
    public String raw(String... args) {
        return git(args);
    }

    public static final String VERSION_TAG_PREFIX = "version/";

    /**
     * Tags the current branch's HEAD as a named version of the diagrams. Uncommitted
     * work commits first, so the tag captures exactly what the user is looking at.
     */
    public void tagVersion(String name, String message) {
        ensureRepo();
        commitAll("wip: " + currentBranch());
        var tag = VERSION_TAG_PREFIX + slug(name);
        if (message == null || message.isBlank()) {
            git("tag", "-f", tag, "HEAD");
        } else {
            git("-c", "user.name=modux", "-c", "user.email=modux@modux.local",
                    "tag", "-f", "-a", tag, "-m", message, "HEAD");
        }
        log.info("versión etiquetada: {} en {}", tag, currentBranch());
    }

    /** The user's version tags, newest first: name · date · annotation. */
    public List<VersionTag> versionTags() {
        if (!isRepo() || !hasCommits()) return List.of();
        var out = git("tag", "--list", VERSION_TAG_PREFIX + "*",
                "--sort=-creatordate",
                "--format=%(refname:short)\t%(creatordate:short)\t%(subject)");
        return out.lines()
                .filter(l -> !l.isBlank())
                .map(l -> {
                    var parts = l.split("\t", 3);
                    return new VersionTag(
                            parts[0].substring(VERSION_TAG_PREFIX.length()),
                            parts.length > 1 ? parts[1] : "",
                            parts.length > 2 ? parts[2] : "");
                })
                .toList();
    }

    public record VersionTag(String name, String date, String message) {}

    /** Public form of {@link #commitAll} for the merge machinery. */
    public void commitAllPublic(String message) {
        commitAll(message);
    }

    /**
     * Concludes an in-progress merge: unlike {@link #commitAll}, it commits even when
     * the tree is unchanged (the merge ANCESTRY must be recorded regardless — e.g. a
     * conflict resolved entirely in favour of the current branch).
     */
    public void commitMerge(String message) {
        git("add", "-A");
        git("-c", "user.name=modux", "-c", "user.email=modux@modux.local",
                "commit", "--allow-empty", "-m", message);
    }

    public void removeWorktree(Path worktree) {
        git("worktree", "remove", "--force", worktree.toString());
    }

    private void commitAll(String message) {
        if (git("status", "--porcelain").isBlank()) return;
        git("add", "-A");
        git("-c", "user.name=modux", "-c", "user.email=modux@modux.local",
                "commit", "-m", message);
    }

    private static String slug(String name) {
        var slug = name.toLowerCase()
                .replaceAll("[áàä]", "a").replaceAll("[éèë]", "e").replaceAll("[íìï]", "i")
                .replaceAll("[óòö]", "o").replaceAll("[úùü]", "u").replace("ñ", "n")
                .replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", "");
        if (slug.isBlank()) throw new IllegalArgumentException("Nombre de solución inválido");
        return slug;
    }

    @SneakyThrows
    private String git(String... args) {
        var command = new java.util.ArrayList<String>();
        command.add("git");
        command.addAll(List.of(args));
        var process = new ProcessBuilder(command)
                .directory(repoDir().toFile())
                .redirectErrorStream(true)
                .start();
        String output;
        try (var in = process.getInputStream()) {
            output = new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
        if (!process.waitFor(30, TimeUnit.SECONDS)) {
            process.destroyForcibly();
            throw new IOException("git " + String.join(" ", args) + " no terminó");
        }
        if (process.exitValue() != 0) {
            throw new IllegalStateException(
                    "git " + String.join(" ", args) + " falló: " + output.trim());
        }
        return output;
    }
}
