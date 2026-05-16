package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;

import java.util.List;

public record ServiceDto(String id, String name, String gitRepository, String dockerImageRegistry, String dockerImageName, Integer port, String contextPath, String database,
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
