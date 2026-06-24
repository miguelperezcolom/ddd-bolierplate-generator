package io.mateu.modux.modeldrivengenerator.domain.aggregates.projection;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Projection {

    private ProjectionId id;
    private ProjectionName name;
    private ProjectionReadModelId readModelId;
    private List<ProjectionEventHandler> handlers;
    private RebuildStrategy rebuildStrategy;
    private ErrorHandlingStrategy errorHandlingStrategy;
    private Integer maxRetries;
    private boolean snapshotEnabled;
    private Integer snapshotFrequency;

    public static Projection of(ProjectionId id, ProjectionName name,
                                ProjectionReadModelId readModelId,
                                List<ProjectionEventHandler> handlers,
                                RebuildStrategy rebuildStrategy,
                                ErrorHandlingStrategy errorHandlingStrategy,
                                Integer maxRetries,
                                boolean snapshotEnabled, Integer snapshotFrequency) {
        var projection = new Projection();
        projection.id = id;
        projection.name = name;
        projection.readModelId = readModelId;
        projection.handlers = handlers != null ? handlers : List.of();
        projection.rebuildStrategy = rebuildStrategy;
        projection.errorHandlingStrategy = errorHandlingStrategy;
        projection.maxRetries = maxRetries;
        projection.snapshotEnabled = snapshotEnabled;
        projection.snapshotFrequency = snapshotFrequency;
        return projection;
    }

    public static Projection load(String id, String name,
                                  String readModelId,
                                  List<ProjectionEventHandler> handlers,
                                  String rebuildStrategy,
                                  String errorHandlingStrategy,
                                  Integer maxRetries,
                                  boolean snapshotEnabled, Integer snapshotFrequency) {
        var projection = new Projection();
        projection.id = new ProjectionId(id);
        projection.name = new ProjectionName(name);
        projection.readModelId = readModelId != null ? new ProjectionReadModelId(readModelId) : null;
        projection.handlers = handlers != null ? handlers : List.of();
        projection.rebuildStrategy = rebuildStrategy != null ? RebuildStrategy.valueOf(rebuildStrategy) : null;
        projection.errorHandlingStrategy = errorHandlingStrategy != null ? ErrorHandlingStrategy.valueOf(errorHandlingStrategy) : null;
        projection.maxRetries = maxRetries;
        projection.snapshotEnabled = snapshotEnabled;
        projection.snapshotFrequency = snapshotFrequency;
        return projection;
    }

    public void update(ProjectionName name,
                       ProjectionReadModelId readModelId,
                       List<ProjectionEventHandler> handlers,
                       RebuildStrategy rebuildStrategy,
                       ErrorHandlingStrategy errorHandlingStrategy,
                       Integer maxRetries,
                       boolean snapshotEnabled, Integer snapshotFrequency) {
        this.name = name;
        this.readModelId = readModelId;
        this.handlers = handlers != null ? handlers : List.of();
        this.rebuildStrategy = rebuildStrategy;
        this.errorHandlingStrategy = errorHandlingStrategy;
        this.maxRetries = maxRetries;
        this.snapshotEnabled = snapshotEnabled;
        this.snapshotFrequency = snapshotFrequency;
    }
}
