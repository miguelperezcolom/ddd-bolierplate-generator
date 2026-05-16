package io.mateu.modux.specdrivengenerator.application.usecases.service.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.EnvVar;

import java.util.List;

public record CreateServiceCommand(String id, String name, String gitRepository, String dockerImageRegistry, String dockerImageName, Integer port, String contextPath, String database,
                                   DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                                   String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                                   boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                                   Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                                   String livenessProbe, String readinessProbe, String startupProbe,
                                   boolean openApiDocumentationEnabled,
                                   boolean circuitBreakerEnabled, Integer circuitBreakerThreshold,
                                   Long connectionTimeoutMs, Long readTimeoutMs, Long writeTimeoutMs,
                                   String deploymentStrategy,
                                   String owner,
                                   List<String> moduleIds,
                                   List<String> gatewayIds,
                                   List<EnvVar> envVars,
                                   String javaVersion,
                                   boolean outboxEnabled,
                                   String outboxTableName) {
}
