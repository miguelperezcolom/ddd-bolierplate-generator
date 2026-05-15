package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.project;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.create.CreateProjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.create.CreateProjectUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.save.SaveProjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.save.SaveProjectUseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ServiceIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ServiceIdOptionsSupplier;
import io.mateu.uidl.annotations.*;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

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

    @Tab("Kubernetes")
    String kubernetesClusterUrl;
    String kubernetesNamespace;
    String kubernetesContext;
    String kubernetesToken;
    String kubernetesCertificateAuthorityData;

    @Tab("Terraform")
    TerraformProvider terraformProvider;
    String terraformProviderVersion;
    TerraformBackendType terraformBackendType;
    String terraformBackendBucket;
    String terraformBackendRegion;
    String terraformBackendKey;
    String terraformWorkspace;

    @Tab("IAM")
    IamProvider iamProvider;
    String iamServerUrl;
    String iamRealm;
    String iamClientId;
    String iamClientSecret;
    String iamAudience;

    @Tab("Messaging")
    MessageBrokerType messageBrokerType;
    String messageBrokerUrl;
    String messageBrokerUsername;
    String messageBrokerPassword;

    @Tab("Observability")
    TracingProvider tracingProvider;
    String tracingEndpoint;
    MetricsProvider metricsProvider;
    String metricsEndpoint;
    LoggingProvider loggingProvider;
    String loggingEndpoint;

    @Tab("LLM")
    LlmProvider llmProvider;
    String llmApiUrl;
    String llmApiKey;
    String llmModel;

    @Tab("Cache")
    CacheProvider cacheProvider;
    String cacheUrl;
    String cacheUsername;
    String cachePassword;

    @Tab("File Storage")
    FileStorageProvider fileStorageProvider;
    String fileStorageBucket;
    String fileStorageRegion;
    String fileStorageAccessKey;
    String fileStorageSecretKey;
    String fileStorageEndpoint;

    @Tab("Email")
    EmailProvider emailProvider;
    String emailHost;
    Integer emailPort;
    String emailUsername;
    String emailPassword;
    String emailFrom;

    @Tab("Secrets")
    SecretsProvider secretsProvider;
    String secretsEndpoint;
    String secretsToken;

    @Tab("Ingress")
    String ingressDomain;
    boolean ingressTlsEnabled;
    String ingressClassName;

    @Tab("Services")
    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    List<String> services;

    final CreateProjectUseCase createUseCase;
    final SaveProjectUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateProjectCommand(id, name, outputPath, packageName,
                gitRepository, database, dbMigrationTool,
                kubernetesClusterUrl, kubernetesNamespace, kubernetesContext, kubernetesToken, kubernetesCertificateAuthorityData,
                terraformProvider, terraformProviderVersion,
                terraformBackendType,
                terraformBackendBucket, terraformBackendRegion,
                terraformBackendKey, terraformWorkspace,
                iamProvider, iamServerUrl, iamRealm,
                iamClientId, iamClientSecret, iamAudience,
                messageBrokerType, messageBrokerUrl,
                messageBrokerUsername, messageBrokerPassword,
                tracingProvider, tracingEndpoint,
                metricsProvider, metricsEndpoint,
                loggingProvider, loggingEndpoint,
                llmProvider, llmApiUrl, llmApiKey, llmModel,
                cacheProvider, cacheUrl, cacheUsername, cachePassword,
                fileStorageProvider, fileStorageBucket, fileStorageRegion,
                fileStorageAccessKey, fileStorageSecretKey, fileStorageEndpoint,
                emailProvider, emailHost, emailPort, emailUsername, emailPassword, emailFrom,
                secretsProvider, secretsEndpoint, secretsToken,
                ingressDomain, ingressTlsEnabled, ingressClassName,
                services));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveProjectCommand(id, name, outputPath, packageName,
                gitRepository, database, dbMigrationTool,
                kubernetesClusterUrl, kubernetesNamespace, kubernetesContext, kubernetesToken, kubernetesCertificateAuthorityData,
                terraformProvider, terraformProviderVersion,
                terraformBackendType,
                terraformBackendBucket, terraformBackendRegion,
                terraformBackendKey, terraformWorkspace,
                iamProvider, iamServerUrl, iamRealm,
                iamClientId, iamClientSecret, iamAudience,
                messageBrokerType, messageBrokerUrl,
                messageBrokerUsername, messageBrokerPassword,
                tracingProvider, tracingEndpoint,
                metricsProvider, metricsEndpoint,
                loggingProvider, loggingEndpoint,
                llmProvider, llmApiUrl, llmApiKey, llmModel,
                cacheProvider, cacheUrl, cacheUsername, cachePassword,
                fileStorageProvider, fileStorageBucket, fileStorageRegion,
                fileStorageAccessKey, fileStorageSecretKey, fileStorageEndpoint,
                emailProvider, emailHost, emailPort, emailUsername, emailPassword, emailFrom,
                secretsProvider, secretsEndpoint, secretsToken,
                ingressDomain, ingressTlsEnabled, ingressClassName,
                services));
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
        kubernetesClusterUrl = model.kubernetesClusterUrl();
        kubernetesNamespace = model.kubernetesNamespace();
        kubernetesContext = model.kubernetesContext();
        kubernetesToken = model.kubernetesToken();
        kubernetesCertificateAuthorityData = model.kubernetesCertificateAuthorityData();
        terraformProvider = model.terraformProvider();
        terraformProviderVersion = model.terraformProviderVersion();
        terraformBackendType = model.terraformBackendType();
        terraformBackendBucket = model.terraformBackendBucket();
        terraformBackendRegion = model.terraformBackendRegion();
        terraformBackendKey = model.terraformBackendKey();
        terraformWorkspace = model.terraformWorkspace();
        iamProvider = model.iamProvider();
        iamServerUrl = model.iamServerUrl();
        iamRealm = model.iamRealm();
        iamClientId = model.iamClientId();
        iamClientSecret = model.iamClientSecret();
        iamAudience = model.iamAudience();
        messageBrokerType = model.messageBrokerType();
        messageBrokerUrl = model.messageBrokerUrl();
        messageBrokerUsername = model.messageBrokerUsername();
        messageBrokerPassword = model.messageBrokerPassword();
        tracingProvider = model.tracingProvider();
        tracingEndpoint = model.tracingEndpoint();
        metricsProvider = model.metricsProvider();
        metricsEndpoint = model.metricsEndpoint();
        loggingProvider = model.loggingProvider();
        loggingEndpoint = model.loggingEndpoint();
        llmProvider = model.llmProvider();
        llmApiUrl = model.llmApiUrl();
        llmApiKey = model.llmApiKey();
        llmModel = model.llmModel();
        cacheProvider = model.cacheProvider();
        cacheUrl = model.cacheUrl();
        cacheUsername = model.cacheUsername();
        cachePassword = model.cachePassword();
        fileStorageProvider = model.fileStorageProvider();
        fileStorageBucket = model.fileStorageBucket();
        fileStorageRegion = model.fileStorageRegion();
        fileStorageAccessKey = model.fileStorageAccessKey();
        fileStorageSecretKey = model.fileStorageSecretKey();
        fileStorageEndpoint = model.fileStorageEndpoint();
        emailProvider = model.emailProvider();
        emailHost = model.emailHost();
        emailPort = model.emailPort();
        emailUsername = model.emailUsername();
        emailPassword = model.emailPassword();
        emailFrom = model.emailFrom();
        secretsProvider = model.secretsProvider();
        secretsEndpoint = model.secretsEndpoint();
        secretsToken = model.secretsToken();
        ingressDomain = model.ingressDomain();
        ingressTlsEnabled = model.ingressTlsEnabled();
        ingressClassName = model.ingressClassName();
        services = model.serviceIds();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New project";
    }

}
