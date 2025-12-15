package io.mateu.mdd.core.domain.aggregates.model;

public record Context(String name, String version, String language, Dmn dmn, Bpmn bpmn) {
}
