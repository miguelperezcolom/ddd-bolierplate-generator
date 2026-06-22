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
    private String gatewayId;
    private ComponentPresentationType presentationType;
    private String queryServiceId;

    public static Component of(ComponentId id, ComponentName name, ComponentDataSourceType dataSourceType,
                               String gatewayId, ComponentPresentationType presentationType, String queryServiceId) {
        var component = new Component();
        component.id = id;
        component.name = name;
        component.dataSourceType = dataSourceType;
        component.gatewayId = gatewayId;
        component.presentationType = presentationType;
        component.queryServiceId = queryServiceId;
        return component;
    }

    public static Component load(String id, String name, String dataSourceType,
                                 String gatewayId, String presentationType, String queryServiceId) {
        var component = new Component();
        component.id = new ComponentId(id);
        component.name = new ComponentName(name);
        component.dataSourceType = dataSourceType != null ? ComponentDataSourceType.valueOf(dataSourceType) : null;
        component.gatewayId = gatewayId;
        component.presentationType = presentationType != null ? ComponentPresentationType.valueOf(presentationType) : null;
        component.queryServiceId = queryServiceId;
        return component;
    }

    public void update(ComponentName name, ComponentDataSourceType dataSourceType,
                       String gatewayId, ComponentPresentationType presentationType, String queryServiceId) {
        this.name = name;
        this.dataSourceType = dataSourceType;
        this.gatewayId = gatewayId;
        this.presentationType = presentationType;
        this.queryServiceId = queryServiceId;
    }
}
