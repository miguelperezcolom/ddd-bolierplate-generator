package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

/** Main protocol an external system speaks. */
public enum ExternalSystemProtocol {
    REST,
    SOAP,
    GRPC,
    MESSAGING,
    FILE,
    DATABASE,
    OTHER
}
