package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.DecisionQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionRow;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DecisionFileQueryService implements DecisionQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<DecisionRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, DecisionEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(e -> new DecisionRow(e.id(), e.name(), e.status()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, DecisionEntity.class).map(DecisionEntity::name).orElseThrow();
    }

    @Override
    public Optional<DecisionDto> getById(String id) {
        return repository.findById(id, DecisionEntity.class)
                .map(e -> new DecisionDto(e.id(), e.name(), e.decision(), e.rationale(),
                        e.status(), e.source()));
    }
}
