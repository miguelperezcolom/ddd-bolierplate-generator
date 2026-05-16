package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelMappingDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelMappingRow;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Pageable;

import java.util.Optional;

public interface ModelMappingQueryService {
    ListingData<ModelMappingRow> findAll(String searchText, Object filters, Pageable pageable);
    String getLabel(String id);
    Optional<ModelMappingDto> getById(String id);
}
