package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.RoleQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.RoleDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.RoleRow;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleFileQueryService implements RoleQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<RoleRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, RoleEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new RoleRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, RoleEntity.class).map(RoleEntity::name).orElseThrow();
    }

    @Override
    public Optional<RoleDto> getById(String id) {
        return repository.findById(id, RoleEntity.class)
                .map(entity -> new RoleDto(
                        entity.id(),
                        entity.name(),
                        entity.allowedUseCaseIds(),
                        entity.allowedReadModelIds()));
    }
}
