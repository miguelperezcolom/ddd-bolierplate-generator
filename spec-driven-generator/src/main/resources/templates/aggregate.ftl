package ${project.packageName}.domain.aggregates.${aggregate.name?lower_case};

<#-- Collect imports needed for field types -->
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
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${field.name?cap_first};
    </#if>
</#list>
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ${aggregate.name} extends AggregateRoot {

    ${aggregate.name}Id id;

<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
    ${field.name?cap_first} ${field.name};
    <#elseif field.type == "Entity">
    <#-- Entity reference: store the ID as a typed reference -->
    String ${field.name}Id;
    <#else>
    <#-- Wrapper / primitive -->
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

    public static ${aggregate.name} of(
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
            ${field.name?cap_first} ${field.name}<#sep>,</#sep>
    <#elseif field.type == "Entity">
            String ${field.name}Id<#sep>,</#sep>
    <#else>
        <#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
            String ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "integer">
            Integer ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "decimal">
            BigDecimal ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "bool">
            Boolean ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "date">
            LocalDate ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "time">
            LocalTime ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "datetime">
            LocalDateTime ${field.name}<#sep>,</#sep>
        <#else>
            String ${field.name}<#sep>,</#sep>
        </#if>
    </#if>
</#list>
    ) {
        ${aggregate.name} p = new ${aggregate.name}();
<#list aggregate.fields as field>
        p.${field.name} = ${field.name}<#if field.type == "Entity">Id</#if>;
</#list>
        return p;
    }

    public void update(
<#list aggregate.fields as field>
    <#if field.type == "ValueObject">
            ${field.name?cap_first} ${field.name}<#sep>,</#sep>
    <#elseif field.type == "Entity">
            String ${field.name}Id<#sep>,</#sep>
    <#else>
        <#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
            String ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "integer">
            Integer ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "decimal">
            BigDecimal ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "bool">
            Boolean ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "date">
            LocalDate ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "time">
            LocalTime ${field.name}<#sep>,</#sep>
        <#elseif field.primitiveType == "datetime">
            LocalDateTime ${field.name}<#sep>,</#sep>
        <#else>
            String ${field.name}<#sep>,</#sep>
        </#if>
    </#if>
</#list>
    ) {
<#list aggregate.fields as field>
        this.${field.name}<#if field.type == "Entity">Id</#if> = ${field.name}<#if field.type == "Entity">Id</#if>;
</#list>
    }

}
