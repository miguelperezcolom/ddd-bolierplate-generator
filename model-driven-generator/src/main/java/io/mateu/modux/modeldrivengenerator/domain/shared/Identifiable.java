package io.mateu.modux.modeldrivengenerator.domain.shared;

/**
 * Anything in the model that has an id.
 *
 * <p>Almost every element implements this, and the point is not the getter — records already have
 * one — but being able to say {@code Identifiable} where the code does not care WHICH element it
 * holds: {@code ModelStore.save}, the lint sweep, the search index, the orphan cleaner. They walk
 * a heterogeneous model and only need the id.
 *
 * <p>This used to be {@code io.mateu.uidl.interfaces.Identifiable}, where it existed to tell a
 * CRUD grid which field was the id. That grid is gone; the need for a common id is not.
 */
public interface Identifiable {

    String id();
}
