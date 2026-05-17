package io.mateu.modux.specdrivengenerator.application.usecases.project.generatecode;

import com.google.googlejavaformat.java.Formatter;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.mateu.core.infra.JsonSerializer.*;

@Service
@Repository
@RequiredArgsConstructor
@Slf4j
public class GenerateCodeUseCase {

    final CommonFileRepository repository;

    public void handle(GenerateCodeCommand command) {

        var project = repository.findById(command.projectId(), ProjectEntity.class).orElseThrow();

        if (project.gitRepository() != null && !project.gitRepository().isBlank()) {
            generateRootPom(project);
        }

        project.serviceIds().stream()
                .map(id -> repository.findById(id, ServiceEntity.class).orElseThrow())
                .forEach(service -> generateService(project, service));

        // Docker Compose at project root (monorepo) or service root (single-service)
        generateDockerCompose(project);
    }

    // ─── Root pom (monorepo) ──────────────────────────────────────────────────

    private void generateRootPom(ProjectEntity project) {
        createDir(project.outputPath(), "");
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        createFile(project.outputPath(), model, "root-pom.ftl", "pom.xml");
    }

    // ─── Service level ────────────────────────────────────────────────────────

    private void generateService(ProjectEntity project, ServiceEntity service) {
        var serviceName = serviceName(service);
        var serviceDir = project.outputPath() + "/" + serviceName;

        createDir(serviceDir, "");

        // service parent pom
        Map<String, Object> serviceModel = new HashMap<>();
        serviceModel.put("project", projectToMap(project));
        serviceModel.put("service", serviceToMap(service));
        createFile(serviceDir, serviceModel, "service-parent-pom.ftl", "pom.xml");

        // generate each DDD module
        service.moduleIds().stream()
                .map(id -> repository.findById(id, ModuleEntity.class).orElseThrow())
                .forEach(module -> generateModule(project, service, serviceDir, module));

        // generate gateways (outbound adapters at service level)
        if (service.gatewayIds() != null) {
            service.gatewayIds().stream()
                    .map(id -> repository.findById(id, GatewayEntity.class).orElseThrow())
                    .forEach(gateway -> generateGateway(project, service, serviceDir, gateway));
        }

        // generate the Spring Boot app module
        generateServiceApp(project, service, serviceDir);
    }

    // ─── Module level ─────────────────────────────────────────────────────────

    private void generateModule(ProjectEntity project, ServiceEntity service,
                                String serviceDir, ModuleEntity module) {
        var moduleSlug = moduleSlug(module.name());
        var moduleDir = serviceDir + "/" + moduleSlug;
        var packageDir = project.packageName().replace(".", "/");
        var modulePackageDir = packageDir + "/" + moduleSlug;

        createDir(moduleDir, "");

        // module pom
        Map<String, Object> moduleModel = new HashMap<>();
        moduleModel.put("project", projectToMap(project));
        moduleModel.put("service", serviceToMap(service));
        moduleModel.put("module", moduleToMap(module));
        createFile(moduleDir, moduleModel, "module-pom.ftl", "pom.xml");

        // source directories
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/usecases");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/out");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/query/dto");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/domain/aggregates/shared/vo");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/ui/pages");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/ui/suppliers");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/out/persistence");
        createDir(moduleDir, "src/main/resources");
        createDir(moduleDir, "src/test/java");
        createDir(moduleDir, "src/test/resources");

        module.aggregateIds().stream()
                .map(aggregateId -> repository.findById(aggregateId, AggregateEntity.class).orElseThrow())
                .forEach(aggregate -> generateAggregate(project, service, module, moduleDir, modulePackageDir, aggregate));

        // Domain events
        if (module.domainEventIds() != null) {
            module.domainEventIds().stream()
                    .map(id -> repository.findById(id, DomainEventEntity.class).orElseThrow())
                    .forEach(event -> generateDomainEvent(project, service, module, moduleDir, modulePackageDir, event));
        }

        // Subscriptions
        if (module.subscriptionIds() != null) {
            module.subscriptionIds().stream()
                    .map(id -> repository.findById(id, SubscriptionEntity.class).orElseThrow())
                    .forEach(subscription -> generateSubscription(project, service, module, moduleDir, modulePackageDir, subscription));
        }

        // Scheduled triggers
        if (module.scheduledTriggerIds() != null) {
            module.scheduledTriggerIds().stream()
                    .map(id -> repository.findById(id, ScheduledTriggerEntity.class).orElseThrow())
                    .forEach(trigger -> generateScheduledTrigger(project, service, module, moduleDir, modulePackageDir, trigger));
        }

        // Use cases
        if (module.useCaseIds() != null) {
            module.useCaseIds().stream()
                    .map(id -> repository.findById(id, UseCaseEntity.class).orElseThrow())
                    .forEach(useCase -> generateUseCase(project, service, module, moduleDir, modulePackageDir, useCase));
        }

        // Sagas
        if (module.sagaIds() != null) {
            module.sagaIds().stream()
                    .map(id -> repository.findById(id, SagaEntity.class).orElseThrow())
                    .forEach(saga -> generateSaga(project, service, module, moduleDir, modulePackageDir, saga));
        }

        // Projections
        if (module.projectionIds() != null) {
            module.projectionIds().stream()
                    .map(id -> repository.findById(id, ProjectionEntity.class).orElseThrow())
                    .forEach(projection -> generateProjection(project, service, module, moduleDir, modulePackageDir, projection));
        }

        // Read models
        if (module.readModelIds() != null) {
            module.readModelIds().stream()
                    .map(id -> repository.findById(id, ReadModelEntity.class).orElseThrow())
                    .forEach(readModel -> generateReadModel(project, service, module, moduleDir, modulePackageDir, readModel));
        }
    }

    // ─── Service app ─────────────────────────────────────────────────────────

    private void generateServiceApp(ProjectEntity project, ServiceEntity service, String serviceDir) {
        var serviceName = serviceName(service);
        var appDir = serviceDir + "/" + serviceName + "-app";
        var packageDir = project.packageName().replace(".", "/");

        createDir(appDir, "");
        createDir(appDir, "src/main/java/" + packageDir);
        createDir(appDir, "src/main/java/" + packageDir + "/infra/in/ui");
        createDir(appDir, "src/main/resources");
        createDir(appDir, "src/test/java");
        createDir(appDir, "src/test/resources");

        Map<String, Object> appModel = new HashMap<>();
        appModel.put("project", projectToMap(project));
        appModel.put("service", serviceToMap(service));

        createFile(appDir, appModel, "service-app-pom.ftl", "pom.xml");
        createFile(appDir, appModel, "application-yaml.ftl", "src/main/resources/application.yaml");
        createFile(appDir, appModel, "application.ftl",
                "src/main/java/" + packageDir + "/" + toClassName(service.name()) + "Application.java");
        createFile(appDir, appModel, "home.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/Home.java");
    }

    // ─── Aggregate level ─────────────────────────────────────────────────────

    private void generateAggregate(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                   String moduleDir, String modulePackageDir, AggregateEntity aggregate) {

        var aggregatePackageName = aggregate.name().toLowerCase();

        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/create");

        createFile(moduleDir, project, service, module, aggregate, "aggregate-repository.ftl",
                "src/main/java/" + modulePackageDir + "/application/out/" + aggregate.name() + "Repository.java");
        createFile(moduleDir, project, service, module, aggregate, "aggregate-queryservice.ftl",
                "src/main/java/" + modulePackageDir + "/application/query/" + aggregate.name() + "QueryService.java");
        createFile(moduleDir, project, service, module, aggregate, "row.ftl",
                "src/main/java/" + modulePackageDir + "/application/query/dto/" + aggregate.name() + "Row.java");
        createFile(moduleDir, project, service, module, aggregate, "dto.ftl",
                "src/main/java/" + modulePackageDir + "/application/query/dto/" + aggregate.name() + "Dto.java");

        createFile(moduleDir, project, service, module, aggregate, "create-command.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/create/Create" + aggregate.name() + "Command.java");
        createFile(moduleDir, project, service, module, aggregate, "create-usecase.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/create/Create" + aggregate.name() + "UseCase.java");

        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/update");

        createFile(moduleDir, project, service, module, aggregate, "update-command.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/update/Update" + aggregate.name() + "Command.java");
        createFile(moduleDir, project, service, module, aggregate, "update-usecase.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/update/Update" + aggregate.name() + "UseCase.java");

        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/delete");

        createFile(moduleDir, project, service, module, aggregate, "delete-command.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/delete/Delete" + aggregate.name() + "Command.java");
        createFile(moduleDir, project, service, module, aggregate, "delete-usecase.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/delete/Delete" + aggregate.name() + "UseCase.java");

        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName);
        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName + "/vo");

        createFile(moduleDir, project, service, module, aggregate, "vo-id.ftl",
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/vo/" + aggregate.name() + "Id.java");

        boolean hasValueObjectFields = false;
        if (hasValueObjectFields) {
            createFile(moduleDir, project, service, module, aggregate, "vo-name.ftl",
                    "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                            + "/vo/" + aggregate.name() + "Name.java");
        }

        boolean hasOperations = aggregate.operations() != null && !aggregate.operations().isEmpty();
        if (hasOperations) {
            createFile(moduleDir, project, service, module, aggregate, "operation-context.ftl",
                    "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                            + "/" + aggregate.name() + "OperationContext.java");
        }

        if (aggregate.operations() != null) {
            aggregate.operations().stream()
                    .filter(operation -> operation.type() != null && "CUSTOM".equals(operation.type()))
                    .map(operationEntity -> new OperationDto(
                            operationEntity.id(),
                            operationEntity.name(),
                            operationEntity.inputModelId(),
                            operationEntity.outputModelId(),
                            Arrays.asList(operationEntity.preconditions().split(",")),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            Arrays.asList(operationEntity.emits().split(",")),
                            OperationType.valueOf(operationEntity.type()),
                            operationEntity.paginated(),
                            operationEntity.defaultPageSize()
                    ))
                    .forEach(operation -> {
                        Map<String, Object> model = new HashMap<>();
                        model.put("project", projectToMap(project));
                        model.put("service", serviceToMap(service));
                        model.put("module", moduleToMap(module));
                        model.put("aggregate", aggregateToMap(aggregate));
                        model.put("operation", fromJson(toJson(operation)));

                        createFile(moduleDir, model, "custom-operation.ftl",
                                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                                        + "/" + capitalize(operation.name()) + aggregate.name() + "Operation.java");
                    });
        }

        createFile(moduleDir, project, service, module, aggregate, "aggregate.ftl",
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/" + aggregate.name() + ".java");

        createFile(moduleDir, project, service, module, aggregate, "dbentity.ftl",
                "src/main/java/" + modulePackageDir + "/infra/out/persistence/" + aggregate.name() + "Entity.java");
        createFile(moduleDir, project, service, module, aggregate, "dbrepository.ftl",
                "src/main/java/" + modulePackageDir + "/infra/out/persistence/" + aggregate.name() + "DBRepository.java");
        createFile(moduleDir, project, service, module, aggregate, "dbqueryservice.ftl",
                "src/main/java/" + modulePackageDir + "/infra/out/persistence/" + aggregate.name() + "DBQueryService.java");
        createFile(moduleDir, project, service, module, aggregate, "entityrepository.ftl",
                "src/main/java/" + modulePackageDir + "/infra/out/persistence/" + aggregate.name() + "EntityRepository.java");

        createDir(moduleDir,
                "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + aggregatePackageName);

        createFile(moduleDir, project, service, module, aggregate, "crud-adapter.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "CrudAdapter.java");
        createFile(moduleDir, project, service, module, aggregate, "crud-orchestrator.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "CrudOrchestrator.java");
        createFile(moduleDir, project, service, module, aggregate, "crud-viewmodel.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "ViewModel.java");
        createFile(moduleDir, project, service, module, aggregate, "options-supplier.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/suppliers/"
                        + aggregate.name() + "IdOptionsSupplier.java");
        createFile(moduleDir, project, service, module, aggregate, "label-supplier.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/suppliers/"
                        + aggregate.name() + "IdLabelSupplier.java");
    }

    // ─── Use Cases ────────────────────────────────────────────────────────────

    private void generateUseCase(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                 String moduleDir, String modulePackageDir, UseCaseEntity useCase) {
        var ucSlug = useCase.name().toLowerCase().replaceAll("[^a-z0-9]", "");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/usecases/" + ucSlug);

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("usecase", enrichUseCaseMap(useCase));
        if (useCase.inputModelId() != null && !useCase.inputModelId().isBlank()) {
            var inputModel = repository.findById(useCase.inputModelId(), ModelEntity.class).orElse(null);
            model.put("inputModel", inputModel != null ? fromJson(toJson(inputModel)) : null);
        }

        createFile(moduleDir, model, "usecase-command.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + ucSlug
                        + "/" + capitalize(useCase.name()) + "Command.java");
        createFile(moduleDir, model, "usecase.ftl",
                "src/main/java/" + modulePackageDir + "/application/usecases/" + ucSlug
                        + "/" + capitalize(useCase.name()) + "UseCase.java");

        if (useCase.exposedAsRest()) {
            createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/rest");
            createFile(moduleDir, model, "usecase-rest-controller.ftl",
                    "src/main/java/" + modulePackageDir + "/infra/in/rest/"
                            + capitalize(useCase.name()) + "Controller.java");
        }

        if (useCase.exposedAsAsync()) {
            createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/async");
            createFile(moduleDir, model, "usecase-async-consumer.ftl",
                    "src/main/java/" + modulePackageDir + "/infra/in/async/"
                            + capitalize(useCase.name()) + "Consumer.java");
        }
    }

    private Map<String, Object> enrichUseCaseMap(UseCaseEntity useCase) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(useCase)));

        var enrichedSteps = new java.util.ArrayList<>();
        var needsStreamBridge = false;

        if (useCase.steps() != null) {
            for (var step : useCase.steps()) {
                var stepMap = enrichStep(step.id(), step.name(),
                        step.type() != null ? step.type().name() : "Custom",
                        step.aggregateId(), step.operationId(),
                        step.gatewayId(), step.gatewayOperationId(),
                        step.domainEventId(), step.useCaseId(), step.modelMappingId());
                enrichedSteps.add(stepMap);
                if ("PublishDomainEvent".equals(stepMap.get("type"))) {
                    needsStreamBridge = true;
                }
            }
        }

        map.put("steps", enrichedSteps);
        map.put("needsStreamBridge", needsStreamBridge);
        return map;
    }

    // ─── Gateways ─────────────────────────────────────────────────────────────

    private void generateGateway(ProjectEntity project, ServiceEntity service, String serviceDir, GatewayEntity gateway) {
        // Gateways are module-agnostic at service level; we place them in the first module or a shared location.
        // For now we generate them relative to serviceDir in a shared infra area.
        // Find the first module to determine the package dir.
        if (service.moduleIds() == null || service.moduleIds().isEmpty()) return;
        var firstModule = repository.findById(service.moduleIds().get(0), ModuleEntity.class).orElse(null);
        if (firstModule == null) return;
        var moduleSlug = moduleSlug(firstModule.name());
        var moduleDir = serviceDir + "/" + moduleSlug;
        var modulePackageDir = project.packageName().replace(".", "/") + "/" + moduleSlug;

        Map<String, Object> model = buildBaseModel(project, service, firstModule);
        model.put("gateway", fromJson(toJson(gateway)));

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/out");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/out/gateway");

        createFile(moduleDir, model, "gateway.ftl",
                "src/main/java/" + modulePackageDir + "/application/out/"
                        + capitalize(gateway.name()) + "Gateway.java");
        createFile(moduleDir, model, "gateway-impl.ftl",
                "src/main/java/" + modulePackageDir + "/infra/out/gateway/"
                        + capitalize(gateway.name()) + "GatewayImpl.java");
    }

    // ─── Sagas ────────────────────────────────────────────────────────────────

    private void generateSaga(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                              String moduleDir, String modulePackageDir, SagaEntity saga) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/sagas");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("saga", enrichSagaMap(saga));

        createFile(moduleDir, model, "saga.ftl",
                "src/main/java/" + modulePackageDir + "/application/sagas/"
                        + capitalize(saga.name()) + "Saga.java");
    }

    private Map<String, Object> enrichSagaMap(SagaEntity saga) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(saga)));

        var enrichedSteps = new java.util.ArrayList<>();
        if (saga.steps() != null) {
            for (var step : saga.steps()) {
                var stepMap = enrichStep(step.id(), step.name(),
                        step.type() != null ? step.type().name() : "Custom",
                        step.aggregateId(), step.operationId(),
                        step.gatewayId(), step.gatewayOperationId(),
                        step.domainEventId(), step.useCaseId(), step.modelMappingId());
                enrichedSteps.add(stepMap);
            }
        }
        map.put("steps", enrichedSteps);
        return map;
    }

    // ─── Read Models ──────────────────────────────────────────────────────────

    private void generateReadModel(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                   String moduleDir, String modulePackageDir, ReadModelEntity readModel) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/domain/readmodels");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("readModel", fromJson(toJson(readModel)));
        if (readModel.modelId() != null && !readModel.modelId().isBlank()) {
            var modelEntity = repository.findById(readModel.modelId(), ModelEntity.class).orElse(null);
            model.put("model", modelEntity != null ? fromJson(toJson(modelEntity)) : null);
        }

        createFile(moduleDir, model, "read-model.ftl",
                "src/main/java/" + modulePackageDir + "/domain/readmodels/"
                        + capitalize(readModel.name()) + "ReadModel.java");
    }

    // ─── Docker Compose ───────────────────────────────────────────────────────

    private void generateDockerCompose(ProjectEntity project) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        createFile(project.outputPath(), model, "docker-compose.ftl", "docker-compose.yml");
    }

    // ─── Projections ──────────────────────────────────────────────────────────

    private void generateProjection(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                    String moduleDir, String modulePackageDir, ProjectionEntity projection) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/projection");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("projection", fromJson(toJson(projection)));

        createFile(moduleDir, model, "projection.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/projection/"
                        + capitalize(projection.name()) + "Projection.java");
    }

    // ─── Shared step enrichment ───────────────────────────────────────────────

    private Map<String, Object> enrichStep(String id, String name, String type,
                                           String aggregateId, String operationId,
                                           String gatewayId, String gatewayOperationId,
                                           String domainEventId, String useCaseId, String modelMappingId) {
        var stepMap = new HashMap<String, Object>();
        stepMap.put("id", id);
        stepMap.put("name", name);
        stepMap.put("type", type);

        switch (type) {
            case "ReadAggregate", "CallAggregateOperation", "SaveAggregate" -> {
                if (aggregateId != null) {
                    var agg = repository.findById(aggregateId, AggregateEntity.class).orElse(null);
                    if (agg != null) {
                        stepMap.put("aggregate", fromJson(toJson(agg)));
                        if ("CallAggregateOperation".equals(type) && operationId != null && agg.operations() != null) {
                            agg.operations().stream()
                                    .filter(op -> op.id().equals(operationId))
                                    .findFirst()
                                    .ifPresent(op -> stepMap.put("operation", fromJson(toJson(op))));
                        }
                    }
                }
            }
            case "CallGateway" -> {
                if (gatewayId != null) {
                    var gw = repository.findById(gatewayId, GatewayEntity.class).orElse(null);
                    if (gw != null) {
                        stepMap.put("gateway", fromJson(toJson(gw)));
                        if (gatewayOperationId != null && gw.operations() != null) {
                            gw.operations().stream()
                                    .filter(op -> op.id().equals(gatewayOperationId))
                                    .findFirst()
                                    .ifPresent(op -> stepMap.put("gatewayOperation", fromJson(toJson(op))));
                        }
                    }
                }
            }
            case "PublishDomainEvent" -> {
                if (domainEventId != null) {
                    var event = repository.findById(domainEventId, DomainEventEntity.class).orElse(null);
                    if (event != null) stepMap.put("domainEvent", fromJson(toJson(event)));
                }
            }
            case "CallUseCase" -> {
                if (useCaseId != null) {
                    var calledUC = repository.findById(useCaseId, UseCaseEntity.class).orElse(null);
                    if (calledUC != null) stepMap.put("useCase", fromJson(toJson(calledUC)));
                }
            }
            case "ApplyModelMapping" -> {
                if (modelMappingId != null) {
                    var mapping = repository.findById(modelMappingId, ModelMappingEntity.class).orElse(null);
                    if (mapping != null) stepMap.put("modelMapping", fromJson(toJson(mapping)));
                }
            }
        }
        return stepMap;
    }

    // ─── Domain events / Subscriptions / Scheduled triggers ──────────────────

    private Map<String, Object> buildBaseModel(ProjectEntity project, ServiceEntity service, ModuleEntity module) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("service", serviceToMap(service));
        model.put("module", moduleToMap(module));
        return model;
    }

    private void generateDomainEvent(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                     String moduleDir, String modulePackageDir, DomainEventEntity event) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/domain/events");

        Map<String, Object> model = buildBaseModel(project, service, module);
        if (event.modelId() != null && !event.modelId().isBlank()) {
            var modelEntity = repository.findById(event.modelId(), ModelEntity.class).orElse(null);
            model.put("eventModel", modelEntity != null ? fromJson(toJson(modelEntity)) : null);
        }
        model.put("event", fromJson(toJson(event)));

        createFile(moduleDir, model, "domain-event.ftl",
                "src/main/java/" + modulePackageDir + "/domain/events/" + event.name() + "Event.java");
    }

    private void generateSubscription(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                      String moduleDir, String modulePackageDir, SubscriptionEntity subscription) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/async");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("subscription", fromJson(toJson(subscription)));

        createFile(moduleDir, model, "subscription.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/async/" + capitalize(subscription.name()) + "Subscription.java");
    }

    private void generateScheduledTrigger(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                          String moduleDir, String modulePackageDir, ScheduledTriggerEntity trigger) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/scheduler");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("trigger", fromJson(toJson(trigger)));

        createFile(moduleDir, model, "scheduled-trigger.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/scheduler/" + capitalize(trigger.name()) + "Scheduler.java");
    }

    // ─── createFile overloads ─────────────────────────────────────────────────

    @SneakyThrows
    private void createFile(String baseDir, ProjectEntity project, ServiceEntity service, ModuleEntity module,
                            AggregateEntity aggregate, String template, String destFile) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("service", serviceToMap(service));
        model.put("module", moduleToMap(module));
        model.put("aggregate", aggregateToMap(aggregate));
        createFile(baseDir, model, template, destFile);
    }

    // ─── Model mappers ────────────────────────────────────────────────────────

    private Map<String, Object> projectToMap(ProjectEntity project) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(project)));
        var services = project.serviceIds().stream()
                .map(id -> repository.findById(id, ServiceEntity.class).orElseThrow())
                .map(this::serviceToMap)
                .toList();
        map.put("services", services);
        return map;
    }

    private Map<String, Object> serviceToMap(ServiceEntity service) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(service)));
        var modules = service.moduleIds().stream()
                .map(id -> repository.findById(id, ModuleEntity.class).orElseThrow())
                .map(this::moduleToMap)
                .toList();
        map.put("modules", modules);
        return map;
    }

    private Map<String, Object> moduleToMap(ModuleEntity module) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(module)));

        var aggregates = module.aggregateIds().stream()
                .map(aggregateId -> repository.findById(aggregateId, AggregateEntity.class).orElseThrow())
                .map(this::aggregateToMap)
                .toList();

        map.put("aggregates", aggregates);
        map.put("slug", moduleSlug(module.name()));
        return map;
    }

    private Map<String, Object> aggregateToMap(AggregateEntity aggregate) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(aggregate)));

        if (!map.containsKey("operations") || map.get("operations") == null) {
            map.put("operations", List.of());
        } else {
            map.put("operations", aggregate.operations().stream()
                    .filter(operation -> operation.type() != null && "CUSTOM".equals(operation.type()))
                    .map(operationEntity -> new OperationDto(
                            operationEntity.id(),
                            operationEntity.name(),
                            operationEntity.inputModelId(),
                            operationEntity.outputModelId(),
                            Arrays.asList(operationEntity.preconditions().split(",")),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            Arrays.asList(operationEntity.emits().split(",")),
                            OperationType.valueOf(operationEntity.type()),
                            operationEntity.paginated(),
                            operationEntity.defaultPageSize()
                    ))
                    .map(op -> fromJson(toJson(op)))
                    .toList());
        }

        if (!map.containsKey("invariants") || map.get("invariants") == null) {
            map.put("invariants", List.of());
        }

        if (!map.containsKey("fields") || map.get("fields") == null) {
            map.put("fields", List.of());
        }

        return map;
    }

    // ─── File I/O ─────────────────────────────────────────────────────────────

    @SneakyThrows
    private void createFile(String baseDir, Map<String, Object> model, String template, String destFile) {
        var cfg = new freemarker.template.Configuration(freemarker.template.Configuration.VERSION_2_3_32);
        cfg.setClassForTemplateLoading(this.getClass(), "/templates");
        cfg.setDefaultEncoding("UTF-8");

        var t = cfg.getTemplate(template);
        var file = new File(baseDir + "/" + destFile);
        var parent = file.getParentFile();

        if (parent != null) {
            parent.mkdirs();
        }

        try (var out = new PrintWriter(file)) {
            t.process(model, out);
        }

        formatIfJava(file);
    }

    private void formatIfJava(File file) {
        try {
            if (file.getName().endsWith(".java")) {
                var source = Files.readString(file.toPath());
                var formatted = new Formatter().formatSource(source);
                Files.writeString(file.toPath(), formatted);
            }
        } catch (Throwable e) {
            log.warn("Could not format generated file {}", file.getAbsolutePath(), e);
        }
    }

    private void createDir(String baseDir, String dir) {
        new File(baseDir + "/" + dir).mkdirs();
    }

    private String capitalize(String value) {
        if (value == null || value.isBlank()) {
            return value;
        }
        return value.substring(0, 1).toUpperCase() + value.substring(1);
    }

    /** Converts "booking service" or "booking-service" to "booking-service" (kebab-case slug) */
    private String serviceName(ServiceEntity service) {
        return service.name().toLowerCase().replaceAll("[\\s_]+", "-");
    }

    /** Converts "My Module" or "my-module" to "mymodule" (no separator, lower) */
    private String moduleSlug(String name) {
        return name.toLowerCase().replaceAll("[^a-z0-9]", "");
    }

    /** Converts "booking service" or "booking-service" to "BookingService" (PascalCase) */
    private String toClassName(String name) {
        if (name == null || name.isBlank()) return "App";
        return Arrays.stream(name.replace("-", " ").split("\\s+"))
                .map(w -> w.isEmpty() ? "" : Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase())
                .collect(java.util.stream.Collectors.joining());
    }
}
