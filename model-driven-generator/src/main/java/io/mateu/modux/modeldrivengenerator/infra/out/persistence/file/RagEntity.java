package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A retrieval-augmented-generation knowledge base: content an AI agent queries for
 * grounding before acting. Optionally fed from read models — the domain projecting
 * itself into an index. How the pipeline works (embeddings, chunking, refresh…) is a
 * later decision; this only declares the knowledge base and what it draws from.
 */
public record RagEntity(
        String id,
        String name,
        String description,
        /** Read models whose content this knowledge base indexes (optional). */
        List<String> sourceReadModelIds,
        /** External content it also indexes: repos, web sites, FTP servers… (optional). */
        List<RagContentSourceEntity> contentSources
) implements Identifiable {

    /** Backward-compatible constructor (pre-contentSources callers and stores). */
    public RagEntity(String id, String name, String description,
                     List<String> sourceReadModelIds) {
        this(id, name, description, sourceReadModelIds, List.of());
    }

    public List<String> sourceReadModelIds() {
        return sourceReadModelIds != null ? sourceReadModelIds : List.of();
    }

    public List<RagContentSourceEntity> contentSources() {
        return contentSources != null ? contentSources : List.of();
    }
}
