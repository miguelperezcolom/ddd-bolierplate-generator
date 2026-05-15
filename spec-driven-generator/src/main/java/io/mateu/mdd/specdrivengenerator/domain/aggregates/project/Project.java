package io.mateu.mdd.specdrivengenerator.domain.aggregates.project;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectOutputPath;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectPackageName;
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
    private String kubernetesClusterUrl;
    private String kubernetesNamespace;
    private String kubernetesContext;
    private String kubernetesToken;
    private String kubernetesCertificateAuthorityData;
    private List<ServiceId> services;

    public static Project of(ProjectId id,
                             ProjectName name,
                             ProjectOutputPath outputPath,
                             ProjectPackageName packageName,
                             String gitRepository,
                             String database,
                             String kubernetesClusterUrl,
                             String kubernetesNamespace,
                             String kubernetesContext,
                             String kubernetesToken,
                             String kubernetesCertificateAuthorityData,
                             List<ServiceId> services) {
        var project = new Project();
        project.id = id;
        project.name = name;
        project.outputPath = outputPath;
        project.packageName = packageName;
        project.gitRepository = gitRepository;
        project.database = database;
        project.kubernetesClusterUrl = kubernetesClusterUrl;
        project.kubernetesNamespace = kubernetesNamespace;
        project.kubernetesContext = kubernetesContext;
        project.kubernetesToken = kubernetesToken;
        project.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        project.services = services;
        return project;
    }

    public static Project load(String id, String name, String outputPath, String packageName,
                                String gitRepository, String database,
                                String kubernetesClusterUrl, String kubernetesNamespace,
                                String kubernetesContext, String kubernetesToken,
                                String kubernetesCertificateAuthorityData,
                                List<String> services) {
        var project = new Project();
        project.id = new ProjectId(id);
        project.name = new ProjectName(name);
        project.outputPath = new ProjectOutputPath(outputPath);
        project.packageName = new ProjectPackageName(packageName);
        project.gitRepository = gitRepository;
        project.database = database;
        project.kubernetesClusterUrl = kubernetesClusterUrl;
        project.kubernetesNamespace = kubernetesNamespace;
        project.kubernetesContext = kubernetesContext;
        project.kubernetesToken = kubernetesToken;
        project.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        project.services = services.stream().map(ServiceId::new).toList();
        return project;
    }

    public void update(ProjectName name, ProjectOutputPath outputPath, ProjectPackageName packageName,
                       String gitRepository, String database,
                       String kubernetesClusterUrl, String kubernetesNamespace,
                       String kubernetesContext, String kubernetesToken,
                       String kubernetesCertificateAuthorityData,
                       List<ServiceId> services) {
        this.name = name;
        this.outputPath = outputPath;
        this.packageName = packageName;
        this.gitRepository = gitRepository;
        this.database = database;
        this.kubernetesClusterUrl = kubernetesClusterUrl;
        this.kubernetesNamespace = kubernetesNamespace;
        this.kubernetesContext = kubernetesContext;
        this.kubernetesToken = kubernetesToken;
        this.kubernetesCertificateAuthorityData = kubernetesCertificateAuthorityData;
        this.services = services;
    }
}
