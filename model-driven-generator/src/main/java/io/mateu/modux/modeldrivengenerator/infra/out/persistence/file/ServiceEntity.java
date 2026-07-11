package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

@Builder(toBuilder = true)
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
        List<EnvVarEntity> envVars,
        String javaVersion,
        boolean outboxEnabled,
        String outboxTableName,
        /** The code modules this service deploys (a shared module may deploy in several). */
        List<String> codeModuleIds
) implements Identifiable {

    public ServiceEntity {
        if (moduleIds == null) moduleIds = List.of();
        if (gatewayIds == null) gatewayIds = List.of();
        if (envVars == null) envVars = List.of();
        if (codeModuleIds == null) codeModuleIds = List.of();
    }

    /** Backward-compatible constructor (pre-codeModuleIds callers and stores). */
    public ServiceEntity(String id, String name, String gitRepository, String dockerImageRegistry,
                         String dockerImageName, Integer port, String contextPath, String database,
                         DbMigrationTool dbMigrationTool, Integer kubernetesReplicas,
                         String kubernetesCpuRequest, String kubernetesCpuLimit,
                         String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                         boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                         Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                         String livenessProbe, String readinessProbe, String startupProbe,
                         boolean openApiDocumentationEnabled, boolean circuitBreakerEnabled,
                         Integer circuitBreakerThreshold, Long connectionTimeoutMs, Long readTimeoutMs,
                         Long writeTimeoutMs, String deploymentStrategy, String owner,
                         List<String> moduleIds, List<String> gatewayIds, List<EnvVarEntity> envVars,
                         String javaVersion, boolean outboxEnabled, String outboxTableName) {
        this(id, name, gitRepository, dockerImageRegistry, dockerImageName, port, contextPath,
                database, dbMigrationTool, kubernetesReplicas, kubernetesCpuRequest,
                kubernetesCpuLimit, kubernetesMemoryRequest, kubernetesMemoryLimit,
                kubernetesHpaEnabled, kubernetesHpaMinReplicas, kubernetesHpaMaxReplicas,
                kubernetesHpaCpuThreshold, livenessProbe, readinessProbe, startupProbe,
                openApiDocumentationEnabled, circuitBreakerEnabled, circuitBreakerThreshold,
                connectionTimeoutMs, readTimeoutMs, writeTimeoutMs, deploymentStrategy, owner,
                moduleIds, gatewayIds, envVars, javaVersion, outboxEnabled, outboxTableName, null);
    }
}
