package ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.infra.out.persistence;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>

import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.application.out.${aggregate.name}Repository;
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
<#list safeFields as field>
    <#if field.type == "ValueObject">
import ${project.packageName}.${module.name?lower_case?replace("[^a-z0-9]","",'r')}.domain.aggregates.${aggregate.name?lower_case}.vo.${field.name?cap_first};
    </#if>
</#list>
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Event-sourced implementation of {@link ${aggregate.name}Repository}. Every change is appended to the
 * ${aggregate.name} event store (the source of truth); a current-state snapshot is kept for reads and
 * the CRUD UI. {@code findById} folds the event stream via {@link ${aggregate.name}EventSourcing},
 * falling back to the snapshot until that fold is implemented.
 */
@Service
@RequiredArgsConstructor
public class ${aggregate.name}EventSourcedRepository implements ${aggregate.name}Repository {

    final ${aggregate.name}EntityRepository repository;
    final ${aggregate.name}EventAppender eventAppender;
    final ${aggregate.name}EventSourcing eventSourcing;

    @Override
    public Optional<${aggregate.name}> findById(${aggregate.name}Id id) {
        var events = eventAppender.history(String.valueOf(id.value()));
        if (!events.isEmpty()) {
            var rebuilt = eventSourcing.replay(id, events);
            if (rebuilt != null) {
                return Optional.of(rebuilt);
            }
        }
        // fall back to the current-state snapshot until the fold hook is implemented
        return repository.findById(id.value()).map(this::toDomain);
    }

    @Override
    public ${aggregate.name}Id save(${aggregate.name} domain) {
        var snapshot = repository.save(toEntity(domain));
        var id = new ${aggregate.name}Id(snapshot.getId());
        for (var event : eventSourcing.eventsOf(domain)) {
            eventAppender.append(String.valueOf(snapshot.getId()), event);
        }
        return id;
    }

    @Override
    public void deleteAllById(List<${aggregate.name}Id> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(${aggregate.name}Id::value).toList());
    }

    private ${aggregate.name} toDomain(${aggregate.name}Entity entity) {
        return new ${aggregate.name}(
                new ${aggregate.name}Id(entity.getId()),
<#list safeFields as field>
    <#if field.type == "ValueObject">
        <#if field.isEnum>
                ${field.name?cap_first}.valueOf(entity.get${field.name?cap_first}())<#sep>,</#sep>
        <#else>
                new ${field.name?cap_first}(entity.get${field.name?cap_first}())<#sep>,</#sep>
        </#if>
    <#elseif field.type == "Entity">
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
    <#else>
                entity.get${field.name?cap_first}()<#sep>,</#sep>
    </#if>
</#list>
        );
    }

    private ${aggregate.name}Entity toEntity(${aggregate.name} domain) {
        return new ${aggregate.name}Entity(
                domain.getId() != null ? domain.getId().value() : null,
<#list safeFields as field>
    <#if field.type == "ValueObject">
        <#if field.isEnum>
                domain.get${field.name?cap_first}() != null ? domain.get${field.name?cap_first}().name() : null<#sep>,</#sep>
        <#else>
                domain.get${field.name?cap_first}() != null ? domain.get${field.name?cap_first}().value() : null<#sep>,</#sep>
        </#if>
    <#elseif field.type == "Entity">
                domain.get${field.name?cap_first}Id()<#sep>,</#sep>
    <#else>
                domain.get${field.name?cap_first}()<#sep>,</#sep>
    </#if>
</#list>
        );
    }
}
