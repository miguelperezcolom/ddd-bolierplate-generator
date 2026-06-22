package io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import lombok.Getter;

@Getter
public class ReadModel {

    private ReadModelId id;
    private ReadModelName name;
    private String serviceId;
    private String description;
    private String modelId;
    private ReadModelStorageType storageType;
    private ReadModelConsistency consistency;

    public static ReadModel of(ReadModelId id, ReadModelName name, String serviceId, String description,
                               String modelId, ReadModelStorageType storageType, ReadModelConsistency consistency) {
        var readModel = new ReadModel();
        readModel.id = id;
        readModel.name = name;
        readModel.serviceId = serviceId;
        readModel.description = description;
        readModel.modelId = modelId;
        readModel.storageType = storageType;
        readModel.consistency = consistency;
        return readModel;
    }

    public static ReadModel load(String id, String name, String serviceId, String description,
                                 String modelId, ReadModelStorageType storageType, ReadModelConsistency consistency) {
        var readModel = new ReadModel();
        readModel.id = new ReadModelId(id);
        readModel.name = new ReadModelName(name);
        readModel.serviceId = serviceId;
        readModel.description = description;
        readModel.modelId = modelId;
        readModel.storageType = storageType;
        readModel.consistency = consistency;
        return readModel;
    }

    public void update(ReadModelName name, String serviceId, String description,
                       String modelId, ReadModelStorageType storageType, ReadModelConsistency consistency) {
        this.name = name;
        this.serviceId = serviceId;
        this.description = description;
        this.modelId = modelId;
        this.storageType = storageType;
        this.consistency = consistency;
    }
}
