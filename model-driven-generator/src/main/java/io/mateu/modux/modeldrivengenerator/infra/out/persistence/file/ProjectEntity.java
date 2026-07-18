package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TenancyStrategy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

@lombok.Builder(toBuilder = true)
public record ProjectEntity(
        String id,
        String name,
        String outputPath,
        String packageName,
        String gitRepository,
        String database,
        DbMigrationTool dbMigrationTool,
        TerraformProvider terraformProvider,
        String terraformProviderVersion,
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
        List<ContextMapRelationEntity> contextMap,
        /** How the system isolates tenants; NONE/null for single-tenant. */
        TenancyStrategy tenancyStrategy,
        /** Systems outside the project's bounded contexts (partners on the context map). */
        List<ExternalSystemEntity> externalSystems,
        /** Context and objective of the system, in prose (the §1 of a design document). */
        String objective,
        /** i18n: the locales the system speaks (e.g. es-ES, en, de); labels become keys at generation. */
        List<String> locales,
        String defaultLocale
,
        /** Default image registry/user for the project's services (e.g. docker.io/<user>). */
        String dockerRegistry,
        /**
         * Data-access strategy for the generated code: JPA (legacy), JDBC (reads via
         * JdbcTemplate) or STORED_PROCEDURE (aggregate retrieval via a generated stored
         * procedure, falling back to JDBC — the default when unset). Overridable per aggregate.
         */
        String dataAccess) implements Identifiable {

    /** Backward-compatible constructor (pre-locales callers and stores). */
    public ProjectEntity(String id, String name, String outputPath, String packageName,
                         String gitRepository, String database, DbMigrationTool dbMigrationTool,
                         TerraformProvider terraformProvider, String terraformProviderVersion,
                         TerraformBackendType terraformBackendType, IamProvider iamProvider,
                         MessageBrokerType messageBrokerType, TracingProvider tracingProvider,
                         MetricsProvider metricsProvider, LoggingProvider loggingProvider,
                         LlmProvider llmProvider, CacheProvider cacheProvider,
                         FileStorageProvider fileStorageProvider, EmailProvider emailProvider,
                         SecretsProvider secretsProvider, String cicdProvider,
                         List<ProjectEnvironmentConfigEntity> environments, List<String> serviceIds,
                         List<ContextMapRelationEntity> contextMap, TenancyStrategy tenancyStrategy,
                         List<ExternalSystemEntity> externalSystems, String objective) {
        this(id, name, outputPath, packageName, gitRepository, database, dbMigrationTool,
                terraformProvider, terraformProviderVersion, terraformBackendType, iamProvider,
                messageBrokerType, tracingProvider, metricsProvider, loggingProvider, llmProvider,
                cacheProvider, fileStorageProvider, emailProvider, secretsProvider, cicdProvider,
                environments, serviceIds, contextMap, tenancyStrategy, externalSystems, objective,
                null, null, null, null);
    }

    public ProjectEntity {
        if (serviceIds == null) serviceIds = List.of();
        if (contextMap == null) contextMap = List.of();
        if (environments == null) environments = List.of();
        if (externalSystems == null) externalSystems = List.of();
        if (locales == null) locales = List.of();
    }

    /** Backward-compatible constructor (pre tenancy/externalSystems callers and stores). */
    public ProjectEntity(String id, String name, String outputPath, String packageName,
                         String gitRepository, String database, DbMigrationTool dbMigrationTool,
                         TerraformProvider terraformProvider, String terraformProviderVersion,
                         TerraformBackendType terraformBackendType, IamProvider iamProvider,
                         MessageBrokerType messageBrokerType, TracingProvider tracingProvider,
                         MetricsProvider metricsProvider, LoggingProvider loggingProvider,
                         LlmProvider llmProvider, CacheProvider cacheProvider,
                         FileStorageProvider fileStorageProvider, EmailProvider emailProvider,
                         SecretsProvider secretsProvider, String cicdProvider,
                         List<ProjectEnvironmentConfigEntity> environments,
                         List<String> serviceIds, List<ContextMapRelationEntity> contextMap) {
        this(id, name, outputPath, packageName, gitRepository, database, dbMigrationTool,
                terraformProvider, terraformProviderVersion, terraformBackendType, iamProvider,
                messageBrokerType, tracingProvider, metricsProvider, loggingProvider, llmProvider,
                cacheProvider, fileStorageProvider, emailProvider, secretsProvider, cicdProvider,
                environments, serviceIds, contextMap, null, List.of(), null, null, null, null, null);
    }

    /** Backward-compatible constructor (pre-objective callers). */
    public ProjectEntity(String id, String name, String outputPath, String packageName,
                         String gitRepository, String database, DbMigrationTool dbMigrationTool,
                         TerraformProvider terraformProvider, String terraformProviderVersion,
                         TerraformBackendType terraformBackendType, IamProvider iamProvider,
                         MessageBrokerType messageBrokerType, TracingProvider tracingProvider,
                         MetricsProvider metricsProvider, LoggingProvider loggingProvider,
                         LlmProvider llmProvider, CacheProvider cacheProvider,
                         FileStorageProvider fileStorageProvider, EmailProvider emailProvider,
                         SecretsProvider secretsProvider, String cicdProvider,
                         List<ProjectEnvironmentConfigEntity> environments,
                         List<String> serviceIds, List<ContextMapRelationEntity> contextMap,
                         TenancyStrategy tenancyStrategy, List<ExternalSystemEntity> externalSystems) {
        this(id, name, outputPath, packageName, gitRepository, database, dbMigrationTool,
                terraformProvider, terraformProviderVersion, terraformBackendType, iamProvider,
                messageBrokerType, tracingProvider, metricsProvider, loggingProvider, llmProvider,
                cacheProvider, fileStorageProvider, emailProvider, secretsProvider, cicdProvider,
                environments, serviceIds, contextMap, tenancyStrategy, externalSystems, null,
                null, null, null, null);
    }

}
