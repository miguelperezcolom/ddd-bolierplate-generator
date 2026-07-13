package io.mateu.modux.modeldrivengenerator.domain.aggregates.service;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.DeploymentStrategy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.Getter;

import java.util.List;

@Getter
public class Service {

    private ServiceId id;
    private ServiceName name;
    private String gitRepository;
    private String dockerImageRegistry;
    private String dockerImageName;
    private Integer port;
    private String contextPath;
    private String database;
    private DbMigrationTool dbMigrationTool;
    private Integer kubernetesReplicas;
    private String kubernetesCpuRequest;
    private String kubernetesCpuLimit;
    private String kubernetesMemoryRequest;
    private String kubernetesMemoryLimit;
    private boolean kubernetesHpaEnabled;
    private Integer kubernetesHpaMinReplicas;
    private Integer kubernetesHpaMaxReplicas;
    private Integer kubernetesHpaCpuThreshold;
    private String livenessProbe;
    private String readinessProbe;
    private String startupProbe;
    private boolean openApiDocumentationEnabled;
    private boolean circuitBreakerEnabled;
    private Integer circuitBreakerThreshold;
    private Long connectionTimeoutMs;
    private Long readTimeoutMs;
    private Long writeTimeoutMs;
    private DeploymentStrategy deploymentStrategy;
    private String owner;
    private List<BoundedContextId> boundedContexts;
    private List<String> gatewayIds;
    private List<EnvVar> envVars;
    private String javaVersion;
    private boolean outboxEnabled;
    private String outboxTableName;

    public static Service of(ServiceId id, ServiceName name, String gitRepository,
                             String dockerImageRegistry, String dockerImageName,
                             Integer port, String contextPath, String database,
                             DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                             String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                             boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                             Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                             String livenessProbe, String readinessProbe, String startupProbe,
                             boolean openApiDocumentationEnabled,
                             boolean circuitBreakerEnabled, Integer circuitBreakerThreshold,
                             Long connectionTimeoutMs, Long readTimeoutMs, Long writeTimeoutMs,
                             DeploymentStrategy deploymentStrategy, String owner,
                             List<BoundedContextId> boundedContexts, List<String> gatewayIds, List<EnvVar> envVars,
                             String javaVersion, boolean outboxEnabled, String outboxTableName) {
        var service = new Service();
        service.id = id;
        service.name = name;
        service.gitRepository = gitRepository;
        service.dockerImageRegistry = dockerImageRegistry;
        service.dockerImageName = dockerImageName;
        service.port = port;
        service.contextPath = contextPath;
        service.database = database;
        service.dbMigrationTool = dbMigrationTool;
        service.kubernetesReplicas = kubernetesReplicas;
        service.kubernetesCpuRequest = kubernetesCpuRequest;
        service.kubernetesCpuLimit = kubernetesCpuLimit;
        service.kubernetesMemoryRequest = kubernetesMemoryRequest;
        service.kubernetesMemoryLimit = kubernetesMemoryLimit;
        service.kubernetesHpaEnabled = kubernetesHpaEnabled;
        service.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        service.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        service.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        service.livenessProbe = livenessProbe;
        service.readinessProbe = readinessProbe;
        service.startupProbe = startupProbe;
        service.openApiDocumentationEnabled = openApiDocumentationEnabled;
        service.circuitBreakerEnabled = circuitBreakerEnabled;
        service.circuitBreakerThreshold = circuitBreakerThreshold;
        service.connectionTimeoutMs = connectionTimeoutMs;
        service.readTimeoutMs = readTimeoutMs;
        service.writeTimeoutMs = writeTimeoutMs;
        service.deploymentStrategy = deploymentStrategy;
        service.owner = owner;
        service.boundedContexts = boundedContexts;
        service.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        service.envVars = envVars != null ? envVars : List.of();
        service.javaVersion = javaVersion;
        service.outboxEnabled = outboxEnabled;
        service.outboxTableName = outboxTableName;
        return service;
    }

    public static Service load(String id, String name, String gitRepository,
                               String dockerImageRegistry, String dockerImageName,
                               Integer port, String contextPath, String database,
                               DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                               String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                               boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                               Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                               String livenessProbe, String readinessProbe, String startupProbe,
                               boolean openApiDocumentationEnabled,
                               boolean circuitBreakerEnabled, Integer circuitBreakerThreshold,
                               Long connectionTimeoutMs, Long readTimeoutMs, Long writeTimeoutMs,
                               String deploymentStrategy, String owner,
                               List<String> boundedContexts, List<String> gatewayIds, List<EnvVar> envVars,
                               String javaVersion, boolean outboxEnabled, String outboxTableName) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        service.gitRepository = gitRepository;
        service.dockerImageRegistry = dockerImageRegistry;
        service.dockerImageName = dockerImageName;
        service.port = port;
        service.contextPath = contextPath;
        service.database = database;
        service.dbMigrationTool = dbMigrationTool;
        service.kubernetesReplicas = kubernetesReplicas;
        service.kubernetesCpuRequest = kubernetesCpuRequest;
        service.kubernetesCpuLimit = kubernetesCpuLimit;
        service.kubernetesMemoryRequest = kubernetesMemoryRequest;
        service.kubernetesMemoryLimit = kubernetesMemoryLimit;
        service.kubernetesHpaEnabled = kubernetesHpaEnabled;
        service.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        service.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        service.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        service.livenessProbe = livenessProbe;
        service.readinessProbe = readinessProbe;
        service.startupProbe = startupProbe;
        service.openApiDocumentationEnabled = openApiDocumentationEnabled;
        service.circuitBreakerEnabled = circuitBreakerEnabled;
        service.circuitBreakerThreshold = circuitBreakerThreshold;
        service.connectionTimeoutMs = connectionTimeoutMs;
        service.readTimeoutMs = readTimeoutMs;
        service.writeTimeoutMs = writeTimeoutMs;
        service.deploymentStrategy = deploymentStrategy != null ? DeploymentStrategy.valueOf(deploymentStrategy) : null;
        service.owner = owner;
        service.boundedContexts = boundedContexts.stream().map(BoundedContextId::new).toList();
        service.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        service.envVars = envVars != null ? envVars : List.of();
        service.javaVersion = javaVersion;
        service.outboxEnabled = outboxEnabled;
        service.outboxTableName = outboxTableName;
        return service;
    }

    public void update(ServiceName name, String gitRepository,
                       String dockerImageRegistry, String dockerImageName,
                       Integer port, String contextPath, String database,
                       DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                       String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                       boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                       Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                       String livenessProbe, String readinessProbe, String startupProbe,
                       boolean openApiDocumentationEnabled,
                       boolean circuitBreakerEnabled, Integer circuitBreakerThreshold,
                       Long connectionTimeoutMs, Long readTimeoutMs, Long writeTimeoutMs,
                       DeploymentStrategy deploymentStrategy, String owner,
                       List<BoundedContextId> boundedContexts, List<String> gatewayIds, List<EnvVar> envVars,
                       String javaVersion, boolean outboxEnabled, String outboxTableName) {
        this.name = name;
        this.gitRepository = gitRepository;
        this.dockerImageRegistry = dockerImageRegistry;
        this.dockerImageName = dockerImageName;
        this.port = port;
        this.contextPath = contextPath;
        this.database = database;
        this.dbMigrationTool = dbMigrationTool;
        this.kubernetesReplicas = kubernetesReplicas;
        this.kubernetesCpuRequest = kubernetesCpuRequest;
        this.kubernetesCpuLimit = kubernetesCpuLimit;
        this.kubernetesMemoryRequest = kubernetesMemoryRequest;
        this.kubernetesMemoryLimit = kubernetesMemoryLimit;
        this.kubernetesHpaEnabled = kubernetesHpaEnabled;
        this.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        this.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        this.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        this.livenessProbe = livenessProbe;
        this.readinessProbe = readinessProbe;
        this.startupProbe = startupProbe;
        this.openApiDocumentationEnabled = openApiDocumentationEnabled;
        this.circuitBreakerEnabled = circuitBreakerEnabled;
        this.circuitBreakerThreshold = circuitBreakerThreshold;
        this.connectionTimeoutMs = connectionTimeoutMs;
        this.readTimeoutMs = readTimeoutMs;
        this.writeTimeoutMs = writeTimeoutMs;
        this.deploymentStrategy = deploymentStrategy;
        this.owner = owner;
        this.boundedContexts = boundedContexts;
        this.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        this.envVars = envVars != null ? envVars : List.of();
        this.javaVersion = javaVersion;
        this.outboxEnabled = outboxEnabled;
        this.outboxTableName = outboxTableName;
    }
}
