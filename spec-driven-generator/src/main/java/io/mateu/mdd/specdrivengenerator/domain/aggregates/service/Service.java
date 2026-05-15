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
    private List<ModuleId> modules;

    public static Service of(ServiceId id, ServiceName name, List<ModuleId> modules) {
        var service = new Service();
        service.id = id;
        service.name = name;
        service.modules = modules;
        return service;
    }

    public static Service load(String id, String name, List<String> modules) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        service.modules = modules.stream().map(ModuleId::new).toList();
        return service;
    }

    public void update(ServiceName name, List<ModuleId> modules) {
        this.name = name;
        this.modules = modules;
    }
}
