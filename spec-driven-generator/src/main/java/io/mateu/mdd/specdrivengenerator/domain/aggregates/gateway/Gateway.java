package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import lombok.Getter;

@Getter
public class Gateway {

    private GatewayId id;
    private GatewayName name;

    public static Gateway of(GatewayId id, GatewayName name) {
        var gateway = new Gateway();
        gateway.id = id;
        gateway.name = name;
        return gateway;
    }

    public static Gateway load(String id, String name) {
        var gateway = new Gateway();
        gateway.id = new GatewayId(id);
        gateway.name = new GatewayName(name);
        return gateway;
    }

    public void update(GatewayName name) {
        this.name = name;
    }
}
