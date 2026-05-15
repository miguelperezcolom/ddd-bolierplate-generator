package io.mateu.mdd.specdrivengenerator.application.usecases.service.save;

import java.util.List;

public record SaveServiceCommand(String id, String name, String gitRepository, String database,
                                 Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                                 String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                                 boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                                 Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                                 List<String> moduleIds) {

    public SaveServiceCommand {
        if (moduleIds == null) moduleIds = List.of();
    }
}
