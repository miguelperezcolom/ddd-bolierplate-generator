package ${project.packageName}.infra.out.persistence;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>

import ${project.packageName}.application.out.${aggregate.name}Repository;
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
<#list safeFields as field>
    <#if field.type == "ValueObject">
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${field.name?cap_first};
    </#if>
</#list>
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ${aggregate.name}DBRepository implements ${aggregate.name}Repository {

    final ${aggregate.name}EntityRepository repository;

    @Override
    public Optional<${aggregate.name}> findById(${aggregate.name}Id id) {
        return repository.findById(id.value()).map(this::toDomain);
    }

    private ${aggregate.name} toDomain(${aggregate.name}Entity entity) {
        return new ${aggregate.name}(
                new ${aggregate.name}Id(entity.getId()),
<#list safeFields as field>
    <#if field.type == "ValueObject">
                new ${field.name?cap_first}(entity.get${field.name?cap_first}())<#sep>,</#sep>
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
                domain.get${field.name?cap_first}() != null ? domain.get${field.name?cap_first}().value() : null<#sep>,</#sep>
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
        return new ${aggregate.name}Id(repository.save(toEntity(domain)).getId());
    }

    @Override
    public void deleteAllById(List<${aggregate.name}Id> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(${aggregate.name}Id::value).toList());
    }

}
