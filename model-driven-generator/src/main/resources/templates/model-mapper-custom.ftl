<#assign mapperClass = mapping.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.${module.slug}.application.mappers;

import ${project.packageName}.${module.slug}.application.mappers.dto.${sourceTypeName};
import ${project.packageName}.${module.slug}.application.mappers.dto.${targetTypeName};

/**
 * Custom part of the ${mapping.name} mapping — the portion that can't be expressed as declarative
 * field rules. A hook implemented once in the developer-owned custom module.
 */
public interface ${mapperClass}CustomMapping {

    /**
     * Refine the declaratively-mapped target using whatever logic the model can't capture.
     *
     * @param source the original ${sourceModel.name}
     * @param mapped the ${targetModel.name} produced by the declarative field rules
     * @return the final ${targetModel.name}
     */
    ${targetTypeName} apply(${sourceTypeName} source, ${targetTypeName} mapped);
}
