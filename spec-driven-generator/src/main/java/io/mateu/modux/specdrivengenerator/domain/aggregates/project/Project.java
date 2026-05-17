package io.mateu.modux.specdrivengenerator.domain.aggregates.project;

import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectOutputPath;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectPackageName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.CicdProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectEnvironment;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ContextMapRelation;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
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
    private TerraformProvider terraformProvider;
    private String terraformProviderVersion;
    private TerraformBackendType terraformBackendType;
    private IamProvider iamProvider;
    private MessageBrokerType messageBrokerType;
    private TracingProvider tracingProvider;
    private MetricsProvider metricsProvider;
    private LoggingProvider loggingProvider;
    private LlmProvider llmProvider;
    private CacheProvider cacheProvider;
    private FileStorageProvider fileStorageProvider;
    private EmailProvider emailProvider;
    private SecretsProvider secretsProvider;
    private CicdProvider cicdProvider;
    private List<ProjectEnvironmentConfig> environments;
    private List<ServiceId> services;
    private List<ContextMapRelation> contextMap;

    public static Project of(ProjectId id,
                             ProjectName name,
                             ProjectOutputPath outputPath,
                             ProjectPackageName packageName,
                             String gitRepository,
                             String database,
                             DbMigrationTool dbMigrationTool,
                             TerraformProvider terraformProvider, String terraformProviderVersion,
                             TerraformBackendType terraformBackendType,
                             IamProvider iamProvider,
                             MessageBrokerType messageBrokerType,
                             TracingProvider tracingProvider,
                             MetricsProvider metricsProvider,
                             LoggingProvider loggingProvider,
                             LlmProvider llmProvider,
                             CacheProvider cacheProvider,
                             FileStorageProvider fileStorageProvider,
                             EmailProvider emailProvider,
                             SecretsProvider secretsProvider,
                             CicdProvider cicdProvider,
                             List<ProjectEnvironmentConfig> environments,
                             List<ServiceId> services,
                             List<ContextMapRelation> contextMap) {
        var project = new Project();
        project.id = id;
        project.name = name;
        project.outputPath = outputPath;
        project.packageName = packageName;
        project.gitRepository = gitRepository;
        project.database = database;
        project.dbMigrationTool = dbMigrationTool;
        project.terraformProvider = terraformProvider;
        project.terraformProviderVersion = terraformProviderVersion;
        project.terraformBackendType = terraformBackendType;
        project.iamProvider = iamProvider;
        project.messageBrokerType = messageBrokerType;
        project.tracingProvider = tracingProvider;
        project.metricsProvider = metricsProvider;
        project.loggingProvider = loggingProvider;
        project.llmProvider = llmProvider;
        project.cacheProvider = cacheProvider;
        project.fileStorageProvider = fileStorageProvider;
        project.emailProvider = emailProvider;
        project.secretsProvider = secretsProvider;
        project.cicdProvider = cicdProvider;
        project.environments = environments != null ? environments : List.of();
        project.services = services;
        project.contextMap = contextMap != null ? contextMap : List.of();
        return project;
    }

    public static Project load(String id, String name, String outputPath, String packageName,
                                String gitRepository, String database,
                                DbMigrationTool dbMigrationTool,
                                TerraformProvider terraformProvider, String terraformProviderVersion,
                                TerraformBackendType terraformBackendType,
                                IamProvider iamProvider,
                                MessageBrokerType messageBrokerType,
                                TracingProvider tracingProvider,
                                MetricsProvider metricsProvider,
                                LoggingProvider loggingProvider,
                                LlmProvider llmProvider,
                                CacheProvider cacheProvider,
                                FileStorageProvider fileStorageProvider,
                                EmailProvider emailProvider,
                                SecretsProvider secretsProvider,
                                String cicdProvider,
                                List<ProjectEnvironmentConfig> environments,
                                List<String> services,
                                List<ContextMapRelation> contextMap) {
        var project = new Project();
        project.id = new ProjectId(id);
        project.name = new ProjectName(name);
        project.outputPath = new ProjectOutputPath(outputPath);
        project.packageName = new ProjectPackageName(packageName);
        project.gitRepository = gitRepository;
        project.database = database;
        project.dbMigrationTool = dbMigrationTool;
        project.terraformProvider = terraformProvider;
        project.terraformProviderVersion = terraformProviderVersion;
        project.terraformBackendType = terraformBackendType;
        project.iamProvider = iamProvider;
        project.messageBrokerType = messageBrokerType;
        project.tracingProvider = tracingProvider;
        project.metricsProvider = metricsProvider;
        project.loggingProvider = loggingProvider;
        project.llmProvider = llmProvider;
        project.cacheProvider = cacheProvider;
        project.fileStorageProvider = fileStorageProvider;
        project.emailProvider = emailProvider;
        project.secretsProvider = secretsProvider;
        project.cicdProvider = cicdProvider != null ? CicdProvider.valueOf(cicdProvider) : null;
        project.environments = environments != null ? environments : List.of();
        project.services = services.stream().map(ServiceId::new).toList();
        project.contextMap = contextMap != null ? contextMap : List.of();
        return project;
    }

    public void update(ProjectName name, ProjectOutputPath outputPath, ProjectPackageName packageName,
                       String gitRepository, String database,
                       DbMigrationTool dbMigrationTool,
                       TerraformProvider terraformProvider, String terraformProviderVersion,
                       TerraformBackendType terraformBackendType,
                       IamProvider iamProvider,
                       MessageBrokerType messageBrokerType,
                       TracingProvider tracingProvider,
                       MetricsProvider metricsProvider,
                       LoggingProvider loggingProvider,
                       LlmProvider llmProvider,
                       CacheProvider cacheProvider,
                       FileStorageProvider fileStorageProvider,
                       EmailProvider emailProvider,
                       SecretsProvider secretsProvider,
                       CicdProvider cicdProvider,
                       List<ProjectEnvironmentConfig> environments,
                       List<ServiceId> services,
                       List<ContextMapRelation> contextMap) {
        this.name = name;
        this.outputPath = outputPath;
        this.packageName = packageName;
        this.gitRepository = gitRepository;
        this.database = database;
        this.dbMigrationTool = dbMigrationTool;
        this.terraformProvider = terraformProvider;
        this.terraformProviderVersion = terraformProviderVersion;
        this.terraformBackendType = terraformBackendType;
        this.iamProvider = iamProvider;
        this.messageBrokerType = messageBrokerType;
        this.tracingProvider = tracingProvider;
        this.metricsProvider = metricsProvider;
        this.loggingProvider = loggingProvider;
        this.llmProvider = llmProvider;
        this.cacheProvider = cacheProvider;
        this.fileStorageProvider = fileStorageProvider;
        this.emailProvider = emailProvider;
        this.secretsProvider = secretsProvider;
        this.cicdProvider = cicdProvider;
        this.environments = environments != null ? environments : List.of();
        this.services = services;
        this.contextMap = contextMap != null ? contextMap : List.of();
    }
}
