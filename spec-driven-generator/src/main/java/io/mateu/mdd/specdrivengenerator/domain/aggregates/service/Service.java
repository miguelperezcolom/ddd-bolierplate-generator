package io.mateu.mdd.specdrivengenerator.domain.aggregates.service;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.Getter;

import java.util.List;

@Getter
public class Service {

    private ServiceId id;
    private ServiceName name;
    private String gitRepository;
    private String database;
    private Integer kubernetesReplicas;
    private String kubernetesCpuRequest;
    private String kubernetesCpuLimit;
    private String kubernetesMemoryRequest;
    private String kubernetesMemoryLimit;
    private boolean kubernetesHpaEnabled;
    private Integer kubernetesHpaMinReplicas;
    private Integer kubernetesHpaMaxReplicas;
    private Integer kubernetesHpaCpuThreshold;
    private List<ModuleId> modules;

    public static Service of(ServiceId id, ServiceName name, String gitRepository, String database,
                             Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                             String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                             boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                             Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                             List<ModuleId> modules) {
        var service = new Service();
        service.id = id;
        service.name = name;
        service.gitRepository = gitRepository;
        service.database = database;
        service.kubernetesReplicas = kubernetesReplicas;
        service.kubernetesCpuRequest = kubernetesCpuRequest;
        service.kubernetesCpuLimit = kubernetesCpuLimit;
        service.kubernetesMemoryRequest = kubernetesMemoryRequest;
        service.kubernetesMemoryLimit = kubernetesMemoryLimit;
        service.kubernetesHpaEnabled = kubernetesHpaEnabled;
        service.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        service.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        service.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        service.modules = modules;
        return service;
    }

    public static Service load(String id, String name, String gitRepository, String database,
                               Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                               String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                               boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                               Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                               List<String> modules) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        service.gitRepository = gitRepository;
        service.database = database;
        service.kubernetesReplicas = kubernetesReplicas;
        service.kubernetesCpuRequest = kubernetesCpuRequest;
        service.kubernetesCpuLimit = kubernetesCpuLimit;
        service.kubernetesMemoryRequest = kubernetesMemoryRequest;
        service.kubernetesMemoryLimit = kubernetesMemoryLimit;
        service.kubernetesHpaEnabled = kubernetesHpaEnabled;
        service.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        service.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        service.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        service.modules = modules.stream().map(ModuleId::new).toList();
        return service;
    }

    public void update(ServiceName name, String gitRepository, String database,
                       Integer kubernetesReplicas, String kubernetesCpuRequest, String kubernetesCpuLimit,
                       String kubernetesMemoryRequest, String kubernetesMemoryLimit,
                       boolean kubernetesHpaEnabled, Integer kubernetesHpaMinReplicas,
                       Integer kubernetesHpaMaxReplicas, Integer kubernetesHpaCpuThreshold,
                       List<ModuleId> modules) {
        this.name = name;
        this.gitRepository = gitRepository;
        this.database = database;
        this.kubernetesReplicas = kubernetesReplicas;
        this.kubernetesCpuRequest = kubernetesCpuRequest;
        this.kubernetesCpuLimit = kubernetesCpuLimit;
        this.kubernetesMemoryRequest = kubernetesMemoryRequest;
        this.kubernetesMemoryLimit = kubernetesMemoryLimit;
        this.kubernetesHpaEnabled = kubernetesHpaEnabled;
        this.kubernetesHpaMinReplicas = kubernetesHpaMinReplicas;
        this.kubernetesHpaMaxReplicas = kubernetesHpaMaxReplicas;
        this.kubernetesHpaCpuThreshold = kubernetesHpaCpuThreshold;
        this.modules = modules;
    }
}
