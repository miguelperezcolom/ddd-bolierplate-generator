package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.ContextMapRelationData;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.create.CreateProjectCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.create.CreateProjectUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.save.SaveProjectCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.save.SaveProjectUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.CicdProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectEnvironment;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEnvironmentConfigEntity;
import io.mateu.uidl.annotations.*;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ProjectViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {
    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;
    @NotEmpty String name;
    @NotEmpty
    String outputPath;
    @NotEmpty
    String packageName;
    String gitRepository;
    String database;
    DbMigrationTool dbMigrationTool;

    @Tab("Terraform")
    TerraformProvider terraformProvider;
    String terraformProviderVersion;
    TerraformBackendType terraformBackendType;

    @Tab("IAM")
    IamProvider iamProvider;

    @Tab("Messaging")
    MessageBrokerType messageBrokerType;

    @Tab("Observability")
    TracingProvider tracingProvider;
    MetricsProvider metricsProvider;
    LoggingProvider loggingProvider;

    @Tab("LLM")
    LlmProvider llmProvider;

    @Tab("Cache")
    CacheProvider cacheProvider;

    @Tab("File Storage")
    FileStorageProvider fileStorageProvider;

    @Tab("Email")
    EmailProvider emailProvider;

    @Tab("Secrets")
    SecretsProvider secretsProvider;

    @Tab("CI/CD")
    CicdProvider cicdProvider;

    @Tab("Environments")
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<ProjectEnvironmentConfigViewModel> environments = new ArrayList<>();

    @Tab("Services")
    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    List<String> services;

    @Tab("Context Map")
    List<ContextMapRelationViewModel> contextMap = new ArrayList<>();

    final CreateProjectUseCase createUseCase;
    final SaveProjectUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateProjectCommand(id, name, outputPath, packageName,
                gitRepository, database, dbMigrationTool,
                terraformProvider, terraformProviderVersion,
                terraformBackendType,
                iamProvider,
                messageBrokerType,
                tracingProvider,
                metricsProvider,
                loggingProvider,
                llmProvider,
                cacheProvider,
                fileStorageProvider,
                emailProvider,
                secretsProvider,
                cicdProvider != null ? cicdProvider.name() : null,
                toEnvironmentEntityList(environments),
                services,
                toContextMapData(contextMap)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveProjectCommand(id, name, outputPath, packageName,
                gitRepository, database, dbMigrationTool,
                terraformProvider, terraformProviderVersion,
                terraformBackendType,
                iamProvider,
                messageBrokerType,
                tracingProvider,
                metricsProvider,
                loggingProvider,
                llmProvider,
                cacheProvider,
                fileStorageProvider,
                emailProvider,
                secretsProvider,
                cicdProvider != null ? cicdProvider.name() : null,
                toEnvironmentEntityList(environments),
                services,
                toContextMapData(contextMap)));
    }

    @Override
    public String id() {
        return id;
    }

    public ProjectViewModel load(ProjectDto model) {
        id = model.id();
        name = model.name();
        outputPath = model.outputPath();
        packageName = model.packageName();
        gitRepository = model.gitRepository();
        database = model.database();
        dbMigrationTool = model.dbMigrationTool();
        terraformProvider = model.terraformProvider();
        terraformProviderVersion = model.terraformProviderVersion();
        terraformBackendType = model.terraformBackendType();
        iamProvider = model.iamProvider();
        messageBrokerType = model.messageBrokerType();
        tracingProvider = model.tracingProvider();
        metricsProvider = model.metricsProvider();
        loggingProvider = model.loggingProvider();
        llmProvider = model.llmProvider();
        cacheProvider = model.cacheProvider();
        fileStorageProvider = model.fileStorageProvider();
        emailProvider = model.emailProvider();
        secretsProvider = model.secretsProvider();
        cicdProvider = model.cicdProvider() != null ? CicdProvider.valueOf(model.cicdProvider()) : null;
        environments = model.environments() == null ? new ArrayList<>() :
                model.environments().stream().map(e -> {
                    var vm = new ProjectEnvironmentConfigViewModel();
                    vm.setEnvironment(e.environment() != null ? ProjectEnvironment.valueOf(e.environment()) : null);
                    vm.setKubernetesClusterUrl(e.kubernetesClusterUrl());
                    vm.setKubernetesNamespace(e.kubernetesNamespace());
                    vm.setKubernetesContext(e.kubernetesContext());
                    vm.setKubernetesToken(e.kubernetesToken());
                    vm.setKubernetesCertificateAuthorityData(e.kubernetesCertificateAuthorityData());
                    vm.setTerraformBackendBucket(e.terraformBackendBucket());
                    vm.setTerraformBackendRegion(e.terraformBackendRegion());
                    vm.setTerraformBackendKey(e.terraformBackendKey());
                    vm.setTerraformWorkspace(e.terraformWorkspace());
                    vm.setIamServerUrl(e.iamServerUrl());
                    vm.setIamRealm(e.iamRealm());
                    vm.setIamClientId(e.iamClientId());
                    vm.setIamClientSecret(e.iamClientSecret());
                    vm.setIamAudience(e.iamAudience());
                    vm.setMessageBrokerUrl(e.messageBrokerUrl());
                    vm.setMessageBrokerUsername(e.messageBrokerUsername());
                    vm.setMessageBrokerPassword(e.messageBrokerPassword());
                    vm.setTracingEndpoint(e.tracingEndpoint());
                    vm.setMetricsEndpoint(e.metricsEndpoint());
                    vm.setLoggingEndpoint(e.loggingEndpoint());
                    vm.setLlmApiUrl(e.llmApiUrl());
                    vm.setLlmApiKey(e.llmApiKey());
                    vm.setLlmModel(e.llmModel());
                    vm.setCacheUrl(e.cacheUrl());
                    vm.setCacheUsername(e.cacheUsername());
                    vm.setCachePassword(e.cachePassword());
                    vm.setFileStorageBucket(e.fileStorageBucket());
                    vm.setFileStorageRegion(e.fileStorageRegion());
                    vm.setFileStorageAccessKey(e.fileStorageAccessKey());
                    vm.setFileStorageSecretKey(e.fileStorageSecretKey());
                    vm.setFileStorageEndpoint(e.fileStorageEndpoint());
                    vm.setEmailHost(e.emailHost());
                    vm.setEmailPort(e.emailPort());
                    vm.setEmailUsername(e.emailUsername());
                    vm.setEmailPassword(e.emailPassword());
                    vm.setEmailFrom(e.emailFrom());
                    vm.setSecretsEndpoint(e.secretsEndpoint());
                    vm.setSecretsToken(e.secretsToken());
                    vm.setIngressDomain(e.ingressDomain());
                    vm.setIngressTlsEnabled(e.ingressTlsEnabled());
                    vm.setIngressClassName(e.ingressClassName());
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        services = model.serviceIds();
        contextMap = model.contextMap() == null ? new ArrayList<>() :
                model.contextMap().stream().map(r -> {
                    var vm = new ContextMapRelationViewModel();
                    vm.id = r.id();
                    vm.name = r.name();
                    vm.sourceModuleId = r.sourceModuleId();
                    vm.targetModuleId = r.targetModuleId();
                    vm.type = r.type() != null ? ContextMapRelationType.valueOf(r.type()) : null;
                    vm.description = r.description();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<ProjectEnvironmentConfigEntity> toEnvironmentEntityList(List<ProjectEnvironmentConfigViewModel> list) {
        if (list == null) return List.of();
        return list.stream().map(e -> new ProjectEnvironmentConfigEntity(
                e.getEnvironment() != null ? e.getEnvironment().name() : null,
                e.getKubernetesClusterUrl(),
                e.getKubernetesNamespace(),
                e.getKubernetesContext(),
                e.getKubernetesToken(),
                e.getKubernetesCertificateAuthorityData(),
                e.getTerraformBackendBucket(),
                e.getTerraformBackendRegion(),
                e.getTerraformBackendKey(),
                e.getTerraformWorkspace(),
                e.getIamServerUrl(),
                e.getIamRealm(),
                e.getIamClientId(),
                e.getIamClientSecret(),
                e.getIamAudience(),
                e.getMessageBrokerUrl(),
                e.getMessageBrokerUsername(),
                e.getMessageBrokerPassword(),
                e.getTracingEndpoint(),
                e.getMetricsEndpoint(),
                e.getLoggingEndpoint(),
                e.getLlmApiUrl(),
                e.getLlmApiKey(),
                e.getLlmModel(),
                e.getCacheUrl(),
                e.getCacheUsername(),
                e.getCachePassword(),
                e.getFileStorageBucket(),
                e.getFileStorageRegion(),
                e.getFileStorageAccessKey(),
                e.getFileStorageSecretKey(),
                e.getFileStorageEndpoint(),
                e.getEmailHost(),
                e.getEmailPort(),
                e.getEmailUsername(),
                e.getEmailPassword(),
                e.getEmailFrom(),
                e.getSecretsEndpoint(),
                e.getSecretsToken(),
                e.getIngressDomain(),
                e.getIngressTlsEnabled(),
                e.getIngressClassName()
        )).toList();
    }

    private List<ContextMapRelationData> toContextMapData(List<ContextMapRelationViewModel> list) {
        if (list == null) return List.of();
        return list.stream()
                .map(r -> new ContextMapRelationData(r.id, r.name, r.sourceModuleId, r.targetModuleId,
                        r.type != null ? r.type.name() : null, r.description))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New project";
    }

}
