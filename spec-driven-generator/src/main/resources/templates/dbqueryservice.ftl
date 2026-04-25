package ${project.packageName}.infra.out.persistence;

import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import ${project.packageName}.application.query.${aggregate.name}QueryService;
import ${project.packageName}.application.query.dto.${aggregate.name}Dto;
import ${project.packageName}.application.query.dto.${aggregate.name}Row;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ${aggregate.name}DBQueryService implements ${aggregate.name}QueryService {

    final ${aggregate.name}EntityRepository repository;

    @Override
    public String getLabel(String id) {
        return repository.findById(Long.valueOf(id))
                .map(e -> e.get${aggregate.fields?first.name?cap_first}()<#if aggregate.fields?first.type == "ValueObject">.value()</#if>)
                .map(Object::toString)
                .orElse("Unknown");
    }

    @Override
    public Optional<${aggregate.name}Dto> getById(String id) {
        return repository.findById(Long.valueOf(id)).map(this::toDto);
    }

    private ${aggregate.name}Dto toDto(${aggregate.name}Entity entity) {
        return new ${aggregate.name}Dto(
                entity.getId().toString()<#if aggregate.fields?has_content>,</#if>
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
                entity.get${field.name?cap_first}()<#sep>,</#sep>
    <#elseif field.type == "Entity">
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
    <#else>
                entity.get${field.name?cap_first}() != null ? entity.get${field.name?cap_first}().toString() : null<#sep>,</#sep>
    </#if>
</#list>
        );
    }

    private ${aggregate.name}Row toRow(${aggregate.name}Entity entity) {
        return new ${aggregate.name}Row(
                entity.getId().toString()<#if aggregate.fields?has_content>,</#if>
<#list aggregate.fields as field>
    <#if field.searchable || field.visible>
        <#if field.type == "Entity">
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
        <#else>
                entity.get${field.name?cap_first}() != null ? entity.get${field.name?cap_first}().toString() : null<#sep>,</#sep>
        </#if>
    </#if>
</#list>
        );
    }

    @Override
    public ListingData<${aggregate.name}Row> findAll(String searchText, Object filters, Pageable pageable) {
        var page = repository.findAllByNameContainingIgnoreCase(
                searchText,
                org.springframework.data.domain.Pageable
                        .ofSize(pageable.size())
                        .withPage(pageable.page())
        );
        return new ListingData<>(new Page<>(
                searchText,
                page.getSize(),
                page.getNumber(),
                page.getTotalElements(),
                page.getContent().stream().map(this::toRow).toList()
        ));
    }

}
