package io.mateu.mdd.specdrivengenerator.domain.aggregates.service;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.Getter;

import java.util.List;

@Getter
public class Service {

    private ServiceId id;
    private ServiceName name;
    private String gitRepository;
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
    private List<ModuleId> modules;
    private List<String> gatewayIds;
    private List<EnvVar> envVars;

    public static Service of(ServiceId id, ServiceName name, String gitRepository,
                             Integer port, String contextPath, String database,
                             DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                             String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                             boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                             Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                             String livenessProbe, String readinessProbe, String startupProbe,
                             List<ModuleId> modules, List<String> gatewayIds, List<EnvVar> envVars) {
        var service = new Service();
        service.id = id;
        service.name = name;
        service.gitRepository = gitRepository;
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
        service.modules = modules;
        service.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        service.envVars = envVars != null ? envVars : List.of();
        return service;
    }

    public static Service load(String id, String name, String gitRepository,
                               Integer port, String contextPath, String database,
                               DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                               String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                               boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                               Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                               String livenessProbe, String readinessProbe, String startupProbe,
                               List<String> modules, List<String> gatewayIds, List<EnvVar> envVars) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        service.gitRepository = gitRepository;
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
        service.modules = modules.stream().map(ModuleId::new).toList();
        service.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        service.envVars = envVars != null ? envVars : List.of();
        return service;
    }

    public void update(ServiceName name, String gitRepository,
                       Integer port, String contextPath, String database,
                       DbMigrationTool dbMigrationTool, Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                       String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                       boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                       Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                       String livenessProbe, String readinessProbe, String startupProbe,
                       List<ModuleId> modules, List<String> gatewayIds, List<EnvVar> envVars) {
        this.name = name;
        this.gitRepository = gitRepository;
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
        this.modules = modules;
        this.gatewayIds = gatewayIds != null ? gatewayIds : List.of();
        this.envVars = envVars != null ? envVars : List.of();
    }
}
