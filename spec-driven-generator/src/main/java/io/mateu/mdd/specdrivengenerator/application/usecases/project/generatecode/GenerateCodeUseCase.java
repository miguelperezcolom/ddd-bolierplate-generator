package io.mateu.mdd.specdrivengenerator.application.usecases.project.generatecode;

import com.google.googlejavaformat.java.Formatter;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
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
        var packageDir = project.packageName().replace(".", "/");

        createDir(project.outputPath(), "");
        createDir(project.outputPath(), "src/main/java/" + packageDir);
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/application/usecases");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/application/out");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/application/query/dto");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/domain/aggregates/shared/vo");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/infra/in/ui");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/infra/in/ui/pages");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/infra/in/ui/suppliers");
        createDir(project.outputPath(), "src/main/java/" + packageDir + "/infra/out/persistence");
        createDir(project.outputPath(), "src/main/resources");
        createDir(project.outputPath(), "src/test/java");
        createDir(project.outputPath(), "src/test/resources");

        createFile(project.outputPath(), project, "pom.ftl", "pom.xml");
        createFile(project.outputPath(), project, "application-yaml.ftl", "src/main/resources/application.yaml");
        createFile(project.outputPath(), project, "application.ftl",
                "src/main/java/" + packageDir + "/" + toClassName(project.name()) + "Application.java");

        createFile(project.outputPath(), project, "repository.ftl",
                "src/main/java/" + packageDir + "/application/out/Repository.java");
        createFile(project.outputPath(), project, "queryservice.ftl",
                "src/main/java/" + packageDir + "/application/query/QueryService.java");
        createFile(project.outputPath(), project, "home.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/Home.java");

        project.moduleIds().stream()
                .map(moduleId -> repository.findById(moduleId, ModuleEntity.class).orElseThrow())
                .forEach(module -> module.aggregateIds().stream()
                        .map(aggregateId -> repository.findById(aggregateId, AggregateEntity.class).orElseThrow())
                        .forEach(aggregate -> generateAggregate(project, packageDir, aggregate)));
    }

    private void generateAggregate(ProjectEntity project, String packageDir, AggregateEntity aggregate) {

        var aggregatePackageName = aggregate.name().toLowerCase();

        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName + "/create");

        createFile(project.outputPath(), project, aggregate, "aggregate-repository.ftl",
                "src/main/java/" + packageDir + "/application/out/" + aggregate.name() + "Repository.java");
        createFile(project.outputPath(), project, aggregate, "aggregate-queryservice.ftl",
                "src/main/java/" + packageDir + "/application/query/" + aggregate.name() + "QueryService.java");
        createFile(project.outputPath(), project, aggregate, "row.ftl",
                "src/main/java/" + packageDir + "/application/query/dto/" + aggregate.name() + "Row.java");
        createFile(project.outputPath(), project, aggregate, "dto.ftl",
                "src/main/java/" + packageDir + "/application/query/dto/" + aggregate.name() + "Dto.java");

        createFile(project.outputPath(), project, aggregate, "create-command.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/create/Create" + aggregate.name() + "Command.java");
        createFile(project.outputPath(), project, aggregate, "create-usecase.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/create/Create" + aggregate.name() + "UseCase.java");

        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName + "/update");

        createFile(project.outputPath(), project, aggregate, "update-command.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/update/Update" + aggregate.name() + "Command.java");
        createFile(project.outputPath(), project, aggregate, "update-usecase.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/update/Update" + aggregate.name() + "UseCase.java");

        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName + "/delete");

        createFile(project.outputPath(), project, aggregate, "delete-command.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/delete/Delete" + aggregate.name() + "Command.java");
        createFile(project.outputPath(), project, aggregate, "delete-usecase.ftl",
                "src/main/java/" + packageDir + "/application/usecases/" + aggregatePackageName
                        + "/delete/Delete" + aggregate.name() + "UseCase.java");

        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName);
        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName + "/vo");

        createFile(project.outputPath(), project, aggregate, "vo-id.ftl",
                "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/vo/" + aggregate.name() + "Id.java");

        // vo-name.ftl solo si el aggregate tiene fields de tipo ValueObject
        boolean hasValueObjectFields = aggregate.fields() != null && aggregate.fields().stream()
                .anyMatch(f -> "ValueObject".equals(f.type()));
        if (hasValueObjectFields) {
            createFile(project.outputPath(), project, aggregate, "vo-name.ftl",
                    "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName
                            + "/vo/" + aggregate.name() + "Name.java");
        }

        // operation-context.ftl solo si el aggregate tiene operaciones
        boolean hasOperations = aggregate.operations() != null && !aggregate.operations().isEmpty();
        if (hasOperations) {
            createFile(project.outputPath(), project, aggregate, "operation-context.ftl",
                    "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName
                            + "/" + aggregate.name() + "OperationContext.java");
        }

        if (aggregate.operations() != null) {
            aggregate.operations().stream()
                    .filter(operation -> operation.type() != null && "CUSTOM".equals(operation.type()))
                    .map(operationEntity -> new OperationDto(
                            operationEntity.id(),
                            operationEntity.name(),
                            Arrays.asList(operationEntity.preconditions().split(",")),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            Arrays.asList(operationEntity.emits().split(",")),
                            OperationType.valueOf(operationEntity.type())
                    ))
                    .forEach(operation -> {
                        Map<String, Object> model = new HashMap<>();
                        model.put("project", projectToMap(project));
                        model.put("aggregate", aggregateToMap(aggregate));
                        model.put("operation", fromJson(toJson(operation)));

                        createFile(project.outputPath(), model, "custom-operation.ftl",
                                "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName
                                        + "/" + capitalize(operation.name()) + aggregate.name() + "Operation.java");
                    });
        }

        createFile(project.outputPath(), project, aggregate, "aggregate.ftl",
                "src/main/java/" + packageDir + "/domain/aggregates/" + aggregatePackageName
                        + "/" + aggregate.name() + ".java");

        createFile(project.outputPath(), project, aggregate, "dbentity.ftl",
                "src/main/java/" + packageDir + "/infra/out/persistence/" + aggregate.name() + "Entity.java");
        createFile(project.outputPath(), project, aggregate, "dbrepository.ftl",
                "src/main/java/" + packageDir + "/infra/out/persistence/" + aggregate.name() + "DBRepository.java");
        createFile(project.outputPath(), project, aggregate, "dbqueryservice.ftl",
                "src/main/java/" + packageDir + "/infra/out/persistence/" + aggregate.name() + "DBQueryService.java");
        createFile(project.outputPath(), project, aggregate, "entityrepository.ftl",
                "src/main/java/" + packageDir + "/infra/out/persistence/" + aggregate.name() + "EntityRepository.java");

        createDir(project.outputPath(),
                "src/main/java/" + packageDir + "/infra/in/ui/pages/" + aggregatePackageName);

        createFile(project.outputPath(), project, aggregate, "crud-adapter.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "CrudAdapter.java");
        createFile(project.outputPath(), project, aggregate, "crud-orchestrator.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "CrudOrchestrator.java");
        createFile(project.outputPath(), project, aggregate, "crud-viewmodel.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/pages/" + aggregatePackageName
                        + "/" + aggregate.name() + "ViewModel.java");
        createFile(project.outputPath(), project, aggregate, "options-supplier.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/suppliers/"
                        + aggregate.name() + "IdOptionsSupplier.java");
        createFile(project.outputPath(), project, aggregate, "label-supplier.ftl",
                "src/main/java/" + packageDir + "/infra/in/ui/suppliers/"
                        + aggregate.name() + "IdLabelSupplier.java");
    }

    @SneakyThrows
    private void createFile(String baseDir, ProjectEntity project, AggregateEntity aggregate, String template, String destFile) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        model.put("aggregate", aggregateToMap(aggregate));
        createFile(baseDir, model, template, destFile);
    }

    @SneakyThrows
    private void createFile(String baseDir, ProjectEntity project, String template, String destFile) {
        Map<String, Object> model = new HashMap<>();
        model.put("project", projectToMap(project));
        createFile(baseDir, model, template, destFile);
    }

    private Map<String, Object> projectToMap(ProjectEntity project) {
        var map = new HashMap<String, Object>();
        map.putAll(fromJson(toJson(project)));

        var modules = project.moduleIds().stream()
                .map(moduleId -> repository.findById(moduleId, ModuleEntity.class).orElseThrow())
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
            // Serialize each OperationDto to Map so Freemarker accesses fields
            // as properties (operation.name) instead of Java methods (operation.name())
            map.put("operations", aggregate.operations().stream()
                    .filter(operation -> operation.type() != null && "CUSTOM".equals(operation.type()))
                    .map(operationEntity -> new OperationDto(
                            operationEntity.id(),
                            operationEntity.name(),
                            Arrays.asList(operationEntity.preconditions().split(",")),
                            listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                            Arrays.asList(operationEntity.emits().split(",")),
                            OperationType.valueOf(operationEntity.type())
                    ))
                    .map(op -> fromJson(toJson(op)))  // ← convert to Map for Freemarker
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

    /** Converts "poc sagas" or "poc-sagas" to "PocSagas" */
    private String toClassName(String name) {
        if (name == null || name.isBlank()) return "App";
        return Arrays.stream(name.replace("-", " ").split("\\s+"))
                .map(w -> w.isEmpty() ? "" : Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase())
                .collect(java.util.stream.Collectors.joining());
    }
}