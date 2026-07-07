package io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi;

/** Import an OpenAPI document as the operations an EXTERNAL system offers. */
public record ImportOpenApiExternalCommand(String externalSystemId, String filePath) {
}
