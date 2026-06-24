package ${project.packageName}.${module.slug}.infra.out.persistence;

import ${project.packageName}.${module.slug}.application.query.${className}QueryService;
import ${project.packageName}.${module.slug}.application.query.readmodel.${className};
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ${className}DBQueryService implements ${className}QueryService {

    final ${className}EntityRepository repository;

    @Override
    public Optional<${className}> getById(String id) {
        return repository.findById(id).map(this::toDto);
    }

    @Override
    public List<${className}> findAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    private ${className} toDto(${className}Entity entity) {
        return new ${className}(<#if model?? && model.fields?has_content>
<#list model.fields as field>
    <#if field.basicType>
                entity.get${field.name?cap_first}()<#sep>,</#sep>
    <#else>
                entity.get${field.name?cap_first}Id()<#sep>,</#sep>
    </#if>
</#list>
</#if>);
    }
}
