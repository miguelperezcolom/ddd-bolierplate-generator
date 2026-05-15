package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;

import java.util.List;

public record ServiceDto(String id, String name, String gitRepository, String database,
                         DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                         String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                         boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                         Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                         List<String> moduleIds,
                         List<EnvVar> envVars) {
}
