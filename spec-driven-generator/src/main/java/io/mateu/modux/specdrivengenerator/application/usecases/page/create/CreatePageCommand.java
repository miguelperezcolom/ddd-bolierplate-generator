package io.mateu.modux.specdrivengenerator.application.usecases.page.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageListingDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageRuleEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageTriggerEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageValidationEntity;

import java.util.List;

public record CreatePageCommand(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId,
        List<String> componentIds,
        PageListingDataSourceType listingDataSourceType,
        String listingQueryServiceId,
        String listingGatewayId,
        List<PageButtonEntity> toolbar,
        List<PageButtonEntity> bottomBar,
        List<PageTriggerEntity> triggers,
        List<PageRuleEntity> rules,
        List<PageValidationEntity> validations
) {
    public CreatePageCommand {
        if (componentIds == null) componentIds = List.of();
        if (toolbar == null) toolbar = List.of();
        if (bottomBar == null) bottomBar = List.of();
        if (triggers == null) triggers = List.of();
        if (rules == null) rules = List.of();
        if (validations == null) validations = List.of();
    }
}
