package ${project.packageName}.application.usecases.${aggregate.name?lower_case}.create;

import ${project.packageName}.application.out.${aggregate.name}Repository;
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.${aggregate.name};
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${field.name?cap_first};
    </#if>
</#list>
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class Create${aggregate.name}UseCase {

    final ${aggregate.name}Repository repository;

    @Transactional
    public String handle(Create${aggregate.name}Command command) {
        return repository.save(${aggregate.name}.of(
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
                new ${field.name?cap_first}(command.${field.name}())<#sep>,</#sep>
    <#elseif field.type == "Entity">
                command.${field.name}Id()<#sep>,</#sep>
    <#else>
                command.${field.name}()<#sep>,</#sep>
    </#if>
</#list>
        )).id().toString();
    }

}
