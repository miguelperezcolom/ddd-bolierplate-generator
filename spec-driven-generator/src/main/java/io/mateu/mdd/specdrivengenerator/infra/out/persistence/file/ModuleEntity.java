package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModuleEntity(
        String id,
        String name,
        String gitRepository,
        List<String> aggregateIds
) implements Identifiable {
}
