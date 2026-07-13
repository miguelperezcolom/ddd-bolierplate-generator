package io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi;

/**
 * Imports an OpenAPI document as the INBOUND contract of a boundedContext: one REST-exposed use case per
 * operation (plus the typed models). The outbound twin ({@link ImportOpenApiCommand}) maps the same
 * document to a gateway we consume.
 */
public record ImportOpenApiInboundCommand(String boundedContextId, String filePath) {}
