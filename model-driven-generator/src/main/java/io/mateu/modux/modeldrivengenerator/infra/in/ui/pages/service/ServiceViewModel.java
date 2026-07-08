package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.service;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.service.create.CreateServiceCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.service.create.CreateServiceUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.service.save.SaveServiceCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.service.save.SaveServiceUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.DeploymentStrategy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.Tab;
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
public class ServiceViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String gitRepository;
    String dockerImageRegistry;
    String dockerImageName;
    boolean openApiDocumentationEnabled;
    DeploymentStrategy deploymentStrategy;
    String owner;

    @Tab("Resilience")
    boolean circuitBreakerEnabled;
    Integer circuitBreakerThreshold;
    Long connectionTimeoutMs;
    Long readTimeoutMs;
    Long writeTimeoutMs;

    Integer port;
    String contextPath;
    String database;
    DbMigrationTool dbMigrationTool;

    @Tab("Kubernetes")
    String livenessProbe;
    String readinessProbe;
    String startupProbe;
    Integer kubernetesReplicas;
    String kubernetesCpuRequest;
    String kubernetesCpuLimit;
    String kubernetesMemoryRequest;
    String kubernetesMemoryLimit;
    boolean kubernetesHpaEnabled;
    Integer kubernetesHpaMinReplicas;
    Integer kubernetesHpaMaxReplicas;
    Integer kubernetesHpaCpuThreshold;

    @Lookup(search = ModuleIdOptionsSupplier.class, label = ModuleIdLabelSupplier.class)
    List<String> modules;

    @Lookup(search = GatewayIdOptionsSupplier.class, label = GatewayIdLabelSupplier.class)
    List<String> gatewayIds;

    String javaVersion;

    @Tab("Environment")
    List<EnvVarViewModel> envVars = new java.util.ArrayList<>();

    @Tab("Outbox")
    boolean outboxEnabled;
    String outboxTableName;

    final CreateServiceUseCase createUseCase;
    final SaveServiceUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        io.mateu.modux.modeldrivengenerator.infra.in.ui.InitiatorStateBinder.bind(this, httpRequest);
        createUseCase.handle(new CreateServiceCommand(id, name, gitRepository, dockerImageRegistry, dockerImageName, port, contextPath, database,
                dbMigrationTool, kubernetesReplicas, kubernetesCpuRequest, kubernetesCpuLimit,
                kubernetesMemoryRequest, kubernetesMemoryLimit,
                kubernetesHpaEnabled, kubernetesHpaMinReplicas,
                kubernetesHpaMaxReplicas, kubernetesHpaCpuThreshold,
                livenessProbe, readinessProbe, startupProbe,
                openApiDocumentationEnabled,
                circuitBreakerEnabled, circuitBreakerThreshold,
                connectionTimeoutMs, readTimeoutMs, writeTimeoutMs,
                deploymentStrategy != null ? deploymentStrategy.name() : null, owner,
                modules, gatewayIds, toEnvVars(envVars), javaVersion, outboxEnabled, outboxTableName));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        io.mateu.modux.modeldrivengenerator.infra.in.ui.InitiatorStateBinder.bind(this, httpRequest);
        saveUseCase.handle(new SaveServiceCommand(id, name, gitRepository, dockerImageRegistry, dockerImageName, port, contextPath, database,
                dbMigrationTool, kubernetesReplicas, kubernetesCpuRequest, kubernetesCpuLimit,
                kubernetesMemoryRequest, kubernetesMemoryLimit,
                kubernetesHpaEnabled, kubernetesHpaMinReplicas,
                kubernetesHpaMaxReplicas, kubernetesHpaCpuThreshold,
                livenessProbe, readinessProbe, startupProbe,
                openApiDocumentationEnabled,
                circuitBreakerEnabled, circuitBreakerThreshold,
                connectionTimeoutMs, readTimeoutMs, writeTimeoutMs,
                deploymentStrategy != null ? deploymentStrategy.name() : null, owner,
                modules, gatewayIds, toEnvVars(envVars), javaVersion, outboxEnabled, outboxTableName));
    }

    @Override
    public String id() {
        return id;
    }

    public ServiceViewModel load(ServiceDto model) {
        id = model.id();
        name = model.name();
        gitRepository = model.gitRepository();
        dockerImageRegistry = model.dockerImageRegistry();
        dockerImageName = model.dockerImageName();
        openApiDocumentationEnabled = model.openApiDocumentationEnabled();
        deploymentStrategy = model.deploymentStrategy() != null ? DeploymentStrategy.valueOf(model.deploymentStrategy()) : null;
        owner = model.owner();
        circuitBreakerEnabled = model.circuitBreakerEnabled();
        circuitBreakerThreshold = model.circuitBreakerThreshold();
        connectionTimeoutMs = model.connectionTimeoutMs();
        readTimeoutMs = model.readTimeoutMs();
        writeTimeoutMs = model.writeTimeoutMs();
        port = model.port();
        contextPath = model.contextPath();
        database = model.database();
        dbMigrationTool = model.dbMigrationTool();
        livenessProbe = model.livenessProbe();
        readinessProbe = model.readinessProbe();
        startupProbe = model.startupProbe();
        kubernetesReplicas = model.kubernetesReplicas();
        kubernetesCpuRequest = model.kubernetesCpuRequest();
        kubernetesCpuLimit = model.kubernetesCpuLimit();
        kubernetesMemoryRequest = model.kubernetesMemoryRequest();
        kubernetesMemoryLimit = model.kubernetesMemoryLimit();
        kubernetesHpaEnabled = model.kubernetesHpaEnabled();
        kubernetesHpaMinReplicas = model.kubernetesHpaMinReplicas();
        kubernetesHpaMaxReplicas = model.kubernetesHpaMaxReplicas();
        kubernetesHpaCpuThreshold = model.kubernetesHpaCpuThreshold();
        modules = model.moduleIds();
        gatewayIds = model.gatewayIds();
        javaVersion = model.javaVersion();
        outboxEnabled = model.outboxEnabled();
        outboxTableName = model.outboxTableName();
        envVars = model.envVars() != null ? model.envVars().stream().map(e -> {
            var vm = new EnvVarViewModel();
            vm.name = e.name();
            vm.defaultValue = e.defaultValue();
            vm.secret = e.secret();
            vm.required = e.required();
            vm.description = e.description();
            return vm;
        }).collect(java.util.stream.Collectors.toCollection(java.util.ArrayList::new)) : new java.util.ArrayList<>();
        return this;
    }

    private List<EnvVar> toEnvVars(List<EnvVarViewModel> vms) {
        if (vms == null) return List.of();
        return vms.stream()
                .map(vm -> new EnvVar(vm.name, vm.defaultValue, vm.secret, vm.required, vm.description))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New service";
    }

}
