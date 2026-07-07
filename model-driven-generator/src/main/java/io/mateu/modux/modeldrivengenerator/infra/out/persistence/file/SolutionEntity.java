package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A solution: a TO-BE proposal over the system (the AS-IS). It lives in the store of its
 * own git branch ({@code solution/<slug>}) and describes itself — the system's main branch
 * never lists solutions; they are derived from the branches. When approved and implemented
 * the branch merges into main and the solution becomes the new as-is.
 * See {@code docs/design/system-and-solutions.md}.
 */
public record SolutionEntity(
        String id,
        String name,
        /** The objective of the to-be — what this proposal changes and why. */
        String description,
        /** EXPLORING → PROPOSED → APPROVED → MERGED | DISCARDED. */
        String status,
        /** Architecture decisions (ADRs) this solution rests on. */
        List<String> decisionIds
) implements Identifiable {

    public List<String> decisionIds() {
        return decisionIds != null ? decisionIds : List.of();
    }
}
