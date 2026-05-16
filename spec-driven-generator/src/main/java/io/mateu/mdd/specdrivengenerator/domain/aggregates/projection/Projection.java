package io.mateu.mdd.specdrivengenerator.domain.aggregates.projection;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Projection {

    private ProjectionId id;
    private ProjectionName name;
    private ProjectionModelId modelId;
    private ProjectionStorageType storageType;
    private List<ProjectionEventHandler> handlers;
    private RebuildStrategy rebuildStrategy;
    private ErrorHandlingStrategy errorHandlingStrategy;
    private Integer maxRetries;
    private boolean snapshotEnabled;
    private Integer snapshotFrequency;

    public static Projection of(ProjectionId id, ProjectionName name,
                                ProjectionModelId modelId,
                                ProjectionStorageType storageType,
                                List<ProjectionEventHandler> handlers,
                                RebuildStrategy rebuildStrategy,
                                ErrorHandlingStrategy errorHandlingStrategy,
                                Integer maxRetries,
                                boolean snapshotEnabled, Integer snapshotFrequency) {
        var projection = new Projection();
        projection.id = id;
        projection.name = name;
        projection.modelId = modelId;
        projection.storageType = storageType;
        projection.handlers = handlers != null ? handlers : List.of();
        projection.rebuildStrategy = rebuildStrategy;
        projection.errorHandlingStrategy = errorHandlingStrategy;
        projection.maxRetries = maxRetries;
        projection.snapshotEnabled = snapshotEnabled;
        projection.snapshotFrequency = snapshotFrequency;
        return projection;
    }

    public static Projection load(String id, String name,
                                  String modelId,
                                  String storageType,
                                  List<ProjectionEventHandler> handlers,
                                  String rebuildStrategy,
                                  String errorHandlingStrategy,
                                  Integer maxRetries,
                                  boolean snapshotEnabled, Integer snapshotFrequency) {
        var projection = new Projection();
        projection.id = new ProjectionId(id);
        projection.name = new ProjectionName(name);
        projection.modelId = modelId != null ? new ProjectionModelId(modelId) : null;
        projection.storageType = storageType != null ? ProjectionStorageType.valueOf(storageType) : null;
        projection.handlers = handlers != null ? handlers : List.of();
        projection.rebuildStrategy = rebuildStrategy != null ? RebuildStrategy.valueOf(rebuildStrategy) : null;
        projection.errorHandlingStrategy = errorHandlingStrategy != null ? ErrorHandlingStrategy.valueOf(errorHandlingStrategy) : null;
        projection.maxRetries = maxRetries;
        projection.snapshotEnabled = snapshotEnabled;
        projection.snapshotFrequency = snapshotFrequency;
        return projection;
    }

    public void update(ProjectionName name,
                       ProjectionModelId modelId,
                       ProjectionStorageType storageType,
                       List<ProjectionEventHandler> handlers,
                       RebuildStrategy rebuildStrategy,
                       ErrorHandlingStrategy errorHandlingStrategy,
                       Integer maxRetries,
                       boolean snapshotEnabled, Integer snapshotFrequency) {
        this.name = name;
        this.modelId = modelId;
        this.storageType = storageType;
        this.handlers = handlers != null ? handlers : List.of();
        this.rebuildStrategy = rebuildStrategy;
        this.errorHandlingStrategy = errorHandlingStrategy;
        this.maxRetries = maxRetries;
        this.snapshotEnabled = snapshotEnabled;
        this.snapshotFrequency = snapshotFrequency;
    }
}
