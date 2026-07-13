package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AclEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ButtonGroupEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GroupButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayBranchConditionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationImplementationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProxyApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProxyOperationRouteEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEdgeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramPointEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalApiOperationUseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemTableEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemUseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpServerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagContentSourceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingRuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationRefEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlFlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DocumentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IdentityProviderEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.NotificationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageWizardStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageFieldConfigEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ViewEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Component;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController.*;

/**
 * Helpers shared by the editor command handlers: the CURRENT project (and its
 * record copies), plus the workflow/use-case lookups everyone needs.
 */
@Component
@RequiredArgsConstructor
public class EditorProjectSupport {

    private final ModelStore repository;
    private final io.mateu.modux.modeldrivengenerator.application.out.ProjectStorePort projectStore;

    public static ProjectEntity withExternalSystems(
            ProjectEntity p, List<ExternalSystemEntity> externalSystems) {
        return new ProjectEntity(
                p.id(), p.name(), p.outputPath(), p.packageName(), p.gitRepository(), p.database(),
                p.dbMigrationTool(), p.terraformProvider(), p.terraformProviderVersion(),
                p.terraformBackendType(), p.iamProvider(), p.messageBrokerType(), p.tracingProvider(),
                p.metricsProvider(), p.loggingProvider(), p.llmProvider(), p.cacheProvider(),
                p.fileStorageProvider(), p.emailProvider(), p.secretsProvider(), p.cicdProvider(),
                p.environments(), p.serviceIds(), p.contextMap(), p.tenancyStrategy(),
                externalSystems, p.objective());
    }

    public ProjectEntity owningProject() {
        return currentProject().orElseThrow(() -> new IllegalStateException(
                "No hay ningún proyecto en el store — crea uno en Organización → Projects"));
    }

    public Optional<ProjectEntity> currentProject() {
        var projects = repository.findAllOfType(ProjectEntity.class);
        return projectStore.currentProjectId()
                .flatMap(id -> projects.stream().filter(p -> p.id().equals(id)).findFirst())
                .or(() -> projects.stream().findFirst());
    }

    /** Record copy with only contextMap replaced — every other field is preserved verbatim. */
    public static ProjectEntity withContextMap(
            ProjectEntity p, List<ContextMapRelationEntity> contextMap) {
        return new ProjectEntity(
                p.id(), p.name(), p.outputPath(), p.packageName(), p.gitRepository(), p.database(),
                p.dbMigrationTool(), p.terraformProvider(), p.terraformProviderVersion(),
                p.terraformBackendType(), p.iamProvider(), p.messageBrokerType(), p.tracingProvider(),
                p.metricsProvider(), p.loggingProvider(), p.llmProvider(), p.cacheProvider(),
                p.fileStorageProvider(), p.emailProvider(), p.secretsProvider(), p.cicdProvider(),
                p.environments(), p.serviceIds(), contextMap, p.tenancyStrategy(),
                p.externalSystems(), p.objective());
    }

    public WorkflowEntity requireWorkflow(String workflowId) {
        return repository.findById(workflowId, WorkflowEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Workflow desconocido: " + workflowId));
    }

    public void clearMcpExposureIfUnused(String useCaseId) {
        var stillUsed = repository.findAllOfType(AiAgentEntity.class).stream()
                .anyMatch(a -> a.allowedUseCaseIds().contains(useCaseId));
        if (stillUsed) return;
        repository.findById(useCaseId, UseCaseEntity.class)
                .filter(UseCaseEntity::exposedAsMcp)
                .ifPresent(uc -> repository.save(withExposedAsMcp(uc, false)));
    }

    public static UseCaseEntity withExposedAsMcp(UseCaseEntity uc, boolean exposedAsMcp) {
        return new UseCaseEntity(
                uc.id(), uc.name(), uc.exposedAsRest(), uc.exposedAsGrpc(), exposedAsMcp,
                uc.exposedAsAsync(), uc.exposedAsUi(), uc.inputModelId(), uc.outputModelId(), uc.steps(),
                uc.allowedRoles(), uc.allowedScopes(), uc.apiVersion(), uc.mcpDescription(),
                uc.restHttpMethod(), uc.restPath(), uc.asyncRetryCount(), uc.asyncDeadLetterQueue(),
                uc.asyncOrderingKey(), uc.asyncTopicName(), uc.asyncConsumerGroup(), uc.cacheable(),
                uc.cacheTtlSeconds(), uc.timeoutMs(), uc.transactionBoundary(), uc.idempotencyEnabled(),
                uc.idempotencyKeyField(), uc.rateLimitEnabled(), uc.rateLimitRequestsPerSecond(),
                uc.grpcServiceName(), uc.grpcMethodName(), uc.decisionIds(), uc.policy());
    }
}
