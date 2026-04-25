<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#list safeFields as field><#if field.type == "Wrapper"><#if field.primitiveType == "date"><#assign hasDate = true></#if><#if field.primitiveType == "time"><#assign hasTime = true></#if><#if field.primitiveType == "datetime"><#assign hasDateTime = true></#if><#if field.primitiveType == "decimal"><#assign hasBigDecimal = true></#if></#if></#list>
package ${project.packageName}.domain.aggregates.${aggregate.name?lower_case};

<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${aggregate.name}Id;
<#list safeFields as field><#if field.type == "ValueObject">import ${project.packageName}.domain.aggregates.${aggregate.name?lower_case}.vo.${field.name?cap_first};
</#if></#list>
public interface ${aggregate.name}OperationContext {

${aggregate.name}Id id();

void id(${aggregate.name}Id id);

<#list safeFields as field>
    <#if field.type == "ValueObject">
        ${field.name?cap_first} ${field.name}();

        void ${field.name}(${field.name?cap_first} ${field.name});

    <#elseif field.type == "Entity">
        String ${field.name}Id();

        void ${field.name}Id(String ${field.name}Id);

    <#else>
        <#if field.primitiveType == "string" || field.primitiveType == "email" || field.primitiveType == "password" || field.primitiveType == "url" || field.primitiveType == "color" || field.primitiveType == "image" || field.primitiveType == "file" || field.primitiveType == "json">
            String ${field.name}();

            void ${field.name}(String ${field.name});

        <#elseif field.primitiveType == "integer">
            Integer ${field.name}();

            void ${field.name}(Integer ${field.name});

        <#elseif field.primitiveType == "decimal">
            BigDecimal ${field.name}();

            void ${field.name}(BigDecimal ${field.name});

        <#elseif field.primitiveType == "bool">
            Boolean ${field.name}();

            void ${field.name}(Boolean ${field.name});

        <#elseif field.primitiveType == "date">
            LocalDate ${field.name}();

            void ${field.name}(LocalDate ${field.name});

        <#elseif field.primitiveType == "time">
            LocalTime ${field.name}();

            void ${field.name}(LocalTime ${field.name});

        <#elseif field.primitiveType == "datetime">
            LocalDateTime ${field.name}();

            void ${field.name}(LocalDateTime ${field.name});

        <#else>
            String ${field.name}();

            void ${field.name}(String ${field.name});

        </#if>
    </#if>
</#list>
}