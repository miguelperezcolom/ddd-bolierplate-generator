package ${project.packageName}.infra.out.persistence;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>
<#assign visibleFields = safeFields?filter(f -> f.searchable || f.visible)>
<#assign firstStringField = safeFields?filter(f -> f.type == "Wrapper" && (f.primitiveType == "string" || f.primitiveType == "email" || f.primitiveType == "url"))?first!"">

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
<#if firstStringField?is_hash>
                .map(e -> e.get${firstStringField.name?cap_first}())
<#elseif safeFields?has_content>
                .map(e -> String.valueOf(e.get${safeFields?first.name?cap_first}()))
<#else>
                .map(e -> e.getId().toString())
</#if>
                .orElse("Unknown");
    }

    @Override
    public Optional<${aggregate.name}Dto> getById(String id) {
        return repository.findById(Long.valueOf(id)).map(this::toDto);
    }

    private ${aggregate.name}Dto toDto(${aggregate.name}Entity entity) {
        return new ${aggregate.name}Dto(
                entity.getId().toString()<#if safeFields?has_content>,</#if>
<#list safeFields as field>
    <#if field.type == "ValueObject">
                entity.get${field.name?cap_first}()<#sep>,</#sep>
    <#elseif field.type == "Entity">
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
    <#else>
        <#-- Pass native type directly — Dto has the correct type already -->
                entity.get${field.name?cap_first}()<#sep>,</#sep>
    </#if>
</#list>
        );
    }

    private ${aggregate.name}Row toRow(${aggregate.name}Entity entity) {
        return new ${aggregate.name}Row(
                entity.getId().toString()<#if visibleFields?has_content>,</#if>
<#list visibleFields as field>
    <#if field.type == "Entity">
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
    <#else>
                entity.get${field.name?cap_first}() != null ? entity.get${field.name?cap_first}().toString() : null<#sep>,</#sep>
    </#if>
</#list>
        );
    }

    @Override
    public ListingData<${aggregate.name}Row> findAll(String searchText, Object filters, Pageable pageable) {
        var allEntities = repository.findAll();
        var filtered = allEntities.stream()
                .filter(e -> searchText == null || searchText.isBlank() || matchesSearch(e, searchText))
                .toList();
        var total = filtered.size();
        var paged = filtered.stream()
                .skip((long) pageable.page() * pageable.size())
                .limit(pageable.size())
                .map(this::toRow)
                .toList();
        return new ListingData<>(new Page<>(
                searchText,
                pageable.size(),
                pageable.page(),
                total,
                paged
        ));
    }

    private boolean matchesSearch(${aggregate.name}Entity entity, String searchText) {
        var lower = searchText.toLowerCase();
        return <#if firstStringField?is_hash>entity.get${firstStringField.name?cap_first}() != null
                && entity.get${firstStringField.name?cap_first}().toLowerCase().contains(lower)<#else>entity.getId().toString().contains(lower)</#if>;
    }

}
