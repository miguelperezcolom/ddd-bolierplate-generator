package io.mateu.mdd.specdrivengenerator.domain.aggregates.project;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectOutputPath;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectPackageName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CicdProvider;
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
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import lombok.Getter;

import java.util.List;

@Getter
public class Project {

    private ProjectId id;
    private ProjectName name;
    private ProjectOutputPath outputPath;
    private ProjectPackageName packageName;
    private String gitRepository;
    private String database;
    private DbMigrationTool dbMigrationTool;
    private String kubernetesClusterUrl;
    private String kubernetesNamespace;
    private String kubernetesContext;
    private String kubernetesToken;
    private String kubernetesCertificateAuthorityData;
    private TerraformProvider terraformProvider;
    private String terraformProviderVersion;
    private TerraformBackendType terraformBackendType;
    private String terraformBackendBucket;
    private String terraformBackendRegion;
    private String terraformBackendKey;
    private String terraformWorkspace;
    private IamProvider iamProvider;
    private String iamServerUrl;
    private String iamRealm;
    private String iamClientId;
    private String iamClientSecret;
    private String iamAudience;
    private MessageBrokerType messageBrokerType;
    private String messageBrokerUrl;
    private String messageBrokerUsername;
    private String messageBrokerPassword;
    private TracingProvider tracingProvider;
    private String tracingEndpoint;
    private MetricsProvider metricsProvider;
    private String metricsEndpoint;
    private LoggingProvider loggingProvider;
    private String loggingEndpoint;
    private LlmProvider llmProvider;
    private String llmApiUrl;
    private String llmApiKey;
    private String llmModel;
    private CacheProvider cacheProvider;
    private String cacheUrl;
    private String cacheUsername;
    private String cachePassword;
    private FileStorageProvider fileStorageProvider;
    private String fileStorageBucket;
    private String fileStorageRegion;
    private String fileStorageAccessKey;
    private String fileStorageSecretKey;
    private String fileStorageEndpoint;
    private EmailProvider emailProvider;
    private String emailHost;
    private Integer emailPort;
    private String emailUsername;
    private String emailPassword;
    private String emailFrom;
    private SecretsProvider secretsProvider;
    private String secretsEndpoint;
    private String secretsToken;
    private String ingressDomain;
    private boolean ingressTlsEnabled;
    private String ingressClassName;
    private CicdProvider cicdProvider;
    private List<ServiceId> services;

    public static Project of(ProjectId id,
                             ProjectName name,
                             ProjectOutputPath outputPath,
                             ProjectPackageName packageName,
                             String gitRepository,
                             String database,
                             DbMigrationTool dbMigrationTool,
                             String kubernetesClusterUrl,
                             String kubernetesNamespace,
                             String kubernetesContext,
                             String kubernetesToken,
                             String kubernetesCertificateAuthorityData,
                             TerraformProvider terraformProvider, String terraformProviderVersion,
                             TerraformBackendType terraformBackendType,
                             String terraformBackendBucket, String terraformBackendRegion,
                             String terraformBackendKey, String terraformWorkspace,
                             IamProvider iamProvider, String iamServerUrl, String iamRealm,
                             String iamClientId, String iamClientSecret, String iamAudience,
                             MessageBrokerType messageBrokerType, String messageBrokerUrl,
                             String messageBrokerUsername, String messageBrokerPassword,
                             TracingProvider tracingProvider, String tracingEndpoint,
                             MetricsProvider metricsProvider, String metricsEndpoint,
                             LoggingProvider loggingProvider, String loggingEndpoint,
                             LlmProvider llmProvider, String llmApiUrl,
                             String llmApiKey, String llmModel,
                             CacheProvider cacheProvider, String cacheUrl,
                             String cacheUsername, String cachePassword,
                             FileStorageProvider fileStorageProvider, String fileStorageBucket,
                             String fileStorageRegion, String fileStorageAccessKey,
                             String fileStorageSecretKey, String fileStorageEndpoint,
                             EmailProvider emailProvider, String emailHost, Integer emailPort,
                             String emailUsername, String emailPassword, String emailFrom,
                             SecretsProvider secretsProvider, String secretsEndpoint, String secretsToken,
                             String ingressDomain, boolean ingressTlsEnabled, String ingressClassName,
                             CicdProvider cicdProvider,
                             List<ServiceId> services) {
        var project = new Project();
        project.id = id;
        project.name = name;
        project.outputPath = outputPath;
        project.packageName = packageName;
        project.gitRepository = gitRepository;
        project.database = database;
        project.dbMigrationTool = dbMigrationTool;
        project.kubernetesClusterUrl = kubernetesClusterUrl;
        project.kubernetesNamespace = kubernetesNamespace;
        project.kubernetesContext = kubernetesContext;
        project.kubernetesToken = kubernetesToken;
        project.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        project.terraformProvider = terraformProvider;
        project.terraformProviderVersion = terraformProviderVersion;
        project.terraformBackendType = terraformBackendType;
        project.terraformBackendBucket = terraformBackendBucket;
        project.terraformBackendRegion = terraformBackendRegion;
        project.terraformBackendKey = terraformBackendKey;
        project.terraformWorkspace = terraformWorkspace;
        project.iamProvider = iamProvider;
        project.iamServerUrl = iamServerUrl;
        project.iamRealm = iamRealm;
        project.iamClientId = iamClientId;
        project.iamClientSecret = iamClientSecret;
        project.iamAudience = iamAudience;
        project.messageBrokerType = messageBrokerType;
        project.messageBrokerUrl = messageBrokerUrl;
        project.messageBrokerUsername = messageBrokerUsername;
        project.messageBrokerPassword = messageBrokerPassword;
        project.tracingProvider = tracingProvider;
        project.tracingEndpoint = tracingEndpoint;
        project.metricsProvider = metricsProvider;
        project.metricsEndpoint = metricsEndpoint;
        project.loggingProvider = loggingProvider;
        project.loggingEndpoint = loggingEndpoint;
        project.llmProvider = llmProvider;
        project.llmApiUrl = llmApiUrl;
        project.llmApiKey = llmApiKey;
        project.llmModel = llmModel;
        project.cacheProvider = cacheProvider;
        project.cacheUrl = cacheUrl;
        project.cacheUsername = cacheUsername;
        project.cachePassword = cachePassword;
        project.fileStorageProvider = fileStorageProvider;
        project.fileStorageBucket = fileStorageBucket;
        project.fileStorageRegion = fileStorageRegion;
        project.fileStorageAccessKey = fileStorageAccessKey;
        project.fileStorageSecretKey = fileStorageSecretKey;
        project.fileStorageEndpoint = fileStorageEndpoint;
        project.emailProvider = emailProvider;
        project.emailHost = emailHost;
        project.emailPort = emailPort;
        project.emailUsername = emailUsername;
        project.emailPassword = emailPassword;
        project.emailFrom = emailFrom;
        project.secretsProvider = secretsProvider;
        project.secretsEndpoint = secretsEndpoint;
        project.secretsToken = secretsToken;
        project.ingressDomain = ingressDomain;
        project.ingressTlsEnabled = ingressTlsEnabled;
        project.ingressClassName = ingressClassName;
        project.cicdProvider = cicdProvider;
        project.services = services;
        return project;
    }

    public static Project load(String id, String name, String outputPath, String packageName,
                                String gitRepository, String database,
                                DbMigrationTool dbMigrationTool,
                                String kubernetesClusterUrl, String kubernetesNamespace,
                                String kubernetesContext, String kubernetesToken,
                                String kubernetesCertificateAuthorityData,
                                TerraformProvider terraformProvider, String terraformProviderVersion,
                                TerraformBackendType terraformBackendType,
                                String terraformBackendBucket, String terraformBackendRegion,
                                String terraformBackendKey, String terraformWorkspace,
                                IamProvider iamProvider, String iamServerUrl, String iamRealm,
                                String iamClientId, String iamClientSecret, String iamAudience,
                                MessageBrokerType messageBrokerType, String messageBrokerUrl,
                                String messageBrokerUsername, String messageBrokerPassword,
                                TracingProvider tracingProvider, String tracingEndpoint,
                                MetricsProvider metricsProvider, String metricsEndpoint,
                                LoggingProvider loggingProvider, String loggingEndpoint,
                                LlmProvider llmProvider, String llmApiUrl,
                                String llmApiKey, String llmModel,
                                CacheProvider cacheProvider, String cacheUrl,
                                String cacheUsername, String cachePassword,
                                FileStorageProvider fileStorageProvider, String fileStorageBucket,
                                String fileStorageRegion, String fileStorageAccessKey,
                                String fileStorageSecretKey, String fileStorageEndpoint,
                                EmailProvider emailProvider, String emailHost, Integer emailPort,
                                String emailUsername, String emailPassword, String emailFrom,
                                SecretsProvider secretsProvider, String secretsEndpoint, String secretsToken,
                                String ingressDomain, boolean ingressTlsEnabled, String ingressClassName,
                                String cicdProvider,
                                List<String> services) {
        var project = new Project();
        project.id = new ProjectId(id);
        project.name = new ProjectName(name);
        project.outputPath = new ProjectOutputPath(outputPath);
        project.packageName = new ProjectPackageName(packageName);
        project.gitRepository = gitRepository;
        project.database = database;
        project.dbMigrationTool = dbMigrationTool;
        project.kubernetesClusterUrl = kubernetesClusterUrl;
        project.kubernetesNamespace = kubernetesNamespace;
        project.kubernetesContext = kubernetesContext;
        project.kubernetesToken = kubernetesToken;
        project.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        project.terraformProvider = terraformProvider;
        project.terraformProviderVersion = terraformProviderVersion;
        project.terraformBackendType = terraformBackendType;
        project.terraformBackendBucket = terraformBackendBucket;
        project.terraformBackendRegion = terraformBackendRegion;
        project.terraformBackendKey = terraformBackendKey;
        project.terraformWorkspace = terraformWorkspace;
        project.iamProvider = iamProvider;
        project.iamServerUrl = iamServerUrl;
        project.iamRealm = iamRealm;
        project.iamClientId = iamClientId;
        project.iamClientSecret = iamClientSecret;
        project.iamAudience = iamAudience;
        project.messageBrokerType = messageBrokerType;
        project.messageBrokerUrl = messageBrokerUrl;
        project.messageBrokerUsername = messageBrokerUsername;
        project.messageBrokerPassword = messageBrokerPassword;
        project.tracingProvider = tracingProvider;
        project.tracingEndpoint = tracingEndpoint;
        project.metricsProvider = metricsProvider;
        project.metricsEndpoint = metricsEndpoint;
        project.loggingProvider = loggingProvider;
        project.loggingEndpoint = loggingEndpoint;
        project.llmProvider = llmProvider;
        project.llmApiUrl = llmApiUrl;
        project.llmApiKey = llmApiKey;
        project.llmModel = llmModel;
        project.cacheProvider = cacheProvider;
        project.cacheUrl = cacheUrl;
        project.cacheUsername = cacheUsername;
        project.cachePassword = cachePassword;
        project.fileStorageProvider = fileStorageProvider;
        project.fileStorageBucket = fileStorageBucket;
        project.fileStorageRegion = fileStorageRegion;
        project.fileStorageAccessKey = fileStorageAccessKey;
        project.fileStorageSecretKey = fileStorageSecretKey;
        project.fileStorageEndpoint = fileStorageEndpoint;
        project.emailProvider = emailProvider;
        project.emailHost = emailHost;
        project.emailPort = emailPort;
        project.emailUsername = emailUsername;
        project.emailPassword = emailPassword;
        project.emailFrom = emailFrom;
        project.secretsProvider = secretsProvider;
        project.secretsEndpoint = secretsEndpoint;
        project.secretsToken = secretsToken;
        project.ingressDomain = ingressDomain;
        project.ingressTlsEnabled = ingressTlsEnabled;
        project.ingressClassName = ingressClassName;
        project.cicdProvider = cicdProvider != null ? CicdProvider.valueOf(cicdProvider) : null;
        project.services = services.stream().map(ServiceId::new).toList();
        return project;
    }

    public void update(ProjectName name, ProjectOutputPath outputPath, ProjectPackageName packageName,
                       String gitRepository, String database,
                       DbMigrationTool dbMigrationTool,
                       String kubernetesClusterUrl, String kubernetesNamespace,
                       String kubernetesContext, String kubernetesToken,
                       String kubernetesCertificateAuthorityData,
                       TerraformProvider terraformProvider, String terraformProviderVersion,
                       TerraformBackendType terraformBackendType,
                       String terraformBackendBucket, String terraformBackendRegion,
                       String terraformBackendKey, String terraformWorkspace,
                       IamProvider iamProvider, String iamServerUrl, String iamRealm,
                       String iamClientId, String iamClientSecret, String iamAudience,
                       MessageBrokerType messageBrokerType, String messageBrokerUrl,
                       String messageBrokerUsername, String messageBrokerPassword,
                       TracingProvider tracingProvider, String tracingEndpoint,
                       MetricsProvider metricsProvider, String metricsEndpoint,
                       LoggingProvider loggingProvider, String loggingEndpoint,
                       LlmProvider llmProvider, String llmApiUrl,
                       String llmApiKey, String llmModel,
                       CacheProvider cacheProvider, String cacheUrl,
                       String cacheUsername, String cachePassword,
                       FileStorageProvider fileStorageProvider, String fileStorageBucket,
                       String fileStorageRegion, String fileStorageAccessKey,
                       String fileStorageSecretKey, String fileStorageEndpoint,
                       EmailProvider emailProvider, String emailHost, Integer emailPort,
                       String emailUsername, String emailPassword, String emailFrom,
                       SecretsProvider secretsProvider, String secretsEndpoint, String secretsToken,
                       String ingressDomain, boolean ingressTlsEnabled, String ingressClassName,
                       CicdProvider cicdProvider,
                       List<ServiceId> services) {
        this.name = name;
        this.outputPath = outputPath;
        this.packageName = packageName;
        this.gitRepository = gitRepository;
        this.database = database;
        this.dbMigrationTool = dbMigrationTool;
        this.kubernetesClusterUrl = kubernetesClusterUrl;
        this.kubernetesNamespace = kubernetesNamespace;
        this.kubernetesContext = kubernetesContext;
        this.kubernetesToken = kubernetesToken;
        this.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        this.terraformProvider = terraformProvider;
        this.terraformProviderVersion = terraformProviderVersion;
        this.terraformBackendType = terraformBackendType;
        this.terraformBackendBucket = terraformBackendBucket;
        this.terraformBackendRegion = terraformBackendRegion;
        this.terraformBackendKey = terraformBackendKey;
        this.terraformWorkspace = terraformWorkspace;
        this.iamProvider = iamProvider;
        this.iamServerUrl = iamServerUrl;
        this.iamRealm = iamRealm;
        this.iamClientId = iamClientId;
        this.iamClientSecret = iamClientSecret;
        this.iamAudience = iamAudience;
        this.messageBrokerType = messageBrokerType;
        this.messageBrokerUrl = messageBrokerUrl;
        this.messageBrokerUsername = messageBrokerUsername;
        this.messageBrokerPassword = messageBrokerPassword;
        this.tracingProvider = tracingProvider;
        this.tracingEndpoint = tracingEndpoint;
        this.metricsProvider = metricsProvider;
        this.metricsEndpoint = metricsEndpoint;
        this.loggingProvider = loggingProvider;
        this.loggingEndpoint = loggingEndpoint;
        this.llmProvider = llmProvider;
        this.llmApiUrl = llmApiUrl;
        this.llmApiKey = llmApiKey;
        this.llmModel = llmModel;
        this.cacheProvider = cacheProvider;
        this.cacheUrl = cacheUrl;
        this.cacheUsername = cacheUsername;
        this.cachePassword = cachePassword;
        this.fileStorageProvider = fileStorageProvider;
        this.fileStorageBucket = fileStorageBucket;
        this.fileStorageRegion = fileStorageRegion;
        this.fileStorageAccessKey = fileStorageAccessKey;
        this.fileStorageSecretKey = fileStorageSecretKey;
        this.fileStorageEndpoint = fileStorageEndpoint;
        this.emailProvider = emailProvider;
        this.emailHost = emailHost;
        this.emailPort = emailPort;
        this.emailUsername = emailUsername;
        this.emailPassword = emailPassword;
        this.emailFrom = emailFrom;
        this.secretsProvider = secretsProvider;
        this.secretsEndpoint = secretsEndpoint;
        this.secretsToken = secretsToken;
        this.ingressDomain = ingressDomain;
        this.ingressTlsEnabled = ingressTlsEnabled;
        this.ingressClassName = ingressClassName;
        this.cicdProvider = cicdProvider;
        this.services = services;
    }
}
