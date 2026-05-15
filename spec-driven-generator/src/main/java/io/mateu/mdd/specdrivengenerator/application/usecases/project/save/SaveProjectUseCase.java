package io.mateu.mdd.specdrivengenerator.application.usecases.project.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectOutputPath;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectPackageName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveProjectUseCase {

    final ProjectRepository repository;

    public void handle(SaveProjectCommand command) {
        var project = repository.findById(new ProjectId(command.id())).orElseThrow();
        project.update(new ProjectName(command.name()),
                new ProjectOutputPath(command.outputPath()),
                new ProjectPackageName(command.packageName()),
                command.gitRepository(),
                command.database(),
                command.kubernetesClusterUrl(),
                command.kubernetesNamespace(),
                command.kubernetesContext(),
                command.kubernetesToken(),
                command.kubernetesCertificateAuthorityData(),
                command.terraformProvider(), command.terraformProviderVersion(),
                command.terraformBackendType(),
                command.terraformBackendBucket(), command.terraformBackendRegion(),
                command.terraformBackendKey(), command.terraformWorkspace(),
                command.iamProvider(), command.iamServerUrl(), command.iamRealm(),
                command.iamClientId(), command.iamClientSecret(), command.iamAudience(),
                command.messageBrokerType(), command.messageBrokerUrl(),
                command.messageBrokerUsername(), command.messageBrokerPassword(),
                command.tracingProvider(), command.tracingEndpoint(),
                command.metricsProvider(), command.metricsEndpoint(),
                command.loggingProvider(), command.loggingEndpoint(),
                command.llmProvider(), command.llmApiUrl(),
                command.llmApiKey(), command.llmModel(),
                command.cacheProvider(), command.cacheUrl(),
                command.cacheUsername(), command.cachePassword(),
                command.serviceIds().stream().map(ServiceId::new).toList());
        repository.save(project);
    }

}
