package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A retrieval-augmented-generation knowledge base: content an AI agent queries for
 * grounding before acting. Optionally fed from read models — the domain projecting
 * itself into an index. How the pipeline works (embeddings, chunking, refresh…) is a
 * later decision; this only declares the knowledge base and what it draws from.
 */
@lombok.Builder(toBuilder = true)
public record RagEntity(
        String id,
        String name,
        String description,
        /** Read models whose content this knowledge base indexes (optional). */
        List<String> sourceReadModelIds,
        /** External content it also indexes: repos, web sites, FTP servers… (optional). */
        List<RagContentSourceEntity> contentSources,
        /** Tables owned by external systems it indexes (structured legacy content). */
        List<String> sourceExternalTableIds,
        /** Published APIs — or API proxies — whose content it indexes by calling them. */
        List<String> sourceApiIds,
        /** Whole external systems it indexes (coarse: everything the system owns). */
        List<String> sourceExternalSystemIds,
        /** Whole bounded contexts it indexes (coarse: the context's content). */
        List<String> sourceBoundedContextIds
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre coarse-sources callers and stores). */
    public RagEntity(String id, String name, String description,
                     List<String> sourceReadModelIds,
                     List<RagContentSourceEntity> contentSources,
                     List<String> sourceExternalTableIds,
                     List<String> sourceApiIds) {
        this(id, name, description, sourceReadModelIds, contentSources, sourceExternalTableIds,
                sourceApiIds, List.of(), List.of(), null);
    }

    /** Backward-compatible constructor (pre structured-sources callers and stores). */
    public RagEntity(String id, String name, String description,
                     List<String> sourceReadModelIds,
                     List<RagContentSourceEntity> contentSources) {
        this(id, name, description, sourceReadModelIds, contentSources, List.of(), List.of(),
                List.of(), List.of(), null);
    }

    /** Backward-compatible constructor (pre-contentSources callers and stores). */
    public RagEntity(String id, String name, String description,
                     List<String> sourceReadModelIds) {
        this(id, name, description, sourceReadModelIds, List.of(), List.of(), List.of(),
                List.of(), List.of(), null);
    }

    public List<String> sourceReadModelIds() {
        return sourceReadModelIds != null ? sourceReadModelIds : List.of();
    }

    public List<RagContentSourceEntity> contentSources() {
        return contentSources != null ? contentSources : List.of();
    }

    public List<String> sourceExternalTableIds() {
        return sourceExternalTableIds != null ? sourceExternalTableIds : List.of();
    }

    public List<String> sourceApiIds() {
        return sourceApiIds != null ? sourceApiIds : List.of();
    }

    public List<String> sourceExternalSystemIds() {
        return sourceExternalSystemIds != null ? sourceExternalSystemIds : List.of();
    }

    public List<String> sourceBoundedContextIds() {
        return sourceBoundedContextIds != null ? sourceBoundedContextIds : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public RagEntity withName(String name) {
        return toBuilder().name(name).build();
    }

    public RagEntity withSourceReadModelIds(List<String> ids) {
        return toBuilder().sourceReadModelIds(ids).build();
    }

    public RagEntity withContentSources(List<RagContentSourceEntity> sources) {
        return toBuilder().contentSources(sources).build();
    }

    public RagEntity withSourceExternalTableIds(List<String> ids) {
        return toBuilder().sourceExternalTableIds(ids).build();
    }

    public RagEntity withSourceApiIds(List<String> ids) {
        return toBuilder().sourceApiIds(ids).build();
    }

    public RagEntity withSourceExternalSystemIds(List<String> ids) {
        return toBuilder().sourceExternalSystemIds(ids).build();
    }

    public RagEntity withSourceBoundedContextIds(List<String> ids) {
        return toBuilder().sourceBoundedContextIds(ids).build();
    }
}
