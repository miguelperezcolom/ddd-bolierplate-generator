package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.SagaQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaRow;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaStepDto;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SagaFileQueryService implements SagaQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<SagaRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, SagaEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new SagaRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, SagaEntity.class).map(SagaEntity::name).orElseThrow();
    }

    @Override
    public Optional<SagaDto> getById(String id) {
        return repository.findById(id, SagaEntity.class)
                .map(entity -> new SagaDto(
                        entity.id(),
                        entity.name(),
                        entity.timeoutMs(),
                        entity.triggeringEventIds() != null ? entity.triggeringEventIds() : List.of(),
                        entity.steps() == null ? List.of() : entity.steps().stream()
                                .map(s -> new SagaStepDto(s.id(), s.name(), s.type(), s.compensatingStepId(),
                                        s.aggregateId(), s.operationId(),
                                        s.gatewayId(), s.gatewayOperationId(),
                                        s.domainEventId(), s.useCaseId(), s.modelMappingId()))
                                .toList()));
    }
}
