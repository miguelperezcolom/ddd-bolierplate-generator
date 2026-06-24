<#assign hasModels = (sourceTypeName?? && targetTypeName??)>
<#assign hasCustom = (mapping.hasCustomPart?? && mapping.hasCustomPart && hasModels)>
<#assign mapperClass = mapping.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.${module.slug}.application.mappers;

<#if hasModels>
import ${project.packageName}.${module.slug}.application.mappers.dto.${sourceTypeName};
import ${project.packageName}.${module.slug}.application.mappers.dto.${targetTypeName};
</#if>
<#if hasCustom>
import lombok.RequiredArgsConstructor;
</#if>
import org.springframework.stereotype.Component;

@Component
<#if hasCustom>
@RequiredArgsConstructor
</#if>
public class ${mapperClass}Mapper {

<#if hasCustom>
    private final ${mapperClass}CustomMapping customMapping;

</#if>
<#if hasModels>
    public ${targetTypeName} map(${sourceTypeName} source) {
<#if mapping.rules?has_content>
        var mapped = new ${targetTypeName}(
<#list mapping.rules as rule>
            source.${rule.sourceFieldName!'?'}()<#sep>,</#sep>
</#list>
        );
<#else>
        // TODO: implement the declarative mapping from ${sourceModel.name} to ${targetModel.name}
        var mapped = new ${targetTypeName}(<#if targetModel?? && targetModel.fields?has_content><#list targetModel.fields as f>null<#sep>, </#sep></#list></#if>);
</#if>
<#if hasCustom>
        return customMapping.apply(source, mapped);
<#else>
        return mapped;
</#if>
    }
<#else>
    // TODO: define source and target models for this mapping
    public Object map(Object source) {
        // TODO: implement mapping
        return source;
    }
</#if>

}
