package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

import com.google.googlejavaformat.java.Formatter;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ComponentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EnumEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.uidl.data.FieldDataType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiShellEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ValueObjectEntity;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

        // Docker Compose at project root
        generateDockerCompose(project);

        // UI Shells — standalone Spring Boot apps (no JPA/Kafka, OAuth2 only)
        repository.findAllOfType(UiShellEntity.class)
                .forEach(shell -> generateUiShell(project, shell));
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

        // ReadModels (find by serviceId)
        repository.findAllOfType(ReadModelEntity.class).stream()
                .filter(rm -> service.id().equals(rm.serviceId()))
                .forEach(readModel -> generateReadModel(project, service, serviceDir, readModel));

        // IntegrationEvents (find by serviceId)
        repository.findAllOfType(IntegrationEventEntity.class).stream()
                .filter(ie -> service.id().equals(ie.serviceId()))
                .forEach(integrationEvent -> generateIntegrationEvent(project, service, serviceDir, integrationEvent));

        // QueryServices (find by serviceId)
        repository.findAllOfType(QueryServiceEntity.class).stream()
                .filter(qs -> service.id().equals(qs.serviceId()))
                .forEach(queryService -> generateQueryService(project, service, serviceDir, queryService));

        // generate the Spring Boot app module
        generateServiceApp(project, service, serviceDir);

        // Roles (all project roles, once per service in app module)
        generateRolesConfig(project, service, serviceDir);

        // UIAdapters (find by serviceId — generates custom Home.java)
        repository.findAllOfType(UiAdapterEntity.class).stream()
                .filter(a -> service.id().equals(a.serviceId()))
                .forEach(adapter -> generateUiAdapter(project, service, serviceDir, adapter));
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
        createDir(moduleDir, "src/main/java/" + packageDir + "/application/out");
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

        // Base interfaces at project package level, shared by all aggregate repositories and query services
        createFile(moduleDir, moduleModel, "repository.ftl",
                "src/main/java/" + packageDir + "/application/out/Repository.java");
        createDir(moduleDir, "src/main/java/" + packageDir + "/application/query");
        createFile(moduleDir, moduleModel, "queryservice.ftl",
                "src/main/java/" + packageDir + "/application/query/QueryService.java");

        // E2E base class (once per module)
        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/e2e");
        Map<String, Object> e2eBaseModel = buildBaseModel(project, service, module);
        createFile(moduleDir, e2eBaseModel, "e2e-base.ftl",
                "src/test/java/" + modulePackageDir + "/e2e/BaseE2ETest.java");

        (module.aggregateIds() != null ? module.aggregateIds() : List.<String>of()).stream()
                .map(aggregateId -> repository.findById(aggregateId, AggregateEntity.class).orElseThrow())
                .forEach(aggregate -> generateAggregate(project, service, module, moduleDir, modulePackageDir, aggregate));

        // BDD runner (once per module)
        Map<String, Object> bddModel = buildBaseModel(project, service, module);
        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/bdd");
        createFile(moduleDir, bddModel, "bdd-runner.ftl",
                "src/test/java/" + modulePackageDir + "/bdd/CucumberRunner.java");

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

        // Entities (embedded/child entities within aggregates)
        if (module.entityIds() != null) {
            module.entityIds().stream()
                    .map(id -> repository.findById(id, EntityEntity.class).orElseThrow())
                    .forEach(entity -> generateEntity(project, service, module, moduleDir, modulePackageDir, entity));
        }

        // Value objects
        if (module.valueObjectIds() != null) {
            module.valueObjectIds().stream()
                    .map(id -> repository.findById(id, ValueObjectEntity.class).orElseThrow())
                    .forEach(vo -> generateValueObject(project, service, module, moduleDir, modulePackageDir, vo));
        }

        // Model mappings (discovered by scanning use case and saga steps)
        generateModelMappingsForModule(project, service, module, moduleDir, modulePackageDir);

        // Pages (find by matching aggregateId to module's aggregate IDs)
        var moduleAggregateIds = module.aggregateIds() != null ? module.aggregateIds() : List.of();
        repository.findAllOfType(PageEntity.class).stream()
                .filter(p -> p.aggregateId() != null && moduleAggregateIds.contains(p.aggregateId()))
                .forEach(page -> generatePage(project, service, module, moduleDir, modulePackageDir, page));
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

        // Value-object enums referenced by the aggregate fields (one class per enum field)
        if (aggregate.modelId() != null && !aggregate.modelId().isBlank()) {
            var modelEntity = repository.findById(aggregate.modelId(), ModelEntity.class).orElse(null);
            if (modelEntity != null && modelEntity.fields() != null) {
                modelEntity.fields().stream()
                        .filter(f -> !f.basicType() && f.enumId() != null && !f.enumId().isBlank())
                        .forEach(f -> generateAggregateEnum(
                                project, service, module, moduleDir, modulePackageDir, aggregate, f.name(), f.enumId()));
            }
        }

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
                            splitCsv(operationEntity.preconditions()),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            splitCsv(operationEntity.emits()),
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

        // ─── Tests ────────────────────────────────────────────────────────────────
        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName);
        createFile(moduleDir, project, service, module, aggregate, "aggregate-test.ftl",
                "src/test/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/" + aggregate.name() + "Test.java");

        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/create");
        createFile(moduleDir, project, service, module, aggregate, "create-usecase-test.ftl",
                "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/create/Create" + aggregate.name() + "UseCaseTest.java");

        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/update");
        createFile(moduleDir, project, service, module, aggregate, "update-usecase-test.ftl",
                "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/update/Update" + aggregate.name() + "UseCaseTest.java");

        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName + "/delete");
        createFile(moduleDir, project, service, module, aggregate, "delete-usecase-test.ftl",
                "src/test/java/" + modulePackageDir + "/application/usecases/" + aggregatePackageName
                        + "/delete/Delete" + aggregate.name() + "UseCaseTest.java");

        // ─── BDD ─────────────────────────────────────────────────────────────────
        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/bdd");
        createFile(moduleDir, project, service, module, aggregate, "bdd-steps.ftl",
                "src/test/java/" + modulePackageDir + "/bdd/" + aggregate.name() + "Steps.java");

        createDir(moduleDir, "src/test/resources/features/" + moduleSlug(module.name()));
        createFile(moduleDir, project, service, module, aggregate, "bdd-feature.ftl",
                "src/test/resources/features/" + moduleSlug(module.name()) + "/" + aggregate.name() + ".feature");

        // E2E test
        createFile(moduleDir, project, service, module, aggregate, "e2e-aggregate.ftl",
                "src/test/java/" + modulePackageDir + "/e2e/" + aggregate.name() + "E2ETest.java");
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

        // Unit test for custom use case
        createDir(moduleDir, "src/test/java/" + modulePackageDir + "/application/usecases/" + ucSlug);
        Map<String, Object> testModel = buildBaseModel(project, service, module);
        testModel.put("usecase", enrichUseCaseMap(useCase));
        createFile(moduleDir, testModel, "usecase-test.ftl",
                "src/test/java/" + modulePackageDir + "/application/usecases/" + ucSlug
                        + "/" + capitalize(useCase.name()) + "UseCaseTest.java");
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

    // ─── ReadModels ───────────────────────────────────────────────────────────

    private void generateReadModel(ProjectEntity project, ServiceEntity service, String serviceDir, ReadModelEntity readModel) {
        if (service.moduleIds() == null || service.moduleIds().isEmpty()) return;
        var firstModule = repository.findById(service.moduleIds().get(0), ModuleEntity.class).orElse(null);
        if (firstModule == null) return;
        var moduleSlug = moduleSlug(firstModule.name());
        var moduleDir = serviceDir + "/" + moduleSlug;
        var modulePackageDir = project.packageName().replace(".", "/") + "/" + moduleSlug;

        Map<String, Object> model = buildBaseModel(project, service, firstModule);
        var typeName = toTypeName(readModel.name());
        var className = typeName.endsWith("ReadModel") ? typeName : typeName + "ReadModel";
        model.put("className", className);
        if (readModel.modelId() != null && !readModel.modelId().isBlank()) {
            var modelEntity = repository.findById(readModel.modelId(), ModelEntity.class).orElse(null);
            model.put("model", modelEntity != null ? fromJson(toJson(modelEntity)) : null);
        }

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/query/readmodel");
        createFile(moduleDir, model, "read-model.ftl",
                "src/main/java/" + modulePackageDir + "/application/query/readmodel/" + className + ".java");
    }

    // ─── IntegrationEvents ────────────────────────────────────────────────────

    private void generateIntegrationEvent(ProjectEntity project, ServiceEntity service, String serviceDir, IntegrationEventEntity integrationEvent) {
        if (service.moduleIds() == null || service.moduleIds().isEmpty()) return;
        var firstModule = repository.findById(service.moduleIds().get(0), ModuleEntity.class).orElse(null);
        if (firstModule == null) return;
        var moduleSlug = moduleSlug(firstModule.name());
        var moduleDir = serviceDir + "/" + moduleSlug;
        var modulePackageDir = project.packageName().replace(".", "/") + "/" + moduleSlug;

        Map<String, Object> model = buildBaseModel(project, service, firstModule);
        var className = toTypeName(integrationEvent.name());
        model.put("className", className);
        model.put("integrationEvent", fromJson(toJson(integrationEvent)));
        if (integrationEvent.payloadModelId() != null && !integrationEvent.payloadModelId().isBlank()) {
            var payloadModel = repository.findById(integrationEvent.payloadModelId(), ModelEntity.class).orElse(null);
            model.put("payloadModel", payloadModel != null ? fromJson(toJson(payloadModel)) : null);
        }

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/out/integration");
        createFile(moduleDir, model, "integration-event.ftl",
                "src/main/java/" + modulePackageDir + "/application/out/integration/" + className + ".java");
        createFile(moduleDir, model, "integration-event-publisher.ftl",
                "src/main/java/" + modulePackageDir + "/application/out/integration/" + className + "Publisher.java");
    }

    // ─── QueryServices ────────────────────────────────────────────────────────

    private void generateQueryService(ProjectEntity project, ServiceEntity service, String serviceDir, QueryServiceEntity queryService) {
        if (service.moduleIds() == null || service.moduleIds().isEmpty()) return;
        var firstModule = repository.findById(service.moduleIds().get(0), ModuleEntity.class).orElse(null);
        if (firstModule == null) return;
        var moduleSlug = moduleSlug(firstModule.name());
        var moduleDir = serviceDir + "/" + moduleSlug;
        var modulePackageDir = project.packageName().replace(".", "/") + "/" + moduleSlug;

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/query");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/query/dto");

        // Resolve distinct referenced models → DTOs, mapping modelId -> TypeName
        var typeNameByModelId = new HashMap<String, String>();
        var dtosToGenerate = new LinkedHashSet<String>();
        var operations = queryService.operations() != null ? queryService.operations() : List.<QueryOperationEntity>of();

        for (var op : operations) {
            resolveQueryModelType(op.inputModelId(), typeNameByModelId, dtosToGenerate);
            resolveQueryModelType(op.outputModelId(), typeNameByModelId, dtosToGenerate);
        }

        // Generate each DTO once
        for (var modelId : dtosToGenerate) {
            var modelEntity = repository.findById(modelId, ModelEntity.class).orElse(null);
            if (modelEntity == null) continue;
            Map<String, Object> dtoModel = buildBaseModel(project, service, firstModule);
            var dtoClassName = typeNameByModelId.get(modelId);
            dtoModel.put("className", dtoClassName);
            dtoModel.put("model", fromJson(toJson(modelEntity)));
            createFile(moduleDir, dtoModel, "query-dto.ftl",
                    "src/main/java/" + modulePackageDir + "/application/query/dto/" + dtoClassName + ".java");
        }

        // Build enriched operation list
        var enrichedOps = new ArrayList<Map<String, Object>>();
        for (var op : operations) {
            var opMap = new HashMap<String, Object>();
            opMap.put("opName", uncapitalize(op.name()));
            opMap.put("inType", queryTypeRef(op.inputModelId(), typeNameByModelId));
            opMap.put("outType", queryTypeRef(op.outputModelId(), typeNameByModelId));
            opMap.put("cardinality", op.cardinality() != null ? op.cardinality().name() : "Single");
            enrichedOps.add(opMap);
        }

        Map<String, Object> model = buildBaseModel(project, service, firstModule);
        var className = toTypeName(queryService.name());
        model.put("className", className);
        model.put("operations", enrichedOps);
        createFile(moduleDir, model, "query-service.ftl",
                "src/main/java/" + modulePackageDir + "/application/query/" + className + ".java");
    }

    private void resolveQueryModelType(String modelId, Map<String, String> typeNameByModelId, Set<String> dtosToGenerate) {
        if (modelId == null || modelId.isBlank() || typeNameByModelId.containsKey(modelId)) return;
        var modelEntity = repository.findById(modelId, ModelEntity.class).orElse(null);
        if (modelEntity == null) return;
        typeNameByModelId.put(modelId, toTypeName(modelEntity.name()));
        dtosToGenerate.add(modelId);
    }

    private String queryTypeRef(String modelId, Map<String, String> typeNameByModelId) {
        if (modelId == null || modelId.isBlank()) return "Object";
        return typeNameByModelId.getOrDefault(modelId, "Object");
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

    // ─── Entity (embedded/child) ──────────────────────────────────────────────

    private void generateEntity(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                String moduleDir, String modulePackageDir, EntityEntity entity) {
        var parentAggregate = entity.parentAggregateId() != null
                ? repository.findById(entity.parentAggregateId(), AggregateEntity.class).orElse(null)
                : null;

        var aggregatePackageName = parentAggregate != null
                ? parentAggregate.name().toLowerCase()
                : "shared";

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName);

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("entity", fromJson(toJson(entity)));
        model.put("aggregate", parentAggregate != null ? aggregateToMap(parentAggregate) : Map.of("name", aggregatePackageName));

        if (entity.modelId() != null && !entity.modelId().isBlank()) {
            var entityModel = repository.findById(entity.modelId(), ModelEntity.class).orElse(null);
            model.put("entityModel", entityModel != null ? fromJson(toJson(entityModel)) : null);
        }

        createFile(moduleDir, model, "entity-embedded.ftl",
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/" + capitalize(entity.name()) + ".java");
    }

    // ─── Value Objects ────────────────────────────────────────────────────────

    private void generateValueObject(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                     String moduleDir, String modulePackageDir, ValueObjectEntity vo) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/domain/vo");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("vo", fromJson(toJson(vo)));

        var voType = vo.type() != null ? vo.type().toUpperCase() : "SIMPLE";

        switch (voType) {
            case "ENUM" -> createFile(moduleDir, model, "vo-enum.ftl",
                    "src/main/java/" + modulePackageDir + "/domain/vo/"
                            + capitalize(vo.name()) + ".java");
            case "COMPOSITE" -> {
                model.put("voFields", parseVoFields(vo.fieldsJson()));
                createFile(moduleDir, model, "vo-composite.ftl",
                        "src/main/java/" + modulePackageDir + "/domain/vo/"
                                + capitalize(vo.name()) + ".java");
            }
            default -> createFile(moduleDir, model, "vo-simple.ftl",
                    "src/main/java/" + modulePackageDir + "/domain/vo/"
                            + capitalize(vo.name()) + ".java");
        }
    }

    private void generateAggregateEnum(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                       String moduleDir, String modulePackageDir, AggregateEntity aggregate,
                                       String fieldName, String enumId) {
        var enumEntity = repository.findById(enumId, EnumEntity.class).orElse(null);
        var values = (enumEntity != null && enumEntity.values() != null)
                ? enumEntity.values().stream().map(v -> toEnumConstant(v.id())).toList()
                : List.<String>of();

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("aggregate", aggregateToMap(aggregate));
        model.put("enumName", capitalize(fieldName));
        model.put("values", values);

        createFile(moduleDir, model, "aggregate-enum.ftl",
                "src/main/java/" + modulePackageDir + "/domain/aggregates/" + aggregate.name().toLowerCase()
                        + "/vo/" + capitalize(fieldName) + ".java");
    }

    /** Turns an enum value id (e.g. "B2C", "pago-front") into a valid Java enum constant. */
    private String toEnumConstant(String id) {
        var constant = id.toUpperCase().replaceAll("[^A-Z0-9_]", "_");
        return constant.matches("^[0-9].*") ? "_" + constant : constant;
    }

    private List<Map<String, String>> parseVoFields(String fieldsJson) {
        if (fieldsJson == null || fieldsJson.isBlank()) return List.of();
        // Try comma-separated "name:type" format
        var result = new ArrayList<Map<String, String>>();
        for (var part : fieldsJson.split(",")) {
            part = part.trim();
            var colonIdx = part.indexOf(':');
            if (colonIdx > 0) {
                var fieldName = part.substring(0, colonIdx).trim();
                var fieldType = part.substring(colonIdx + 1).trim().toLowerCase();
                result.add(Map.of("name", fieldName, "type", fieldType));
            } else if (!part.isBlank()) {
                result.add(Map.of("name", part, "type", "string"));
            }
        }
        return result;
    }

    // ─── Model Mappings (scanned from use-case and saga steps) ───────────────

    private void generateModelMappingsForModule(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                                String moduleDir, String modulePackageDir) {
        Set<String> mappingIds = new LinkedHashSet<>();

        // Collect from use case steps
        if (module.useCaseIds() != null) {
            module.useCaseIds().stream()
                    .map(id -> repository.findById(id, UseCaseEntity.class).orElse(null))
                    .filter(uc -> uc != null && uc.steps() != null)
                    .flatMap(uc -> uc.steps().stream())
                    .filter(step -> step.modelMappingId() != null && !step.modelMappingId().isBlank())
                    .map(UseCaseStepEntity::modelMappingId)
                    .forEach(mappingIds::add);
        }

        // Collect from saga steps
        if (module.sagaIds() != null) {
            module.sagaIds().stream()
                    .map(id -> repository.findById(id, SagaEntity.class).orElse(null))
                    .filter(saga -> saga != null && saga.steps() != null)
                    .flatMap(saga -> saga.steps().stream())
                    .filter(step -> step.modelMappingId() != null && !step.modelMappingId().isBlank())
                    .map(SagaStepEntity::modelMappingId)
                    .forEach(mappingIds::add);
        }

        if (mappingIds.isEmpty()) return;

        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/application/mappers");

        for (var mappingId : mappingIds) {
            var mapping = repository.findById(mappingId, ModelMappingEntity.class).orElse(null);
            if (mapping == null) continue;

            Map<String, Object> model = buildBaseModel(project, service, module);
            model.put("mapping", fromJson(toJson(mapping)));

            if (mapping.sourceModelId() != null && !mapping.sourceModelId().isBlank()) {
                var sourceModel = repository.findById(mapping.sourceModelId(), ModelEntity.class).orElse(null);
                model.put("sourceModel", sourceModel != null ? fromJson(toJson(sourceModel)) : null);
            }
            if (mapping.targetModelId() != null && !mapping.targetModelId().isBlank()) {
                var targetModel = repository.findById(mapping.targetModelId(), ModelEntity.class).orElse(null);
                model.put("targetModel", targetModel != null ? fromJson(toJson(targetModel)) : null);
            }

            createFile(moduleDir, model, "model-mapper.ftl",
                    "src/main/java/" + modulePackageDir + "/application/mappers/"
                            + capitalize(mapping.name()) + "Mapper.java");
        }
    }

    // ─── Pages ────────────────────────────────────────────────────────────────

    private void generatePage(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                              String moduleDir, String modulePackageDir, PageEntity page) {
        var pageSlug = page.name().toLowerCase().replaceAll("[^a-z0-9]", "");
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + pageSlug);

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("page", fromJson(toJson(page)));

        // Resolve aggregate
        if (page.aggregateId() != null && !page.aggregateId().isBlank()) {
            var aggregate = repository.findById(page.aggregateId(), AggregateEntity.class).orElse(null);
            model.put("aggregate", aggregate != null ? aggregateToMap(aggregate) : null);
        }

        // Resolve model for FORM pages
        if (page.modelId() != null && !page.modelId().isBlank()) {
            var pageModel = repository.findById(page.modelId(), ModelEntity.class).orElse(null);
            model.put("pageModel", pageModel != null ? fromJson(toJson(pageModel)) : null);
        }

        // Resolve components for DASHBOARD pages
        if (page.componentIds() != null && !page.componentIds().isEmpty()) {
            var components = page.componentIds().stream()
                    .map(cId -> repository.findById(cId, ComponentEntity.class).orElse(null))
                    .filter(c -> c != null)
                    .map(c -> fromJson(toJson(c)))
                    .toList();
            model.put("components", components);

            // Also generate each component class
            page.componentIds().stream()
                    .map(cId -> repository.findById(cId, ComponentEntity.class).orElse(null))
                    .filter(c -> c != null)
                    .forEach(component -> generateComponent(project, service, module, moduleDir, modulePackageDir, component));
        }

        var pageType = page.type() != null ? page.type().toUpperCase() : "CRUD";
        var template = switch (pageType) {
            case "FORM" -> "page-form.ftl";
            case "DASHBOARD" -> "page-dashboard.ftl";
            case "WIZARD" -> "page-wizard.ftl";
            default -> "page-crud.ftl";
        };

        createFile(moduleDir, model, template,
                "src/main/java/" + modulePackageDir + "/infra/in/ui/pages/" + pageSlug
                        + "/" + capitalize(page.name().replaceAll("[^a-zA-Z0-9]", "")) + "Page.java");
    }

    // ─── Components ───────────────────────────────────────────────────────────

    private void generateComponent(ProjectEntity project, ServiceEntity service, ModuleEntity module,
                                   String moduleDir, String modulePackageDir, ComponentEntity component) {
        createDir(moduleDir, "src/main/java/" + modulePackageDir + "/infra/in/ui/components");

        Map<String, Object> model = buildBaseModel(project, service, module);
        model.put("component", fromJson(toJson(component)));

        createFile(moduleDir, model, "component.ftl",
                "src/main/java/" + modulePackageDir + "/infra/in/ui/components/"
                        + capitalize(component.name().replaceAll("[^a-zA-Z0-9]", "")) + "Component.java");
    }

    // ─── Roles / Security ─────────────────────────────────────────────────────

    private void generateRolesConfig(ProjectEntity project, ServiceEntity service, String serviceDir) {
        var roles = repository.findAllOfType(RoleEntity.class);
        if (roles.isEmpty()) return;

        var serviceName = serviceName(service);
        var appDir = serviceDir + "/" + serviceName + "-app";
        var packageDir = project.packageName().replace(".", "/");

        createDir(appDir, "src/main/java/" + packageDir + "/infra/in/security");

        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("service", serviceToMap(service));
        model.put("roles", roles.stream().map(r -> fromJson(toJson(r))).toList());

        createFile(appDir, model, "role-security.ftl",
                "src/main/java/" + packageDir + "/infra/in/security/SecurityConfig.java");
    }

    // ─── UIAdapter Home ───────────────────────────────────────────────────────

    private void generateUiAdapter(ProjectEntity project, ServiceEntity service, String serviceDir, UiAdapterEntity adapter) {
        var serviceName = serviceName(service);
        var appDir = serviceDir + "/" + serviceName + "-app";
        var packageDir = project.packageName().replace(".", "/");

        createDir(appDir, "src/main/java/" + packageDir + "/infra/in/ui");

        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("service", serviceToMap(service));
        model.put("adapter", fromJson(toJson(adapter)));

        // Overwrite Home.java with UIAdapter-driven version
        createFile(appDir, model, "ui-adapter-home.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/Home.java");
    }

    // ─── Docker Compose ───────────────────────────────────────────────────────

    private void generateDockerCompose(ProjectEntity project) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        createFile(project.outputPath(), model, "docker-compose.ftl", "docker-compose.yml");
    }

    // ─── UI Shells ────────────────────────────────────────────────────────────

    private void generateUiShell(ProjectEntity project, UiShellEntity shell) {
        var shellSlug = shell.name().toLowerCase().replaceAll("[^a-z0-9]", "-").replaceAll("-+", "-");
        var shellDir = project.outputPath() + "/" + shellSlug;
        var shellPackage = project.packageName() + "." + shell.name().toLowerCase().replaceAll("[^a-z0-9]", "");
        var shellClassName = toClassName(shell.name());
        var packageDir = shellPackage.replace(".", "/");

        createDir(shellDir, "");
        createDir(shellDir, "src/main/java/" + packageDir + "/infra/in/ui");
        createDir(shellDir, "src/main/java/" + packageDir + "/infra/config");
        createDir(shellDir, "src/main/resources/static/images");
        createDir(shellDir, "src/test/java");

        // resolve serviceIds → ServiceEntity maps
        var resolvedServices = (shell.serviceIds() != null ? shell.serviceIds() : List.<String>of()).stream()
                .map(id -> repository.findById(id, ServiceEntity.class).orElse(null))
                .filter(s -> s != null)
                .map(s -> fromJson(toJson(s)))
                .toList();

        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("shell", fromJson(toJson(shell)));
        model.put("shellPackage", shellPackage);
        model.put("shellClassName", shellClassName);
        model.put("resolvedServices", resolvedServices);

        createFile(shellDir, model, "uishell-pom.ftl", "pom.xml");
        createFile(shellDir, model, "uishell-application.ftl",
                "src/main/java/" + packageDir + "/" + shellClassName + "Application.java");
        createFile(shellDir, model, "uishell-home.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/" + shellClassName + "Home.java");
        createFile(shellDir, model, "uishell-security.ftl",
                "src/main/java/" + packageDir + "/infra/config/SecurityConfig.java");
        createFile(shellDir, model, "uishell-yaml.ftl",
                "src/main/resources/application.yaml");
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

        var aggregates = (module.aggregateIds() != null ? module.aggregateIds() : List.<String>of()).stream()
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
                            splitCsv(operationEntity.preconditions()),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            splitCsv(operationEntity.emits()),
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

        if (aggregate.modelId() != null && !aggregate.modelId().isBlank()) {
            var modelEntity = repository.findById(aggregate.modelId(), ModelEntity.class).orElse(null);
            if (modelEntity != null && modelEntity.fields() != null) {
                var fields = modelEntity.fields().stream()
                        .map(f -> {
                            var fieldMap = new HashMap<String, Object>();
                            fieldMap.put("name", f.name());
                            fieldMap.put("basicType", f.basicType());
                            fieldMap.put("searchable", true);
                            fieldMap.put("visible", true);
                            fieldMap.put("mandatory", false);
                            fieldMap.put("readonly", false);
                            if (f.basicType()) {
                                fieldMap.put("type", "Wrapper");
                                fieldMap.put("primitiveType", mapFieldDataType(f.type()));
                            } else {
                                fieldMap.put("type", "ValueObject");
                                fieldMap.put("primitiveType", null);
                            }
                            fieldMap.put("isEnum",
                                    !f.basicType() && f.enumId() != null && !f.enumId().isBlank());
                            return (Object) fieldMap;
                        })
                        .toList();
                map.put("fields", fields);
            } else {
                map.put("fields", List.of());
            }
        } else {
            map.put("fields", List.of());
        }

        return map;
    }

    private String mapFieldDataType(FieldDataType type) {
        if (type == null) return "string";
        return switch (type) {
            case integer -> "integer";
            case number, money -> "decimal";
            case date -> "date";
            case time -> "time";
            case dateTime -> "datetime";
            case bool -> "bool";
            case file -> "file";
            default -> "string";
        };
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

    /** Null/blank-safe CSV split: returns an empty list instead of NPE-ing on null. */
    private List<String> splitCsv(String value) {
        if (value == null || value.isBlank()) return List.of();
        return Arrays.asList(value.split(","));
    }

    private String capitalize(String value) {
        if (value == null || value.isBlank()) {
            return value;
        }
        return value.substring(0, 1).toUpperCase() + value.substring(1);
    }

    private String uncapitalize(String value) {
        if (value == null || value.isBlank()) {
            return value;
        }
        return value.substring(0, 1).toLowerCase() + value.substring(1);
    }

    /** Converts an arbitrary name to a PascalCase Java type name (alphanumerics only). */
    private String toTypeName(String name) {
        if (name == null || name.isBlank()) return "Type";
        var sb = new StringBuilder();
        boolean upperNext = true;
        for (var c : name.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                sb.append(upperNext ? Character.toUpperCase(c) : c);
                upperNext = false;
            } else {
                upperNext = true;
            }
        }
        var result = sb.toString();
        if (result.isEmpty()) return "Type";
        if (Character.isDigit(result.charAt(0))) result = "_" + result;
        return result;
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
        // Mirrors the class-name logic in application.ftl (cap-first per word, preserving internal case)
        return Arrays.stream(name.replace("-", " ").replace("_", " ").split("\\s+"))
                .map(w -> w.isEmpty() ? "" : Character.toUpperCase(w.charAt(0)) + w.substring(1))
                .collect(java.util.stream.Collectors.joining());
    }
}
