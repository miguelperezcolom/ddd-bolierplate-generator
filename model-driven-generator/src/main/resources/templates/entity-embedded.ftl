package ${project.packageName}.${module.slug}.domain.aggregates.${aggregate.name?lower_case};

<#if entity.isCollection>
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
<#else>
import jakarta.persistence.Embeddable;
</#if>
<#if entityModel?? && entityModel.fields?has_content>
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#list entityModel.fields as field>
<#if field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "dateTime"><#assign hasDateTime = true></#if>
<#if field.type == "number" || field.type == "money"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
</#if>
<#if entity.isCollection>
@Entity
@Table(name = "${entity.name?lower_case?replace("[^a-z0-9]","_",'r')}")
public class ${entity.name?cap_first} {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

<#if entityModel?? && entityModel.fields?has_content>
<#list entityModel.fields as field>
<#if field.basicType>
    <#if field.type == "string" || field.type == "email" || field.type == "password" || field.type == "url" || field.type == "color" || field.type == "image" || field.type == "file" || field.type == "json">
    String ${field.name};
    <#elseif field.type == "integer">
    Integer ${field.name};
    <#elseif field.type == "number" || field.type == "money">
    BigDecimal ${field.name};
    <#elseif field.type == "bool">
    Boolean ${field.name};
    <#elseif field.type == "date">
    LocalDate ${field.name};
    <#elseif field.type == "time">
    LocalTime ${field.name};
    <#elseif field.type == "dateTime">
    LocalDateTime ${field.name};
    <#else>
    String ${field.name};
    </#if>
<#else>
    String ${field.name}Id;
</#if>
</#list>
</#if>

}
<#else>
@Embeddable
public record ${entity.name?cap_first}(
<#if entityModel?? && entityModel.fields?has_content>
<#list entityModel.fields as field>
<#if field.basicType>
    <#if field.type == "string" || field.type == "email" || field.type == "password" || field.type == "url" || field.type == "color" || field.type == "image" || field.type == "file" || field.type == "json">
    String ${field.name}<#sep>,</#sep>
    <#elseif field.type == "integer">
    Integer ${field.name}<#sep>,</#sep>
    <#elseif field.type == "number" || field.type == "money">
    BigDecimal ${field.name}<#sep>,</#sep>
    <#elseif field.type == "bool">
    Boolean ${field.name}<#sep>,</#sep>
    <#elseif field.type == "date">
    LocalDate ${field.name}<#sep>,</#sep>
    <#elseif field.type == "time">
    LocalTime ${field.name}<#sep>,</#sep>
    <#elseif field.type == "dateTime">
    LocalDateTime ${field.name}<#sep>,</#sep>
    <#else>
    String ${field.name}<#sep>,</#sep>
    </#if>
<#else>
    String ${field.name}Id<#sep>,</#sep>
</#if>
</#list>
<#else>
    // TODO: define fields for this entity
</#if>
) {}
</#if>
