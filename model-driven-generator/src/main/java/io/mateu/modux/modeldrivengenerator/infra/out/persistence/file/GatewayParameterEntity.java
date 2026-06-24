package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * A path or query parameter of a gateway operation (captured from an OpenAPI {@code parameters}
 * list). {@code location} is "path", "query" or "header"; {@code type} is a Modux field data type
 * name (e.g. "string", "integer").
 */
public record GatewayParameterEntity(
        String name,
        String location,
        String type,
        boolean required
) {
}
