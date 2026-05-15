package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ReadModelDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ReadModelRow;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Pageable;

import java.util.Optional;

public interface ReadModelQueryService {
    ListingData<ReadModelRow> findAll(String searchText, Object filters, Pageable pageable);
    String getLabel(String id);
    Optional<ReadModelDto> getById(String id);
}
