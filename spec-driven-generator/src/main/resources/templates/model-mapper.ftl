package ${project.packageName}.${module.slug}.application.mappers;

import org.springframework.stereotype.Component;

@Component
public class ${mapping.name?cap_first?replace("[^a-zA-Z0-9]","",'r')}Mapper {

<#if sourceModel?? && targetModel??>
    public ${targetModel.name?cap_first} map(${sourceModel.name?cap_first} source) {
<#if mapping.rules?has_content>
        return new ${targetModel.name?cap_first}(
<#list mapping.rules as rule>
            source.${rule.sourceFieldName!'?'}()<#sep>,</#sep>
</#list>
        );
<#else>
        // TODO: implement mapping from ${sourceModel.name} to ${targetModel.name}
        return new ${targetModel.name?cap_first}(/* TODO */);
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
