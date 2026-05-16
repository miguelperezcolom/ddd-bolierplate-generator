package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ServiceEntity(
        String id,
        String name,
        String gitRepository,
        String dockerImageRegistry,
        String dockerImageName,
        Integer port,
        String contextPath,
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
        String livenessProbe,
        String readinessProbe,
        String startupProbe,
        boolean openApiDocumentationEnabled,
        boolean circuitBreakerEnabled,
        Integer circuitBreakerThreshold,
        Long connectionTimeoutMs,
        Long readTimeoutMs,
        Long writeTimeoutMs,
        String deploymentStrategy,
        String owner,
        List<String> moduleIds,
        List<String> gatewayIds,
        List<EnvVarEntity> envVars
) implements Identifiable {

    public ServiceEntity {
        if (moduleIds == null) moduleIds = List.of();
        if (gatewayIds == null) gatewayIds = List.of();
        if (envVars == null) envVars = List.of();
    }
}
