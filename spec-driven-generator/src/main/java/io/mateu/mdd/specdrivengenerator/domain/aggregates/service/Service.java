package io.mateu.mdd.specdrivengenerator.domain.aggregates.service;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.Getter;

@Getter
public class Service {

    private ServiceId id;
    private ServiceName name;

    public static Service of(ServiceId id, ServiceName name) {
        var service = new Service();
        service.id = id;
        service.name = name;
        return service;
    }

    public static Service load(String id, String name) {
        var service = new Service();
        service.id = new ServiceId(id);
        service.name = new ServiceName(name);
        return service;
    }

    public void update(ServiceName name) {
        this.name = name;
    }
}
