<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if payloadModel?? && payloadModel.fields?has_content>
<#list payloadModel.fields as field>
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
package ${project.packageName}.${module.slug}.application.out.integration;

<#if hasDate>import java.time.LocalDate;
</#if><#if hasTime>import java.time.LocalTime;
</#if><#if hasDateTime>import java.time.LocalDateTime;
</#if><#if hasBigDecimal>import java.math.BigDecimal;
</#if>
// topic: ${integrationEvent.topicName!""}
public record ${className}(
        int schemaVersion<#if payloadModel?? && payloadModel.fields?has_content>,
<#list payloadModel.fields as field>
        <@javaType field/> ${fieldName(field)}<#sep>,</#sep>
</#list>
</#if>
) {

    /** The schema version this service currently emits for ${className}. */
    public static final int CURRENT_SCHEMA_VERSION = ${schemaVersion};

    /** Convenience constructor that stamps the current schema version. */
    public ${className}(<#if payloadModel?? && payloadModel.fields?has_content><#list payloadModel.fields as field><@javaType field/> ${fieldName(field)}<#sep>, </#sep></#list></#if>) {
        this(CURRENT_SCHEMA_VERSION<#if payloadModel?? && payloadModel.fields?has_content>, <#list payloadModel.fields as field>${fieldName(field)}<#sep>, </#sep></#list></#if>);
    }
}
