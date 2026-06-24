<#assign mapperClass = mapping.name?cap_first?replace("[^a-zA-Z0-9]","",'r')>
package ${project.packageName}.custom;

import ${project.packageName}.${module.slug}.application.mappers.${mapperClass}CustomMapping;
import ${project.packageName}.${module.slug}.application.mappers.dto.${sourceTypeName};
import ${project.packageName}.${module.slug}.application.mappers.dto.${targetTypeName};
import org.springframework.stereotype.Component;

/**
 * Developer-owned custom part of the ${mapping.name} mapping.
 * Scaffolded once by Modux and never overwritten.
 */
@Component
public class Default${mapperClass}CustomMapping implements ${mapperClass}CustomMapping {

    @Override
    public ${targetTypeName} apply(${sourceTypeName} source, ${targetTypeName} mapped) {
        // TODO: refine the mapped ${targetModel.name} using fields of the source that the
        // declarative field rules can't express. Return `mapped` unchanged if nothing to add.
        return mapped;
    }
}
