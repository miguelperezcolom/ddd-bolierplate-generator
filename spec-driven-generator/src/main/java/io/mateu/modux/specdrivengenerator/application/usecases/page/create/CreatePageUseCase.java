package io.mateu.modux.specdrivengenerator.application.usecases.page.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.PageRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.Page;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.PageButton;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.PageFieldConfig;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.PageRule;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.PageTrigger;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.PageValidation;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleFieldAttribute;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleResult;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageTriggerType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreatePageUseCase {

    final PageRepository repository;

    public void handle(CreatePageCommand command) {
        var page = Page.of(
                new PageId(command.id()),
                new PageName(command.name()),
                command.route(),
                command.type(),
                command.aggregateId(),
                command.modelId(),
                command.componentIds(),
                command.listingDataSourceType(),
                command.listingQueryServiceId(),
                command.listingGatewayId(),
                command.toolbar().stream()
                        .map(e -> new PageButton(e.label(), e.icon(), e.useCaseId(), e.actionId()))
                        .toList(),
                command.bottomBar().stream()
                        .map(e -> new PageButton(e.label(), e.icon(), e.useCaseId(), e.actionId()))
                        .toList(),
                command.triggers().stream()
                        .map(e -> new PageTrigger(
                                e.type() != null ? PageTriggerType.valueOf(e.type()) : null,
                                e.actionId(), e.timeoutMillis(), e.times(), e.condition(),
                                e.calledActionId(), e.propertyName(), e.eventName()))
                        .toList(),
                command.rules().stream()
                        .map(e -> new PageRule(
                                e.filter(),
                                e.action() != null ? PageRuleAction.valueOf(e.action()) : null,
                                e.fieldName(),
                                e.fieldAttribute() != null ? PageRuleFieldAttribute.valueOf(e.fieldAttribute()) : null,
                                e.value(), e.expression(), e.actionId(),
                                e.result() != null ? PageRuleResult.valueOf(e.result()) : null))
                        .toList(),
                command.validations().stream()
                        .map(e -> new PageValidation(e.condition(), e.fieldId(), e.message()))
                        .toList(),
                command.fieldConfigs().stream()
                        .map(e -> new PageFieldConfig(
                                e.fieldId(),
                                e.stereotype() != null ? PageFieldStereotype.valueOf(e.stereotype()) : null,
                                e.colspan(), e.style(), e.cssClass(), e.label(), e.help()))
                        .toList());
        repository.save(page);
    }
}
