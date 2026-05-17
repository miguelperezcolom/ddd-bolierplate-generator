package io.mateu.modux.specdrivengenerator.application.usecases.project.generatecode;

import com.google.googlejavaformat.java.Formatter;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ServiceEntity;
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
