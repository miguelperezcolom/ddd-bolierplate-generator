package ${project.packageName}.${module.slug}.application.mappers;

import org.springframework.stereotype.Component;

@Component
public class ${mapping.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Mapper {

<#if mapping.sourceModel?? && mapping.targetModel??>
    public ${mapping.targetModel.name?cap_first} map(${mapping.sourceModel.name?cap_first} source) {
<#if mapping.rules?has_content>
        return new ${mapping.targetModel.name?cap_first}(
<#list mapping.rules as rule>
            source.${rule.sourceFieldName!'?'}()<#sep>,</#sep>
</#list>
        );
<#else>
        // TODO: implement mapping from ${mapping.sourceModel.name} to ${mapping.targetModel.name}
        return new ${mapping.targetModel.name?cap_first}(/* TODO */);
</#if>
    }
<#else>
    // TODO: define source and target models for this mapping
    public Object map(Object source) {
        // TODO: implement mapping
        return source;
    }
</#if>

<#if mapping.hasCustomPart?? && mapping.hasCustomPart>
    // Custom mapping logic — implement below
    protected void customMap(/* source, target */) {
        // TODO: add custom mapping logic
    }
</#if>

}
