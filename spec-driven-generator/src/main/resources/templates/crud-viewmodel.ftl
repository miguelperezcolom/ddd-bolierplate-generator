package ${project.packageName}.infra.in.ui.pages.${aggregate.name?lower_case};

import io.mateu.uidl.annotations.HiddenInCreate;
import io.mateu.uidl.annotations.ReadOnly;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import ${project.packageName}.application.query.dto.${aggregate.name}Dto;
import ${project.packageName}.application.usecases.${aggregate.name?lower_case}.create.Create${aggregate.name}Command;
import ${project.packageName}.application.usecases.${aggregate.name?lower_case}.create.Create${aggregate.name}UseCase;
import ${project.packageName}.application.usecases.${aggregate.name?lower_case}.update.Update${aggregate.name}Command;
import ${project.packageName}.application.usecases.${aggregate.name?lower_case}.update.Update${aggregate.name}UseCase;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

<#assign hasDate = false>
<#assign hasTime = false>
<#assign hasDateTime = false>
<#assign hasBigDecimal = false>
<#list aggregate.fields as field>
    <#if field.type == "Wrapper">
        <#if field.primitiveType == "date"><#assign hasDate = true></#if>
        <#if field.primitiveType == "time"><#assign hasTime = true></#if>
        <#if field.primitiveType == "datetime"><#assign hasDateTime = true></#if>
        <#if field.primitiveType == "decimal"><#assign hasBigDecimal = true></#if>
    </#if>
</#list>
<#if hasDate>import java.time.LocalDate;</#if>
<#if hasTime>import java.time.LocalTime;</#if>
<#if hasDateTime>import java.time.LocalDateTime;</#if>
<#if hasBigDecimal>import java.math.BigDecimal;</#if>

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ${aggregate.name}ViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @HiddenInCreate
    @ReadOnly
    String id;

<#list aggregate.fields as field>
    <#if field.readonly>
    @ReadOnly
    </#if>
    <#if field.mandatory>
    @NotEmpty
    </#if>
    <#if field.type == "ValueObject" || field.type == "Entity">
    String ${field.name}<#if field.type == "Entity">Id</#if>;
    <#else>
        <#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
    String ${field.name};
        <#elseif field.primitiveType == "integer">
    Integer ${field.name};
        <#elseif field.primitiveType == "decimal">
    BigDecimal ${field.name};
        <#elseif field.primitiveType == "bool">
    Boolean ${field.name};
        <#elseif field.primitiveType == "date">
    LocalDate ${field.name};
        <#elseif field.primitiveType == "time">
    LocalTime ${field.name};
        <#elseif field.primitiveType == "datetime">
    LocalDateTime ${field.name};
        <#else>
    String ${field.name};
        </#if>
    </#if>

</#list>
    final Create${aggregate.name}UseCase create${aggregate.name}UseCase;
    final Update${aggregate.name}UseCase update${aggregate.name}UseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        return create${aggregate.name}UseCase.handle(new Create${aggregate.name}Command(
<#list aggregate.fields as field>
                ${field.name}<#if field.type == "Entity">Id</#if><#sep>,</#sep>
</#list>
        ));
    }

    @Override
    public void save(HttpRequest httpRequest) {
        update${aggregate.name}UseCase.handle(new Update${aggregate.name}Command(
                id,
<#list aggregate.fields as field>
                ${field.name}<#if field.type == "Entity">Id</#if><#sep>,</#sep>
</#list>
        ));
    }

    @Override
    public String id() {
        return id;
    }

    public ${aggregate.name}ViewModel load(${aggregate.name}Dto dto) {
        id = dto.id();
<#list aggregate.fields as field>
        ${field.name}<#if field.type == "Entity">Id</#if> = dto.${field.name}<#if field.type == "Entity">Id</#if>();
</#list>
        return this;
    }

    @Override
    public String toString() {
        return id != null ? "<#if aggregate.fields?has_content>${r"${" + aggregate.fields?first.name + "}"}<#else>${aggregate.name?lower_case}</#if>" : "New ${aggregate.name}";
    }

}
