package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ServiceDto(String id, String name, String gitRepository, String database,
                         Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                         String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                         boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                         Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                         List<String> moduleIds) {
}
