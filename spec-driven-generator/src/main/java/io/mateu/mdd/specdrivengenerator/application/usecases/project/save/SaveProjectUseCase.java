package io.mateu.mdd.specdrivengenerator.application.usecases.project.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectRepository;
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
                command.serviceIds().stream().map(ServiceId::new).toList());
        repository.save(project);
    }

}
