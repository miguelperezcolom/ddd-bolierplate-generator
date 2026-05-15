package io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import lombok.Getter;

import java.util.List;

@Getter
public class ReadModel {

    private ReadModelId id;
    private ReadModelName name;
    private String modelId;
    private List<String> filterFields;
    private List<String> sortFields;
    private boolean cacheable;
    private Integer cacheTtlSeconds;

    public static ReadModel of(ReadModelId id, ReadModelName name,
                               String modelId,
                               List<String> filterFields,
                               List<String> sortFields,
                               boolean cacheable,
                               Integer cacheTtlSeconds) {
        var readModel = new ReadModel();
        readModel.id = id;
        readModel.name = name;
        readModel.modelId = modelId;
        readModel.filterFields = filterFields != null ? filterFields : List.of();
        readModel.sortFields = sortFields != null ? sortFields : List.of();
        readModel.cacheable = cacheable;
        readModel.cacheTtlSeconds = cacheTtlSeconds;
        return readModel;
    }

    public static ReadModel load(String id, String name,
                                 String modelId,
                                 List<String> filterFields,
                                 List<String> sortFields,
                                 boolean cacheable,
                                 Integer cacheTtlSeconds) {
        var readModel = new ReadModel();
        readModel.id = new ReadModelId(id);
        readModel.name = new ReadModelName(name);
        readModel.modelId = modelId;
        readModel.filterFields = filterFields != null ? filterFields : List.of();
        readModel.sortFields = sortFields != null ? sortFields : List.of();
        readModel.cacheable = cacheable;
        readModel.cacheTtlSeconds = cacheTtlSeconds;
        return readModel;
    }

    public void update(ReadModelName name,
                       String modelId,
                       List<String> filterFields,
                       List<String> sortFields,
                       boolean cacheable,
                       Integer cacheTtlSeconds) {
        this.name = name;
        this.modelId = modelId;
        this.filterFields = filterFields != null ? filterFields : List.of();
        this.sortFields = sortFields != null ? sortFields : List.of();
        this.cacheable = cacheable;
        this.cacheTtlSeconds = cacheTtlSeconds;
    }
}
