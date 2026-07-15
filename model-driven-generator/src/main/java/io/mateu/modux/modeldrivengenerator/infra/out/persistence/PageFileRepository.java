package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageButton;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageFieldConfig;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageRule;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageTrigger;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageValidation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.PageWizardStep;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageRuleAction;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageRuleFieldAttribute;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageRuleResult;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageTriggerType;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageFieldConfigEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageRuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageValidationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageWizardStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PageFileRepository implements PageRepository {

    final ModelStore repository;

    @Override
    public Optional<Page> findById(PageId id) {
        return repository.findById(id.id(), PageEntity.class)
                .map(entity -> Page.load(
                        entity.id(),
                        entity.name(),
                        entity.route(),
                        entity.type(),
                        entity.aggregateId(),
                        entity.modelId(),
                        entity.componentIds(),
                        entity.listingDataSourceType(),
                        entity.listingGatewayId(),
                        entity.toolbar() != null ? entity.toolbar().stream()
                                .map(e -> new PageButton(e.label(), e.icon(), e.useCaseId(), e.actionId(), e.mappingId()))
                                .toList() : List.of(),
                        entity.bottomBar() != null ? entity.bottomBar().stream()
                                .map(e -> new PageButton(e.label(), e.icon(), e.useCaseId(), e.actionId(), e.mappingId()))
                                .toList() : List.of(),
                        entity.triggers() != null ? entity.triggers().stream()
                                .map(e -> new PageTrigger(
                                        e.type() != null ? PageTriggerType.valueOf(e.type()) : null,
                                        e.actionId(), e.timeoutMillis(), e.times(), e.condition(),
                                        e.calledActionId(), e.propertyName(), e.eventName()))
                                .toList() : List.of(),
                        entity.rules() != null ? entity.rules().stream()
                                .map(e -> new PageRule(
                                        e.filter(),
                                        e.action() != null ? PageRuleAction.valueOf(e.action()) : null,
                                        e.fieldName(),
                                        e.fieldAttribute() != null ? PageRuleFieldAttribute.valueOf(e.fieldAttribute()) : null,
                                        e.value(), e.expression(), e.actionId(),
                                        e.result() != null ? PageRuleResult.valueOf(e.result()) : null))
                                .toList() : List.of(),
                        entity.validations() != null ? entity.validations().stream()
                                .map(e -> new PageValidation(e.condition(), e.fieldId(), e.message()))
                                .toList() : List.of(),
                        entity.fieldConfigs() != null ? entity.fieldConfigs().stream()
                                .map(e -> new PageFieldConfig(
                                        e.fieldId(),
                                        e.stereotype() != null ? PageFieldStereotype.valueOf(e.stereotype()) : null,
                                        e.colspan(), e.style(), e.cssClass(), e.label(), e.help()))
                                .toList() : List.of(),
                        entity.wizardSteps() != null ? entity.wizardSteps().stream()
                                .map(e -> new PageWizardStep(e.pageId(), e.label()))
                                .toList() : List.of(),
                        entity.completionActions() != null ? entity.completionActions().stream()
                                .map(e -> new PageButton(e.label(), e.icon(), e.useCaseId(), e.actionId(), e.mappingId()))
                                .toList() : List.of(),
                        entity.listingQueryServiceId(),
                        entity.favicon(), entity.title(), entity.style()));
    }

    @Override
    public Page save(Page entity) {
        // The domain Page does not model everything (content, crud targets, button
        // groups…) — start from the stored entity so a domain save never wipes what
        // the editor authored, and overwrite only the domain-managed fields.
        var stored = repository.findById(entity.getId().id(), PageEntity.class).orElse(null);
        var builder = stored != null ? stored.toBuilder() : PageEntity.builder()
                .content(List.of());
        repository.save(builder
                .id(entity.getId().id())
                .name(entity.getName().name())
                .route(entity.getRoute())
                .type(entity.getType() != null ? entity.getType().name() : null)
                .aggregateId(entity.getAggregateId())
                .modelId(entity.getModelId())
                .componentIds(entity.getComponentIds())
                .listingDataSourceType(entity.getListingDataSourceType() != null ? entity.getListingDataSourceType().name() : null)
                .listingGatewayId(entity.getListingGatewayId())
                .toolbar(entity.getToolbar().stream()
                        .map(b -> new PageButtonEntity(b.label(), b.icon(), b.useCaseId(), b.actionId(), b.mappingId()))
                        .toList())
                .bottomBar(entity.getBottomBar().stream()
                        .map(b -> new PageButtonEntity(b.label(), b.icon(), b.useCaseId(), b.actionId(), b.mappingId()))
                        .toList())
                .triggers(entity.getTriggers().stream()
                        .map(t -> new PageTriggerEntity(
                                t.type() != null ? t.type().name() : null,
                                t.actionId(), t.timeoutMillis(), t.times(), t.condition(),
                                t.calledActionId(), t.propertyName(), t.eventName()))
                        .toList())
                .rules(entity.getRules().stream()
                        .map(r -> new PageRuleEntity(
                                r.filter(),
                                r.action() != null ? r.action().name() : null,
                                r.fieldName(),
                                r.fieldAttribute() != null ? r.fieldAttribute().name() : null,
                                r.value(), r.expression(), r.actionId(),
                                r.result() != null ? r.result().name() : null))
                        .toList())
                .validations(entity.getValidations().stream()
                        .map(v -> new PageValidationEntity(v.condition(), v.fieldId(), v.message()))
                        .toList())
                .fieldConfigs(entity.getFieldConfigs().stream()
                        .map(f -> new PageFieldConfigEntity(
                                f.fieldId(),
                                f.stereotype() != null ? f.stereotype().name() : null,
                                f.colspan(), f.style(), f.cssClass(), f.label(), f.help()))
                        .toList())
                .wizardSteps(entity.getWizardSteps().stream()
                        .map(s -> new PageWizardStepEntity(s.pageId(), s.label()))
                        .toList())
                .completionActions(entity.getCompletionActions().stream()
                        .map(b -> new PageButtonEntity(b.label(), b.icon(), b.useCaseId(), b.actionId(), b.mappingId()))
                        .toList())
                .listingQueryServiceId(entity.getListingQueryServiceId())
                .favicon(entity.getFavicon())
                .title(entity.getTitle())
                .style(entity.getStyle() != null ? entity.getStyle().name() : null)
                .build());
        return entity;
    }

    @Override
    public void deleteAllById(List<PageId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(PageId::id).toList(), PageEntity.class);
    }
}
