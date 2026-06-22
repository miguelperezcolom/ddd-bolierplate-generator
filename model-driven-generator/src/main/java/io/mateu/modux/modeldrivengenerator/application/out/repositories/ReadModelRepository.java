package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;

import java.util.List;
import java.util.Optional;

public interface ReadModelRepository {
    Optional<ReadModel> findById(ReadModelId id);
    ReadModel save(ReadModel readModel);
    void deleteAllById(List<ReadModelId> selectedIds);
}
