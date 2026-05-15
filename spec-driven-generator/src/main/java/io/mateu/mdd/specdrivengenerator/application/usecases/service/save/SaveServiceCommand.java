package io.mateu.mdd.specdrivengenerator.application.usecases.service.save;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;

import java.util.List;

public record SaveServiceCommand(String id, String name, String gitRepository, Integer port, String contextPath, String database,
                                 DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                                 String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                                 boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                                 Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                                 List<String> moduleIds,
                                 List<EnvVar> envVars) {

    public SaveServiceCommand {
        if (moduleIds == null) moduleIds = List.of();
        if (envVars == null) envVars = List.of();
    }
}
