package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.ModelMapping;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;

import java.util.List;
import java.util.Optional;

public interface ModelMappingRepository {
    Optional<ModelMapping> findById(ModelMappingId id);
    ModelMapping save(ModelMapping entity);
    void deleteAllById(List<ModelMappingId> selectedIds);
}
