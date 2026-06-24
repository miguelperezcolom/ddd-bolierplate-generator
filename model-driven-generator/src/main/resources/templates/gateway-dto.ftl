package ${dtoPackage};

/** Generated from an OpenAPI schema; transfer object for gateway requests/responses. */
public record ${dto.className}(
<#if dto.fields?has_content>
<#list dto.fields as f>
        ${f.javaType} ${f.name}<#sep>,
</#list>
</#if>
) {}
