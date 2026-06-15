package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.EnumDefinitionQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.EnumDefinitionDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.EnumDefinitionRow;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.EnumDefinitionValueDto;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.EnumEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnumDefinitionFileQueryService implements EnumDefinitionQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<EnumDefinitionRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, EnumEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new EnumDefinitionRow(entity.id()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, EnumEntity.class).map(EnumEntity::id).orElseThrow();
    }

    @Override
    public Optional<EnumDefinitionDto> getById(String id) {
        return repository.findById(id, EnumEntity.class)
                .map(entity -> new EnumDefinitionDto(
                        entity.id(),
                        entity.values() == null ? List.of() :
                                entity.values().stream()
                                        .map(v -> new EnumDefinitionValueDto(v.id(), v.name()))
                                        .toList()));
    }
}
