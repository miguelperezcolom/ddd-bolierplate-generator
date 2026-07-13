package io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl;

/**
 * Import a WSDL as operations on an EXTERNAL system, or as use-case stubs a BOUNDED_CONTEXT will
 * implement (a legacy SOAP service being reimplemented). Exactly one target must be set.
 */
public record ImportWsdlCommand(String filePath, String externalSystemId, String boundedContextId) {
}
