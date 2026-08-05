package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TenancyStrategy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * How the project is deployed: the providers it runs against, its environments and its tenancy.
 *
 * <p>Split out of {@link ProjectEntity} because it answers to a different question and changes on
 * a different rhythm. What the system <em>means</em> — its contexts, its aggregates — is edited
 * constantly while modelling; which registry the images go to, or whether tracing is OTLP, is
 * touched rarely and by someone else. Keeping them in one file made every such edit collide with
 * every other. See {@code docs/design/ide-plugin.md} §4.3.
 *
 * <p>One deployment per project, keyed by {@link #idFor(String)}. It does NOT reuse the project's
 * own id: ids are unique across the whole model — the lint enforces it, and both the schema
 * validator and the editor's applier rely on it.
 */
@lombok.Builder(toBuilder = true)
public record DeploymentEntity(
        String id,
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
        /** Default image registry/user for the project's services (e.g. docker.io/&lt;user&gt;). */
        String dockerRegistry,
        List<ProjectEnvironmentConfigEntity> environments,
        /** How the system isolates tenants; NONE/null for single-tenant. */
        TenancyStrategy tenancyStrategy
) implements Identifiable {

    public DeploymentEntity {
        if (environments == null) environments = List.of();
    }

    /** The id of a project's deployment element. */
    public static String idFor(String projectId) {
        return "deployment-" + projectId;
    }

    /** The project this deployment belongs to. */
    public String projectId() {
        return id != null && id.startsWith("deployment-") ? id.substring("deployment-".length()) : id;
    }

    /** The deployment of a project that has none stored yet — every provider unset. */
    public static DeploymentEntity emptyFor(String projectId) {
        return DeploymentEntity.builder().id(idFor(projectId)).build();
    }

    /**
     * Read a project's legacy deployment fields into their own element.
     *
     * <p>Used both by the migration on load and as a fallback when a project in memory still
     * carries them — a window that exists whenever a store is mutated without a reload, and in
     * which reading a project would otherwise report every provider as unset and a save would
     * then wipe them.
     */
    @SuppressWarnings("deprecation")
    public static DeploymentEntity fromLegacy(ProjectEntity p) {
        return DeploymentEntity.builder()
                .id(idFor(p.id()))
                .database(p.database())
                .dbMigrationTool(p.dbMigrationTool())
                .terraformProvider(p.terraformProvider())
                .terraformProviderVersion(p.terraformProviderVersion())
                .terraformBackendType(p.terraformBackendType())
                .iamProvider(p.iamProvider())
                .messageBrokerType(p.messageBrokerType())
                .tracingProvider(p.tracingProvider())
                .metricsProvider(p.metricsProvider())
                .loggingProvider(p.loggingProvider())
                .llmProvider(p.llmProvider())
                .cacheProvider(p.cacheProvider())
                .fileStorageProvider(p.fileStorageProvider())
                .emailProvider(p.emailProvider())
                .secretsProvider(p.secretsProvider())
                .cicdProvider(p.cicdProvider())
                .dockerRegistry(p.dockerRegistry())
                .environments(p.environments())
                .tenancyStrategy(p.tenancyStrategy())
                .build();
    }

    /** Whether a project still carries deployment settings inline. */
    @SuppressWarnings("deprecation")
    public static boolean isCarriedBy(ProjectEntity p) {
        return p.database() != null || p.dbMigrationTool() != null || p.terraformProvider() != null
                || p.terraformProviderVersion() != null || p.terraformBackendType() != null
                || p.iamProvider() != null || p.messageBrokerType() != null || p.tracingProvider() != null
                || p.metricsProvider() != null || p.loggingProvider() != null || p.llmProvider() != null
                || p.cacheProvider() != null || p.fileStorageProvider() != null || p.emailProvider() != null
                || p.secretsProvider() != null || p.cicdProvider() != null || p.dockerRegistry() != null
                || p.tenancyStrategy() != null || !p.environments().isEmpty();
    }
}
