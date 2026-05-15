package io.mateu.mdd.specdrivengenerator.domain.aggregates.projection;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Projection {

    private ProjectionId id;
    private ProjectionName name;
    private ProjectionModelId modelId;
    private List<ProjectionEventHandler> handlers;

    public static Projection of(ProjectionId id, ProjectionName name,
                                ProjectionModelId modelId,
                                List<ProjectionEventHandler> handlers) {
        var projection = new Projection();
        projection.id = id;
        projection.name = name;
        projection.modelId = modelId;
        projection.handlers = handlers != null ? handlers : List.of();
        return projection;
    }

    public static Projection load(String id, String name,
                                  String modelId,
                                  List<ProjectionEventHandler> handlers) {
        var projection = new Projection();
        projection.id = new ProjectionId(id);
        projection.name = new ProjectionName(name);
        projection.modelId = modelId != null ? new ProjectionModelId(modelId) : null;
        projection.handlers = handlers != null ? handlers : List.of();
        return projection;
    }

    public void update(ProjectionName name,
                       ProjectionModelId modelId,
                       List<ProjectionEventHandler> handlers) {
        this.name = name;
        this.modelId = modelId;
        this.handlers = handlers != null ? handlers : List.of();
    }
}
