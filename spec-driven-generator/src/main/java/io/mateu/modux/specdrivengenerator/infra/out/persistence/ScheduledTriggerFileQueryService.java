package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.ScheduledTriggerQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ScheduledTriggerDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ScheduledTriggerRow;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduledTriggerFileQueryService implements ScheduledTriggerQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ScheduledTriggerRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ScheduledTriggerEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ScheduledTriggerRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ScheduledTriggerEntity.class).map(ScheduledTriggerEntity::name).orElseThrow();
    }

    @Override
    public Optional<ScheduledTriggerDto> getById(String id) {
        return repository.findById(id, ScheduledTriggerEntity.class)
                .map(entity -> new ScheduledTriggerDto(
                        entity.id(),
                        entity.name(),
                        entity.cronExpression(),
                        entity.timezone(),
                        entity.useCaseId(),
                        entity.modelMappingId(),
                        entity.description(),
                        entity.executionEnvironment(),
                        entity.lockProvider(),
                        entity.maxExecutionTimeMs(),
                        entity.failureNotificationEmail(),
                        entity.misfirePolicy(),
                        entity.allowConcurrentExecution(),
                        entity.retryOnFailure(), entity.retryCount()));
    }
}
