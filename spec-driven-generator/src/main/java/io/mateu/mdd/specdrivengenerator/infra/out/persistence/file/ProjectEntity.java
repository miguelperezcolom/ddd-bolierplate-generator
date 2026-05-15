package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ProjectEntity(
        String id,
        String name,
        String outputPath,
        String packageName,
        String gitRepository,
        String database,
        List<String> serviceIds
) implements Identifiable {

    public ProjectEntity {
        if (serviceIds == null) serviceIds = List.of();
    }

}
