package io.mateu.modux.modeldrivengenerator.domain.aggregates.component;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;
import lombok.Getter;

@Getter
public class Component {

    private ComponentId id;
    private ComponentName name;
    private ComponentDataSourceType dataSourceType;
    private String queryServiceId;
    private String gatewayId;
    private ComponentPresentationType presentationType;

    public static Component of(ComponentId id, ComponentName name, ComponentDataSourceType dataSourceType,
                               String queryServiceId, String gatewayId, ComponentPresentationType presentationType) {
        var component = new Component();
        component.id = id;
        component.name = name;
        component.dataSourceType = dataSourceType;
        component.queryServiceId = queryServiceId;
        component.gatewayId = gatewayId;
        component.presentationType = presentationType;
        return component;
    }

    public static Component load(String id, String name, String dataSourceType,
                                 String queryServiceId, String gatewayId, String presentationType) {
        var component = new Component();
        component.id = new ComponentId(id);
        component.name = new ComponentName(name);
        component.dataSourceType = dataSourceType != null ? ComponentDataSourceType.valueOf(dataSourceType) : null;
        component.queryServiceId = queryServiceId;
        component.gatewayId = gatewayId;
        component.presentationType = presentationType != null ? ComponentPresentationType.valueOf(presentationType) : null;
        return component;
    }

    public void update(ComponentName name, ComponentDataSourceType dataSourceType,
                       String queryServiceId, String gatewayId, ComponentPresentationType presentationType) {
        this.name = name;
        this.dataSourceType = dataSourceType;
        this.queryServiceId = queryServiceId;
        this.gatewayId = gatewayId;
        this.presentationType = presentationType;
    }
}
