package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ServiceEntity(
        String id,
        String name,
        String gitRepository,
        String database,
        DbMigrationTool dbMigrationTool,
        Integer kubernetesReplicas,
        String kubernetesCpuRequest,
        String kubernetesCpuLimit,
        String kubernetesMemoryRequest,
        String kubernetesMemoryLimit,
        boolean kubernetesHpaEnabled,
        Integer kubernetesHpaMinReplicas,
        Integer kubernetesHpaMaxReplicas,
        Integer kubernetesHpaCpuThreshold,
        List<String> moduleIds
) implements Identifiable {

    public ServiceEntity {
        if (moduleIds == null) moduleIds = List.of();
    }
}
