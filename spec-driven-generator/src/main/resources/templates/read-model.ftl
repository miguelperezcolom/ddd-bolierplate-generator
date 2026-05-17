package ${project.packageName}.${module.slug}.domain.readmodels;
<#assign hasDate = false><#assign hasTime = false><#assign hasDateTime = false><#assign hasBigDecimal = false>
<#if model?? && model.fields?has_content>
<#list model.fields as field>
<#if field.basicType?? && field.basicType>
<#if field.type == "date"><#assign hasDate = true></#if>
<#if field.type == "time"><#assign hasTime = true></#if>
<#if field.type == "datetime"><#assign hasDateTime = true></#if>
<#if field.type == "decimal"><#assign hasBigDecimal = true></#if>
</#if>
</#list>
</#if>
<#if hasDate>
import java.time.LocalDate;
</#if>
<#if hasTime>
import java.time.LocalTime;
</#if>
<#if hasDateTime>
import java.time.LocalDateTime;
</#if>
<#if hasBigDecimal>
import java.math.BigDecimal;
</#if>
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "${readModel.name?lower_case?replace("[^a-z0-9]","_",'r')}_read_model")
@Data
@NoArgsConstructor
public class ${readModel.name?cap_first}ReadModel {

    @Id
    private String id;

<#if model?? && model.fields?has_content>
<#list model.fields as field>
<#if field.name != "id">
<#if field.basicType?? && field.basicType>
    <#if field.type == "integer">
    private Integer ${field.name};
    <#elseif field.type == "decimal">
    private BigDecimal ${field.name};
    <#elseif field.type == "bool">
    private Boolean ${field.name};
    <#elseif field.type == "date">
    private LocalDate ${field.name};
    <#elseif field.type == "time">
    private LocalTime ${field.name};
    <#elseif field.type == "datetime">
    private LocalDateTime ${field.name};
    <#else>
    private String ${field.name};
    </#if>
<#else>
    private String ${field.name}Id;
</#if>
</#if>
</#list>
<#else>
    // TODO: add read model fields (no model defined)
</#if>

}
