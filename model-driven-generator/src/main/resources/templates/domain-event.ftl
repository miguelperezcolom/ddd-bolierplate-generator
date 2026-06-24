<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if eventModel?? && eventModel.fields?has_content>
<#list eventModel.fields as field>
<#if field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "datetime"><#assign hasDateTime = true></#if>
<#if field.type == "decimal"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
<#macro javaType field><#if field.basicType><#if field.type == "integer">Integer<#elseif field.type == "decimal">BigDecimal<#elseif field.type == "bool">Boolean<#elseif field.type == "date">LocalDate<#elseif field.type == "time">LocalTime<#elseif field.type == "datetime">LocalDateTime<#else>String</#if><#else>String</#if></#macro>
<#function fieldName field><#if field.basicType><#return field.name><#else><#return field.name + "Id"></#if></#function>
package ${project.packageName}.${module.slug}.domain.events;

<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
/**
 * Domain event ${event.name}. Carries its schema version so consumers can detect and upcast
 * older payloads (see ${event.name}EventUpcaster when the version is greater than 1).
 */
public record ${event.name}Event(
        int schemaVersion,
        String aggregateId<#if eventModel?? && eventModel.fields?has_content>,
<#list eventModel.fields as field>
        <@javaType field/> ${fieldName(field)}<#sep>,</#sep>
</#list>
</#if>
) {

    /** The schema version this service currently emits for ${event.name}. */
    public static final int CURRENT_SCHEMA_VERSION = ${schemaVersion};

    /** Convenience constructor that stamps the current schema version. */
    public ${event.name}Event(String aggregateId<#if eventModel?? && eventModel.fields?has_content>, <#list eventModel.fields as field><@javaType field/> ${fieldName(field)}<#sep>, </#sep></#list></#if>) {
        this(CURRENT_SCHEMA_VERSION, aggregateId<#if eventModel?? && eventModel.fields?has_content>, <#list eventModel.fields as field>${fieldName(field)}<#sep>, </#sep></#list></#if>);
    }
}
