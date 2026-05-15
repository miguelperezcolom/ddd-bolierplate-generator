package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;

import java.util.List;
import java.util.Optional;

public interface ReadModelRepository {
    Optional<ReadModel> findById(ReadModelId id);
    ReadModel save(ReadModel readModel);
    void deleteAllById(List<ReadModelId> selectedIds);
}
