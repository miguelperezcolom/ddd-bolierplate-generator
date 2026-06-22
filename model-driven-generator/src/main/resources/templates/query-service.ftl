package ${project.packageName}.${module.slug}.application.query;

import ${project.packageName}.${module.slug}.application.query.dto.*;

public interface ${className} {

<#if operations?has_content>
<#list operations as op>
<#if op.cardinality == "List">
    java.util.List<${op.outType}> ${op.opName}(${op.inType} input);
<#elseif op.cardinality == "Page">
    org.springframework.data.domain.Page<${op.outType}> ${op.opName}(${op.inType} input);
<#else>
    ${op.outType} ${op.opName}(${op.inType} input);
</#if>

</#list>
</#if>
}
