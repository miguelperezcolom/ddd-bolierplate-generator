package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * Where (and how big) one catalog element is painted in a diagram. {@code ref} is the id of an
 * existing element (module, aggregate, use case…). Top-level nodes carry an absolute centre; a node
 * nested inside a container carries an offset relative to that container. {@code w}/{@code h} are
 * only present for containers the user has resized explicitly.
 */
public record DiagramNodeEntity(
        String ref,
        double x,
        double y,
        Double w,
        Double h
) {}
