package io.mateu.modux.modeldrivengenerator.application.usecases.project.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.CacheProvider;
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
import io.mateu.modux.modeldrivengenerator.application.usecases.project.ContextMapRelationData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEnvironmentConfigEntity;

import java.util.List;

public record SaveProjectCommand(String id, String name, String outputPath, String packageName,
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
                                 List<ProjectEnvironmentConfigEntity> environments,
                                 List<String> serviceIds,
                                 List<ContextMapRelationData> contextMap) {

    public SaveProjectCommand {
        if (environments == null) environments = List.of();
        if (serviceIds == null) serviceIds = List.of();
        if (contextMap == null) contextMap = List.of();
    }
}
