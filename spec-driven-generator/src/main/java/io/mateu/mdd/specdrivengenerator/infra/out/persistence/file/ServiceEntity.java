package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ServiceEntity(
        String id,
        String name,
        List<String> moduleIds
) implements Identifiable {

    public ServiceEntity {
        if (moduleIds == null) moduleIds = List.of();
    }
}
