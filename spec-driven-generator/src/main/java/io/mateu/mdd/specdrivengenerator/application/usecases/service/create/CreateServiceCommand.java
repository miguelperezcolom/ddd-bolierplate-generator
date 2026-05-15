package io.mateu.mdd.specdrivengenerator.application.usecases.service.create;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;

import java.util.List;

public record CreateServiceCommand(String id, String name, String gitRepository, String dockerImageRegistry, String dockerImageName, Integer port, String contextPath, String database,
                                   DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                                   String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                                   boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                                   Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                                   String livenessProbe, String readinessProbe, String startupProbe,
                                   boolean openApiDocumentationEnabled,
                                   List<String> moduleIds,
                                   List<String> gatewayIds,
                                   List<EnvVar> envVars) {
}
