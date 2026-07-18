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
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ${aggregate.name}DBRepository implements ${aggregate.name}Repository {

    final ${aggregate.name}EntityRepository repository;
    final ApplicationEventPublisher domainEvents;

    @Override
    public Optional<${aggregate.name}> findById(${aggregate.name}Id id) {
        return repository.findById(id.value()).map(this::toDomain);
    }

    @Override
    public List<${aggregate.name}> findAll() {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    private ${aggregate.name} toDomain(${aggregate.name}Entity entity) {
        return new ${aggregate.name}(
                new ${aggregate.name}Id(entity.getId())<#if safeFields?has_content>,</#if>
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
                domain.getId() != null ? domain.getId().value() : null<#if safeFields?has_content>,</#if>
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

    @Override
    public ${aggregate.name}Id save(${aggregate.name} domain) {
        var id = new ${aggregate.name}Id(repository.save(toEntity(domain)).getId());
        // Domain events raised inside the aggregate (AggregateRoot.send) surface as Spring
        // application events on save — in-process policies subscribe with @EventListener.
        domain.popEvents().forEach(domainEvents::publishEvent);
        return id;
    }

    @Override
    public void deleteAllById(List<${aggregate.name}Id> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(${aggregate.name}Id::value).toList());
    }

}
