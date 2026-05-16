package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.ModelMapping;
import io.mateu.modux.specdrivengenerator.domain.aggregates.modelmapping.vo.ModelMappingId;

import java.util.List;
import java.util.Optional;

public interface ModelMappingRepository {
    Optional<ModelMapping> findById(ModelMappingId id);
    ModelMapping save(ModelMapping entity);
    void deleteAllById(List<ModelMappingId> selectedIds);
}
