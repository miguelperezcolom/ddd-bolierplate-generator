package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.BusinessRuleQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleActionDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleConditionDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.BusinessRuleRow;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.BusinessRuleActionEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.BusinessRuleConditionEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.BusinessRuleEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BusinessRuleFileQueryService implements BusinessRuleQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<BusinessRuleRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, BusinessRuleEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new BusinessRuleRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, BusinessRuleEntity.class).map(BusinessRuleEntity::name).orElseThrow();
    }

    @Override
    public Optional<BusinessRuleDto> getById(String id) {
        return repository.findById(id, BusinessRuleEntity.class)
                .map(entity -> new BusinessRuleDto(
                        entity.id(),
                        entity.name(),
                        entity.description(),
                        entity.modelId(),
                        entity.priority(),
                        entity.enabled(),
                        entity.ruleGroup(),
                        toConditionDtos(entity.conditions()),
                        toActionDtos(entity.actions())));
    }

    private List<BusinessRuleConditionDto> toConditionDtos(List<BusinessRuleConditionEntity> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new BusinessRuleConditionDto(c.id(), c.expression(), c.description()))
                .toList();
    }

    private List<BusinessRuleActionDto> toActionDtos(List<BusinessRuleActionEntity> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new BusinessRuleActionDto(a.id(), a.type(), a.fieldId(), a.expression(),
                        a.useCaseId(), a.domainEventId(), a.description()))
                .toList();
    }
}
