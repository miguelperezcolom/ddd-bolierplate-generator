package io.mateu.mdd.specdrivengenerator.domain.aggregates.entity;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.entity.vo.EntityId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.entity.vo.EntityName;
import lombok.Getter;

@Getter
public class Entity {

    private EntityId id;
    private EntityName name;
    private String modelId;
    private String parentAggregateId;
    private boolean isCollection;

    public static Entity of(EntityId id, EntityName name,
                            String modelId, String parentAggregateId, boolean isCollection) {
        var entity = new Entity();
        entity.id = id;
        entity.name = name;
        entity.modelId = modelId;
        entity.parentAggregateId = parentAggregateId;
        entity.isCollection = isCollection;
        return entity;
    }

    public static Entity load(String id, String name,
                              String modelId, String parentAggregateId, boolean isCollection) {
        var entity = new Entity();
        entity.id = new EntityId(id);
        entity.name = new EntityName(name);
        entity.modelId = modelId;
        entity.parentAggregateId = parentAggregateId;
        entity.isCollection = isCollection;
        return entity;
    }

    public void update(EntityName name, String modelId, String parentAggregateId, boolean isCollection) {
        this.name = name;
        this.modelId = modelId;
        this.parentAggregateId = parentAggregateId;
        this.isCollection = isCollection;
    }
}
