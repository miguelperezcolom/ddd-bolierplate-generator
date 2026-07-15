package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageFieldConfigEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageRuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageValidationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageWizardStepEntity;

import java.util.List;

public record PageDto(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId,
        List<String> componentIds,
        String listingDataSourceType,
        String listingGatewayId,
        List<PageButtonEntity> toolbar,
        List<PageButtonEntity> bottomBar,
        List<PageTriggerEntity> triggers,
        List<PageRuleEntity> rules,
        List<PageValidationEntity> validations,
        List<PageFieldConfigEntity> fieldConfigs,
        List<PageWizardStepEntity> wizardSteps,
        List<PageButtonEntity> completionActions,
        String listingQueryServiceId,
        String favicon,
        String title,
        String style
) {
    public PageDto {
        if (componentIds == null) componentIds = List.of();
        if (toolbar == null) toolbar = List.of();
        if (bottomBar == null) bottomBar = List.of();
        if (triggers == null) triggers = List.of();
        if (rules == null) rules = List.of();
        if (validations == null) validations = List.of();
        if (fieldConfigs == null) fieldConfigs = List.of();
        if (wizardSteps == null) wizardSteps = List.of();
        if (completionActions == null) completionActions = List.of();
    }
}
