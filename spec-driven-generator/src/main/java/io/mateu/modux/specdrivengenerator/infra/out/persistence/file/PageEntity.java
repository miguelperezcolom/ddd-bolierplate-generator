package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record PageEntity(
        String id,
        String name,
        String route,
        String type,
        String aggregateId,
        String modelId,
        List<String> componentIds,
        String listingDataSourceType,
        String listingQueryServiceId,
        String listingGatewayId,
        List<PageButtonEntity> toolbar,
        List<PageButtonEntity> bottomBar,
        List<PageTriggerEntity> triggers,
        List<PageRuleEntity> rules,
        List<PageValidationEntity> validations,
        List<PageFieldConfigEntity> fieldConfigs,
        List<PageWizardStepEntity> wizardSteps,
        List<PageButtonEntity> completionActions
) implements Identifiable {
}
