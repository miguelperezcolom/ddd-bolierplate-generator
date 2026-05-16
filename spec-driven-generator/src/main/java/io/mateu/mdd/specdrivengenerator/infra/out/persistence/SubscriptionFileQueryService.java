package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.SubscriptionQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionActionDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SubscriptionRow;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionFileQueryService implements SubscriptionQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<SubscriptionRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, SubscriptionEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new SubscriptionRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, SubscriptionEntity.class).map(SubscriptionEntity::name).orElseThrow();
    }

    @Override
    public Optional<SubscriptionDto> getById(String id) {
        return repository.findById(id, SubscriptionEntity.class)
                .map(entity -> new SubscriptionDto(
                        entity.id(),
                        entity.name(),
                        entity.eventName(),
                        entity.sourceService(),
                        entity.inputModelId(),
                        entity.topicName(),
                        entity.consumerGroup(),
                        entity.retryCount(),
                        entity.deadLetterTopic(),
                        entity.actions() == null ? List.of() : entity.actions().stream()
                                .map(a -> new SubscriptionActionDto(a.id(), a.name(), a.type(),
                                        a.useCaseId(), a.sagaId(), a.projectionId(), a.modelMappingId()))
                                .toList(),
                        entity.scalingStrategy(),
                        entity.filterExpression()));
    }
}
