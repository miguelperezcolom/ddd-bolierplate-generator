package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.project;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.create.CreateProjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.create.CreateProjectUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.save.SaveProjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.project.save.SaveProjectUseCase;
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

    @Tab("Kubernetes")
    String kubernetesClusterUrl;
    String kubernetesNamespace;
    String kubernetesContext;
    String kubernetesToken;
    String kubernetesCertificateAuthorityData;

    @Tab("Services")
    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    List<String> services;

    final CreateProjectUseCase createUseCase;
    final SaveProjectUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateProjectCommand(id, name, outputPath, packageName,
                gitRepository, database,
                kubernetesClusterUrl, kubernetesNamespace, kubernetesContext, kubernetesToken, kubernetesCertificateAuthorityData,
                services));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveProjectCommand(id, name, outputPath, packageName,
                gitRepository, database,
                kubernetesClusterUrl, kubernetesNamespace, kubernetesContext, kubernetesToken, kubernetesCertificateAuthorityData,
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
        kubernetesClusterUrl = model.kubernetesClusterUrl();
        kubernetesNamespace = model.kubernetesNamespace();
        kubernetesContext = model.kubernetesContext();
        kubernetesToken = model.kubernetesToken();
        kubernetesCertificateAuthorityData = model.kubernetesCertificateAuthorityData();
        services = model.serviceIds();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New project";
    }

}
