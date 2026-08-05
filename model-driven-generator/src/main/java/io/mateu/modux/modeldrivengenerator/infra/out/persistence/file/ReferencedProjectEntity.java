package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * Where another modux project lives — the coordinate an {@link ExternalSystemEntity} carries when
 * the system it stands for is itself a modux project.
 *
 * <p>This used to be a key into {@code ~/.modux/repositories.yaml}: a registry that lived on one
 * machine, outside version control, and that everyone else had to reproduce by hand before the
 * reference meant anything. The coordinate lives in the model now and travels with it
 * ({@code docs/design/ide-plugin.md} §4.7).
 *
 * <p>Two fields, two jobs. {@link #gitUrl()} is the <em>identity</em>: with one project per
 * repository, naming another project is naming another repository, and a URL means the same thing
 * to everyone who clones this model. {@link #path()} is <em>where you happen to have it</em> — an
 * override for a checkout that is not where it would be guessed. Neither is required: a reference
 * with only a name still holds its snapshot, which is what generation reads.
 */
@lombok.Builder(toBuilder = true)
public record ReferencedProjectEntity(
        /** The repository the project lives in. The canonical, shareable form. */
        String gitUrl,
        /** Branch of that repository; null means whatever the checkout is on. */
        String branch,
        /**
         * Where the model root is on this machine, relative to THIS model's root
         * (e.g. {@code ../../checkin/modux}). Only needed when the checkout is not a sibling.
         */
        String path
) {

    public boolean isEmpty() {
        return blank(gitUrl) && blank(path);
    }

    /**
     * The repository's name as a directory would be called — {@code .../acme/checkin.git} is
     * {@code checkin}. It is what makes a sibling checkout guessable from the URL alone.
     */
    public String repositoryName() {
        if (blank(gitUrl)) return null;
        var trimmed = gitUrl.trim();
        while (trimmed.endsWith("/")) trimmed = trimmed.substring(0, trimmed.length() - 1);
        if (trimmed.endsWith(".git")) trimmed = trimmed.substring(0, trimmed.length() - 4);
        var separator = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf(':'));
        var name = separator < 0 ? trimmed : trimmed.substring(separator + 1);
        return name.isBlank() ? null : name;
    }

    private static boolean blank(String value) {
        return value == null || value.isBlank();
    }
}
