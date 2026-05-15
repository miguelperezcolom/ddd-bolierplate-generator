package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import lombok.Getter;

import java.util.List;

@Getter
public class Gateway {

    private GatewayId id;
    private GatewayName name;
    private List<GatewayOperation> operations;

    public static Gateway of(GatewayId id, GatewayName name, List<GatewayOperation> operations) {
        var gateway = new Gateway();
        gateway.id = id;
        gateway.name = name;
        gateway.operations = operations != null ? operations : List.of();
        return gateway;
    }

    public static Gateway load(String id, String name, List<GatewayOperation> operations) {
        var gateway = new Gateway();
        gateway.id = new GatewayId(id);
        gateway.name = new GatewayName(name);
        gateway.operations = operations != null ? operations : List.of();
        return gateway;
    }

    public void update(GatewayName name, List<GatewayOperation> operations) {
        this.name = name;
        this.operations = operations != null ? operations : List.of();
    }
}
