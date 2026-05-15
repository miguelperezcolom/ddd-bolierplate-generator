package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectFileQueryService implements ProjectQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ProjectRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ProjectEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ProjectRow(entity.id(), entity.name(), entity.outputPath(), entity.packageName()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ProjectEntity.class).map(ProjectEntity::name).orElseThrow();
    }

    @Override
    public Optional<ProjectDto> getById(String id) {
        return repository.findById(id, ProjectEntity.class)
                .map(entity -> new ProjectDto(
                        entity.id(),
                        entity.name(),
                        entity.outputPath(),
                        entity.packageName(),
                        entity.gitRepository(),
                        entity.database(),
                        entity.kubernetesClusterUrl(),
                        entity.kubernetesNamespace(),
                        entity.kubernetesContext(),
                        entity.kubernetesToken(),
                        entity.kubernetesCertificateAuthorityData(),
                        entity.terraformProvider(), entity.terraformProviderVersion(),
                        entity.terraformBackendType(),
                        entity.terraformBackendBucket(), entity.terraformBackendRegion(),
                        entity.terraformBackendKey(), entity.terraformWorkspace(),
                        entity.iamProvider(), entity.iamServerUrl(), entity.iamRealm(),
                        entity.iamClientId(), entity.iamClientSecret(), entity.iamAudience(),
                        entity.messageBrokerType(), entity.messageBrokerUrl(),
                        entity.messageBrokerUsername(), entity.messageBrokerPassword(),
                        entity.tracingProvider(), entity.tracingEndpoint(),
                        entity.metricsProvider(), entity.metricsEndpoint(),
                        entity.loggingProvider(), entity.loggingEndpoint(),
                        entity.llmProvider(), entity.llmApiUrl(),
                        entity.llmApiKey(), entity.llmModel(),
                        entity.serviceIds()));
    }
}
