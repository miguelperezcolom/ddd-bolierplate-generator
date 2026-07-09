package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

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
        /** The page's content tree: Mateu layouts with components inside. */
        List<UiComponentNodeEntity> content
) implements Identifiable {

    /** Backward-compatible constructor (pre-content callers and stores). */
    public PageEntity(String id, String name, String route, String type, String aggregateId,
                      String modelId, List<String> componentIds, String listingDataSourceType,
                      String listingGatewayId, List<PageButtonEntity> toolbar,
                      List<PageButtonEntity> bottomBar, List<PageTriggerEntity> triggers,
                      List<PageRuleEntity> rules, List<PageValidationEntity> validations,
                      List<PageFieldConfigEntity> fieldConfigs, List<PageWizardStepEntity> wizardSteps,
                      List<PageButtonEntity> completionActions, String listingQueryServiceId) {
        this(id, name, route, type, aggregateId, modelId, componentIds, listingDataSourceType,
                listingGatewayId, toolbar, bottomBar, triggers, rules, validations, fieldConfigs,
                wizardSteps, completionActions, listingQueryServiceId, List.of());
    }
}
