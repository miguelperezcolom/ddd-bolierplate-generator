package ${project.packageName}.infra.out.persistence;
<#assign safeFields = aggregate.fields?filter(f -> f.name != "id")>

<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false><#list safeFields as field><#if field.type == "Wrapper"><#if field.primitiveType == "date"><#assign hasDate = true></#if><#if field.primitiveType == "time"><#assign hasTime = true></#if><#if field.primitiveType == "datetime"><#assign hasDateTime = true></#if><#if field.primitiveType == "decimal"><#assign hasBigDecimal = true></#if></#if></#list>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ${aggregate.name}Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "${aggregate.name?lower_case}_seq_gen")
    @SequenceGenerator(
            name = "${aggregate.name?lower_case}_seq_gen",
            sequenceName = "${aggregate.name?lower_case}_sequence",
            allocationSize = 1
    )
    Long id;

<#list safeFields as field>
    <#if field.type == "Entity">
    String ${field.name}Id;
    <#elseif field.type == "ValueObject">
    <#-- ValueObjects are flattened to their string/primitive representation in the DB entity -->
    String ${field.name};
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

}
