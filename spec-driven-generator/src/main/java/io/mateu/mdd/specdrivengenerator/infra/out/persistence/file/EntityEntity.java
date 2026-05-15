package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record EntityEntity(String id, String name,
                           String modelId, String parentAggregateId, boolean isCollection) implements Identifiable {
}
