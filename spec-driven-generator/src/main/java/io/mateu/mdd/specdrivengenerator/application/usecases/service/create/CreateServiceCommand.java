package io.mateu.mdd.specdrivengenerator.application.usecases.service.create;

import java.util.List;

public record CreateServiceCommand(String id, String name, String gitRepository, String database,
                                   Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                                   String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                                   boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                                   Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                                   List<String> moduleIds) {
}
