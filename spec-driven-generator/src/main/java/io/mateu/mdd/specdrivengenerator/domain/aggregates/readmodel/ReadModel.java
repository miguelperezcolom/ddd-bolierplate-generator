package io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ConsistencyLevel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import lombok.Getter;

import java.util.List;

@Getter
public class ReadModel {

    private ReadModelId id;
    private ReadModelName name;
    private String modelId;
    private ReadModelStorageType storageType;
    private List<String> filterFields;
    private List<String> sortFields;
    private boolean cacheable;
    private Integer cacheTtlSeconds;
    private ConsistencyLevel consistencyLevel;
    private Long maxStalenessMs;
    private List<String> indexFields;

    public static ReadModel of(ReadModelId id, ReadModelName name,
                               String modelId,
                               ReadModelStorageType storageType,
                               List<String> filterFields,
                               List<String> sortFields,
                               boolean cacheable,
                               Integer cacheTtlSeconds,
                               ConsistencyLevel consistencyLevel,
                               Long maxStalenessMs,
                               List<String> indexFields) {
        var readModel = new ReadModel();
        readModel.id = id;
        readModel.name = name;
        readModel.modelId = modelId;
        readModel.storageType = storageType;
        readModel.filterFields = filterFields != null ? filterFields : List.of();
        readModel.sortFields = sortFields != null ? sortFields : List.of();
        readModel.cacheable = cacheable;
        readModel.cacheTtlSeconds = cacheTtlSeconds;
        readModel.consistencyLevel = consistencyLevel;
        readModel.maxStalenessMs = maxStalenessMs;
        readModel.indexFields = indexFields != null ? indexFields : List.of();
        return readModel;
    }

    public static ReadModel load(String id, String name,
                                 String modelId,
                                 String storageType,
                                 List<String> filterFields,
                                 List<String> sortFields,
                                 boolean cacheable,
                                 Integer cacheTtlSeconds,
                                 String consistencyLevel,
                                 Long maxStalenessMs,
                                 List<String> indexFields) {
        var readModel = new ReadModel();
        readModel.id = new ReadModelId(id);
        readModel.name = new ReadModelName(name);
        readModel.modelId = modelId;
        readModel.storageType = storageType != null ? ReadModelStorageType.valueOf(storageType) : null;
        readModel.filterFields = filterFields != null ? filterFields : List.of();
        readModel.sortFields = sortFields != null ? sortFields : List.of();
        readModel.cacheable = cacheable;
        readModel.cacheTtlSeconds = cacheTtlSeconds;
        readModel.consistencyLevel = consistencyLevel != null ? ConsistencyLevel.valueOf(consistencyLevel) : null;
        readModel.maxStalenessMs = maxStalenessMs;
        readModel.indexFields = indexFields != null ? indexFields : List.of();
        return readModel;
    }

    public void update(ReadModelName name,
                       String modelId,
                       ReadModelStorageType storageType,
                       List<String> filterFields,
                       List<String> sortFields,
                       boolean cacheable,
                       Integer cacheTtlSeconds,
                       ConsistencyLevel consistencyLevel,
                       Long maxStalenessMs,
                       List<String> indexFields) {
        this.name = name;
        this.modelId = modelId;
        this.storageType = storageType;
        this.filterFields = filterFields != null ? filterFields : List.of();
        this.sortFields = sortFields != null ? sortFields : List.of();
        this.cacheable = cacheable;
        this.cacheTtlSeconds = cacheTtlSeconds;
        this.consistencyLevel = consistencyLevel;
        this.maxStalenessMs = maxStalenessMs;
        this.indexFields = indexFields != null ? indexFields : List.of();
    }
}
