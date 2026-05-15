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
    private List<ModuleId> modules;

    public static Service of(ServiceId id, ServiceName name, String gitRepository, List<ModuleId> modules) {
        var service = new Service();
        service.id = id;
        service.name = name;
        service.gitRepository = gitRepository;
        service.modules = modules;
        return service;
    }

    public static Service load(String id, String name, String gitRepository, List<String> modules) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        service.gitRepository = gitRepository;
        service.modules = modules.stream().map(ModuleId::new).toList();
        return service;
    }

    public void update(ServiceName name, String gitRepository, List<ModuleId> modules) {
        this.name = name;
        this.gitRepository = gitRepository;
        this.modules = modules;
    }
}
